/* snapchat overwrites default console.log */
const { log } = console;

const PREFIX = '[Better-Snapchat]';

class Logger {
  static log(...args: any[]) {
    log(PREFIX, ...args);
  }
}

export default Logger;
