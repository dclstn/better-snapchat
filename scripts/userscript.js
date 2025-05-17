const ESBuild = require('esbuild');
const { default: EsbuildPluginImportGlob } = require('esbuild-plugin-import-glob');
const package = require('../package.json');
const alias = require('esbuild-plugin-alias');
const fs = require('fs/promises');
const { default: sassPlugin } = require('esbuild-sass-plugin');
const { transform } = require('lightningcss');
const JavaScriptObfuscator = require('javascript-obfuscator');

function ObfuscatorPlugin(options = {}) {
  return {
    name: 'obfuscator',
    setup(build) {
      build.onLoad({ filter: /\.ts$/ }, async (args) => {
        let source = await fs.readFile(args.path, 'utf8');
        const result = await ESBuild.transform(source, { loader: 'ts', sourcemap: false });

        source = result.code;
        source = JavaScriptObfuscator.obfuscate(source, options).getObfuscatedCode();

        return { contents: source, loader: 'ts' };
      });
    },
  };
}

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
      sassPlugin({
        type: 'css-text',
        filter: /\.(scss|css)$/,
        transform: (code, _, filePath) => {
          const { code: transformedCode } = transform({
            code: Buffer.from(code),
            filename: filePath,
            minify: true,
          });

          return transformedCode.toString();
        },
      }),
      alias({
        react: require.resolve('preact/compat'),
        'react-dom': require.resolve('preact/compat'),
      }),
      ObfuscatorPlugin({
        compact: true,
        selfDefending: true,
        controlFlowFlattening: true,
        renameGlobals: true,
      }),
    ],
    define: { 'process.env.VERSION': JSON.stringify(package.version) },
  });

  const scriptTextContent = await fs.readFile(`./public/build/script.js`, 'utf-8');
  await fs.writeFile('./public/build/userscript.js', USER_SCRIPT_METADATA(scriptTextContent));
})();
