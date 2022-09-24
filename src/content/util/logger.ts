const consoleLog = console.log;

class Logger {
  log(...args: any[]): void {
    consoleLog(...args);
  }
}

export default new Logger();
