import settings from '../../lib/settings';
import { EventTypes, SettingIds } from '../../lib/constants';
import { registerMiddleware, updateSnapchatStore } from '../../utils/middleware';

let oldBroadcastTypingActivity: any = null;
let oldSendTypingNotification: any = null;

function handleStoreEffect(storeState: any) {
  const enabled = settings.getSetting(SettingIds.PREVENT_TYPING);

  if (enabled) {
    if (oldBroadcastTypingActivity == null) {
      oldBroadcastTypingActivity = storeState.presence.setAwayState;
    }
    if (oldSendTypingNotification == null) {
      oldSendTypingNotification = storeState.messaging.sendTypingNotification;
    }
    storeState.presence.broadcastTypingActivity = () => {};
    storeState.messaging.sendTypingNotification = () => {};
  }

  if (!enabled && oldBroadcastTypingActivity != null && oldSendTypingNotification != null) {
    storeState.presence.broadcastTypingActivity = oldBroadcastTypingActivity;
    storeState.messaging.sendTypingNotification = oldSendTypingNotification;
    oldBroadcastTypingActivity = null;
    oldSendTypingNotification = null;
  }

  return storeState;
}

class PreventTyping {
  constructor() {
    registerMiddleware(handleStoreEffect);
    settings.on(`${SettingIds.PREVENT_TYPING}.${EventTypes.SETTING_UPDATE}`, updateSnapchatStore);
  }
}

export default new PreventTyping();
