import settings from '../../lib/settings';
import { getCofStore } from '../../utils/snapchat';

let oldGetClientCofValue: any = null;

function handleStoreEffect(storeState: any) {

  if (oldGetClientCofValue == null) {
    oldGetClientCofValue = storeState.getClientCofValue;
    storeState.getClientCofValue = function (...args: any[]) {
      const mobileEnabled = settings.getSetting('SNAP_AS_MOBILE');
      if (mobileEnabled && args[0] && args[0] === 'DWEB_SNAP_SENDING_CONTEXT') {
        return true;
      }
      const adsEnabled = settings.getSetting('ADS_ENABLED');
      if (args[0] && args[0] === 'DWEB_ENABLE_ADS') {
        return adsEnabled ? "enabled" : "disabled";
      }
      const originalValue = oldGetClientCofValue.apply(this, args);
      const viewingEnabled = settings.getSetting('ALLOW_SNAP_VIEWING');
      if (args[0] && args[0] === 'DWEB_SNAP_VIEWING') {
        return originalValue.then((resolvedValue: any) => {
          resolvedValue.value[1] = viewingEnabled ? 1 : 0;
          return resolvedValue;
        });
      }
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
