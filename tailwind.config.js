/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/theme');
const { scopedPreflightStyles } = require('tailwindcss-scoped-preflight');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/components/button.js'],
  theme: { extend: {} },
  darkMode: 'class',
  plugins: [nextui({ prefix: 'bs-' }), scopedPreflightStyles({ cssSelector: '.bs-preflight' })],
};
