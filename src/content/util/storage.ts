import cookies from 'cookies-js';

const PREFIX = 'bs_';

class Storage {
  _localStorageSupport: boolean;

  constructor() {
    this._localStorageSupport = true;

    try {
      window.localStorage.setItem('local_storage_test', 'it works!');
      window.localStorage.removeItem('local_storage_test');
    } catch (e) {
      this._localStorageSupport = false;
    }
  }

  get(id: string, prefix: string = PREFIX) {
    if (prefix != null) {
      id = `${prefix}${id}`;
    }

    try {
      const value = this._localStorageSupport ? window.localStorage.getItem(id) : cookies.get(id);
      if (value == null) {
        return null;
      }
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  set(id: string, value: any, prefix: string = PREFIX) {
    if (prefix != null) {
      id = `${prefix}${id}`;
    }

    const stringifiedValue = JSON.stringify(value);

    if (this._localStorageSupport) {
      window.localStorage.setItem(id, stringifiedValue);
    } else {
      cookies.set(id, value, { expires: Infinity });
    }
  }
}

export default new Storage();
