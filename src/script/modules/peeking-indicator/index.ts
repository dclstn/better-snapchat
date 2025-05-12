import settings from '../../lib/settings';
import Module from '../../lib/module';
import { getSnapchatStore } from '../../utils/snapchat';
import styles from './index.module.css';
import { logInfo } from '../../lib/debug';

const store = getSnapchatStore();
let unsubscribe: (() => void) | null = null;

class PeekingIndicator extends Module {
  constructor() {
    super('Peeking Indicator');
    settings.on('HALF_SWIPE_NOTIFICATION.setting:update', this.load.bind(this));

    this.load();
  }

  findSnapchatConversationContainers() {
    return document.querySelectorAll('[data-testid="conversation_item_container"]');
  }

  getConversationIdFromReactProps(element: Element): string | null {
    try {
      const key = Object.keys(element).find(
        (key) => key.startsWith('__reactFiber$') || key.startsWith('__reactInternalInstance$'),
      );

      if (!key) return null;

      // @ts-ignore
      let fiber = element[key];
      while (fiber) {
        const props = fiber.memoizedProps;

        if (props) {
          if (props.conversation?.id?.str) {
            return props.conversation.id.str;
          }

          if (props.conversation?.conversationId?.str) {
            return props.conversation.conversationId.str;
          }

          if (props.data?.id?.str) {
            return props.data.id.str;
          }

          if (props.conversationId?.str) {
            return props.conversationId.str;
          }
          if (typeof props.conversationId === 'string') {
            return props.conversationId;
          }
        }

        fiber = fiber.return;
      }

      return null;
    } catch (error) {
      return this.getConversationIdFromAttribute(element);
    }
  }

  getConversationIdFromAttribute(container: Element): string | null {
    try {
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

      return null;
    } catch (error) {
      logInfo('Error getting conversation ID from attributes:', error);
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
      const peekingIds = new Set<string>();

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
              } else {
                return;
              }
            } else {
              conversationId = String(entry[0]);
            }
          } catch (e) {
            return;
          }

          const info = entry[1];
          if (!info) {
            return;
          }
          const peekingParticipants = info.peekingParticipants;
          const hasPeeking =
            peekingParticipants && Array.isArray(peekingParticipants) && peekingParticipants.length > 0;

          if (hasPeeking) {
            peekingIds.add(conversationId);
          }
        });
      }

      if (peekingIds.size > 0) {
        const containers = this.findSnapchatConversationContainers();

        containers.forEach((container) => {
          const id = this.getConversationIdFromReactProps(container);

          container.classList.remove(styles.isPeeking);
          if (!id || !peekingIds.has(id)) {
            return;
          }

          container.classList.add(styles.isPeeking);

          if (!container.querySelector(`.${styles.peeking}`)) {
            const peekingDiv = document.createElement('div');
            peekingDiv.className = styles.peeking;

            const peekingItem = document.createElement('div');
            peekingItem.className = styles.peekingItem;

            peekingDiv.appendChild(peekingItem);
            container.prepend(peekingDiv);
          }
        });
      }
    } catch (error) {
      logInfo('Error updating peeking state:', error);
    }
  }

  load() {
    const enabled = settings.getSetting('HALF_SWIPE_NOTIFICATION');

    if (!enabled && unsubscribe !== null) {
      unsubscribe();
      unsubscribe = null;
      return;
    }

    if (enabled && unsubscribe === null) {
      this.updatePeekingState();

      unsubscribe = store.subscribe(
        (storeState: any) => storeState.presence,
        () => {
          this.updatePeekingState();
        },
      );
    }
  }
}

export default new PeekingIndicator();
