import { KeyCode } from '@nextui-org/react';
import { EventTypes, SettingIds } from '../../../common/constants';
import settings from '../../lib/settings';

const Keys = new Set([KeyCode.Ctrl, KeyCode.Alt, KeyCode.Meta, KeyCode.Shift]);

function preventPropogation(event: KeyboardEvent) {
  if (!Keys.has(event.keyCode) && event.key !== 'PrintScreen') {
    return;
  }

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

    if (!enabled && listener != null) {
      window.removeEventListener('keydown', preventPropogation, true);
      listener = null;
    }
  }
}

export default new AllowScreenshot();
