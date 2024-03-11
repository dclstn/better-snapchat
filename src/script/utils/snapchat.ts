import Logger from '../lib/logger';

type WebpackRequire = <T>(id: string) => T;

let snapchatWebpackRequire: WebpackRequire | null = null;

export function getSnapchatWebpackRequire(): WebpackRequire | null {
  if (snapchatWebpackRequire != null) {
    return snapchatWebpackRequire;
  }

  window.webpackChunk_snapchat_web_calling_app.push([
    ['injectBetterSnapchat'],
    { injectBetterSnapchat: (_a: any, _b: any, require: WebpackRequire) => (snapchatWebpackRequire = require) },
    (require: WebpackRequire) => require('injectBetterSnapchat'),
  ]);

  return snapchatWebpackRequire;
}

export function getSnapchatWebpackModuleId(predicate: (module: string) => boolean): string | null {
  let selectedModuleId = null;

  for (const chunk of window.webpackChunk_snapchat_web_calling_app) {
    if (!Array.isArray(chunk)) {
      continue;
    }

    const [_, modules] = chunk;
    for (const moduleKey of Object.keys(modules)) {
      const module = modules[moduleKey];
      const moduleDeclaration = module?.toString();
      if (moduleDeclaration == null || !predicate(moduleDeclaration)) {
        continue;
      }

      selectedModuleId = moduleKey;
      break;
    }

    if (selectedModuleId != null) {
      break;
    }
  }

  return selectedModuleId;
}

let snapchatStore: any = null;

export function getSnapchatStore() {
  if (snapchatStore != null) {
    return snapchatStore;
  }

  const webpackRequire = getSnapchatWebpackRequire();
  const someModuleId = getSnapchatWebpackModuleId((module) => module.includes('broadcastTypingActivity'));
  if (webpackRequire == null || someModuleId == null) {
    return null;
  }

  const module = webpackRequire(someModuleId) as Record<string, any>;
  snapchatStore = Object.values(module).find((value) => value.getState != null && value.setState != null);

  return snapchatStore;
}
