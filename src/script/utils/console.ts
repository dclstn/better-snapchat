export default function patchConsole() {
  window.console = new Proxy(window.console, {
    set(target, prop, receiver) {
      if (prop === 'log') {
        return true;
      }
      return Reflect.set(target, prop, receiver);
    },
  });
}
