import settings from '../../lib/settings';
import { registerMiddleware, updateSnapchatStore } from '../../utils/middleware';

let oldSendTypingNotification: any = null;

function handleStoreEffect(storeState: any) {
  const enabled = settings.getSetting('PREVENT_TYPING_NOTIFICATION');

  if (enabled) {
    if (oldSendTypingNotification == null) {
      oldSendTypingNotification = storeState.messaging.sendTypingNotification;
    }
    storeState.messaging.sendTypingNotification = () => {};
  }

  if (!enabled && oldSendTypingNotification != null) {
    storeState.messaging.sendTypingNotification = oldSendTypingNotification;
    oldSendTypingNotification = null;
  }

  return storeState;
}

class BitmojiTypingNotification {
  constructor() {
    registerMiddleware(handleStoreEffect);
    settings.on(`PREVENT_TYPING_NOTIFICATION.setting:update`, updateSnapchatStore);
  }
}

export default new BitmojiTypingNotification();
