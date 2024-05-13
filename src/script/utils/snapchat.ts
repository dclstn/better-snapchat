type WebpackRequire = <T>(id: string) => T;

let snapchatWebpackRequire: WebpackRequire | null = null;

export function getSnapchatWebpackRequire(): WebpackRequire | null {
  if (snapchatWebpackRequire != null) {
    return snapchatWebpackRequire;
  }

  window.webpackChunk_snapchat_web_calling_app.push([
    ['injectBetterSnapchat'],
    {
      injectBetterSnapchat: (a: any, b: any, require: WebpackRequire) => {
        snapchatWebpackRequire = require;
      },
    },
    // eslint-disable-next-line import/no-unresolved
    (require: WebpackRequire) => require('injectBetterSnapchat'),
  ]);

  return snapchatWebpackRequire;
}

export function getSnapchatWebpackModuleId(predicate: (module: string, moduleKey?: string) => boolean): string | null {
  let selectedModuleId = null;

  for (const chunk of window.webpackChunk_snapchat_web_calling_app) {
    if (!Array.isArray(chunk)) {
      continue;
    }

    const [, modules] = chunk;
    for (const moduleKey of Object.keys(modules)) {
      const module = modules[moduleKey];
      const moduleDeclaration = module?.toString();
      if (moduleDeclaration == null || !predicate(moduleDeclaration, moduleKey)) {
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

export function getTransientMessage() {
  const webpackRequire = getSnapchatWebpackRequire();
  if (webpackRequire == null) {
    return null;
  }

  const transientMessageModuleId = getSnapchatWebpackModuleId((module, moduleKey) => {
    if (/InboundTransientMessage|OutboundTransientMessage/.test(module) && moduleKey != null) {
      const Payload = webpackRequire(moduleKey) as Record<string, any>;
      return Payload.InboundTransientMessage != null && Payload.OutboundTransientMessage != null;
    }
    return false;
  });

  if (transientMessageModuleId == null) {
    return null;
  }

  return webpackRequire(transientMessageModuleId);
}

export function getPresencePayload() {
  const webpackRequire = getSnapchatWebpackRequire();
  if (webpackRequire == null) {
    return null;
  }

  const presenceModuleId = getSnapchatWebpackModuleId((module, moduleKey) => {
    if (/PresencePayload/.test(module) && moduleKey != null) {
      const Payload = webpackRequire(moduleKey) as Record<string, any>;
      return Payload.PresencePayload != null;
    }
    return false;
  });

  if (presenceModuleId == null) {
    return null;
  }

  return webpackRequire(presenceModuleId);
}
