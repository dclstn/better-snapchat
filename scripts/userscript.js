const ESBuild = require('esbuild');
const { default: EsbuildPluginImportGlob } = require('esbuild-plugin-import-glob');
const package = require('../package.json');
const alias = require('esbuild-plugin-alias');
const fs = require('fs/promises');
const { default: sassPlugin } = require('esbuild-sass-plugin');

const USER_SCRIPT_METADATA = (scriptTextContent) => `
// ==UserScript==
// @name         ${package.name}
// @version      ${package.version}
// @description  ${package.description}
// @author       ${package.author}
// @match        https://*.snapchat.com/*
// @icon         https://better-snapchat.pages.dev/logo128.png
// @run-at       document-start
// @grant        GM_addElement
// @connect      better-snapchat.vasp.dev
// @license      MIT
// @namespace    https://better-snapchat.vasp.dev
// ==/UserScript==

GM_addElement('script', {
  type: 'text/javascript',
  textContent: ${JSON.stringify(scriptTextContent)}
});
`;

(async () => {
  console.log('Building: User Script');

  await ESBuild.build({
    entryPoints: ['./src/script'],
    bundle: true,
    minify: true,
    sourcemap: false,
    target: ['chrome58', 'firefox57'],
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
    define: { 'process.env.VERSION': JSON.stringify(package.version) },
  });

  const scriptTextContent = await fs.readFile(`./public/build/script.js`, 'utf-8');
  await fs.writeFile('./public/build/userscript.js', USER_SCRIPT_METADATA(scriptTextContent));
})();
