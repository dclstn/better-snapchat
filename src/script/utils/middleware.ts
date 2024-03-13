import Logger from '../lib/logger';
import { getSnapchatStore } from './snapchat';

type Callback = (store: any) => any;

const store = getSnapchatStore();
const callbacks: Callback[] = [];
let unsubscribe: (() => void) | null = null;

export function updateSnapchatStore() {
  store.setState((prevState: any) => {
    prevState.__patched = true;
    for (const callback of callbacks) {
      prevState = callback(prevState);
    }
    return prevState;
  });
}

export function registerMiddleware(callback: Callback) {
  callbacks.push(callback);
  updateSnapchatStore();
}

export function attachSnapchatStoreListener() {
  unsubscribe = store.subscribe((newState: any) => {
    if (newState.__patched) {
      return;
    }
    updateSnapchatStore();
  });
}

export function unattachSnapchatStoreListener() {
  if (unsubscribe != null) {
    unsubscribe();
    unsubscribe = null;
  }
}
