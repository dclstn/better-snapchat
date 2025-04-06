import settings from '../../lib/settings';
import { getSnapchatStore } from '../../utils/snapchat';

const store = getSnapchatStore();

function modifyExternalMediaToSnapContent(arr: any): any {
  arr = arr.slice(2);
  arr[0] = 0x5a;
  return arr;
}

let oldGetConversationManager: any = null;
let newGetConversationManager: any = null;

function patchSendMessageWithContent(mananger: any) {
  return new Proxy(mananger, {
    get(target, prop, receiver) {
      if (prop !== 'sendMessageWithContent') {
        return Reflect.get(target, prop, receiver);
      }

      return new Proxy(target[prop], {
        apply(targetFunc, thisArg, args) {
          const [, message] = args;

          if (settings.getSetting('UPLOAD_SNAPS') && message.contentType === 3) {
            message.contentType = 1;
            message.savePolicy = 2;
            message.platformAnalytics.metricsMessageType = 3;
            message.content = modifyExternalMediaToSnapContent(message.content);
          }

          if (settings.getSetting('SEND_UNSAVEABLE_MESSAGES')) {
            message.savePolicy = 0;
          }

          return Reflect.apply(targetFunc, thisArg, args);
        },
      });
    },
  });
}
class MessageContent {
  constructor() {
    this.load();
    store.subscribe((storeState: any) => storeState.messaging.getConversationManager, this.load.bind(this));
    settings.on('UPLOAD_SNAPS.setting:update', () => this.load());
    settings.on('SEND_UNSAVEABLE_MESSAGES.setting:update', () => this.load());
  }

  load() {
    const messagingClient = store.getState().messaging;
    if (messagingClient?.client == null) {
      return;
    }

    const uploadSnapsEnabled = settings.getSetting('UPLOAD_SNAPS');
    const sendUnsaveableMessagesEnabled = settings.getSetting('SEND_UNSAVEABLE_MESSAGES');
    const enabled = uploadSnapsEnabled || sendUnsaveableMessagesEnabled;

    const changedValues: any = {};

    if (!enabled && oldGetConversationManager != null) {
      changedValues.getConversationManager = oldGetConversationManager;
      oldGetConversationManager = null;
      newGetConversationManager = null;
    }

    if (enabled && messagingClient.client.getConversationManager !== newGetConversationManager) {
      oldGetConversationManager = messagingClient.client.getConversationManager;

      newGetConversationManager = new Proxy(oldGetConversationManager, {
        apply: (targetFunc, thisArg, args) => {
          const conversationManager = Reflect.apply(targetFunc, thisArg, args);
          return patchSendMessageWithContent(conversationManager);
        },
      });

      changedValues.getConversationManager = newGetConversationManager;
    }

    if (Object.keys(changedValues).length === 0) {
      return;
    }

    store.setState({ messaging: { ...messagingClient, client: { ...messagingClient.client, ...changedValues } } });
  }
}

export default new MessageContent();
