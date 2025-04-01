import settings from '../../lib/settings';
import { getCofStore } from '../../utils/snapchat';

let oldGetClientCofValue: any = null;

function handleStoreEffect(storeState: any) {

  if (oldGetClientCofValue == null) {
    oldGetClientCofValue = storeState.getClientCofValue;
    storeState.getClientCofValue = function (...args: any[]) {
      const enabled = settings.getSetting('SNAP_AS_MOBILE');
      if (enabled && args[0] && args[0] === 'DWEB_SNAP_SENDING_CONTEXT') {
        return true;
      }
      const originalValue = oldGetClientCofValue.apply(this, args);
      return originalValue;
    };
  }

  return storeState;
}

class GetCofValue {
  constructor() {
    const store = getCofStore();
    store.subscribe(handleStoreEffect);
  }
}

export default new GetCofValue();
