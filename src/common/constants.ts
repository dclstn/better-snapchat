export const DynamicRuleIds = {
  BLOCK_PREVENT_TYPING_NOTIFICATION: 1,
  MODIFY_HEADER: 2,
};

export enum SettingIds {
  ALLOW_SCREENSHOT = 'ALLOW_SCREENSHOT',
  PREVENT_TYPING_NOTIFICATION = 'PREVENT_TYPING_NOTIFICATION',
  SAVE_IMAGE_BUTTON = 'SAVE_IMAGE_BUTTON',
}

export const DefaultSettingValues = {
  [SettingIds.ALLOW_SCREENSHOT]: true,
  [SettingIds.PREVENT_TYPING_NOTIFICATION]: false,
  [SettingIds.SAVE_IMAGE_BUTTON]: true,
};

export const EventTypes = {
  SETTING_UPDATE: 'setting:update',
};

export const PayloadNames = {
  PREVENT_TYPING_NOTIFICATION: 'send:typing',
};
