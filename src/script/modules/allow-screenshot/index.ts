import settings from '../../lib/settings';
import { EventTypes, SettingIds } from '../../lib/constants';
import { registerMiddleware, updateSnapchatStore } from '../../utils/middleware';

let oldSetScreenshotDetected: any = null;

function handleStoreEffect(storeState: any) {
  const enabled = settings.getSetting(SettingIds.ALLOW_SCREENSHOT);

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

class AllowScreenshot {
  constructor() {
    registerMiddleware(handleStoreEffect);
    settings.on(`${SettingIds.ALLOW_SCREENSHOT}.${EventTypes.SETTING_UPDATE}`, updateSnapchatStore);
  }
}

export default new AllowScreenshot();
