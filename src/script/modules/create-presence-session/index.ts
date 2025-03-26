import settings from '../../lib/settings';
import { registerMiddleware, updateSnapchatStore } from '../../utils/middleware';

let oldCreatePresenceSession: any = null;

function handleStoreEffect(storeState: any) {
  const enabled = settings.getSetting('HIDE_BITMOJI');

  if (enabled) {
    if (oldCreatePresenceSession == null) {
      oldCreatePresenceSession = storeState.presence.createPresenceSession;
    }
    storeState.presence.createPresenceSession = () => {};
  }

  if (!enabled && oldCreatePresenceSession != null) {
    storeState.presence.createPresenceSession = oldCreatePresenceSession;
    oldCreatePresenceSession = null;
  }

  return storeState;
}

class CreatePresenceSession {
  constructor() {
    registerMiddleware(handleStoreEffect);
    settings.on(`HIDE_BITMOJI.setting:update`, updateSnapchatStore);
  }
}

export default new CreatePresenceSession();
