export const SettingIds = {
  BITMOJI_PRESENCE: 'BITMOJI_PRESENCE',
  ALLOW_SCREENSHOT: 'ALLOW_SCREENSHOT',
  SAVE_IMAGE: 'SAVE_IMAGE',
  ALWAYS_PRESENT: 'ALWAYS_PRESENT',
  SEND_UNSAVEABLE_MESSAGES: 'SEND_UNSAVEABLE_MESSAGES',
  SNAP_AS_MOBILE: 'SNAP_AS_MOBILE',
  PRIVATE_STORIES: 'PRIVATE_STORIES',
  UPLOAD_SNAPS: 'UPLOAD_SNAPS',
  ALLOW_SNAP_VIEWING: 'ALLOW_SNAP_VIEWING',
  PREVENT_TYPING_NOTIFICATION: 'PREVENT_TYPING_NOTIFICATION',
  PREVENT_TYPING: 'PREVENT_TYPING',
  /**
   * @deprecated Use {@link SettingIds.BITMOJI_PRESENCE} instead.
   */
  HIDE_BITMOJI: 'HIDE_BITMOJI',
  /**
   * @deprecated Use {@link SettingIds.BITMOJI_PRESENCE} instead.
   */
  MOBILE_BITMOJI: 'MOBILE_BITMOJI',
  AUTO_SAVE_CHATS: 'AUTO_SAVE_CHATS',
  SHOW_STREAKS: 'SHOW_STREAKS',
  PREVENT_CHAT_READ_RECEIPTS: 'PREVENT_CHAT_READ_RECEIPTS',
  UNLIMITED_FILE_SIZE: 'UNLIMITED_FILE_SIZE',
  ALLOW_CROSS_TAB: 'ALLOW_CROSS_TAB',
  PREVENT_STORY_READ_RECEIPTS: 'PREVENT_STORY_READ_RECEIPTS',
  HALF_SWIPE_NOTIFICATION: 'HALF_SWIPE_NOTIFICATION',
  OPEN_CHAT_NOTIFICATION: 'OPEN_CHAT_NOTIFICATION',
  CHAT_HANDLING: 'CHAT_HANDLING',
} as const;

export enum BitmojiPresence {
  DEFAULT = 'DEFAULT',
  HIDE = 'HIDE',
  MOBILE = 'MOBILE',
}

export enum ChatHandling {
  DEFAULT = 'DEFAULT',
  AUTO_SAVE = 'AUTO_SAVE',
  NO_READ_RECEIPTS = 'NO_READ_RECEIPTS',
}

export const defaultSettingValues = {
  [SettingIds.ALLOW_SCREENSHOT]: true,
  [SettingIds.SAVE_IMAGE]: true,
  [SettingIds.ALWAYS_PRESENT]: true,
  [SettingIds.SEND_UNSAVEABLE_MESSAGES]: false,
  [SettingIds.SNAP_AS_MOBILE]: false,
  [SettingIds.PRIVATE_STORIES]: false,
  [SettingIds.UPLOAD_SNAPS]: false,
  [SettingIds.ALLOW_SNAP_VIEWING]: false,
  [SettingIds.PREVENT_TYPING_NOTIFICATION]: false,
  [SettingIds.PREVENT_TYPING]: false,
  [SettingIds.HIDE_BITMOJI]: false,
  [SettingIds.MOBILE_BITMOJI]: false,
  [SettingIds.AUTO_SAVE_CHATS]: false,
  [SettingIds.SHOW_STREAKS]: true,
  [SettingIds.PREVENT_CHAT_READ_RECEIPTS]: false,
  [SettingIds.UNLIMITED_FILE_SIZE]: true,
  [SettingIds.ALLOW_CROSS_TAB]: true,
  [SettingIds.PREVENT_STORY_READ_RECEIPTS]: false,
  [SettingIds.HALF_SWIPE_NOTIFICATION]: false,
  [SettingIds.OPEN_CHAT_NOTIFICATION]: false,
  [SettingIds.BITMOJI_PRESENCE]: BitmojiPresence.DEFAULT,
  [SettingIds.CHAT_HANDLING]: ChatHandling.DEFAULT,
};

export type SettingId = keyof typeof SettingIds;

export const eventTypes = ['setting:update'] as const;

export type EventType = (typeof eventTypes)[number];

export enum SnapchatUpdateMessagePayload {
  SAVE_CHAT = 3,
}

export const ExternalUrls = {
  DISCORD: 'https://discord.gg/hpmjAJZR3H',
  GITHUB: 'https://github.com/dclstn/better-snapchat',
  GITHUB_DCLSTN: 'https://github.com/dclstn',
  BUY_ME_A_COFFEE: 'https://www.buymeacoffee.com/dclstn',
};
