import settings from '../lib/settings';

function initalizeServiceWorker(initialSettings: any) {
  const READ_RECEIPT_URL = 'messagingcoreservice.MessagingCoreService/UpdateConversation';
  const broadcastChannel = new BroadcastChannel('BETTER_SNAPCHAT');
  const PREVENT_CHAT_READ_RECEIPTS = 'PREVENT_READ_RECEIPTS';

  let preventReadRecieptsEnabled = initialSettings[PREVENT_CHAT_READ_RECEIPTS] ?? false;

  broadcastChannel.addEventListener('message', ({ data }) => {
    const { type, settings: newSettings } = data;
    if (type !== 'setting:update') {
      return;
    }
    preventReadRecieptsEnabled = newSettings[PREVENT_CHAT_READ_RECEIPTS];
  });

  // eslint-disable-next-line no-global-assign
  (fetch as Function) = new Proxy(fetch, {
    apply(target, thisArg, [request, ...rest]: [Request, AbortSignal]) {
      if (preventReadRecieptsEnabled && request.url.endsWith(READ_RECEIPT_URL)) {
        // eslint-disable-next-line no-promise-executor-return
        return new Promise((resolve) => resolve(new Response(null, { status: 200 })));
      }
      return Reflect.apply(target, thisArg, [request, ...rest]);
    },
  });

  MessagePort.prototype.postMessage = new Proxy(MessagePort.prototype.postMessage, {
    apply(target, thisArg, [data, ...rest]: [any]) {
      if (data?.path?.includes('onReceive')) {
        console.dir(data);
        console.dir(data.argumentList[0].value);
      }
      return Reflect.apply(target, thisArg, [data, ...rest]);
    },
  });

  MessagePort.prototype.addEventListener = new Proxy(MessagePort.prototype.addEventListener, {
    apply(target, thisArg, [type, listener, ...rest]: [string, EventListener]) {
      if (type !== 'message') {
        return Reflect.apply(target, thisArg, [type, listener, ...rest]);
      }

      return Reflect.apply(target, thisArg, [
        type,
        async (event: MessageEvent<{ path?: string[]; argumentList: { value: unknown }[] }>) => {
          // console.log('listener', listener);
          return Reflect.apply(listener, thisArg, [event]);
        },
      ]);
    },
  });
}

export default function patchServiceWorker() {
  const oldBlobClass = window.Blob;
  class HookedBlob extends window.Blob {
    constructor(...args: any[]) {
      const [[content]] = args;
      if (typeof content === 'string' && content.startsWith('importScripts')) {
        args[0][0] += `
          ${initalizeServiceWorker.toString()};
          ${initalizeServiceWorker.name}(${JSON.stringify(settings.getSettings())});
        `;
        window.Blob = oldBlobClass;
      }
      super(...args);
    }
  }
  window.Blob = HookedBlob;
}
