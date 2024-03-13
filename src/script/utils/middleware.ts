import { getSnapchatStore } from './snapchat';

type Callback = (store: any) => any;

const store = getSnapchatStore();
const callbacks: Callback[] = [];
let unsubscribe: (() => void) | null = null;

export function updateSnapchatStore() {
  store.setState((prevState: any) => {
    let newState = prevState;
    newState.patchedStore = true;
    for (const callback of callbacks) {
      newState = callback(newState);
    }
    return newState;
  });
}

export function registerMiddleware(callback: Callback) {
  callbacks.push(callback);
  updateSnapchatStore();
}

export function attachSnapchatStoreListener() {
  unsubscribe = store.subscribe((newState: any) => {
    if (newState.patchedStore) {
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
