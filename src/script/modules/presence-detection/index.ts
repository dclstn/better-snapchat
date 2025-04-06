import settings from '../../lib/settings';
import Module from '../../lib/module';
import { getSnapchatStore } from '../../utils/snapchat';

let oldSetAwayState: any = null;
let oldSetScreenshotDetected: any = null;
let oldBroadcastTypingActivity: any = null;

const newSetAwayState = () => {};
const newSetScreenshotDetected = () => {};
const newBroadcastTypingActivity = () => {};

const store = getSnapchatStore();

class PresenceDetection extends Module {
  constructor() {
    super('PresenceDetection');
    store.subscribe((storeState: any) => storeState.presence, this.load);
    settings.on('ALWAYS_PRESENT.setting:update', () => this.load());
    settings.on('ALLOW_SCREENSHOT.setting:update', () => this.load());
    settings.on('PREVENT_TYPING.setting:update', () => this.load());
  }

  load(presenceClient?: any) {
    presenceClient = presenceClient ?? store.getState().presence;
    if (presenceClient == null) {
      return;
    }

    const alwaysPresentEnabled = settings.getSetting('ALWAYS_PRESENT');
    const allowScreenshotEnabled = settings.getSetting('ALLOW_SCREENSHOT');
    const preventTypingEnabled = settings.getSetting('PREVENT_TYPING');

    const changedValues: any = {};

    if (alwaysPresentEnabled && presenceClient.setAwayState !== newSetAwayState) {
      oldSetAwayState = presenceClient.setAwayState;
      changedValues.setAwayState = newSetAwayState;
    }

    if (!alwaysPresentEnabled && oldSetAwayState != null) {
      changedValues.setAwayState = oldSetAwayState;
      oldSetAwayState = null;
    }

    if (allowScreenshotEnabled && presenceClient.setScreenshotDetected !== newSetScreenshotDetected) {
      oldSetScreenshotDetected = presenceClient.setScreenshotDetected;
      changedValues.setScreenshotDetected = newSetScreenshotDetected;
    }

    if (!allowScreenshotEnabled && oldSetScreenshotDetected != null) {
      changedValues.setScreenshotDetected = oldSetScreenshotDetected;
      oldSetScreenshotDetected = null;
    }

    if (preventTypingEnabled && presenceClient.broadcastTypingActivity !== newBroadcastTypingActivity) {
      oldBroadcastTypingActivity = presenceClient.broadcastTypingActivity;
      changedValues.broadcastTypingActivity = newBroadcastTypingActivity;
    }

    if (!preventTypingEnabled && oldBroadcastTypingActivity != null) {
      changedValues.broadcastTypingActivity = oldBroadcastTypingActivity;
      oldBroadcastTypingActivity = null;
    }

    if (Object.keys(changedValues).length === 0) {
      return;
    }

    store.setState({ presence: { ...presenceClient, ...changedValues } });
  }
}

export default new PresenceDetection();
