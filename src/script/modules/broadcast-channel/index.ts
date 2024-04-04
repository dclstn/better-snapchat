import broadcastChannel from '../../lib/broadcast-channel';
import { BroadcastChannelEvents, EventTypes } from '../../lib/constants';
import settings from '../../lib/settings';

function settingsUpdateHandler() {
  broadcastChannel.postMessage({
    type: BroadcastChannelEvents.SETTINGS_UPDATE,
    settings: settings.getSettings(),
  });
}

class BroadcastChannelModule {
  constructor() {
    settingsUpdateHandler();
    settings.on(EventTypes.SETTING_UPDATE, settingsUpdateHandler);
  }
}

export default new BroadcastChannelModule();
