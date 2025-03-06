const ESBuild = require('esbuild');
const EsbuildPluginImportGlob = require('esbuild-plugin-import-glob');
const CSSModulesPlugin = require('esbuild-css-modules-plugin');
const package = require('../package.json');
const alias = require('esbuild-plugin-alias');
const fs = require('fs/promises');

const USER_SCRIPT_METADATA = (scriptTextContent, styleTextContent) => `
// ==UserScript==
// @name         ${package.name}
// @version      ${package.version}
// @description  ${package.description}
// @author       ${package.author}
// @match        https://www.snapchat.com/web/*
// @match        https://web.snapchat.com/*
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

GM_addElement('link', {
  rel: 'stylesheet',
  type: 'text/css',
  href: 'data:text/css;charset=utf-8,' + encodeURIComponent(${JSON.stringify(styleTextContent)})
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
      EsbuildPluginImportGlob.default(),
      CSSModulesPlugin(),
      alias({
        react: require.resolve('preact/compat'),
        'react-dom': require.resolve('preact/compat'),
      }),
    ],
    define: { 'process.env.VERSION': JSON.stringify(package.version) },
  });

  const [scriptTextContent, styleTextContent] = await Promise.all([
    fs.readFile(`./public/build/script.js`, 'utf-8'),
    fs.readFile(`./public/build/script.css`, 'utf-8'),
  ]);

  await fs.writeFile('./public/build/userscript.js', USER_SCRIPT_METADATA(scriptTextContent, styleTextContent));
})();
