const ESBuild = require('esbuild');
const EsbuildPluginImportGlob = require('esbuild-plugin-import-glob');
const CSSModulesPlugin = require('esbuild-css-modules-plugin');
const package = require('./package.json');
const fs = require('fs/promises');

(async () => {
  console.log('Building: Extension');

  await ESBuild.build({
    entryPoints: ['./src/background', './src/content'],
    bundle: true,
    minify: true,
    sourcemap: false,
    target: ['chrome58', 'firefox57'],
    outdir: './public/build/',
    plugins: [EsbuildPluginImportGlob.default(), CSSModulesPlugin()],
  });

  console.log('Building: Manifest');

  const manifest = {
    manifest_version: 3,
    name: package.name,
    description: package.description,
    version: package.version,
    icons: {
      32: 'logo32.png',
      48: 'logo48.png',
      96: 'logo96.png',
      128: 'logo128.png',
    },
    background: { service_worker: './build/background.js' },
    content_scripts: [{ matches: ['https://web.snapchat.com/*'], js: ['./build/content.js'] }],
    permissions: ['declarativeNetRequest'],
    host_permissions: ['https://web.snapchat.com/*'],
  };

  await fs.writeFile('./public/manifest.json', JSON.stringify(manifest, null, 2));
})();
