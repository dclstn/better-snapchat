// ==UserScript==
// @name         Better Snapchat
// @version      1.0.0
// @description  This browser extension enhances your web.snapchat.com experience by adding several essential privacy features.
// @author       VaspDev
// @match        https://web.snapchat.com/*
// @icon         https://better-snapchat.pages.dev/logo128.png
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @connect      better-snapchat.vasp.dev
// ==/UserScript==

GM_xmlhttpRequest({
  method: 'GET',
  url: 'https://better-snapchat.vasp.dev/build/script.js',
  onload: (response) => {
    const element = document.createElement('script');
    element.innerText = response.responseText;
    document.head.appendChild(element);
  },
});
