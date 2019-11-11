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
    "revision": "6726d27cd63756958de92e79e2960be8"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "74221ba2b07553074dbad7a44a4d628e"
  },
  {
    "url": "randomColor.17d33b19.js",
    "revision": "dbeb9ea381816b0e597c55551c31b505"
  },
  {
    "url": "service-worker.js",
    "revision": "10d0decfbe5ebed984983aa6d12b40d5"
  },
  {
    "url": "Spinner.0e21c25e.css",
    "revision": "8d2c194bc530c19155475f79e5a96dc4"
  },
  {
    "url": "Spinner.0e21c25e.js",
    "revision": "6825125b676c139c3c800cd466f3b4c5"
  },
  {
    "url": "src.9a016737.js",
    "revision": "c8412c0a96a30e3e5f51758356fbd0a8"
  },
  {
    "url": "src.b2175c8b.css",
    "revision": "da7ee2838af08def7b1f48333e335d03"
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
