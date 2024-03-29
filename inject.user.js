// ==UserScript==
// @name         Better Snapchat
// @version      1.2.1
// @description  This browser extension enhances your web.snapchat.com experience by adding several essential privacy features.
// @author       VaspDev
// @match        https://web.snapchat.com/*
// @icon         https://better-snapchat.pages.dev/logo128.png
// @grant        GM_addElement
// @run-at       document-body
// @connect      better-snapchat.vasp.dev
// @license      MIT
// @namespace    https://better-snapchat.vasp.dev
// ==/UserScript==

GM_addElement(document.documentElement, 'script', {
  src: 'https://better-snapchat.vasp.dev/build/script.js',
  type: 'text/javascript',
});

GM_addElement(document.documentElement, 'link', {
  rel: 'stylesheet',
  href: 'https://better-snapchat.vasp.dev/build/script.css',
  type: 'text/css',
});
