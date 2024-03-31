import { EventTypes, SettingIds } from '../../lib/constants';
import settings from '../../lib/settings';

let oldFilePrototype: any = null;
class FilePrevention {
  constructor() {
    this.load();
    settings.on(`${SettingIds.UNLIMITED_FILE_SIZE}.${EventTypes.SETTING_UPDATE}`, this.load);
  }

  load() {
    const enabled = settings.getSetting(SettingIds.UNLIMITED_FILE_SIZE);

    if (enabled && oldFilePrototype == null) {
      oldFilePrototype = window.File.prototype;
      Object.defineProperty(window.File.prototype, 'size', { get: () => 500 });
    }

    if (!enabled && oldFilePrototype != null) {
      window.File.prototype = oldFilePrototype;
      oldFilePrototype = null;
    }
  }
}

export default new FilePrevention();
