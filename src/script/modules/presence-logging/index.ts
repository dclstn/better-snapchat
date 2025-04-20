import settings from '../../lib/settings';
import Module from '../../lib/module';
import { getConversation, getSnapchatPublicUser, getSnapchatStore } from '../../utils/snapchat';
import { logInfo } from '../../lib/debug';
import { PresenceActionMap, PresenceState } from '../../lib/constants';

const store = getSnapchatStore();

let oldOnActiveConversationInfoUpdated: any = null;
let newOnActiveConversationInfoUpdated: any = null;

function sendPresenceNotification({
  user,
  presenceState,
  conversation,
}: {
  user: any;
  presenceState: PresenceState;
  conversation: any;
}) {
  const { username, bitmojiAvatarId, bitmojiSelfieId } = user;
  const conversationTitle = conversation.title ?? 'your Chat';
  const navigationPath = conversation.id != null ? `/${conversation.id}` : undefined;
  const action = PresenceActionMap[presenceState](conversationTitle);

  let iconUrl = undefined;
  if (bitmojiSelfieId != null && bitmojiAvatarId != null) {
    iconUrl = `https://sdk.bitmoji.com/render/panel/${bitmojiSelfieId}-${bitmojiAvatarId}-v1.webp?transparent=1&trim=circle&scale=1`;
  } else if (bitmojiAvatarId != null) {
    iconUrl = `https://sdk.bitmoji.com/render/panel/${bitmojiAvatarId}-v1.webp?transparent=1&trim=circle&scale=1`;
  }

  const notificationOptions = {
    body: action,
    icon: iconUrl,
    data: { url: navigationPath },
  };

  return new Notification(username, notificationOptions);
}

const userPresenceMap: Map<string, PresenceState> = new Map();
const serializeUserConversationId = (userId: string, conversationId: string) => `${userId}:${conversationId}`;

async function handleOnActiveConversationInfoUpdated(activeConversationInfo: any) {
  const halfSwipeNotificationEnabled = settings.getSetting('HALF_SWIPE_NOTIFICATION');
  const presenceLoggingEnabled = settings.getSetting('PRESENCE_LOGGING');

  for (const [conversationId, { peekingParticipants, typingParticipants }] of activeConversationInfo.entries()) {
    const conversation = getConversation(conversationId)?.conversation;
    const conversationTitle = conversation?.title ?? 'your Chat';
    if (conversation == null) {
      continue;
    }

    for (const userId of peekingParticipants) {
      const user = await getSnapchatPublicUser(userId);

      const serializedId = serializeUserConversationId(userId, conversationId);
      const previousState = userPresenceMap.get(serializedId);

      if (presenceLoggingEnabled) {
        const action = PresenceActionMap[PresenceState.PEEKING](conversationTitle);
        logInfo(user.username, action);
      }

      if (previousState === PresenceState.PEEKING) {
        continue;
      }

      if (halfSwipeNotificationEnabled) {
        sendPresenceNotification({ user, presenceState: PresenceState.PEEKING, conversation });
      }

      userPresenceMap.set(serializedId, PresenceState.PEEKING);
    }

    for (const { userId, typingState } of typingParticipants) {
      const user = await getSnapchatPublicUser(userId);
      const presenceState = typingState === 1 ? PresenceState.TYPING : PresenceState.IDLE;

      const serializedId = serializeUserConversationId(userId, conversationId);
      const previousState = userPresenceMap.get(serializedId);

      if (presenceLoggingEnabled) {
        const action = PresenceActionMap[presenceState](conversationTitle);
        logInfo(user.username, action);
      }

      if (previousState === presenceState) {
        continue;
      }

      userPresenceMap.set(serializedId, presenceState);
    }
  }
}

class PresenceLogging extends Module {
  constructor() {
    super('PresenceLogging');
    store.subscribe((storeState: any) => storeState.presence, this.load);
    settings.on('PRESENCE_LOGGING.setting:update', () => this.load());
    settings.on('HALF_SWIPE_NOTIFICATION.setting:update', () => this.load());
    settings.on('OPEN_CHAT_NOTIFICATION.setting:update', () => this.load());
  }

  load(presenceClient?: any) {
    presenceClient = presenceClient ?? store.getState().presence;
    if (presenceClient == null || oldOnActiveConversationInfoUpdated != null) {
      return;
    }

    const halfSwipeNotificationEnabled = settings.getSetting('HALF_SWIPE_NOTIFICATION');
    const presenceLoggingEnabled = settings.getSetting('PRESENCE_LOGGING');
    const enabled = halfSwipeNotificationEnabled || presenceLoggingEnabled;
    const changedValues: any = {};

    if (enabled && presenceClient.onActiveConversationInfoUpdated !== newOnActiveConversationInfoUpdated) {
      oldOnActiveConversationInfoUpdated = presenceClient.onActiveConversationInfoUpdated;

      newOnActiveConversationInfoUpdated = new Proxy(oldOnActiveConversationInfoUpdated, {
        apply(targetFunc: any, thisArg: any, [activeConversationPayload, ...rest]: any) {
          handleOnActiveConversationInfoUpdated(activeConversationPayload);
          return Reflect.apply(targetFunc, thisArg, [activeConversationPayload, ...rest]);
        },
      });

      changedValues.onActiveConversationInfoUpdated = newOnActiveConversationInfoUpdated;
    }

    if (!enabled && oldOnActiveConversationInfoUpdated != null) {
      changedValues.onActiveConversationInfoUpdated = oldOnActiveConversationInfoUpdated;
      oldOnActiveConversationInfoUpdated = null;
      userPresenceMap.clear();
    }

    if (Object.keys(changedValues).length === 0) {
      return;
    }

    store.setState({ presence: { ...presenceClient, ...changedValues } });
  }
}

export default new PresenceLogging();
