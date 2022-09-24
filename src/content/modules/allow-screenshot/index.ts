import { EventTypes, SettingIds } from '../../../common/constants';
import settings from '../../util/settings';

function preventPropogation(event: KeyboardEvent) {
  event.stopImmediatePropagation();
}

let listener: any = null;

class AllowScreenshot {
  constructor() {
    this.load();
    settings.on(`${SettingIds.ALLOW_SCREENSHOT}.${EventTypes.SETTING_UPDATE}`, this.load);
  }

  load() {
    const enabled = settings.getSetting(SettingIds.ALLOW_SCREENSHOT);

    if (enabled && listener == null) {
      window.addEventListener('keydown', preventPropogation, true);
    }

    if (!enabled) {
      window.removeEventListener('keydown', preventPropogation, true);
      listener = null;
    }
  }
}

export default new AllowScreenshot();
