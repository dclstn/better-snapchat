import { logTimeSensitiveInfo } from '../../lib/debug';
import settings from '../../lib/settings';
import { getPresencePayload, getSerializeUserId, getTransientMessage } from '../../utils/snapchat';
import { getSnapchatStore } from '../../utils/snapchat';

enum SnapchatPresenceStates {
  IDLE = 1,
  TYPING = 17,
  PEEKING = 256,
}

enum ChatStates {
  PEEK,
  OPEN,
}

const chatState: Map<string, ChatStates> = new Map();

interface SnapchatPublicInfo {
  username?: string;
  display_name?: string;
  bitmoji_avatar_id?: string;
  bitmoji_selfie_id?: string;
  mutable_username?: string;
}

function bitmojiAvatarUrl(bitmojiAvatarId?: string, bitmojiSelfieId?: string) {
  if (bitmojiAvatarId == null || bitmojiSelfieId == null) {
    return undefined;
  }
  return `https://sdk.bitmoji.com/render/panel/${bitmojiSelfieId}-${bitmojiAvatarId}-v1.webp?transparent=1&trim=circle&scale=1`;
}

function createNotification({
  username,
  iconUrl,
  action,
  conversationTitle,
  navigationPath,
}: {
  username: string;
  action: string;
  iconUrl?: string;
  conversationTitle?: string;
  navigationPath?: string;
}) {
  const notification = new Notification(username, { body: `${action} ${conversationTitle}`, icon: iconUrl });

  notification.addEventListener('click', () => {
    if (navigationPath == null) {
      return;
    }
    window.location.pathname = navigationPath;
  });

  logTimeSensitiveInfo(`${username}: ${action} ${conversationTitle}`);
}

function getUserFromPublicUsers(
  serializedUserId: { str: string },
  publicUsers: Map<{ str: string }, SnapchatPublicInfo>,
) {
  const publicUsersArray = Array.from(publicUsers, ([key, value]) => ({ key, value }));
  return publicUsersArray.find((user) => user.key.str === serializedUserId.str)?.value;
}

(() => {
  const GRPCTransientMessage = getTransientMessage();
  const GRPCPresencePayload = getPresencePayload();
  if (GRPCTransientMessage == null || GRPCPresencePayload == null) {
    return;
  }

  const { InboundTransientMessage } = GRPCTransientMessage as Record<string, any>;
  const { PresencePayload } = GRPCPresencePayload as Record<string, any>;

  MessagePort.prototype.addEventListener = new Proxy(MessagePort.prototype.addEventListener, {
    // eslint-disable-next-line no-undef
    apply: (target, thisArg, [type, listener, ...rest]: [string, EventListener]) => {
      if (type !== 'message') {
        return Reflect.apply(target, thisArg, [type, listener, ...rest]);
      }

      return Reflect.apply(target, thisArg, [
        type,
        async (event: MessageEvent<{ path?: string[]; argumentList: { value: unknown }[] }>) => {
          const { data } = event;

          try {
            if (Array.isArray(data?.path) && data?.path?.includes('onReceive')) {
              const encodedTransientMessage = data.argumentList[0];
              if (encodedTransientMessage == null) {
                throw new Error('No encoded transient message');
              }

              const transientMessage = InboundTransientMessage.decode(encodedTransientMessage.value);
              if (transientMessage?.payload?.type !== 'presence') {
                return listener(event);
              }

              const presencePayload = PresencePayload.decode(transientMessage.payload.data);
              const presenceStateKey = `${presencePayload.senderUserId}:${presencePayload.senderSessionId}`;
              const presenceState = presencePayload.presenceStates[presenceStateKey];
              const conversationId = presencePayload?.conversationId;
              const chatStateKey = `${presencePayload.senderUserId}:${conversationId ?? 'self'}`;

              if (presenceState == null) {
                // user has now closed/stop peeking chat
                chatState.delete(chatStateKey);
                return listener(event);
              }

              const newChatState =
                presenceState.extendedBits === SnapchatPresenceStates.PEEKING ? ChatStates.PEEK : ChatStates.OPEN;
              if (newChatState === chatState.get(chatStateKey)) {
                return listener(event);
              }

              chatState.set(chatStateKey, newChatState);

              const { messaging } = getSnapchatStore().getState();
              const conversation = messaging.conversations[conversationId]?.conversation;
              const { fetchPublicInfo, publicUsers } = getSnapchatStore().getState().user;
              const serializedUserId = getSerializeUserId(presencePayload.senderUserId);

              let user = null;
              if (serializedUserId != null) {
                user = getUserFromPublicUsers(serializedUserId, publicUsers);
              }

              if (serializedUserId != null && user == null) {
                await fetchPublicInfo([serializedUserId]);
                const { publicUsers } = getSnapchatStore().getState().user;
                user = getUserFromPublicUsers(serializedUserId, publicUsers);
              }

              const openChatNotification = settings.getSetting('OPEN_CHAT_NOTIFICATION');
              if (presenceState.extendedBits === SnapchatPresenceStates.IDLE && openChatNotification) {
                createNotification({
                  action: 'Opened',
                  username: user?.display_name ?? user?.username ?? presencePayload.senderUsername ?? 'Unknown User',
                  iconUrl: bitmojiAvatarUrl(user?.bitmoji_avatar_id, user?.bitmoji_selfie_id),
                  conversationTitle: conversation?.title ?? 'your Chat',
                  navigationPath: conversationId != null ? `/${conversationId}` : undefined,
                });
              }

              const halfSwipeNotification = settings.getSetting('HALF_SWIPE_NOTIFICATION');
              if (presenceState.extendedBits === SnapchatPresenceStates.PEEKING && halfSwipeNotification) {
                createNotification({
                  action: 'Peeked',
                  username: user?.display_name ?? user?.username ?? presencePayload.senderUsername ?? 'Unknown User',
                  iconUrl: bitmojiAvatarUrl(user?.bitmoji_avatar_id, user?.bitmoji_selfie_id),
                  conversationTitle: conversation?.title ?? 'your Chat',
                  navigationPath: conversationId != null ? `/${conversationId}` : undefined,
                });
              }
            }
          } catch (_) {}

          return listener(event);
        },
        ...rest,
      ]);
    },
  });
})();
