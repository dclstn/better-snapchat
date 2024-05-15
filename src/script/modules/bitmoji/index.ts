import settings from '../../lib/settings';
import { getPresencePayload, getTransientMessage } from '../../utils/snapchat';

(() => {
  const GRPCTransientMessage = getTransientMessage();
  const GRPCPresencePayload = getPresencePayload();
  if (GRPCTransientMessage == null || GRPCPresencePayload == null) {
    return;
  }

  const { OutboundTransientMessage } = GRPCTransientMessage as Record<string, any>;
  const { PresencePayload, PresencePayload_Platform } = GRPCPresencePayload as Record<string, any>;

  MessagePort.prototype.postMessage = new Proxy(MessagePort.prototype.postMessage, {
    apply(target, thisArg, [message, ...rest]: [any]) {
      try {
        if (Array.isArray(message?.path) && message?.path?.includes('send')) {
          const transientMessage = OutboundTransientMessage.decode(message.argumentList[1].value);
          if (transientMessage?.payload?.type !== 'presence') {
            return Reflect.apply(target, thisArg, [message, ...rest]);
          }

          if (settings.getSetting('HIDE_BITMOJI')) {
            return undefined;
          }

          if (settings.getSetting('MOBILE_BITMOJI')) {
            const presencePayload = PresencePayload.decode(transientMessage.payload.data);
            presencePayload.senderPlatform = PresencePayload_Platform.MOBILE;
            transientMessage.payload.data = PresencePayload.encode(presencePayload).finish();
            message.argumentList[1].value = OutboundTransientMessage.encode(transientMessage).finish();
          }
        }
      } catch (_) {}
      return Reflect.apply(target, thisArg, [message, ...rest]);
    },
  });
})();
