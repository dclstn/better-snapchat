import settings from '../../lib/settings';
import Module from '../../lib/module';
import { getSnapchatStore } from '../../utils/snapchat';
import styles from './index.module.css';
import { logInfo } from '../../lib/debug';

const store = getSnapchatStore();
let initialized = false;

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

  initMutationObserver() {
    if (initialized) return;

    initialized = true;

    const observer = new MutationObserver((mutations) => {
      let shouldCheckForContainers = false;

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldCheckForContainers = true;
        }
      });

      if (shouldCheckForContainers) {
        this.processConversationContainers();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    this.processConversationContainers();
    setInterval(() => this.processConversationContainers(), 2000);
  }

  processConversationContainers() {
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
  }

  getConversationIdFromElement(container: Element): string | null {
    try {
      const dataConvId = container.getAttribute('data-conversation-id');
      if (dataConvId) return dataConvId;

      const innerElement = container.querySelector('[data-conversation-id]');
      if (innerElement) return innerElement.getAttribute('data-conversation-id');

      // Try extracting from aria-labelledby attribute which may contain the ID
      const ariaLabelledBy = container.querySelector('[aria-labelledby]')?.getAttribute('aria-labelledby');
      if (ariaLabelledBy) {
        // Format example: "title-4da2e5d9-b5e7-5472-96b3-a0191987ef3b comma1 status-4da2e5d9-b5e7-5472-96b3-a0191987ef3b"
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

          if (!info) {
            return;
          }
          const peekingParticipants = info.peekingParticipants;
          const hasPeeking =
            peekingParticipants && Array.isArray(peekingParticipants) && peekingParticipants.length > 0;

          if (hasPeeking) {
            peekingConversations.set(conversationId, info);
            const displayName = info.displayName || info.name || 'Unknown';
            //logInfo(`👀 Peeking detected in conversation: ${displayName} (ID: ${conversationId})`);
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
        //logInfo(`Looking for container match for conversation: ${conversationId}`);

        if (containerMap.has(conversationId)) {
          const container = containerMap.get(conversationId)!;
          container.classList.add(styles.isPeeking);
          foundMatch = true;
          //logInfo(`✅ Found exact ID match for: ${conversationId}`);
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
    store.subscribe(
      (storeState: any) => storeState.presence,
      () => {
        this.updatePeekingState();
      },
    );

    this.initMutationObserver();
    this.updatePeekingState();
  }
}

export default new PeekingIndicator();
