export enum SettingIds {
  ALLOW_SCREENSHOT = 'ALLOW_SCREENSHOT',
  PREVENT_TYPING_NOTIFICATION = 'PREVENT_TYPING_NOTIFICATION',
  PREVENT_TYPING = 'PREVENT_TYPING',
  SAVE_IMAGE = 'SAVE_IMAGE_BUTTON',
  ALWAYS_PRESENT = 'ALWAYS_PRESENT',
  HIDE_BITMOJI = 'HIDE_BITMOJI',
  MOBILE_BITMOJI = 'MOBILE_BITMOJI',
  AUTO_SAVE_CHATS = 'AUTO_SAVE_CHATS',
  SHOW_STREAKS = 'SHOW_STREAKS',
  PREVENT_CHAT_READ_RECEIPTS = 'PREVENT_READ_RECEIPTS',
  PREVENT_STORY_READ_RECEIPTS = 'PREVENT_STORY_READ_RECEIPTS',
  UNLIMITED_FILE_SIZE = 'UNLIMITED_FILE_SIZE',
  ALLOW_CROSS_TAB = 'ALLOW_CROSS_TAB',
  HALF_SWIPE_NOTIFICATION = 'HALF_SWIPE_NOTIFICATION',
  OPEN_CHAT_NOTIFICATION = 'OPEN_CHAT_NOTIFICATION',
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
  [SettingIds.PREVENT_CHAT_READ_RECEIPTS]: false,
  [SettingIds.UNLIMITED_FILE_SIZE]: true,
  [SettingIds.ALLOW_CROSS_TAB]: true,
  [SettingIds.PREVENT_STORY_READ_RECEIPTS]: false,
  [SettingIds.HALF_SWIPE_NOTIFICATION]: false,
  [SettingIds.OPEN_CHAT_NOTIFICATION]: false,
};

export enum EventTypes {
  SETTING_UPDATE = 'setting:update',
}

export enum ExternalUrls {
  DISCORD = 'https://discord.gg/hpmjAJZR3H',
  GITHUB = 'https://github.com/dclstn/better-snapchat',
  GITHUB_DCLSTN = 'https://github.com/dclstn',
  BUY_ME_A_COFFEE = 'https://www.buymeacoffee.com/dclstn',
}

export enum SnapchatUpdateMessagePayload {
  SAVE_CHAT = 3,
}

export enum BroadcastChannelEvents {
  SETTINGS_UPDATE = 'settings:update',
}
