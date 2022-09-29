import cookies from 'cookies-js';

const PREFIX = 'bs_';

class Storage {
  localStorageSupport: boolean;

  constructor() {
    this.localStorageSupport = true;

    try {
      window.localStorage.setItem('local_storage_test', 'it works!');
      window.localStorage.removeItem('local_storage_test');
    } catch (e) {
      this.localStorageSupport = false;
    }
  }

  get(_id: string, prefix: string = PREFIX) {
    let id = _id;

    if (prefix != null) {
      id = `${prefix}${id}`;
    }

    try {
      const value = this.localStorageSupport ? window.localStorage.getItem(id) : cookies.get(id);
      if (value == null) {
        return null;
      }
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  set(_id: string, value: any, prefix: string = PREFIX) {
    let id = _id;

    if (prefix != null) {
      id = `${prefix}${id}`;
    }

    const stringifiedValue = JSON.stringify(value);

    if (this.localStorageSupport) {
      window.localStorage.setItem(id, stringifiedValue);
    } else {
      cookies.set(id, value, { expires: Infinity });
    }
  }
}

export default new Storage();
