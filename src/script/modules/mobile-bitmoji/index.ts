import { BitmojiPresence } from '../../lib/constants';
import settings from '../../lib/settings';

const PRESENCE_TARGET = new Uint8Array([0x70, 0x72, 0x65, 0x73, 0x65, 0x6e, 0x63, 0x65]);

// TODO: move to utils
function compareUint8Array(canidate: Uint8Array, target: Uint8Array): boolean {
  for (let i = 0; i <= canidate.length - target.length; i++) {
    let match = true;

    for (let j = 0; j < target.length; j++) {
      if (canidate[i + j] !== target[j]) {
        match = false;
        break;
      }
    }

    if (match) {
      return true;
    }
  }

  return false;
}

function modifyWebSenderPlatform(arr: any): any {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === 0x40 && arr[i + 1] === 0x02) {
      arr[i + 1] = 0x01;
    }
  }

  return arr;
}

function hookSlice() {
  Uint8Array.prototype.slice = new Proxy(Uint8Array.prototype.slice, {
    apply: function (target, thisArg: Uint8Array, args: any[]) {
      if (compareUint8Array(thisArg, PRESENCE_TARGET)) {
        const flag = settings.getSetting('BITMOJI_PRESENCE');
        if (flag === BitmojiPresence.MOBILE) {
          thisArg = modifyWebSenderPlatform(thisArg);
        }
      }
      return Reflect.apply(target, thisArg, args);
    },
  });
}

class Uint8ArraySlice {
  constructor() {
    hookSlice();
  }
}

export default new Uint8ArraySlice();
