import settings from '../../lib/settings';
import { getCofStore } from '../../utils/snapchat';

let oldGetClientCofValue: any = null;
let oldGetClientCofValueAndLogExposure: any = null;

function handleStoreEffect(storeState: any) {
  if (oldGetClientCofValue != null) {
    return storeState;
  }
  
  oldGetClientCofValue = storeState.getClientCofValue;
  storeState.getClientCofValue = function (...args: any[]) {
    
    
    const originalValue = oldGetClientCofValue.apply(this, args);

    const flag = args[0];
    if (flag) {
      const mobileEnabled = settings.getSetting('SNAP_AS_MOBILE');
      if (mobileEnabled && flag === 'DWEB_SNAP_SENDING_CONTEXT') {
        return true;
      }
      const adsEnabled = settings.getSetting('ADS_ENABLED');
      if (flag === 'DWEB_ENABLE_ADS') {
        return adsEnabled ? "enabled" : "disabled";
      }
      const myaiEnabled = settings.getSetting('MY_AI_MENTIONS');
      if (flag === 'DWEB_ENABLE_MY_AI_MENTION') {
        return myaiEnabled ? "enabled" : "disabled";
      }
      const privStoryEnabled = settings.getSetting('PRIVATE_STORIES');
      if (flag === 'DWEB_PRIVATE_STORIES_VIEWING') {
        return {
          value: privStoryEnabled ? "enabled" : "disabled"
        }
      }
      const viewingEnabled = settings.getSetting('ALLOW_SNAP_VIEWING');
      if (flag === 'DWEB_SNAP_VIEWING') {
        return originalValue.then((resolvedValue: any) => {
          resolvedValue.value[1] = viewingEnabled ? 1 : 0;
          return resolvedValue;
        });
      }
    }

    return originalValue;
  };

  if (oldGetClientCofValueAndLogExposure == null) {
    oldGetClientCofValueAndLogExposure = storeState.getClientCofValueAndLogExposure;
    storeState.getClientCofValueAndLogExposure = function (...args: any[]) {
      const myaiEnabled = settings.getSetting('MY_AI_MENTIONS');
      if (args[0] && args[0] === 'DWEB_ENABLE_MY_AI_MENTION') {
        return {
          value: myaiEnabled ? "enabled" : "disabled"
        }
      }
      const originalValue = oldGetClientCofValueAndLogExposure.apply(this, args);
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
