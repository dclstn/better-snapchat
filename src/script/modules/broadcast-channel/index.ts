import { BroadcastChannelEvents, EventTypes } from '../../lib/constants';
import settings from '../../lib/settings';
import broadcastChannel from '../../utils/broadcast-channel';

function settingsUpdateHandler() {
  broadcastChannel.postMessage({
    type: BroadcastChannelEvents.SETTINGS_UPDATE,
    settings: settings.getSettings(),
  });
}

class BroadcastChannel {
  constructor() {
    settingsUpdateHandler();
    settings.on(EventTypes.SETTING_UPDATE, settingsUpdateHandler);
  }
}

export default new BroadcastChannel();
