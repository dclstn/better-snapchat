import { EventTypes, PayloadNames, SettingIds } from '../../../common/constants';
import settings from '../../lib/settings';

class PreventTypingNotification {
  constructor() {
    this.load();
    settings.on(`${SettingIds.PREVENT_TYPING_NOTIFICATION}.${EventTypes.SETTING_UPDATE}`, this.load);
  }

  load() {
    chrome.runtime.sendMessage({
      payloadName: PayloadNames.SETTING_UPDATE,
      settingId: SettingIds.PREVENT_TYPING_NOTIFICATION,
      value: settings.getSetting(SettingIds.PREVENT_TYPING_NOTIFICATION),
    });
  }
}

export default new PreventTypingNotification();
