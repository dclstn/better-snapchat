const ESBuild = require('esbuild');
const EsbuildPluginImportGlob = require('esbuild-plugin-import-glob');
const CSSModulesPlugin = require('esbuild-css-modules-plugin');
const package = require('../package.json');
const fs = require('fs/promises');
const alias = require('esbuild-plugin-alias');
const dotenv = require('dotenv');

dotenv.config();

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
      matches: ['https://web.snapchat.com/*'],
      js: ['./build/script.js'],
      css: ['./build/script.css'],
      run_at: 'document_start',
      world: 'MAIN',
    },
    {
      matches: ['https://web.snapchat.com/*'],
      js: ['./build/content.js'],
      run_at: 'document_start',
      all_frames: true,
    },
  ],
  background: { service_worker: './build/worker.js' },
  host_permissions: ['https://web.snapchat.com/*'],
};

(async () => {
  console.log('Building: Chrome Extension');
  await Promise.all([
    ESBuild.build({
      entryPoints: ['./src/script', './src/worker', './src/content'],
      bundle: true,
      minify: true,
      sourcemap: false,
      target: ['chrome58'],
      outbase: './src/',
      outdir: './public/build/',
      logLevel: 'info',
      plugins: [
        EsbuildPluginImportGlob.default(),
        CSSModulesPlugin(),
        alias({
          react: require.resolve('preact/compat'),
          'react-dom': require.resolve('preact/compat'),
        }),
      ],
      define: {
        'process.env.VERSION': JSON.stringify(package.version),
        'process.env.RUNTIME_CONTEXT': JSON.stringify('chrome'),
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.EXTENSION_ID': JSON.stringify('bomphfefmmkghdkkpjdafehnmfpifook'),
      },
    }),
    fs.writeFile('./public/manifest.json', JSON.stringify(manifest, null, 2)),
  ]);
})();
