import deepEqual from 'fast-deep-equal';
import throttle from 'lodash.throttle';
import settings from '../../lib/settings';
import { ChatHandling, SnapchatUpdateMessagePayload } from '../../lib/constants';
import { getSnapchatStore } from '../../utils/snapchat';
import Module from '../../lib/module';

const THROTTLE_TIME = 500;

const store = getSnapchatStore();
let unsubscribe: (() => void) | null = null;

let oldConversationId: string | null = null;
let oldConversationMessages: any = null;

// we throttle saves to be nice :)
const throttledSaveMessage = throttle(
  (conversationSerializedId: string, messageId: string) => {
    const { updateMessage } = store.getState().messaging;
    updateMessage(conversationSerializedId, messageId, SnapchatUpdateMessagePayload.SAVE_CHAT);
  },
  THROTTLE_TIME,
  { leading: false, trailing: true },
);

class AutoSaveMessages extends Module {
  constructor() {
    super('Auto Save Messages');
    settings.on(`CHAT_HANDLING.setting:update`, this.load.bind(this));
  }

  load() {
    const flag = settings.getSetting('CHAT_HANDLING');
    const enabled = flag === ChatHandling.AUTO_SAVE;

    if (!enabled && unsubscribe != null) {
      unsubscribe();
      unsubscribe = null;
    }

    if (enabled && unsubscribe == null) {
      this.saveActiveConversationMessages();

      unsubscribe = store.subscribe(
        (storeState: any) => storeState.messaging.conversations,
        this.saveActiveConversationMessages.bind(this),
      );
    }
  }

  saveActiveConversationMessages(conversations?: any) {
    conversations = conversations ?? store.getState().messaging.conversations;
    if (conversations == null) {
      return;
    }

    const activeConversation = Object.entries(conversations).find(
      ([, conversation]: [string, any]) => conversation.isActive,
    );

    if (activeConversation == null) {
      return;
    }

    const [id, conversation]: [string, any] = activeConversation;
    const messages = Array.from(conversation.messages) as [string, any][];
    if (id === oldConversationId && deepEqual(messages, oldConversationMessages)) {
      return;
    }

    oldConversationId = id;
    oldConversationMessages = messages;

    const {
      conversation: { conversationId: conversationSerializedId },
    } = conversation;

    throttledSaveMessage.cancel();

    for (const [messageId, message] of messages) {
      if (message.metadata.savedBy.length > 0) {
        continue;
      }
      try {
        throttledSaveMessage(conversationSerializedId, messageId);
      } catch (_) {}
    }
  }
}

export default new AutoSaveMessages();
