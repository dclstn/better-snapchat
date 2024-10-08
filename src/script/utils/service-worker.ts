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
}

export default function patchServiceWorker() {
  return; // temp return;

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
