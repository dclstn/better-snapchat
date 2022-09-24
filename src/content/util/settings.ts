import { EventTypes, SettingIds } from '../../common/constants';
import EventEmitter from 'eventemitter3';

class Settings extends EventEmitter {
  settings: Map<SettingIds, boolean>;

  constructor() {
    super();
    this.settings = new Map();
  }

  setSetting(key: SettingIds, value: boolean): void {
    this.settings.set(key, value);
    this.emit(`${key}.${EventTypes.SETTING_UPDATE}`, value);
  }
}

export default new Settings();
