const ESBuild = require('esbuild');

ESBuild.buildSync({
  entryPoints: ['./src'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outfile: './dist/index.js',
});
