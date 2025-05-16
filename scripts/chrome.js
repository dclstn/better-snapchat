const ESBuild = require('esbuild');
const { default: EsbuildPluginImportGlob } = require('esbuild-plugin-import-glob');
const package = require('../package.json');
const fs = require('fs/promises');
const alias = require('esbuild-plugin-alias');
const { default: sassPlugin } = require('esbuild-sass-plugin');

(async () => {
  console.log('Building: Chrome Extension');

  await ESBuild.build({
    entryPoints: ['./src/script'],
    bundle: true,
    minify: true,
    sourcemap: false,
    target: ['chrome58'],
    outbase: './src/',
    outdir: './public/build/',
    logLevel: 'info',
    plugins: [
      EsbuildPluginImportGlob(),
      sassPlugin({ type: 'local-css', filter: /\.module\.(scss|css)$/ }),
      sassPlugin({ type: 'css-text', filter: /\.(scss|css)$/ }),
      alias({
        react: require.resolve('preact/compat'),
        'react-dom': require.resolve('preact/compat'),
      }),
    ],
    define: { 'process.env.VERSION': JSON.stringify(package.version) },
  });

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
    content_scripts: [
      {
        matches: ['https://web.snapchat.com/*', 'https://*.snapchat.com/*'],
        js: ['./build/script.js'],
        css: ['./build/script.css'],
        run_at: 'document_start',
        world: 'MAIN',
      },
    ],
    host_permissions: ['https://web.snapchat.com/*', 'https://*.snapchat.com/*'],
  };

  await fs.writeFile('./public/manifest.json', JSON.stringify(manifest, null, 2));
})();
