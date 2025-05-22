import settings from '../../lib/settings';
import Module from '../../lib/module';
import { getSnapchatStore } from '../../utils/snapchat';
import { logInfo } from '../../lib/debug';
import styles from './index.module.css';

const store = getSnapchatStore();
let unsubscribe: (() => void) | null = null;
let refreshInterval: number | null = null;

class PeekingIndicator extends Module {
  constructor() {
    super('Peeking Indicator');
    settings.on('HALF_SWIPE_NOTIFICATION.setting:update', this.load.bind(this));
    this.load();
  }

  findSnapchatConversationContainers() {
    const possibleContainers = [
      ...document.querySelectorAll('.O4POs'),
      ...document.querySelectorAll('[data-testid="conversation_item_container"]'),
      ...document.querySelectorAll('[data-role="conversation_item"]'),
      ...document.querySelectorAll('[role="listitem"]'),
    ];
    return possibleContainers;
  }

  ensureConversationIndicators() {
    const enabled = settings.getSetting('HALF_SWIPE_NOTIFICATION');
    if (!enabled) return;

    const containers = this.findSnapchatConversationContainers();
    containers.forEach((container) => this.addPeekingIndicator(container));
  }

  addPeekingIndicator(container: Element) {
    if (container.querySelector(`.${styles.peeking}`)) {
      return;
    }

    const peekingDiv = document.createElement('div');
    peekingDiv.className = styles.peeking;

    const peekingItem = document.createElement('div');
    peekingItem.className = styles.peekingItem;

    peekingDiv.appendChild(peekingItem);
    container.prepend(peekingDiv);
    
    if (window.getComputedStyle(container).display !== 'flex') {
      (container as HTMLElement).style.display = 'flex';
      (container as HTMLElement).style.flexDirection = 'row';
      (container as HTMLElement).style.alignItems = 'center';
    }
  }

