import settings from '../../lib/settings';
import { EventTypes, SettingIds } from '../../lib/constants';
import { registerMiddleware, updateSnapchatStore } from '../../utils/middleware';

let oldSendTypingNotification: any = null;

function handleStoreEffect(storeState: any) {
  const enabled = settings.getSetting(SettingIds.PREVENT_TYPING_NOTIFICATION);

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

class PreventTypingNotification {
  constructor() {
    registerMiddleware(handleStoreEffect);
    settings.on(`${SettingIds.PREVENT_TYPING_NOTIFICATION}.${EventTypes.SETTING_UPDATE}`, updateSnapchatStore);
  }
}

export default new PreventTypingNotification();
