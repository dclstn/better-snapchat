const ESBuild = require('esbuild');
const EsbuildPluginImportGlob = require('esbuild-plugin-import-glob');
const cssModulesPlugin = require('esbuild-css-modules-plugin');

ESBuild.build({
  entryPoints: ['./src/background', './src/content'],
  bundle: true,
  minify: true,
  sourcemap: false,
  target: ['chrome58', 'firefox57'],
  outdir: './dist/',
  plugins: [EsbuildPluginImportGlob.default(), cssModulesPlugin()],
});
