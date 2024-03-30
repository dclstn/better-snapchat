import EventEmitter from 'eventemitter3';
import { DefaultSettingValues, EventTypes, SettingIds } from './constants';
import storage from './storage';

class Settings extends EventEmitter {
  settings: Map<string, boolean>;

  constructor() {
    super();
    const settings = storage.get('settings');
    if (settings != null) {
      this.settings = new Map(Object.entries(settings));
    } else {
      this.settings = new Map();
    }
  }

  setSetting(key: SettingIds, value: boolean): void {
    this.settings.set(key, value);
    storage.set('settings', Object.fromEntries(this.settings));
    this.emit(`${key}.${EventTypes.SETTING_UPDATE}`, value);
    this.emit(EventTypes.SETTING_UPDATE, key, value);
  }

  getSetting(key: SettingIds) {
    const value = this.settings.get(key);
    if (value == null) {
      this.setSetting(key, DefaultSettingValues[key]);
      return DefaultSettingValues[key];
    }
    return value;
  }

  getSettings() {
    return Object.fromEntries(this.settings);
  }
}

export default new Settings();
