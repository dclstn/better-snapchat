import EventEmitter from 'eventemitter3';
import { defaultSettingValues, EventType, SettingId } from './constants';
import storage from './storage';

class Settings {
  settings: Map<string, boolean>;
  eventEmitter = new EventEmitter();

  constructor() {
    const settings = storage.get('settings');
    if (settings != null) {
      this.settings = new Map(Object.entries(settings));
    } else {
      this.settings = new Map();
    }
  }

  setSetting(key: SettingId, value: any): void {
    if (this.settings.get(key) === value) {
      return;
    }
    this.settings.set(key, value);
    storage.set('settings', Object.fromEntries(this.settings));
    this.eventEmitter.emit(`${key}.setting:update`, value);
    this.eventEmitter.emit('setting:update', key, value);
  }

  getSetting<T extends SettingId>(key: T): (typeof defaultSettingValues)[T] {
    const value = this.settings.get(key);
    if (value == null) {
      this.setSetting(key, defaultSettingValues[key]);
      return defaultSettingValues[key];
    }
    return value as (typeof defaultSettingValues)[T];
  }

  getSettings() {
    return Object.fromEntries(this.settings);
  }

  setSettings(settings: Record<string, any>) {
    for (const [key, value] of Object.entries(settings)) {
      this.setSetting(key as SettingId, value);
    }
  }

  on(event: EventType | `${SettingId}.${EventType}`, listener: (...args: any[]) => void) {
    this.eventEmitter.on(event, listener);
  }

  off(event: EventType | `${SettingId}.${EventType}`, listener: (...args: any[]) => void) {
    this.eventEmitter.off(event, listener);
  }
}

export default new Settings();