  getConversationIdFromElement(container: Element): string | null {
    try {
      // @ts-ignore
      const reactProps = container._reactProps || container.__reactProps;
      if (reactProps) {
        const convId =
          reactProps.conversationId ||
          reactProps['data-conversation-id'] ||
          (reactProps.children && reactProps.children.props && reactProps.children.props.conversationId);

        if (convId) return String(convId);
      }

      const dataConvId = container.getAttribute('data-conversation-id');
      if (dataConvId) return dataConvId;

      const innerElement = container.querySelector('[data-conversation-id]');
      if (innerElement) return innerElement.getAttribute('data-conversation-id');

      const ariaLabelledBy = container.querySelector('[aria-labelledby]')?.getAttribute('aria-labelledby');
      if (ariaLabelledBy) {
        const match = ariaLabelledBy.match(/title-([0-9a-f-]+)/);
        if (match && match[1]) {
          return match[1];
        }
      }

      const titleSpan = container.querySelector('span[id^="title-"]');
      if (titleSpan) {
        const titleId = titleSpan.id;
        const match = titleId.match(/title-([0-9a-f-]+)/);
        if (match && match[1]) {
          return match[1];
        }
      }

      const statusSpan = container.querySelector('span[id^="status-"]');
      if (statusSpan) {
        const statusId = statusSpan.id;
        const match = statusId.match(/status-([0-9a-f-]+)/);
        if (match && match[1]) {
          return match[1];
        }
      }

      const anchor = container.querySelector('a[href*="/web/"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href) {
          const match = href.match(/\/web\/([^/]+)/);
          if (match && match[1]) return match[1];
        }
      }

      const projectionElement = container.querySelector('[data-projection-id]');
      if (projectionElement) {
        const projectionId = projectionElement.getAttribute('data-projection-id');
        if (projectionId) {
          return `projection-${projectionId}`;
        }
      }

      for (const attr of Array.from(container.attributes)) {
        if (
          attr.name.startsWith('data-') &&
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(attr.value)
        ) {
          return attr.value;
        }
      }

      return null;
    } catch (error) {
      logInfo('Error getting conversation ID:', error);
      return null;
    }
  }

  updatePeekingState() {
    const enabled = settings.getSetting('HALF_SWIPE_NOTIFICATION');
    if (!enabled) return;

    const storeState = store.getState();
    const presence = storeState?.presence;
    if (!presence || !presence.activeConversationInfo) {
      return;
    }

    try {
      this.ensureConversationIndicators();
      const peekingConversations = new Map<string, any>();

      if (typeof presence.activeConversationInfo.entries === 'function') {
        const entries = Array.from(presence.activeConversationInfo.entries());

        entries.forEach((entry: any) => {
          if (!Array.isArray(entry) || entry.length !== 2) {
            return;
          }

          let conversationId;
          try {
            if (typeof entry[0] === 'object' && entry[0] !== null) {
              if (entry[0].str && typeof entry[0].str === 'string') {
                conversationId = entry[0].str;
              } else if (entry[0].id && typeof entry[0].id === 'object') {
                conversationId = String(entry[0].id);
              } else {
                conversationId = JSON.stringify(entry[0]);
              }
            } else {
              conversationId = String(entry[0]);
            }
          } catch (e) {
            conversationId = `ID-${Math.random().toString(36).substring(2, 8)}`;
            logInfo('Error converting conversation ID to string:', e);
          }

          const info = entry[1];
          if (!info) return;
          
          const peekingParticipants = info.peekingParticipants;
          const hasPeeking = peekingParticipants && Array.isArray(peekingParticipants) && peekingParticipants.length > 0;
          
          if (hasPeeking) {
            peekingConversations.set(conversationId, info);
          }
        });
      }

      const containers = this.findSnapchatConversationContainers();
      containers.forEach((container) => {
        container.classList.remove(styles.isPeeking);
      });

      const containerMap = new Map<string, Element>();
      const containersByTitle = new Map<string, Element>();

      containers.forEach((container) => {
        const id = this.getConversationIdFromElement(container);
        const titleElement = container.querySelector('span[id^="title-"]');
        const titleText = titleElement?.textContent?.trim() || '';

        if (id) {
          containerMap.set(id, container);
        }

        if (titleText) {
          containersByTitle.set(titleText, container);
        }
      });

      let foundMatch = false;
      peekingConversations.forEach((info, conversationId) => {
        if (containerMap.has(conversationId)) {
          const container = containerMap.get(conversationId)!;
          container.classList.add(styles.isPeeking);
          foundMatch = true;
          return;
        }

        const conversationName = info.displayName || info.name;
        if (conversationName) {
          for (const [title, container] of containersByTitle.entries()) {
            if (title.includes(conversationName) || conversationName.includes(title)) {
              container.classList.add(styles.isPeeking);
              foundMatch = true;
              break;
            }
          }
        }

        const participants = info.participants || [];
        if (participants.length > 0 && !foundMatch) {
          participants.forEach((participant: any) => {
            const participantName = participant.displayName || participant.username || participant.userId;
            if (!participantName) return;

            for (const [title, container] of containersByTitle.entries()) {
              if (title.includes(participantName)) {
                container.classList.add(styles.isPeeking);
                foundMatch = true;
                break;
              }
            }
          });
        }
      });

      if (!foundMatch && peekingConversations.size > 0 && containers.length > 0) {
        let applied = false;
        for (const container of containers) {
          const titleElement = container.querySelector('span[id^="title-"]');
          if (titleElement) {
            container.classList.add(styles.isPeeking);
            applied = true;
            break;
          }
        }

        if (!applied && containers.length > 0) {
          const firstContainer = containers[0];
          if (firstContainer) {
            firstContainer.classList.add(styles.isPeeking);
          }
        }
      }
    } catch (error) {
      logInfo('Error updating peeking state:', error);
    }
  }

  load() {
    const enabled = settings.getSetting('HALF_SWIPE_NOTIFICATION');

    if (!enabled && unsubscribe != null) {
      unsubscribe();
      unsubscribe = null;
      this.cleanup();
      return;
    }

    if (enabled && unsubscribe == null) {
      unsubscribe = store.subscribe(
        (storeState: any) => storeState.presence,
        this.updatePeekingState.bind(this)
      );
      
      if (refreshInterval === null) {
        refreshInterval = window.setInterval(() => {
          if (settings.getSetting('HALF_SWIPE_NOTIFICATION')) {
            this.ensureConversationIndicators();
          } else {
            this.cleanup();
          }
        }, 2000);
      }

      this.updatePeekingState();
    }
  }

  cleanup() {
    if (unsubscribe != null) {
      unsubscribe();
      unsubscribe = null;
    }

    if (refreshInterval !== null) {
      window.clearInterval(refreshInterval);
      refreshInterval = null;
    }

    const containers = this.findSnapchatConversationContainers();
    containers.forEach((container) => {
      container.classList.remove(styles.isPeeking);
      const indicator = container.querySelector(`.${styles.peeking}`);
      if (indicator) {
        indicator.remove();
      }
    });
  }
}

export default new PeekingIndicator();
