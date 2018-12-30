// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"components/Spinner.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

function describeArc(x, y, radius, innerRadius, startAngle, endAngle) {
  var outerStart = polarToCartesian(x, y, radius, endAngle);
  var outerEnd = polarToCartesian(x, y, radius, startAngle);
  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  var innerStart = polarToCartesian(x, y, innerRadius, endAngle);
  var innerEnd = polarToCartesian(x, y, innerRadius, startAngle);
  var mid = {
    x: (outerEnd.x + innerEnd.x) / 2,
    y: (outerEnd.y + innerEnd.y) / 2
  };
  var d = [//"M", x, y,
  "M", mid.x, mid.y, "L", innerEnd.x, innerEnd.y, "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y, "L", outerStart.x, outerStart.y, "A", radius, radius, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y, "L", innerEnd.x, innerEnd.y].join(" ");
  return d;
}

var _default = {
  name: 'spinner-component',
  props: {
    "tasks": Array,
    "timeStart": Object,
    "timeNow": Object,
    "timeEnd": Object,
    "innerRadiusPercentage": {
      type: Number,
      default: 0.3
    },
    "chunkPadding": {
      type: Number,
      default: 5
    },
    "chunkStroke": {
      type: Number,
      default: 10
    },
    "progressColour": {
      type: String,
      default: "blue"
    },
    "chunkColour": {
      type: String,
      default: "pink"
    },
    "chunkLuminosity": {
      type: String,
      default: "bright"
    },
    "disabled": false
  },
  data: function data() {
    return {
      svgChunks: null,
      svgProgress: null,
      total: 360,
      size: null,
      radius: null,
      innerRadius: null,
      canvasSize: 0,
      x: null,
      y: null,
      svg: null
    };
  },
  mounted: function () {
    var _mounted = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var SVG;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.handleResize();
              _context.next = 3;
              return require("_bundle_loader")(require.resolve("svg.js"));

            case 3:
              SVG = _context.sent;
              this.svg = SVG("drawing"); //.size(this.canvasSize, this.canvasSize);

              this.svgChunks = [];
              this.UpdateChunks(); // Draw time

              this.UpdateSvg();
              window.addEventListener('resize', this.handleResize);
              this.handleResize();

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function mounted() {
      return _mounted.apply(this, arguments);
    };
  }(),
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    tasks: function tasks(val) {
      this.svgChunks = [];
      this.svgProgress = null;
      this.svg.clear();
      this.UpdateChunks();
      this.UpdateSvg();
    },
    canvasSize: function canvasSize(val) {
      this.handleResize();
    },
    timeNow: function timeNow(val) {
      if (this.svg == null) return;

      if (this.timeNow > this.timeEnd) {
        return;
      }

      this.UpdateChunks();
      this.UpdateSvg();
    }
  },
  computed: {
    TotalProgress: function TotalProgress() {
      var timePassed = this.timeNow - this.timeStart;
      var timeTotal = this.timeEnd - this.timeStart;
      var ratio = timePassed / timeTotal;
      var angle = ratio * this.total;
      return angle;
    }
  },
  methods: {
    calculateSize: function calculateSize() {
      this.canvasSize = this.$refs["drawing"] ? Math.min(624, Math.min(this.$refs["drawing"].clientWidth, this.$refs["drawing"].clientHeight)) : null;
    },
    handleResize: function handleResize() {
      this.calculateSize();
      this.canvasPadding = 20;
      this.size = this.canvasSize - this.canvasPadding;
      this.radius = this.size / 2;
      this.innerRadius = this.radius - this.radius * this.innerRadiusPercentage;
      this.x = this.canvasPadding / 2 + this.size / 2;
      this.y = this.canvasPadding / 2 + this.size / 2;

      if (this.svg) {
        this.svg.size(this.canvasSize, this.canvasSize);
        console.log("Resized svg to ".concat(this.canvasSize));
      }
    },
    UpdateChunks: function () {
      var _UpdateChunks = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var current, lastStopTime, spaceUsed, firstFlexibleChunk, i, task, chunkSize, timePassed, timeTotal, ratio, notCompletedTasks, spaceLeft, spacePerChunk, randomcolor, chunk;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.tasks == null)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                current = 0;
                lastStopTime = this.timeStart;
                spaceUsed = null;
                firstFlexibleChunk = true;
                i = 0;

              case 7:
                if (!(i < this.tasks.length)) {
                  _context2.next = 24;
                  break;
                }

                task = this.tasks[i];
                chunkSize = this.total / this.tasks.length;

                if (task.stopTime) {
                  timePassed = task.stopTime - lastStopTime;
                  timeTotal = this.timeEnd - this.timeStart;
                  ratio = timePassed / timeTotal;
                  chunkSize = ratio * this.total;
                  lastStopTime = task.stopTime;
                  spaceUsed = current + chunkSize;
                } else {
                  notCompletedTasks = this.tasks.length - this.tasks.filter(function (i) {
                    return i.stopTime != null;
                  }).length;
                  spaceLeft = this.total - spaceUsed;
                  spacePerChunk = spaceLeft / notCompletedTasks;

                  if (current + spacePerChunk < this.TotalProgress && firstFlexibleChunk) {
                    firstFlexibleChunk = false;
                    chunkSize = this.TotalProgress - spaceUsed;
                    spaceUsed = current + chunkSize;
                  } else {
                    if (!firstFlexibleChunk) {
                      notCompletedTasks--;
                    }

                    spacePerChunk = spaceLeft / notCompletedTasks;
                    chunkSize = spacePerChunk;
                  }
                }

                if (!(this.tasks[i].colour == null)) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 14;
                return require("_bundle_loader")(require.resolve("randomcolor"));

              case 14:
                randomcolor = _context2.sent;
                this.tasks[i].colour = randomcolor({
                  hue: this.chunkColour,
                  luminosity: this.chunkLuminosity
                });

              case 16:
                chunk = null;

                if (this.svgChunks.length <= i) {
                  chunk = this.drawChunk(this.x, this.y, this.radius, this.innerRadius, current, current + chunkSize - this.chunkPadding);
                  this.svgChunks.push(chunk);
                } else {
                  chunk = this.drawChunk(this.x, this.y, this.radius, this.innerRadius, current, current + chunkSize - this.chunkPadding, this.svgChunks[i]);
                  this.svgChunks[i] = chunk;
                }

                chunk.fill(this.tasks[i].colour);
                chunk.stroke({
                  width: this.chunkStroke
                });
                current += chunkSize;

              case 21:
                i++;
                _context2.next = 7;
                break;

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function UpdateChunks() {
        return _UpdateChunks.apply(this, arguments);
      };
    }(),
    drawChunk: function drawChunk(x, y, radius, innerRadius, start, end, svg) {
      if (svg == null) {
        svg = {
          outer: null,
          inner: null,
          fill: function fill(a) {
            this.outer.fill(a);
            return this;
          },
          stroke: function stroke(a) {
            this.outer.stroke(a);
            return this;
          },
          front: function front(a) {
            this.outer.front(a);
            return this;
          }
        };
      }

      if (svg && svg.outer) {
        svg.outer.plot(describeArc(x, y, radius, innerRadius, start, end));
      } else {
        if (this.svg) {
          svg.outer = this.svg.path(describeArc(x, y, radius, innerRadius, start, end));
        }
      }

      return svg;
    },
    UpdateSvg: function UpdateSvg() {
      this.svgProgress = this.drawChunk(this.x, this.y, this.radius, this.innerRadius, 0, Math.max(0, this.TotalProgress - this.chunkPadding), this.svgProgress).fill({
        color: this.progressColour,
        opacity: 0.6
      }).stroke({
        width: this.chunkStroke
      }).front();
    }
  }
};
exports.default = _default;
        var $305b83 = exports.default || module.exports;
      
      if (typeof $305b83 === 'function') {
        $305b83 = $305b83.options;
      }
    
        /* template */
        Object.assign($305b83, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "spinner" } }, [
    _c("div", {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: !_vm.disabled,
          expression: "!disabled"
        }
      ],
      ref: "drawing",
      attrs: { id: "drawing" }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$305b83', $305b83);
          } else {
            api.reload('$305b83', $305b83);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_bundle_loader":"../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-loader.js","svg.js":[["svg.4e305413.js","node_modules/svg.js/dist/svg.js"],"svg.4e305413.map","node_modules/svg.js/dist/svg.js"],"randomcolor":[["randomColor.0d5e8780.js","node_modules/randomcolor/randomColor.js"],"randomColor.0d5e8780.map","node_modules/randomcolor/randomColor.js"],"_css_loader":"../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "5202" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}],"../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-url.js"}],"../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/loaders/browser/js-loader.js":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;

    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };

    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-loader.js");b.register("js",require("../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/loaders/browser/js-loader.js"));b.load([]).then(function(){require("components/Spinner.vue");});
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/Spinner.445965db.map