export const defaultSettingValues = {
  'ALLOW_SCREENSHOT': true,
  'SAVE_IMAGE': true,
  'ALWAYS_PRESENT': true,
  'PREVENT_TYPING_NOTIFICATION': false,
  'PREVENT_TYPING': false,
  'HIDE_BITMOJI': false,
  'MOBILE_BITMOJI': false,
  'AUTO_SAVE_CHATS': false,
  'SHOW_STREAKS': true,
  'PREVENT_CHAT_READ_RECEIPTS': false,
  'UNLIMITED_FILE_SIZE': true,
  'ALLOW_CROSS_TAB': true,
  'PREVENT_STORY_READ_RECEIPTS': false,
  'HALF_SWIPE_NOTIFICATION': false,
  'OPEN_CHAT_NOTIFICATION': false,
};

export type SettingId = keyof typeof defaultSettingValues;

export const eventTypes = ['setting:update']

export enum SnapchatUpdateMessagePayload {
  SAVE_CHAT = 3,
}

export const externalUrls = {
  DISCORD: 'https://discord.gg/hpmjAJZR3H',
  GITHUB: 'https://github.com/dclstn/better-snapchat',
  GITHUB_DCLSTN: 'https://github.com/dclstn',
  BUY_ME_A_COFFEE: 'https://www.buymeacoffee.com/dclstn',  
}

