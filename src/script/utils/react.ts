export function objectEntries<T extends object>(obj: T) {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

export function getReactInstance(element: HTMLElement) {
  for (const [key] of objectEntries(element)) {
    if (key.startsWith('__reactInternalInstance$') || key.startsWith('__reactFiber$')) {
      return element[key];
    }
  }

  return null;
}

export function searchReactParents(node: any, predicate: (node: any) => boolean, maxDepth = 15, depth = 0) {
  try {
    if (predicate(node)) {
      return node;
    }
  } catch (_) {}

  if (!node || depth > maxDepth) {
    return null;
  }

  const { return: parent } = node as any;
  if (parent) {
    return searchReactParents(parent, predicate, maxDepth, depth + 1);
  }

  return null;
}
