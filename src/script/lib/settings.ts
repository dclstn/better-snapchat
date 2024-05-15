import EventEmitter from 'eventemitter3';
import { defaultSettingValues, EventType, eventTypes, SettingId } from './constants';
import storage from './storage';
import broadcastChannel from './broadcast-channel';

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

    broadcastChannel.addEventListener('message', ({ data }) => {
      if (data.type === 'setting:update') {
        this.setSettings(data.settings);
      }
    });
  }

  setSetting(key: SettingId, value: boolean): void {
    if (this.settings.get(key) === value) {
      return;
    }
    this.settings.set(key, value);
    storage.set('settings', Object.fromEntries(this.settings));
    this.eventEmitter.emit(`${key}.setting:update`, value);
    this.eventEmitter.emit('setting:update', key, value);
  }

  getSetting(key: SettingId) {
    const value = this.settings.get(key);
    if (value == null) {
      this.setSetting(key, defaultSettingValues[key]);
      return defaultSettingValues[key];
    }
    return value;
  }

  getSettings() {
    return Object.fromEntries(this.settings);
  }

  setSettings(settings: Record<string, boolean>) {
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
