import './observers/dom';

(async () => {
  // @ts-ignore
  await import('./modules/**/index.ts');
})();
