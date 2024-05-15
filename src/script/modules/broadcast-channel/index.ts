import broadcastChannel from '../../lib/broadcast-channel';
import settings from '../../lib/settings';

function settingsUpdateHandler() {
  broadcastChannel.postMessage({
    type: 'setting:update',
    settings: settings.getSettings(),
  });
}

class BroadcastChannelModule {
  constructor() {
    settingsUpdateHandler();
    settings.on('setting:update', settingsUpdateHandler);
  }
}

export default new BroadcastChannelModule();
