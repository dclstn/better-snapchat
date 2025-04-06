import { BitmojiPresence } from '../../lib/constants';
import settings from '../../lib/settings';
import Module from '../../utils/module';
import { getSnapchatStore } from '../../utils/snapchat';

const store = getSnapchatStore();

let oldCreatePresenceSession: any = null;
let newCreatePresenceSession: any = null;

class BitmojiHide extends Module {
  constructor() {
    super('BitmojiHide');
    store.subscribe((storeState: any) => storeState.talk, this.load.bind(this));
    settings.on(`BITMOJI_PRESENCE.setting:update`, () => this.load());
  }

  load(talkClient?: any) {
    talkClient = talkClient ?? store.getState().talk;
    if (talkClient?.client == null) {
      return;
    }

    const bitmojiPresence = settings.getSetting('BITMOJI_PRESENCE');
    const enabled = bitmojiPresence === BitmojiPresence.HIDE;

    if (enabled && talkClient.client.createPresenceSession !== newCreatePresenceSession) {
      oldCreatePresenceSession = talkClient.client.createPresenceSession;

      newCreatePresenceSession = new Proxy(oldCreatePresenceSession, {
        apply: function (target: any, thisArg: any, args: any[]) {
          const presenceSession = Reflect.apply(target, thisArg, args) as any;
          presenceSession.activate = () => {};
          return presenceSession;
        },
      });

      talkClient.client.createPresenceSession = newCreatePresenceSession;
    }

    if (!enabled && oldCreatePresenceSession != null) {
      talkClient.client.createPresenceSession = oldCreatePresenceSession;
      oldCreatePresenceSession = null;
    }
  }
}

export default new BitmojiHide();
