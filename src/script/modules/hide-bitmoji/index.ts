import settings from '../../lib/settings';
import { EventTypes, SettingIds } from '../../lib/constants';
import { registerMiddleware, updateSnapchatStore } from '../../utils/middleware';

let oldCreatePresenceSession: any = null;

function handleStoreEffect(prevStoreState: any) {
  const enabled = settings.getSetting(SettingIds.HIDE_BITMOJI);
  const storeState = prevStoreState;

  if (enabled) {
    storeState.presence.createPresenceSession = () => {};
    if (oldCreatePresenceSession == null) {
      oldCreatePresenceSession = storeState.presence.createPresenceSession;
    }
  }

  if (!enabled && oldCreatePresenceSession != null) {
    storeState.presence.createPresenceSession = oldCreatePresenceSession;
    oldCreatePresenceSession = null;
  }

  return storeState;
}

class HideBitmoji {
  constructor() {
    registerMiddleware(handleStoreEffect);
    settings.on(`${SettingIds.HIDE_BITMOJI}.${EventTypes.SETTING_UPDATE}`, updateSnapchatStore);
  }
}

export default new HideBitmoji();
