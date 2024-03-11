import settings from '../../lib/settings';
import { SettingIds } from '../../lib/constants';
import { registerMiddleware, updateSnapchatStore } from '../../utils/middleware';

let oldSetAwayState: any = null;

function handleStoreEffect(storeState: any) {
  const enabled = settings.getSetting(SettingIds.ALWAYS_PRESENT);

  if (enabled) {
    oldSetAwayState = storeState.presence.setAwayState;
    storeState.presence.setAwayState = () => {};
    storeState.presence.awayState = 0;
  } else if (oldSetAwayState != null) {
    storeState.presence.setAwayState = oldSetAwayState;
    oldSetAwayState = null;
  }

  return storeState;
}

class AlwaysPresent {
  constructor() {
    registerMiddleware(handleStoreEffect);
    settings.on(`${SettingIds.ALWAYS_PRESENT}.setting_update`, updateSnapchatStore);
  }
}

export default new AlwaysPresent();
