import { SettingIds } from '../lib/constants';
import settings from '../lib/settings';

const CROSS_TAB_BROADCAST_CHANNEL = 'cross_tab';

export default function patchBroadcastChannel() {
  class BroadcastChannel extends window.BroadcastChannel {
    // eslint-disable-next-line no-undef
    addEventListener(type: string, listener: EventListener) {
      return super.addEventListener(type, (event) => {
        if (
          this.name === CROSS_TAB_BROADCAST_CHANNEL &&
          settings.getSetting(SettingIds.ALLOW_CROSS_TAB) &&
          (event as any)?.data?.type === 'CLAIM_ACTIVE'
        ) {
          return;
        }
        listener(event);
      });
    }
  }

  window.BroadcastChannel = BroadcastChannel;
}
