import settings from '../../lib/settings';

let oldFilePrototype: any = null;
class FilePrevention {
  constructor() {
    this.load();
    settings.on(`UNLIMITED_FILE_SIZE.setting:update`, this.load);
  }

  load() {
    const enabled = settings.getSetting('UNLIMITED_FILE_SIZE');

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
