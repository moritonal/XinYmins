/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "icon-32.2c8b474e.png",
    "revision": "089331070277a120540cc15451f4404a"
  },
  {
    "url": "icon-512.6c6eba7a.png",
    "revision": "f106a6344d04ae2a8c0d5e63ea0e2d45"
  },
  {
    "url": "icon-64.ea0e2c07.png",
    "revision": "5dc743118352d3d25f06ec48e4b53565"
  },
  {
    "url": "index.html",
    "revision": "b119b772fd72b18bf1949714804b9ec6"
  },
  {
    "url": "manifest.d58b9f49.webmanifest",
    "revision": "b298d0ebf4351ee61482deb272249cc3"
  },
  {
    "url": "randomColor.501800a5.js",
    "revision": "414b29efbf1b198a8750819bda1a4bae"
  },
  {
    "url": "service-worker.js",
    "revision": "802150bcff5e38046fd1034209cae697"
  },
  {
    "url": "Spinner.8391b614.css",
    "revision": "8d2c194bc530c19155475f79e5a96dc4"
  },
  {
    "url": "Spinner.8391b614.js",
    "revision": "3e22722109090cf627954ec8f179ae8a"
  },
  {
    "url": "src.1378d2ae.js",
    "revision": "25a9f31d9dcf1815c0158c02e4fc1c00"
  },
  {
    "url": "src.31ba21ae.css",
    "revision": "3e905d995d16040a70e9245b8372e076"
  },
  {
    "url": "svg.35b8057b.js",
    "revision": "ddf9314d33329c4702fd226eaeaa5f02"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/https:\/\/fonts.googleapis.com/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/https:\/\/fonts.gstatic.com/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\//, workbox.strategies.staleWhileRevalidate(), 'GET');
