import settings from '../../lib/settings';
import { SettingIds } from '../../lib/constants';
import { registerMiddleware, updateSnapchatStore } from '../../utils/middleware';

let oldBroadcastTypingActivity: any = null;
let oldSendTypingNotification: any = null;

function handleStoreEffect(storeState: any) {
  const enabled = settings.getSetting(SettingIds.PREVENT_TYPING);

  if (enabled) {
    oldBroadcastTypingActivity = storeState.presence.setAwayState;
    oldSendTypingNotification = storeState.messaging.sendTypingNotification;
    storeState.presence.broadcastTypingActivity = () => {};
    storeState.messaging.sendTypingNotification = () => {};
  } else if (oldBroadcastTypingActivity != null && oldSendTypingNotification != null) {
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
    settings.on(`${SettingIds.PREVENT_TYPING}.setting_update`, updateSnapchatStore);
  }
}

export default new PreventTyping();
