import { EventTypes, PayloadNames, SettingIds } from '../../../common/constants';
import settings from '../../util/settings';

class PreventTypingNotification {
  constructor() {
    this.load();
    settings.on(`${SettingIds.PREVENT_TYPING_NOTIFICATION}.${EventTypes.SETTING_UPDATE}`, this.load);
  }

  load() {
    chrome.runtime.sendMessage({
      payload: PayloadNames.PREVENT_TYPING_NOTIFICATION,
      value: settings.getSetting(SettingIds.PREVENT_TYPING_NOTIFICATION),
    });
  }
}

export default new PreventTypingNotification();
