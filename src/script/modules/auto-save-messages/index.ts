import deepEqual from 'fast-deep-equal';
import throttle from 'lodash.throttle';
import settings from '../../lib/settings';
import { SnapchatUpdateMessagePayload } from '../../lib/constants';
import { getSnapchatStore } from '../../utils/snapchat';

const THROTTLE_TIME = 500;

const store = getSnapchatStore();
let listener: (() => void) | null = null;

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

function handleConversationEffect(storeState: any) {
  const { conversations } = storeState.messaging;
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
    } catch (_) {
      continue;
    }
  }
}

class AutoSaveMessages {
  constructor() {
    this.load();
    settings.on(`AUTO_SAVE_CHATS.setting:update`, this.load);
  }

  load() {
    const enabled = settings.getSetting('AUTO_SAVE_CHATS');
    if (enabled && listener == null) {
      handleConversationEffect(store.getState());
      listener = store.subscribe(handleConversationEffect);
    }
    if (!enabled && listener != null) {
      listener();
      listener = null;
    }
  }
}

export default new AutoSaveMessages();
