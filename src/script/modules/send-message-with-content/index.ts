import settings from '../../lib/settings';
import { registerMiddleware, updateSnapchatStore } from '../../utils/middleware';
import { getSnapchatStore } from '../../utils/snapchat';

let oldGetConversationManager: any = null;

function handleStoreEffect(storeState: any) {
  if (!storeState.messaging?.client) {
    return storeState;
  }

  if (!oldGetConversationManager) {
    oldGetConversationManager = storeState.messaging.client.getConversationManager;
    storeState.messaging.client.getConversationManager = function () {
      const originalManager = oldGetConversationManager.apply(this, arguments);
      return new Proxy(originalManager, {
        get(target, prop, receiver) {
          if (prop === 'sendMessageWithContent') {
            return new Proxy(target[prop], {
                apply(targetFunc, thisArg, args) {
                    const enabled = settings.getSetting('SEND_UNSAVEABLE');
                    if (enabled) {
                        args[1].savePolicy = 0;
                    }
                    return Reflect.apply(targetFunc, thisArg, args);
                },
            });
          }
          return Reflect.get(target, prop, receiver);
        },
      });
    };
  }

  return storeState;
}

class CreatePresenceSession {
  constructor() {
    const store = getSnapchatStore();
    store.subscribe(handleStoreEffect);
    registerMiddleware(handleStoreEffect);
    settings.on(`SEND_UNSAVEABLE.setting:update`, updateSnapchatStore);
  }
}

export default new CreatePresenceSession();
