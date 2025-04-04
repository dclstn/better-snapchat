import settings from '../../lib/settings';
import { registerMiddleware, updateSnapchatStore } from '../../utils/middleware';

let oldSetAwayState: any = null;

function handleStoreEffect(storeState: any) {
  const enabled = settings.getSetting('ALWAYS_PRESENT');

  if (enabled) {
    if (oldSetAwayState == null) {
      oldSetAwayState = storeState.presence.setAwayState;
    }
    storeState.presence.setAwayState = () => {};
    storeState.presence.awayState = 0;
  }

  if (!enabled && oldSetAwayState != null) {
    storeState.presence.setAwayState = oldSetAwayState;
    oldSetAwayState = null;
  }

  return storeState;
}

class SetAwayState {
  constructor() {
    registerMiddleware(handleStoreEffect);
    settings.on(`ALWAYS_PRESENT.setting:update`, updateSnapchatStore);
  }
}

export default new SetAwayState();
