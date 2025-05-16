import Patch from '../lib/patch';
import settings from '../lib/settings';

const CROSS_TAB_BROADCAST_CHANNEL = 'cross_tab';

class CrossTabBroadcastChannel extends Patch {
  constructor() {
    super('Cross-Tab Broadcast Channel');
  }

  patch() {
    const oldBroadcastChannel = window.BroadcastChannel;

    window.BroadcastChannel = class PatchedBroadcastChannel extends window.BroadcastChannel {
      constructor(name: string) {
        super(name);

        if (name === CROSS_TAB_BROADCAST_CHANNEL) {
          window.BroadcastChannel = oldBroadcastChannel;
        }
      }

      addEventListener(type: string, listener: EventListener) {
        if (this.name !== CROSS_TAB_BROADCAST_CHANNEL) {
          return super.addEventListener(type, listener);
        }

        return super.addEventListener(type, ((event: MessageEvent) => {
          if (settings.getSetting('ALLOW_CROSS_TAB') && event.data.type === 'CLAIM_ACTIVE') {
            return;
          }

          listener(event);
        }) as EventListener);
      }
    };
  }
}

export default new CrossTabBroadcastChannel();
