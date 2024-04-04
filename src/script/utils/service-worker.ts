import settings from '../lib/settings';

function initalizeServiceWorker(initialSettings: any) {
  const READ_RECEIPT = 'messagingcoreservice.MessagingCoreService/UpdateConversation';
  const broadcastChannel = new BroadcastChannel('BETTER_SNAPCHAT');
  const PREVENT_READ_RECEIPTS = 'PREVENT_READ_RECEIPTS';
  const HIDE_BITMOJI = 'HIDE_BITMOJI';

  let preventReadRecieptsEnabled = initialSettings[PREVENT_READ_RECEIPTS] ?? false;
  let hideBitmoji = initialSettings[HIDE_BITMOJI] ?? false;

  broadcastChannel.addEventListener('message', ({ data }) => {
    const { type, settings } = data;
    if (type !== 'settings:update') {
      return;
    }
    preventReadRecieptsEnabled = settings[PREVENT_READ_RECEIPTS];
    hideBitmoji = settings[HIDE_BITMOJI];
  });

  // eslint-disable-next-line no-global-assign
  (fetch as Function) = new Proxy(fetch, {
    apply(target, thisArg, [request, ...rest]: [Request, AbortSignal]) {
      if (preventReadRecieptsEnabled && request.url.endsWith(READ_RECEIPT)) {
        // eslint-disable-next-line no-promise-executor-return
        return new Promise((resolve) => resolve(new Response(null, { status: 200 })));
      }
      return Reflect.apply(target, thisArg, [request, ...rest]);
    },
  });

  const textDecoder = new TextDecoder();
  WebSocket.prototype.send = new Proxy(WebSocket.prototype.send, {
    apply(target, thisArg, [data, ...rest]: [Uint8Array]) {
      const message = textDecoder.decode(data);
      if (hideBitmoji && message.includes('presence')) {
        return undefined;
      }
      return Reflect.apply(target, thisArg, [data, ...rest]);
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
