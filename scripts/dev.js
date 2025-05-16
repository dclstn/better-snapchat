const ESBuild = require('esbuild');
const { default: EsbuildPluginImportGlob } = require('esbuild-plugin-import-glob');
const package = require('../package.json');
const fs = require('fs/promises');
const alias = require('esbuild-plugin-alias');
const dotenv = require('dotenv');
const chokidar = require('chokidar');
const { WebSocketServer } = require('ws');
const { sassPlugin } = require('esbuild-sass-plugin');

dotenv.config();

const manifest = {
  manifest_version: 3,
  name: package.name,
  description: package.description,
  version: package.version,
  icons: { 32: 'logo32.png', 48: 'logo48.png', 96: 'logo96.png', 128: 'logo128.png' },
  host_permissions: ['https://*.snapchat.com/*'],
  background: { service_worker: './build/hot-reload.js' },
  permissions: ['webNavigation', 'scripting', 'tabs', 'activeTab'],
  web_accessible_resources: [{ resources: ['./build/*'], matches: ['https://*.snapchat.com/*'] }],
};

async function buildExtension() {
  await Promise.all([
    ESBuild.build({
      entryPoints: ['./src/script', './src/hot-reload'],
      bundle: true,
      minify: false,
      sourcemap: true,
      target: ['chrome58'],
      outbase: './src/',
      outdir: './public/build/',
      logLevel: 'info',
      plugins: [
        EsbuildPluginImportGlob(),
        sassPlugin({ type: 'css-text', filter: /\.(scss|css)$/ }),
        alias({
          react: require.resolve('preact/compat'),
          'react-dom': require.resolve('preact/compat'),
        }),
      ],
      define: {
        'process.env.VERSION': JSON.stringify(package.version),
        'process.env.HMR_PORT': process.env.HMR_PORT,
      },
    }),
    fs.writeFile('./public/manifest.json', JSON.stringify(manifest, null, 2)),
  ]);
}

const PING_PAYLOAD = JSON.stringify({ type: 'ping' });
const PING_INTERVAL = 60e3;

(() => {
  const hmrPort = process.env.HMR_PORT ?? 8080;
  const websocket = new WebSocketServer({ port: hmrPort });

  chokidar.watch('./src/script').on('change', async (filePath) => {
    console.log('File changed:', filePath);
    console.log('Esbuild: Rebuilding...');
    await buildExtension();

    if (websocket.clients.size > 0) {
      const RELOAD_PAYLOAD = JSON.stringify({ type: 'reload', filePath });
      websocket.clients.forEach((client) => client.send(RELOAD_PAYLOAD));
      console.log('Reloaded all clients');
    }
  });

  buildExtension();
  console.log('Esbuild: Watching for changes...');

  setInterval(() => {
    websocket.clients.forEach((client) => client.send(PING_PAYLOAD));
  }, PING_INTERVAL);

  websocket.on('connection', (client) => {
    console.log('Service Worker: Connected');
    client.on('close', () => console.log('Service Worker: Disconnected'));
  });
})();
