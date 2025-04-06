import settings from '../lib/settings';

const CROSS_TAB_BROADCAST_CHANNEL = 'cross_tab';

class BroadcastChannel extends window.BroadcastChannel {
  addEventListener(type: string, listener: EventListener) {
    return super.addEventListener(type, (event) => {
      if (
        this.name === CROSS_TAB_BROADCAST_CHANNEL &&
        settings.getSetting('ALLOW_CROSS_TAB') &&
        (event as any)?.data?.type === 'CLAIM_ACTIVE'
      ) {
        return;
      }
      listener(event);
    });
  }
}

window.BroadcastChannel = BroadcastChannel;
