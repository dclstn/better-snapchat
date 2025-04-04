import { BitmojiPresence } from '../../lib/constants';
import settings from '../../lib/settings';
import { registerMiddleware, updateSnapchatStore } from '../../utils/middleware';
import { getSnapchatStore } from '../../utils/snapchat';

let oldCreatePresenceSession: any = null;

function handleStoreEffect(storeState: any) {
  const bitmojiPresence = settings.getSetting('BITMOJI_PRESENCE');
  const enabled = bitmojiPresence === BitmojiPresence.HIDE;
  if (!storeState.talk?.client) {
    return storeState;
  }
  const talkCoreWasm = storeState.talk.client.talkCoreWasm;

  if (enabled) {
    if (oldCreatePresenceSession == null) {
      oldCreatePresenceSession = talkCoreWasm.createPresenceSession;
    }
    talkCoreWasm.createPresenceSession = function (...args: any[]) {
      const session = oldCreatePresenceSession.apply(this, args);
      session.activate = () => {};
      return session;
    };
  }

  if (!enabled && oldCreatePresenceSession != null) {
    talkCoreWasm.createPresenceSession = oldCreatePresenceSession;
    oldCreatePresenceSession = null;
  }

  return storeState;
}

class CreatePresenceSession {
  constructor() {
    const store = getSnapchatStore();
    store.subscribe(handleStoreEffect);
    registerMiddleware(handleStoreEffect);
    settings.on(`BITMOJI_PRESENCE.setting:update`, updateSnapchatStore);
  }
}

export default new CreatePresenceSession();
