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

export function getProvConsts() {
  const webpackRequire = getSnapchatWebpackRequire();
  const someModuleId = getSnapchatWebpackModuleId((module) => module.includes('SNAPCHAT_WEB_APP'));
  if (webpackRequire == null || someModuleId == null) {
    return null;
  }

  const module = webpackRequire(someModuleId) as Record<string, any>;
  const provConsts = Object.values(module).find((value) => value.SNAPCHAT_WEB_APP != null && value.SNAPCHAT_WEB_APP != null);

  return provConsts;
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

export function getSerializeUserId(userId: string) {
  const webpackRequire = getSnapchatWebpackRequire();
  if (webpackRequire == null) {
    return null;
  }

  const presenceModuleId = getSnapchatWebpackModuleId(
    (module) => module.includes('Invalid UUID') && module.length < 1000,
  );
  if (presenceModuleId == null) {
    return null;
  }

  const module = webpackRequire(presenceModuleId) as Record<string, any>;
  if (module?.A == null) {
    return null;
  }

  return { id: Uint8Array.from((0, module.A)(userId)), str: userId };
}
