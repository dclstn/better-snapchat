import settings from '../../lib/settings';
import { EventTypes, SettingIds } from '../../lib/constants';
import { registerMiddleware, updateSnapchatStore } from '../../utils/middleware';

let oldBroadcastTypingActivity: any = null;

function handleStoreEffect(storeState: any) {
  const enabled = settings.getSetting(SettingIds.PREVENT_TYPING);

  if (enabled) {
    if (oldBroadcastTypingActivity == null) {
      oldBroadcastTypingActivity = storeState.presence.broadcastTypingActivity;
    }
    storeState.presence.broadcastTypingActivity = () => {};
  }

  if (!enabled && oldBroadcastTypingActivity != null) {
    storeState.presence.broadcastTypingActivity = oldBroadcastTypingActivity;
    oldBroadcastTypingActivity = null;
  }

  return storeState;
}

class BroadcastTypingActivity {
  constructor() {
    registerMiddleware(handleStoreEffect);
    settings.on(`${SettingIds.PREVENT_TYPING}.${EventTypes.SETTING_UPDATE}`, updateSnapchatStore);
  }
}

export default new BroadcastTypingActivity();
