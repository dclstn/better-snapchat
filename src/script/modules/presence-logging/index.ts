import settings from '../../lib/settings';
import Module from '../../lib/module';
import { getSnapchatPublicUser, getSnapchatStore } from '../../utils/snapchat';
import { logInfo, logPresence, PresenceState } from '../../lib/debug';

const store = getSnapchatStore();

let oldOnActiveConversationInfoUpdated: any = null;
let newOnActiveConversationInfoUpdated: any = null;

enum TypingState {
  TYPING = 1,
  STOPPED = 2,
}

const TypingStateMap = {
  [TypingState.TYPING]: 'typing',
  [TypingState.STOPPED]: 'stopped',
};

function bitmojiAvatarUrl(bitmojiAvatarId?: string, bitmojiSelfieId?: string) {
  if (bitmojiAvatarId == null || bitmojiSelfieId == null) {
    return undefined;
  }

  return `https://sdk.bitmoji.com/render/panel/${bitmojiSelfieId}-${bitmojiAvatarId}-v1.webp?transparent=1&trim=circle&scale=1`;
}

function handleOnActiveConversationInfoUpdated(activeConversationInfo: any) {
  for (const [conversationId, value] of activeConversationInfo.entries()) {
    if (value.peekingParticipants.length > 0) {
      const [userId] = value.peekingParticipants;
      const user = getSnapchatPublicUser(userId);
      logPresence(PresenceState.PEEKING, user);
    }

    if (value.typingParticipants.length > 0) {
      const [{ userId, typingState }] = value.typingParticipants;
      const { username, user_id } = getSnapchatPublicUser(userId);
      const presenceState = typingState === 1 ? PresenceState.TYPING : PresenceState.STOPPED;
      logPresence(presenceState, { username, user_id });
    }

    if (value.presentParticipants.length > 0) {
      const [userId] = value.presentParticipants;
      const user = getSnapchatPublicUser(userId);
      logInfo(user, 'present');
    }
  }

  return oldOnActiveConversationInfoUpdated(activeConversationInfo);
}

class PresenceLogging extends Module {
  constructor() {
    super('PresenceLogging');
    store.subscribe((storeState: any) => storeState.presence, this.load);
    settings.on('HALF_SWIPE_NOTIFICATION.setting:update', () => this.load());
  }

  load(presenceClient?: any) {
    presenceClient = presenceClient ?? store.getState().presence;
    if (presenceClient == null || oldOnActiveConversationInfoUpdated != null) {
      return;
    }
    const halfSwipeNotificationEnabled = settings.getSetting('HALF_SWIPE_NOTIFICATION');
    const changedValues: any = {};

    if (
      halfSwipeNotificationEnabled &&
      presenceClient.onActiveConversationInfoUpdated !== newOnActiveConversationInfoUpdated
    ) {
      oldOnActiveConversationInfoUpdated = presenceClient.onActiveConversationInfoUpdated;

      newOnActiveConversationInfoUpdated = new Proxy(oldOnActiveConversationInfoUpdated, {
        apply(targetFunc: any, thisArg: any, [activeConversationPayload, ...rest]: any) {
          handleOnActiveConversationInfoUpdated(activeConversationPayload);
          return Reflect.apply(targetFunc, thisArg, [activeConversationPayload, ...rest]);
        },
      });

      changedValues.onActiveConversationInfoUpdated = newOnActiveConversationInfoUpdated;
    }

    if (!halfSwipeNotificationEnabled && oldOnActiveConversationInfoUpdated != null) {
      changedValues.onActiveConversationInfoUpdated = oldOnActiveConversationInfoUpdated;
      oldOnActiveConversationInfoUpdated = null;
    }

    if (Object.keys(changedValues).length === 0) {
      return;
    }

    store.setState({ presence: { ...presenceClient, ...changedValues } });
  }
}

export default new PresenceLogging();
