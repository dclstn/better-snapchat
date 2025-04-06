import settings from '../../lib/settings';
import Module from '../../lib/module';
import { getSnapchatStore } from '../../utils/snapchat';

const store = getSnapchatStore();

let oldSendTypingNotification: any = null;

const newSendTypingNotification = () => {};

class BitmojiTypingNotification extends Module {
  constructor() {
    super('BitmojiTypingNotification');
    store.subscribe((storeState: any) => storeState.messaging, this.load);
    settings.on('PREVENT_TYPING_NOTIFICATION.setting:update', () => this.load());
  }

  load(messageClient?: any) {
    messageClient = messageClient ?? store.getState().messaging;
    if (messageClient == null) {
      return;
    }

    const preventTypingNotificationEnabled = settings.getSetting('PREVENT_TYPING_NOTIFICATION');
    const changedValues: any = {};

    if (preventTypingNotificationEnabled && messageClient.sendTypingNotification !== newSendTypingNotification) {
      oldSendTypingNotification = messageClient.sendTypingNotification;
      changedValues.sendTypingNotification = newSendTypingNotification;
    }

    if (!preventTypingNotificationEnabled && oldSendTypingNotification != null) {
      changedValues.sendTypingNotification = oldSendTypingNotification;
      oldSendTypingNotification = null;
    }

    if (Object.keys(changedValues).length === 0) {
      return;
    }

    store.setState({ messaging: { ...messageClient, ...changedValues } });
  }
}

export default new BitmojiTypingNotification();
