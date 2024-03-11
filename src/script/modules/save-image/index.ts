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
    if (settings.getSetting(SettingIds.SAVE_IMAGE)) {
      window.addEventListener('contextmenu', preventContextMenu, true);
    } else if (attached) {
      window.removeEventListener('contextmenu', preventContextMenu, true);
    }
  }
}

export default new SaveImage();
