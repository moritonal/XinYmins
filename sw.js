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
    "url": "Footer.a8aabb40.css",
    "revision": "b82fd6581f3c30213604d8575125eccf"
  },
  {
    "url": "Footer.a8aabb40.js",
    "revision": "f7f1031d731837d2e13cf9ac03baf787"
  },
  {
    "url": "Header.266b70af.css",
    "revision": "0019e1be2ffcb778faa2ed5566488db6"
  },
  {
    "url": "Header.266b70af.js",
    "revision": "4914358d9de8c676f9591912b957bb64"
  },
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
    "revision": "0d59f276a059a049e1479d7de056026e"
  },
  {
    "url": "manifest.331ccbc4.webmanifest",
    "revision": "62095359ee64efd4a7895c738c430fb9"
  },
  {
    "url": "manifest.46a52a91.webmanifest",
    "revision": "9c302f2196f8f7e03b1c3e754dc215b3"
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
    "revision": "49c975a5c2b3c5aa268e897849598e49"
  },
  {
    "url": "Spinner.3f1c8296.css",
    "revision": "8d2c194bc530c19155475f79e5a96dc4"
  },
  {
    "url": "Spinner.3f1c8296.js",
    "revision": "daff40557d59c31c02473dcd2aa40a9f"
  },
  {
    "url": "src.0d37bfe2.js",
    "revision": "0555029ab83a5fd9e89c9f554176e5c5"
  },
  {
    "url": "src.82764d50.css",
    "revision": "0ea21fc8776ad8957e33c9d670d33f1b"
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
