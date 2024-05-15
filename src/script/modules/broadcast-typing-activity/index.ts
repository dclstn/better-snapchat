import settings from '../../lib/settings';
import { registerMiddleware, updateSnapchatStore } from '../../utils/middleware';

let oldBroadcastTypingActivity: any = null;

function handleStoreEffect(storeState: any) {
  const enabled = settings.getSetting('PREVENT_TYPING');

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
    settings.on(`PREVENT_TYPING.setting:update`, updateSnapchatStore);
  }
}

export default new BroadcastTypingActivity();
