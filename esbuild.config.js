const ESBuild = require('esbuild');
const BrowserSync = require('browser-sync');

ESBuild.build({
  entryPoints: ['./src/background', './src/content'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['chrome58', 'firefox57'],
  outdir: './dist/',
});
