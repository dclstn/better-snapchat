import settings from '../../lib/settings';
import { registerMiddleware, updateSnapchatStore } from '../../utils/middleware';

let oldSetScreenshotDetected: any = null;

function handleStoreEffect(storeState: any) {
  const enabled = settings.getSetting('ALLOW_SCREENSHOT');

  if (enabled) {
    if (oldSetScreenshotDetected == null) {
      oldSetScreenshotDetected = storeState.presence.setScreenshotDetected;
    }
    storeState.presence.setScreenshotDetected = () => {};
    storeState.presence.screenshotDetected = false;
  }

  if (!enabled && oldSetScreenshotDetected != null) {
    storeState.presence.setScreenshotDetected = oldSetScreenshotDetected;
    oldSetScreenshotDetected = null;
  }

  return storeState;
}

class ScreenshotDetected {
  constructor() {
    registerMiddleware(handleStoreEffect);
    settings.on(`ALLOW_SCREENSHOT.setting:update`, updateSnapchatStore);
  }
}

export default new ScreenshotDetected();
