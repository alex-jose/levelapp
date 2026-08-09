/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "36f21d5ad853caa5364dd7c8be1a1fe6"
  }, {
    "url": "pwa-64x64.png",
    "revision": "d8ec7c655185aa320b284309fd45df89"
  }, {
    "url": "pwa-512x512.png",
    "revision": "7906c179c80296992935d08641813887"
  }, {
    "url": "pwa-192x192.png",
    "revision": "ba56b696d0c7c8d39a44ead7f2b07836"
  }, {
    "url": "maskable-icon-512x512.png",
    "revision": "7906c179c80296992935d08641813887"
  }, {
    "url": "logo.svg",
    "revision": "b7dddeb25ccdacae710e2ea31b79740a"
  }, {
    "url": "logo-mono.svg",
    "revision": "7ade334fa57796df41e90a4edc485be4"
  }, {
    "url": "logo-lockup.svg",
    "revision": "4e19b92afbad22ba9c1aba5d8c92e8e8"
  }, {
    "url": "logo-light.svg",
    "revision": "9655ea87b3e27ca6d26c9c54c634e6f2"
  }, {
    "url": "index.html",
    "revision": "799f963f135edd6becba7ca6bc4f927e"
  }, {
    "url": "icons.svg",
    "revision": "3b4fcfcf393eca4d264dca4a4663bc37"
  }, {
    "url": "favicon.svg",
    "revision": "96b612d9619943baf0450bef2fde9192"
  }, {
    "url": "apple-touch-icon-180x180.png",
    "revision": "5b9a3e4c1ddb36d71eabfbc6b0e01330"
  }, {
    "url": "assets/index-CW-hkpgG.js",
    "revision": null
  }, {
    "url": "maskable-icon-512x512.png",
    "revision": "7906c179c80296992935d08641813887"
  }, {
    "url": "pwa-192x192.png",
    "revision": "ba56b696d0c7c8d39a44ead7f2b07836"
  }, {
    "url": "pwa-512x512.png",
    "revision": "7906c179c80296992935d08641813887"
  }, {
    "url": "pwa-64x64.png",
    "revision": "d8ec7c655185aa320b284309fd45df89"
  }, {
    "url": "manifest.webmanifest",
    "revision": "3eeaf39cfd2f21abe11ccd8e96055cb9"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/\/backgrounds\/.+\.(jpg|jpeg)$/i, new workbox.CacheFirst({
    "cacheName": "backgrounds-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 5,
      maxAgeSeconds: 2592000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
