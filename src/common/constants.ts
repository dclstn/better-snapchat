export const DynamicRuleIds = {
  BLOCK_PREVENT_TYPING_NOTIFICATION: 1,
};

export enum SettingIds {
  ALLOW_SCREENSHOT = 'ALLOW_SCREENSHOT',
  PREVENT_TYPING_NOTIFICATION = 'PREVENT_TYPING_NOTIFICATION',
}

export const DefaultSettingValues = {
  [SettingIds.ALLOW_SCREENSHOT]: true,
  [SettingIds.PREVENT_TYPING_NOTIFICATION]: true,
};

export const EventTypes = {
  SETTING_UPDATE: 'setting:update',
};

export const PayloadNames = {
  PREVENT_TYPING_NOTIFICATION: 'send:typing',
};
