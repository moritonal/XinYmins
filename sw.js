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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();

workbox.core.clientsClaim();

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
    "revision": "cc5019c88dff0412a41362f1dd88da88"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "b298d0ebf4351ee61482deb272249cc3"
  },
  {
    "url": "randomColor.17d33b19.js",
    "revision": "dbeb9ea381816b0e597c55551c31b505"
  },
  {
    "url": "service-worker.js",
    "revision": "99cf9b145f8fc37c1e70e094740bbb24"
  },
  {
    "url": "Spinner.ab335f16.css",
    "revision": "8d2c194bc530c19155475f79e5a96dc4"
  },
  {
    "url": "Spinner.ab335f16.js",
    "revision": "469ade37d95ad30eed4732ddd300d0c0"
  },
  {
    "url": "src.0a617c25.css",
    "revision": "e6c9bf597d4d818ae20d02e710884554"
  },
  {
    "url": "src.f384ac8d.js",
    "revision": "516cef4f2d0a5b8f6a5dd609fc9e5392"
  },
  {
    "url": "svg.21d693ad.js",
    "revision": "da64f139e84aee30efbcb496e2e605fa"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/https:\/\/fonts.googleapis.com/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/https:\/\/fonts.gstatic.com/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/\//, new workbox.strategies.StaleWhileRevalidate(), 'GET');
