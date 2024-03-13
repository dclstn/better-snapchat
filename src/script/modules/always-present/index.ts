import settings from '../../lib/settings';
import { EventTypes, SettingIds } from '../../lib/constants';
import { registerMiddleware, updateSnapchatStore } from '../../utils/middleware';

let oldSetAwayState: any = null;

function handleStoreEffect(storeState: any) {
  const enabled = settings.getSetting(SettingIds.ALWAYS_PRESENT);

  if (enabled) {
    storeState.presence.setAwayState = () => {};
    storeState.presence.awayState = 0;
    if (oldSetAwayState == null) {
      oldSetAwayState = storeState.presence.setAwayState;
    }
  }

  if (!enabled && oldSetAwayState != null) {
    storeState.presence.setAwayState = oldSetAwayState;
    oldSetAwayState = null;
  }

  return storeState;
}

class AlwaysPresent {
  constructor() {
    registerMiddleware(handleStoreEffect);
    settings.on(`${SettingIds.ALWAYS_PRESENT}.${EventTypes.SETTING_UPDATE}`, updateSnapchatStore);
  }
}

export default new AlwaysPresent();
