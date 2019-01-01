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
    "url": "Footer.26ef4f75.css",
    "revision": "b82fd6581f3c30213604d8575125eccf"
  },
  {
    "url": "Footer.26ef4f75.js",
    "revision": "a2fd8b01b2c6a0433db0b622b74b13fe"
  },
  {
    "url": "Footer.45ed7142.css",
    "revision": "89c6716ace51f291dd598fd3b5259c37"
  },
  {
    "url": "Footer.45ed7142.js",
    "revision": "aa9d8356a729e42752c4d7aaefec9af2"
  },
  {
    "url": "Header.5781efbe.css",
    "revision": "6a0997ecdd53dda86e3cd8ac34aaace3"
  },
  {
    "url": "Header.5781efbe.js",
    "revision": "82e9a8350002a0ba91c434ead1d2e45f"
  },
  {
    "url": "Header.9c545c5c.css",
    "revision": "0019e1be2ffcb778faa2ed5566488db6"
  },
  {
    "url": "Header.9c545c5c.js",
    "revision": "f3907690b7975376d156692b2bd35e25"
  },
  {
    "url": "icon-32.2c8b474e.png",
    "revision": "089331070277a120540cc15451f4404a"
  },
  {
    "url": "icon-32.3ab80b50.png",
    "revision": "089331070277a120540cc15451f4404a"
  },
  {
    "url": "icon-512.36291d8c.png",
    "revision": "f106a6344d04ae2a8c0d5e63ea0e2d45"
  },
  {
    "url": "icon-512.6c6eba7a.png",
    "revision": "f106a6344d04ae2a8c0d5e63ea0e2d45"
  },
  {
    "url": "icon-64.68c1f75d.png",
    "revision": "5dc743118352d3d25f06ec48e4b53565"
  },
  {
    "url": "icon-64.ea0e2c07.png",
    "revision": "5dc743118352d3d25f06ec48e4b53565"
  },
  {
    "url": "index.html",
    "revision": "41ffed28c9851cdfb65a09497916ecf7"
  },
  {
    "url": "manifest.46a52a91.webmanifest",
    "revision": "9c302f2196f8f7e03b1c3e754dc215b3"
  },
  {
    "url": "manifest.f032aeb4.webmanifest",
    "revision": "e34b4f6dff3842d021b9e49f7173b674"
  },
  {
    "url": "randomColor.53a47a9a.js",
    "revision": "5b7954a3b3b3014e5063d2df18317b11"
  },
  {
    "url": "randomColor.c2b5d1dd.js",
    "revision": "91ce7cf980ce2d62ae50ca0f32bb5996"
  },
  {
    "url": "service-worker.js",
    "revision": "02e7319b2791fad175d35902dbf1a25e"
  },
  {
    "url": "Spinner.445965db.css",
    "revision": "d84f634e2a0fc029aa1f5fe1bd44e00a"
  },
  {
    "url": "Spinner.445965db.js",
    "revision": "f369824d590a5bbe85c1ba1061d00e2a"
  },
  {
    "url": "Spinner.deb62c29.css",
    "revision": "8d2c194bc530c19155475f79e5a96dc4"
  },
  {
    "url": "Spinner.deb62c29.js",
    "revision": "f40ae8fe3918728b59df5be2f360d514"
  },
  {
    "url": "src.21a28b38.css",
    "revision": "0ea21fc8776ad8957e33c9d670d33f1b"
  },
  {
    "url": "src.e31bb0bc.css",
    "revision": "7e7c5ab19712f298e7b03ea0ac8a9bc1"
  },
  {
    "url": "src.e31bb0bc.js",
    "revision": "4ef27114f643c48419ebc3c14f06a54e"
  },
  {
    "url": "src.f89b019e.js",
    "revision": "6b7ed3e7c56922734d890d2ccaf651d1"
  },
  {
    "url": "svg.6cf8594e.js",
    "revision": "3c9e4b390340d31df760c4fe8cac2ace"
  },
  {
    "url": "svg.f7a6e1b3.js",
    "revision": "00ece9407abc782356f588e92c801686"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/https:\/\/fonts.googleapis.com/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/https:\/\/fonts.gstatic.com/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\//, workbox.strategies.staleWhileRevalidate(), 'GET');
