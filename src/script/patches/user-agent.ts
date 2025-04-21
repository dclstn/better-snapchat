import Patch from '../lib/patch';

const USER_AGENTS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
];

class UserAgent extends Patch {
  constructor() {
    super('User Agent');
  }

  patch() {
    const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
    Object.defineProperty(Navigator.prototype, 'userAgent', { get: () => userAgent });
  }
}

export default new UserAgent();
