export enum DynamicRuleIds {
  BLOCK_PREVENT_TYPING_NOTIFICATION = 1,
  BLOCK_EVENTS = 2,
  MODIFY_HEADER = 3,
}

export enum SettingIds {
  ALLOW_SCREENSHOT = 'ALLOW_SCREENSHOT',
  PREVENT_TYPING_NOTIFICATION = 'PREVENT_TYPING_NOTIFICATION',
  SAVE_IMAGE = 'SAVE_IMAGE_BUTTON',
  ALWAYS_PRESENT = 'ALWAYS_PRESENT',
}

export const DefaultSettingValues = {
  [SettingIds.ALLOW_SCREENSHOT]: true,
  [SettingIds.PREVENT_TYPING_NOTIFICATION]: false,
  [SettingIds.SAVE_IMAGE]: true,
  [SettingIds.ALWAYS_PRESENT]: false,
};

export const EventTypes = {
  SETTING_UPDATE: 'setting:update',
};

export const PayloadNames = {
  SETTING_UPDATE: 'setting:update',
};
