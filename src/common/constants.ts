export const DynamicRuleIds = {
  BLOCK_SEND_TYPING: 1,
};

export enum SettingIds {
  PREVENT_SCREENSHOT_DETECTION = 'prevent:screenshot:detection',
  PREVENT_TYPING_NOTIFICATION = 'prevent:typing:notification',
}

export const DefaultSettingValues = {
  [SettingIds.PREVENT_SCREENSHOT_DETECTION]: true,
  [SettingIds.PREVENT_TYPING_NOTIFICATION]: false,
};

export const EventTypes = {
  SETTING_UPDATE: 'setting:update',
};
