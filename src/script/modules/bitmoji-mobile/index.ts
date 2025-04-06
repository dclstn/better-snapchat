import { BitmojiPresence } from '../../lib/constants';
import settings from '../../lib/settings';
import { compareUint8Array } from '../../utils/array';

let oldUint8ArraySlice: any = null;

const PRESENCE_TARGET = new Uint8Array([0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x63, 0x65]);

function modifyWebSenderPlatformToMobile(arr: any): any {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === 0x40 && arr[i + 1] === 0x02) {
      arr[i + 1] = 0x01;
    }
  }

  return arr;
}

class BitmojiMobile {
  constructor() {
    this.load();
    settings.on('BITMOJI_PRESENCE.setting:update', this.load);
  }

  load() {
    const flag = settings.getSetting('BITMOJI_PRESENCE');
    const enabled = flag === BitmojiPresence.MOBILE;

    if (!enabled) {
      if (oldUint8ArraySlice != null) {
        Uint8Array.prototype.slice = oldUint8ArraySlice;
        oldUint8ArraySlice = null;
      }

      return;
    }

    oldUint8ArraySlice = Uint8Array.prototype.slice;
    Uint8Array.prototype.slice = new Proxy(oldUint8ArraySlice, {
      apply: function (target, thisArg: Uint8Array, args: any[]) {
        if (compareUint8Array(thisArg, PRESENCE_TARGET)) {
          thisArg = modifyWebSenderPlatformToMobile(thisArg);
        }
        return Reflect.apply(target, thisArg, args);
      },
    });
  }
}

export default new BitmojiMobile();
