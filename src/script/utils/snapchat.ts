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

let cofStore: any = null;

export function getCofStore() {
  if (cofStore != null) {
    return cofStore;
  }

  const webpackRequire = getSnapchatWebpackRequire();
  const someModuleId = getSnapchatWebpackModuleId((module) => module.includes('cof_targeting_query_attempt'));
  if (webpackRequire == null || someModuleId == null) {
    return null;
  }

  const module = webpackRequire(someModuleId) as Record<string, any>;
  cofStore = Object.values(module).find((value) => value.getState != null && value.setState != null);

  return cofStore;
}

export function getProvConsts() {
  const webpackRequire = getSnapchatWebpackRequire();
  const someModuleId = getSnapchatWebpackModuleId((module) => module.includes('SNAPCHAT_WEB_APP'));
  if (webpackRequire == null || someModuleId == null) {
    return null;
  }

  const module = webpackRequire(someModuleId) as Record<string, any>;
  const provConsts = Object.values(module).find(
    (value) => value.SNAPCHAT_WEB_APP != null && value.SNAPCHAT_WEB_APP != null,
  );

  return provConsts;
}

export async function getSnapchatPublicUser(userId: string, retry = true) {
  const { fetchPublicInfo, publicUsers } = getSnapchatStore().getState().user;
  if (fetchPublicInfo == null || publicUsers == null) {
    return null;
  }

  const user = publicUsers.entries().find(([{ str }]: [{ str: string }]) => str === userId);

  if (user == null && retry) {
    const serializedId = getSerializedSnapchatId(userId);
    await fetchPublicInfo([serializedId]);
    return getSnapchatPublicUser(userId, false);
  }

  return user != null ? user[1] : null;
}

export function getSerializedSnapchatId(uuid: string): { id: Uint8Array; str: string } {
  const hexStr = uuid.replace(/-/g, '');
  const bytes = new Uint8Array(16);

  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hexStr.slice(i * 2, i * 2 + 2), 16);
  }

  return { id: bytes, str: uuid };
}

export function getConversation(conversationId: string) {
  const { conversations } = getSnapchatStore().getState().messaging;
  if (conversations == null) {
    return null;
  }

  return conversations[conversationId];
}
