export enum SettingIds {
  ALLOW_SCREENSHOT = 'ALLOW_SCREENSHOT',
  PREVENT_TYPING_NOTIFICATION = 'PREVENT_TYPING_NOTIFICATION',
  PREVENT_TYPING = 'PREVENT_TYPING',
  SAVE_IMAGE = 'SAVE_IMAGE_BUTTON',
  ALWAYS_PRESENT = 'ALWAYS_PRESENT',
  HIDE_BITMOJI = 'HIDE_BITMOJI',
  AUTO_SAVE_CHATS = 'AUTO_SAVE_CHATS',
  SHOW_STREAKS = 'SHOW_STREAKS',
}

export const DefaultSettingValues = {
  [SettingIds.ALLOW_SCREENSHOT]: true,
  [SettingIds.SAVE_IMAGE]: true,
  [SettingIds.ALWAYS_PRESENT]: true,
  [SettingIds.PREVENT_TYPING_NOTIFICATION]: false,
  [SettingIds.PREVENT_TYPING]: false,
  [SettingIds.HIDE_BITMOJI]: false,
  [SettingIds.AUTO_SAVE_CHATS]: false,
  [SettingIds.SHOW_STREAKS]: true,
};

export enum EventTypes {
  SETTING_UPDATE = 'setting:update',
}

export enum ExternalUrls {
  DISCORD = 'https://discord.gg/hpmjAJZR3H',
  GITHUB = 'https://github.com/dclstn/better-snapchat',
  BUY_ME_A_COFFEE = 'https://www.buymeacoffee.com/dclstn',
}

export enum SnapchatUpdateMessagePayload {
  SAVE_CHAT = 3,
}
