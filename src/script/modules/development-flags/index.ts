import settings from '../../lib/settings';
import { getCofStore } from '../../utils/snapchat';

enum CofKeys {
  DWEB_SNAP_SENDING_CONTEXT = 'DWEB_SNAP_SENDING_CONTEXT',
  DWEB_PRIVATE_STORIES_VIEWING = 'DWEB_PRIVATE_STORIES_VIEWING',
  DWEB_SNAP_VIEWING = 'DWEB_SNAP_VIEWING',
}

let patchedStore: boolean = false;

function handleStoreEffect(storeState: any) {
  if (patchedStore || storeState.getClientCofValue == null) {
    return;
  }

  patchedStore = true;

  storeState.getClientCofValue = new Proxy(storeState.getClientCofValue, {
    apply(target: any, thisArg: any, args: any[]) {
      const originalValue = Reflect.apply(target, thisArg, args) as Promise<any>;
      if (args.length === 0 || args[0] == null) {
        return originalValue;
      }

      const [cofKey] = args;
      const mobileEnabled = settings.getSetting('SNAP_AS_MOBILE');
      if (mobileEnabled && cofKey === CofKeys.DWEB_SNAP_SENDING_CONTEXT) {
        return true;
      }

      const privStoryEnabled = settings.getSetting('PRIVATE_STORIES');
      if (cofKey === CofKeys.DWEB_PRIVATE_STORIES_VIEWING) {
        return { value: privStoryEnabled ? 'enabled' : 'disabled' };
      }

      const viewingEnabled = settings.getSetting('ALLOW_SNAP_VIEWING');
      if (cofKey === CofKeys.DWEB_SNAP_VIEWING) {
        return originalValue.then((resolvedValue: any) => {
          resolvedValue.value[1] = viewingEnabled ? 1 : 0;
          return resolvedValue;
        });
      }

      return originalValue;
    },
  });

  return storeState;
}

class ConditionOnsetFlags {
  constructor() {
    const store = getCofStore();
    store.subscribe(handleStoreEffect);
  }
}

export default new ConditionOnsetFlags();
