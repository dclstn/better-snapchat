import { EventTypes, SettingIds } from '../../lib/constants';
import settings from '../../lib/settings';

let attached = false;

function preventContextMenu(event: MouseEvent) {
  event.stopImmediatePropagation();
}

class SaveImage {
  constructor() {
    this.load();
    settings.on(`${SettingIds.SAVE_IMAGE}.${EventTypes.SETTING_UPDATE}`, this.load);
  }

  load() {
    const enabled = settings.getSetting(SettingIds.SAVE_IMAGE);
    if (!attached && enabled) {
      attached = true;
      window.addEventListener('contextmenu', preventContextMenu, true);
    }
    if (attached && !enabled) {
      attached = false;
      window.removeEventListener('contextmenu', preventContextMenu, true);
    }
  }
}

export default new SaveImage();
