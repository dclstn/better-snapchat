import { logInfo } from '../lib/debug';

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

export function getSnapchatPublicUser(userId: string) {
  const { fetchPublicInfo, publicUsers } = getSnapchatStore().getState().user;

  if (fetchPublicInfo == null || publicUsers == null) {
    return null;
  }

  const user = publicUsers.entries().find(([{ str }]: [{ str: string }]) => str === userId);
  if (user == null) {
    return null;
  }

  return user[1];
}
