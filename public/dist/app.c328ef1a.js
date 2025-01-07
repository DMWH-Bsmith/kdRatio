// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../../../AppData/Roaming/nvm/v22.9.0/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"../node_modules/@firebase/util/dist/index.esm2017.js":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sha1 = exports.RANDOM_FACTOR = exports.MAX_VALUE_MILLIS = exports.FirebaseError = exports.ErrorFactory = exports.Deferred = exports.DecodeBase64StringError = exports.CONSTANTS = void 0;
exports.areCookiesEnabled = areCookiesEnabled;
exports.assertionError = exports.assert = void 0;
exports.async = async;
exports.base64urlEncodeWithoutPadding = exports.base64Encode = exports.base64Decode = exports.base64 = void 0;
exports.calculateBackoffMillis = calculateBackoffMillis;
exports.contains = contains;
exports.createMockUserToken = createMockUserToken;
exports.createSubscribe = createSubscribe;
exports.decode = void 0;
exports.deepCopy = deepCopy;
exports.deepEqual = deepEqual;
exports.deepExtend = deepExtend;
exports.errorPrefix = errorPrefix;
exports.extractQuerystring = extractQuerystring;
exports.getExperimentalSetting = exports.getDefaults = exports.getDefaultEmulatorHostnameAndPort = exports.getDefaultEmulatorHost = exports.getDefaultAppConfig = void 0;
exports.getGlobal = getGlobal;
exports.getModularInstance = getModularInstance;
exports.getUA = getUA;
exports.isAdmin = void 0;
exports.isBrowser = isBrowser;
exports.isBrowserExtension = isBrowserExtension;
exports.isCloudflareWorker = isCloudflareWorker;
exports.isElectron = isElectron;
exports.isEmpty = isEmpty;
exports.isIE = isIE;
exports.isIndexedDBAvailable = isIndexedDBAvailable;
exports.isMobileCordova = isMobileCordova;
exports.isNode = isNode;
exports.isNodeSdk = isNodeSdk;
exports.isReactNative = isReactNative;
exports.isSafari = isSafari;
exports.isUWP = isUWP;
exports.isValidTimestamp = exports.isValidFormat = void 0;
exports.isWebWorker = isWebWorker;
exports.issuedAtTime = void 0;
exports.jsonEval = jsonEval;
exports.map = map;
exports.ordinal = ordinal;
exports.promiseWithTimeout = promiseWithTimeout;
exports.querystring = querystring;
exports.querystringDecode = querystringDecode;
exports.safeGet = safeGet;
exports.stringToByteArray = exports.stringLength = void 0;
exports.stringify = stringify;
exports.validateArgCount = exports.uuidv4 = void 0;
exports.validateCallback = validateCallback;
exports.validateContextObject = validateContextObject;
exports.validateIndexedDBOpenable = validateIndexedDBOpenable;
exports.validateNamespace = validateNamespace;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Firebase constants.  Some of these (@defines) can be overridden at compile-time.
 */
var CONSTANTS = exports.CONSTANTS = {
  /**
   * @define {boolean} Whether this is the client Node.js SDK.
   */
  NODE_CLIENT: false,
  /**
   * @define {boolean} Whether this is the Admin Node.js SDK.
   */
  NODE_ADMIN: false,
  /**
   * Firebase SDK Version
   */
  SDK_VERSION: '${JSCORE_VERSION}'
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Throws an error if the provided assertion is falsy
 */
var assert = exports.assert = function assert(assertion, message) {
  if (!assertion) {
    throw assertionError(message);
  }
};
/**
 * Returns an Error object suitable for throwing.
 */
var assertionError = exports.assertionError = function assertionError(message) {
  return new Error('Firebase Database (' + CONSTANTS.SDK_VERSION + ') INTERNAL ASSERT FAILED: ' + message);
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var stringToByteArray$1 = function stringToByteArray$1(str) {
  // TODO(user): Use native implementations if/when available
  var out = [];
  var p = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if ((c & 0xfc00) === 0xd800 && i + 1 < str.length && (str.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
      // Surrogate Pair
      c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }
  return out;
};
/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param bytes Array of numbers representing characters.
 * @return Stringification of the array.
 */
var byteArrayToString = function byteArrayToString(bytes) {
  // TODO(user): Use native implementations if/when available
  var out = [];
  var pos = 0,
    c = 0;
  while (pos < bytes.length) {
    var c1 = bytes[pos++];
    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      var c2 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
    } else if (c1 > 239 && c1 < 365) {
      // Surrogate Pair
      var _c = bytes[pos++];
      var c3 = bytes[pos++];
      var c4 = bytes[pos++];
      var u = ((c1 & 7) << 18 | (_c & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 0x10000;
      out[c++] = String.fromCharCode(0xd800 + (u >> 10));
      out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
    } else {
      var _c2 = bytes[pos++];
      var _c3 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 15) << 12 | (_c2 & 63) << 6 | _c3 & 63);
    }
  }
  return out.join('');
};
// We define it as an object literal instead of a class because a class compiled down to es5 can't
// be treeshaked. https://github.com/rollup/rollup/issues/1691
// Static lookup maps, lazily populated by init_()
// TODO(dlarocque): Define this as a class, since we no longer target ES5.
var base64 = exports.base64 = {
  /**
   * Maps bytes to characters.
   */
  byteToCharMap_: null,
  /**
   * Maps characters to bytes.
   */
  charToByteMap_: null,
  /**
   * Maps bytes to websafe characters.
   * @private
   */
  byteToCharMapWebSafe_: null,
  /**
   * Maps websafe characters to bytes.
   * @private
   */
  charToByteMapWebSafe_: null,
  /**
   * Our default alphabet, shared between
   * ENCODED_VALS and ENCODED_VALS_WEBSAFE
   */
  ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',
  /**
   * Our default alphabet. Value 64 (=) is special; it means "nothing."
   */
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + '+/=';
  },
  /**
   * Our websafe alphabet.
   */
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + '-_.';
  },
  /**
   * Whether this browser supports the atob and btoa functions. This extension
   * started at Mozilla but is now implemented by many browsers. We use the
   * ASSUME_* variables to avoid pulling in the full useragent detection library
   * but still allowing the standard per-browser compilations.
   *
   */
  HAS_NATIVE_SUPPORT: typeof atob === 'function',
  /**
   * Base64-encode an array of bytes.
   *
   * @param input An array of bytes (numbers with
   *     value in [0, 255]) to encode.
   * @param webSafe Boolean indicating we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeByteArray: function encodeByteArray(input, webSafe) {
    if (!Array.isArray(input)) {
      throw Error('encodeByteArray takes an array as a parameter');
    }
    this.init_();
    var byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
    var output = [];
    for (var i = 0; i < input.length; i += 3) {
      var byte1 = input[i];
      var haveByte2 = i + 1 < input.length;
      var byte2 = haveByte2 ? input[i + 1] : 0;
      var haveByte3 = i + 2 < input.length;
      var byte3 = haveByte3 ? input[i + 2] : 0;
      var outByte1 = byte1 >> 2;
      var outByte2 = (byte1 & 0x03) << 4 | byte2 >> 4;
      var outByte3 = (byte2 & 0x0f) << 2 | byte3 >> 6;
      var outByte4 = byte3 & 0x3f;
      if (!haveByte3) {
        outByte4 = 64;
        if (!haveByte2) {
          outByte3 = 64;
        }
      }
      output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
    }
    return output.join('');
  },
  /**
   * Base64-encode a string.
   *
   * @param input A string to encode.
   * @param webSafe If true, we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeString: function encodeString(input, webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return btoa(input);
    }
    return this.encodeByteArray(stringToByteArray$1(input), webSafe);
  },
  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString: function decodeString(input, webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return atob(input);
    }
    return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
  },
  /**
   * Base64-decode a string.
   *
   * In base-64 decoding, groups of four characters are converted into three
   * bytes.  If the encoder did not apply padding, the input length may not
   * be a multiple of 4.
   *
   * In this case, the last group will have fewer than 4 characters, and
   * padding will be inferred.  If the group has one or two characters, it decodes
   * to one byte.  If the group has three characters, it decodes to two bytes.
   *
   * @param input Input to decode.
   * @param webSafe True if we should use the web-safe alphabet.
   * @return bytes representing the decoded value.
   */
  decodeStringToByteArray: function decodeStringToByteArray(input, webSafe) {
    this.init_();
    var charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
    var output = [];
    for (var i = 0; i < input.length;) {
      var byte1 = charToByteMap[input.charAt(i++)];
      var haveByte2 = i < input.length;
      var byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
      ++i;
      var haveByte3 = i < input.length;
      var byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      var haveByte4 = i < input.length;
      var byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
        throw new DecodeBase64StringError();
      }
      var outByte1 = byte1 << 2 | byte2 >> 4;
      output.push(outByte1);
      if (byte3 !== 64) {
        var outByte2 = byte2 << 4 & 0xf0 | byte3 >> 2;
        output.push(outByte2);
        if (byte4 !== 64) {
          var outByte3 = byte3 << 6 & 0xc0 | byte4;
          output.push(outByte3);
        }
      }
    }
    return output;
  },
  /**
   * Lazy static initialization function. Called before
   * accessing any of the static map variables.
   * @private
   */
  init_: function init_() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {};
      this.charToByteMap_ = {};
      this.byteToCharMapWebSafe_ = {};
      this.charToByteMapWebSafe_ = {};
      // We want quick mappings back and forth, so we precompute two maps.
      for (var i = 0; i < this.ENCODED_VALS.length; i++) {
        this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
        this.charToByteMap_[this.byteToCharMap_[i]] = i;
        this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
        this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
        // Be forgiving when decoding and correctly decode both encodings.
        if (i >= this.ENCODED_VALS_BASE.length) {
          this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
          this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
        }
      }
    }
  }
};
/**
 * An error encountered while decoding base64 string.
 */
var DecodeBase64StringError = exports.DecodeBase64StringError = /*#__PURE__*/function (_Error) {
  function DecodeBase64StringError() {
    var _this;
    _classCallCheck(this, DecodeBase64StringError);
    _this = _callSuper(this, DecodeBase64StringError, arguments);
    _this.name = 'DecodeBase64StringError';
    return _this;
  }
  _inherits(DecodeBase64StringError, _Error);
  return _createClass(DecodeBase64StringError);
}(/*#__PURE__*/_wrapNativeSuper(Error));
/**
 * URL-safe base64 encoding
 */
var base64Encode = exports.base64Encode = function base64Encode(str) {
  var utf8Bytes = stringToByteArray$1(str);
  return base64.encodeByteArray(utf8Bytes, true);
};
/**
 * URL-safe base64 encoding (without "." padding in the end).
 * e.g. Used in JSON Web Token (JWT) parts.
 */
var base64urlEncodeWithoutPadding = exports.base64urlEncodeWithoutPadding = function base64urlEncodeWithoutPadding(str) {
  // Use base64url encoding and remove padding in the end (dot characters).
  return base64Encode(str).replace(/\./g, '');
};
/**
 * URL-safe base64 decoding
 *
 * NOTE: DO NOT use the global atob() function - it does NOT support the
 * base64Url variant encoding.
 *
 * @param str To be decoded
 * @return Decoded result, if possible
 */
var base64Decode = exports.base64Decode = function base64Decode(str) {
  try {
    return base64.decodeString(str, true);
  } catch (e) {
    console.error('base64Decode failed: ', e);
  }
  return null;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */
function deepCopy(value) {
  return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 *
 * Note: we don't merge __proto__ to prevent prototype pollution
 */
function deepExtend(target, source) {
  if (!(source instanceof Object)) {
    return source;
  }
  switch (source.constructor) {
    case Date:
      // Treat Dates like scalars; if the target date object had any child
      // properties - they will be lost!
      var dateValue = source;
      return new Date(dateValue.getTime());
    case Object:
      if (target === undefined) {
        target = {};
      }
      break;
    case Array:
      // Always copy the array source and overwrite the target.
      target = [];
      break;
    default:
      // Not a plain Object - treat it as a scalar.
      return source;
  }
  for (var prop in source) {
    // use isValidKey to guard against prototype pollution. See https://snyk.io/vuln/SNYK-JS-LODASH-450202
    if (!source.hasOwnProperty(prop) || !isValidKey(prop)) {
      continue;
    }
    target[prop] = deepExtend(target[prop], source[prop]);
  }
  return target;
}
function isValidKey(key) {
  return key !== '__proto__';
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Polyfill for `globalThis` object.
 * @returns the `globalThis` object for the given environment.
 * @public
 */
function getGlobal() {
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('Unable to locate global object.');
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var getDefaultsFromGlobal = function getDefaultsFromGlobal() {
  return getGlobal().__FIREBASE_DEFAULTS__;
};
/**
 * Attempt to read defaults from a JSON string provided to
 * process(.)env(.)__FIREBASE_DEFAULTS__ or a JSON file whose path is in
 * process(.)env(.)__FIREBASE_DEFAULTS_PATH__
 * The dots are in parens because certain compilers (Vite?) cannot
 * handle seeing that variable in comments.
 * See https://github.com/firebase/firebase-js-sdk/issues/6838
 */
var getDefaultsFromEnvVariable = function getDefaultsFromEnvVariable() {
  if (typeof process === 'undefined' || typeof process.env === 'undefined') {
    return;
  }
  var defaultsJsonString = undefined;
  if (defaultsJsonString) {
    return JSON.parse(defaultsJsonString);
  }
};
var getDefaultsFromCookie = function getDefaultsFromCookie() {
  if (typeof document === 'undefined') {
    return;
  }
  var match;
  try {
    match = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch (e) {
    // Some environments such as Angular Universal SSR have a
    // `document` object but error on accessing `document.cookie`.
    return;
  }
  var decoded = match && base64Decode(match[1]);
  return decoded && JSON.parse(decoded);
};
/**
 * Get the __FIREBASE_DEFAULTS__ object. It checks in order:
 * (1) if such an object exists as a property of `globalThis`
 * (2) if such an object was provided on a shell environment variable
 * (3) if such an object exists in a cookie
 * @public
 */
var getDefaults = exports.getDefaults = function getDefaults() {
  try {
    return getDefaultsFromGlobal() || getDefaultsFromEnvVariable() || getDefaultsFromCookie();
  } catch (e) {
    /**
     * Catch-all for being unable to get __FIREBASE_DEFAULTS__ due
     * to any environment case we have not accounted for. Log to
     * info instead of swallowing so we can find these unknown cases
     * and add paths for them if needed.
     */
    console.info("Unable to get __FIREBASE_DEFAULTS__ due to: ".concat(e));
    return;
  }
};
/**
 * Returns emulator host stored in the __FIREBASE_DEFAULTS__ object
 * for the given product.
 * @returns a URL host formatted like `127.0.0.1:9999` or `[::1]:4000` if available
 * @public
 */
var getDefaultEmulatorHost = exports.getDefaultEmulatorHost = function getDefaultEmulatorHost(productName) {
  var _a, _b;
  return (_b = (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.emulatorHosts) === null || _b === void 0 ? void 0 : _b[productName];
};
/**
 * Returns emulator hostname and port stored in the __FIREBASE_DEFAULTS__ object
 * for the given product.
 * @returns a pair of hostname and port like `["::1", 4000]` if available
 * @public
 */
var getDefaultEmulatorHostnameAndPort = exports.getDefaultEmulatorHostnameAndPort = function getDefaultEmulatorHostnameAndPort(productName) {
  var host = getDefaultEmulatorHost(productName);
  if (!host) {
    return undefined;
  }
  var separatorIndex = host.lastIndexOf(':'); // Finding the last since IPv6 addr also has colons.
  if (separatorIndex <= 0 || separatorIndex + 1 === host.length) {
    throw new Error("Invalid host ".concat(host, " with no separate hostname and port!"));
  }
  // eslint-disable-next-line no-restricted-globals
  var port = parseInt(host.substring(separatorIndex + 1), 10);
  if (host[0] === '[') {
    // Bracket-quoted `[ipv6addr]:port` => return "ipv6addr" (without brackets).
    return [host.substring(1, separatorIndex - 1), port];
  } else {
    return [host.substring(0, separatorIndex), port];
  }
};
/**
 * Returns Firebase app config stored in the __FIREBASE_DEFAULTS__ object.
 * @public
 */
var getDefaultAppConfig = exports.getDefaultAppConfig = function getDefaultAppConfig() {
  var _a;
  return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.config;
};
/**
 * Returns an experimental setting on the __FIREBASE_DEFAULTS__ object (properties
 * prefixed by "_")
 * @public
 */
var getExperimentalSetting = exports.getExperimentalSetting = function getExperimentalSetting(name) {
  var _a;
  return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a["_".concat(name)];
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Deferred = exports.Deferred = /*#__PURE__*/function () {
  function Deferred() {
    var _this2 = this;
    _classCallCheck(this, Deferred);
    this.reject = function () {};
    this.resolve = function () {};
    this.promise = new Promise(function (resolve, reject) {
      _this2.resolve = resolve;
      _this2.reject = reject;
    });
  }
  /**
   * Our API internals are not promisified and cannot because our callback APIs have subtle expectations around
   * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
   * and returns a node-style callback which will resolve or reject the Deferred's promise.
   */
  return _createClass(Deferred, [{
    key: "wrapCallback",
    value: function wrapCallback(callback) {
      var _this3 = this;
      return function (error, value) {
        if (error) {
          _this3.reject(error);
        } else {
          _this3.resolve(value);
        }
        if (typeof callback === 'function') {
          // Attaching noop handler just in case developer wasn't expecting
          // promises
          _this3.promise.catch(function () {});
          // Some of our callbacks don't expect a value and our own tests
          // assert that the parameter length is 1
          if (callback.length === 1) {
            callback(error);
          } else {
            callback(error, value);
          }
        }
      };
    }
  }]);
}();
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function createMockUserToken(token, projectId) {
  if (token.uid) {
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  }
  // Unsecured JWTs use "none" as the algorithm.
  var header = {
    alg: 'none',
    type: 'JWT'
  };
  var project = projectId || 'demo-project';
  var iat = token.iat || 0;
  var sub = token.sub || token.user_id;
  if (!sub) {
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  }
  var payload = Object.assign({
    // Set all required fields to decent defaults
    iss: "https://securetoken.google.com/".concat(project),
    aud: project,
    iat: iat,
    exp: iat + 3600,
    auth_time: iat,
    sub: sub,
    user_id: sub,
    firebase: {
      sign_in_provider: 'custom',
      identities: {}
    }
  }, token);
  // Unsecured JWTs use the empty string as a signature.
  var signature = '';
  return [base64urlEncodeWithoutPadding(JSON.stringify(header)), base64urlEncodeWithoutPadding(JSON.stringify(payload)), signature].join('.');
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns navigator.userAgent string or '' if it's not defined.
 * @return user agent string
 */
function getUA() {
  if (typeof navigator !== 'undefined' && typeof navigator['userAgent'] === 'string') {
    return navigator['userAgent'];
  } else {
    return '';
  }
}
/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
 * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
 * wait for a callback.
 */
function isMobileCordova() {
  return typeof window !== 'undefined' &&
  // @ts-ignore Setting up an broadly applicable index signature for Window
  // just to deal with this case would probably be a bad idea.
  !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
}
/**
 * Detect Node.js.
 *
 * @return true if Node.js environment is detected or specified.
 */
// Node detection logic from: https://github.com/iliakan/detect-node/
function isNode() {
  var _a;
  var forceEnvironment = (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.forceEnvironment;
  if (forceEnvironment === 'node') {
    return true;
  } else if (forceEnvironment === 'browser') {
    return false;
  }
  try {
    return Object.prototype.toString.call(global.process) === '[object process]';
  } catch (e) {
    return false;
  }
}
/**
 * Detect Browser Environment.
 * Note: This will return true for certain test frameworks that are incompletely
 * mimicking a browser, and should not lead to assuming all browser APIs are
 * available.
 */
function isBrowser() {
  return typeof window !== 'undefined' || isWebWorker();
}
/**
 * Detect Web Worker context.
 */
function isWebWorker() {
  return typeof WorkerGlobalScope !== 'undefined' && typeof self !== 'undefined' && self instanceof WorkerGlobalScope;
}
/**
 * Detect Cloudflare Worker context.
 */
function isCloudflareWorker() {
  return typeof navigator !== 'undefined' && navigator.userAgent === 'Cloudflare-Workers';
}
function isBrowserExtension() {
  var runtime = (typeof chrome === "undefined" ? "undefined" : _typeof(chrome)) === 'object' ? chrome.runtime : (typeof browser === "undefined" ? "undefined" : _typeof(browser)) === 'object' ? browser.runtime : undefined;
  return _typeof(runtime) === 'object' && runtime.id !== undefined;
}
/**
 * Detect React Native.
 *
 * @return true if ReactNative environment is detected.
 */
function isReactNative() {
  return (typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === 'object' && navigator['product'] === 'ReactNative';
}
/** Detects Electron apps. */
function isElectron() {
  return getUA().indexOf('Electron/') >= 0;
}
/** Detects Internet Explorer. */
function isIE() {
  var ua = getUA();
  return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
}
/** Detects Universal Windows Platform apps. */
function isUWP() {
  return getUA().indexOf('MSAppHost/') >= 0;
}
/**
 * Detect whether the current SDK build is the Node version.
 *
 * @return true if it's the Node SDK build.
 */
function isNodeSdk() {
  return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
}
/** Returns true if we are running in Safari. */
function isSafari() {
  return !isNode() && !!navigator.userAgent && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
}
/**
 * This method checks if indexedDB is supported by current browser/service worker context
 * @return true if indexedDB is supported by current browser/service worker context
 */
function isIndexedDBAvailable() {
  try {
    return (typeof indexedDB === "undefined" ? "undefined" : _typeof(indexedDB)) === 'object';
  } catch (e) {
    return false;
  }
}
/**
 * This method validates browser/sw context for indexedDB by opening a dummy indexedDB database and reject
 * if errors occur during the database open operation.
 *
 * @throws exception if current browser/sw context can't run idb.open (ex: Safari iframe, Firefox
 * private browsing)
 */
function validateIndexedDBOpenable() {
  return new Promise(function (resolve, reject) {
    try {
      var preExist = true;
      var DB_CHECK_NAME = 'validate-browser-context-for-indexeddb-analytics-module';
      var request = self.indexedDB.open(DB_CHECK_NAME);
      request.onsuccess = function () {
        request.result.close();
        // delete database only when it doesn't pre-exist
        if (!preExist) {
          self.indexedDB.deleteDatabase(DB_CHECK_NAME);
        }
        resolve(true);
      };
      request.onupgradeneeded = function () {
        preExist = false;
      };
      request.onerror = function () {
        var _a;
        reject(((_a = request.error) === null || _a === void 0 ? void 0 : _a.message) || '');
      };
    } catch (error) {
      reject(error);
    }
  });
}
/**
 *
 * This method checks whether cookie is enabled within current browser
 * @return true if cookie is enabled within current browser
 */
function areCookiesEnabled() {
  if (typeof navigator === 'undefined' || !navigator.cookieEnabled) {
    return false;
  }
  return true;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Standardized Firebase Error.
 *
 * Usage:
 *
 *   // TypeScript string literals for type-safe codes
 *   type Err =
 *     'unknown' |
 *     'object-not-found'
 *     ;
 *
 *   // Closure enum for type-safe error codes
 *   // at-enum {string}
 *   var Err = {
 *     UNKNOWN: 'unknown',
 *     OBJECT_NOT_FOUND: 'object-not-found',
 *   }
 *
 *   let errors: Map<Err, string> = {
 *     'generic-error': "Unknown error",
 *     'file-not-found': "Could not find file: {$file}",
 *   };
 *
 *   // Type-safe function - must pass a valid error code as param.
 *   let error = new ErrorFactory<Err>('service', 'Service', errors);
 *
 *   ...
 *   throw error.create(Err.GENERIC);
 *   ...
 *   throw error.create(Err.FILE_NOT_FOUND, {'file': fileName});
 *   ...
 *   // Service: Could not file file: foo.txt (service/file-not-found).
 *
 *   catch (e) {
 *     assert(e.message === "Could not find file: foo.txt.");
 *     if ((e as FirebaseError)?.code === 'service/file-not-found') {
 *       console.log("Could not read file: " + e['file']);
 *     }
 *   }
 */
var ERROR_NAME = 'FirebaseError';
// Based on code from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
var FirebaseError = exports.FirebaseError = /*#__PURE__*/function (_Error2) {
  function FirebaseError(/** The error code for this error. */
  code, message, /** Custom data for this error. */
  customData) {
    var _this4;
    _classCallCheck(this, FirebaseError);
    _this4 = _callSuper(this, FirebaseError, [message]);
    _this4.code = code;
    _this4.customData = customData;
    /** The custom name for all FirebaseErrors. */
    _this4.name = ERROR_NAME;
    // Fix For ES5
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    // TODO(dlarocque): Replace this with `new.target`: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
    //                   which we can now use since we no longer target ES5.
    Object.setPrototypeOf(_this4, FirebaseError.prototype);
    // Maintains proper stack trace for where our error was thrown.
    // Only available on V8.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this4, ErrorFactory.prototype.create);
    }
    return _this4;
  }
  _inherits(FirebaseError, _Error2);
  return _createClass(FirebaseError);
}(/*#__PURE__*/_wrapNativeSuper(Error));
var ErrorFactory = exports.ErrorFactory = /*#__PURE__*/function () {
  function ErrorFactory(service, serviceName, errors) {
    _classCallCheck(this, ErrorFactory);
    this.service = service;
    this.serviceName = serviceName;
    this.errors = errors;
  }
  return _createClass(ErrorFactory, [{
    key: "create",
    value: function create(code) {
      var customData = (arguments.length <= 1 ? undefined : arguments[1]) || {};
      var fullCode = "".concat(this.service, "/").concat(code);
      var template = this.errors[code];
      var message = template ? replaceTemplate(template, customData) : 'Error';
      // Service Name: Error message (service/code).
      var fullMessage = "".concat(this.serviceName, ": ").concat(message, " (").concat(fullCode, ").");
      var error = new FirebaseError(fullCode, fullMessage, customData);
      return error;
    }
  }]);
}();
function replaceTemplate(template, data) {
  return template.replace(PATTERN, function (_, key) {
    var value = data[key];
    return value != null ? String(value) : "<".concat(key, "?>");
  });
}
var PATTERN = /\{\$([^}]+)}/g;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Evaluates a JSON string into a javascript object.
 *
 * @param {string} str A string containing JSON.
 * @return {*} The javascript object representing the specified JSON.
 */
function jsonEval(str) {
  return JSON.parse(str);
}
/**
 * Returns JSON representing a javascript object.
 * @param {*} data JavaScript object to be stringified.
 * @return {string} The JSON contents of the object.
 */
function stringify(data) {
  return JSON.stringify(data);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Decodes a Firebase auth. token into constituent parts.
 *
 * Notes:
 * - May return with invalid / incomplete claims if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var decode = exports.decode = function decode(token) {
  var header = {},
    claims = {},
    data = {},
    signature = '';
  try {
    var parts = token.split('.');
    header = jsonEval(base64Decode(parts[0]) || '');
    claims = jsonEval(base64Decode(parts[1]) || '');
    signature = parts[2];
    data = claims['d'] || {};
    delete claims['d'];
  } catch (e) {}
  return {
    header: header,
    claims: claims,
    data: data,
    signature: signature
  };
};
/**
 * Decodes a Firebase auth. token and checks the validity of its time-based claims. Will return true if the
 * token is within the time window authorized by the 'nbf' (not-before) and 'iat' (issued-at) claims.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var isValidTimestamp = exports.isValidTimestamp = function isValidTimestamp(token) {
  var claims = decode(token).claims;
  var now = Math.floor(new Date().getTime() / 1000);
  var validSince = 0,
    validUntil = 0;
  if (_typeof(claims) === 'object') {
    if (claims.hasOwnProperty('nbf')) {
      validSince = claims['nbf'];
    } else if (claims.hasOwnProperty('iat')) {
      validSince = claims['iat'];
    }
    if (claims.hasOwnProperty('exp')) {
      validUntil = claims['exp'];
    } else {
      // token will expire after 24h by default
      validUntil = validSince + 86400;
    }
  }
  return !!now && !!validSince && !!validUntil && now >= validSince && now <= validUntil;
};
/**
 * Decodes a Firebase auth. token and returns its issued at time if valid, null otherwise.
 *
 * Notes:
 * - May return null if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var issuedAtTime = exports.issuedAtTime = function issuedAtTime(token) {
  var claims = decode(token).claims;
  if (_typeof(claims) === 'object' && claims.hasOwnProperty('iat')) {
    return claims['iat'];
  }
  return null;
};
/**
 * Decodes a Firebase auth. token and checks the validity of its format. Expects a valid issued-at time.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var isValidFormat = exports.isValidFormat = function isValidFormat(token) {
  var decoded = decode(token),
    claims = decoded.claims;
  return !!claims && _typeof(claims) === 'object' && claims.hasOwnProperty('iat');
};
/**
 * Attempts to peer into an auth token and determine if it's an admin auth token by looking at the claims portion.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var isAdmin = exports.isAdmin = function isAdmin(token) {
  var claims = decode(token).claims;
  return _typeof(claims) === 'object' && claims['admin'] === true;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function contains(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function safeGet(obj, key) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  } else {
    return undefined;
  }
}
function isEmpty(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
function map(obj, fn, contextObj) {
  var res = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = fn.call(contextObj, obj[key], key, obj);
    }
  }
  return res;
}
/**
 * Deep equal two objects. Support Arrays and Objects.
 */
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  for (var _i = 0, _aKeys = aKeys; _i < _aKeys.length; _i++) {
    var k = _aKeys[_i];
    if (!bKeys.includes(k)) {
      return false;
    }
    var aProp = a[k];
    var bProp = b[k];
    if (isObject(aProp) && isObject(bProp)) {
      if (!deepEqual(aProp, bProp)) {
        return false;
      }
    } else if (aProp !== bProp) {
      return false;
    }
  }
  for (var _i2 = 0, _bKeys = bKeys; _i2 < _bKeys.length; _i2++) {
    var _k = _bKeys[_i2];
    if (!aKeys.includes(_k)) {
      return false;
    }
  }
  return true;
}
function isObject(thing) {
  return thing !== null && _typeof(thing) === 'object';
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Rejects if the given promise doesn't resolve in timeInMS milliseconds.
 * @internal
 */
function promiseWithTimeout(promise) {
  var timeInMS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
  var deferredPromise = new Deferred();
  setTimeout(function () {
    return deferredPromise.reject('timeout!');
  }, timeInMS);
  promise.then(deferredPromise.resolve, deferredPromise.reject);
  return deferredPromise.promise;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a
 * params object (e.g. {arg: 'val', arg2: 'val2'})
 * Note: You must prepend it with ? when adding it to a URL.
 */
function querystring(querystringParams) {
  var params = [];
  var _loop = function _loop() {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i3], 2),
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];
    if (Array.isArray(value)) {
      value.forEach(function (arrayVal) {
        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
      });
    } else {
      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  };
  for (var _i3 = 0, _Object$entries = Object.entries(querystringParams); _i3 < _Object$entries.length; _i3++) {
    _loop();
  }
  return params.length ? '&' + params.join('&') : '';
}
/**
 * Decodes a querystring (e.g. ?arg=val&arg2=val2) into a params object
 * (e.g. {arg: 'val', arg2: 'val2'})
 */
function querystringDecode(querystring) {
  var obj = {};
  var tokens = querystring.replace(/^\?/, '').split('&');
  tokens.forEach(function (token) {
    if (token) {
      var _token$split = token.split('='),
        _token$split2 = _slicedToArray(_token$split, 2),
        key = _token$split2[0],
        value = _token$split2[1];
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });
  return obj;
}
/**
 * Extract the query string part of a URL, including the leading question mark (if present).
 */
function extractQuerystring(url) {
  var queryStart = url.indexOf('?');
  if (!queryStart) {
    return '';
  }
  var fragmentStart = url.indexOf('#', queryStart);
  return url.substring(queryStart, fragmentStart > 0 ? fragmentStart : undefined);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */
/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @final
 * @struct
 */
var Sha1 = exports.Sha1 = /*#__PURE__*/function () {
  function Sha1() {
    _classCallCheck(this, Sha1);
    /**
     * Holds the previous values of accumulated variables a-e in the compress_
     * function.
     * @private
     */
    this.chain_ = [];
    /**
     * A buffer holding the partially computed hash result.
     * @private
     */
    this.buf_ = [];
    /**
     * An array of 80 bytes, each a part of the message to be hashed.  Referred to
     * as the message schedule in the docs.
     * @private
     */
    this.W_ = [];
    /**
     * Contains data needed to pad messages less than 64 bytes.
     * @private
     */
    this.pad_ = [];
    /**
     * @private {number}
     */
    this.inbuf_ = 0;
    /**
     * @private {number}
     */
    this.total_ = 0;
    this.blockSize = 512 / 8;
    this.pad_[0] = 128;
    for (var i = 1; i < this.blockSize; ++i) {
      this.pad_[i] = 0;
    }
    this.reset();
  }
  return _createClass(Sha1, [{
    key: "reset",
    value: function reset() {
      this.chain_[0] = 0x67452301;
      this.chain_[1] = 0xefcdab89;
      this.chain_[2] = 0x98badcfe;
      this.chain_[3] = 0x10325476;
      this.chain_[4] = 0xc3d2e1f0;
      this.inbuf_ = 0;
      this.total_ = 0;
    }
    /**
     * Internal compress helper function.
     * @param buf Block to compress.
     * @param offset Offset of the block in the buffer.
     * @private
     */
  }, {
    key: "compress_",
    value: function compress_(buf, offset) {
      if (!offset) {
        offset = 0;
      }
      var W = this.W_;
      // get 16 big endian words
      if (typeof buf === 'string') {
        for (var i = 0; i < 16; i++) {
          // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
          // have a bug that turns the post-increment ++ operator into pre-increment
          // during JIT compilation.  We have code that depends heavily on SHA-1 for
          // correctness and which is affected by this bug, so I've removed all uses
          // of post-increment ++ in which the result value is used.  We can revert
          // this change once the Safari bug
          // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
          // most clients have been updated.
          W[i] = buf.charCodeAt(offset) << 24 | buf.charCodeAt(offset + 1) << 16 | buf.charCodeAt(offset + 2) << 8 | buf.charCodeAt(offset + 3);
          offset += 4;
        }
      } else {
        for (var _i4 = 0; _i4 < 16; _i4++) {
          W[_i4] = buf[offset] << 24 | buf[offset + 1] << 16 | buf[offset + 2] << 8 | buf[offset + 3];
          offset += 4;
        }
      }
      // expand to 80 words
      for (var _i5 = 16; _i5 < 80; _i5++) {
        var t = W[_i5 - 3] ^ W[_i5 - 8] ^ W[_i5 - 14] ^ W[_i5 - 16];
        W[_i5] = (t << 1 | t >>> 31) & 0xffffffff;
      }
      var a = this.chain_[0];
      var b = this.chain_[1];
      var c = this.chain_[2];
      var d = this.chain_[3];
      var e = this.chain_[4];
      var f, k;
      // TODO(user): Try to unroll this loop to speed up the computation.
      for (var _i6 = 0; _i6 < 80; _i6++) {
        if (_i6 < 40) {
          if (_i6 < 20) {
            f = d ^ b & (c ^ d);
            k = 0x5a827999;
          } else {
            f = b ^ c ^ d;
            k = 0x6ed9eba1;
          }
        } else {
          if (_i6 < 60) {
            f = b & c | d & (b | c);
            k = 0x8f1bbcdc;
          } else {
            f = b ^ c ^ d;
            k = 0xca62c1d6;
          }
        }
        var _t = (a << 5 | a >>> 27) + f + e + k + W[_i6] & 0xffffffff;
        e = d;
        d = c;
        c = (b << 30 | b >>> 2) & 0xffffffff;
        b = a;
        a = _t;
      }
      this.chain_[0] = this.chain_[0] + a & 0xffffffff;
      this.chain_[1] = this.chain_[1] + b & 0xffffffff;
      this.chain_[2] = this.chain_[2] + c & 0xffffffff;
      this.chain_[3] = this.chain_[3] + d & 0xffffffff;
      this.chain_[4] = this.chain_[4] + e & 0xffffffff;
    }
  }, {
    key: "update",
    value: function update(bytes, length) {
      // TODO(johnlenz): tighten the function signature and remove this check
      if (bytes == null) {
        return;
      }
      if (length === undefined) {
        length = bytes.length;
      }
      var lengthMinusBlock = length - this.blockSize;
      var n = 0;
      // Using local instead of member variables gives ~5% speedup on Firefox 16.
      var buf = this.buf_;
      var inbuf = this.inbuf_;
      // The outer while loop should execute at most twice.
      while (n < length) {
        // When we have no data in the block to top up, we can directly process the
        // input buffer (assuming it contains sufficient data). This gives ~25%
        // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
        // the data is provided in large chunks (or in multiples of 64 bytes).
        if (inbuf === 0) {
          while (n <= lengthMinusBlock) {
            this.compress_(bytes, n);
            n += this.blockSize;
          }
        }
        if (typeof bytes === 'string') {
          while (n < length) {
            buf[inbuf] = bytes.charCodeAt(n);
            ++inbuf;
            ++n;
            if (inbuf === this.blockSize) {
              this.compress_(buf);
              inbuf = 0;
              // Jump to the outer loop so we use the full-block optimization.
              break;
            }
          }
        } else {
          while (n < length) {
            buf[inbuf] = bytes[n];
            ++inbuf;
            ++n;
            if (inbuf === this.blockSize) {
              this.compress_(buf);
              inbuf = 0;
              // Jump to the outer loop so we use the full-block optimization.
              break;
            }
          }
        }
      }
      this.inbuf_ = inbuf;
      this.total_ += length;
    }
    /** @override */
  }, {
    key: "digest",
    value: function digest() {
      var digest = [];
      var totalBits = this.total_ * 8;
      // Add pad 0x80 0x00*.
      if (this.inbuf_ < 56) {
        this.update(this.pad_, 56 - this.inbuf_);
      } else {
        this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
      }
      // Add # bits.
      for (var i = this.blockSize - 1; i >= 56; i--) {
        this.buf_[i] = totalBits & 255;
        totalBits /= 256; // Don't use bit-shifting here!
      }
      this.compress_(this.buf_);
      var n = 0;
      for (var _i7 = 0; _i7 < 5; _i7++) {
        for (var j = 24; j >= 0; j -= 8) {
          digest[n] = this.chain_[_i7] >> j & 255;
          ++n;
        }
      }
      return digest;
    }
  }]);
}();
/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */
function createSubscribe(executor, onNoObservers) {
  var proxy = new ObserverProxy(executor, onNoObservers);
  return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */
var ObserverProxy = /*#__PURE__*/function () {
  /**
   * @param executor Function which can make calls to a single Observer
   *     as a proxy.
   * @param onNoObservers Callback when count of Observers goes to zero.
   */
  function ObserverProxy(executor, onNoObservers) {
    var _this5 = this;
    _classCallCheck(this, ObserverProxy);
    this.observers = [];
    this.unsubscribes = [];
    this.observerCount = 0;
    // Micro-task scheduling by calling task.then().
    this.task = Promise.resolve();
    this.finalized = false;
    this.onNoObservers = onNoObservers;
    // Call the executor asynchronously so subscribers that are called
    // synchronously after the creation of the subscribe function
    // can still receive the very first value generated in the executor.
    this.task.then(function () {
      executor(_this5);
    }).catch(function (e) {
      _this5.error(e);
    });
  }
  return _createClass(ObserverProxy, [{
    key: "next",
    value: function next(value) {
      this.forEachObserver(function (observer) {
        observer.next(value);
      });
    }
  }, {
    key: "error",
    value: function error(_error) {
      this.forEachObserver(function (observer) {
        observer.error(_error);
      });
      this.close(_error);
    }
  }, {
    key: "complete",
    value: function complete() {
      this.forEachObserver(function (observer) {
        observer.complete();
      });
      this.close();
    }
    /**
     * Subscribe function that can be used to add an Observer to the fan-out list.
     *
     * - We require that no event is sent to a subscriber synchronously to their
     *   call to subscribe().
     */
  }, {
    key: "subscribe",
    value: function subscribe(nextOrObserver, error, complete) {
      var _this6 = this;
      var observer;
      if (nextOrObserver === undefined && error === undefined && complete === undefined) {
        throw new Error('Missing Observer.');
      }
      // Assemble an Observer object when passed as callback functions.
      if (implementsAnyMethods(nextOrObserver, ['next', 'error', 'complete'])) {
        observer = nextOrObserver;
      } else {
        observer = {
          next: nextOrObserver,
          error: error,
          complete: complete
        };
      }
      if (observer.next === undefined) {
        observer.next = noop;
      }
      if (observer.error === undefined) {
        observer.error = noop;
      }
      if (observer.complete === undefined) {
        observer.complete = noop;
      }
      var unsub = this.unsubscribeOne.bind(this, this.observers.length);
      // Attempt to subscribe to a terminated Observable - we
      // just respond to the Observer with the final error or complete
      // event.
      if (this.finalized) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.task.then(function () {
          try {
            if (_this6.finalError) {
              observer.error(_this6.finalError);
            } else {
              observer.complete();
            }
          } catch (e) {
            // nothing
          }
          return;
        });
      }
      this.observers.push(observer);
      return unsub;
    }
    // Unsubscribe is synchronous - we guarantee that no events are sent to
    // any unsubscribed Observer.
  }, {
    key: "unsubscribeOne",
    value: function unsubscribeOne(i) {
      if (this.observers === undefined || this.observers[i] === undefined) {
        return;
      }
      delete this.observers[i];
      this.observerCount -= 1;
      if (this.observerCount === 0 && this.onNoObservers !== undefined) {
        this.onNoObservers(this);
      }
    }
  }, {
    key: "forEachObserver",
    value: function forEachObserver(fn) {
      if (this.finalized) {
        // Already closed by previous event....just eat the additional values.
        return;
      }
      // Since sendOne calls asynchronously - there is no chance that
      // this.observers will become undefined.
      for (var i = 0; i < this.observers.length; i++) {
        this.sendOne(i, fn);
      }
    }
    // Call the Observer via one of it's callback function. We are careful to
    // confirm that the observe has not been unsubscribed since this asynchronous
    // function had been queued.
  }, {
    key: "sendOne",
    value: function sendOne(i, fn) {
      var _this7 = this;
      // Execute the callback asynchronously
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.task.then(function () {
        if (_this7.observers !== undefined && _this7.observers[i] !== undefined) {
          try {
            fn(_this7.observers[i]);
          } catch (e) {
            // Ignore exceptions raised in Observers or missing methods of an
            // Observer.
            // Log error to console. b/31404806
            if (typeof console !== 'undefined' && console.error) {
              console.error(e);
            }
          }
        }
      });
    }
  }, {
    key: "close",
    value: function close(err) {
      var _this8 = this;
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      if (err !== undefined) {
        this.finalError = err;
      }
      // Proxy is no longer needed - garbage collect references
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.task.then(function () {
        _this8.observers = undefined;
        _this8.onNoObservers = undefined;
      });
    }
  }]);
}();
/** Turn synchronous function into one called asynchronously. */
// eslint-disable-next-line @typescript-eslint/ban-types
function async(fn, onError) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    Promise.resolve(true).then(function () {
      fn.apply(void 0, args);
    }).catch(function (error) {
      if (onError) {
        onError(error);
      }
    });
  };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */
function implementsAnyMethods(obj, methods) {
  if (_typeof(obj) !== 'object' || obj === null) {
    return false;
  }
  var _iterator = _createForOfIteratorHelper(methods),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var method = _step.value;
      if (method in obj && typeof obj[method] === 'function') {
        return true;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return false;
}
function noop() {
  // do nothing
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Check to make sure the appropriate number of arguments are provided for a public function.
 * Throws an error if it fails.
 *
 * @param fnName The function name
 * @param minCount The minimum number of arguments to allow for the function call
 * @param maxCount The maximum number of argument to allow for the function call
 * @param argCount The actual number of arguments provided.
 */
var validateArgCount = exports.validateArgCount = function validateArgCount(fnName, minCount, maxCount, argCount) {
  var argError;
  if (argCount < minCount) {
    argError = 'at least ' + minCount;
  } else if (argCount > maxCount) {
    argError = maxCount === 0 ? 'none' : 'no more than ' + maxCount;
  }
  if (argError) {
    var error = fnName + ' failed: Was called with ' + argCount + (argCount === 1 ? ' argument.' : ' arguments.') + ' Expects ' + argError + '.';
    throw new Error(error);
  }
};
/**
 * Generates a string to prefix an error message about failed argument validation
 *
 * @param fnName The function name
 * @param argName The name of the argument
 * @return The prefix to add to the error thrown for validation.
 */
function errorPrefix(fnName, argName) {
  return "".concat(fnName, " failed: ").concat(argName, " argument ");
}
/**
 * @param fnName
 * @param argumentNumber
 * @param namespace
 * @param optional
 */
function validateNamespace(fnName, namespace, optional) {
  if (optional && !namespace) {
    return;
  }
  if (typeof namespace !== 'string') {
    //TODO: I should do more validation here. We only allow certain chars in namespaces.
    throw new Error(errorPrefix(fnName, 'namespace') + 'must be a valid firebase namespace.');
  }
}
function validateCallback(fnName, argumentName,
// eslint-disable-next-line @typescript-eslint/ban-types
callback, optional) {
  if (optional && !callback) {
    return;
  }
  if (typeof callback !== 'function') {
    throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid function.');
  }
}
function validateContextObject(fnName, argumentName, context, optional) {
  if (optional && !context) {
    return;
  }
  if (_typeof(context) !== 'object' || context === null) {
    throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid context object.');
  }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Code originally came from goog.crypt.stringToUtf8ByteArray, but for some reason they
// automatically replaced '\r\n' with '\n', and they didn't handle surrogate pairs,
// so it's been modified.
// Note that not all Unicode characters appear as single characters in JavaScript strings.
// fromCharCode returns the UTF-16 encoding of a character - so some Unicode characters
// use 2 characters in JavaScript.  All 4-byte UTF-8 characters begin with a first
// character in the range 0xD800 - 0xDBFF (the first character of a so-called surrogate
// pair).
// See http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3
/**
 * @param {string} str
 * @return {Array}
 */
var stringToByteArray = exports.stringToByteArray = function stringToByteArray(str) {
  var out = [];
  var p = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    // Is this the lead surrogate in a surrogate pair?
    if (c >= 0xd800 && c <= 0xdbff) {
      var high = c - 0xd800; // the high 10 bits.
      i++;
      assert(i < str.length, 'Surrogate pair missing trail surrogate.');
      var low = str.charCodeAt(i) - 0xdc00; // the low 10 bits.
      c = 0x10000 + (high << 10) + low;
    }
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if (c < 65536) {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }
  return out;
};
/**
 * Calculate length without actually converting; useful for doing cheaper validation.
 * @param {string} str
 * @return {number}
 */
var stringLength = exports.stringLength = function stringLength(str) {
  var p = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c < 128) {
      p++;
    } else if (c < 2048) {
      p += 2;
    } else if (c >= 0xd800 && c <= 0xdbff) {
      // Lead surrogate of a surrogate pair.  The pair together will take 4 bytes to represent.
      p += 4;
      i++; // skip trail surrogate.
    } else {
      p += 3;
    }
  }
  return p;
};

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Copied from https://stackoverflow.com/a/2117523
 * Generates a new uuid.
 * @public
 */
var uuidv4 = exports.uuidv4 = function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The amount of milliseconds to exponentially increase.
 */
var DEFAULT_INTERVAL_MILLIS = 1000;
/**
 * The factor to backoff by.
 * Should be a number greater than 1.
 */
var DEFAULT_BACKOFF_FACTOR = 2;
/**
 * The maximum milliseconds to increase to.
 *
 * <p>Visible for testing
 */
var MAX_VALUE_MILLIS = exports.MAX_VALUE_MILLIS = 4 * 60 * 60 * 1000; // Four hours, like iOS and Android.
/**
 * The percentage of backoff time to randomize by.
 * See
 * http://go/safe-client-behavior#step-1-determine-the-appropriate-retry-interval-to-handle-spike-traffic
 * for context.
 *
 * <p>Visible for testing
 */
var RANDOM_FACTOR = exports.RANDOM_FACTOR = 0.5;
/**
 * Based on the backoff method from
 * https://github.com/google/closure-library/blob/master/closure/goog/math/exponentialbackoff.js.
 * Extracted here so we don't need to pass metadata and a stateful ExponentialBackoff object around.
 */
function calculateBackoffMillis(backoffCount) {
  var intervalMillis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_INTERVAL_MILLIS;
  var backoffFactor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_BACKOFF_FACTOR;
  // Calculates an exponentially increasing value.
  // Deviation: calculates value from count and a constant interval, so we only need to save value
  // and count to restore state.
  var currBaseValue = intervalMillis * Math.pow(backoffFactor, backoffCount);
  // A random "fuzz" to avoid waves of retries.
  // Deviation: randomFactor is required.
  var randomWait = Math.round(
  // A fraction of the backoff value to add/subtract.
  // Deviation: changes multiplication order to improve readability.
  RANDOM_FACTOR * currBaseValue * (
  // A random float (rounded to int by Math.round above) in the range [-1, 1]. Determines
  // if we add or subtract.
  Math.random() - 0.5) * 2);
  // Limits backoff to max to avoid effectively permanent backoff.
  return Math.min(MAX_VALUE_MILLIS, currBaseValue + randomWait);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provide English ordinal letters after a number
 */
function ordinal(i) {
  if (!Number.isFinite(i)) {
    return "".concat(i);
  }
  return i + indicator(i);
}
function indicator(i) {
  i = Math.abs(i);
  var cent = i % 100;
  if (cent >= 10 && cent <= 20) {
    return 'th';
  }
  var dec = i % 10;
  if (dec === 1) {
    return 'st';
  }
  if (dec === 2) {
    return 'nd';
  }
  if (dec === 3) {
    return 'rd';
  }
  return 'th';
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getModularInstance(service) {
  if (service && service._delegate) {
    return service._delegate;
  } else {
    return service;
  }
}
},{"process":"../../../../../AppData/Roaming/nvm/v22.9.0/node_modules/parcel-bundler/node_modules/process/browser.js"}],"../node_modules/@firebase/component/dist/esm/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = exports.ComponentContainer = exports.Component = void 0;
var _util = require("@firebase/util");
/**
 * Component for service name T, e.g. `auth`, `auth-internal`
 */
class Component {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(name, instanceFactory, type) {
    this.name = name;
    this.instanceFactory = instanceFactory;
    this.type = type;
    this.multipleInstances = false;
    /**
     * Properties to be added to the service namespace
     */
    this.serviceProps = {};
    this.instantiationMode = "LAZY" /* InstantiationMode.LAZY */;
    this.onInstanceCreated = null;
  }
  setInstantiationMode(mode) {
    this.instantiationMode = mode;
    return this;
  }
  setMultipleInstances(multipleInstances) {
    this.multipleInstances = multipleInstances;
    return this;
  }
  setServiceProps(props) {
    this.serviceProps = props;
    return this;
  }
  setInstanceCreatedCallback(callback) {
    this.onInstanceCreated = callback;
    return this;
  }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
exports.Component = Component;
const DEFAULT_ENTRY_NAME = '[DEFAULT]';

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for instance for service name T, e.g. 'auth', 'auth-internal'
 * NameServiceMapping[T] is an alias for the type of the instance
 */
class Provider {
  constructor(name, container) {
    this.name = name;
    this.container = container;
    this.component = null;
    this.instances = new Map();
    this.instancesDeferred = new Map();
    this.instancesOptions = new Map();
    this.onInitCallbacks = new Map();
  }
  /**
   * @param identifier A provider can provide multiple instances of a service
   * if this.component.multipleInstances is true.
   */
  get(identifier) {
    // if multipleInstances is not supported, use the default name
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    if (!this.instancesDeferred.has(normalizedIdentifier)) {
      const deferred = new _util.Deferred();
      this.instancesDeferred.set(normalizedIdentifier, deferred);
      if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
        // initialize the service if it can be auto-initialized
        try {
          const instance = this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier
          });
          if (instance) {
            deferred.resolve(instance);
          }
        } catch (e) {
          // when the instance factory throws an exception during get(), it should not cause
          // a fatal error. We just return the unresolved promise in this case.
        }
      }
    }
    return this.instancesDeferred.get(normalizedIdentifier).promise;
  }
  getImmediate(options) {
    var _a;
    // if multipleInstances is not supported, use the default name
    const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
    const optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;
    if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
      try {
        return this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
      } catch (e) {
        if (optional) {
          return null;
        } else {
          throw e;
        }
      }
    } else {
      // In case a component is not initialized and should/cannot be auto-initialized at the moment, return null if the optional flag is set, or throw
      if (optional) {
        return null;
      } else {
        throw Error(`Service ${this.name} is not available`);
      }
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(component) {
    if (component.name !== this.name) {
      throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
    }
    if (this.component) {
      throw Error(`Component for ${this.name} has already been provided`);
    }
    this.component = component;
    // return early without attempting to initialize the component if the component requires explicit initialization (calling `Provider.initialize()`)
    if (!this.shouldAutoInitialize()) {
      return;
    }
    // if the service is eager, initialize the default instance
    if (isComponentEager(component)) {
      try {
        this.getOrInitializeService({
          instanceIdentifier: DEFAULT_ENTRY_NAME
        });
      } catch (e) {
        // when the instance factory for an eager Component throws an exception during the eager
        // initialization, it should not cause a fatal error.
        // TODO: Investigate if we need to make it configurable, because some component may want to cause
        // a fatal error in this case?
      }
    }
    // Create service instances for the pending promises and resolve them
    // NOTE: if this.multipleInstances is false, only the default instance will be created
    // and all promises with resolve with it regardless of the identifier.
    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
      try {
        // `getOrInitializeService()` should always return a valid instance since a component is guaranteed. use ! to make typescript happy.
        const instance = this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
        instanceDeferred.resolve(instance);
      } catch (e) {
        // when the instance factory throws an exception, it should not cause
        // a fatal error. We just leave the promise unresolved.
      }
    }
  }
  clearInstance(identifier = DEFAULT_ENTRY_NAME) {
    this.instancesDeferred.delete(identifier);
    this.instancesOptions.delete(identifier);
    this.instances.delete(identifier);
  }
  // app.delete() will call this method on every provider to delete the services
  // TODO: should we mark the provider as deleted?
  async delete() {
    const services = Array.from(this.instances.values());
    await Promise.all([...services.filter(service => 'INTERNAL' in service) // legacy services
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(service => service.INTERNAL.delete()), ...services.filter(service => '_delete' in service) // modularized services
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(service => service._delete())]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(identifier = DEFAULT_ENTRY_NAME) {
    return this.instances.has(identifier);
  }
  getOptions(identifier = DEFAULT_ENTRY_NAME) {
    return this.instancesOptions.get(identifier) || {};
  }
  initialize(opts = {}) {
    const {
      options = {}
    } = opts;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
    if (this.isInitialized(normalizedIdentifier)) {
      throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
    }
    if (!this.isComponentSet()) {
      throw Error(`Component ${this.name} has not been registered yet`);
    }
    const instance = this.getOrInitializeService({
      instanceIdentifier: normalizedIdentifier,
      options
    });
    // resolve any pending promise waiting for the service instance
    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
      if (normalizedIdentifier === normalizedDeferredIdentifier) {
        instanceDeferred.resolve(instance);
      }
    }
    return instance;
  }
  /**
   *
   * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
   * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
   *
   * @param identifier An optional instance identifier
   * @returns a function to unregister the callback
   */
  onInit(callback, identifier) {
    var _a;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : new Set();
    existingCallbacks.add(callback);
    this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
    const existingInstance = this.instances.get(normalizedIdentifier);
    if (existingInstance) {
      callback(existingInstance, normalizedIdentifier);
    }
    return () => {
      existingCallbacks.delete(callback);
    };
  }
  /**
   * Invoke onInit callbacks synchronously
   * @param instance the service instance`
   */
  invokeOnInitCallbacks(instance, identifier) {
    const callbacks = this.onInitCallbacks.get(identifier);
    if (!callbacks) {
      return;
    }
    for (const callback of callbacks) {
      try {
        callback(instance, identifier);
      } catch (_a) {
        // ignore errors in the onInit callback
      }
    }
  }
  getOrInitializeService({
    instanceIdentifier,
    options = {}
  }) {
    let instance = this.instances.get(instanceIdentifier);
    if (!instance && this.component) {
      instance = this.component.instanceFactory(this.container, {
        instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
        options
      });
      this.instances.set(instanceIdentifier, instance);
      this.instancesOptions.set(instanceIdentifier, options);
      /**
       * Invoke onInit listeners.
       * Note this.component.onInstanceCreated is different, which is used by the component creator,
       * while onInit listeners are registered by consumers of the provider.
       */
      this.invokeOnInitCallbacks(instance, instanceIdentifier);
      /**
       * Order is important
       * onInstanceCreated() should be called after this.instances.set(instanceIdentifier, instance); which
       * makes `isInitialized()` return true.
       */
      if (this.component.onInstanceCreated) {
        try {
          this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
        } catch (_a) {
          // ignore errors in the onInstanceCreatedCallback
        }
      }
    }
    return instance || null;
  }
  normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME) {
    if (this.component) {
      return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
    } else {
      return identifier; // assume multiple instances are supported before the component is provided.
    }
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT" /* InstantiationMode.EXPLICIT */;
  }
}
// undefined should be passed to the service factory for the default instance
exports.Provider = Provider;
function normalizeIdentifierForFactory(identifier) {
  return identifier === DEFAULT_ENTRY_NAME ? undefined : identifier;
}
function isComponentEager(component) {
  return component.instantiationMode === "EAGER" /* InstantiationMode.EAGER */;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
 */
class ComponentContainer {
  constructor(name) {
    this.name = name;
    this.providers = new Map();
  }
  /**
   *
   * @param component Component being added
   * @param overwrite When a component with the same name has already been registered,
   * if overwrite is true: overwrite the existing component with the new component and create a new
   * provider with the new component. It can be useful in tests where you want to use different mocks
   * for different tests.
   * if overwrite is false: throw an exception
   */
  addComponent(component) {
    const provider = this.getProvider(component.name);
    if (provider.isComponentSet()) {
      throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
    }
    provider.setComponent(component);
  }
  addOrOverwriteComponent(component) {
    const provider = this.getProvider(component.name);
    if (provider.isComponentSet()) {
      // delete the existing provider from the container, so we can register the new component
      this.providers.delete(component.name);
    }
    this.addComponent(component);
  }
  /**
   * getProvider provides a type safe interface where it can only be called with a field name
   * present in NameServiceMapping interface.
   *
   * Firebase SDKs providing services should extend NameServiceMapping interface to register
   * themselves.
   */
  getProvider(name) {
    if (this.providers.has(name)) {
      return this.providers.get(name);
    }
    // create a Provider for a service that hasn't registered with Firebase
    const provider = new Provider(name, this);
    this.providers.set(name, provider);
    return provider;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
exports.ComponentContainer = ComponentContainer;
},{"@firebase/util":"../node_modules/@firebase/util/dist/index.esm2017.js"}],"../node_modules/@firebase/logger/dist/esm/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = exports.LogLevel = void 0;
exports.setLogLevel = setLogLevel;
exports.setUserLogHandler = setUserLogHandler;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A container for all of the Logger instances
 */
const instances = [];
/**
 * The JS SDK supports 5 log levels and also allows a user the ability to
 * silence the logs altogether.
 *
 * The order is a follows:
 * DEBUG < VERBOSE < INFO < WARN < ERROR
 *
 * All of the log types above the current log level will be captured (i.e. if
 * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
 * `VERBOSE` logs will not)
 */
var LogLevel;
(function (LogLevel) {
  LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
  LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
  LogLevel[LogLevel["INFO"] = 2] = "INFO";
  LogLevel[LogLevel["WARN"] = 3] = "WARN";
  LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
  LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
const levelStringToEnum = {
  'debug': LogLevel.DEBUG,
  'verbose': LogLevel.VERBOSE,
  'info': LogLevel.INFO,
  'warn': LogLevel.WARN,
  'error': LogLevel.ERROR,
  'silent': LogLevel.SILENT
};
/**
 * The default log level
 */
const defaultLogLevel = LogLevel.INFO;
/**
 * By default, `console.debug` is not displayed in the developer console (in
 * chrome). To avoid forcing users to have to opt-in to these logs twice
 * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
 * logs to the `console.log` function.
 */
const ConsoleMethod = {
  [LogLevel.DEBUG]: 'log',
  [LogLevel.VERBOSE]: 'log',
  [LogLevel.INFO]: 'info',
  [LogLevel.WARN]: 'warn',
  [LogLevel.ERROR]: 'error'
};
/**
 * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
 * messages on to their corresponding console counterparts (if the log method
 * is supported by the current log level)
 */
const defaultLogHandler = (instance, logType, ...args) => {
  if (logType < instance.logLevel) {
    return;
  }
  const now = new Date().toISOString();
  const method = ConsoleMethod[logType];
  if (method) {
    console[method](`[${now}]  ${instance.name}:`, ...args);
  } else {
    throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
  }
};
class Logger {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(name) {
    this.name = name;
    /**
     * The log level of the given Logger instance.
     */
    this._logLevel = defaultLogLevel;
    /**
     * The main (internal) log handler for the Logger instance.
     * Can be set to a new function in internal package code but not by user.
     */
    this._logHandler = defaultLogHandler;
    /**
     * The optional, additional, user-defined log handler for the Logger instance.
     */
    this._userLogHandler = null;
    /**
     * Capture the current instance for later use
     */
    instances.push(this);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(val) {
    if (!(val in LogLevel)) {
      throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
    }
    this._logLevel = val;
  }
  // Workaround for setter/getter having to be the same type.
  setLogLevel(val) {
    this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(val) {
    if (typeof val !== 'function') {
      throw new TypeError('Value assigned to `logHandler` must be a function');
    }
    this._logHandler = val;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(val) {
    this._userLogHandler = val;
  }
  /**
   * The functions below are all based on the `console` interface
   */
  debug(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
    this._logHandler(this, LogLevel.DEBUG, ...args);
  }
  log(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.VERBOSE, ...args);
    this._logHandler(this, LogLevel.VERBOSE, ...args);
  }
  info(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
    this._logHandler(this, LogLevel.INFO, ...args);
  }
  warn(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
    this._logHandler(this, LogLevel.WARN, ...args);
  }
  error(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
    this._logHandler(this, LogLevel.ERROR, ...args);
  }
}
exports.Logger = Logger;
function setLogLevel(level) {
  instances.forEach(inst => {
    inst.setLogLevel(level);
  });
}
function setUserLogHandler(logCallback, options) {
  for (const instance of instances) {
    let customLogLevel = null;
    if (options && options.level) {
      customLogLevel = levelStringToEnum[options.level];
    }
    if (logCallback === null) {
      instance.userLogHandler = null;
    } else {
      instance.userLogHandler = (instance, level, ...args) => {
        const message = args.map(arg => {
          if (arg == null) {
            return null;
          } else if (typeof arg === 'string') {
            return arg;
          } else if (typeof arg === 'number' || typeof arg === 'boolean') {
            return arg.toString();
          } else if (arg instanceof Error) {
            return arg.message;
          } else {
            try {
              return JSON.stringify(arg);
            } catch (ignored) {
              return null;
            }
          }
        }).filter(arg => arg).join(' ');
        if (level >= (customLogLevel !== null && customLogLevel !== void 0 ? customLogLevel : instance.logLevel)) {
          logCallback({
            level: LogLevel[level].toLowerCase(),
            message,
            args,
            type: instance.name
          });
        }
      };
    }
  }
}
},{}],"../node_modules/idb/build/wrap-idb-value.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i = exports.a = void 0;
exports.r = replaceTraps;
exports.u = void 0;
exports.w = wrap;
const instanceOfAny = (object, constructors) => constructors.some(c => object instanceof c);
exports.i = instanceOfAny;
let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey]);
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = exports.a = new WeakMap();
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener('success', success);
      request.removeEventListener('error', error);
    };
    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };
    const error = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener('success', success);
    request.addEventListener('error', error);
  });
  promise.then(value => {
    // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
    // (see wrapFunction).
    if (value instanceof IDBCursor) {
      cursorRequestMap.set(value, request);
    }
    // Catching to avoid "Uncaught Promise exceptions"
  }).catch(() => {});
  // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
  // is because we create many promises from a single IDBRequest.
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  // Early bail if we've already created a done promise for this transaction.
  if (transactionDoneMap.has(tx)) return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener('complete', complete);
      tx.removeEventListener('error', error);
      tx.removeEventListener('abort', error);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error = () => {
      reject(tx.error || new DOMException('AbortError', 'AbortError'));
      unlisten();
    };
    tx.addEventListener('complete', complete);
    tx.addEventListener('error', error);
    tx.addEventListener('abort', error);
  });
  // Cache it for later retrieval.
  transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      // Special handling for transaction.done.
      if (prop === 'done') return transactionDoneMap.get(target);
      // Polyfill for objectStoreNames because of Edge.
      if (prop === 'objectStoreNames') {
        return target.objectStoreNames || transactionStoreNamesMap.get(target);
      }
      // Make tx.store return the only store in the transaction, or undefined if there are many.
      if (prop === 'store') {
        return receiver.objectStoreNames[1] ? undefined : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    // Else transform whatever we get back.
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === 'done' || prop === 'store')) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  // Due to expected object equality (which is enforced by the caching in `wrap`), we
  // only create one new func per func.
  // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
  if (func === IDBDatabase.prototype.transaction && !('objectStoreNames' in IDBTransaction.prototype)) {
    return function (storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  }
  // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
  // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
  // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
  // with real promises, so each advance methods returns a new promise for the cursor object, or
  // undefined if the end of the cursor has been reached.
  if (getCursorAdvanceMethods().includes(func)) {
    return function (...args) {
      // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
      // the original object.
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }
  return function (...args) {
    // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
    // the original object.
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === 'function') return wrapFunction(value);
  // This doesn't return, it just creates a 'done' promise for the transaction,
  // which is later returned for transaction.done (see idbObjectHandler).
  if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps);
  // Return the same value back if we're not going to transform it.
  return value;
}
function wrap(value) {
  // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
  // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
  if (value instanceof IDBRequest) return promisifyRequest(value);
  // If we've already transformed this value before, reuse the transformed value.
  // This is faster, but it also provides object equality.
  if (transformCache.has(value)) return transformCache.get(value);
  const newValue = transformCachableValue(value);
  // Not all types are transformed.
  // These may be primitive types, so they can't be WeakMap keys.
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
const unwrap = value => reverseTransformCache.get(value);
exports.u = unwrap;
},{}],"../node_modules/idb/build/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDB = deleteDB;
exports.openDB = openDB;
Object.defineProperty(exports, "unwrap", {
  enumerable: true,
  get: function () {
    return _wrapIdbValue.u;
  }
});
Object.defineProperty(exports, "wrap", {
  enumerable: true,
  get: function () {
    return _wrapIdbValue.w;
  }
});
var _wrapIdbValue = require("./wrap-idb-value.js");
/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, {
  blocked,
  upgrade,
  blocking,
  terminated
} = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = (0, _wrapIdbValue.w)(request);
  if (upgrade) {
    request.addEventListener('upgradeneeded', event => {
      upgrade((0, _wrapIdbValue.w)(request.result), event.oldVersion, event.newVersion, (0, _wrapIdbValue.w)(request.transaction), event);
    });
  }
  if (blocked) {
    request.addEventListener('blocked', event => blocked(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    event.oldVersion, event.newVersion, event));
  }
  openPromise.then(db => {
    if (terminated) db.addEventListener('close', () => terminated());
    if (blocking) {
      db.addEventListener('versionchange', event => blocking(event.oldVersion, event.newVersion, event));
    }
  }).catch(() => {});
  return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */
function deleteDB(name, {
  blocked
} = {}) {
  const request = indexedDB.deleteDatabase(name);
  if (blocked) {
    request.addEventListener('blocked', event => blocked(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    event.oldVersion, event));
  }
  return (0, _wrapIdbValue.w)(request).then(() => undefined);
}
const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === 'string')) {
    return;
  }
  if (cachedMethods.get(prop)) return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, '');
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
  // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
  !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
    return;
  }
  const method = async function (storeName, ...args) {
    // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
    const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
    let target = tx.store;
    if (useIndex) target = target.index(args.shift());
    // Must reject if op rejects.
    // If it's a write operation, must reject if tx.done rejects.
    // Must reject with op rejection first.
    // Must resolve with op value.
    // Must handle both promises (no unhandled rejections)
    return (await Promise.all([target[targetFuncName](...args), isWrite && tx.done]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
(0, _wrapIdbValue.r)(oldTraps => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
},{"./wrap-idb-value.js":"../node_modules/idb/build/wrap-idb-value.js"}],"../node_modules/@firebase/app/dist/esm/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FirebaseError", {
  enumerable: true,
  get: function () {
    return _util.FirebaseError;
  }
});
exports._DEFAULT_ENTRY_NAME = exports.SDK_VERSION = void 0;
exports._addComponent = _addComponent;
exports._addOrOverwriteComponent = _addOrOverwriteComponent;
exports._apps = void 0;
exports._clearComponents = _clearComponents;
exports._components = void 0;
exports._getProvider = _getProvider;
exports._isFirebaseApp = _isFirebaseApp;
exports._isFirebaseServerApp = _isFirebaseServerApp;
exports._registerComponent = _registerComponent;
exports._removeServiceInstance = _removeServiceInstance;
exports._serverApps = void 0;
exports.deleteApp = deleteApp;
exports.getApp = getApp;
exports.getApps = getApps;
exports.initializeApp = initializeApp;
exports.initializeServerApp = initializeServerApp;
exports.onLog = onLog;
exports.registerVersion = registerVersion;
exports.setLogLevel = setLogLevel;
var _component = require("@firebase/component");
var _logger = require("@firebase/logger");
var _util = require("@firebase/util");
var _idb = require("idb");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class PlatformLoggerServiceImpl {
  constructor(container) {
    this.container = container;
  }
  // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.
  getPlatformInfoString() {
    const providers = this.container.getProviders();
    // Loop through providers and get library/version pairs from any that are
    // version components.
    return providers.map(provider => {
      if (isVersionServiceProvider(provider)) {
        const service = provider.getImmediate();
        return `${service.library}/${service.version}`;
      } else {
        return null;
      }
    }).filter(logString => logString).join(' ');
  }
}
/**
 *
 * @param provider check if this provider provides a VersionService
 *
 * NOTE: Using Provider<'app-version'> is a hack to indicate that the provider
 * provides VersionService. The provider is not necessarily a 'app-version'
 * provider.
 */
function isVersionServiceProvider(provider) {
  const component = provider.getComponent();
  return (component === null || component === void 0 ? void 0 : component.type) === "VERSION" /* ComponentType.VERSION */;
}
const name$q = "@firebase/app";
const version$1 = "0.10.17";

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const logger = new _logger.Logger('@firebase/app');
const name$p = "@firebase/app-compat";
const name$o = "@firebase/analytics-compat";
const name$n = "@firebase/analytics";
const name$m = "@firebase/app-check-compat";
const name$l = "@firebase/app-check";
const name$k = "@firebase/auth";
const name$j = "@firebase/auth-compat";
const name$i = "@firebase/database";
const name$h = "@firebase/data-connect";
const name$g = "@firebase/database-compat";
const name$f = "@firebase/functions";
const name$e = "@firebase/functions-compat";
const name$d = "@firebase/installations";
const name$c = "@firebase/installations-compat";
const name$b = "@firebase/messaging";
const name$a = "@firebase/messaging-compat";
const name$9 = "@firebase/performance";
const name$8 = "@firebase/performance-compat";
const name$7 = "@firebase/remote-config";
const name$6 = "@firebase/remote-config-compat";
const name$5 = "@firebase/storage";
const name$4 = "@firebase/storage-compat";
const name$3 = "@firebase/firestore";
const name$2 = "@firebase/vertexai";
const name$1 = "@firebase/firestore-compat";
const name = "firebase";
const version = "11.1.0";

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The default app name
 *
 * @internal
 */
const DEFAULT_ENTRY_NAME = exports._DEFAULT_ENTRY_NAME = '[DEFAULT]';
const PLATFORM_LOG_STRING = {
  [name$q]: 'fire-core',
  [name$p]: 'fire-core-compat',
  [name$n]: 'fire-analytics',
  [name$o]: 'fire-analytics-compat',
  [name$l]: 'fire-app-check',
  [name$m]: 'fire-app-check-compat',
  [name$k]: 'fire-auth',
  [name$j]: 'fire-auth-compat',
  [name$i]: 'fire-rtdb',
  [name$h]: 'fire-data-connect',
  [name$g]: 'fire-rtdb-compat',
  [name$f]: 'fire-fn',
  [name$e]: 'fire-fn-compat',
  [name$d]: 'fire-iid',
  [name$c]: 'fire-iid-compat',
  [name$b]: 'fire-fcm',
  [name$a]: 'fire-fcm-compat',
  [name$9]: 'fire-perf',
  [name$8]: 'fire-perf-compat',
  [name$7]: 'fire-rc',
  [name$6]: 'fire-rc-compat',
  [name$5]: 'fire-gcs',
  [name$4]: 'fire-gcs-compat',
  [name$3]: 'fire-fst',
  [name$1]: 'fire-fst-compat',
  [name$2]: 'fire-vertex',
  'fire-js': 'fire-js',
  // Platform identifier for JS SDK.
  [name]: 'fire-js-all'
};

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @internal
 */
const _apps = exports._apps = new Map();
/**
 * @internal
 */
const _serverApps = exports._serverApps = new Map();
/**
 * Registered components.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _components = exports._components = new Map();
/**
 * @param component - the component being added to this app's container
 *
 * @internal
 */
function _addComponent(app, component) {
  try {
    app.container.addComponent(component);
  } catch (e) {
    logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app.name}`, e);
  }
}
/**
 *
 * @internal
 */
function _addOrOverwriteComponent(app, component) {
  app.container.addOrOverwriteComponent(component);
}
/**
 *
 * @param component - the component to register
 * @returns whether or not the component is registered successfully
 *
 * @internal
 */
function _registerComponent(component) {
  const componentName = component.name;
  if (_components.has(componentName)) {
    logger.debug(`There were multiple attempts to register component ${componentName}.`);
    return false;
  }
  _components.set(componentName, component);
  // add the component to existing app instances
  for (const app of _apps.values()) {
    _addComponent(app, component);
  }
  for (const serverApp of _serverApps.values()) {
    _addComponent(serverApp, component);
  }
  return true;
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 *
 * @returns the provider for the service with the matching name
 *
 * @internal
 */
function _getProvider(app, name) {
  const heartbeatController = app.container.getProvider('heartbeat').getImmediate({
    optional: true
  });
  if (heartbeatController) {
    void heartbeatController.triggerHeartbeat();
  }
  return app.container.getProvider(name);
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 * @param instanceIdentifier - service instance identifier in case the service supports multiple instances
 *
 * @internal
 */
function _removeServiceInstance(app, name, instanceIdentifier = DEFAULT_ENTRY_NAME) {
  _getProvider(app, name).clearInstance(instanceIdentifier);
}
/**
 *
 * @param obj - an object of type FirebaseApp or FirebaseOptions.
 *
 * @returns true if the provide object is of type FirebaseApp.
 *
 * @internal
 */
function _isFirebaseApp(obj) {
  return obj.options !== undefined;
}
/**
 *
 * @param obj - an object of type FirebaseApp.
 *
 * @returns true if the provided object is of type FirebaseServerAppImpl.
 *
 * @internal
 */
function _isFirebaseServerApp(obj) {
  return obj.settings !== undefined;
}
/**
 * Test only
 *
 * @internal
 */
function _clearComponents() {
  _components.clear();
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ERRORS = {
  ["no-app" /* AppError.NO_APP */]: "No Firebase App '{$appName}' has been created - " + 'call initializeApp() first',
  ["bad-app-name" /* AppError.BAD_APP_NAME */]: "Illegal App name: '{$appName}'",
  ["duplicate-app" /* AppError.DUPLICATE_APP */]: "Firebase App named '{$appName}' already exists with different options or config",
  ["app-deleted" /* AppError.APP_DELETED */]: "Firebase App named '{$appName}' already deleted",
  ["server-app-deleted" /* AppError.SERVER_APP_DELETED */]: 'Firebase Server App has been deleted',
  ["no-options" /* AppError.NO_OPTIONS */]: 'Need to provide options, when not being deployed to hosting via source.',
  ["invalid-app-argument" /* AppError.INVALID_APP_ARGUMENT */]: 'firebase.{$appName}() takes either no argument or a ' + 'Firebase App instance.',
  ["invalid-log-argument" /* AppError.INVALID_LOG_ARGUMENT */]: 'First argument to `onLog` must be null or a function.',
  ["idb-open" /* AppError.IDB_OPEN */]: 'Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.',
  ["idb-get" /* AppError.IDB_GET */]: 'Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.',
  ["idb-set" /* AppError.IDB_WRITE */]: 'Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.',
  ["idb-delete" /* AppError.IDB_DELETE */]: 'Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.',
  ["finalization-registry-not-supported" /* AppError.FINALIZATION_REGISTRY_NOT_SUPPORTED */]: 'FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.',
  ["invalid-server-app-environment" /* AppError.INVALID_SERVER_APP_ENVIRONMENT */]: 'FirebaseServerApp is not for use in browser environments.'
};
const ERROR_FACTORY = new _util.ErrorFactory('app', 'Firebase', ERRORS);

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FirebaseAppImpl {
  constructor(options, config, container) {
    this._isDeleted = false;
    this._options = Object.assign({}, options);
    this._config = Object.assign({}, config);
    this._name = config.name;
    this._automaticDataCollectionEnabled = config.automaticDataCollectionEnabled;
    this._container = container;
    this.container.addComponent(new _component.Component('app', () => this, "PUBLIC" /* ComponentType.PUBLIC */));
  }
  get automaticDataCollectionEnabled() {
    this.checkDestroyed();
    return this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(val) {
    this.checkDestroyed();
    this._automaticDataCollectionEnabled = val;
  }
  get name() {
    this.checkDestroyed();
    return this._name;
  }
  get options() {
    this.checkDestroyed();
    return this._options;
  }
  get config() {
    this.checkDestroyed();
    return this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(val) {
    this._isDeleted = val;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */
  checkDestroyed() {
    if (this.isDeleted) {
      throw ERROR_FACTORY.create("app-deleted" /* AppError.APP_DELETED */, {
        appName: this._name
      });
    }
  }
}

/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FirebaseServerAppImpl extends FirebaseAppImpl {
  constructor(options, serverConfig, name, container) {
    // Build configuration parameters for the FirebaseAppImpl base class.
    const automaticDataCollectionEnabled = serverConfig.automaticDataCollectionEnabled !== undefined ? serverConfig.automaticDataCollectionEnabled : false;
    // Create the FirebaseAppSettings object for the FirebaseAppImp constructor.
    const config = {
      name,
      automaticDataCollectionEnabled
    };
    if (options.apiKey !== undefined) {
      // Construct the parent FirebaseAppImp object.
      super(options, config, container);
    } else {
      const appImpl = options;
      super(appImpl.options, config, container);
    }
    // Now construct the data for the FirebaseServerAppImpl.
    this._serverConfig = Object.assign({
      automaticDataCollectionEnabled
    }, serverConfig);
    this._finalizationRegistry = null;
    if (typeof FinalizationRegistry !== 'undefined') {
      this._finalizationRegistry = new FinalizationRegistry(() => {
        this.automaticCleanup();
      });
    }
    this._refCount = 0;
    this.incRefCount(this._serverConfig.releaseOnDeref);
    // Do not retain a hard reference to the dref object, otherwise the FinalizationRegistry
    // will never trigger.
    this._serverConfig.releaseOnDeref = undefined;
    serverConfig.releaseOnDeref = undefined;
    registerVersion(name$q, version$1, 'serverapp');
  }
  toJSON() {
    return undefined;
  }
  get refCount() {
    return this._refCount;
  }
  // Increment the reference count of this server app. If an object is provided, register it
  // with the finalization registry.
  incRefCount(obj) {
    if (this.isDeleted) {
      return;
    }
    this._refCount++;
    if (obj !== undefined && this._finalizationRegistry !== null) {
      this._finalizationRegistry.register(obj, this);
    }
  }
  // Decrement the reference count.
  decRefCount() {
    if (this.isDeleted) {
      return 0;
    }
    return --this._refCount;
  }
  // Invoked by the FinalizationRegistry callback to note that this app should go through its
  // reference counts and delete itself if no reference count remain. The coordinating logic that
  // handles this is in deleteApp(...).
  automaticCleanup() {
    void deleteApp(this);
  }
  get settings() {
    this.checkDestroyed();
    return this._serverConfig;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */
  checkDestroyed() {
    if (this.isDeleted) {
      throw ERROR_FACTORY.create("server-app-deleted" /* AppError.SERVER_APP_DELETED */);
    }
  }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The current SDK version.
 *
 * @public
 */
const SDK_VERSION = exports.SDK_VERSION = version;
function initializeApp(_options, rawConfig = {}) {
  let options = _options;
  if (typeof rawConfig !== 'object') {
    const name = rawConfig;
    rawConfig = {
      name
    };
  }
  const config = Object.assign({
    name: DEFAULT_ENTRY_NAME,
    automaticDataCollectionEnabled: false
  }, rawConfig);
  const name = config.name;
  if (typeof name !== 'string' || !name) {
    throw ERROR_FACTORY.create("bad-app-name" /* AppError.BAD_APP_NAME */, {
      appName: String(name)
    });
  }
  options || (options = (0, _util.getDefaultAppConfig)());
  if (!options) {
    throw ERROR_FACTORY.create("no-options" /* AppError.NO_OPTIONS */);
  }
  const existingApp = _apps.get(name);
  if (existingApp) {
    // return the existing app if options and config deep equal the ones in the existing app.
    if ((0, _util.deepEqual)(options, existingApp.options) && (0, _util.deepEqual)(config, existingApp.config)) {
      return existingApp;
    } else {
      throw ERROR_FACTORY.create("duplicate-app" /* AppError.DUPLICATE_APP */, {
        appName: name
      });
    }
  }
  const container = new _component.ComponentContainer(name);
  for (const component of _components.values()) {
    container.addComponent(component);
  }
  const newApp = new FirebaseAppImpl(options, config, container);
  _apps.set(name, newApp);
  return newApp;
}
function initializeServerApp(_options, _serverAppConfig) {
  if ((0, _util.isBrowser)() && !(0, _util.isWebWorker)()) {
    // FirebaseServerApp isn't designed to be run in browsers.
    throw ERROR_FACTORY.create("invalid-server-app-environment" /* AppError.INVALID_SERVER_APP_ENVIRONMENT */);
  }
  if (_serverAppConfig.automaticDataCollectionEnabled === undefined) {
    _serverAppConfig.automaticDataCollectionEnabled = false;
  }
  let appOptions;
  if (_isFirebaseApp(_options)) {
    appOptions = _options.options;
  } else {
    appOptions = _options;
  }
  // Build an app name based on a hash of the configuration options.
  const nameObj = Object.assign(Object.assign({}, _serverAppConfig), appOptions);
  // However, Do not mangle the name based on releaseOnDeref, since it will vary between the
  // construction of FirebaseServerApp instances. For example, if the object is the request headers.
  if (nameObj.releaseOnDeref !== undefined) {
    delete nameObj.releaseOnDeref;
  }
  const hashCode = s => {
    return [...s].reduce((hash, c) => Math.imul(31, hash) + c.charCodeAt(0) | 0, 0);
  };
  if (_serverAppConfig.releaseOnDeref !== undefined) {
    if (typeof FinalizationRegistry === 'undefined') {
      throw ERROR_FACTORY.create("finalization-registry-not-supported" /* AppError.FINALIZATION_REGISTRY_NOT_SUPPORTED */, {});
    }
  }
  const nameString = '' + hashCode(JSON.stringify(nameObj));
  const existingApp = _serverApps.get(nameString);
  if (existingApp) {
    existingApp.incRefCount(_serverAppConfig.releaseOnDeref);
    return existingApp;
  }
  const container = new _component.ComponentContainer(nameString);
  for (const component of _components.values()) {
    container.addComponent(component);
  }
  const newApp = new FirebaseServerAppImpl(appOptions, _serverAppConfig, nameString, container);
  _serverApps.set(nameString, newApp);
  return newApp;
}
/**
 * Retrieves a {@link @firebase/app#FirebaseApp} instance.
 *
 * When called with no arguments, the default app is returned. When an app name
 * is provided, the app corresponding to that name is returned.
 *
 * An exception is thrown if the app being retrieved has not yet been
 * initialized.
 *
 * @example
 * ```javascript
 * // Return the default app
 * const app = getApp();
 * ```
 *
 * @example
 * ```javascript
 * // Return a named app
 * const otherApp = getApp("otherApp");
 * ```
 *
 * @param name - Optional name of the app to return. If no name is
 *   provided, the default is `"[DEFAULT]"`.
 *
 * @returns The app corresponding to the provided app name.
 *   If no app name is provided, the default app is returned.
 *
 * @public
 */
function getApp(name = DEFAULT_ENTRY_NAME) {
  const app = _apps.get(name);
  if (!app && name === DEFAULT_ENTRY_NAME && (0, _util.getDefaultAppConfig)()) {
    return initializeApp();
  }
  if (!app) {
    throw ERROR_FACTORY.create("no-app" /* AppError.NO_APP */, {
      appName: name
    });
  }
  return app;
}
/**
 * A (read-only) array of all initialized apps.
 * @public
 */
function getApps() {
  return Array.from(_apps.values());
}
/**
 * Renders this app unusable and frees the resources of all associated
 * services.
 *
 * @example
 * ```javascript
 * deleteApp(app)
 *   .then(function() {
 *     console.log("App deleted successfully");
 *   })
 *   .catch(function(error) {
 *     console.log("Error deleting app:", error);
 *   });
 * ```
 *
 * @public
 */
async function deleteApp(app) {
  let cleanupProviders = false;
  const name = app.name;
  if (_apps.has(name)) {
    cleanupProviders = true;
    _apps.delete(name);
  } else if (_serverApps.has(name)) {
    const firebaseServerApp = app;
    if (firebaseServerApp.decRefCount() <= 0) {
      _serverApps.delete(name);
      cleanupProviders = true;
    }
  }
  if (cleanupProviders) {
    await Promise.all(app.container.getProviders().map(provider => provider.delete()));
    app.isDeleted = true;
  }
}
/**
 * Registers a library's name and version for platform logging purposes.
 * @param library - Name of 1p or 3p library (e.g. firestore, angularfire)
 * @param version - Current version of that library.
 * @param variant - Bundle variant, e.g., node, rn, etc.
 *
 * @public
 */
function registerVersion(libraryKeyOrName, version, variant) {
  var _a;
  // TODO: We can use this check to whitelist strings when/if we set up
  // a good whitelist system.
  let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
  if (variant) {
    library += `-${variant}`;
  }
  const libraryMismatch = library.match(/\s|\//);
  const versionMismatch = version.match(/\s|\//);
  if (libraryMismatch || versionMismatch) {
    const warning = [`Unable to register library "${library}" with version "${version}":`];
    if (libraryMismatch) {
      warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
    }
    if (libraryMismatch && versionMismatch) {
      warning.push('and');
    }
    if (versionMismatch) {
      warning.push(`version name "${version}" contains illegal characters (whitespace or "/")`);
    }
    logger.warn(warning.join(' '));
    return;
  }
  _registerComponent(new _component.Component(`${library}-version`, () => ({
    library,
    version
  }), "VERSION" /* ComponentType.VERSION */));
}
/**
 * Sets log handler for all Firebase SDKs.
 * @param logCallback - An optional custom log handler that executes user code whenever
 * the Firebase SDK makes a logging call.
 *
 * @public
 */
function onLog(logCallback, options) {
  if (logCallback !== null && typeof logCallback !== 'function') {
    throw ERROR_FACTORY.create("invalid-log-argument" /* AppError.INVALID_LOG_ARGUMENT */);
  }
  (0, _logger.setUserLogHandler)(logCallback, options);
}
/**
 * Sets log level for all Firebase SDKs.
 *
 * All of the log types above the current log level are captured (i.e. if
 * you set the log level to `info`, errors are logged, but `debug` and
 * `verbose` logs are not).
 *
 * @public
 */
function setLogLevel(logLevel) {
  (0, _logger.setLogLevel)(logLevel);
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DB_NAME = 'firebase-heartbeat-database';
const DB_VERSION = 1;
const STORE_NAME = 'firebase-heartbeat-store';
let dbPromise = null;
function getDbPromise() {
  if (!dbPromise) {
    dbPromise = (0, _idb.openDB)(DB_NAME, DB_VERSION, {
      upgrade: (db, oldVersion) => {
        // We don't use 'break' in this switch statement, the fall-through
        // behavior is what we want, because if there are multiple versions between
        // the old version and the current version, we want ALL the migrations
        // that correspond to those versions to run, not only the last one.
        // eslint-disable-next-line default-case
        switch (oldVersion) {
          case 0:
            try {
              db.createObjectStore(STORE_NAME);
            } catch (e) {
              // Safari/iOS browsers throw occasional exceptions on
              // db.createObjectStore() that may be a bug. Avoid blocking
              // the rest of the app functionality.
              console.warn(e);
            }
        }
      }
    }).catch(e => {
      throw ERROR_FACTORY.create("idb-open" /* AppError.IDB_OPEN */, {
        originalErrorMessage: e.message
      });
    });
  }
  return dbPromise;
}
async function readHeartbeatsFromIndexedDB(app) {
  try {
    const db = await getDbPromise();
    const tx = db.transaction(STORE_NAME);
    const result = await tx.objectStore(STORE_NAME).get(computeKey(app));
    // We already have the value but tx.done can throw,
    // so we need to await it here to catch errors
    await tx.done;
    return result;
  } catch (e) {
    if (e instanceof _util.FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-get" /* AppError.IDB_GET */, {
        originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
async function writeHeartbeatsToIndexedDB(app, heartbeatObject) {
  try {
    const db = await getDbPromise();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const objectStore = tx.objectStore(STORE_NAME);
    await objectStore.put(heartbeatObject, computeKey(app));
    await tx.done;
  } catch (e) {
    if (e instanceof _util.FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-set" /* AppError.IDB_WRITE */, {
        originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
function computeKey(app) {
  return `${app.name}!${app.options.appId}`;
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const MAX_HEADER_BYTES = 1024;
// 30 days
const STORED_HEARTBEAT_RETENTION_MAX_MILLIS = 30 * 24 * 60 * 60 * 1000;
class HeartbeatServiceImpl {
  constructor(container) {
    this.container = container;
    /**
     * In-memory cache for heartbeats, used by getHeartbeatsHeader() to generate
     * the header string.
     * Stores one record per date. This will be consolidated into the standard
     * format of one record per user agent string before being sent as a header.
     * Populated from indexedDB when the controller is instantiated and should
     * be kept in sync with indexedDB.
     * Leave public for easier testing.
     */
    this._heartbeatsCache = null;
    const app = this.container.getProvider('app').getImmediate();
    this._storage = new HeartbeatStorageImpl(app);
    this._heartbeatsCachePromise = this._storage.read().then(result => {
      this._heartbeatsCache = result;
      return result;
    });
  }
  /**
   * Called to report a heartbeat. The function will generate
   * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
   * to IndexedDB.
   * Note that we only store one heartbeat per day. So if a heartbeat for today is
   * already logged, subsequent calls to this function in the same day will be ignored.
   */
  async triggerHeartbeat() {
    var _a, _b;
    try {
      const platformLogger = this.container.getProvider('platform-logger').getImmediate();
      // This is the "Firebase user agent" string from the platform logger
      // service, not the browser user agent.
      const agent = platformLogger.getPlatformInfoString();
      const date = getUTCDateString();
      if (((_a = this._heartbeatsCache) === null || _a === void 0 ? void 0 : _a.heartbeats) == null) {
        this._heartbeatsCache = await this._heartbeatsCachePromise;
        // If we failed to construct a heartbeats cache, then return immediately.
        if (((_b = this._heartbeatsCache) === null || _b === void 0 ? void 0 : _b.heartbeats) == null) {
          return;
        }
      }
      // Do not store a heartbeat if one is already stored for this day
      // or if a header has already been sent today.
      if (this._heartbeatsCache.lastSentHeartbeatDate === date || this._heartbeatsCache.heartbeats.some(singleDateHeartbeat => singleDateHeartbeat.date === date)) {
        return;
      } else {
        // There is no entry for this date. Create one.
        this._heartbeatsCache.heartbeats.push({
          date,
          agent
        });
      }
      // Remove entries older than 30 days.
      this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter(singleDateHeartbeat => {
        const hbTimestamp = new Date(singleDateHeartbeat.date).valueOf();
        const now = Date.now();
        return now - hbTimestamp <= STORED_HEARTBEAT_RETENTION_MAX_MILLIS;
      });
      return this._storage.overwrite(this._heartbeatsCache);
    } catch (e) {
      logger.warn(e);
    }
  }
  /**
   * Returns a base64 encoded string which can be attached to the heartbeat-specific header directly.
   * It also clears all heartbeats from memory as well as in IndexedDB.
   *
   * NOTE: Consuming product SDKs should not send the header if this method
   * returns an empty string.
   */
  async getHeartbeatsHeader() {
    var _a;
    try {
      if (this._heartbeatsCache === null) {
        await this._heartbeatsCachePromise;
      }
      // If it's still null or the array is empty, there is no data to send.
      if (((_a = this._heartbeatsCache) === null || _a === void 0 ? void 0 : _a.heartbeats) == null || this._heartbeatsCache.heartbeats.length === 0) {
        return '';
      }
      const date = getUTCDateString();
      // Extract as many heartbeats from the cache as will fit under the size limit.
      const {
        heartbeatsToSend,
        unsentEntries
      } = extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats);
      const headerString = (0, _util.base64urlEncodeWithoutPadding)(JSON.stringify({
        version: 2,
        heartbeats: heartbeatsToSend
      }));
      // Store last sent date to prevent another being logged/sent for the same day.
      this._heartbeatsCache.lastSentHeartbeatDate = date;
      if (unsentEntries.length > 0) {
        // Store any unsent entries if they exist.
        this._heartbeatsCache.heartbeats = unsentEntries;
        // This seems more likely than emptying the array (below) to lead to some odd state
        // since the cache isn't empty and this will be called again on the next request,
        // and is probably safest if we await it.
        await this._storage.overwrite(this._heartbeatsCache);
      } else {
        this._heartbeatsCache.heartbeats = [];
        // Do not wait for this, to reduce latency.
        void this._storage.overwrite(this._heartbeatsCache);
      }
      return headerString;
    } catch (e) {
      logger.warn(e);
      return '';
    }
  }
}
function getUTCDateString() {
  const today = new Date();
  // Returns date format 'YYYY-MM-DD'
  return today.toISOString().substring(0, 10);
}
function extractHeartbeatsForHeader(heartbeatsCache, maxSize = MAX_HEADER_BYTES) {
  // Heartbeats grouped by user agent in the standard format to be sent in
  // the header.
  const heartbeatsToSend = [];
  // Single date format heartbeats that are not sent.
  let unsentEntries = heartbeatsCache.slice();
  for (const singleDateHeartbeat of heartbeatsCache) {
    // Look for an existing entry with the same user agent.
    const heartbeatEntry = heartbeatsToSend.find(hb => hb.agent === singleDateHeartbeat.agent);
    if (!heartbeatEntry) {
      // If no entry for this user agent exists, create one.
      heartbeatsToSend.push({
        agent: singleDateHeartbeat.agent,
        dates: [singleDateHeartbeat.date]
      });
      if (countBytes(heartbeatsToSend) > maxSize) {
        // If the header would exceed max size, remove the added heartbeat
        // entry and stop adding to the header.
        heartbeatsToSend.pop();
        break;
      }
    } else {
      heartbeatEntry.dates.push(singleDateHeartbeat.date);
      // If the header would exceed max size, remove the added date
      // and stop adding to the header.
      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatEntry.dates.pop();
        break;
      }
    }
    // Pop unsent entry from queue. (Skipped if adding the entry exceeded
    // quota and the loop breaks early.)
    unsentEntries = unsentEntries.slice(1);
  }
  return {
    heartbeatsToSend,
    unsentEntries
  };
}
class HeartbeatStorageImpl {
  constructor(app) {
    this.app = app;
    this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    if (!(0, _util.isIndexedDBAvailable)()) {
      return false;
    } else {
      return (0, _util.validateIndexedDBOpenable)().then(() => true).catch(() => false);
    }
  }
  /**
   * Read all heartbeats.
   */
  async read() {
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return {
        heartbeats: []
      };
    } else {
      const idbHeartbeatObject = await readHeartbeatsFromIndexedDB(this.app);
      if (idbHeartbeatObject === null || idbHeartbeatObject === void 0 ? void 0 : idbHeartbeatObject.heartbeats) {
        return idbHeartbeatObject;
      } else {
        return {
          heartbeats: []
        };
      }
    }
  }
  // overwrite the storage with the provided heartbeats
  async overwrite(heartbeatsObject) {
    var _a;
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: heartbeatsObject.heartbeats
      });
    }
  }
  // add heartbeats
  async add(heartbeatsObject) {
    var _a;
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: [...existingHeartbeatsObject.heartbeats, ...heartbeatsObject.heartbeats]
      });
    }
  }
}
/**
 * Calculate bytes of a HeartbeatsByUserAgent array after being wrapped
 * in a platform logging header JSON object, stringified, and converted
 * to base 64.
 */
function countBytes(heartbeatsCache) {
  // base64 has a restricted set of characters, all of which should be 1 byte.
  return (0, _util.base64urlEncodeWithoutPadding)(
  // heartbeatsCache wrapper properties
  JSON.stringify({
    version: 2,
    heartbeats: heartbeatsCache
  })).length;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerCoreComponents(variant) {
  _registerComponent(new _component.Component('platform-logger', container => new PlatformLoggerServiceImpl(container), "PRIVATE" /* ComponentType.PRIVATE */));
  _registerComponent(new _component.Component('heartbeat', container => new HeartbeatServiceImpl(container), "PRIVATE" /* ComponentType.PRIVATE */));
  // Register `app` package.
  registerVersion(name$q, version$1, variant);
  // BUILD_TARGET will be replaced by values like esm2017, cjs2017, etc during the compilation
  registerVersion(name$q, version$1, 'esm2017');
  // Register platform SDK identifier (no version).
  registerVersion('fire-js', '');
}

/**
 * Firebase App
 *
 * @remarks This package coordinates the communication between the different Firebase components
 * @packageDocumentation
 */
registerCoreComponents('');
},{"@firebase/component":"../node_modules/@firebase/component/dist/esm/index.esm2017.js","@firebase/logger":"../node_modules/@firebase/logger/dist/esm/index.esm2017.js","@firebase/util":"../node_modules/@firebase/util/dist/index.esm2017.js","idb":"../node_modules/idb/build/index.js"}],"../node_modules/firebase/app/dist/esm/index.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _app = require("@firebase/app");
Object.keys(_app).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _app[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _app[key];
    }
  });
});
var name = "firebase";
var version = "11.1.0";

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(0, _app.registerVersion)(name, version, 'app');
},{"@firebase/app":"../node_modules/@firebase/app/dist/esm/index.esm2017.js"}],"../node_modules/@firebase/database/dist/index.esm2017.js":[function(require,module,exports) {
var define;
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._TEST_ACCESS_hijackHash = exports._TEST_ACCESS_forceRestClient = exports._ReferenceImpl = exports._QueryParams = exports._QueryImpl = exports.TransactionResult = exports.QueryConstraint = exports.OnDisconnect = exports.Database = exports.DataSnapshot = void 0;
exports._initStandalone = _initStandalone;
exports._repoManagerDatabaseFromApp = repoManagerDatabaseFromApp;
exports._setSDKVersion = setSDKVersion;
exports._validateWritablePath = exports._validatePathString = void 0;
exports.child = _child9;
exports.connectDatabaseEmulator = connectDatabaseEmulator;
exports.enableLogging = enableLogging;
exports.endAt = endAt;
exports.endBefore = endBefore;
exports.equalTo = equalTo;
exports.forceLongPolling = forceLongPolling;
exports.forceWebSockets = forceWebSockets;
exports.get = get;
exports.getDatabase = getDatabase;
exports.goOffline = goOffline;
exports.goOnline = goOnline;
exports.increment = increment;
exports.limitToFirst = limitToFirst;
exports.limitToLast = limitToLast;
exports.off = off;
exports.onChildAdded = onChildAdded;
exports.onChildChanged = onChildChanged;
exports.onChildMoved = onChildMoved;
exports.onChildRemoved = onChildRemoved;
exports.onDisconnect = onDisconnect;
exports.onValue = onValue;
exports.orderByChild = orderByChild;
exports.orderByKey = orderByKey;
exports.orderByPriority = orderByPriority;
exports.orderByValue = orderByValue;
exports.push = push;
exports.query = query;
exports.ref = ref;
exports.refFromURL = refFromURL;
exports.remove = remove;
exports.runTransaction = runTransaction;
exports.serverTimestamp = serverTimestamp;
exports.set = set;
exports.setPriority = setPriority;
exports.setWithPriority = setWithPriority;
exports.startAfter = startAfter;
exports.startAt = startAt;
exports.update = update;
var _app = require("@firebase/app");
var _component = require("@firebase/component");
var _util = require("@firebase/util");
var _logger = require("@firebase/logger");
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var name = "@firebase/database";
var version = "1.0.10";

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** The semver (www.semver.org) version of the SDK. */
var SDK_VERSION = '';
/**
 * SDK_VERSION should be set before any database instance is created
 * @internal
 */
function setSDKVersion(version) {
  SDK_VERSION = version;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Wraps a DOM Storage object and:
 * - automatically encode objects as JSON strings before storing them to allow us to store arbitrary types.
 * - prefixes names with "firebase:" to avoid collisions with app data.
 *
 * We automatically (see storage.js) create two such wrappers, one for sessionStorage,
 * and one for localStorage.
 *
 */
var DOMStorageWrapper = /*#__PURE__*/function () {
  /**
   * @param domStorage_ - The underlying storage object (e.g. localStorage or sessionStorage)
   */
  function DOMStorageWrapper(domStorage_) {
    _classCallCheck(this, DOMStorageWrapper);
    this.domStorage_ = domStorage_;
    // Use a prefix to avoid collisions with other stuff saved by the app.
    this.prefix_ = 'firebase:';
  }
  /**
   * @param key - The key to save the value under
   * @param value - The value being stored, or null to remove the key.
   */
  return _createClass(DOMStorageWrapper, [{
    key: "set",
    value: function set(key, value) {
      if (value == null) {
        this.domStorage_.removeItem(this.prefixedName_(key));
      } else {
        this.domStorage_.setItem(this.prefixedName_(key), (0, _util.stringify)(value));
      }
    }
    /**
     * @returns The value that was stored under this key, or null
     */
  }, {
    key: "get",
    value: function get(key) {
      var storedVal = this.domStorage_.getItem(this.prefixedName_(key));
      if (storedVal == null) {
        return null;
      } else {
        return (0, _util.jsonEval)(storedVal);
      }
    }
  }, {
    key: "remove",
    value: function remove(key) {
      this.domStorage_.removeItem(this.prefixedName_(key));
    }
  }, {
    key: "prefixedName_",
    value: function prefixedName_(name) {
      return this.prefix_ + name;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.domStorage_.toString();
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An in-memory storage implementation that matches the API of DOMStorageWrapper
 * (TODO: create interface for both to implement).
 */
var MemoryStorage = /*#__PURE__*/function () {
  function MemoryStorage() {
    _classCallCheck(this, MemoryStorage);
    this.cache_ = {};
    this.isInMemoryStorage = true;
  }
  return _createClass(MemoryStorage, [{
    key: "set",
    value: function set(key, value) {
      if (value == null) {
        delete this.cache_[key];
      } else {
        this.cache_[key] = value;
      }
    }
  }, {
    key: "get",
    value: function get(key) {
      if ((0, _util.contains)(this.cache_, key)) {
        return this.cache_[key];
      }
      return null;
    }
  }, {
    key: "remove",
    value: function remove(key) {
      delete this.cache_[key];
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Helper to create a DOMStorageWrapper or else fall back to MemoryStorage.
 * TODO: Once MemoryStorage and DOMStorageWrapper have a shared interface this method annotation should change
 * to reflect this type
 *
 * @param domStorageName - Name of the underlying storage object
 *   (e.g. 'localStorage' or 'sessionStorage').
 * @returns Turning off type information until a common interface is defined.
 */
var createStoragefor = function createStoragefor(domStorageName) {
  try {
    // NOTE: just accessing "localStorage" or "window['localStorage']" may throw a security exception,
    // so it must be inside the try/catch.
    if (typeof window !== 'undefined' && typeof window[domStorageName] !== 'undefined') {
      // Need to test cache. Just because it's here doesn't mean it works
      var domStorage = window[domStorageName];
      domStorage.setItem('firebase:sentinel', 'cache');
      domStorage.removeItem('firebase:sentinel');
      return new DOMStorageWrapper(domStorage);
    }
  } catch (e) {}
  // Failed to create wrapper.  Just return in-memory storage.
  // TODO: log?
  return new MemoryStorage();
};
/** A storage object that lasts across sessions */
var PersistentStorage = createStoragefor('localStorage');
/** A storage object that only lasts one session */
var SessionStorage = createStoragefor('sessionStorage');

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var logClient = new _logger.Logger('@firebase/database');
/**
 * Returns a locally-unique ID (generated by just incrementing up from 0 each time its called).
 */
var LUIDGenerator = function () {
  var id = 1;
  return function () {
    return id++;
  };
}();
/**
 * Sha1 hash of the input string
 * @param str - The string to hash
 * @returns {!string} The resulting hash
 */
var sha1 = function sha1(str) {
  var utf8Bytes = (0, _util.stringToByteArray)(str);
  var sha1 = new _util.Sha1();
  sha1.update(utf8Bytes);
  var sha1Bytes = sha1.digest();
  return _util.base64.encodeByteArray(sha1Bytes);
};
var _buildLogMessage_ = function buildLogMessage_() {
  var message = '';
  for (var i = 0; i < arguments.length; i++) {
    var arg = i < 0 || arguments.length <= i ? undefined : arguments[i];
    if (Array.isArray(arg) || arg && _typeof(arg) === 'object' &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof arg.length === 'number') {
      message += _buildLogMessage_.apply(null, arg);
    } else if (_typeof(arg) === 'object') {
      message += (0, _util.stringify)(arg);
    } else {
      message += arg;
    }
    message += ' ';
  }
  return message;
};
/**
 * Use this for all debug messages in Firebase.
 */
var logger = null;
/**
 * Flag to check for log availability on first log message
 */
var firstLog_ = true;
/**
 * The implementation of Firebase.enableLogging (defined here to break dependencies)
 * @param logger_ - A flag to turn on logging, or a custom logger
 * @param persistent - Whether or not to persist logging settings across refreshes
 */
var enableLogging$1 = function enableLogging$1(logger_, persistent) {
  (0, _util.assert)(!persistent || logger_ === true || logger_ === false, "Can't turn on custom loggers persistently.");
  if (logger_ === true) {
    logClient.logLevel = _logger.LogLevel.VERBOSE;
    logger = logClient.log.bind(logClient);
    if (persistent) {
      SessionStorage.set('logging_enabled', true);
    }
  } else if (typeof logger_ === 'function') {
    logger = logger_;
  } else {
    logger = null;
    SessionStorage.remove('logging_enabled');
  }
};
var log = function log() {
  if (firstLog_ === true) {
    firstLog_ = false;
    if (logger === null && SessionStorage.get('logging_enabled') === true) {
      enableLogging$1(true);
    }
  }
  if (logger) {
    for (var _len = arguments.length, varArgs = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      varArgs[_key2] = arguments[_key2];
    }
    var message = _buildLogMessage_.apply(null, varArgs);
    logger(message);
  }
};
var logWrapper = function logWrapper(prefix) {
  return function () {
    for (var _len2 = arguments.length, varArgs = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
      varArgs[_key3] = arguments[_key3];
    }
    log.apply(void 0, [prefix].concat(varArgs));
  };
};
var error = function error() {
  var message = 'FIREBASE INTERNAL ERROR: ' + _buildLogMessage_.apply(void 0, arguments);
  logClient.error(message);
};
var fatal = function fatal() {
  var message = "FIREBASE FATAL ERROR: ".concat(_buildLogMessage_.apply(void 0, arguments));
  logClient.error(message);
  throw new Error(message);
};
var warn = function warn() {
  var message = 'FIREBASE WARNING: ' + _buildLogMessage_.apply(void 0, arguments);
  logClient.warn(message);
};
/**
 * Logs a warning if the containing page uses https. Called when a call to new Firebase
 * does not use https.
 */
var warnIfPageIsSecure = function warnIfPageIsSecure() {
  // Be very careful accessing browser globals. Who knows what may or may not exist.
  if (typeof window !== 'undefined' && window.location && window.location.protocol && window.location.protocol.indexOf('https:') !== -1) {
    warn('Insecure Firebase access from a secure page. ' + 'Please use https in calls to new Firebase().');
  }
};
/**
 * Returns true if data is NaN, or +/- Infinity.
 */
var isInvalidJSONNumber = function isInvalidJSONNumber(data) {
  return typeof data === 'number' && (data !== data ||
  // NaN
  data === Number.POSITIVE_INFINITY || data === Number.NEGATIVE_INFINITY);
};
var executeWhenDOMReady = function executeWhenDOMReady(fn) {
  if ((0, _util.isNodeSdk)() || document.readyState === 'complete') {
    fn();
  } else {
    // Modeled after jQuery. Try DOMContentLoaded and onreadystatechange (which
    // fire before onload), but fall back to onload.
    var called = false;
    var _wrappedFn = function wrappedFn() {
      if (!document.body) {
        setTimeout(_wrappedFn, Math.floor(10));
        return;
      }
      if (!called) {
        called = true;
        fn();
      }
    };
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', _wrappedFn, false);
      // fallback to onload.
      window.addEventListener('load', _wrappedFn, false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } else if (document.attachEvent) {
      // IE.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState === 'complete') {
          _wrappedFn();
        }
      });
      // fallback to onload.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.attachEvent('onload', _wrappedFn);
      // jQuery has an extra hack for IE that we could employ (based on
      // http://javascript.nwbox.com/IEContentLoaded/) But it looks really old.
      // I'm hoping we don't need it.
    }
  }
};
/**
 * Minimum key name. Invalid for actual data, used as a marker to sort before any valid names
 */
var MIN_NAME = '[MIN_NAME]';
/**
 * Maximum key name. Invalid for actual data, used as a marker to sort above any valid names
 */
var MAX_NAME = '[MAX_NAME]';
/**
 * Compares valid Firebase key names, plus min and max name
 */
var nameCompare = function nameCompare(a, b) {
  if (a === b) {
    return 0;
  } else if (a === MIN_NAME || b === MAX_NAME) {
    return -1;
  } else if (b === MIN_NAME || a === MAX_NAME) {
    return 1;
  } else {
    var aAsInt = tryParseInt(a),
      bAsInt = tryParseInt(b);
    if (aAsInt !== null) {
      if (bAsInt !== null) {
        return aAsInt - bAsInt === 0 ? a.length - b.length : aAsInt - bAsInt;
      } else {
        return -1;
      }
    } else if (bAsInt !== null) {
      return 1;
    } else {
      return a < b ? -1 : 1;
    }
  }
};
/**
 * @returns {!number} comparison result.
 */
var stringCompare = function stringCompare(a, b) {
  if (a === b) {
    return 0;
  } else if (a < b) {
    return -1;
  } else {
    return 1;
  }
};
var requireKey = function requireKey(key, obj) {
  if (obj && key in obj) {
    return obj[key];
  } else {
    throw new Error('Missing required key (' + key + ') in object: ' + (0, _util.stringify)(obj));
  }
};
var _ObjectToUniqueKey = function ObjectToUniqueKey(obj) {
  if (_typeof(obj) !== 'object' || obj === null) {
    return (0, _util.stringify)(obj);
  }
  var keys = [];
  // eslint-disable-next-line guard-for-in
  for (var k in obj) {
    keys.push(k);
  }
  // Export as json, but with the keys sorted.
  keys.sort();
  var key = '{';
  for (var i = 0; i < keys.length; i++) {
    if (i !== 0) {
      key += ',';
    }
    key += (0, _util.stringify)(keys[i]);
    key += ':';
    key += _ObjectToUniqueKey(obj[keys[i]]);
  }
  key += '}';
  return key;
};
/**
 * Splits a string into a number of smaller segments of maximum size
 * @param str - The string
 * @param segsize - The maximum number of chars in the string.
 * @returns The string, split into appropriately-sized chunks
 */
var splitStringBySize = function splitStringBySize(str, segsize) {
  var len = str.length;
  if (len <= segsize) {
    return [str];
  }
  var dataSegs = [];
  for (var c = 0; c < len; c += segsize) {
    if (c + segsize > len) {
      dataSegs.push(str.substring(c, len));
    } else {
      dataSegs.push(str.substring(c, c + segsize));
    }
  }
  return dataSegs;
};
/**
 * Apply a function to each (key, value) pair in an object or
 * apply a function to each (index, value) pair in an array
 * @param obj - The object or array to iterate over
 * @param fn - The function to apply
 */
function each(obj, fn) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn(key, obj[key]);
    }
  }
}
/**
 * Borrowed from http://hg.secondlife.com/llsd/src/tip/js/typedarray.js (MIT License)
 * I made one modification at the end and removed the NaN / Infinity
 * handling (since it seemed broken [caused an overflow] and we don't need it).  See MJL comments.
 * @param v - A double
 *
 */
var doubleToIEEE754String = function doubleToIEEE754String(v) {
  (0, _util.assert)(!isInvalidJSONNumber(v), 'Invalid JSON number'); // MJL
  var ebits = 11,
    fbits = 52;
  var bias = (1 << ebits - 1) - 1;
  var s, e, f, ln, i;
  // Compute sign, exponent, fraction
  // Skip NaN / Infinity handling --MJL.
  if (v === 0) {
    e = 0;
    f = 0;
    s = 1 / v === -Infinity ? 1 : 0;
  } else {
    s = v < 0;
    v = Math.abs(v);
    if (v >= Math.pow(2, 1 - bias)) {
      // Normalized
      ln = Math.min(Math.floor(Math.log(v) / Math.LN2), bias);
      e = ln + bias;
      f = Math.round(v * Math.pow(2, fbits - ln) - Math.pow(2, fbits));
    } else {
      // Denormalized
      e = 0;
      f = Math.round(v / Math.pow(2, 1 - bias - fbits));
    }
  }
  // Pack sign, exponent, fraction
  var bits = [];
  for (i = fbits; i; i -= 1) {
    bits.push(f % 2 ? 1 : 0);
    f = Math.floor(f / 2);
  }
  for (i = ebits; i; i -= 1) {
    bits.push(e % 2 ? 1 : 0);
    e = Math.floor(e / 2);
  }
  bits.push(s ? 1 : 0);
  bits.reverse();
  var str = bits.join('');
  // Return the data as a hex string. --MJL
  var hexByteString = '';
  for (i = 0; i < 64; i += 8) {
    var hexByte = parseInt(str.substr(i, 8), 2).toString(16);
    if (hexByte.length === 1) {
      hexByte = '0' + hexByte;
    }
    hexByteString = hexByteString + hexByte;
  }
  return hexByteString.toLowerCase();
};
/**
 * Used to detect if we're in a Chrome content script (which executes in an
 * isolated environment where long-polling doesn't work).
 */
var isChromeExtensionContentScript = function isChromeExtensionContentScript() {
  return !!((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window['chrome'] && window['chrome']['extension'] && !/^chrome/.test(window.location.href));
};
/**
 * Used to detect if we're in a Windows 8 Store app.
 */
var isWindowsStoreApp = function isWindowsStoreApp() {
  // Check for the presence of a couple WinRT globals
  return (typeof Windows === "undefined" ? "undefined" : _typeof(Windows)) === 'object' && _typeof(Windows.UI) === 'object';
};
/**
 * Converts a server error code to a JavaScript Error
 */
function errorForServerCode(code, query) {
  var reason = 'Unknown Error';
  if (code === 'too_big') {
    reason = 'The data requested exceeds the maximum size ' + 'that can be accessed with a single request.';
  } else if (code === 'permission_denied') {
    reason = "Client doesn't have permission to access the desired data.";
  } else if (code === 'unavailable') {
    reason = 'The service is unavailable';
  }
  var error = new Error(code + ' at ' + query._path.toString() + ': ' + reason);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error.code = code.toUpperCase();
  return error;
}
/**
 * Used to test for integer-looking strings
 */
var INTEGER_REGEXP_ = new RegExp('^-?(0*)\\d{1,10}$');
/**
 * For use in keys, the minimum possible 32-bit integer.
 */
var INTEGER_32_MIN = -2147483648;
/**
 * For use in keys, the maximum possible 32-bit integer.
 */
var INTEGER_32_MAX = 2147483647;
/**
 * If the string contains a 32-bit integer, return it.  Else return null.
 */
var tryParseInt = function tryParseInt(str) {
  if (INTEGER_REGEXP_.test(str)) {
    var intVal = Number(str);
    if (intVal >= INTEGER_32_MIN && intVal <= INTEGER_32_MAX) {
      return intVal;
    }
  }
  return null;
};
/**
 * Helper to run some code but catch any exceptions and re-throw them later.
 * Useful for preventing user callbacks from breaking internal code.
 *
 * Re-throwing the exception from a setTimeout is a little evil, but it's very
 * convenient (we don't have to try to figure out when is a safe point to
 * re-throw it), and the behavior seems reasonable:
 *
 * * If you aren't pausing on exceptions, you get an error in the console with
 *   the correct stack trace.
 * * If you're pausing on all exceptions, the debugger will pause on your
 *   exception and then again when we rethrow it.
 * * If you're only pausing on uncaught exceptions, the debugger will only pause
 *   on us re-throwing it.
 *
 * @param fn - The code to guard.
 */
var exceptionGuard = function exceptionGuard(fn) {
  try {
    fn();
  } catch (e) {
    // Re-throw exception when it's safe.
    setTimeout(function () {
      // It used to be that "throw e" would result in a good console error with
      // relevant context, but as of Chrome 39, you just get the firebase.js
      // file/line number where we re-throw it, which is useless. So we log
      // e.stack explicitly.
      var stack = e.stack || '';
      warn('Exception was thrown by user callback.', stack);
      throw e;
    }, Math.floor(0));
  }
};
/**
 * @returns {boolean} true if we think we're currently being crawled.
 */
var beingCrawled = function beingCrawled() {
  var userAgent = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window['navigator'] && window['navigator']['userAgent'] || '';
  // For now we whitelist the most popular crawlers.  We should refine this to be the set of crawlers we
  // believe to support JavaScript/AJAX rendering.
  // NOTE: Google Webmaster Tools doesn't really belong, but their "This is how a visitor to your website
  // would have seen the page" is flaky if we don't treat it as a crawler.
  return userAgent.search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0;
};
/**
 * Same as setTimeout() except on Node.JS it will /not/ prevent the process from exiting.
 *
 * It is removed with clearTimeout() as normal.
 *
 * @param fn - Function to run.
 * @param time - Milliseconds to wait before running.
 * @returns The setTimeout() return value.
 */
var setTimeoutNonBlocking = function setTimeoutNonBlocking(fn, time) {
  var timeout = setTimeout(fn, time);
  // Note: at the time of this comment, unrefTimer is under the unstable set of APIs. Run with --unstable to enable the API.
  if (typeof timeout === 'number' &&
  // @ts-ignore Is only defined in Deno environments.
  typeof Deno !== 'undefined' &&
  // @ts-ignore Deno and unrefTimer are only defined in Deno environments.
  Deno['unrefTimer']) {
    // @ts-ignore Deno and unrefTimer are only defined in Deno environments.
    Deno.unrefTimer(timeout);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } else if (_typeof(timeout) === 'object' && timeout['unref']) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    timeout['unref']();
  }
  return timeout;
};

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Abstraction around AppCheck's token fetching capabilities.
 */
var AppCheckTokenProvider = /*#__PURE__*/function () {
  function AppCheckTokenProvider(appName_, appCheckProvider) {
    var _this = this;
    _classCallCheck(this, AppCheckTokenProvider);
    this.appName_ = appName_;
    this.appCheckProvider = appCheckProvider;
    this.appCheck = appCheckProvider === null || appCheckProvider === void 0 ? void 0 : appCheckProvider.getImmediate({
      optional: true
    });
    if (!this.appCheck) {
      appCheckProvider === null || appCheckProvider === void 0 ? void 0 : appCheckProvider.get().then(function (appCheck) {
        return _this.appCheck = appCheck;
      });
    }
  }
  return _createClass(AppCheckTokenProvider, [{
    key: "getToken",
    value: function getToken(forceRefresh) {
      var _this2 = this;
      if (!this.appCheck) {
        return new Promise(function (resolve, reject) {
          // Support delayed initialization of FirebaseAppCheck. This allows our
          // customers to initialize the RTDB SDK before initializing Firebase
          // AppCheck and ensures that all requests are authenticated if a token
          // becomes available before the timeout below expires.
          setTimeout(function () {
            if (_this2.appCheck) {
              _this2.getToken(forceRefresh).then(resolve, reject);
            } else {
              resolve(null);
            }
          }, 0);
        });
      }
      return this.appCheck.getToken(forceRefresh);
    }
  }, {
    key: "addTokenChangeListener",
    value: function addTokenChangeListener(listener) {
      var _a;
      (_a = this.appCheckProvider) === null || _a === void 0 ? void 0 : _a.get().then(function (appCheck) {
        return appCheck.addTokenListener(listener);
      });
    }
  }, {
    key: "notifyForInvalidToken",
    value: function notifyForInvalidToken() {
      warn("Provided AppCheck credentials for the app named \"".concat(this.appName_, "\" ") + 'are invalid. This usually indicates your app was not initialized correctly.');
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Abstraction around FirebaseApp's token fetching capabilities.
 */
var FirebaseAuthTokenProvider = /*#__PURE__*/function () {
  function FirebaseAuthTokenProvider(appName_, firebaseOptions_, authProvider_) {
    var _this3 = this;
    _classCallCheck(this, FirebaseAuthTokenProvider);
    this.appName_ = appName_;
    this.firebaseOptions_ = firebaseOptions_;
    this.authProvider_ = authProvider_;
    this.auth_ = null;
    this.auth_ = authProvider_.getImmediate({
      optional: true
    });
    if (!this.auth_) {
      authProvider_.onInit(function (auth) {
        return _this3.auth_ = auth;
      });
    }
  }
  return _createClass(FirebaseAuthTokenProvider, [{
    key: "getToken",
    value: function getToken(forceRefresh) {
      var _this4 = this;
      if (!this.auth_) {
        return new Promise(function (resolve, reject) {
          // Support delayed initialization of FirebaseAuth. This allows our
          // customers to initialize the RTDB SDK before initializing Firebase
          // Auth and ensures that all requests are authenticated if a token
          // becomes available before the timeout below expires.
          setTimeout(function () {
            if (_this4.auth_) {
              _this4.getToken(forceRefresh).then(resolve, reject);
            } else {
              resolve(null);
            }
          }, 0);
        });
      }
      return this.auth_.getToken(forceRefresh).catch(function (error) {
        // TODO: Need to figure out all the cases this is raised and whether
        // this makes sense.
        if (error && error.code === 'auth/token-not-initialized') {
          log('Got auth/token-not-initialized error.  Treating as null token.');
          return null;
        } else {
          return Promise.reject(error);
        }
      });
    }
  }, {
    key: "addTokenChangeListener",
    value: function addTokenChangeListener(listener) {
      // TODO: We might want to wrap the listener and call it with no args to
      // avoid a leaky abstraction, but that makes removing the listener harder.
      if (this.auth_) {
        this.auth_.addAuthTokenListener(listener);
      } else {
        this.authProvider_.get().then(function (auth) {
          return auth.addAuthTokenListener(listener);
        });
      }
    }
  }, {
    key: "removeTokenChangeListener",
    value: function removeTokenChangeListener(listener) {
      this.authProvider_.get().then(function (auth) {
        return auth.removeAuthTokenListener(listener);
      });
    }
  }, {
    key: "notifyForInvalidToken",
    value: function notifyForInvalidToken() {
      var errorMessage = 'Provided authentication credentials for the app named "' + this.appName_ + '" are invalid. This usually indicates your app was not ' + 'initialized correctly. ';
      if ('credential' in this.firebaseOptions_) {
        errorMessage += 'Make sure the "credential" property provided to initializeApp() ' + 'is authorized to access the specified "databaseURL" and is from the correct ' + 'project.';
      } else if ('serviceAccount' in this.firebaseOptions_) {
        errorMessage += 'Make sure the "serviceAccount" property provided to initializeApp() ' + 'is authorized to access the specified "databaseURL" and is from the correct ' + 'project.';
      } else {
        errorMessage += 'Make sure the "apiKey" and "databaseURL" properties provided to ' + 'initializeApp() match the values provided for your app at ' + 'https://console.firebase.google.com/.';
      }
      warn(errorMessage);
    }
  }]);
}();
/* AuthTokenProvider that supplies a constant token. Used by Admin SDK or mockUserToken with emulators. */
var EmulatorTokenProvider = /*#__PURE__*/function () {
  function EmulatorTokenProvider(accessToken) {
    _classCallCheck(this, EmulatorTokenProvider);
    this.accessToken = accessToken;
  }
  return _createClass(EmulatorTokenProvider, [{
    key: "getToken",
    value: function getToken(forceRefresh) {
      return Promise.resolve({
        accessToken: this.accessToken
      });
    }
  }, {
    key: "addTokenChangeListener",
    value: function addTokenChangeListener(listener) {
      // Invoke the listener immediately to match the behavior in Firebase Auth
      // (see packages/auth/src/auth.js#L1807)
      listener(this.accessToken);
    }
  }, {
    key: "removeTokenChangeListener",
    value: function removeTokenChangeListener(listener) {}
  }, {
    key: "notifyForInvalidToken",
    value: function notifyForInvalidToken() {}
  }]);
}();
/** A string that is treated as an admin access token by the RTDB emulator. Used by Admin SDK. */
EmulatorTokenProvider.OWNER = 'owner';

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PROTOCOL_VERSION = '5';
var VERSION_PARAM = 'v';
var TRANSPORT_SESSION_PARAM = 's';
var REFERER_PARAM = 'r';
var FORGE_REF = 'f';
// Matches console.firebase.google.com, firebase-console-*.corp.google.com and
// firebase.corp.google.com
var FORGE_DOMAIN_RE = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/;
var LAST_SESSION_PARAM = 'ls';
var APPLICATION_ID_PARAM = 'p';
var APP_CHECK_TOKEN_PARAM = 'ac';
var WEBSOCKET = 'websocket';
var LONG_POLLING = 'long_polling';

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A class that holds metadata about a Repo object
 */
var RepoInfo = /*#__PURE__*/function () {
  /**
   * @param host - Hostname portion of the url for the repo
   * @param secure - Whether or not this repo is accessed over ssl
   * @param namespace - The namespace represented by the repo
   * @param webSocketOnly - Whether to prefer websockets over all other transports (used by Nest).
   * @param nodeAdmin - Whether this instance uses Admin SDK credentials
   * @param persistenceKey - Override the default session persistence storage key
   */
  function RepoInfo(host, secure, namespace, webSocketOnly) {
    var nodeAdmin = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var persistenceKey = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
    var includeNamespaceInQueryParams = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var isUsingEmulator = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
    _classCallCheck(this, RepoInfo);
    this.secure = secure;
    this.namespace = namespace;
    this.webSocketOnly = webSocketOnly;
    this.nodeAdmin = nodeAdmin;
    this.persistenceKey = persistenceKey;
    this.includeNamespaceInQueryParams = includeNamespaceInQueryParams;
    this.isUsingEmulator = isUsingEmulator;
    this._host = host.toLowerCase();
    this._domain = this._host.substr(this._host.indexOf('.') + 1);
    this.internalHost = PersistentStorage.get('host:' + host) || this._host;
  }
  return _createClass(RepoInfo, [{
    key: "isCacheableHost",
    value: function isCacheableHost() {
      return this.internalHost.substr(0, 2) === 's-';
    }
  }, {
    key: "isCustomHost",
    value: function isCustomHost() {
      return this._domain !== 'firebaseio.com' && this._domain !== 'firebaseio-demo.com';
    }
  }, {
    key: "host",
    get: function get() {
      return this._host;
    },
    set: function set(newHost) {
      if (newHost !== this.internalHost) {
        this.internalHost = newHost;
        if (this.isCacheableHost()) {
          PersistentStorage.set('host:' + this._host, this.internalHost);
        }
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      var str = this.toURLString();
      if (this.persistenceKey) {
        str += '<' + this.persistenceKey + '>';
      }
      return str;
    }
  }, {
    key: "toURLString",
    value: function toURLString() {
      var protocol = this.secure ? 'https://' : 'http://';
      var query = this.includeNamespaceInQueryParams ? "?ns=".concat(this.namespace) : '';
      return "".concat(protocol).concat(this.host, "/").concat(query);
    }
  }]);
}();
function repoInfoNeedsQueryParam(repoInfo) {
  return repoInfo.host !== repoInfo.internalHost || repoInfo.isCustomHost() || repoInfo.includeNamespaceInQueryParams;
}
/**
 * Returns the websocket URL for this repo
 * @param repoInfo - RepoInfo object
 * @param type - of connection
 * @param params - list
 * @returns The URL for this repo
 */
function repoInfoConnectionURL(repoInfo, type, params) {
  (0, _util.assert)(typeof type === 'string', 'typeof type must == string');
  (0, _util.assert)(_typeof(params) === 'object', 'typeof params must == object');
  var connURL;
  if (type === WEBSOCKET) {
    connURL = (repoInfo.secure ? 'wss://' : 'ws://') + repoInfo.internalHost + '/.ws?';
  } else if (type === LONG_POLLING) {
    connURL = (repoInfo.secure ? 'https://' : 'http://') + repoInfo.internalHost + '/.lp?';
  } else {
    throw new Error('Unknown connection type: ' + type);
  }
  if (repoInfoNeedsQueryParam(repoInfo)) {
    params['ns'] = repoInfo.namespace;
  }
  var pairs = [];
  each(params, function (key, value) {
    pairs.push(key + '=' + value);
  });
  return connURL + pairs.join('&');
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Tracks a collection of stats.
 */
var StatsCollection = /*#__PURE__*/function () {
  function StatsCollection() {
    _classCallCheck(this, StatsCollection);
    this.counters_ = {};
  }
  return _createClass(StatsCollection, [{
    key: "incrementCounter",
    value: function incrementCounter(name) {
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      if (!(0, _util.contains)(this.counters_, name)) {
        this.counters_[name] = 0;
      }
      this.counters_[name] += amount;
    }
  }, {
    key: "get",
    value: function get() {
      return (0, _util.deepCopy)(this.counters_);
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var collections = {};
var reporters = {};
function statsManagerGetCollection(repoInfo) {
  var hashString = repoInfo.toString();
  if (!collections[hashString]) {
    collections[hashString] = new StatsCollection();
  }
  return collections[hashString];
}
function statsManagerGetOrCreateReporter(repoInfo, creatorFunction) {
  var hashString = repoInfo.toString();
  if (!reporters[hashString]) {
    reporters[hashString] = creatorFunction();
  }
  return reporters[hashString];
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * This class ensures the packets from the server arrive in order
 * This class takes data from the server and ensures it gets passed into the callbacks in order.
 */
var PacketReceiver = /*#__PURE__*/function () {
  /**
   * @param onMessage_
   */
  function PacketReceiver(onMessage_) {
    _classCallCheck(this, PacketReceiver);
    this.onMessage_ = onMessage_;
    this.pendingResponses = [];
    this.currentResponseNum = 0;
    this.closeAfterResponse = -1;
    this.onClose = null;
  }
  return _createClass(PacketReceiver, [{
    key: "closeAfter",
    value: function closeAfter(responseNum, callback) {
      this.closeAfterResponse = responseNum;
      this.onClose = callback;
      if (this.closeAfterResponse < this.currentResponseNum) {
        this.onClose();
        this.onClose = null;
      }
    }
    /**
     * Each message from the server comes with a response number, and an array of data. The responseNumber
     * allows us to ensure that we process them in the right order, since we can't be guaranteed that all
     * browsers will respond in the same order as the requests we sent
     */
  }, {
    key: "handleResponse",
    value: function handleResponse(requestNum, data) {
      var _this5 = this;
      this.pendingResponses[requestNum] = data;
      var _loop = function _loop() {
        var toProcess = _this5.pendingResponses[_this5.currentResponseNum];
        delete _this5.pendingResponses[_this5.currentResponseNum];
        var _loop2 = function _loop2(i) {
          if (toProcess[i]) {
            exceptionGuard(function () {
              _this5.onMessage_(toProcess[i]);
            });
          }
        };
        for (var i = 0; i < toProcess.length; ++i) {
          _loop2(i);
        }
        if (_this5.currentResponseNum === _this5.closeAfterResponse) {
          if (_this5.onClose) {
            _this5.onClose();
            _this5.onClose = null;
          }
          return 1; // break
        }
        _this5.currentResponseNum++;
      };
      while (this.pendingResponses[this.currentResponseNum]) {
        if (_loop()) break;
      }
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// URL query parameters associated with longpolling
var FIREBASE_LONGPOLL_START_PARAM = 'start';
var FIREBASE_LONGPOLL_CLOSE_COMMAND = 'close';
var FIREBASE_LONGPOLL_COMMAND_CB_NAME = 'pLPCommand';
var FIREBASE_LONGPOLL_DATA_CB_NAME = 'pRTLPCB';
var FIREBASE_LONGPOLL_ID_PARAM = 'id';
var FIREBASE_LONGPOLL_PW_PARAM = 'pw';
var FIREBASE_LONGPOLL_SERIAL_PARAM = 'ser';
var FIREBASE_LONGPOLL_CALLBACK_ID_PARAM = 'cb';
var FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM = 'seg';
var FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET = 'ts';
var FIREBASE_LONGPOLL_DATA_PARAM = 'd';
var FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM = 'dframe';
//Data size constants.
//TODO: Perf: the maximum length actually differs from browser to browser.
// We should check what browser we're on and set accordingly.
var MAX_URL_DATA_SIZE = 1870;
var SEG_HEADER_SIZE = 30; //ie: &seg=8299234&ts=982389123&d=
var MAX_PAYLOAD_SIZE = MAX_URL_DATA_SIZE - SEG_HEADER_SIZE;
/**
 * Keepalive period
 * send a fresh request at minimum every 25 seconds. Opera has a maximum request
 * length of 30 seconds that we can't exceed.
 */
var KEEPALIVE_REQUEST_INTERVAL = 25000;
/**
 * How long to wait before aborting a long-polling connection attempt.
 */
var LP_CONNECT_TIMEOUT = 30000;
/**
 * This class manages a single long-polling connection.
 */
var BrowserPollConnection = /*#__PURE__*/function () {
  /**
   * @param connId An identifier for this connection, used for logging
   * @param repoInfo The info for the endpoint to send data to.
   * @param applicationId The Firebase App ID for this project.
   * @param appCheckToken The AppCheck token for this client.
   * @param authToken The AuthToken to use for this connection.
   * @param transportSessionId Optional transportSessionid if we are
   * reconnecting for an existing transport session
   * @param lastSessionId Optional lastSessionId if the PersistentConnection has
   * already created a connection previously
   */
  function BrowserPollConnection(connId, repoInfo, applicationId, appCheckToken, authToken, transportSessionId, lastSessionId) {
    var _this6 = this;
    _classCallCheck(this, BrowserPollConnection);
    this.connId = connId;
    this.repoInfo = repoInfo;
    this.applicationId = applicationId;
    this.appCheckToken = appCheckToken;
    this.authToken = authToken;
    this.transportSessionId = transportSessionId;
    this.lastSessionId = lastSessionId;
    this.bytesSent = 0;
    this.bytesReceived = 0;
    this.everConnected_ = false;
    this.log_ = logWrapper(connId);
    this.stats_ = statsManagerGetCollection(repoInfo);
    this.urlFn = function (params) {
      // Always add the token if we have one.
      if (_this6.appCheckToken) {
        params[APP_CHECK_TOKEN_PARAM] = _this6.appCheckToken;
      }
      return repoInfoConnectionURL(repoInfo, LONG_POLLING, params);
    };
  }
  /**
   * @param onMessage - Callback when messages arrive
   * @param onDisconnect - Callback with connection lost.
   */
  return _createClass(BrowserPollConnection, [{
    key: "open",
    value: function open(onMessage, onDisconnect) {
      var _this7 = this;
      this.curSegmentNum = 0;
      this.onDisconnect_ = onDisconnect;
      this.myPacketOrderer = new PacketReceiver(onMessage);
      this.isClosed_ = false;
      this.connectTimeoutTimer_ = setTimeout(function () {
        _this7.log_('Timed out trying to connect.');
        // Make sure we clear the host cache
        _this7.onClosed_();
        _this7.connectTimeoutTimer_ = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, Math.floor(LP_CONNECT_TIMEOUT));
      // Ensure we delay the creation of the iframe until the DOM is loaded.
      executeWhenDOMReady(function () {
        if (_this7.isClosed_) {
          return;
        }
        //Set up a callback that gets triggered once a connection is set up.
        _this7.scriptTagHolder = new FirebaseIFrameScriptHolder(function () {
          for (var _len3 = arguments.length, args = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
            args[_key4] = arguments[_key4];
          }
          var command = args[0],
            arg1 = args[1],
            arg2 = args[2],
            arg3 = args[3],
            arg4 = args[4];
          _this7.incrementIncomingBytes_(args);
          if (!_this7.scriptTagHolder) {
            return; // we closed the connection.
          }
          if (_this7.connectTimeoutTimer_) {
            clearTimeout(_this7.connectTimeoutTimer_);
            _this7.connectTimeoutTimer_ = null;
          }
          _this7.everConnected_ = true;
          if (command === FIREBASE_LONGPOLL_START_PARAM) {
            _this7.id = arg1;
            _this7.password = arg2;
          } else if (command === FIREBASE_LONGPOLL_CLOSE_COMMAND) {
            // Don't clear the host cache. We got a response from the server, so we know it's reachable
            if (arg1) {
              // We aren't expecting any more data (other than what the server's already in the process of sending us
              // through our already open polls), so don't send any more.
              _this7.scriptTagHolder.sendNewPolls = false;
              // arg1 in this case is the last response number sent by the server. We should try to receive
              // all of the responses up to this one before closing
              _this7.myPacketOrderer.closeAfter(arg1, function () {
                _this7.onClosed_();
              });
            } else {
              _this7.onClosed_();
            }
          } else {
            throw new Error('Unrecognized command received: ' + command);
          }
        }, function () {
          for (var _len4 = arguments.length, args = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
            args[_key5] = arguments[_key5];
          }
          var pN = args[0],
            data = args[1];
          _this7.incrementIncomingBytes_(args);
          _this7.myPacketOrderer.handleResponse(pN, data);
        }, function () {
          _this7.onClosed_();
        }, _this7.urlFn);
        //Send the initial request to connect. The serial number is simply to keep the browser from pulling previous results
        //from cache.
        var urlParams = {};
        urlParams[FIREBASE_LONGPOLL_START_PARAM] = 't';
        urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = Math.floor(Math.random() * 100000000);
        if (_this7.scriptTagHolder.uniqueCallbackIdentifier) {
          urlParams[FIREBASE_LONGPOLL_CALLBACK_ID_PARAM] = _this7.scriptTagHolder.uniqueCallbackIdentifier;
        }
        urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
        if (_this7.transportSessionId) {
          urlParams[TRANSPORT_SESSION_PARAM] = _this7.transportSessionId;
        }
        if (_this7.lastSessionId) {
          urlParams[LAST_SESSION_PARAM] = _this7.lastSessionId;
        }
        if (_this7.applicationId) {
          urlParams[APPLICATION_ID_PARAM] = _this7.applicationId;
        }
        if (_this7.appCheckToken) {
          urlParams[APP_CHECK_TOKEN_PARAM] = _this7.appCheckToken;
        }
        if (typeof location !== 'undefined' && location.hostname && FORGE_DOMAIN_RE.test(location.hostname)) {
          urlParams[REFERER_PARAM] = FORGE_REF;
        }
        var connectURL = _this7.urlFn(urlParams);
        _this7.log_('Connecting via long-poll to ' + connectURL);
        _this7.scriptTagHolder.addTag(connectURL, function () {
          /* do nothing */
        });
      });
    }
    /**
     * Call this when a handshake has completed successfully and we want to consider the connection established
     */
  }, {
    key: "start",
    value: function start() {
      this.scriptTagHolder.startLongPoll(this.id, this.password);
      this.addDisconnectPingFrame(this.id, this.password);
    }
    /**
     * Forces long polling to be considered as a potential transport
     */
  }, {
    key: "markConnectionHealthy",
    value:
    /**
     * No-op for polling
     */
    function markConnectionHealthy() {}
    /**
     * Stops polling and cleans up the iframe
     */
  }, {
    key: "shutdown_",
    value: function shutdown_() {
      this.isClosed_ = true;
      if (this.scriptTagHolder) {
        this.scriptTagHolder.close();
        this.scriptTagHolder = null;
      }
      //remove the disconnect frame, which will trigger an XHR call to the server to tell it we're leaving.
      if (this.myDisconnFrame) {
        document.body.removeChild(this.myDisconnFrame);
        this.myDisconnFrame = null;
      }
      if (this.connectTimeoutTimer_) {
        clearTimeout(this.connectTimeoutTimer_);
        this.connectTimeoutTimer_ = null;
      }
    }
    /**
     * Triggered when this transport is closed
     */
  }, {
    key: "onClosed_",
    value: function onClosed_() {
      if (!this.isClosed_) {
        this.log_('Longpoll is closing itself');
        this.shutdown_();
        if (this.onDisconnect_) {
          this.onDisconnect_(this.everConnected_);
          this.onDisconnect_ = null;
        }
      }
    }
    /**
     * External-facing close handler. RealTime has requested we shut down. Kill our connection and tell the server
     * that we've left.
     */
  }, {
    key: "close",
    value: function close() {
      if (!this.isClosed_) {
        this.log_('Longpoll is being closed.');
        this.shutdown_();
      }
    }
    /**
     * Send the JSON object down to the server. It will need to be stringified, base64 encoded, and then
     * broken into chunks (since URLs have a small maximum length).
     * @param data - The JSON data to transmit.
     */
  }, {
    key: "send",
    value: function send(data) {
      var dataStr = (0, _util.stringify)(data);
      this.bytesSent += dataStr.length;
      this.stats_.incrementCounter('bytes_sent', dataStr.length);
      //first, lets get the base64-encoded data
      var base64data = (0, _util.base64Encode)(dataStr);
      //We can only fit a certain amount in each URL, so we need to split this request
      //up into multiple pieces if it doesn't fit in one request.
      var dataSegs = splitStringBySize(base64data, MAX_PAYLOAD_SIZE);
      //Enqueue each segment for transmission. We assign each chunk a sequential ID and a total number
      //of segments so that we can reassemble the packet on the server.
      for (var i = 0; i < dataSegs.length; i++) {
        this.scriptTagHolder.enqueueSegment(this.curSegmentNum, dataSegs.length, dataSegs[i]);
        this.curSegmentNum++;
      }
    }
    /**
     * This is how we notify the server that we're leaving.
     * We aren't able to send requests with DHTML on a window close event, but we can
     * trigger XHR requests in some browsers (everything but Opera basically).
     */
  }, {
    key: "addDisconnectPingFrame",
    value: function addDisconnectPingFrame(id, pw) {
      if ((0, _util.isNodeSdk)()) {
        return;
      }
      this.myDisconnFrame = document.createElement('iframe');
      var urlParams = {};
      urlParams[FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM] = 't';
      urlParams[FIREBASE_LONGPOLL_ID_PARAM] = id;
      urlParams[FIREBASE_LONGPOLL_PW_PARAM] = pw;
      this.myDisconnFrame.src = this.urlFn(urlParams);
      this.myDisconnFrame.style.display = 'none';
      document.body.appendChild(this.myDisconnFrame);
    }
    /**
     * Used to track the bytes received by this client
     */
  }, {
    key: "incrementIncomingBytes_",
    value: function incrementIncomingBytes_(args) {
      // TODO: This is an annoying perf hit just to track the number of incoming bytes.  Maybe it should be opt-in.
      var bytesReceived = (0, _util.stringify)(args).length;
      this.bytesReceived += bytesReceived;
      this.stats_.incrementCounter('bytes_received', bytesReceived);
    }
  }], [{
    key: "forceAllow",
    value: function forceAllow() {
      BrowserPollConnection.forceAllow_ = true;
    }
    /**
     * Forces longpolling to not be considered as a potential transport
     */
  }, {
    key: "forceDisallow",
    value: function forceDisallow() {
      BrowserPollConnection.forceDisallow_ = true;
    }
    // Static method, use string literal so it can be accessed in a generic way
  }, {
    key: "isAvailable",
    value: function isAvailable() {
      if ((0, _util.isNodeSdk)()) {
        return false;
      } else if (BrowserPollConnection.forceAllow_) {
        return true;
      } else {
        // NOTE: In React-Native there's normally no 'document', but if you debug a React-Native app in
        // the Chrome debugger, 'document' is defined, but document.createElement is null (2015/06/08).
        return !BrowserPollConnection.forceDisallow_ && typeof document !== 'undefined' && document.createElement != null && !isChromeExtensionContentScript() && !isWindowsStoreApp();
      }
    }
  }]);
}();
/*********************************************************************************************
 * A wrapper around an iframe that is used as a long-polling script holder.
 *********************************************************************************************/
var FirebaseIFrameScriptHolder = /*#__PURE__*/function () {
  /**
   * @param commandCB - The callback to be called when control commands are received from the server.
   * @param onMessageCB - The callback to be triggered when responses arrive from the server.
   * @param onDisconnect - The callback to be triggered when this tag holder is closed
   * @param urlFn - A function that provides the URL of the endpoint to send data to.
   */
  function FirebaseIFrameScriptHolder(commandCB, onMessageCB, onDisconnect, urlFn) {
    _classCallCheck(this, FirebaseIFrameScriptHolder);
    this.onDisconnect = onDisconnect;
    this.urlFn = urlFn;
    //We maintain a count of all of the outstanding requests, because if we have too many active at once it can cause
    //problems in some browsers.
    this.outstandingRequests = new Set();
    //A queue of the pending segments waiting for transmission to the server.
    this.pendingSegs = [];
    //A serial number. We use this for two things:
    // 1) A way to ensure the browser doesn't cache responses to polls
    // 2) A way to make the server aware when long-polls arrive in a different order than we started them. The
    //    server needs to release both polls in this case or it will cause problems in Opera since Opera can only execute
    //    JSONP code in the order it was added to the iframe.
    this.currentSerial = Math.floor(Math.random() * 100000000);
    // This gets set to false when we're "closing down" the connection (e.g. we're switching transports but there's still
    // incoming data from the server that we're waiting for).
    this.sendNewPolls = true;
    if (!(0, _util.isNodeSdk)()) {
      //Each script holder registers a couple of uniquely named callbacks with the window. These are called from the
      //iframes where we put the long-polling script tags. We have two callbacks:
      //   1) Command Callback - Triggered for control issues, like starting a connection.
      //   2) Message Callback - Triggered when new data arrives.
      this.uniqueCallbackIdentifier = LUIDGenerator();
      window[FIREBASE_LONGPOLL_COMMAND_CB_NAME + this.uniqueCallbackIdentifier] = commandCB;
      window[FIREBASE_LONGPOLL_DATA_CB_NAME + this.uniqueCallbackIdentifier] = onMessageCB;
      //Create an iframe for us to add script tags to.
      this.myIFrame = FirebaseIFrameScriptHolder.createIFrame_();
      // Set the iframe's contents.
      var script = '';
      // if we set a javascript url, it's IE and we need to set the document domain. The javascript url is sufficient
      // for ie9, but ie8 needs to do it again in the document itself.
      if (this.myIFrame.src && this.myIFrame.src.substr(0, 'javascript:'.length) === 'javascript:') {
        var currentDomain = document.domain;
        script = '<script>document.domain="' + currentDomain + '";</script>';
      }
      var iframeContents = '<html><body>' + script + '</body></html>';
      try {
        this.myIFrame.doc.open();
        this.myIFrame.doc.write(iframeContents);
        this.myIFrame.doc.close();
      } catch (e) {
        log('frame writing exception');
        if (e.stack) {
          log(e.stack);
        }
        log(e);
      }
    } else {
      this.commandCB = commandCB;
      this.onMessageCB = onMessageCB;
    }
  }
  /**
   * Each browser has its own funny way to handle iframes. Here we mush them all together into one object that I can
   * actually use.
   */
  return _createClass(FirebaseIFrameScriptHolder, [{
    key: "close",
    value:
    /**
     * Cancel all outstanding queries and remove the frame.
     */
    function close() {
      var _this8 = this;
      //Mark this iframe as dead, so no new requests are sent.
      this.alive = false;
      if (this.myIFrame) {
        //We have to actually remove all of the html inside this iframe before removing it from the
        //window, or IE will continue loading and executing the script tags we've already added, which
        //can lead to some errors being thrown. Setting textContent seems to be the safest way to do this.
        this.myIFrame.doc.body.textContent = '';
        setTimeout(function () {
          if (_this8.myIFrame !== null) {
            document.body.removeChild(_this8.myIFrame);
            _this8.myIFrame = null;
          }
        }, Math.floor(0));
      }
      // Protect from being called recursively.
      var onDisconnect = this.onDisconnect;
      if (onDisconnect) {
        this.onDisconnect = null;
        onDisconnect();
      }
    }
    /**
     * Actually start the long-polling session by adding the first script tag(s) to the iframe.
     * @param id - The ID of this connection
     * @param pw - The password for this connection
     */
  }, {
    key: "startLongPoll",
    value: function startLongPoll(id, pw) {
      this.myID = id;
      this.myPW = pw;
      this.alive = true;
      //send the initial request. If there are requests queued, make sure that we transmit as many as we are currently able to.
      while (this.newRequest_()) {}
    }
    /**
     * This is called any time someone might want a script tag to be added. It adds a script tag when there aren't
     * too many outstanding requests and we are still alive.
     *
     * If there are outstanding packet segments to send, it sends one. If there aren't, it sends a long-poll anyways if
     * needed.
     */
  }, {
    key: "newRequest_",
    value: function newRequest_() {
      // We keep one outstanding request open all the time to receive data, but if we need to send data
      // (pendingSegs.length > 0) then we create a new request to send the data.  The server will automatically
      // close the old request.
      if (this.alive && this.sendNewPolls && this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)) {
        //construct our url
        this.currentSerial++;
        var urlParams = {};
        urlParams[FIREBASE_LONGPOLL_ID_PARAM] = this.myID;
        urlParams[FIREBASE_LONGPOLL_PW_PARAM] = this.myPW;
        urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = this.currentSerial;
        var theURL = this.urlFn(urlParams);
        //Now add as much data as we can.
        var curDataString = '';
        var i = 0;
        while (this.pendingSegs.length > 0) {
          //first, lets see if the next segment will fit.
          var nextSeg = this.pendingSegs[0];
          if (nextSeg.d.length + SEG_HEADER_SIZE + curDataString.length <= MAX_URL_DATA_SIZE) {
            //great, the segment will fit. Lets append it.
            var theSeg = this.pendingSegs.shift();
            curDataString = curDataString + '&' + FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM + i + '=' + theSeg.seg + '&' + FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET + i + '=' + theSeg.ts + '&' + FIREBASE_LONGPOLL_DATA_PARAM + i + '=' + theSeg.d;
            i++;
          } else {
            break;
          }
        }
        theURL = theURL + curDataString;
        this.addLongPollTag_(theURL, this.currentSerial);
        return true;
      } else {
        return false;
      }
    }
    /**
     * Queue a packet for transmission to the server.
     * @param segnum - A sequential id for this packet segment used for reassembly
     * @param totalsegs - The total number of segments in this packet
     * @param data - The data for this segment.
     */
  }, {
    key: "enqueueSegment",
    value: function enqueueSegment(segnum, totalsegs, data) {
      //add this to the queue of segments to send.
      this.pendingSegs.push({
        seg: segnum,
        ts: totalsegs,
        d: data
      });
      //send the data immediately if there isn't already data being transmitted, unless
      //startLongPoll hasn't been called yet.
      if (this.alive) {
        this.newRequest_();
      }
    }
    /**
     * Add a script tag for a regular long-poll request.
     * @param url - The URL of the script tag.
     * @param serial - The serial number of the request.
     */
  }, {
    key: "addLongPollTag_",
    value: function addLongPollTag_(url, serial) {
      var _this9 = this;
      //remember that we sent this request.
      this.outstandingRequests.add(serial);
      var doNewRequest = function doNewRequest() {
        _this9.outstandingRequests.delete(serial);
        _this9.newRequest_();
      };
      // If this request doesn't return on its own accord (by the server sending us some data), we'll
      // create a new one after the KEEPALIVE interval to make sure we always keep a fresh request open.
      var keepaliveTimeout = setTimeout(doNewRequest, Math.floor(KEEPALIVE_REQUEST_INTERVAL));
      var readyStateCB = function readyStateCB() {
        // Request completed.  Cancel the keepalive.
        clearTimeout(keepaliveTimeout);
        // Trigger a new request so we can continue receiving data.
        doNewRequest();
      };
      this.addTag(url, readyStateCB);
    }
    /**
     * Add an arbitrary script tag to the iframe.
     * @param url - The URL for the script tag source.
     * @param loadCB - A callback to be triggered once the script has loaded.
     */
  }, {
    key: "addTag",
    value: function addTag(url, loadCB) {
      var _this10 = this;
      if ((0, _util.isNodeSdk)()) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.doNodeLongPoll(url, loadCB);
      } else {
        setTimeout(function () {
          try {
            // if we're already closed, don't add this poll
            if (!_this10.sendNewPolls) {
              return;
            }
            var newScript = _this10.myIFrame.doc.createElement('script');
            newScript.type = 'text/javascript';
            newScript.async = true;
            newScript.src = url;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            newScript.onload = newScript.onreadystatechange = function () {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              var rstate = newScript.readyState;
              if (!rstate || rstate === 'loaded' || rstate === 'complete') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                newScript.onload = newScript.onreadystatechange = null;
                if (newScript.parentNode) {
                  newScript.parentNode.removeChild(newScript);
                }
                loadCB();
              }
            };
            newScript.onerror = function () {
              log('Long-poll script failed to load: ' + url);
              _this10.sendNewPolls = false;
              _this10.close();
            };
            _this10.myIFrame.doc.body.appendChild(newScript);
          } catch (e) {
            // TODO: we should make this error visible somehow
          }
        }, Math.floor(1));
      }
    }
  }], [{
    key: "createIFrame_",
    value: function createIFrame_() {
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      // This is necessary in order to initialize the document inside the iframe
      if (document.body) {
        document.body.appendChild(iframe);
        try {
          // If document.domain has been modified in IE, this will throw an error, and we need to set the
          // domain of the iframe's document manually. We can do this via a javascript: url as the src attribute
          // Also note that we must do this *after* the iframe has been appended to the page. Otherwise it doesn't work.
          var a = iframe.contentWindow.document;
          if (!a) {
            // Apologies for the log-spam, I need to do something to keep closure from optimizing out the assignment above.
            log('No IE domain setting required');
          }
        } catch (e) {
          var domain = document.domain;
          iframe.src = "javascript:void((function(){document.open();document.domain='" + domain + "';document.close();})())";
        }
      } else {
        // LongPollConnection attempts to delay initialization until the document is ready, so hopefully this
        // never gets hit.
        throw 'Document body has not initialized. Wait to initialize Firebase until after the document is ready.';
      }
      // Get the document of the iframe in a browser-specific way.
      if (iframe.contentDocument) {
        iframe.doc = iframe.contentDocument; // Firefox, Opera, Safari
      } else if (iframe.contentWindow) {
        iframe.doc = iframe.contentWindow.document; // Internet Explorer
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } else if (iframe.document) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        iframe.doc = iframe.document; //others?
      }
      return iframe;
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var WEBSOCKET_MAX_FRAME_SIZE = 16384;
var WEBSOCKET_KEEPALIVE_INTERVAL = 45000;
var WebSocketImpl = null;
if (typeof MozWebSocket !== 'undefined') {
  WebSocketImpl = MozWebSocket;
} else if (typeof WebSocket !== 'undefined') {
  WebSocketImpl = WebSocket;
}
/**
 * Create a new websocket connection with the given callbacks.
 */
var WebSocketConnection = /*#__PURE__*/function () {
  /**
   * @param connId identifier for this transport
   * @param repoInfo The info for the websocket endpoint.
   * @param applicationId The Firebase App ID for this project.
   * @param appCheckToken The App Check Token for this client.
   * @param authToken The Auth Token for this client.
   * @param transportSessionId Optional transportSessionId if this is connecting
   * to an existing transport session
   * @param lastSessionId Optional lastSessionId if there was a previous
   * connection
   */
  function WebSocketConnection(connId, repoInfo, applicationId, appCheckToken, authToken, transportSessionId, lastSessionId) {
    _classCallCheck(this, WebSocketConnection);
    this.connId = connId;
    this.applicationId = applicationId;
    this.appCheckToken = appCheckToken;
    this.authToken = authToken;
    this.keepaliveTimer = null;
    this.frames = null;
    this.totalFrames = 0;
    this.bytesSent = 0;
    this.bytesReceived = 0;
    this.log_ = logWrapper(this.connId);
    this.stats_ = statsManagerGetCollection(repoInfo);
    this.connURL = WebSocketConnection.connectionURL_(repoInfo, transportSessionId, lastSessionId, appCheckToken, applicationId);
    this.nodeAdmin = repoInfo.nodeAdmin;
  }
  /**
   * @param repoInfo - The info for the websocket endpoint.
   * @param transportSessionId - Optional transportSessionId if this is connecting to an existing transport
   *                                         session
   * @param lastSessionId - Optional lastSessionId if there was a previous connection
   * @returns connection url
   */
  return _createClass(WebSocketConnection, [{
    key: "open",
    value:
    /**
     * @param onMessage - Callback when messages arrive
     * @param onDisconnect - Callback with connection lost.
     */
    function open(onMessage, onDisconnect) {
      var _this11 = this;
      this.onDisconnect = onDisconnect;
      this.onMessage = onMessage;
      this.log_('Websocket connecting to ' + this.connURL);
      this.everConnected_ = false;
      // Assume failure until proven otherwise.
      PersistentStorage.set('previous_websocket_failure', true);
      try {
        var options;
        if ((0, _util.isNodeSdk)()) {
          var device = this.nodeAdmin ? 'AdminNode' : 'Node';
          // UA Format: Firebase/<wire_protocol>/<sdk_version>/<platform>/<device>
          options = {
            headers: {
              'User-Agent': "Firebase/".concat(PROTOCOL_VERSION, "/").concat(SDK_VERSION, "/").concat(process.platform, "/").concat(device),
              'X-Firebase-GMPID': this.applicationId || ''
            }
          };
          // If using Node with admin creds, AppCheck-related checks are unnecessary.
          // Note that we send the credentials here even if they aren't admin credentials, which is
          // not a problem.
          // Note that this header is just used to bypass appcheck, and the token should still be sent
          // through the websocket connection once it is established.
          if (this.authToken) {
            options.headers['Authorization'] = "Bearer ".concat(this.authToken);
          }
          if (this.appCheckToken) {
            options.headers['X-Firebase-AppCheck'] = this.appCheckToken;
          }
          // Plumb appropriate http_proxy environment variable into faye-websocket if it exists.
          var env = process['env'];
          var proxy = this.connURL.indexOf('wss://') === 0 ? env['HTTPS_PROXY'] || env['https_proxy'] : env['HTTP_PROXY'] || env['http_proxy'];
          if (proxy) {
            options['proxy'] = {
              origin: proxy
            };
          }
        }
        this.mySock = new WebSocketImpl(this.connURL, [], options);
      } catch (e) {
        this.log_('Error instantiating WebSocket.');
        var _error = e.message || e.data;
        if (_error) {
          this.log_(_error);
        }
        this.onClosed_();
        return;
      }
      this.mySock.onopen = function () {
        _this11.log_('Websocket connected.');
        _this11.everConnected_ = true;
      };
      this.mySock.onclose = function () {
        _this11.log_('Websocket connection was disconnected.');
        _this11.mySock = null;
        _this11.onClosed_();
      };
      this.mySock.onmessage = function (m) {
        _this11.handleIncomingFrame(m);
      };
      this.mySock.onerror = function (e) {
        _this11.log_('WebSocket error.  Closing connection.');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var error = e.message || e.data;
        if (error) {
          _this11.log_(error);
        }
        _this11.onClosed_();
      };
    }
    /**
     * No-op for websockets, we don't need to do anything once the connection is confirmed as open
     */
  }, {
    key: "start",
    value: function start() {}
  }, {
    key: "markConnectionHealthy",
    value: function markConnectionHealthy() {
      PersistentStorage.remove('previous_websocket_failure');
    }
  }, {
    key: "appendFrame_",
    value: function appendFrame_(data) {
      this.frames.push(data);
      if (this.frames.length === this.totalFrames) {
        var fullMess = this.frames.join('');
        this.frames = null;
        var jsonMess = (0, _util.jsonEval)(fullMess);
        //handle the message
        this.onMessage(jsonMess);
      }
    }
    /**
     * @param frameCount - The number of frames we are expecting from the server
     */
  }, {
    key: "handleNewFrameCount_",
    value: function handleNewFrameCount_(frameCount) {
      this.totalFrames = frameCount;
      this.frames = [];
    }
    /**
     * Attempts to parse a frame count out of some text. If it can't, assumes a value of 1
     * @returns Any remaining data to be process, or null if there is none
     */
  }, {
    key: "extractFrameCount_",
    value: function extractFrameCount_(data) {
      (0, _util.assert)(this.frames === null, 'We already have a frame buffer');
      // TODO: The server is only supposed to send up to 9999 frames (i.e. length <= 4), but that isn't being enforced
      // currently.  So allowing larger frame counts (length <= 6).  See https://app.asana.com/0/search/8688598998380/8237608042508
      if (data.length <= 6) {
        var frameCount = Number(data);
        if (!isNaN(frameCount)) {
          this.handleNewFrameCount_(frameCount);
          return null;
        }
      }
      this.handleNewFrameCount_(1);
      return data;
    }
    /**
     * Process a websocket frame that has arrived from the server.
     * @param mess - The frame data
     */
  }, {
    key: "handleIncomingFrame",
    value: function handleIncomingFrame(mess) {
      if (this.mySock === null) {
        return; // Chrome apparently delivers incoming packets even after we .close() the connection sometimes.
      }
      var data = mess['data'];
      this.bytesReceived += data.length;
      this.stats_.incrementCounter('bytes_received', data.length);
      this.resetKeepAlive();
      if (this.frames !== null) {
        // we're buffering
        this.appendFrame_(data);
      } else {
        // try to parse out a frame count, otherwise, assume 1 and process it
        var remainingData = this.extractFrameCount_(data);
        if (remainingData !== null) {
          this.appendFrame_(remainingData);
        }
      }
    }
    /**
     * Send a message to the server
     * @param data - The JSON object to transmit
     */
  }, {
    key: "send",
    value: function send(data) {
      this.resetKeepAlive();
      var dataStr = (0, _util.stringify)(data);
      this.bytesSent += dataStr.length;
      this.stats_.incrementCounter('bytes_sent', dataStr.length);
      //We can only fit a certain amount in each websocket frame, so we need to split this request
      //up into multiple pieces if it doesn't fit in one request.
      var dataSegs = splitStringBySize(dataStr, WEBSOCKET_MAX_FRAME_SIZE);
      //Send the length header
      if (dataSegs.length > 1) {
        this.sendString_(String(dataSegs.length));
      }
      //Send the actual data in segments.
      for (var i = 0; i < dataSegs.length; i++) {
        this.sendString_(dataSegs[i]);
      }
    }
  }, {
    key: "shutdown_",
    value: function shutdown_() {
      this.isClosed_ = true;
      if (this.keepaliveTimer) {
        clearInterval(this.keepaliveTimer);
        this.keepaliveTimer = null;
      }
      if (this.mySock) {
        this.mySock.close();
        this.mySock = null;
      }
    }
  }, {
    key: "onClosed_",
    value: function onClosed_() {
      if (!this.isClosed_) {
        this.log_('WebSocket is closing itself');
        this.shutdown_();
        // since this is an internal close, trigger the close listener
        if (this.onDisconnect) {
          this.onDisconnect(this.everConnected_);
          this.onDisconnect = null;
        }
      }
    }
    /**
     * External-facing close handler.
     * Close the websocket and kill the connection.
     */
  }, {
    key: "close",
    value: function close() {
      if (!this.isClosed_) {
        this.log_('WebSocket is being closed');
        this.shutdown_();
      }
    }
    /**
     * Kill the current keepalive timer and start a new one, to ensure that it always fires N seconds after
     * the last activity.
     */
  }, {
    key: "resetKeepAlive",
    value: function resetKeepAlive() {
      var _this12 = this;
      clearInterval(this.keepaliveTimer);
      this.keepaliveTimer = setInterval(function () {
        //If there has been no websocket activity for a while, send a no-op
        if (_this12.mySock) {
          _this12.sendString_('0');
        }
        _this12.resetKeepAlive();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, Math.floor(WEBSOCKET_KEEPALIVE_INTERVAL));
    }
    /**
     * Send a string over the websocket.
     *
     * @param str - String to send.
     */
  }, {
    key: "sendString_",
    value: function sendString_(str) {
      // Firefox seems to sometimes throw exceptions (NS_ERROR_UNEXPECTED) from websocket .send()
      // calls for some unknown reason.  We treat these as an error and disconnect.
      // See https://app.asana.com/0/58926111402292/68021340250410
      try {
        this.mySock.send(str);
      } catch (e) {
        this.log_('Exception thrown from WebSocket.send():', e.message || e.data, 'Closing connection.');
        setTimeout(this.onClosed_.bind(this), 0);
      }
    }
  }], [{
    key: "connectionURL_",
    value: function connectionURL_(repoInfo, transportSessionId, lastSessionId, appCheckToken, applicationId) {
      var urlParams = {};
      urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
      if (!(0, _util.isNodeSdk)() && typeof location !== 'undefined' && location.hostname && FORGE_DOMAIN_RE.test(location.hostname)) {
        urlParams[REFERER_PARAM] = FORGE_REF;
      }
      if (transportSessionId) {
        urlParams[TRANSPORT_SESSION_PARAM] = transportSessionId;
      }
      if (lastSessionId) {
        urlParams[LAST_SESSION_PARAM] = lastSessionId;
      }
      if (appCheckToken) {
        urlParams[APP_CHECK_TOKEN_PARAM] = appCheckToken;
      }
      if (applicationId) {
        urlParams[APPLICATION_ID_PARAM] = applicationId;
      }
      return repoInfoConnectionURL(repoInfo, WEBSOCKET, urlParams);
    }
  }, {
    key: "forceDisallow",
    value: function forceDisallow() {
      WebSocketConnection.forceDisallow_ = true;
    }
  }, {
    key: "isAvailable",
    value: function isAvailable() {
      var isOldAndroid = false;
      if (typeof navigator !== 'undefined' && navigator.userAgent) {
        var oldAndroidRegex = /Android ([0-9]{0,}\.[0-9]{0,})/;
        var oldAndroidMatch = navigator.userAgent.match(oldAndroidRegex);
        if (oldAndroidMatch && oldAndroidMatch.length > 1) {
          if (parseFloat(oldAndroidMatch[1]) < 4.4) {
            isOldAndroid = true;
          }
        }
      }
      return !isOldAndroid && WebSocketImpl !== null && !WebSocketConnection.forceDisallow_;
    }
    /**
     * Returns true if we previously failed to connect with this transport.
     */
  }, {
    key: "previouslyFailed",
    value: function previouslyFailed() {
      // If our persistent storage is actually only in-memory storage,
      // we default to assuming that it previously failed to be safe.
      return PersistentStorage.isInMemoryStorage || PersistentStorage.get('previous_websocket_failure') === true;
    }
  }]);
}();
/**
 * Number of response before we consider the connection "healthy."
 */
WebSocketConnection.responsesRequiredToBeHealthy = 2;
/**
 * Time to wait for the connection te become healthy before giving up.
 */
WebSocketConnection.healthyTimeout = 30000;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Currently simplistic, this class manages what transport a Connection should use at various stages of its
 * lifecycle.
 *
 * It starts with longpolling in a browser, and httppolling on node. It then upgrades to websockets if
 * they are available.
 */
var TransportManager = /*#__PURE__*/function () {
  /**
   * @param repoInfo - Metadata around the namespace we're connecting to
   */
  function TransportManager(repoInfo) {
    _classCallCheck(this, TransportManager);
    this.initTransports_(repoInfo);
  }
  return _createClass(TransportManager, [{
    key: "initTransports_",
    value: function initTransports_(repoInfo) {
      var isWebSocketsAvailable = WebSocketConnection && WebSocketConnection['isAvailable']();
      var isSkipPollConnection = isWebSocketsAvailable && !WebSocketConnection.previouslyFailed();
      if (repoInfo.webSocketOnly) {
        if (!isWebSocketsAvailable) {
          warn("wss:// URL used, but browser isn't known to support websockets.  Trying anyway.");
        }
        isSkipPollConnection = true;
      }
      if (isSkipPollConnection) {
        this.transports_ = [WebSocketConnection];
      } else {
        var transports = this.transports_ = [];
        var _iterator = _createForOfIteratorHelper(TransportManager.ALL_TRANSPORTS),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var transport = _step.value;
            if (transport && transport['isAvailable']()) {
              transports.push(transport);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        TransportManager.globalTransportInitialized_ = true;
      }
    }
    /**
     * @returns The constructor for the initial transport to use
     */
  }, {
    key: "initialTransport",
    value: function initialTransport() {
      if (this.transports_.length > 0) {
        return this.transports_[0];
      } else {
        throw new Error('No transports available');
      }
    }
    /**
     * @returns The constructor for the next transport, or null
     */
  }, {
    key: "upgradeTransport",
    value: function upgradeTransport() {
      if (this.transports_.length > 1) {
        return this.transports_[1];
      } else {
        return null;
      }
    }
  }], [{
    key: "ALL_TRANSPORTS",
    get: function get() {
      return [BrowserPollConnection, WebSocketConnection];
    }
    /**
     * Returns whether transport has been selected to ensure WebSocketConnection or BrowserPollConnection are not called after
     * TransportManager has already set up transports_
     */
  }, {
    key: "IS_TRANSPORT_INITIALIZED",
    get: function get() {
      return this.globalTransportInitialized_;
    }
  }]);
}(); // Keeps track of whether the TransportManager has already chosen a transport to use
TransportManager.globalTransportInitialized_ = false;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Abort upgrade attempt if it takes longer than 60s.
var UPGRADE_TIMEOUT = 60000;
// For some transports (WebSockets), we need to "validate" the transport by exchanging a few requests and responses.
// If we haven't sent enough requests within 5s, we'll start sending noop ping requests.
var DELAY_BEFORE_SENDING_EXTRA_REQUESTS = 5000;
// If the initial data sent triggers a lot of bandwidth (i.e. it's a large put or a listen for a large amount of data)
// then we may not be able to exchange our ping/pong requests within the healthy timeout.  So if we reach the timeout
// but we've sent/received enough bytes, we don't cancel the connection.
var BYTES_SENT_HEALTHY_OVERRIDE = 10 * 1024;
var BYTES_RECEIVED_HEALTHY_OVERRIDE = 100 * 1024;
var MESSAGE_TYPE = 't';
var MESSAGE_DATA = 'd';
var CONTROL_SHUTDOWN = 's';
var CONTROL_RESET = 'r';
var CONTROL_ERROR = 'e';
var CONTROL_PONG = 'o';
var SWITCH_ACK = 'a';
var END_TRANSMISSION = 'n';
var PING = 'p';
var SERVER_HELLO = 'h';
/**
 * Creates a new real-time connection to the server using whichever method works
 * best in the current browser.
 */
var Connection = /*#__PURE__*/function () {
  /**
   * @param id - an id for this connection
   * @param repoInfo_ - the info for the endpoint to connect to
   * @param applicationId_ - the Firebase App ID for this project
   * @param appCheckToken_ - The App Check Token for this device.
   * @param authToken_ - The auth token for this session.
   * @param onMessage_ - the callback to be triggered when a server-push message arrives
   * @param onReady_ - the callback to be triggered when this connection is ready to send messages.
   * @param onDisconnect_ - the callback to be triggered when a connection was lost
   * @param onKill_ - the callback to be triggered when this connection has permanently shut down.
   * @param lastSessionId - last session id in persistent connection. is used to clean up old session in real-time server
   */
  function Connection(id, repoInfo_, applicationId_, appCheckToken_, authToken_, onMessage_, onReady_, onDisconnect_, onKill_, lastSessionId) {
    _classCallCheck(this, Connection);
    this.id = id;
    this.repoInfo_ = repoInfo_;
    this.applicationId_ = applicationId_;
    this.appCheckToken_ = appCheckToken_;
    this.authToken_ = authToken_;
    this.onMessage_ = onMessage_;
    this.onReady_ = onReady_;
    this.onDisconnect_ = onDisconnect_;
    this.onKill_ = onKill_;
    this.lastSessionId = lastSessionId;
    this.connectionCount = 0;
    this.pendingDataMessages = [];
    this.state_ = 0 /* RealtimeState.CONNECTING */;
    this.log_ = logWrapper('c:' + this.id + ':');
    this.transportManager_ = new TransportManager(repoInfo_);
    this.log_('Connection created');
    this.start_();
  }
  /**
   * Starts a connection attempt
   */
  return _createClass(Connection, [{
    key: "start_",
    value: function start_() {
      var _this13 = this;
      var conn = this.transportManager_.initialTransport();
      this.conn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, null, this.lastSessionId);
      // For certain transports (WebSockets), we need to send and receive several messages back and forth before we
      // can consider the transport healthy.
      this.primaryResponsesRequired_ = conn['responsesRequiredToBeHealthy'] || 0;
      var onMessageReceived = this.connReceiver_(this.conn_);
      var onConnectionLost = this.disconnReceiver_(this.conn_);
      this.tx_ = this.conn_;
      this.rx_ = this.conn_;
      this.secondaryConn_ = null;
      this.isHealthy_ = false;
      /*
       * Firefox doesn't like when code from one iframe tries to create another iframe by way of the parent frame.
       * This can occur in the case of a redirect, i.e. we guessed wrong on what server to connect to and received a reset.
       * Somehow, setTimeout seems to make this ok. That doesn't make sense from a security perspective, since you should
       * still have the context of your originating frame.
       */
      setTimeout(function () {
        // this.conn_ gets set to null in some of the tests. Check to make sure it still exists before using it
        _this13.conn_ && _this13.conn_.open(onMessageReceived, onConnectionLost);
      }, Math.floor(0));
      var healthyTimeoutMS = conn['healthyTimeout'] || 0;
      if (healthyTimeoutMS > 0) {
        this.healthyTimeout_ = setTimeoutNonBlocking(function () {
          _this13.healthyTimeout_ = null;
          if (!_this13.isHealthy_) {
            if (_this13.conn_ && _this13.conn_.bytesReceived > BYTES_RECEIVED_HEALTHY_OVERRIDE) {
              _this13.log_('Connection exceeded healthy timeout but has received ' + _this13.conn_.bytesReceived + ' bytes.  Marking connection healthy.');
              _this13.isHealthy_ = true;
              _this13.conn_.markConnectionHealthy();
            } else if (_this13.conn_ && _this13.conn_.bytesSent > BYTES_SENT_HEALTHY_OVERRIDE) {
              _this13.log_('Connection exceeded healthy timeout but has sent ' + _this13.conn_.bytesSent + ' bytes.  Leaving connection alive.');
              // NOTE: We don't want to mark it healthy, since we have no guarantee that the bytes have made it to
              // the server.
            } else {
              _this13.log_('Closing unhealthy connection after timeout.');
              _this13.close();
            }
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, Math.floor(healthyTimeoutMS));
      }
    }
  }, {
    key: "nextTransportId_",
    value: function nextTransportId_() {
      return 'c:' + this.id + ':' + this.connectionCount++;
    }
  }, {
    key: "disconnReceiver_",
    value: function disconnReceiver_(conn) {
      var _this14 = this;
      return function (everConnected) {
        if (conn === _this14.conn_) {
          _this14.onConnectionLost_(everConnected);
        } else if (conn === _this14.secondaryConn_) {
          _this14.log_('Secondary connection lost.');
          _this14.onSecondaryConnectionLost_();
        } else {
          _this14.log_('closing an old connection');
        }
      };
    }
  }, {
    key: "connReceiver_",
    value: function connReceiver_(conn) {
      var _this15 = this;
      return function (message) {
        if (_this15.state_ !== 2 /* RealtimeState.DISCONNECTED */) {
          if (conn === _this15.rx_) {
            _this15.onPrimaryMessageReceived_(message);
          } else if (conn === _this15.secondaryConn_) {
            _this15.onSecondaryMessageReceived_(message);
          } else {
            _this15.log_('message on old connection');
          }
        }
      };
    }
    /**
     * @param dataMsg - An arbitrary data message to be sent to the server
     */
  }, {
    key: "sendRequest",
    value: function sendRequest(dataMsg) {
      // wrap in a data message envelope and send it on
      var msg = {
        t: 'd',
        d: dataMsg
      };
      this.sendData_(msg);
    }
  }, {
    key: "tryCleanupConnection",
    value: function tryCleanupConnection() {
      if (this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_) {
        this.log_('cleaning up and promoting a connection: ' + this.secondaryConn_.connId);
        this.conn_ = this.secondaryConn_;
        this.secondaryConn_ = null;
        // the server will shutdown the old connection
      }
    }
  }, {
    key: "onSecondaryControl_",
    value: function onSecondaryControl_(controlData) {
      if (MESSAGE_TYPE in controlData) {
        var cmd = controlData[MESSAGE_TYPE];
        if (cmd === SWITCH_ACK) {
          this.upgradeIfSecondaryHealthy_();
        } else if (cmd === CONTROL_RESET) {
          // Most likely the session wasn't valid. Abandon the switch attempt
          this.log_('Got a reset on secondary, closing it');
          this.secondaryConn_.close();
          // If we were already using this connection for something, than we need to fully close
          if (this.tx_ === this.secondaryConn_ || this.rx_ === this.secondaryConn_) {
            this.close();
          }
        } else if (cmd === CONTROL_PONG) {
          this.log_('got pong on secondary.');
          this.secondaryResponsesRequired_--;
          this.upgradeIfSecondaryHealthy_();
        }
      }
    }
  }, {
    key: "onSecondaryMessageReceived_",
    value: function onSecondaryMessageReceived_(parsedData) {
      var layer = requireKey('t', parsedData);
      var data = requireKey('d', parsedData);
      if (layer === 'c') {
        this.onSecondaryControl_(data);
      } else if (layer === 'd') {
        // got a data message, but we're still second connection. Need to buffer it up
        this.pendingDataMessages.push(data);
      } else {
        throw new Error('Unknown protocol layer: ' + layer);
      }
    }
  }, {
    key: "upgradeIfSecondaryHealthy_",
    value: function upgradeIfSecondaryHealthy_() {
      if (this.secondaryResponsesRequired_ <= 0) {
        this.log_('Secondary connection is healthy.');
        this.isHealthy_ = true;
        this.secondaryConn_.markConnectionHealthy();
        this.proceedWithUpgrade_();
      } else {
        // Send a ping to make sure the connection is healthy.
        this.log_('sending ping on secondary.');
        this.secondaryConn_.send({
          t: 'c',
          d: {
            t: PING,
            d: {}
          }
        });
      }
    }
  }, {
    key: "proceedWithUpgrade_",
    value: function proceedWithUpgrade_() {
      // tell this connection to consider itself open
      this.secondaryConn_.start();
      // send ack
      this.log_('sending client ack on secondary');
      this.secondaryConn_.send({
        t: 'c',
        d: {
          t: SWITCH_ACK,
          d: {}
        }
      });
      // send end packet on primary transport, switch to sending on this one
      // can receive on this one, buffer responses until end received on primary transport
      this.log_('Ending transmission on primary');
      this.conn_.send({
        t: 'c',
        d: {
          t: END_TRANSMISSION,
          d: {}
        }
      });
      this.tx_ = this.secondaryConn_;
      this.tryCleanupConnection();
    }
  }, {
    key: "onPrimaryMessageReceived_",
    value: function onPrimaryMessageReceived_(parsedData) {
      // Must refer to parsedData properties in quotes, so closure doesn't touch them.
      var layer = requireKey('t', parsedData);
      var data = requireKey('d', parsedData);
      if (layer === 'c') {
        this.onControl_(data);
      } else if (layer === 'd') {
        this.onDataMessage_(data);
      }
    }
  }, {
    key: "onDataMessage_",
    value: function onDataMessage_(message) {
      this.onPrimaryResponse_();
      // We don't do anything with data messages, just kick them up a level
      this.onMessage_(message);
    }
  }, {
    key: "onPrimaryResponse_",
    value: function onPrimaryResponse_() {
      if (!this.isHealthy_) {
        this.primaryResponsesRequired_--;
        if (this.primaryResponsesRequired_ <= 0) {
          this.log_('Primary connection is healthy.');
          this.isHealthy_ = true;
          this.conn_.markConnectionHealthy();
        }
      }
    }
  }, {
    key: "onControl_",
    value: function onControl_(controlData) {
      var cmd = requireKey(MESSAGE_TYPE, controlData);
      if (MESSAGE_DATA in controlData) {
        var payload = controlData[MESSAGE_DATA];
        if (cmd === SERVER_HELLO) {
          var handshakePayload = Object.assign({}, payload);
          if (this.repoInfo_.isUsingEmulator) {
            // Upon connecting, the emulator will pass the hostname that it's aware of, but we prefer the user's set hostname via `connectDatabaseEmulator` over what the emulator passes.
            handshakePayload.h = this.repoInfo_.host;
          }
          this.onHandshake_(handshakePayload);
        } else if (cmd === END_TRANSMISSION) {
          this.log_('recvd end transmission on primary');
          this.rx_ = this.secondaryConn_;
          for (var i = 0; i < this.pendingDataMessages.length; ++i) {
            this.onDataMessage_(this.pendingDataMessages[i]);
          }
          this.pendingDataMessages = [];
          this.tryCleanupConnection();
        } else if (cmd === CONTROL_SHUTDOWN) {
          // This was previously the 'onKill' callback passed to the lower-level connection
          // payload in this case is the reason for the shutdown. Generally a human-readable error
          this.onConnectionShutdown_(payload);
        } else if (cmd === CONTROL_RESET) {
          // payload in this case is the host we should contact
          this.onReset_(payload);
        } else if (cmd === CONTROL_ERROR) {
          error('Server Error: ' + payload);
        } else if (cmd === CONTROL_PONG) {
          this.log_('got pong on primary.');
          this.onPrimaryResponse_();
          this.sendPingOnPrimaryIfNecessary_();
        } else {
          error('Unknown control packet command: ' + cmd);
        }
      }
    }
    /**
     * @param handshake - The handshake data returned from the server
     */
  }, {
    key: "onHandshake_",
    value: function onHandshake_(handshake) {
      var timestamp = handshake.ts;
      var version = handshake.v;
      var host = handshake.h;
      this.sessionId = handshake.s;
      this.repoInfo_.host = host;
      // if we've already closed the connection, then don't bother trying to progress further
      if (this.state_ === 0 /* RealtimeState.CONNECTING */) {
        this.conn_.start();
        this.onConnectionEstablished_(this.conn_, timestamp);
        if (PROTOCOL_VERSION !== version) {
          warn('Protocol version mismatch detected');
        }
        // TODO: do we want to upgrade? when? maybe a delay?
        this.tryStartUpgrade_();
      }
    }
  }, {
    key: "tryStartUpgrade_",
    value: function tryStartUpgrade_() {
      var conn = this.transportManager_.upgradeTransport();
      if (conn) {
        this.startUpgrade_(conn);
      }
    }
  }, {
    key: "startUpgrade_",
    value: function startUpgrade_(conn) {
      var _this16 = this;
      this.secondaryConn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, this.sessionId);
      // For certain transports (WebSockets), we need to send and receive several messages back and forth before we
      // can consider the transport healthy.
      this.secondaryResponsesRequired_ = conn['responsesRequiredToBeHealthy'] || 0;
      var onMessage = this.connReceiver_(this.secondaryConn_);
      var onDisconnect = this.disconnReceiver_(this.secondaryConn_);
      this.secondaryConn_.open(onMessage, onDisconnect);
      // If we haven't successfully upgraded after UPGRADE_TIMEOUT, give up and kill the secondary.
      setTimeoutNonBlocking(function () {
        if (_this16.secondaryConn_) {
          _this16.log_('Timed out trying to upgrade.');
          _this16.secondaryConn_.close();
        }
      }, Math.floor(UPGRADE_TIMEOUT));
    }
  }, {
    key: "onReset_",
    value: function onReset_(host) {
      this.log_('Reset packet received.  New host: ' + host);
      this.repoInfo_.host = host;
      // TODO: if we're already "connected", we need to trigger a disconnect at the next layer up.
      // We don't currently support resets after the connection has already been established
      if (this.state_ === 1 /* RealtimeState.CONNECTED */) {
        this.close();
      } else {
        // Close whatever connections we have open and start again.
        this.closeConnections_();
        this.start_();
      }
    }
  }, {
    key: "onConnectionEstablished_",
    value: function onConnectionEstablished_(conn, timestamp) {
      var _this17 = this;
      this.log_('Realtime connection established.');
      this.conn_ = conn;
      this.state_ = 1 /* RealtimeState.CONNECTED */;
      if (this.onReady_) {
        this.onReady_(timestamp, this.sessionId);
        this.onReady_ = null;
      }
      // If after 5 seconds we haven't sent enough requests to the server to get the connection healthy,
      // send some pings.
      if (this.primaryResponsesRequired_ === 0) {
        this.log_('Primary connection is healthy.');
        this.isHealthy_ = true;
      } else {
        setTimeoutNonBlocking(function () {
          _this17.sendPingOnPrimaryIfNecessary_();
        }, Math.floor(DELAY_BEFORE_SENDING_EXTRA_REQUESTS));
      }
    }
  }, {
    key: "sendPingOnPrimaryIfNecessary_",
    value: function sendPingOnPrimaryIfNecessary_() {
      // If the connection isn't considered healthy yet, we'll send a noop ping packet request.
      if (!this.isHealthy_ && this.state_ === 1 /* RealtimeState.CONNECTED */) {
        this.log_('sending ping on primary.');
        this.sendData_({
          t: 'c',
          d: {
            t: PING,
            d: {}
          }
        });
      }
    }
  }, {
    key: "onSecondaryConnectionLost_",
    value: function onSecondaryConnectionLost_() {
      var conn = this.secondaryConn_;
      this.secondaryConn_ = null;
      if (this.tx_ === conn || this.rx_ === conn) {
        // we are relying on this connection already in some capacity. Therefore, a failure is real
        this.close();
      }
    }
    /**
     * @param everConnected - Whether or not the connection ever reached a server. Used to determine if
     * we should flush the host cache
     */
  }, {
    key: "onConnectionLost_",
    value: function onConnectionLost_(everConnected) {
      this.conn_ = null;
      // NOTE: IF you're seeing a Firefox error for this line, I think it might be because it's getting
      // called on window close and RealtimeState.CONNECTING is no longer defined.  Just a guess.
      if (!everConnected && this.state_ === 0 /* RealtimeState.CONNECTING */) {
        this.log_('Realtime connection failed.');
        // Since we failed to connect at all, clear any cached entry for this namespace in case the machine went away
        if (this.repoInfo_.isCacheableHost()) {
          PersistentStorage.remove('host:' + this.repoInfo_.host);
          // reset the internal host to what we would show the user, i.e. <ns>.firebaseio.com
          this.repoInfo_.internalHost = this.repoInfo_.host;
        }
      } else if (this.state_ === 1 /* RealtimeState.CONNECTED */) {
        this.log_('Realtime connection lost.');
      }
      this.close();
    }
  }, {
    key: "onConnectionShutdown_",
    value: function onConnectionShutdown_(reason) {
      this.log_('Connection shutdown command received. Shutting down...');
      if (this.onKill_) {
        this.onKill_(reason);
        this.onKill_ = null;
      }
      // We intentionally don't want to fire onDisconnect (kill is a different case),
      // so clear the callback.
      this.onDisconnect_ = null;
      this.close();
    }
  }, {
    key: "sendData_",
    value: function sendData_(data) {
      if (this.state_ !== 1 /* RealtimeState.CONNECTED */) {
        throw 'Connection is not connected';
      } else {
        this.tx_.send(data);
      }
    }
    /**
     * Cleans up this connection, calling the appropriate callbacks
     */
  }, {
    key: "close",
    value: function close() {
      if (this.state_ !== 2 /* RealtimeState.DISCONNECTED */) {
        this.log_('Closing realtime connection.');
        this.state_ = 2 /* RealtimeState.DISCONNECTED */;
        this.closeConnections_();
        if (this.onDisconnect_) {
          this.onDisconnect_();
          this.onDisconnect_ = null;
        }
      }
    }
  }, {
    key: "closeConnections_",
    value: function closeConnections_() {
      this.log_('Shutting down all connections');
      if (this.conn_) {
        this.conn_.close();
        this.conn_ = null;
      }
      if (this.secondaryConn_) {
        this.secondaryConn_.close();
        this.secondaryConn_ = null;
      }
      if (this.healthyTimeout_) {
        clearTimeout(this.healthyTimeout_);
        this.healthyTimeout_ = null;
      }
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Interface defining the set of actions that can be performed against the Firebase server
 * (basically corresponds to our wire protocol).
 *
 * @interface
 */
var ServerActions = /*#__PURE__*/function () {
  function ServerActions() {
    _classCallCheck(this, ServerActions);
  }
  return _createClass(ServerActions, [{
    key: "put",
    value: function put(pathString, data, onComplete, hash) {}
  }, {
    key: "merge",
    value: function merge(pathString, data, onComplete, hash) {}
    /**
     * Refreshes the auth token for the current connection.
     * @param token - The authentication token
     */
  }, {
    key: "refreshAuthToken",
    value: function refreshAuthToken(token) {}
    /**
     * Refreshes the app check token for the current connection.
     * @param token The app check token
     */
  }, {
    key: "refreshAppCheckToken",
    value: function refreshAppCheckToken(token) {}
  }, {
    key: "onDisconnectPut",
    value: function onDisconnectPut(pathString, data, onComplete) {}
  }, {
    key: "onDisconnectMerge",
    value: function onDisconnectMerge(pathString, data, onComplete) {}
  }, {
    key: "onDisconnectCancel",
    value: function onDisconnectCancel(pathString, onComplete) {}
  }, {
    key: "reportStats",
    value: function reportStats(stats) {}
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Base class to be used if you want to emit events. Call the constructor with
 * the set of allowed event names.
 */
var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter(allowedEvents_) {
    _classCallCheck(this, EventEmitter);
    this.allowedEvents_ = allowedEvents_;
    this.listeners_ = {};
    (0, _util.assert)(Array.isArray(allowedEvents_) && allowedEvents_.length > 0, 'Requires a non-empty array');
  }
  /**
   * To be called by derived classes to trigger events.
   */
  return _createClass(EventEmitter, [{
    key: "trigger",
    value: function trigger(eventType) {
      if (Array.isArray(this.listeners_[eventType])) {
        // Clone the list, since callbacks could add/remove listeners.
        var listeners = _toConsumableArray(this.listeners_[eventType]);
        for (var _len5 = arguments.length, varArgs = new Array(_len5 > 1 ? _len5 - 1 : 0), _key6 = 1; _key6 < _len5; _key6++) {
          varArgs[_key6 - 1] = arguments[_key6];
        }
        for (var i = 0; i < listeners.length; i++) {
          listeners[i].callback.apply(listeners[i].context, varArgs);
        }
      }
    }
  }, {
    key: "on",
    value: function on(eventType, callback, context) {
      this.validateEventType_(eventType);
      this.listeners_[eventType] = this.listeners_[eventType] || [];
      this.listeners_[eventType].push({
        callback: callback,
        context: context
      });
      var eventData = this.getInitialEvent(eventType);
      if (eventData) {
        callback.apply(context, eventData);
      }
    }
  }, {
    key: "off",
    value: function off(eventType, callback, context) {
      this.validateEventType_(eventType);
      var listeners = this.listeners_[eventType] || [];
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].callback === callback && (!context || context === listeners[i].context)) {
          listeners.splice(i, 1);
          return;
        }
      }
    }
  }, {
    key: "validateEventType_",
    value: function validateEventType_(eventType) {
      (0, _util.assert)(this.allowedEvents_.find(function (et) {
        return et === eventType;
      }), 'Unknown event: ' + eventType);
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Monitors online state (as reported by window.online/offline events).
 *
 * The expectation is that this could have many false positives (thinks we are online
 * when we're not), but no false negatives.  So we can safely use it to determine when
 * we definitely cannot reach the internet.
 */
var OnlineMonitor = /*#__PURE__*/function (_EventEmitter) {
  function OnlineMonitor() {
    var _this18;
    _classCallCheck(this, OnlineMonitor);
    _this18 = _callSuper(this, OnlineMonitor, [['online']]);
    _this18.online_ = true;
    // We've had repeated complaints that Cordova apps can get stuck "offline", e.g.
    // https://forum.ionicframework.com/t/firebase-connection-is-lost-and-never-come-back/43810
    // It would seem that the 'online' event does not always fire consistently. So we disable it
    // for Cordova.
    if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined' && !(0, _util.isMobileCordova)()) {
      window.addEventListener('online', function () {
        if (!_this18.online_) {
          _this18.online_ = true;
          _this18.trigger('online', true);
        }
      }, false);
      window.addEventListener('offline', function () {
        if (_this18.online_) {
          _this18.online_ = false;
          _this18.trigger('online', false);
        }
      }, false);
    }
    return _this18;
  }
  _inherits(OnlineMonitor, _EventEmitter);
  return _createClass(OnlineMonitor, [{
    key: "getInitialEvent",
    value: function getInitialEvent(eventType) {
      (0, _util.assert)(eventType === 'online', 'Unknown event type: ' + eventType);
      return [this.online_];
    }
  }, {
    key: "currentlyOnline",
    value: function currentlyOnline() {
      return this.online_;
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      return new OnlineMonitor();
    }
  }]);
}(EventEmitter);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Maximum key depth. */
var MAX_PATH_DEPTH = 32;
/** Maximum number of (UTF8) bytes in a Firebase path. */
var MAX_PATH_LENGTH_BYTES = 768;
/**
 * An immutable object representing a parsed path.  It's immutable so that you
 * can pass them around to other functions without worrying about them changing
 * it.
 */
var Path = /*#__PURE__*/function () {
  /**
   * @param pathOrString - Path string to parse, or another path, or the raw
   * tokens array
   */
  function Path(pathOrString, pieceNum) {
    _classCallCheck(this, Path);
    if (pieceNum === void 0) {
      this.pieces_ = pathOrString.split('/');
      // Remove empty pieces.
      var copyTo = 0;
      for (var i = 0; i < this.pieces_.length; i++) {
        if (this.pieces_[i].length > 0) {
          this.pieces_[copyTo] = this.pieces_[i];
          copyTo++;
        }
      }
      this.pieces_.length = copyTo;
      this.pieceNum_ = 0;
    } else {
      this.pieces_ = pathOrString;
      this.pieceNum_ = pieceNum;
    }
  }
  return _createClass(Path, [{
    key: "toString",
    value: function toString() {
      var pathString = '';
      for (var i = this.pieceNum_; i < this.pieces_.length; i++) {
        if (this.pieces_[i] !== '') {
          pathString += '/' + this.pieces_[i];
        }
      }
      return pathString || '/';
    }
  }]);
}();
function newEmptyPath() {
  return new Path('');
}
function pathGetFront(path) {
  if (path.pieceNum_ >= path.pieces_.length) {
    return null;
  }
  return path.pieces_[path.pieceNum_];
}
/**
 * @returns The number of segments in this path
 */
function pathGetLength(path) {
  return path.pieces_.length - path.pieceNum_;
}
function pathPopFront(path) {
  var pieceNum = path.pieceNum_;
  if (pieceNum < path.pieces_.length) {
    pieceNum++;
  }
  return new Path(path.pieces_, pieceNum);
}
function pathGetBack(path) {
  if (path.pieceNum_ < path.pieces_.length) {
    return path.pieces_[path.pieces_.length - 1];
  }
  return null;
}
function pathToUrlEncodedString(path) {
  var pathString = '';
  for (var i = path.pieceNum_; i < path.pieces_.length; i++) {
    if (path.pieces_[i] !== '') {
      pathString += '/' + encodeURIComponent(String(path.pieces_[i]));
    }
  }
  return pathString || '/';
}
/**
 * Shallow copy of the parts of the path.
 *
 */
function pathSlice(path) {
  var begin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return path.pieces_.slice(path.pieceNum_ + begin);
}
function pathParent(path) {
  if (path.pieceNum_ >= path.pieces_.length) {
    return null;
  }
  var pieces = [];
  for (var i = path.pieceNum_; i < path.pieces_.length - 1; i++) {
    pieces.push(path.pieces_[i]);
  }
  return new Path(pieces, 0);
}
function pathChild(path, childPathObj) {
  var pieces = [];
  for (var i = path.pieceNum_; i < path.pieces_.length; i++) {
    pieces.push(path.pieces_[i]);
  }
  if (childPathObj instanceof Path) {
    for (var _i = childPathObj.pieceNum_; _i < childPathObj.pieces_.length; _i++) {
      pieces.push(childPathObj.pieces_[_i]);
    }
  } else {
    var childPieces = childPathObj.split('/');
    for (var _i2 = 0; _i2 < childPieces.length; _i2++) {
      if (childPieces[_i2].length > 0) {
        pieces.push(childPieces[_i2]);
      }
    }
  }
  return new Path(pieces, 0);
}
/**
 * @returns True if there are no segments in this path
 */
function pathIsEmpty(path) {
  return path.pieceNum_ >= path.pieces_.length;
}
/**
 * @returns The path from outerPath to innerPath
 */
function newRelativePath(outerPath, innerPath) {
  var outer = pathGetFront(outerPath),
    inner = pathGetFront(innerPath);
  if (outer === null) {
    return innerPath;
  } else if (outer === inner) {
    return newRelativePath(pathPopFront(outerPath), pathPopFront(innerPath));
  } else {
    throw new Error('INTERNAL ERROR: innerPath (' + innerPath + ') is not within ' + 'outerPath (' + outerPath + ')');
  }
}
/**
 * @returns -1, 0, 1 if left is less, equal, or greater than the right.
 */
function pathCompare(left, right) {
  var leftKeys = pathSlice(left, 0);
  var rightKeys = pathSlice(right, 0);
  for (var i = 0; i < leftKeys.length && i < rightKeys.length; i++) {
    var cmp = nameCompare(leftKeys[i], rightKeys[i]);
    if (cmp !== 0) {
      return cmp;
    }
  }
  if (leftKeys.length === rightKeys.length) {
    return 0;
  }
  return leftKeys.length < rightKeys.length ? -1 : 1;
}
/**
 * @returns true if paths are the same.
 */
function pathEquals(path, other) {
  if (pathGetLength(path) !== pathGetLength(other)) {
    return false;
  }
  for (var i = path.pieceNum_, j = other.pieceNum_; i <= path.pieces_.length; i++, j++) {
    if (path.pieces_[i] !== other.pieces_[j]) {
      return false;
    }
  }
  return true;
}
/**
 * @returns True if this path is a parent of (or the same as) other
 */
function pathContains(path, other) {
  var i = path.pieceNum_;
  var j = other.pieceNum_;
  if (pathGetLength(path) > pathGetLength(other)) {
    return false;
  }
  while (i < path.pieces_.length) {
    if (path.pieces_[i] !== other.pieces_[j]) {
      return false;
    }
    ++i;
    ++j;
  }
  return true;
}
/**
 * Dynamic (mutable) path used to count path lengths.
 *
 * This class is used to efficiently check paths for valid
 * length (in UTF8 bytes) and depth (used in path validation).
 *
 * Throws Error exception if path is ever invalid.
 *
 * The definition of a path always begins with '/'.
 */
var ValidationPath = /*#__PURE__*/_createClass(
/**
 * @param path - Initial Path.
 * @param errorPrefix_ - Prefix for any error messages.
 */
function ValidationPath(path, errorPrefix_) {
  _classCallCheck(this, ValidationPath);
  this.errorPrefix_ = errorPrefix_;
  this.parts_ = pathSlice(path, 0);
  /** Initialize to number of '/' chars needed in path. */
  this.byteLength_ = Math.max(1, this.parts_.length);
  for (var i = 0; i < this.parts_.length; i++) {
    this.byteLength_ += (0, _util.stringLength)(this.parts_[i]);
  }
  validationPathCheckValid(this);
});
function validationPathPush(validationPath, child) {
  // Count the needed '/'
  if (validationPath.parts_.length > 0) {
    validationPath.byteLength_ += 1;
  }
  validationPath.parts_.push(child);
  validationPath.byteLength_ += (0, _util.stringLength)(child);
  validationPathCheckValid(validationPath);
}
function validationPathPop(validationPath) {
  var last = validationPath.parts_.pop();
  validationPath.byteLength_ -= (0, _util.stringLength)(last);
  // Un-count the previous '/'
  if (validationPath.parts_.length > 0) {
    validationPath.byteLength_ -= 1;
  }
}
function validationPathCheckValid(validationPath) {
  if (validationPath.byteLength_ > MAX_PATH_LENGTH_BYTES) {
    throw new Error(validationPath.errorPrefix_ + 'has a key path longer than ' + MAX_PATH_LENGTH_BYTES + ' bytes (' + validationPath.byteLength_ + ').');
  }
  if (validationPath.parts_.length > MAX_PATH_DEPTH) {
    throw new Error(validationPath.errorPrefix_ + 'path specified exceeds the maximum depth that can be written (' + MAX_PATH_DEPTH + ') or object contains a cycle ' + validationPathToErrorString(validationPath));
  }
}
/**
 * String for use in error messages - uses '.' notation for path.
 */
function validationPathToErrorString(validationPath) {
  if (validationPath.parts_.length === 0) {
    return '';
  }
  return "in property '" + validationPath.parts_.join('.') + "'";
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var VisibilityMonitor = /*#__PURE__*/function (_EventEmitter2) {
  function VisibilityMonitor() {
    var _this19;
    _classCallCheck(this, VisibilityMonitor);
    _this19 = _callSuper(this, VisibilityMonitor, [['visible']]);
    var hidden;
    var visibilityChange;
    if (typeof document !== 'undefined' && typeof document.addEventListener !== 'undefined') {
      if (typeof document['hidden'] !== 'undefined') {
        // Opera 12.10 and Firefox 18 and later support
        visibilityChange = 'visibilitychange';
        hidden = 'hidden';
      } else if (typeof document['mozHidden'] !== 'undefined') {
        visibilityChange = 'mozvisibilitychange';
        hidden = 'mozHidden';
      } else if (typeof document['msHidden'] !== 'undefined') {
        visibilityChange = 'msvisibilitychange';
        hidden = 'msHidden';
      } else if (typeof document['webkitHidden'] !== 'undefined') {
        visibilityChange = 'webkitvisibilitychange';
        hidden = 'webkitHidden';
      }
    }
    // Initially, we always assume we are visible. This ensures that in browsers
    // without page visibility support or in cases where we are never visible
    // (e.g. chrome extension), we act as if we are visible, i.e. don't delay
    // reconnects
    _this19.visible_ = true;
    if (visibilityChange) {
      document.addEventListener(visibilityChange, function () {
        var visible = !document[hidden];
        if (visible !== _this19.visible_) {
          _this19.visible_ = visible;
          _this19.trigger('visible', visible);
        }
      }, false);
    }
    return _this19;
  }
  _inherits(VisibilityMonitor, _EventEmitter2);
  return _createClass(VisibilityMonitor, [{
    key: "getInitialEvent",
    value: function getInitialEvent(eventType) {
      (0, _util.assert)(eventType === 'visible', 'Unknown event type: ' + eventType);
      return [this.visible_];
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      return new VisibilityMonitor();
    }
  }]);
}(EventEmitter);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var RECONNECT_MIN_DELAY = 1000;
var RECONNECT_MAX_DELAY_DEFAULT = 60 * 5 * 1000; // 5 minutes in milliseconds (Case: 1858)
var RECONNECT_MAX_DELAY_FOR_ADMINS = 30 * 1000; // 30 seconds for admin clients (likely to be a backend server)
var RECONNECT_DELAY_MULTIPLIER = 1.3;
var RECONNECT_DELAY_RESET_TIMEOUT = 30000; // Reset delay back to MIN_DELAY after being connected for 30sec.
var SERVER_KILL_INTERRUPT_REASON = 'server_kill';
// If auth fails repeatedly, we'll assume something is wrong and log a warning / back off.
var INVALID_TOKEN_THRESHOLD = 3;
/**
 * Firebase connection.  Abstracts wire protocol and handles reconnecting.
 *
 * NOTE: All JSON objects sent to the realtime connection must have property names enclosed
 * in quotes to make sure the closure compiler does not minify them.
 */
var PersistentConnection = /*#__PURE__*/function (_ServerActions) {
  /**
   * @param repoInfo_ - Data about the namespace we are connecting to
   * @param applicationId_ - The Firebase App ID for this project
   * @param onDataUpdate_ - A callback for new data from the server
   */
  function PersistentConnection(repoInfo_, applicationId_, onDataUpdate_, onConnectStatus_, onServerInfoUpdate_, authTokenProvider_, appCheckTokenProvider_, authOverride_) {
    var _this20;
    _classCallCheck(this, PersistentConnection);
    _this20 = _callSuper(this, PersistentConnection);
    _this20.repoInfo_ = repoInfo_;
    _this20.applicationId_ = applicationId_;
    _this20.onDataUpdate_ = onDataUpdate_;
    _this20.onConnectStatus_ = onConnectStatus_;
    _this20.onServerInfoUpdate_ = onServerInfoUpdate_;
    _this20.authTokenProvider_ = authTokenProvider_;
    _this20.appCheckTokenProvider_ = appCheckTokenProvider_;
    _this20.authOverride_ = authOverride_;
    // Used for diagnostic logging.
    _this20.id = PersistentConnection.nextPersistentConnectionId_++;
    _this20.log_ = logWrapper('p:' + _this20.id + ':');
    _this20.interruptReasons_ = {};
    _this20.listens = new Map();
    _this20.outstandingPuts_ = [];
    _this20.outstandingGets_ = [];
    _this20.outstandingPutCount_ = 0;
    _this20.outstandingGetCount_ = 0;
    _this20.onDisconnectRequestQueue_ = [];
    _this20.connected_ = false;
    _this20.reconnectDelay_ = RECONNECT_MIN_DELAY;
    _this20.maxReconnectDelay_ = RECONNECT_MAX_DELAY_DEFAULT;
    _this20.securityDebugCallback_ = null;
    _this20.lastSessionId = null;
    _this20.establishConnectionTimer_ = null;
    _this20.visible_ = false;
    // Before we get connected, we keep a queue of pending messages to send.
    _this20.requestCBHash_ = {};
    _this20.requestNumber_ = 0;
    _this20.realtime_ = null;
    _this20.authToken_ = null;
    _this20.appCheckToken_ = null;
    _this20.forceTokenRefresh_ = false;
    _this20.invalidAuthTokenCount_ = 0;
    _this20.invalidAppCheckTokenCount_ = 0;
    _this20.firstConnection_ = true;
    _this20.lastConnectionAttemptTime_ = null;
    _this20.lastConnectionEstablishedTime_ = null;
    if (authOverride_ && !(0, _util.isNodeSdk)()) {
      throw new Error('Auth override specified in options, but not supported on non Node.js platforms');
    }
    VisibilityMonitor.getInstance().on('visible', _this20.onVisible_, _this20);
    if (repoInfo_.host.indexOf('fblocal') === -1) {
      OnlineMonitor.getInstance().on('online', _this20.onOnline_, _this20);
    }
    return _this20;
  }
  _inherits(PersistentConnection, _ServerActions);
  return _createClass(PersistentConnection, [{
    key: "sendRequest",
    value: function sendRequest(action, body, onResponse) {
      var curReqNum = ++this.requestNumber_;
      var msg = {
        r: curReqNum,
        a: action,
        b: body
      };
      this.log_((0, _util.stringify)(msg));
      (0, _util.assert)(this.connected_, "sendRequest call when we're not connected not allowed.");
      this.realtime_.sendRequest(msg);
      if (onResponse) {
        this.requestCBHash_[curReqNum] = onResponse;
      }
    }
  }, {
    key: "get",
    value: function get(query) {
      this.initConnection_();
      var deferred = new _util.Deferred();
      var request = {
        p: query._path.toString(),
        q: query._queryObject
      };
      var outstandingGet = {
        action: 'g',
        request: request,
        onComplete: function onComplete(message) {
          var payload = message['d'];
          if (message['s'] === 'ok') {
            deferred.resolve(payload);
          } else {
            deferred.reject(payload);
          }
        }
      };
      this.outstandingGets_.push(outstandingGet);
      this.outstandingGetCount_++;
      var index = this.outstandingGets_.length - 1;
      if (this.connected_) {
        this.sendGet_(index);
      }
      return deferred.promise;
    }
  }, {
    key: "listen",
    value: function listen(query, currentHashFn, tag, onComplete) {
      this.initConnection_();
      var queryId = query._queryIdentifier;
      var pathString = query._path.toString();
      this.log_('Listen called for ' + pathString + ' ' + queryId);
      if (!this.listens.has(pathString)) {
        this.listens.set(pathString, new Map());
      }
      (0, _util.assert)(query._queryParams.isDefault() || !query._queryParams.loadsAllData(), 'listen() called for non-default but complete query');
      (0, _util.assert)(!this.listens.get(pathString).has(queryId), "listen() called twice for same path/queryId.");
      var listenSpec = {
        onComplete: onComplete,
        hashFn: currentHashFn,
        query: query,
        tag: tag
      };
      this.listens.get(pathString).set(queryId, listenSpec);
      if (this.connected_) {
        this.sendListen_(listenSpec);
      }
    }
  }, {
    key: "sendGet_",
    value: function sendGet_(index) {
      var _this21 = this;
      var get = this.outstandingGets_[index];
      this.sendRequest('g', get.request, function (message) {
        delete _this21.outstandingGets_[index];
        _this21.outstandingGetCount_--;
        if (_this21.outstandingGetCount_ === 0) {
          _this21.outstandingGets_ = [];
        }
        if (get.onComplete) {
          get.onComplete(message);
        }
      });
    }
  }, {
    key: "sendListen_",
    value: function sendListen_(listenSpec) {
      var _this22 = this;
      var query = listenSpec.query;
      var pathString = query._path.toString();
      var queryId = query._queryIdentifier;
      this.log_('Listen on ' + pathString + ' for ' + queryId);
      var req = {
        /*path*/p: pathString
      };
      var action = 'q';
      // Only bother to send query if it's non-default.
      if (listenSpec.tag) {
        req['q'] = query._queryObject;
        req['t'] = listenSpec.tag;
      }
      req[/*hash*/'h'] = listenSpec.hashFn();
      this.sendRequest(action, req, function (message) {
        var payload = message[/*data*/'d'];
        var status = message[/*status*/'s'];
        // print warnings in any case...
        PersistentConnection.warnOnListenWarnings_(payload, query);
        var currentListenSpec = _this22.listens.get(pathString) && _this22.listens.get(pathString).get(queryId);
        // only trigger actions if the listen hasn't been removed and readded
        if (currentListenSpec === listenSpec) {
          _this22.log_('listen response', message);
          if (status !== 'ok') {
            _this22.removeListen_(pathString, queryId);
          }
          if (listenSpec.onComplete) {
            listenSpec.onComplete(status, payload);
          }
        }
      });
    }
  }, {
    key: "refreshAuthToken",
    value: function refreshAuthToken(token) {
      this.authToken_ = token;
      this.log_('Auth token refreshed');
      if (this.authToken_) {
        this.tryAuth();
      } else {
        //If we're connected we want to let the server know to unauthenticate us. If we're not connected, simply delete
        //the credential so we dont become authenticated next time we connect.
        if (this.connected_) {
          this.sendRequest('unauth', {}, function () {});
        }
      }
      this.reduceReconnectDelayIfAdminCredential_(token);
    }
  }, {
    key: "reduceReconnectDelayIfAdminCredential_",
    value: function reduceReconnectDelayIfAdminCredential_(credential) {
      // NOTE: This isn't intended to be bulletproof (a malicious developer can always just modify the client).
      // Additionally, we don't bother resetting the max delay back to the default if auth fails / expires.
      var isFirebaseSecret = credential && credential.length === 40;
      if (isFirebaseSecret || (0, _util.isAdmin)(credential)) {
        this.log_('Admin auth credential detected.  Reducing max reconnect time.');
        this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
      }
    }
  }, {
    key: "refreshAppCheckToken",
    value: function refreshAppCheckToken(token) {
      this.appCheckToken_ = token;
      this.log_('App check token refreshed');
      if (this.appCheckToken_) {
        this.tryAppCheck();
      } else {
        //If we're connected we want to let the server know to unauthenticate us.
        //If we're not connected, simply delete the credential so we dont become
        // authenticated next time we connect.
        if (this.connected_) {
          this.sendRequest('unappeck', {}, function () {});
        }
      }
    }
    /**
     * Attempts to authenticate with the given credentials. If the authentication attempt fails, it's triggered like
     * a auth revoked (the connection is closed).
     */
  }, {
    key: "tryAuth",
    value: function tryAuth() {
      var _this23 = this;
      if (this.connected_ && this.authToken_) {
        var token = this.authToken_;
        var authMethod = (0, _util.isValidFormat)(token) ? 'auth' : 'gauth';
        var requestData = {
          cred: token
        };
        if (this.authOverride_ === null) {
          requestData['noauth'] = true;
        } else if (_typeof(this.authOverride_) === 'object') {
          requestData['authvar'] = this.authOverride_;
        }
        this.sendRequest(authMethod, requestData, function (res) {
          var status = res[/*status*/'s'];
          var data = res[/*data*/'d'] || 'error';
          if (_this23.authToken_ === token) {
            if (status === 'ok') {
              _this23.invalidAuthTokenCount_ = 0;
            } else {
              // Triggers reconnect and force refresh for auth token
              _this23.onAuthRevoked_(status, data);
            }
          }
        });
      }
    }
    /**
     * Attempts to authenticate with the given token. If the authentication
     * attempt fails, it's triggered like the token was revoked (the connection is
     * closed).
     */
  }, {
    key: "tryAppCheck",
    value: function tryAppCheck() {
      var _this24 = this;
      if (this.connected_ && this.appCheckToken_) {
        this.sendRequest('appcheck', {
          'token': this.appCheckToken_
        }, function (res) {
          var status = res[/*status*/'s'];
          var data = res[/*data*/'d'] || 'error';
          if (status === 'ok') {
            _this24.invalidAppCheckTokenCount_ = 0;
          } else {
            _this24.onAppCheckRevoked_(status, data);
          }
        });
      }
    }
    /**
     * @inheritDoc
     */
  }, {
    key: "unlisten",
    value: function unlisten(query, tag) {
      var pathString = query._path.toString();
      var queryId = query._queryIdentifier;
      this.log_('Unlisten called for ' + pathString + ' ' + queryId);
      (0, _util.assert)(query._queryParams.isDefault() || !query._queryParams.loadsAllData(), 'unlisten() called for non-default but complete query');
      var listen = this.removeListen_(pathString, queryId);
      if (listen && this.connected_) {
        this.sendUnlisten_(pathString, queryId, query._queryObject, tag);
      }
    }
  }, {
    key: "sendUnlisten_",
    value: function sendUnlisten_(pathString, queryId, queryObj, tag) {
      this.log_('Unlisten on ' + pathString + ' for ' + queryId);
      var req = {
        /*path*/p: pathString
      };
      var action = 'n';
      // Only bother sending queryId if it's non-default.
      if (tag) {
        req['q'] = queryObj;
        req['t'] = tag;
      }
      this.sendRequest(action, req);
    }
  }, {
    key: "onDisconnectPut",
    value: function onDisconnectPut(pathString, data, onComplete) {
      this.initConnection_();
      if (this.connected_) {
        this.sendOnDisconnect_('o', pathString, data, onComplete);
      } else {
        this.onDisconnectRequestQueue_.push({
          pathString: pathString,
          action: 'o',
          data: data,
          onComplete: onComplete
        });
      }
    }
  }, {
    key: "onDisconnectMerge",
    value: function onDisconnectMerge(pathString, data, onComplete) {
      this.initConnection_();
      if (this.connected_) {
        this.sendOnDisconnect_('om', pathString, data, onComplete);
      } else {
        this.onDisconnectRequestQueue_.push({
          pathString: pathString,
          action: 'om',
          data: data,
          onComplete: onComplete
        });
      }
    }
  }, {
    key: "onDisconnectCancel",
    value: function onDisconnectCancel(pathString, onComplete) {
      this.initConnection_();
      if (this.connected_) {
        this.sendOnDisconnect_('oc', pathString, null, onComplete);
      } else {
        this.onDisconnectRequestQueue_.push({
          pathString: pathString,
          action: 'oc',
          data: null,
          onComplete: onComplete
        });
      }
    }
  }, {
    key: "sendOnDisconnect_",
    value: function sendOnDisconnect_(action, pathString, data, onComplete) {
      var request = {
        /*path*/p: pathString,
        /*data*/d: data
      };
      this.log_('onDisconnect ' + action, request);
      this.sendRequest(action, request, function (response) {
        if (onComplete) {
          setTimeout(function () {
            onComplete(response[/*status*/'s'], response[/* data */'d']);
          }, Math.floor(0));
        }
      });
    }
  }, {
    key: "put",
    value: function put(pathString, data, onComplete, hash) {
      this.putInternal('p', pathString, data, onComplete, hash);
    }
  }, {
    key: "merge",
    value: function merge(pathString, data, onComplete, hash) {
      this.putInternal('m', pathString, data, onComplete, hash);
    }
  }, {
    key: "putInternal",
    value: function putInternal(action, pathString, data, onComplete, hash) {
      this.initConnection_();
      var request = {
        /*path*/p: pathString,
        /*data*/d: data
      };
      if (hash !== undefined) {
        request[/*hash*/'h'] = hash;
      }
      // TODO: Only keep track of the most recent put for a given path?
      this.outstandingPuts_.push({
        action: action,
        request: request,
        onComplete: onComplete
      });
      this.outstandingPutCount_++;
      var index = this.outstandingPuts_.length - 1;
      if (this.connected_) {
        this.sendPut_(index);
      } else {
        this.log_('Buffering put: ' + pathString);
      }
    }
  }, {
    key: "sendPut_",
    value: function sendPut_(index) {
      var _this25 = this;
      var action = this.outstandingPuts_[index].action;
      var request = this.outstandingPuts_[index].request;
      var onComplete = this.outstandingPuts_[index].onComplete;
      this.outstandingPuts_[index].queued = this.connected_;
      this.sendRequest(action, request, function (message) {
        _this25.log_(action + ' response', message);
        delete _this25.outstandingPuts_[index];
        _this25.outstandingPutCount_--;
        // Clean up array occasionally.
        if (_this25.outstandingPutCount_ === 0) {
          _this25.outstandingPuts_ = [];
        }
        if (onComplete) {
          onComplete(message[/*status*/'s'], message[/* data */'d']);
        }
      });
    }
  }, {
    key: "reportStats",
    value: function reportStats(stats) {
      var _this26 = this;
      // If we're not connected, we just drop the stats.
      if (this.connected_) {
        var request = {
          /*counters*/c: stats
        };
        this.log_('reportStats', request);
        this.sendRequest(/*stats*/'s', request, function (result) {
          var status = result[/*status*/'s'];
          if (status !== 'ok') {
            var errorReason = result[/* data */'d'];
            _this26.log_('reportStats', 'Error sending stats: ' + errorReason);
          }
        });
      }
    }
  }, {
    key: "onDataMessage_",
    value: function onDataMessage_(message) {
      if ('r' in message) {
        // this is a response
        this.log_('from server: ' + (0, _util.stringify)(message));
        var reqNum = message['r'];
        var onResponse = this.requestCBHash_[reqNum];
        if (onResponse) {
          delete this.requestCBHash_[reqNum];
          onResponse(message[/*body*/'b']);
        }
      } else if ('error' in message) {
        throw 'A server-side error has occurred: ' + message['error'];
      } else if ('a' in message) {
        // a and b are action and body, respectively
        this.onDataPush_(message['a'], message['b']);
      }
    }
  }, {
    key: "onDataPush_",
    value: function onDataPush_(action, body) {
      this.log_('handleServerMessage', action, body);
      if (action === 'd') {
        this.onDataUpdate_(body[/*path*/'p'], body[/*data*/'d'], /*isMerge*/false, body['t']);
      } else if (action === 'm') {
        this.onDataUpdate_(body[/*path*/'p'], body[/*data*/'d'], /*isMerge=*/true, body['t']);
      } else if (action === 'c') {
        this.onListenRevoked_(body[/*path*/'p'], body[/*query*/'q']);
      } else if (action === 'ac') {
        this.onAuthRevoked_(body[/*status code*/'s'], body[/* explanation */'d']);
      } else if (action === 'apc') {
        this.onAppCheckRevoked_(body[/*status code*/'s'], body[/* explanation */'d']);
      } else if (action === 'sd') {
        this.onSecurityDebugPacket_(body);
      } else {
        error('Unrecognized action received from server: ' + (0, _util.stringify)(action) + '\nAre you using the latest client?');
      }
    }
  }, {
    key: "onReady_",
    value: function onReady_(timestamp, sessionId) {
      this.log_('connection ready');
      this.connected_ = true;
      this.lastConnectionEstablishedTime_ = new Date().getTime();
      this.handleTimestamp_(timestamp);
      this.lastSessionId = sessionId;
      if (this.firstConnection_) {
        this.sendConnectStats_();
      }
      this.restoreState_();
      this.firstConnection_ = false;
      this.onConnectStatus_(true);
    }
  }, {
    key: "scheduleConnect_",
    value: function scheduleConnect_(timeout) {
      var _this27 = this;
      (0, _util.assert)(!this.realtime_, "Scheduling a connect when we're already connected/ing?");
      if (this.establishConnectionTimer_) {
        clearTimeout(this.establishConnectionTimer_);
      }
      // NOTE: Even when timeout is 0, it's important to do a setTimeout to work around an infuriating "Security Error" in
      // Firefox when trying to write to our long-polling iframe in some scenarios (e.g. Forge or our unit tests).
      this.establishConnectionTimer_ = setTimeout(function () {
        _this27.establishConnectionTimer_ = null;
        _this27.establishConnection_();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, Math.floor(timeout));
    }
  }, {
    key: "initConnection_",
    value: function initConnection_() {
      if (!this.realtime_ && this.firstConnection_) {
        this.scheduleConnect_(0);
      }
    }
  }, {
    key: "onVisible_",
    value: function onVisible_(visible) {
      // NOTE: Tabbing away and back to a window will defeat our reconnect backoff, but I think that's fine.
      if (visible && !this.visible_ && this.reconnectDelay_ === this.maxReconnectDelay_) {
        this.log_('Window became visible.  Reducing delay.');
        this.reconnectDelay_ = RECONNECT_MIN_DELAY;
        if (!this.realtime_) {
          this.scheduleConnect_(0);
        }
      }
      this.visible_ = visible;
    }
  }, {
    key: "onOnline_",
    value: function onOnline_(online) {
      if (online) {
        this.log_('Browser went online.');
        this.reconnectDelay_ = RECONNECT_MIN_DELAY;
        if (!this.realtime_) {
          this.scheduleConnect_(0);
        }
      } else {
        this.log_('Browser went offline.  Killing connection.');
        if (this.realtime_) {
          this.realtime_.close();
        }
      }
    }
  }, {
    key: "onRealtimeDisconnect_",
    value: function onRealtimeDisconnect_() {
      this.log_('data client disconnected');
      this.connected_ = false;
      this.realtime_ = null;
      // Since we don't know if our sent transactions succeeded or not, we need to cancel them.
      this.cancelSentTransactions_();
      // Clear out the pending requests.
      this.requestCBHash_ = {};
      if (this.shouldReconnect_()) {
        if (!this.visible_) {
          this.log_("Window isn't visible.  Delaying reconnect.");
          this.reconnectDelay_ = this.maxReconnectDelay_;
          this.lastConnectionAttemptTime_ = new Date().getTime();
        } else if (this.lastConnectionEstablishedTime_) {
          // If we've been connected long enough, reset reconnect delay to minimum.
          var timeSinceLastConnectSucceeded = new Date().getTime() - this.lastConnectionEstablishedTime_;
          if (timeSinceLastConnectSucceeded > RECONNECT_DELAY_RESET_TIMEOUT) {
            this.reconnectDelay_ = RECONNECT_MIN_DELAY;
          }
          this.lastConnectionEstablishedTime_ = null;
        }
        var timeSinceLastConnectAttempt = new Date().getTime() - this.lastConnectionAttemptTime_;
        var reconnectDelay = Math.max(0, this.reconnectDelay_ - timeSinceLastConnectAttempt);
        reconnectDelay = Math.random() * reconnectDelay;
        this.log_('Trying to reconnect in ' + reconnectDelay + 'ms');
        this.scheduleConnect_(reconnectDelay);
        // Adjust reconnect delay for next time.
        this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, this.reconnectDelay_ * RECONNECT_DELAY_MULTIPLIER);
      }
      this.onConnectStatus_(false);
    }
  }, {
    key: "establishConnection_",
    value: function () {
      var _establishConnection_ = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this28 = this;
        var onDataMessage, onReady, _onDisconnect, connId, lastSessionId, canceled, connection, closeFn, sendRequestFn, forceRefresh, _yield$Promise$all, _yield$Promise$all2, authToken, appCheckToken;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!this.shouldReconnect_()) {
                _context.next = 30;
                break;
              }
              this.log_('Making a connection attempt');
              this.lastConnectionAttemptTime_ = new Date().getTime();
              this.lastConnectionEstablishedTime_ = null;
              onDataMessage = this.onDataMessage_.bind(this);
              onReady = this.onReady_.bind(this);
              _onDisconnect = this.onRealtimeDisconnect_.bind(this);
              connId = this.id + ':' + PersistentConnection.nextConnectionId_++;
              lastSessionId = this.lastSessionId;
              canceled = false;
              connection = null;
              closeFn = function closeFn() {
                if (connection) {
                  connection.close();
                } else {
                  canceled = true;
                  _onDisconnect();
                }
              };
              sendRequestFn = function sendRequestFn(msg) {
                (0, _util.assert)(connection, "sendRequest call when we're not connected not allowed.");
                connection.sendRequest(msg);
              };
              this.realtime_ = {
                close: closeFn,
                sendRequest: sendRequestFn
              };
              forceRefresh = this.forceTokenRefresh_;
              this.forceTokenRefresh_ = false;
              _context.prev = 16;
              _context.next = 19;
              return Promise.all([this.authTokenProvider_.getToken(forceRefresh), this.appCheckTokenProvider_.getToken(forceRefresh)]);
            case 19:
              _yield$Promise$all = _context.sent;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              authToken = _yield$Promise$all2[0];
              appCheckToken = _yield$Promise$all2[1];
              if (!canceled) {
                log('getToken() completed. Creating connection.');
                this.authToken_ = authToken && authToken.accessToken;
                this.appCheckToken_ = appCheckToken && appCheckToken.token;
                connection = new Connection(connId, this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, onDataMessage, onReady, _onDisconnect, /* onKill= */function (reason) {
                  warn(reason + ' (' + _this28.repoInfo_.toString() + ')');
                  _this28.interrupt(SERVER_KILL_INTERRUPT_REASON);
                }, lastSessionId);
              } else {
                log('getToken() completed but was canceled');
              }
              _context.next = 30;
              break;
            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](16);
              this.log_('Failed to get token: ' + _context.t0);
              if (!canceled) {
                if (this.repoInfo_.nodeAdmin) {
                  // This may be a critical error for the Admin Node.js SDK, so log a warning.
                  // But getToken() may also just have temporarily failed, so we still want to
                  // continue retrying.
                  warn(_context.t0);
                }
                closeFn();
              }
            case 30:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[16, 26]]);
      }));
      function establishConnection_() {
        return _establishConnection_.apply(this, arguments);
      }
      return establishConnection_;
    }()
  }, {
    key: "interrupt",
    value: function interrupt(reason) {
      log('Interrupting connection for reason: ' + reason);
      this.interruptReasons_[reason] = true;
      if (this.realtime_) {
        this.realtime_.close();
      } else {
        if (this.establishConnectionTimer_) {
          clearTimeout(this.establishConnectionTimer_);
          this.establishConnectionTimer_ = null;
        }
        if (this.connected_) {
          this.onRealtimeDisconnect_();
        }
      }
    }
  }, {
    key: "resume",
    value: function resume(reason) {
      log('Resuming connection for reason: ' + reason);
      delete this.interruptReasons_[reason];
      if ((0, _util.isEmpty)(this.interruptReasons_)) {
        this.reconnectDelay_ = RECONNECT_MIN_DELAY;
        if (!this.realtime_) {
          this.scheduleConnect_(0);
        }
      }
    }
  }, {
    key: "handleTimestamp_",
    value: function handleTimestamp_(timestamp) {
      var delta = timestamp - new Date().getTime();
      this.onServerInfoUpdate_({
        serverTimeOffset: delta
      });
    }
  }, {
    key: "cancelSentTransactions_",
    value: function cancelSentTransactions_() {
      for (var i = 0; i < this.outstandingPuts_.length; i++) {
        var put = this.outstandingPuts_[i];
        if (put && /*hash*/'h' in put.request && put.queued) {
          if (put.onComplete) {
            put.onComplete('disconnect');
          }
          delete this.outstandingPuts_[i];
          this.outstandingPutCount_--;
        }
      }
      // Clean up array occasionally.
      if (this.outstandingPutCount_ === 0) {
        this.outstandingPuts_ = [];
      }
    }
  }, {
    key: "onListenRevoked_",
    value: function onListenRevoked_(pathString, query) {
      // Remove the listen and manufacture a "permission_denied" error for the failed listen.
      var queryId;
      if (!query) {
        queryId = 'default';
      } else {
        queryId = query.map(function (q) {
          return _ObjectToUniqueKey(q);
        }).join('$');
      }
      var listen = this.removeListen_(pathString, queryId);
      if (listen && listen.onComplete) {
        listen.onComplete('permission_denied');
      }
    }
  }, {
    key: "removeListen_",
    value: function removeListen_(pathString, queryId) {
      var normalizedPathString = new Path(pathString).toString(); // normalize path.
      var listen;
      if (this.listens.has(normalizedPathString)) {
        var _map = this.listens.get(normalizedPathString);
        listen = _map.get(queryId);
        _map.delete(queryId);
        if (_map.size === 0) {
          this.listens.delete(normalizedPathString);
        }
      } else {
        // all listens for this path has already been removed
        listen = undefined;
      }
      return listen;
    }
  }, {
    key: "onAuthRevoked_",
    value: function onAuthRevoked_(statusCode, explanation) {
      log('Auth token revoked: ' + statusCode + '/' + explanation);
      this.authToken_ = null;
      this.forceTokenRefresh_ = true;
      this.realtime_.close();
      if (statusCode === 'invalid_token' || statusCode === 'permission_denied') {
        // We'll wait a couple times before logging the warning / increasing the
        // retry period since oauth tokens will report as "invalid" if they're
        // just expired. Plus there may be transient issues that resolve themselves.
        this.invalidAuthTokenCount_++;
        if (this.invalidAuthTokenCount_ >= INVALID_TOKEN_THRESHOLD) {
          // Set a long reconnect delay because recovery is unlikely
          this.reconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
          // Notify the auth token provider that the token is invalid, which will log
          // a warning
          this.authTokenProvider_.notifyForInvalidToken();
        }
      }
    }
  }, {
    key: "onAppCheckRevoked_",
    value: function onAppCheckRevoked_(statusCode, explanation) {
      log('App check token revoked: ' + statusCode + '/' + explanation);
      this.appCheckToken_ = null;
      this.forceTokenRefresh_ = true;
      // Note: We don't close the connection as the developer may not have
      // enforcement enabled. The backend closes connections with enforcements.
      if (statusCode === 'invalid_token' || statusCode === 'permission_denied') {
        // We'll wait a couple times before logging the warning / increasing the
        // retry period since oauth tokens will report as "invalid" if they're
        // just expired. Plus there may be transient issues that resolve themselves.
        this.invalidAppCheckTokenCount_++;
        if (this.invalidAppCheckTokenCount_ >= INVALID_TOKEN_THRESHOLD) {
          this.appCheckTokenProvider_.notifyForInvalidToken();
        }
      }
    }
  }, {
    key: "onSecurityDebugPacket_",
    value: function onSecurityDebugPacket_(body) {
      if (this.securityDebugCallback_) {
        this.securityDebugCallback_(body);
      } else {
        if ('msg' in body) {
          console.log('FIREBASE: ' + body['msg'].replace('\n', '\nFIREBASE: '));
        }
      }
    }
  }, {
    key: "restoreState_",
    value: function restoreState_() {
      //Re-authenticate ourselves if we have a credential stored.
      this.tryAuth();
      this.tryAppCheck();
      // Puts depend on having received the corresponding data update from the server before they complete, so we must
      // make sure to send listens before puts.
      var _iterator2 = _createForOfIteratorHelper(this.listens.values()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var queries = _step2.value;
          var _iterator3 = _createForOfIteratorHelper(queries.values()),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var listenSpec = _step3.value;
              this.sendListen_(listenSpec);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      for (var i = 0; i < this.outstandingPuts_.length; i++) {
        if (this.outstandingPuts_[i]) {
          this.sendPut_(i);
        }
      }
      while (this.onDisconnectRequestQueue_.length) {
        var request = this.onDisconnectRequestQueue_.shift();
        this.sendOnDisconnect_(request.action, request.pathString, request.data, request.onComplete);
      }
      for (var _i3 = 0; _i3 < this.outstandingGets_.length; _i3++) {
        if (this.outstandingGets_[_i3]) {
          this.sendGet_(_i3);
        }
      }
    }
    /**
     * Sends client stats for first connection
     */
  }, {
    key: "sendConnectStats_",
    value: function sendConnectStats_() {
      var stats = {};
      var clientName = 'js';
      if ((0, _util.isNodeSdk)()) {
        if (this.repoInfo_.nodeAdmin) {
          clientName = 'admin_node';
        } else {
          clientName = 'node';
        }
      }
      stats['sdk.' + clientName + '.' + SDK_VERSION.replace(/\./g, '-')] = 1;
      if ((0, _util.isMobileCordova)()) {
        stats['framework.cordova'] = 1;
      } else if ((0, _util.isReactNative)()) {
        stats['framework.reactnative'] = 1;
      }
      this.reportStats(stats);
    }
  }, {
    key: "shouldReconnect_",
    value: function shouldReconnect_() {
      var online = OnlineMonitor.getInstance().currentlyOnline();
      return (0, _util.isEmpty)(this.interruptReasons_) && online;
    }
  }], [{
    key: "warnOnListenWarnings_",
    value: function warnOnListenWarnings_(payload, query) {
      if (payload && _typeof(payload) === 'object' && (0, _util.contains)(payload, 'w')) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var warnings = (0, _util.safeGet)(payload, 'w');
        if (Array.isArray(warnings) && ~warnings.indexOf('no_index')) {
          var indexSpec = '".indexOn": "' + query._queryParams.getIndex().toString() + '"';
          var indexPath = query._path.toString();
          warn("Using an unspecified index. Your data will be downloaded and " + "filtered on the client. Consider adding ".concat(indexSpec, " at ") + "".concat(indexPath, " to your security rules for better performance."));
        }
      }
    }
  }]);
}(ServerActions);
PersistentConnection.nextPersistentConnectionId_ = 0;
/**
 * Counter for number of connections created. Mainly used for tagging in the logs
 */
PersistentConnection.nextConnectionId_ = 0;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var NamedNode = /*#__PURE__*/function () {
  function NamedNode(name, node) {
    _classCallCheck(this, NamedNode);
    this.name = name;
    this.node = node;
  }
  return _createClass(NamedNode, null, [{
    key: "Wrap",
    value: function Wrap(name, node) {
      return new NamedNode(name, node);
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Index = /*#__PURE__*/function () {
  function Index() {
    _classCallCheck(this, Index);
  }
  return _createClass(Index, [{
    key: "getCompare",
    value:
    /**
     * @returns A standalone comparison function for
     * this index
     */
    function getCompare() {
      return this.compare.bind(this);
    }
    /**
     * Given a before and after value for a node, determine if the indexed value has changed. Even if they are different,
     * it's possible that the changes are isolated to parts of the snapshot that are not indexed.
     *
     *
     * @returns True if the portion of the snapshot being indexed changed between oldNode and newNode
     */
  }, {
    key: "indexedValueChanged",
    value: function indexedValueChanged(oldNode, newNode) {
      var oldWrapped = new NamedNode(MIN_NAME, oldNode);
      var newWrapped = new NamedNode(MIN_NAME, newNode);
      return this.compare(oldWrapped, newWrapped) !== 0;
    }
    /**
     * @returns a node wrapper that will sort equal to or less than
     * any other node wrapper, using this index
     */
  }, {
    key: "minPost",
    value: function minPost() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return NamedNode.MIN;
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __EMPTY_NODE;
var KeyIndex = /*#__PURE__*/function (_Index) {
  function KeyIndex() {
    _classCallCheck(this, KeyIndex);
    return _callSuper(this, KeyIndex, arguments);
  }
  _inherits(KeyIndex, _Index);
  return _createClass(KeyIndex, [{
    key: "compare",
    value: function compare(a, b) {
      return nameCompare(a.name, b.name);
    }
  }, {
    key: "isDefinedOn",
    value: function isDefinedOn(node) {
      // We could probably return true here (since every node has a key), but it's never called
      // so just leaving unimplemented for now.
      throw (0, _util.assertionError)('KeyIndex.isDefinedOn not expected to be called.');
    }
  }, {
    key: "indexedValueChanged",
    value: function indexedValueChanged(oldNode, newNode) {
      return false; // The key for a node never changes.
    }
  }, {
    key: "minPost",
    value: function minPost() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return NamedNode.MIN;
    }
  }, {
    key: "maxPost",
    value: function maxPost() {
      // TODO: This should really be created once and cached in a static property, but
      // NamedNode isn't defined yet, so I can't use it in a static.  Bleh.
      return new NamedNode(MAX_NAME, __EMPTY_NODE);
    }
  }, {
    key: "makePost",
    value: function makePost(indexValue, name) {
      (0, _util.assert)(typeof indexValue === 'string', 'KeyIndex indexValue must always be a string.');
      // We just use empty node, but it'll never be compared, since our comparator only looks at name.
      return new NamedNode(indexValue, __EMPTY_NODE);
    }
    /**
     * @returns String representation for inclusion in a query spec
     */
  }, {
    key: "toString",
    value: function toString() {
      return '.key';
    }
  }], [{
    key: "__EMPTY_NODE",
    get: function get() {
      return __EMPTY_NODE;
    },
    set: function set(val) {
      __EMPTY_NODE = val;
    }
  }]);
}(Index);
var KEY_INDEX = new KeyIndex();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An iterator over an LLRBNode.
 */
var SortedMapIterator = /*#__PURE__*/function () {
  /**
   * @param node - Node to iterate.
   * @param isReverse_ - Whether or not to iterate in reverse
   */
  function SortedMapIterator(node, startKey, comparator, isReverse_) {
    var resultGenerator_ = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    _classCallCheck(this, SortedMapIterator);
    this.isReverse_ = isReverse_;
    this.resultGenerator_ = resultGenerator_;
    this.nodeStack_ = [];
    var cmp = 1;
    while (!node.isEmpty()) {
      node = node;
      cmp = startKey ? comparator(node.key, startKey) : 1;
      // flip the comparison if we're going in reverse
      if (isReverse_) {
        cmp *= -1;
      }
      if (cmp < 0) {
        // This node is less than our start key. ignore it
        if (this.isReverse_) {
          node = node.left;
        } else {
          node = node.right;
        }
      } else if (cmp === 0) {
        // This node is exactly equal to our start key. Push it on the stack, but stop iterating;
        this.nodeStack_.push(node);
        break;
      } else {
        // This node is greater than our start key, add it to the stack and move to the next one
        this.nodeStack_.push(node);
        if (this.isReverse_) {
          node = node.right;
        } else {
          node = node.left;
        }
      }
    }
  }
  return _createClass(SortedMapIterator, [{
    key: "getNext",
    value: function getNext() {
      if (this.nodeStack_.length === 0) {
        return null;
      }
      var node = this.nodeStack_.pop();
      var result;
      if (this.resultGenerator_) {
        result = this.resultGenerator_(node.key, node.value);
      } else {
        result = {
          key: node.key,
          value: node.value
        };
      }
      if (this.isReverse_) {
        node = node.left;
        while (!node.isEmpty()) {
          this.nodeStack_.push(node);
          node = node.right;
        }
      } else {
        node = node.right;
        while (!node.isEmpty()) {
          this.nodeStack_.push(node);
          node = node.left;
        }
      }
      return result;
    }
  }, {
    key: "hasNext",
    value: function hasNext() {
      return this.nodeStack_.length > 0;
    }
  }, {
    key: "peek",
    value: function peek() {
      if (this.nodeStack_.length === 0) {
        return null;
      }
      var node = this.nodeStack_[this.nodeStack_.length - 1];
      if (this.resultGenerator_) {
        return this.resultGenerator_(node.key, node.value);
      } else {
        return {
          key: node.key,
          value: node.value
        };
      }
    }
  }]);
}();
/**
 * Represents a node in a Left-leaning Red-Black tree.
 */
var LLRBNode = /*#__PURE__*/function () {
  /**
   * @param key - Key associated with this node.
   * @param value - Value associated with this node.
   * @param color - Whether this node is red.
   * @param left - Left child.
   * @param right - Right child.
   */
  function LLRBNode(key, value, color, left, right) {
    _classCallCheck(this, LLRBNode);
    this.key = key;
    this.value = value;
    this.color = color != null ? color : LLRBNode.RED;
    this.left = left != null ? left : SortedMap.EMPTY_NODE;
    this.right = right != null ? right : SortedMap.EMPTY_NODE;
  }
  /**
   * Returns a copy of the current node, optionally replacing pieces of it.
   *
   * @param key - New key for the node, or null.
   * @param value - New value for the node, or null.
   * @param color - New color for the node, or null.
   * @param left - New left child for the node, or null.
   * @param right - New right child for the node, or null.
   * @returns The node copy.
   */
  return _createClass(LLRBNode, [{
    key: "copy",
    value: function copy(key, value, color, left, right) {
      return new LLRBNode(key != null ? key : this.key, value != null ? value : this.value, color != null ? color : this.color, left != null ? left : this.left, right != null ? right : this.right);
    }
    /**
     * @returns The total number of nodes in the tree.
     */
  }, {
    key: "count",
    value: function count() {
      return this.left.count() + 1 + this.right.count();
    }
    /**
     * @returns True if the tree is empty.
     */
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return false;
    }
    /**
     * Traverses the tree in key order and calls the specified action function
     * for each node.
     *
     * @param action - Callback function to be called for each
     *   node.  If it returns true, traversal is aborted.
     * @returns The first truthy value returned by action, or the last falsey
     *   value returned by action
     */
  }, {
    key: "inorderTraversal",
    value: function inorderTraversal(action) {
      return this.left.inorderTraversal(action) || !!action(this.key, this.value) || this.right.inorderTraversal(action);
    }
    /**
     * Traverses the tree in reverse key order and calls the specified action function
     * for each node.
     *
     * @param action - Callback function to be called for each
     * node.  If it returns true, traversal is aborted.
     * @returns True if traversal was aborted.
     */
  }, {
    key: "reverseTraversal",
    value: function reverseTraversal(action) {
      return this.right.reverseTraversal(action) || action(this.key, this.value) || this.left.reverseTraversal(action);
    }
    /**
     * @returns The minimum node in the tree.
     */
  }, {
    key: "min_",
    value: function min_() {
      if (this.left.isEmpty()) {
        return this;
      } else {
        return this.left.min_();
      }
    }
    /**
     * @returns The maximum key in the tree.
     */
  }, {
    key: "minKey",
    value: function minKey() {
      return this.min_().key;
    }
    /**
     * @returns The maximum key in the tree.
     */
  }, {
    key: "maxKey",
    value: function maxKey() {
      if (this.right.isEmpty()) {
        return this.key;
      } else {
        return this.right.maxKey();
      }
    }
    /**
     * @param key - Key to insert.
     * @param value - Value to insert.
     * @param comparator - Comparator.
     * @returns New tree, with the key/value added.
     */
  }, {
    key: "insert",
    value: function insert(key, value, comparator) {
      var n = this;
      var cmp = comparator(key, n.key);
      if (cmp < 0) {
        n = n.copy(null, null, null, n.left.insert(key, value, comparator), null);
      } else if (cmp === 0) {
        n = n.copy(null, value, null, null, null);
      } else {
        n = n.copy(null, null, null, null, n.right.insert(key, value, comparator));
      }
      return n.fixUp_();
    }
    /**
     * @returns New tree, with the minimum key removed.
     */
  }, {
    key: "removeMin_",
    value: function removeMin_() {
      if (this.left.isEmpty()) {
        return SortedMap.EMPTY_NODE;
      }
      var n = this;
      if (!n.left.isRed_() && !n.left.left.isRed_()) {
        n = n.moveRedLeft_();
      }
      n = n.copy(null, null, null, n.left.removeMin_(), null);
      return n.fixUp_();
    }
    /**
     * @param key - The key of the item to remove.
     * @param comparator - Comparator.
     * @returns New tree, with the specified item removed.
     */
  }, {
    key: "remove",
    value: function remove(key, comparator) {
      var n, smallest;
      n = this;
      if (comparator(key, n.key) < 0) {
        if (!n.left.isEmpty() && !n.left.isRed_() && !n.left.left.isRed_()) {
          n = n.moveRedLeft_();
        }
        n = n.copy(null, null, null, n.left.remove(key, comparator), null);
      } else {
        if (n.left.isRed_()) {
          n = n.rotateRight_();
        }
        if (!n.right.isEmpty() && !n.right.isRed_() && !n.right.left.isRed_()) {
          n = n.moveRedRight_();
        }
        if (comparator(key, n.key) === 0) {
          if (n.right.isEmpty()) {
            return SortedMap.EMPTY_NODE;
          } else {
            smallest = n.right.min_();
            n = n.copy(smallest.key, smallest.value, null, null, n.right.removeMin_());
          }
        }
        n = n.copy(null, null, null, null, n.right.remove(key, comparator));
      }
      return n.fixUp_();
    }
    /**
     * @returns Whether this is a RED node.
     */
  }, {
    key: "isRed_",
    value: function isRed_() {
      return this.color;
    }
    /**
     * @returns New tree after performing any needed rotations.
     */
  }, {
    key: "fixUp_",
    value: function fixUp_() {
      var n = this;
      if (n.right.isRed_() && !n.left.isRed_()) {
        n = n.rotateLeft_();
      }
      if (n.left.isRed_() && n.left.left.isRed_()) {
        n = n.rotateRight_();
      }
      if (n.left.isRed_() && n.right.isRed_()) {
        n = n.colorFlip_();
      }
      return n;
    }
    /**
     * @returns New tree, after moveRedLeft.
     */
  }, {
    key: "moveRedLeft_",
    value: function moveRedLeft_() {
      var n = this.colorFlip_();
      if (n.right.left.isRed_()) {
        n = n.copy(null, null, null, null, n.right.rotateRight_());
        n = n.rotateLeft_();
        n = n.colorFlip_();
      }
      return n;
    }
    /**
     * @returns New tree, after moveRedRight.
     */
  }, {
    key: "moveRedRight_",
    value: function moveRedRight_() {
      var n = this.colorFlip_();
      if (n.left.left.isRed_()) {
        n = n.rotateRight_();
        n = n.colorFlip_();
      }
      return n;
    }
    /**
     * @returns New tree, after rotateLeft.
     */
  }, {
    key: "rotateLeft_",
    value: function rotateLeft_() {
      var nl = this.copy(null, null, LLRBNode.RED, null, this.right.left);
      return this.right.copy(null, null, this.color, nl, null);
    }
    /**
     * @returns New tree, after rotateRight.
     */
  }, {
    key: "rotateRight_",
    value: function rotateRight_() {
      var nr = this.copy(null, null, LLRBNode.RED, this.left.right, null);
      return this.left.copy(null, null, this.color, null, nr);
    }
    /**
     * @returns Newt ree, after colorFlip.
     */
  }, {
    key: "colorFlip_",
    value: function colorFlip_() {
      var left = this.left.copy(null, null, !this.left.color, null, null);
      var right = this.right.copy(null, null, !this.right.color, null, null);
      return this.copy(null, null, !this.color, left, right);
    }
    /**
     * For testing.
     *
     * @returns True if all is well.
     */
  }, {
    key: "checkMaxDepth_",
    value: function checkMaxDepth_() {
      var blackDepth = this.check_();
      return Math.pow(2.0, blackDepth) <= this.count() + 1;
    }
  }, {
    key: "check_",
    value: function check_() {
      if (this.isRed_() && this.left.isRed_()) {
        throw new Error('Red node has red child(' + this.key + ',' + this.value + ')');
      }
      if (this.right.isRed_()) {
        throw new Error('Right child of (' + this.key + ',' + this.value + ') is red');
      }
      var blackDepth = this.left.check_();
      if (blackDepth !== this.right.check_()) {
        throw new Error('Black depths differ');
      } else {
        return blackDepth + (this.isRed_() ? 0 : 1);
      }
    }
  }]);
}();
LLRBNode.RED = true;
LLRBNode.BLACK = false;
/**
 * Represents an empty node (a leaf node in the Red-Black Tree).
 */
var LLRBEmptyNode = /*#__PURE__*/function () {
  function LLRBEmptyNode() {
    _classCallCheck(this, LLRBEmptyNode);
  }
  return _createClass(LLRBEmptyNode, [{
    key: "copy",
    value:
    /**
     * Returns a copy of the current node.
     *
     * @returns The node copy.
     */
    function copy(key, value, color, left, right) {
      return this;
    }
    /**
     * Returns a copy of the tree, with the specified key/value added.
     *
     * @param key - Key to be added.
     * @param value - Value to be added.
     * @param comparator - Comparator.
     * @returns New tree, with item added.
     */
  }, {
    key: "insert",
    value: function insert(key, value, comparator) {
      return new LLRBNode(key, value, null);
    }
    /**
     * Returns a copy of the tree, with the specified key removed.
     *
     * @param key - The key to remove.
     * @param comparator - Comparator.
     * @returns New tree, with item removed.
     */
  }, {
    key: "remove",
    value: function remove(key, comparator) {
      return this;
    }
    /**
     * @returns The total number of nodes in the tree.
     */
  }, {
    key: "count",
    value: function count() {
      return 0;
    }
    /**
     * @returns True if the tree is empty.
     */
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return true;
    }
    /**
     * Traverses the tree in key order and calls the specified action function
     * for each node.
     *
     * @param action - Callback function to be called for each
     * node.  If it returns true, traversal is aborted.
     * @returns True if traversal was aborted.
     */
  }, {
    key: "inorderTraversal",
    value: function inorderTraversal(action) {
      return false;
    }
    /**
     * Traverses the tree in reverse key order and calls the specified action function
     * for each node.
     *
     * @param action - Callback function to be called for each
     * node.  If it returns true, traversal is aborted.
     * @returns True if traversal was aborted.
     */
  }, {
    key: "reverseTraversal",
    value: function reverseTraversal(action) {
      return false;
    }
  }, {
    key: "minKey",
    value: function minKey() {
      return null;
    }
  }, {
    key: "maxKey",
    value: function maxKey() {
      return null;
    }
  }, {
    key: "check_",
    value: function check_() {
      return 0;
    }
    /**
     * @returns Whether this node is red.
     */
  }, {
    key: "isRed_",
    value: function isRed_() {
      return false;
    }
  }]);
}();
/**
 * An immutable sorted map implementation, based on a Left-leaning Red-Black
 * tree.
 */
var SortedMap = /*#__PURE__*/function () {
  /**
   * @param comparator_ - Key comparator.
   * @param root_ - Optional root node for the map.
   */
  function SortedMap(comparator_) {
    var root_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SortedMap.EMPTY_NODE;
    _classCallCheck(this, SortedMap);
    this.comparator_ = comparator_;
    this.root_ = root_;
  }
  /**
   * Returns a copy of the map, with the specified key/value added or replaced.
   * (TODO: We should perhaps rename this method to 'put')
   *
   * @param key - Key to be added.
   * @param value - Value to be added.
   * @returns New map, with item added.
   */
  return _createClass(SortedMap, [{
    key: "insert",
    value: function insert(key, value) {
      return new SortedMap(this.comparator_, this.root_.insert(key, value, this.comparator_).copy(null, null, LLRBNode.BLACK, null, null));
    }
    /**
     * Returns a copy of the map, with the specified key removed.
     *
     * @param key - The key to remove.
     * @returns New map, with item removed.
     */
  }, {
    key: "remove",
    value: function remove(key) {
      return new SortedMap(this.comparator_, this.root_.remove(key, this.comparator_).copy(null, null, LLRBNode.BLACK, null, null));
    }
    /**
     * Returns the value of the node with the given key, or null.
     *
     * @param key - The key to look up.
     * @returns The value of the node with the given key, or null if the
     * key doesn't exist.
     */
  }, {
    key: "get",
    value: function get(key) {
      var cmp;
      var node = this.root_;
      while (!node.isEmpty()) {
        cmp = this.comparator_(key, node.key);
        if (cmp === 0) {
          return node.value;
        } else if (cmp < 0) {
          node = node.left;
        } else if (cmp > 0) {
          node = node.right;
        }
      }
      return null;
    }
    /**
     * Returns the key of the item *before* the specified key, or null if key is the first item.
     * @param key - The key to find the predecessor of
     * @returns The predecessor key.
     */
  }, {
    key: "getPredecessorKey",
    value: function getPredecessorKey(key) {
      var cmp,
        node = this.root_,
        rightParent = null;
      while (!node.isEmpty()) {
        cmp = this.comparator_(key, node.key);
        if (cmp === 0) {
          if (!node.left.isEmpty()) {
            node = node.left;
            while (!node.right.isEmpty()) {
              node = node.right;
            }
            return node.key;
          } else if (rightParent) {
            return rightParent.key;
          } else {
            return null; // first item.
          }
        } else if (cmp < 0) {
          node = node.left;
        } else if (cmp > 0) {
          rightParent = node;
          node = node.right;
        }
      }
      throw new Error('Attempted to find predecessor key for a nonexistent key.  What gives?');
    }
    /**
     * @returns True if the map is empty.
     */
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.root_.isEmpty();
    }
    /**
     * @returns The total number of nodes in the map.
     */
  }, {
    key: "count",
    value: function count() {
      return this.root_.count();
    }
    /**
     * @returns The minimum key in the map.
     */
  }, {
    key: "minKey",
    value: function minKey() {
      return this.root_.minKey();
    }
    /**
     * @returns The maximum key in the map.
     */
  }, {
    key: "maxKey",
    value: function maxKey() {
      return this.root_.maxKey();
    }
    /**
     * Traverses the map in key order and calls the specified action function
     * for each key/value pair.
     *
     * @param action - Callback function to be called
     * for each key/value pair.  If action returns true, traversal is aborted.
     * @returns The first truthy value returned by action, or the last falsey
     *   value returned by action
     */
  }, {
    key: "inorderTraversal",
    value: function inorderTraversal(action) {
      return this.root_.inorderTraversal(action);
    }
    /**
     * Traverses the map in reverse key order and calls the specified action function
     * for each key/value pair.
     *
     * @param action - Callback function to be called
     * for each key/value pair.  If action returns true, traversal is aborted.
     * @returns True if the traversal was aborted.
     */
  }, {
    key: "reverseTraversal",
    value: function reverseTraversal(action) {
      return this.root_.reverseTraversal(action);
    }
    /**
     * Returns an iterator over the SortedMap.
     * @returns The iterator.
     */
  }, {
    key: "getIterator",
    value: function getIterator(resultGenerator) {
      return new SortedMapIterator(this.root_, null, this.comparator_, false, resultGenerator);
    }
  }, {
    key: "getIteratorFrom",
    value: function getIteratorFrom(key, resultGenerator) {
      return new SortedMapIterator(this.root_, key, this.comparator_, false, resultGenerator);
    }
  }, {
    key: "getReverseIteratorFrom",
    value: function getReverseIteratorFrom(key, resultGenerator) {
      return new SortedMapIterator(this.root_, key, this.comparator_, true, resultGenerator);
    }
  }, {
    key: "getReverseIterator",
    value: function getReverseIterator(resultGenerator) {
      return new SortedMapIterator(this.root_, null, this.comparator_, true, resultGenerator);
    }
  }]);
}();
/**
 * Always use the same empty node, to reduce memory.
 */
SortedMap.EMPTY_NODE = new LLRBEmptyNode();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function NAME_ONLY_COMPARATOR(left, right) {
  return nameCompare(left.name, right.name);
}
function NAME_COMPARATOR(left, right) {
  return nameCompare(left, right);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MAX_NODE$2;
function setMaxNode$1(val) {
  MAX_NODE$2 = val;
}
var priorityHashText = function priorityHashText(priority) {
  if (typeof priority === 'number') {
    return 'number:' + doubleToIEEE754String(priority);
  } else {
    return 'string:' + priority;
  }
};
/**
 * Validates that a priority snapshot Node is valid.
 */
var validatePriorityNode = function validatePriorityNode(priorityNode) {
  if (priorityNode.isLeafNode()) {
    var val = priorityNode.val();
    (0, _util.assert)(typeof val === 'string' || typeof val === 'number' || _typeof(val) === 'object' && (0, _util.contains)(val, '.sv'), 'Priority must be a string or number.');
  } else {
    (0, _util.assert)(priorityNode === MAX_NODE$2 || priorityNode.isEmpty(), 'priority of unexpected type.');
  }
  // Don't call getPriority() on MAX_NODE to avoid hitting assertion.
  (0, _util.assert)(priorityNode === MAX_NODE$2 || priorityNode.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.");
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __childrenNodeConstructor;
/**
 * LeafNode is a class for storing leaf nodes in a DataSnapshot.  It
 * implements Node and stores the value of the node (a string,
 * number, or boolean) accessible via getValue().
 */
var LeafNode = /*#__PURE__*/function () {
  /**
   * @param value_ - The value to store in this leaf node. The object type is
   * possible in the event of a deferred value
   * @param priorityNode_ - The priority of this node.
   */
  function LeafNode(value_) {
    var priorityNode_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LeafNode.__childrenNodeConstructor.EMPTY_NODE;
    _classCallCheck(this, LeafNode);
    this.value_ = value_;
    this.priorityNode_ = priorityNode_;
    this.lazyHash_ = null;
    (0, _util.assert)(this.value_ !== undefined && this.value_ !== null, "LeafNode shouldn't be created with null/undefined value.");
    validatePriorityNode(this.priorityNode_);
  }
  /** @inheritDoc */
  return _createClass(LeafNode, [{
    key: "isLeafNode",
    value: function isLeafNode() {
      return true;
    }
    /** @inheritDoc */
  }, {
    key: "getPriority",
    value: function getPriority() {
      return this.priorityNode_;
    }
    /** @inheritDoc */
  }, {
    key: "updatePriority",
    value: function updatePriority(newPriorityNode) {
      return new LeafNode(this.value_, newPriorityNode);
    }
    /** @inheritDoc */
  }, {
    key: "getImmediateChild",
    value: function getImmediateChild(childName) {
      // Hack to treat priority as a regular child
      if (childName === '.priority') {
        return this.priorityNode_;
      } else {
        return LeafNode.__childrenNodeConstructor.EMPTY_NODE;
      }
    }
    /** @inheritDoc */
  }, {
    key: "getChild",
    value: function getChild(path) {
      if (pathIsEmpty(path)) {
        return this;
      } else if (pathGetFront(path) === '.priority') {
        return this.priorityNode_;
      } else {
        return LeafNode.__childrenNodeConstructor.EMPTY_NODE;
      }
    }
  }, {
    key: "hasChild",
    value: function hasChild() {
      return false;
    }
    /** @inheritDoc */
  }, {
    key: "getPredecessorChildName",
    value: function getPredecessorChildName(childName, childNode) {
      return null;
    }
    /** @inheritDoc */
  }, {
    key: "updateImmediateChild",
    value: function updateImmediateChild(childName, newChildNode) {
      if (childName === '.priority') {
        return this.updatePriority(newChildNode);
      } else if (newChildNode.isEmpty() && childName !== '.priority') {
        return this;
      } else {
        return LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(childName, newChildNode).updatePriority(this.priorityNode_);
      }
    }
    /** @inheritDoc */
  }, {
    key: "updateChild",
    value: function updateChild(path, newChildNode) {
      var front = pathGetFront(path);
      if (front === null) {
        return newChildNode;
      } else if (newChildNode.isEmpty() && front !== '.priority') {
        return this;
      } else {
        (0, _util.assert)(front !== '.priority' || pathGetLength(path) === 1, '.priority must be the last token in a path');
        return this.updateImmediateChild(front, LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateChild(pathPopFront(path), newChildNode));
      }
    }
    /** @inheritDoc */
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return false;
    }
    /** @inheritDoc */
  }, {
    key: "numChildren",
    value: function numChildren() {
      return 0;
    }
    /** @inheritDoc */
  }, {
    key: "forEachChild",
    value: function forEachChild(index, action) {
      return false;
    }
  }, {
    key: "val",
    value: function val(exportFormat) {
      if (exportFormat && !this.getPriority().isEmpty()) {
        return {
          '.value': this.getValue(),
          '.priority': this.getPriority().val()
        };
      } else {
        return this.getValue();
      }
    }
    /** @inheritDoc */
  }, {
    key: "hash",
    value: function hash() {
      if (this.lazyHash_ === null) {
        var toHash = '';
        if (!this.priorityNode_.isEmpty()) {
          toHash += 'priority:' + priorityHashText(this.priorityNode_.val()) + ':';
        }
        var type = _typeof(this.value_);
        toHash += type + ':';
        if (type === 'number') {
          toHash += doubleToIEEE754String(this.value_);
        } else {
          toHash += this.value_;
        }
        this.lazyHash_ = sha1(toHash);
      }
      return this.lazyHash_;
    }
    /**
     * Returns the value of the leaf node.
     * @returns The value of the node.
     */
  }, {
    key: "getValue",
    value: function getValue() {
      return this.value_;
    }
  }, {
    key: "compareTo",
    value: function compareTo(other) {
      if (other === LeafNode.__childrenNodeConstructor.EMPTY_NODE) {
        return 1;
      } else if (other instanceof LeafNode.__childrenNodeConstructor) {
        return -1;
      } else {
        (0, _util.assert)(other.isLeafNode(), 'Unknown node type');
        return this.compareToLeafNode_(other);
      }
    }
    /**
     * Comparison specifically for two leaf nodes
     */
  }, {
    key: "compareToLeafNode_",
    value: function compareToLeafNode_(otherLeaf) {
      var otherLeafType = _typeof(otherLeaf.value_);
      var thisLeafType = _typeof(this.value_);
      var otherIndex = LeafNode.VALUE_TYPE_ORDER.indexOf(otherLeafType);
      var thisIndex = LeafNode.VALUE_TYPE_ORDER.indexOf(thisLeafType);
      (0, _util.assert)(otherIndex >= 0, 'Unknown leaf type: ' + otherLeafType);
      (0, _util.assert)(thisIndex >= 0, 'Unknown leaf type: ' + thisLeafType);
      if (otherIndex === thisIndex) {
        // Same type, compare values
        if (thisLeafType === 'object') {
          // Deferred value nodes are all equal, but we should also never get to this point...
          return 0;
        } else {
          // Note that this works because true > false, all others are number or string comparisons
          if (this.value_ < otherLeaf.value_) {
            return -1;
          } else if (this.value_ === otherLeaf.value_) {
            return 0;
          } else {
            return 1;
          }
        }
      } else {
        return thisIndex - otherIndex;
      }
    }
  }, {
    key: "withIndex",
    value: function withIndex() {
      return this;
    }
  }, {
    key: "isIndexed",
    value: function isIndexed() {
      return true;
    }
  }, {
    key: "equals",
    value: function equals(other) {
      if (other === this) {
        return true;
      } else if (other.isLeafNode()) {
        var otherLeaf = other;
        return this.value_ === otherLeaf.value_ && this.priorityNode_.equals(otherLeaf.priorityNode_);
      } else {
        return false;
      }
    }
  }], [{
    key: "__childrenNodeConstructor",
    get: function get() {
      return __childrenNodeConstructor;
    },
    set: function set(val) {
      __childrenNodeConstructor = val;
    }
  }]);
}();
/**
 * The sort order for comparing leaf nodes of different types. If two leaf nodes have
 * the same type, the comparison falls back to their value
 */
LeafNode.VALUE_TYPE_ORDER = ['object', 'boolean', 'number', 'string'];

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var nodeFromJSON$1;
var MAX_NODE$1;
function setNodeFromJSON(val) {
  nodeFromJSON$1 = val;
}
function setMaxNode(val) {
  MAX_NODE$1 = val;
}
var PriorityIndex = /*#__PURE__*/function (_Index2) {
  function PriorityIndex() {
    _classCallCheck(this, PriorityIndex);
    return _callSuper(this, PriorityIndex, arguments);
  }
  _inherits(PriorityIndex, _Index2);
  return _createClass(PriorityIndex, [{
    key: "compare",
    value: function compare(a, b) {
      var aPriority = a.node.getPriority();
      var bPriority = b.node.getPriority();
      var indexCmp = aPriority.compareTo(bPriority);
      if (indexCmp === 0) {
        return nameCompare(a.name, b.name);
      } else {
        return indexCmp;
      }
    }
  }, {
    key: "isDefinedOn",
    value: function isDefinedOn(node) {
      return !node.getPriority().isEmpty();
    }
  }, {
    key: "indexedValueChanged",
    value: function indexedValueChanged(oldNode, newNode) {
      return !oldNode.getPriority().equals(newNode.getPriority());
    }
  }, {
    key: "minPost",
    value: function minPost() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return NamedNode.MIN;
    }
  }, {
    key: "maxPost",
    value: function maxPost() {
      return new NamedNode(MAX_NAME, new LeafNode('[PRIORITY-POST]', MAX_NODE$1));
    }
  }, {
    key: "makePost",
    value: function makePost(indexValue, name) {
      var priorityNode = nodeFromJSON$1(indexValue);
      return new NamedNode(name, new LeafNode('[PRIORITY-POST]', priorityNode));
    }
    /**
     * @returns String representation for inclusion in a query spec
     */
  }, {
    key: "toString",
    value: function toString() {
      return '.priority';
    }
  }]);
}(Index);
var PRIORITY_INDEX = new PriorityIndex();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var LOG_2 = Math.log(2);
var Base12Num = /*#__PURE__*/function () {
  function Base12Num(length) {
    _classCallCheck(this, Base12Num);
    var logBase2 = function logBase2(num) {
      return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parseInt(Math.log(num) / LOG_2, 10)
      );
    };
    var bitMask = function bitMask(bits) {
      return parseInt(Array(bits + 1).join('1'), 2);
    };
    this.count = logBase2(length + 1);
    this.current_ = this.count - 1;
    var mask = bitMask(this.count);
    this.bits_ = length + 1 & mask;
  }
  return _createClass(Base12Num, [{
    key: "nextBitIsOne",
    value: function nextBitIsOne() {
      //noinspection JSBitwiseOperatorUsage
      var result = !(this.bits_ & 0x1 << this.current_);
      this.current_--;
      return result;
    }
  }]);
}();
/**
 * Takes a list of child nodes and constructs a SortedSet using the given comparison
 * function
 *
 * Uses the algorithm described in the paper linked here:
 * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.46.1458
 *
 * @param childList - Unsorted list of children
 * @param cmp - The comparison method to be used
 * @param keyFn - An optional function to extract K from a node wrapper, if K's
 * type is not NamedNode
 * @param mapSortFn - An optional override for comparator used by the generated sorted map
 */
var buildChildSet = function buildChildSet(childList, cmp, keyFn, mapSortFn) {
  childList.sort(cmp);
  var _buildBalancedTree = function buildBalancedTree(low, high) {
    var length = high - low;
    var namedNode;
    var key;
    if (length === 0) {
      return null;
    } else if (length === 1) {
      namedNode = childList[low];
      key = keyFn ? keyFn(namedNode) : namedNode;
      return new LLRBNode(key, namedNode.node, LLRBNode.BLACK, null, null);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      var middle = parseInt(length / 2, 10) + low;
      var left = _buildBalancedTree(low, middle);
      var right = _buildBalancedTree(middle + 1, high);
      namedNode = childList[middle];
      key = keyFn ? keyFn(namedNode) : namedNode;
      return new LLRBNode(key, namedNode.node, LLRBNode.BLACK, left, right);
    }
  };
  var buildFrom12Array = function buildFrom12Array(base12) {
    var node = null;
    var root = null;
    var index = childList.length;
    var buildPennant = function buildPennant(chunkSize, color) {
      var low = index - chunkSize;
      var high = index;
      index -= chunkSize;
      var childTree = _buildBalancedTree(low + 1, high);
      var namedNode = childList[low];
      var key = keyFn ? keyFn(namedNode) : namedNode;
      attachPennant(new LLRBNode(key, namedNode.node, color, null, childTree));
    };
    var attachPennant = function attachPennant(pennant) {
      if (node) {
        node.left = pennant;
        node = pennant;
      } else {
        root = pennant;
        node = pennant;
      }
    };
    for (var i = 0; i < base12.count; ++i) {
      var isOne = base12.nextBitIsOne();
      // The number of nodes taken in each slice is 2^(arr.length - (i + 1))
      var chunkSize = Math.pow(2, base12.count - (i + 1));
      if (isOne) {
        buildPennant(chunkSize, LLRBNode.BLACK);
      } else {
        // current == 2
        buildPennant(chunkSize, LLRBNode.BLACK);
        buildPennant(chunkSize, LLRBNode.RED);
      }
    }
    return root;
  };
  var base12 = new Base12Num(childList.length);
  var root = buildFrom12Array(base12);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new SortedMap(mapSortFn || cmp, root);
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _defaultIndexMap;
var fallbackObject = {};
var IndexMap = /*#__PURE__*/function () {
  function IndexMap(indexes_, indexSet_) {
    _classCallCheck(this, IndexMap);
    this.indexes_ = indexes_;
    this.indexSet_ = indexSet_;
  }
  return _createClass(IndexMap, [{
    key: "get",
    value: function get(indexKey) {
      var sortedMap = (0, _util.safeGet)(this.indexes_, indexKey);
      if (!sortedMap) {
        throw new Error('No index defined for ' + indexKey);
      }
      if (sortedMap instanceof SortedMap) {
        return sortedMap;
      } else {
        // The index exists, but it falls back to just name comparison. Return null so that the calling code uses the
        // regular child map
        return null;
      }
    }
  }, {
    key: "hasIndex",
    value: function hasIndex(indexDefinition) {
      return (0, _util.contains)(this.indexSet_, indexDefinition.toString());
    }
  }, {
    key: "addIndex",
    value: function addIndex(indexDefinition, existingChildren) {
      (0, _util.assert)(indexDefinition !== KEY_INDEX, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
      var childList = [];
      var sawIndexedValue = false;
      var iter = existingChildren.getIterator(NamedNode.Wrap);
      var next = iter.getNext();
      while (next) {
        sawIndexedValue = sawIndexedValue || indexDefinition.isDefinedOn(next.node);
        childList.push(next);
        next = iter.getNext();
      }
      var newIndex;
      if (sawIndexedValue) {
        newIndex = buildChildSet(childList, indexDefinition.getCompare());
      } else {
        newIndex = fallbackObject;
      }
      var indexName = indexDefinition.toString();
      var newIndexSet = Object.assign({}, this.indexSet_);
      newIndexSet[indexName] = indexDefinition;
      var newIndexes = Object.assign({}, this.indexes_);
      newIndexes[indexName] = newIndex;
      return new IndexMap(newIndexes, newIndexSet);
    }
    /**
     * Ensure that this node is properly tracked in any indexes that we're maintaining
     */
  }, {
    key: "addToIndexes",
    value: function addToIndexes(namedNode, existingChildren) {
      var _this29 = this;
      var newIndexes = (0, _util.map)(this.indexes_, function (indexedChildren, indexName) {
        var index = (0, _util.safeGet)(_this29.indexSet_, indexName);
        (0, _util.assert)(index, 'Missing index implementation for ' + indexName);
        if (indexedChildren === fallbackObject) {
          // Check to see if we need to index everything
          if (index.isDefinedOn(namedNode.node)) {
            // We need to build this index
            var childList = [];
            var iter = existingChildren.getIterator(NamedNode.Wrap);
            var next = iter.getNext();
            while (next) {
              if (next.name !== namedNode.name) {
                childList.push(next);
              }
              next = iter.getNext();
            }
            childList.push(namedNode);
            return buildChildSet(childList, index.getCompare());
          } else {
            // No change, this remains a fallback
            return fallbackObject;
          }
        } else {
          var existingSnap = existingChildren.get(namedNode.name);
          var newChildren = indexedChildren;
          if (existingSnap) {
            newChildren = newChildren.remove(new NamedNode(namedNode.name, existingSnap));
          }
          return newChildren.insert(namedNode, namedNode.node);
        }
      });
      return new IndexMap(newIndexes, this.indexSet_);
    }
    /**
     * Create a new IndexMap instance with the given value removed
     */
  }, {
    key: "removeFromIndexes",
    value: function removeFromIndexes(namedNode, existingChildren) {
      var newIndexes = (0, _util.map)(this.indexes_, function (indexedChildren) {
        if (indexedChildren === fallbackObject) {
          // This is the fallback. Just return it, nothing to do in this case
          return indexedChildren;
        } else {
          var existingSnap = existingChildren.get(namedNode.name);
          if (existingSnap) {
            return indexedChildren.remove(new NamedNode(namedNode.name, existingSnap));
          } else {
            // No record of this child
            return indexedChildren;
          }
        }
      });
      return new IndexMap(newIndexes, this.indexSet_);
    }
  }], [{
    key: "Default",
    get:
    /**
     * The default IndexMap for nodes without a priority
     */
    function get() {
      (0, _util.assert)(fallbackObject && PRIORITY_INDEX, 'ChildrenNode.ts has not been loaded');
      _defaultIndexMap = _defaultIndexMap || new IndexMap({
        '.priority': fallbackObject
      }, {
        '.priority': PRIORITY_INDEX
      });
      return _defaultIndexMap;
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// TODO: For memory savings, don't store priorityNode_ if it's empty.
var EMPTY_NODE;
/**
 * ChildrenNode is a class for storing internal nodes in a DataSnapshot
 * (i.e. nodes with children).  It implements Node and stores the
 * list of children in the children property, sorted by child name.
 */
var ChildrenNode = /*#__PURE__*/function () {
  /**
   * @param children_ - List of children of this node..
   * @param priorityNode_ - The priority of this node (as a snapshot node).
   */
  function ChildrenNode(children_, priorityNode_, indexMap_) {
    _classCallCheck(this, ChildrenNode);
    this.children_ = children_;
    this.priorityNode_ = priorityNode_;
    this.indexMap_ = indexMap_;
    this.lazyHash_ = null;
    /**
     * Note: The only reason we allow null priority is for EMPTY_NODE, since we can't use
     * EMPTY_NODE as the priority of EMPTY_NODE.  We might want to consider making EMPTY_NODE its own
     * class instead of an empty ChildrenNode.
     */
    if (this.priorityNode_) {
      validatePriorityNode(this.priorityNode_);
    }
    if (this.children_.isEmpty()) {
      (0, _util.assert)(!this.priorityNode_ || this.priorityNode_.isEmpty(), 'An empty node cannot have a priority');
    }
  }
  /** @inheritDoc */
  return _createClass(ChildrenNode, [{
    key: "isLeafNode",
    value: function isLeafNode() {
      return false;
    }
    /** @inheritDoc */
  }, {
    key: "getPriority",
    value: function getPriority() {
      return this.priorityNode_ || EMPTY_NODE;
    }
    /** @inheritDoc */
  }, {
    key: "updatePriority",
    value: function updatePriority(newPriorityNode) {
      if (this.children_.isEmpty()) {
        // Don't allow priorities on empty nodes
        return this;
      } else {
        return new ChildrenNode(this.children_, newPriorityNode, this.indexMap_);
      }
    }
    /** @inheritDoc */
  }, {
    key: "getImmediateChild",
    value: function getImmediateChild(childName) {
      // Hack to treat priority as a regular child
      if (childName === '.priority') {
        return this.getPriority();
      } else {
        var _child = this.children_.get(childName);
        return _child === null ? EMPTY_NODE : _child;
      }
    }
    /** @inheritDoc */
  }, {
    key: "getChild",
    value: function getChild(path) {
      var front = pathGetFront(path);
      if (front === null) {
        return this;
      }
      return this.getImmediateChild(front).getChild(pathPopFront(path));
    }
    /** @inheritDoc */
  }, {
    key: "hasChild",
    value: function hasChild(childName) {
      return this.children_.get(childName) !== null;
    }
    /** @inheritDoc */
  }, {
    key: "updateImmediateChild",
    value: function updateImmediateChild(childName, newChildNode) {
      (0, _util.assert)(newChildNode, 'We should always be passing snapshot nodes');
      if (childName === '.priority') {
        return this.updatePriority(newChildNode);
      } else {
        var namedNode = new NamedNode(childName, newChildNode);
        var newChildren, newIndexMap;
        if (newChildNode.isEmpty()) {
          newChildren = this.children_.remove(childName);
          newIndexMap = this.indexMap_.removeFromIndexes(namedNode, this.children_);
        } else {
          newChildren = this.children_.insert(childName, newChildNode);
          newIndexMap = this.indexMap_.addToIndexes(namedNode, this.children_);
        }
        var newPriority = newChildren.isEmpty() ? EMPTY_NODE : this.priorityNode_;
        return new ChildrenNode(newChildren, newPriority, newIndexMap);
      }
    }
    /** @inheritDoc */
  }, {
    key: "updateChild",
    value: function updateChild(path, newChildNode) {
      var front = pathGetFront(path);
      if (front === null) {
        return newChildNode;
      } else {
        (0, _util.assert)(pathGetFront(path) !== '.priority' || pathGetLength(path) === 1, '.priority must be the last token in a path');
        var newImmediateChild = this.getImmediateChild(front).updateChild(pathPopFront(path), newChildNode);
        return this.updateImmediateChild(front, newImmediateChild);
      }
    }
    /** @inheritDoc */
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.children_.isEmpty();
    }
    /** @inheritDoc */
  }, {
    key: "numChildren",
    value: function numChildren() {
      return this.children_.count();
    }
    /** @inheritDoc */
  }, {
    key: "val",
    value: function val(exportFormat) {
      if (this.isEmpty()) {
        return null;
      }
      var obj = {};
      var numKeys = 0,
        maxKey = 0,
        allIntegerKeys = true;
      this.forEachChild(PRIORITY_INDEX, function (key, childNode) {
        obj[key] = childNode.val(exportFormat);
        numKeys++;
        if (allIntegerKeys && ChildrenNode.INTEGER_REGEXP_.test(key)) {
          maxKey = Math.max(maxKey, Number(key));
        } else {
          allIntegerKeys = false;
        }
      });
      if (!exportFormat && allIntegerKeys && maxKey < 2 * numKeys) {
        // convert to array.
        var array = [];
        // eslint-disable-next-line guard-for-in
        for (var key in obj) {
          array[key] = obj[key];
        }
        return array;
      } else {
        if (exportFormat && !this.getPriority().isEmpty()) {
          obj['.priority'] = this.getPriority().val();
        }
        return obj;
      }
    }
    /** @inheritDoc */
  }, {
    key: "hash",
    value: function hash() {
      if (this.lazyHash_ === null) {
        var toHash = '';
        if (!this.getPriority().isEmpty()) {
          toHash += 'priority:' + priorityHashText(this.getPriority().val()) + ':';
        }
        this.forEachChild(PRIORITY_INDEX, function (key, childNode) {
          var childHash = childNode.hash();
          if (childHash !== '') {
            toHash += ':' + key + ':' + childHash;
          }
        });
        this.lazyHash_ = toHash === '' ? '' : sha1(toHash);
      }
      return this.lazyHash_;
    }
    /** @inheritDoc */
  }, {
    key: "getPredecessorChildName",
    value: function getPredecessorChildName(childName, childNode, index) {
      var idx = this.resolveIndex_(index);
      if (idx) {
        var predecessor = idx.getPredecessorKey(new NamedNode(childName, childNode));
        return predecessor ? predecessor.name : null;
      } else {
        return this.children_.getPredecessorKey(childName);
      }
    }
  }, {
    key: "getFirstChildName",
    value: function getFirstChildName(indexDefinition) {
      var idx = this.resolveIndex_(indexDefinition);
      if (idx) {
        var minKey = idx.minKey();
        return minKey && minKey.name;
      } else {
        return this.children_.minKey();
      }
    }
  }, {
    key: "getFirstChild",
    value: function getFirstChild(indexDefinition) {
      var minKey = this.getFirstChildName(indexDefinition);
      if (minKey) {
        return new NamedNode(minKey, this.children_.get(minKey));
      } else {
        return null;
      }
    }
    /**
     * Given an index, return the key name of the largest value we have, according to that index
     */
  }, {
    key: "getLastChildName",
    value: function getLastChildName(indexDefinition) {
      var idx = this.resolveIndex_(indexDefinition);
      if (idx) {
        var maxKey = idx.maxKey();
        return maxKey && maxKey.name;
      } else {
        return this.children_.maxKey();
      }
    }
  }, {
    key: "getLastChild",
    value: function getLastChild(indexDefinition) {
      var maxKey = this.getLastChildName(indexDefinition);
      if (maxKey) {
        return new NamedNode(maxKey, this.children_.get(maxKey));
      } else {
        return null;
      }
    }
  }, {
    key: "forEachChild",
    value: function forEachChild(index, action) {
      var idx = this.resolveIndex_(index);
      if (idx) {
        return idx.inorderTraversal(function (wrappedNode) {
          return action(wrappedNode.name, wrappedNode.node);
        });
      } else {
        return this.children_.inorderTraversal(action);
      }
    }
  }, {
    key: "getIterator",
    value: function getIterator(indexDefinition) {
      return this.getIteratorFrom(indexDefinition.minPost(), indexDefinition);
    }
  }, {
    key: "getIteratorFrom",
    value: function getIteratorFrom(startPost, indexDefinition) {
      var idx = this.resolveIndex_(indexDefinition);
      if (idx) {
        return idx.getIteratorFrom(startPost, function (key) {
          return key;
        });
      } else {
        var iterator = this.children_.getIteratorFrom(startPost.name, NamedNode.Wrap);
        var next = iterator.peek();
        while (next != null && indexDefinition.compare(next, startPost) < 0) {
          iterator.getNext();
          next = iterator.peek();
        }
        return iterator;
      }
    }
  }, {
    key: "getReverseIterator",
    value: function getReverseIterator(indexDefinition) {
      return this.getReverseIteratorFrom(indexDefinition.maxPost(), indexDefinition);
    }
  }, {
    key: "getReverseIteratorFrom",
    value: function getReverseIteratorFrom(endPost, indexDefinition) {
      var idx = this.resolveIndex_(indexDefinition);
      if (idx) {
        return idx.getReverseIteratorFrom(endPost, function (key) {
          return key;
        });
      } else {
        var iterator = this.children_.getReverseIteratorFrom(endPost.name, NamedNode.Wrap);
        var next = iterator.peek();
        while (next != null && indexDefinition.compare(next, endPost) > 0) {
          iterator.getNext();
          next = iterator.peek();
        }
        return iterator;
      }
    }
  }, {
    key: "compareTo",
    value: function compareTo(other) {
      if (this.isEmpty()) {
        if (other.isEmpty()) {
          return 0;
        } else {
          return -1;
        }
      } else if (other.isLeafNode() || other.isEmpty()) {
        return 1;
      } else if (other === MAX_NODE) {
        return -1;
      } else {
        // Must be another node with children.
        return 0;
      }
    }
  }, {
    key: "withIndex",
    value: function withIndex(indexDefinition) {
      if (indexDefinition === KEY_INDEX || this.indexMap_.hasIndex(indexDefinition)) {
        return this;
      } else {
        var newIndexMap = this.indexMap_.addIndex(indexDefinition, this.children_);
        return new ChildrenNode(this.children_, this.priorityNode_, newIndexMap);
      }
    }
  }, {
    key: "isIndexed",
    value: function isIndexed(index) {
      return index === KEY_INDEX || this.indexMap_.hasIndex(index);
    }
  }, {
    key: "equals",
    value: function equals(other) {
      if (other === this) {
        return true;
      } else if (other.isLeafNode()) {
        return false;
      } else {
        var otherChildrenNode = other;
        if (!this.getPriority().equals(otherChildrenNode.getPriority())) {
          return false;
        } else if (this.children_.count() === otherChildrenNode.children_.count()) {
          var thisIter = this.getIterator(PRIORITY_INDEX);
          var otherIter = otherChildrenNode.getIterator(PRIORITY_INDEX);
          var thisCurrent = thisIter.getNext();
          var otherCurrent = otherIter.getNext();
          while (thisCurrent && otherCurrent) {
            if (thisCurrent.name !== otherCurrent.name || !thisCurrent.node.equals(otherCurrent.node)) {
              return false;
            }
            thisCurrent = thisIter.getNext();
            otherCurrent = otherIter.getNext();
          }
          return thisCurrent === null && otherCurrent === null;
        } else {
          return false;
        }
      }
    }
    /**
     * Returns a SortedMap ordered by index, or null if the default (by-key) ordering can be used
     * instead.
     *
     */
  }, {
    key: "resolveIndex_",
    value: function resolveIndex_(indexDefinition) {
      if (indexDefinition === KEY_INDEX) {
        return null;
      } else {
        return this.indexMap_.get(indexDefinition.toString());
      }
    }
  }], [{
    key: "EMPTY_NODE",
    get: function get() {
      return EMPTY_NODE || (EMPTY_NODE = new ChildrenNode(new SortedMap(NAME_COMPARATOR), null, IndexMap.Default));
    }
  }]);
}();
ChildrenNode.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
var MaxNode = /*#__PURE__*/function (_ChildrenNode) {
  function MaxNode() {
    _classCallCheck(this, MaxNode);
    return _callSuper(this, MaxNode, [new SortedMap(NAME_COMPARATOR), ChildrenNode.EMPTY_NODE, IndexMap.Default]);
  }
  _inherits(MaxNode, _ChildrenNode);
  return _createClass(MaxNode, [{
    key: "compareTo",
    value: function compareTo(other) {
      if (other === this) {
        return 0;
      } else {
        return 1;
      }
    }
  }, {
    key: "equals",
    value: function equals(other) {
      // Not that we every compare it, but MAX_NODE is only ever equal to itself
      return other === this;
    }
  }, {
    key: "getPriority",
    value: function getPriority() {
      return this;
    }
  }, {
    key: "getImmediateChild",
    value: function getImmediateChild(childName) {
      return ChildrenNode.EMPTY_NODE;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return false;
    }
  }]);
}(ChildrenNode);
/**
 * Marker that will sort higher than any other snapshot.
 */
var MAX_NODE = new MaxNode();
Object.defineProperties(NamedNode, {
  MIN: {
    value: new NamedNode(MIN_NAME, ChildrenNode.EMPTY_NODE)
  },
  MAX: {
    value: new NamedNode(MAX_NAME, MAX_NODE)
  }
});
/**
 * Reference Extensions
 */
KeyIndex.__EMPTY_NODE = ChildrenNode.EMPTY_NODE;
LeafNode.__childrenNodeConstructor = ChildrenNode;
setMaxNode$1(MAX_NODE);
setMaxNode(MAX_NODE);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var USE_HINZE = true;
/**
 * Constructs a snapshot node representing the passed JSON and returns it.
 * @param json - JSON to create a node for.
 * @param priority - Optional priority to use.  This will be ignored if the
 * passed JSON contains a .priority property.
 */
function nodeFromJSON(json) {
  var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (json === null) {
    return ChildrenNode.EMPTY_NODE;
  }
  if (_typeof(json) === 'object' && '.priority' in json) {
    priority = json['.priority'];
  }
  (0, _util.assert)(priority === null || typeof priority === 'string' || typeof priority === 'number' || _typeof(priority) === 'object' && '.sv' in priority, 'Invalid priority type found: ' + _typeof(priority));
  if (_typeof(json) === 'object' && '.value' in json && json['.value'] !== null) {
    json = json['.value'];
  }
  // Valid leaf nodes include non-objects or server-value wrapper objects
  if (_typeof(json) !== 'object' || '.sv' in json) {
    var jsonLeaf = json;
    return new LeafNode(jsonLeaf, nodeFromJSON(priority));
  }
  if (!(json instanceof Array) && USE_HINZE) {
    var children = [];
    var childrenHavePriority = false;
    var hinzeJsonObj = json;
    each(hinzeJsonObj, function (key, child) {
      if (key.substring(0, 1) !== '.') {
        // Ignore metadata nodes
        var childNode = nodeFromJSON(child);
        if (!childNode.isEmpty()) {
          childrenHavePriority = childrenHavePriority || !childNode.getPriority().isEmpty();
          children.push(new NamedNode(key, childNode));
        }
      }
    });
    if (children.length === 0) {
      return ChildrenNode.EMPTY_NODE;
    }
    var childSet = buildChildSet(children, NAME_ONLY_COMPARATOR, function (namedNode) {
      return namedNode.name;
    }, NAME_COMPARATOR);
    if (childrenHavePriority) {
      var sortedChildSet = buildChildSet(children, PRIORITY_INDEX.getCompare());
      return new ChildrenNode(childSet, nodeFromJSON(priority), new IndexMap({
        '.priority': sortedChildSet
      }, {
        '.priority': PRIORITY_INDEX
      }));
    } else {
      return new ChildrenNode(childSet, nodeFromJSON(priority), IndexMap.Default);
    }
  } else {
    var node = ChildrenNode.EMPTY_NODE;
    each(json, function (key, childData) {
      if ((0, _util.contains)(json, key)) {
        if (key.substring(0, 1) !== '.') {
          // ignore metadata nodes.
          var childNode = nodeFromJSON(childData);
          if (childNode.isLeafNode() || !childNode.isEmpty()) {
            node = node.updateImmediateChild(key, childNode);
          }
        }
      }
    });
    return node.updatePriority(nodeFromJSON(priority));
  }
}
setNodeFromJSON(nodeFromJSON);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PathIndex = /*#__PURE__*/function (_Index3) {
  function PathIndex(indexPath_) {
    var _this30;
    _classCallCheck(this, PathIndex);
    _this30 = _callSuper(this, PathIndex);
    _this30.indexPath_ = indexPath_;
    (0, _util.assert)(!pathIsEmpty(indexPath_) && pathGetFront(indexPath_) !== '.priority', "Can't create PathIndex with empty path or .priority key");
    return _this30;
  }
  _inherits(PathIndex, _Index3);
  return _createClass(PathIndex, [{
    key: "extractChild",
    value: function extractChild(snap) {
      return snap.getChild(this.indexPath_);
    }
  }, {
    key: "isDefinedOn",
    value: function isDefinedOn(node) {
      return !node.getChild(this.indexPath_).isEmpty();
    }
  }, {
    key: "compare",
    value: function compare(a, b) {
      var aChild = this.extractChild(a.node);
      var bChild = this.extractChild(b.node);
      var indexCmp = aChild.compareTo(bChild);
      if (indexCmp === 0) {
        return nameCompare(a.name, b.name);
      } else {
        return indexCmp;
      }
    }
  }, {
    key: "makePost",
    value: function makePost(indexValue, name) {
      var valueNode = nodeFromJSON(indexValue);
      var node = ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_, valueNode);
      return new NamedNode(name, node);
    }
  }, {
    key: "maxPost",
    value: function maxPost() {
      var node = ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_, MAX_NODE);
      return new NamedNode(MAX_NAME, node);
    }
  }, {
    key: "toString",
    value: function toString() {
      return pathSlice(this.indexPath_, 0).join('/');
    }
  }]);
}(Index);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ValueIndex = /*#__PURE__*/function (_Index4) {
  function ValueIndex() {
    _classCallCheck(this, ValueIndex);
    return _callSuper(this, ValueIndex, arguments);
  }
  _inherits(ValueIndex, _Index4);
  return _createClass(ValueIndex, [{
    key: "compare",
    value: function compare(a, b) {
      var indexCmp = a.node.compareTo(b.node);
      if (indexCmp === 0) {
        return nameCompare(a.name, b.name);
      } else {
        return indexCmp;
      }
    }
  }, {
    key: "isDefinedOn",
    value: function isDefinedOn(node) {
      return true;
    }
  }, {
    key: "indexedValueChanged",
    value: function indexedValueChanged(oldNode, newNode) {
      return !oldNode.equals(newNode);
    }
  }, {
    key: "minPost",
    value: function minPost() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return NamedNode.MIN;
    }
  }, {
    key: "maxPost",
    value: function maxPost() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return NamedNode.MAX;
    }
  }, {
    key: "makePost",
    value: function makePost(indexValue, name) {
      var valueNode = nodeFromJSON(indexValue);
      return new NamedNode(name, valueNode);
    }
    /**
     * @returns String representation for inclusion in a query spec
     */
  }, {
    key: "toString",
    value: function toString() {
      return '.value';
    }
  }]);
}(Index);
var VALUE_INDEX = new ValueIndex();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function changeValue(snapshotNode) {
  return {
    type: "value" /* ChangeType.VALUE */,
    snapshotNode: snapshotNode
  };
}
function changeChildAdded(childName, snapshotNode) {
  return {
    type: "child_added" /* ChangeType.CHILD_ADDED */,
    snapshotNode: snapshotNode,
    childName: childName
  };
}
function changeChildRemoved(childName, snapshotNode) {
  return {
    type: "child_removed" /* ChangeType.CHILD_REMOVED */,
    snapshotNode: snapshotNode,
    childName: childName
  };
}
function changeChildChanged(childName, snapshotNode, oldSnap) {
  return {
    type: "child_changed" /* ChangeType.CHILD_CHANGED */,
    snapshotNode: snapshotNode,
    childName: childName,
    oldSnap: oldSnap
  };
}
function changeChildMoved(childName, snapshotNode) {
  return {
    type: "child_moved" /* ChangeType.CHILD_MOVED */,
    snapshotNode: snapshotNode,
    childName: childName
  };
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Doesn't really filter nodes but applies an index to the node and keeps track of any changes
 */
var IndexedFilter = /*#__PURE__*/function () {
  function IndexedFilter(index_) {
    _classCallCheck(this, IndexedFilter);
    this.index_ = index_;
  }
  return _createClass(IndexedFilter, [{
    key: "updateChild",
    value: function updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
      (0, _util.assert)(snap.isIndexed(this.index_), 'A node must be indexed if only a child is updated');
      var oldChild = snap.getImmediateChild(key);
      // Check if anything actually changed.
      if (oldChild.getChild(affectedPath).equals(newChild.getChild(affectedPath))) {
        // There's an edge case where a child can enter or leave the view because affectedPath was set to null.
        // In this case, affectedPath will appear null in both the old and new snapshots.  So we need
        // to avoid treating these cases as "nothing changed."
        if (oldChild.isEmpty() === newChild.isEmpty()) {
          // Nothing changed.
          // This assert should be valid, but it's expensive (can dominate perf testing) so don't actually do it.
          //assert(oldChild.equals(newChild), 'Old and new snapshots should be equal.');
          return snap;
        }
      }
      if (optChangeAccumulator != null) {
        if (newChild.isEmpty()) {
          if (snap.hasChild(key)) {
            optChangeAccumulator.trackChildChange(changeChildRemoved(key, oldChild));
          } else {
            (0, _util.assert)(snap.isLeafNode(), 'A child remove without an old child only makes sense on a leaf node');
          }
        } else if (oldChild.isEmpty()) {
          optChangeAccumulator.trackChildChange(changeChildAdded(key, newChild));
        } else {
          optChangeAccumulator.trackChildChange(changeChildChanged(key, newChild, oldChild));
        }
      }
      if (snap.isLeafNode() && newChild.isEmpty()) {
        return snap;
      } else {
        // Make sure the node is indexed
        return snap.updateImmediateChild(key, newChild).withIndex(this.index_);
      }
    }
  }, {
    key: "updateFullNode",
    value: function updateFullNode(oldSnap, newSnap, optChangeAccumulator) {
      if (optChangeAccumulator != null) {
        if (!oldSnap.isLeafNode()) {
          oldSnap.forEachChild(PRIORITY_INDEX, function (key, childNode) {
            if (!newSnap.hasChild(key)) {
              optChangeAccumulator.trackChildChange(changeChildRemoved(key, childNode));
            }
          });
        }
        if (!newSnap.isLeafNode()) {
          newSnap.forEachChild(PRIORITY_INDEX, function (key, childNode) {
            if (oldSnap.hasChild(key)) {
              var oldChild = oldSnap.getImmediateChild(key);
              if (!oldChild.equals(childNode)) {
                optChangeAccumulator.trackChildChange(changeChildChanged(key, childNode, oldChild));
              }
            } else {
              optChangeAccumulator.trackChildChange(changeChildAdded(key, childNode));
            }
          });
        }
      }
      return newSnap.withIndex(this.index_);
    }
  }, {
    key: "updatePriority",
    value: function updatePriority(oldSnap, newPriority) {
      if (oldSnap.isEmpty()) {
        return ChildrenNode.EMPTY_NODE;
      } else {
        return oldSnap.updatePriority(newPriority);
      }
    }
  }, {
    key: "filtersNodes",
    value: function filtersNodes() {
      return false;
    }
  }, {
    key: "getIndexedFilter",
    value: function getIndexedFilter() {
      return this;
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      return this.index_;
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Filters nodes by range and uses an IndexFilter to track any changes after filtering the node
 */
var RangedFilter = /*#__PURE__*/function () {
  function RangedFilter(params) {
    _classCallCheck(this, RangedFilter);
    this.indexedFilter_ = new IndexedFilter(params.getIndex());
    this.index_ = params.getIndex();
    this.startPost_ = RangedFilter.getStartPost_(params);
    this.endPost_ = RangedFilter.getEndPost_(params);
    this.startIsInclusive_ = !params.startAfterSet_;
    this.endIsInclusive_ = !params.endBeforeSet_;
  }
  return _createClass(RangedFilter, [{
    key: "getStartPost",
    value: function getStartPost() {
      return this.startPost_;
    }
  }, {
    key: "getEndPost",
    value: function getEndPost() {
      return this.endPost_;
    }
  }, {
    key: "matches",
    value: function matches(node) {
      var isWithinStart = this.startIsInclusive_ ? this.index_.compare(this.getStartPost(), node) <= 0 : this.index_.compare(this.getStartPost(), node) < 0;
      var isWithinEnd = this.endIsInclusive_ ? this.index_.compare(node, this.getEndPost()) <= 0 : this.index_.compare(node, this.getEndPost()) < 0;
      return isWithinStart && isWithinEnd;
    }
  }, {
    key: "updateChild",
    value: function updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
      if (!this.matches(new NamedNode(key, newChild))) {
        newChild = ChildrenNode.EMPTY_NODE;
      }
      return this.indexedFilter_.updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator);
    }
  }, {
    key: "updateFullNode",
    value: function updateFullNode(oldSnap, newSnap, optChangeAccumulator) {
      if (newSnap.isLeafNode()) {
        // Make sure we have a children node with the correct index, not a leaf node;
        newSnap = ChildrenNode.EMPTY_NODE;
      }
      var filtered = newSnap.withIndex(this.index_);
      // Don't support priorities on queries
      filtered = filtered.updatePriority(ChildrenNode.EMPTY_NODE);
      var self = this;
      newSnap.forEachChild(PRIORITY_INDEX, function (key, childNode) {
        if (!self.matches(new NamedNode(key, childNode))) {
          filtered = filtered.updateImmediateChild(key, ChildrenNode.EMPTY_NODE);
        }
      });
      return this.indexedFilter_.updateFullNode(oldSnap, filtered, optChangeAccumulator);
    }
  }, {
    key: "updatePriority",
    value: function updatePriority(oldSnap, newPriority) {
      // Don't support priorities on queries
      return oldSnap;
    }
  }, {
    key: "filtersNodes",
    value: function filtersNodes() {
      return true;
    }
  }, {
    key: "getIndexedFilter",
    value: function getIndexedFilter() {
      return this.indexedFilter_;
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      return this.index_;
    }
  }], [{
    key: "getStartPost_",
    value: function getStartPost_(params) {
      if (params.hasStart()) {
        var startName = params.getIndexStartName();
        return params.getIndex().makePost(params.getIndexStartValue(), startName);
      } else {
        return params.getIndex().minPost();
      }
    }
  }, {
    key: "getEndPost_",
    value: function getEndPost_(params) {
      if (params.hasEnd()) {
        var endName = params.getIndexEndName();
        return params.getIndex().makePost(params.getIndexEndValue(), endName);
      } else {
        return params.getIndex().maxPost();
      }
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Applies a limit and a range to a node and uses RangedFilter to do the heavy lifting where possible
 */
var LimitedFilter = /*#__PURE__*/function () {
  function LimitedFilter(params) {
    var _this31 = this;
    _classCallCheck(this, LimitedFilter);
    this.withinDirectionalStart = function (node) {
      return _this31.reverse_ ? _this31.withinEndPost(node) : _this31.withinStartPost(node);
    };
    this.withinDirectionalEnd = function (node) {
      return _this31.reverse_ ? _this31.withinStartPost(node) : _this31.withinEndPost(node);
    };
    this.withinStartPost = function (node) {
      var compareRes = _this31.index_.compare(_this31.rangedFilter_.getStartPost(), node);
      return _this31.startIsInclusive_ ? compareRes <= 0 : compareRes < 0;
    };
    this.withinEndPost = function (node) {
      var compareRes = _this31.index_.compare(node, _this31.rangedFilter_.getEndPost());
      return _this31.endIsInclusive_ ? compareRes <= 0 : compareRes < 0;
    };
    this.rangedFilter_ = new RangedFilter(params);
    this.index_ = params.getIndex();
    this.limit_ = params.getLimit();
    this.reverse_ = !params.isViewFromLeft();
    this.startIsInclusive_ = !params.startAfterSet_;
    this.endIsInclusive_ = !params.endBeforeSet_;
  }
  return _createClass(LimitedFilter, [{
    key: "updateChild",
    value: function updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
      if (!this.rangedFilter_.matches(new NamedNode(key, newChild))) {
        newChild = ChildrenNode.EMPTY_NODE;
      }
      if (snap.getImmediateChild(key).equals(newChild)) {
        // No change
        return snap;
      } else if (snap.numChildren() < this.limit_) {
        return this.rangedFilter_.getIndexedFilter().updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator);
      } else {
        return this.fullLimitUpdateChild_(snap, key, newChild, source, optChangeAccumulator);
      }
    }
  }, {
    key: "updateFullNode",
    value: function updateFullNode(oldSnap, newSnap, optChangeAccumulator) {
      var filtered;
      if (newSnap.isLeafNode() || newSnap.isEmpty()) {
        // Make sure we have a children node with the correct index, not a leaf node;
        filtered = ChildrenNode.EMPTY_NODE.withIndex(this.index_);
      } else {
        if (this.limit_ * 2 < newSnap.numChildren() && newSnap.isIndexed(this.index_)) {
          // Easier to build up a snapshot, since what we're given has more than twice the elements we want
          filtered = ChildrenNode.EMPTY_NODE.withIndex(this.index_);
          // anchor to the startPost, endPost, or last element as appropriate
          var iterator;
          if (this.reverse_) {
            iterator = newSnap.getReverseIteratorFrom(this.rangedFilter_.getEndPost(), this.index_);
          } else {
            iterator = newSnap.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_);
          }
          var count = 0;
          while (iterator.hasNext() && count < this.limit_) {
            var next = iterator.getNext();
            if (!this.withinDirectionalStart(next)) {
              // if we have not reached the start, skip to the next element
              continue;
            } else if (!this.withinDirectionalEnd(next)) {
              // if we have reached the end, stop adding elements
              break;
            } else {
              filtered = filtered.updateImmediateChild(next.name, next.node);
              count++;
            }
          }
        } else {
          // The snap contains less than twice the limit. Faster to delete from the snap than build up a new one
          filtered = newSnap.withIndex(this.index_);
          // Don't support priorities on queries
          filtered = filtered.updatePriority(ChildrenNode.EMPTY_NODE);
          var _iterator4;
          if (this.reverse_) {
            _iterator4 = filtered.getReverseIterator(this.index_);
          } else {
            _iterator4 = filtered.getIterator(this.index_);
          }
          var _count = 0;
          while (_iterator4.hasNext()) {
            var _next2 = _iterator4.getNext();
            var inRange = _count < this.limit_ && this.withinDirectionalStart(_next2) && this.withinDirectionalEnd(_next2);
            if (inRange) {
              _count++;
            } else {
              filtered = filtered.updateImmediateChild(_next2.name, ChildrenNode.EMPTY_NODE);
            }
          }
        }
      }
      return this.rangedFilter_.getIndexedFilter().updateFullNode(oldSnap, filtered, optChangeAccumulator);
    }
  }, {
    key: "updatePriority",
    value: function updatePriority(oldSnap, newPriority) {
      // Don't support priorities on queries
      return oldSnap;
    }
  }, {
    key: "filtersNodes",
    value: function filtersNodes() {
      return true;
    }
  }, {
    key: "getIndexedFilter",
    value: function getIndexedFilter() {
      return this.rangedFilter_.getIndexedFilter();
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      return this.index_;
    }
  }, {
    key: "fullLimitUpdateChild_",
    value: function fullLimitUpdateChild_(snap, childKey, childSnap, source, changeAccumulator) {
      // TODO: rename all cache stuff etc to general snap terminology
      var cmp;
      if (this.reverse_) {
        var indexCmp = this.index_.getCompare();
        cmp = function cmp(a, b) {
          return indexCmp(b, a);
        };
      } else {
        cmp = this.index_.getCompare();
      }
      var oldEventCache = snap;
      (0, _util.assert)(oldEventCache.numChildren() === this.limit_, '');
      var newChildNamedNode = new NamedNode(childKey, childSnap);
      var windowBoundary = this.reverse_ ? oldEventCache.getFirstChild(this.index_) : oldEventCache.getLastChild(this.index_);
      var inRange = this.rangedFilter_.matches(newChildNamedNode);
      if (oldEventCache.hasChild(childKey)) {
        var oldChildSnap = oldEventCache.getImmediateChild(childKey);
        var nextChild = source.getChildAfterChild(this.index_, windowBoundary, this.reverse_);
        while (nextChild != null && (nextChild.name === childKey || oldEventCache.hasChild(nextChild.name))) {
          // There is a weird edge case where a node is updated as part of a merge in the write tree, but hasn't
          // been applied to the limited filter yet. Ignore this next child which will be updated later in
          // the limited filter...
          nextChild = source.getChildAfterChild(this.index_, nextChild, this.reverse_);
        }
        var compareNext = nextChild == null ? 1 : cmp(nextChild, newChildNamedNode);
        var remainsInWindow = inRange && !childSnap.isEmpty() && compareNext >= 0;
        if (remainsInWindow) {
          if (changeAccumulator != null) {
            changeAccumulator.trackChildChange(changeChildChanged(childKey, childSnap, oldChildSnap));
          }
          return oldEventCache.updateImmediateChild(childKey, childSnap);
        } else {
          if (changeAccumulator != null) {
            changeAccumulator.trackChildChange(changeChildRemoved(childKey, oldChildSnap));
          }
          var newEventCache = oldEventCache.updateImmediateChild(childKey, ChildrenNode.EMPTY_NODE);
          var nextChildInRange = nextChild != null && this.rangedFilter_.matches(nextChild);
          if (nextChildInRange) {
            if (changeAccumulator != null) {
              changeAccumulator.trackChildChange(changeChildAdded(nextChild.name, nextChild.node));
            }
            return newEventCache.updateImmediateChild(nextChild.name, nextChild.node);
          } else {
            return newEventCache;
          }
        }
      } else if (childSnap.isEmpty()) {
        // we're deleting a node, but it was not in the window, so ignore it
        return snap;
      } else if (inRange) {
        if (cmp(windowBoundary, newChildNamedNode) >= 0) {
          if (changeAccumulator != null) {
            changeAccumulator.trackChildChange(changeChildRemoved(windowBoundary.name, windowBoundary.node));
            changeAccumulator.trackChildChange(changeChildAdded(childKey, childSnap));
          }
          return oldEventCache.updateImmediateChild(childKey, childSnap).updateImmediateChild(windowBoundary.name, ChildrenNode.EMPTY_NODE);
        } else {
          return snap;
        }
      } else {
        return snap;
      }
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * This class is an immutable-from-the-public-api struct containing a set of query parameters defining a
 * range to be returned for a particular location. It is assumed that validation of parameters is done at the
 * user-facing API level, so it is not done here.
 *
 * @internal
 */
var QueryParams = exports._QueryParams = /*#__PURE__*/function () {
  function QueryParams() {
    _classCallCheck(this, QueryParams);
    this.limitSet_ = false;
    this.startSet_ = false;
    this.startNameSet_ = false;
    this.startAfterSet_ = false; // can only be true if startSet_ is true
    this.endSet_ = false;
    this.endNameSet_ = false;
    this.endBeforeSet_ = false; // can only be true if endSet_ is true
    this.limit_ = 0;
    this.viewFrom_ = '';
    this.indexStartValue_ = null;
    this.indexStartName_ = '';
    this.indexEndValue_ = null;
    this.indexEndName_ = '';
    this.index_ = PRIORITY_INDEX;
  }
  return _createClass(QueryParams, [{
    key: "hasStart",
    value: function hasStart() {
      return this.startSet_;
    }
    /**
     * @returns True if it would return from left.
     */
  }, {
    key: "isViewFromLeft",
    value: function isViewFromLeft() {
      if (this.viewFrom_ === '') {
        // limit(), rather than limitToFirst or limitToLast was called.
        // This means that only one of startSet_ and endSet_ is true. Use them
        // to calculate which side of the view to anchor to. If neither is set,
        // anchor to the end.
        return this.startSet_;
      } else {
        return this.viewFrom_ === "l" /* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_LEFT */;
      }
    }
    /**
     * Only valid to call if hasStart() returns true
     */
  }, {
    key: "getIndexStartValue",
    value: function getIndexStartValue() {
      (0, _util.assert)(this.startSet_, 'Only valid if start has been set');
      return this.indexStartValue_;
    }
    /**
     * Only valid to call if hasStart() returns true.
     * Returns the starting key name for the range defined by these query parameters
     */
  }, {
    key: "getIndexStartName",
    value: function getIndexStartName() {
      (0, _util.assert)(this.startSet_, 'Only valid if start has been set');
      if (this.startNameSet_) {
        return this.indexStartName_;
      } else {
        return MIN_NAME;
      }
    }
  }, {
    key: "hasEnd",
    value: function hasEnd() {
      return this.endSet_;
    }
    /**
     * Only valid to call if hasEnd() returns true.
     */
  }, {
    key: "getIndexEndValue",
    value: function getIndexEndValue() {
      (0, _util.assert)(this.endSet_, 'Only valid if end has been set');
      return this.indexEndValue_;
    }
    /**
     * Only valid to call if hasEnd() returns true.
     * Returns the end key name for the range defined by these query parameters
     */
  }, {
    key: "getIndexEndName",
    value: function getIndexEndName() {
      (0, _util.assert)(this.endSet_, 'Only valid if end has been set');
      if (this.endNameSet_) {
        return this.indexEndName_;
      } else {
        return MAX_NAME;
      }
    }
  }, {
    key: "hasLimit",
    value: function hasLimit() {
      return this.limitSet_;
    }
    /**
     * @returns True if a limit has been set and it has been explicitly anchored
     */
  }, {
    key: "hasAnchoredLimit",
    value: function hasAnchoredLimit() {
      return this.limitSet_ && this.viewFrom_ !== '';
    }
    /**
     * Only valid to call if hasLimit() returns true
     */
  }, {
    key: "getLimit",
    value: function getLimit() {
      (0, _util.assert)(this.limitSet_, 'Only valid if limit has been set');
      return this.limit_;
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      return this.index_;
    }
  }, {
    key: "loadsAllData",
    value: function loadsAllData() {
      return !(this.startSet_ || this.endSet_ || this.limitSet_);
    }
  }, {
    key: "isDefault",
    value: function isDefault() {
      return this.loadsAllData() && this.index_ === PRIORITY_INDEX;
    }
  }, {
    key: "copy",
    value: function copy() {
      var copy = new QueryParams();
      copy.limitSet_ = this.limitSet_;
      copy.limit_ = this.limit_;
      copy.startSet_ = this.startSet_;
      copy.startAfterSet_ = this.startAfterSet_;
      copy.indexStartValue_ = this.indexStartValue_;
      copy.startNameSet_ = this.startNameSet_;
      copy.indexStartName_ = this.indexStartName_;
      copy.endSet_ = this.endSet_;
      copy.endBeforeSet_ = this.endBeforeSet_;
      copy.indexEndValue_ = this.indexEndValue_;
      copy.endNameSet_ = this.endNameSet_;
      copy.indexEndName_ = this.indexEndName_;
      copy.index_ = this.index_;
      copy.viewFrom_ = this.viewFrom_;
      return copy;
    }
  }]);
}();
function queryParamsGetNodeFilter(queryParams) {
  if (queryParams.loadsAllData()) {
    return new IndexedFilter(queryParams.getIndex());
  } else if (queryParams.hasLimit()) {
    return new LimitedFilter(queryParams);
  } else {
    return new RangedFilter(queryParams);
  }
}
function queryParamsLimitToFirst(queryParams, newLimit) {
  var newParams = queryParams.copy();
  newParams.limitSet_ = true;
  newParams.limit_ = newLimit;
  newParams.viewFrom_ = "l" /* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_LEFT */;
  return newParams;
}
function queryParamsLimitToLast(queryParams, newLimit) {
  var newParams = queryParams.copy();
  newParams.limitSet_ = true;
  newParams.limit_ = newLimit;
  newParams.viewFrom_ = "r" /* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_RIGHT */;
  return newParams;
}
function queryParamsStartAt(queryParams, indexValue, key) {
  var newParams = queryParams.copy();
  newParams.startSet_ = true;
  if (indexValue === undefined) {
    indexValue = null;
  }
  newParams.indexStartValue_ = indexValue;
  if (key != null) {
    newParams.startNameSet_ = true;
    newParams.indexStartName_ = key;
  } else {
    newParams.startNameSet_ = false;
    newParams.indexStartName_ = '';
  }
  return newParams;
}
function queryParamsStartAfter(queryParams, indexValue, key) {
  var params;
  if (queryParams.index_ === KEY_INDEX || !!key) {
    params = queryParamsStartAt(queryParams, indexValue, key);
  } else {
    params = queryParamsStartAt(queryParams, indexValue, MAX_NAME);
  }
  params.startAfterSet_ = true;
  return params;
}
function queryParamsEndAt(queryParams, indexValue, key) {
  var newParams = queryParams.copy();
  newParams.endSet_ = true;
  if (indexValue === undefined) {
    indexValue = null;
  }
  newParams.indexEndValue_ = indexValue;
  if (key !== undefined) {
    newParams.endNameSet_ = true;
    newParams.indexEndName_ = key;
  } else {
    newParams.endNameSet_ = false;
    newParams.indexEndName_ = '';
  }
  return newParams;
}
function queryParamsEndBefore(queryParams, indexValue, key) {
  var params;
  if (queryParams.index_ === KEY_INDEX || !!key) {
    params = queryParamsEndAt(queryParams, indexValue, key);
  } else {
    params = queryParamsEndAt(queryParams, indexValue, MIN_NAME);
  }
  params.endBeforeSet_ = true;
  return params;
}
function queryParamsOrderBy(queryParams, index) {
  var newParams = queryParams.copy();
  newParams.index_ = index;
  return newParams;
}
/**
 * Returns a set of REST query string parameters representing this query.
 *
 * @returns query string parameters
 */
function queryParamsToRestQueryStringParameters(queryParams) {
  var qs = {};
  if (queryParams.isDefault()) {
    return qs;
  }
  var orderBy;
  if (queryParams.index_ === PRIORITY_INDEX) {
    orderBy = "$priority" /* REST_QUERY_CONSTANTS.PRIORITY_INDEX */;
  } else if (queryParams.index_ === VALUE_INDEX) {
    orderBy = "$value" /* REST_QUERY_CONSTANTS.VALUE_INDEX */;
  } else if (queryParams.index_ === KEY_INDEX) {
    orderBy = "$key" /* REST_QUERY_CONSTANTS.KEY_INDEX */;
  } else {
    (0, _util.assert)(queryParams.index_ instanceof PathIndex, 'Unrecognized index type!');
    orderBy = queryParams.index_.toString();
  }
  qs["orderBy" /* REST_QUERY_CONSTANTS.ORDER_BY */] = (0, _util.stringify)(orderBy);
  if (queryParams.startSet_) {
    var startParam = queryParams.startAfterSet_ ? "startAfter" /* REST_QUERY_CONSTANTS.START_AFTER */ : "startAt" /* REST_QUERY_CONSTANTS.START_AT */;
    qs[startParam] = (0, _util.stringify)(queryParams.indexStartValue_);
    if (queryParams.startNameSet_) {
      qs[startParam] += ',' + (0, _util.stringify)(queryParams.indexStartName_);
    }
  }
  if (queryParams.endSet_) {
    var endParam = queryParams.endBeforeSet_ ? "endBefore" /* REST_QUERY_CONSTANTS.END_BEFORE */ : "endAt" /* REST_QUERY_CONSTANTS.END_AT */;
    qs[endParam] = (0, _util.stringify)(queryParams.indexEndValue_);
    if (queryParams.endNameSet_) {
      qs[endParam] += ',' + (0, _util.stringify)(queryParams.indexEndName_);
    }
  }
  if (queryParams.limitSet_) {
    if (queryParams.isViewFromLeft()) {
      qs["limitToFirst" /* REST_QUERY_CONSTANTS.LIMIT_TO_FIRST */] = queryParams.limit_;
    } else {
      qs["limitToLast" /* REST_QUERY_CONSTANTS.LIMIT_TO_LAST */] = queryParams.limit_;
    }
  }
  return qs;
}
function queryParamsGetQueryObject(queryParams) {
  var obj = {};
  if (queryParams.startSet_) {
    obj["sp" /* WIRE_PROTOCOL_CONSTANTS.INDEX_START_VALUE */] = queryParams.indexStartValue_;
    if (queryParams.startNameSet_) {
      obj["sn" /* WIRE_PROTOCOL_CONSTANTS.INDEX_START_NAME */] = queryParams.indexStartName_;
    }
    obj["sin" /* WIRE_PROTOCOL_CONSTANTS.INDEX_START_IS_INCLUSIVE */] = !queryParams.startAfterSet_;
  }
  if (queryParams.endSet_) {
    obj["ep" /* WIRE_PROTOCOL_CONSTANTS.INDEX_END_VALUE */] = queryParams.indexEndValue_;
    if (queryParams.endNameSet_) {
      obj["en" /* WIRE_PROTOCOL_CONSTANTS.INDEX_END_NAME */] = queryParams.indexEndName_;
    }
    obj["ein" /* WIRE_PROTOCOL_CONSTANTS.INDEX_END_IS_INCLUSIVE */] = !queryParams.endBeforeSet_;
  }
  if (queryParams.limitSet_) {
    obj["l" /* WIRE_PROTOCOL_CONSTANTS.LIMIT */] = queryParams.limit_;
    var viewFrom = queryParams.viewFrom_;
    if (viewFrom === '') {
      if (queryParams.isViewFromLeft()) {
        viewFrom = "l" /* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_LEFT */;
      } else {
        viewFrom = "r" /* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_RIGHT */;
      }
    }
    obj["vf" /* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM */] = viewFrom;
  }
  // For now, priority index is the default, so we only specify if it's some other index
  if (queryParams.index_ !== PRIORITY_INDEX) {
    obj["i" /* WIRE_PROTOCOL_CONSTANTS.INDEX */] = queryParams.index_.toString();
  }
  return obj;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An implementation of ServerActions that communicates with the server via REST requests.
 * This is mostly useful for compatibility with crawlers, where we don't want to spin up a full
 * persistent connection (using WebSockets or long-polling)
 */
var ReadonlyRestClient = /*#__PURE__*/function (_ServerActions2) {
  /**
   * @param repoInfo_ - Data about the namespace we are connecting to
   * @param onDataUpdate_ - A callback for new data from the server
   */
  function ReadonlyRestClient(repoInfo_, onDataUpdate_, authTokenProvider_, appCheckTokenProvider_) {
    var _this32;
    _classCallCheck(this, ReadonlyRestClient);
    _this32 = _callSuper(this, ReadonlyRestClient);
    _this32.repoInfo_ = repoInfo_;
    _this32.onDataUpdate_ = onDataUpdate_;
    _this32.authTokenProvider_ = authTokenProvider_;
    _this32.appCheckTokenProvider_ = appCheckTokenProvider_;
    /** @private {function(...[*])} */
    _this32.log_ = logWrapper('p:rest:');
    /**
     * We don't actually need to track listens, except to prevent us calling an onComplete for a listen
     * that's been removed. :-/
     */
    _this32.listens_ = {};
    return _this32;
  }
  /** @inheritDoc */
  _inherits(ReadonlyRestClient, _ServerActions2);
  return _createClass(ReadonlyRestClient, [{
    key: "reportStats",
    value: function reportStats(stats) {
      throw new Error('Method not implemented.');
    }
  }, {
    key: "listen",
    value: function listen(query, currentHashFn, tag, onComplete) {
      var _this33 = this;
      var pathString = query._path.toString();
      this.log_('Listen called for ' + pathString + ' ' + query._queryIdentifier);
      // Mark this listener so we can tell if it's removed.
      var listenId = ReadonlyRestClient.getListenId_(query, tag);
      var thisListen = {};
      this.listens_[listenId] = thisListen;
      var queryStringParameters = queryParamsToRestQueryStringParameters(query._queryParams);
      this.restRequest_(pathString + '.json', queryStringParameters, function (error, result) {
        var data = result;
        if (error === 404) {
          data = null;
          error = null;
        }
        if (error === null) {
          _this33.onDataUpdate_(pathString, data, /*isMerge=*/false, tag);
        }
        if ((0, _util.safeGet)(_this33.listens_, listenId) === thisListen) {
          var status;
          if (!error) {
            status = 'ok';
          } else if (error === 401) {
            status = 'permission_denied';
          } else {
            status = 'rest_error:' + error;
          }
          onComplete(status, null);
        }
      });
    }
    /** @inheritDoc */
  }, {
    key: "unlisten",
    value: function unlisten(query, tag) {
      var listenId = ReadonlyRestClient.getListenId_(query, tag);
      delete this.listens_[listenId];
    }
  }, {
    key: "get",
    value: function get(query) {
      var _this34 = this;
      var queryStringParameters = queryParamsToRestQueryStringParameters(query._queryParams);
      var pathString = query._path.toString();
      var deferred = new _util.Deferred();
      this.restRequest_(pathString + '.json', queryStringParameters, function (error, result) {
        var data = result;
        if (error === 404) {
          data = null;
          error = null;
        }
        if (error === null) {
          _this34.onDataUpdate_(pathString, data, /*isMerge=*/false, /*tag=*/null);
          deferred.resolve(data);
        } else {
          deferred.reject(new Error(data));
        }
      });
      return deferred.promise;
    }
    /** @inheritDoc */
  }, {
    key: "refreshAuthToken",
    value: function refreshAuthToken(token) {
      // no-op since we just always call getToken.
    }
    /**
     * Performs a REST request to the given path, with the provided query string parameters,
     * and any auth credentials we have.
     */
  }, {
    key: "restRequest_",
    value: function restRequest_(pathString) {
      var _this35 = this;
      var queryStringParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      queryStringParameters['format'] = 'export';
      return Promise.all([this.authTokenProvider_.getToken(/*forceRefresh=*/false), this.appCheckTokenProvider_.getToken(/*forceRefresh=*/false)]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          authToken = _ref2[0],
          appCheckToken = _ref2[1];
        if (authToken && authToken.accessToken) {
          queryStringParameters['auth'] = authToken.accessToken;
        }
        if (appCheckToken && appCheckToken.token) {
          queryStringParameters['ac'] = appCheckToken.token;
        }
        var url = (_this35.repoInfo_.secure ? 'https://' : 'http://') + _this35.repoInfo_.host + pathString + '?' + 'ns=' + _this35.repoInfo_.namespace + (0, _util.querystring)(queryStringParameters);
        _this35.log_('Sending REST request for ' + url);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (callback && xhr.readyState === 4) {
            _this35.log_('REST Response for ' + url + ' received. status:', xhr.status, 'response:', xhr.responseText);
            var res = null;
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                res = (0, _util.jsonEval)(xhr.responseText);
              } catch (e) {
                warn('Failed to parse JSON response for ' + url + ': ' + xhr.responseText);
              }
              callback(null, res);
            } else {
              // 401 and 404 are expected.
              if (xhr.status !== 401 && xhr.status !== 404) {
                warn('Got unsuccessful REST response for ' + url + ' Status: ' + xhr.status);
              }
              callback(xhr.status);
            }
            callback = null;
          }
        };
        xhr.open('GET', url, /*asynchronous=*/true);
        xhr.send();
      });
    }
  }], [{
    key: "getListenId_",
    value: function getListenId_(query, tag) {
      if (tag !== undefined) {
        return 'tag$' + tag;
      } else {
        (0, _util.assert)(query._queryParams.isDefault(), "should have a tag if it's not a default query.");
        return query._path.toString();
      }
    }
  }]);
}(ServerActions);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Mutable object which basically just stores a reference to the "latest" immutable snapshot.
 */
var SnapshotHolder = /*#__PURE__*/function () {
  function SnapshotHolder() {
    _classCallCheck(this, SnapshotHolder);
    this.rootNode_ = ChildrenNode.EMPTY_NODE;
  }
  return _createClass(SnapshotHolder, [{
    key: "getNode",
    value: function getNode(path) {
      return this.rootNode_.getChild(path);
    }
  }, {
    key: "updateSnapshot",
    value: function updateSnapshot(path, newSnapshotNode) {
      this.rootNode_ = this.rootNode_.updateChild(path, newSnapshotNode);
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function newSparseSnapshotTree() {
  return {
    value: null,
    children: new Map()
  };
}
/**
 * Stores the given node at the specified path. If there is already a node
 * at a shallower path, it merges the new data into that snapshot node.
 *
 * @param path - Path to look up snapshot for.
 * @param data - The new data, or null.
 */
function sparseSnapshotTreeRemember(sparseSnapshotTree, path, data) {
  if (pathIsEmpty(path)) {
    sparseSnapshotTree.value = data;
    sparseSnapshotTree.children.clear();
  } else if (sparseSnapshotTree.value !== null) {
    sparseSnapshotTree.value = sparseSnapshotTree.value.updateChild(path, data);
  } else {
    var childKey = pathGetFront(path);
    if (!sparseSnapshotTree.children.has(childKey)) {
      sparseSnapshotTree.children.set(childKey, newSparseSnapshotTree());
    }
    var _child2 = sparseSnapshotTree.children.get(childKey);
    path = pathPopFront(path);
    sparseSnapshotTreeRemember(_child2, path, data);
  }
}
/**
 * Purge the data at path from the cache.
 *
 * @param path - Path to look up snapshot for.
 * @returns True if this node should now be removed.
 */
function sparseSnapshotTreeForget(sparseSnapshotTree, path) {
  if (pathIsEmpty(path)) {
    sparseSnapshotTree.value = null;
    sparseSnapshotTree.children.clear();
    return true;
  } else {
    if (sparseSnapshotTree.value !== null) {
      if (sparseSnapshotTree.value.isLeafNode()) {
        // We're trying to forget a node that doesn't exist
        return false;
      } else {
        var value = sparseSnapshotTree.value;
        sparseSnapshotTree.value = null;
        value.forEachChild(PRIORITY_INDEX, function (key, tree) {
          sparseSnapshotTreeRemember(sparseSnapshotTree, new Path(key), tree);
        });
        return sparseSnapshotTreeForget(sparseSnapshotTree, path);
      }
    } else if (sparseSnapshotTree.children.size > 0) {
      var childKey = pathGetFront(path);
      path = pathPopFront(path);
      if (sparseSnapshotTree.children.has(childKey)) {
        var safeToRemove = sparseSnapshotTreeForget(sparseSnapshotTree.children.get(childKey), path);
        if (safeToRemove) {
          sparseSnapshotTree.children.delete(childKey);
        }
      }
      return sparseSnapshotTree.children.size === 0;
    } else {
      return true;
    }
  }
}
/**
 * Recursively iterates through all of the stored tree and calls the
 * callback on each one.
 *
 * @param prefixPath - Path to look up node for.
 * @param func - The function to invoke for each tree.
 */
function sparseSnapshotTreeForEachTree(sparseSnapshotTree, prefixPath, func) {
  if (sparseSnapshotTree.value !== null) {
    func(prefixPath, sparseSnapshotTree.value);
  } else {
    sparseSnapshotTreeForEachChild(sparseSnapshotTree, function (key, tree) {
      var path = new Path(prefixPath.toString() + '/' + key);
      sparseSnapshotTreeForEachTree(tree, path, func);
    });
  }
}
/**
 * Iterates through each immediate child and triggers the callback.
 * Only seems to be used in tests.
 *
 * @param func - The function to invoke for each child.
 */
function sparseSnapshotTreeForEachChild(sparseSnapshotTree, func) {
  sparseSnapshotTree.children.forEach(function (tree, key) {
    func(key, tree);
  });
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns the delta from the previous call to get stats.
 *
 * @param collection_ - The collection to "listen" to.
 */
var StatsListener = /*#__PURE__*/function () {
  function StatsListener(collection_) {
    _classCallCheck(this, StatsListener);
    this.collection_ = collection_;
    this.last_ = null;
  }
  return _createClass(StatsListener, [{
    key: "get",
    value: function get() {
      var newStats = this.collection_.get();
      var delta = Object.assign({}, newStats);
      if (this.last_) {
        each(this.last_, function (stat, value) {
          delta[stat] = delta[stat] - value;
        });
      }
      this.last_ = newStats;
      return delta;
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Assuming some apps may have a short amount of time on page, and a bulk of firebase operations probably
// happen on page load, we try to report our first set of stats pretty quickly, but we wait at least 10
// seconds to try to ensure the Firebase connection is established / settled.
var FIRST_STATS_MIN_TIME = 10 * 1000;
var FIRST_STATS_MAX_TIME = 30 * 1000;
// We'll continue to report stats on average every 5 minutes.
var REPORT_STATS_INTERVAL = 5 * 60 * 1000;
var StatsReporter = /*#__PURE__*/function () {
  function StatsReporter(collection, server_) {
    _classCallCheck(this, StatsReporter);
    this.server_ = server_;
    this.statsToReport_ = {};
    this.statsListener_ = new StatsListener(collection);
    var timeout = FIRST_STATS_MIN_TIME + (FIRST_STATS_MAX_TIME - FIRST_STATS_MIN_TIME) * Math.random();
    setTimeoutNonBlocking(this.reportStats_.bind(this), Math.floor(timeout));
  }
  return _createClass(StatsReporter, [{
    key: "reportStats_",
    value: function reportStats_() {
      var _this36 = this;
      var stats = this.statsListener_.get();
      var reportedStats = {};
      var haveStatsToReport = false;
      each(stats, function (stat, value) {
        if (value > 0 && (0, _util.contains)(_this36.statsToReport_, stat)) {
          reportedStats[stat] = value;
          haveStatsToReport = true;
        }
      });
      if (haveStatsToReport) {
        this.server_.reportStats(reportedStats);
      }
      // queue our next run.
      setTimeoutNonBlocking(this.reportStats_.bind(this), Math.floor(Math.random() * 2 * REPORT_STATS_INTERVAL));
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 *
 * @enum
 */
var OperationType;
(function (OperationType) {
  OperationType[OperationType["OVERWRITE"] = 0] = "OVERWRITE";
  OperationType[OperationType["MERGE"] = 1] = "MERGE";
  OperationType[OperationType["ACK_USER_WRITE"] = 2] = "ACK_USER_WRITE";
  OperationType[OperationType["LISTEN_COMPLETE"] = 3] = "LISTEN_COMPLETE";
})(OperationType || (OperationType = {}));
function newOperationSourceUser() {
  return {
    fromUser: true,
    fromServer: false,
    queryId: null,
    tagged: false
  };
}
function newOperationSourceServer() {
  return {
    fromUser: false,
    fromServer: true,
    queryId: null,
    tagged: false
  };
}
function newOperationSourceServerTaggedQuery(queryId) {
  return {
    fromUser: false,
    fromServer: true,
    queryId: queryId,
    tagged: true
  };
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var AckUserWrite = /*#__PURE__*/function () {
  /**
   * @param affectedTree - A tree containing true for each affected path. Affected paths can't overlap.
   */
  function AckUserWrite(/** @inheritDoc */path, /** @inheritDoc */affectedTree, /** @inheritDoc */revert) {
    _classCallCheck(this, AckUserWrite);
    this.path = path;
    this.affectedTree = affectedTree;
    this.revert = revert;
    /** @inheritDoc */
    this.type = OperationType.ACK_USER_WRITE;
    /** @inheritDoc */
    this.source = newOperationSourceUser();
  }
  return _createClass(AckUserWrite, [{
    key: "operationForChild",
    value: function operationForChild(childName) {
      if (!pathIsEmpty(this.path)) {
        (0, _util.assert)(pathGetFront(this.path) === childName, 'operationForChild called for unrelated child.');
        return new AckUserWrite(pathPopFront(this.path), this.affectedTree, this.revert);
      } else if (this.affectedTree.value != null) {
        (0, _util.assert)(this.affectedTree.children.isEmpty(), 'affectedTree should not have overlapping affected paths.');
        // All child locations are affected as well; just return same operation.
        return this;
      } else {
        var childTree = this.affectedTree.subtree(new Path(childName));
        return new AckUserWrite(newEmptyPath(), childTree, this.revert);
      }
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ListenComplete = /*#__PURE__*/function () {
  function ListenComplete(source, path) {
    _classCallCheck(this, ListenComplete);
    this.source = source;
    this.path = path;
    /** @inheritDoc */
    this.type = OperationType.LISTEN_COMPLETE;
  }
  return _createClass(ListenComplete, [{
    key: "operationForChild",
    value: function operationForChild(childName) {
      if (pathIsEmpty(this.path)) {
        return new ListenComplete(this.source, newEmptyPath());
      } else {
        return new ListenComplete(this.source, pathPopFront(this.path));
      }
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Overwrite = /*#__PURE__*/function () {
  function Overwrite(source, path, snap) {
    _classCallCheck(this, Overwrite);
    this.source = source;
    this.path = path;
    this.snap = snap;
    /** @inheritDoc */
    this.type = OperationType.OVERWRITE;
  }
  return _createClass(Overwrite, [{
    key: "operationForChild",
    value: function operationForChild(childName) {
      if (pathIsEmpty(this.path)) {
        return new Overwrite(this.source, newEmptyPath(), this.snap.getImmediateChild(childName));
      } else {
        return new Overwrite(this.source, pathPopFront(this.path), this.snap);
      }
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Merge = /*#__PURE__*/function () {
  function Merge(/** @inheritDoc */source, /** @inheritDoc */path, /** @inheritDoc */children) {
    _classCallCheck(this, Merge);
    this.source = source;
    this.path = path;
    this.children = children;
    /** @inheritDoc */
    this.type = OperationType.MERGE;
  }
  return _createClass(Merge, [{
    key: "operationForChild",
    value: function operationForChild(childName) {
      if (pathIsEmpty(this.path)) {
        var childTree = this.children.subtree(new Path(childName));
        if (childTree.isEmpty()) {
          // This child is unaffected
          return null;
        } else if (childTree.value) {
          // We have a snapshot for the child in question.  This becomes an overwrite of the child.
          return new Overwrite(this.source, newEmptyPath(), childTree.value);
        } else {
          // This is a merge at a deeper level
          return new Merge(this.source, newEmptyPath(), childTree);
        }
      } else {
        (0, _util.assert)(pathGetFront(this.path) === childName, "Can't get a merge for a child not on the path of the operation");
        return new Merge(this.source, pathPopFront(this.path), this.children);
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      return 'Operation(' + this.path + ': ' + this.source.toString() + ' merge: ' + this.children.toString() + ')';
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A cache node only stores complete children. Additionally it holds a flag whether the node can be considered fully
 * initialized in the sense that we know at one point in time this represented a valid state of the world, e.g.
 * initialized with data from the server, or a complete overwrite by the client. The filtered flag also tracks
 * whether a node potentially had children removed due to a filter.
 */
var CacheNode = /*#__PURE__*/function () {
  function CacheNode(node_, fullyInitialized_, filtered_) {
    _classCallCheck(this, CacheNode);
    this.node_ = node_;
    this.fullyInitialized_ = fullyInitialized_;
    this.filtered_ = filtered_;
  }
  /**
   * Returns whether this node was fully initialized with either server data or a complete overwrite by the client
   */
  return _createClass(CacheNode, [{
    key: "isFullyInitialized",
    value: function isFullyInitialized() {
      return this.fullyInitialized_;
    }
    /**
     * Returns whether this node is potentially missing children due to a filter applied to the node
     */
  }, {
    key: "isFiltered",
    value: function isFiltered() {
      return this.filtered_;
    }
  }, {
    key: "isCompleteForPath",
    value: function isCompleteForPath(path) {
      if (pathIsEmpty(path)) {
        return this.isFullyInitialized() && !this.filtered_;
      }
      var childKey = pathGetFront(path);
      return this.isCompleteForChild(childKey);
    }
  }, {
    key: "isCompleteForChild",
    value: function isCompleteForChild(key) {
      return this.isFullyInitialized() && !this.filtered_ || this.node_.hasChild(key);
    }
  }, {
    key: "getNode",
    value: function getNode() {
      return this.node_;
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An EventGenerator is used to convert "raw" changes (Change) as computed by the
 * CacheDiffer into actual events (Event) that can be raised.  See generateEventsForChanges()
 * for details.
 *
 */
var EventGenerator = /*#__PURE__*/_createClass(function EventGenerator(query_) {
  _classCallCheck(this, EventGenerator);
  this.query_ = query_;
  this.index_ = this.query_._queryParams.getIndex();
});
/**
 * Given a set of raw changes (no moved events and prevName not specified yet), and a set of
 * EventRegistrations that should be notified of these changes, generate the actual events to be raised.
 *
 * Notes:
 *  - child_moved events will be synthesized at this time for any child_changed events that affect
 *    our index.
 *  - prevName will be calculated based on the index ordering.
 */
function eventGeneratorGenerateEventsForChanges(eventGenerator, changes, eventCache, eventRegistrations) {
  var events = [];
  var moves = [];
  changes.forEach(function (change) {
    if (change.type === "child_changed" /* ChangeType.CHILD_CHANGED */ && eventGenerator.index_.indexedValueChanged(change.oldSnap, change.snapshotNode)) {
      moves.push(changeChildMoved(change.childName, change.snapshotNode));
    }
  });
  eventGeneratorGenerateEventsForType(eventGenerator, events, "child_removed" /* ChangeType.CHILD_REMOVED */, changes, eventRegistrations, eventCache);
  eventGeneratorGenerateEventsForType(eventGenerator, events, "child_added" /* ChangeType.CHILD_ADDED */, changes, eventRegistrations, eventCache);
  eventGeneratorGenerateEventsForType(eventGenerator, events, "child_moved" /* ChangeType.CHILD_MOVED */, moves, eventRegistrations, eventCache);
  eventGeneratorGenerateEventsForType(eventGenerator, events, "child_changed" /* ChangeType.CHILD_CHANGED */, changes, eventRegistrations, eventCache);
  eventGeneratorGenerateEventsForType(eventGenerator, events, "value" /* ChangeType.VALUE */, changes, eventRegistrations, eventCache);
  return events;
}
/**
 * Given changes of a single change type, generate the corresponding events.
 */
function eventGeneratorGenerateEventsForType(eventGenerator, events, eventType, changes, registrations, eventCache) {
  var filteredChanges = changes.filter(function (change) {
    return change.type === eventType;
  });
  filteredChanges.sort(function (a, b) {
    return eventGeneratorCompareChanges(eventGenerator, a, b);
  });
  filteredChanges.forEach(function (change) {
    var materializedChange = eventGeneratorMaterializeSingleChange(eventGenerator, change, eventCache);
    registrations.forEach(function (registration) {
      if (registration.respondsTo(change.type)) {
        events.push(registration.createEvent(materializedChange, eventGenerator.query_));
      }
    });
  });
}
function eventGeneratorMaterializeSingleChange(eventGenerator, change, eventCache) {
  if (change.type === 'value' || change.type === 'child_removed') {
    return change;
  } else {
    change.prevName = eventCache.getPredecessorChildName(change.childName, change.snapshotNode, eventGenerator.index_);
    return change;
  }
}
function eventGeneratorCompareChanges(eventGenerator, a, b) {
  if (a.childName == null || b.childName == null) {
    throw (0, _util.assertionError)('Should only compare child_ events.');
  }
  var aWrapped = new NamedNode(a.childName, a.snapshotNode);
  var bWrapped = new NamedNode(b.childName, b.snapshotNode);
  return eventGenerator.index_.compare(aWrapped, bWrapped);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function newViewCache(eventCache, serverCache) {
  return {
    eventCache: eventCache,
    serverCache: serverCache
  };
}
function viewCacheUpdateEventSnap(viewCache, eventSnap, complete, filtered) {
  return newViewCache(new CacheNode(eventSnap, complete, filtered), viewCache.serverCache);
}
function viewCacheUpdateServerSnap(viewCache, serverSnap, complete, filtered) {
  return newViewCache(viewCache.eventCache, new CacheNode(serverSnap, complete, filtered));
}
function viewCacheGetCompleteEventSnap(viewCache) {
  return viewCache.eventCache.isFullyInitialized() ? viewCache.eventCache.getNode() : null;
}
function viewCacheGetCompleteServerSnap(viewCache) {
  return viewCache.serverCache.isFullyInitialized() ? viewCache.serverCache.getNode() : null;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var emptyChildrenSingleton;
/**
 * Singleton empty children collection.
 *
 */
var EmptyChildren = function EmptyChildren() {
  if (!emptyChildrenSingleton) {
    emptyChildrenSingleton = new SortedMap(stringCompare);
  }
  return emptyChildrenSingleton;
};
/**
 * A tree with immutable elements.
 */
var ImmutableTree = /*#__PURE__*/function () {
  function ImmutableTree(value) {
    var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EmptyChildren();
    _classCallCheck(this, ImmutableTree);
    this.value = value;
    this.children = children;
  }
  /**
   * True if the value is empty and there are no children
   */
  return _createClass(ImmutableTree, [{
    key: "isEmpty",
    value: function isEmpty() {
      return this.value === null && this.children.isEmpty();
    }
    /**
     * Given a path and predicate, return the first node and the path to that node
     * where the predicate returns true.
     *
     * TODO Do a perf test -- If we're creating a bunch of `{path: value:}`
     * objects on the way back out, it may be better to pass down a pathSoFar obj.
     *
     * @param relativePath - The remainder of the path
     * @param predicate - The predicate to satisfy to return a node
     */
  }, {
    key: "findRootMostMatchingPathAndValue",
    value: function findRootMostMatchingPathAndValue(relativePath, predicate) {
      if (this.value != null && predicate(this.value)) {
        return {
          path: newEmptyPath(),
          value: this.value
        };
      } else {
        if (pathIsEmpty(relativePath)) {
          return null;
        } else {
          var front = pathGetFront(relativePath);
          var _child3 = this.children.get(front);
          if (_child3 !== null) {
            var childExistingPathAndValue = _child3.findRootMostMatchingPathAndValue(pathPopFront(relativePath), predicate);
            if (childExistingPathAndValue != null) {
              var fullPath = pathChild(new Path(front), childExistingPathAndValue.path);
              return {
                path: fullPath,
                value: childExistingPathAndValue.value
              };
            } else {
              return null;
            }
          } else {
            return null;
          }
        }
      }
    }
    /**
     * Find, if it exists, the shortest subpath of the given path that points a defined
     * value in the tree
     */
  }, {
    key: "findRootMostValueAndPath",
    value: function findRootMostValueAndPath(relativePath) {
      return this.findRootMostMatchingPathAndValue(relativePath, function () {
        return true;
      });
    }
    /**
     * @returns The subtree at the given path
     */
  }, {
    key: "subtree",
    value: function subtree(relativePath) {
      if (pathIsEmpty(relativePath)) {
        return this;
      } else {
        var front = pathGetFront(relativePath);
        var childTree = this.children.get(front);
        if (childTree !== null) {
          return childTree.subtree(pathPopFront(relativePath));
        } else {
          return new ImmutableTree(null);
        }
      }
    }
    /**
     * Sets a value at the specified path.
     *
     * @param relativePath - Path to set value at.
     * @param toSet - Value to set.
     * @returns Resulting tree.
     */
  }, {
    key: "set",
    value: function set(relativePath, toSet) {
      if (pathIsEmpty(relativePath)) {
        return new ImmutableTree(toSet, this.children);
      } else {
        var front = pathGetFront(relativePath);
        var _child4 = this.children.get(front) || new ImmutableTree(null);
        var newChild = _child4.set(pathPopFront(relativePath), toSet);
        var newChildren = this.children.insert(front, newChild);
        return new ImmutableTree(this.value, newChildren);
      }
    }
    /**
     * Removes the value at the specified path.
     *
     * @param relativePath - Path to value to remove.
     * @returns Resulting tree.
     */
  }, {
    key: "remove",
    value: function remove(relativePath) {
      if (pathIsEmpty(relativePath)) {
        if (this.children.isEmpty()) {
          return new ImmutableTree(null);
        } else {
          return new ImmutableTree(null, this.children);
        }
      } else {
        var front = pathGetFront(relativePath);
        var _child5 = this.children.get(front);
        if (_child5) {
          var newChild = _child5.remove(pathPopFront(relativePath));
          var newChildren;
          if (newChild.isEmpty()) {
            newChildren = this.children.remove(front);
          } else {
            newChildren = this.children.insert(front, newChild);
          }
          if (this.value === null && newChildren.isEmpty()) {
            return new ImmutableTree(null);
          } else {
            return new ImmutableTree(this.value, newChildren);
          }
        } else {
          return this;
        }
      }
    }
    /**
     * Gets a value from the tree.
     *
     * @param relativePath - Path to get value for.
     * @returns Value at path, or null.
     */
  }, {
    key: "get",
    value: function get(relativePath) {
      if (pathIsEmpty(relativePath)) {
        return this.value;
      } else {
        var front = pathGetFront(relativePath);
        var _child6 = this.children.get(front);
        if (_child6) {
          return _child6.get(pathPopFront(relativePath));
        } else {
          return null;
        }
      }
    }
    /**
     * Replace the subtree at the specified path with the given new tree.
     *
     * @param relativePath - Path to replace subtree for.
     * @param newTree - New tree.
     * @returns Resulting tree.
     */
  }, {
    key: "setTree",
    value: function setTree(relativePath, newTree) {
      if (pathIsEmpty(relativePath)) {
        return newTree;
      } else {
        var front = pathGetFront(relativePath);
        var _child7 = this.children.get(front) || new ImmutableTree(null);
        var newChild = _child7.setTree(pathPopFront(relativePath), newTree);
        var newChildren;
        if (newChild.isEmpty()) {
          newChildren = this.children.remove(front);
        } else {
          newChildren = this.children.insert(front, newChild);
        }
        return new ImmutableTree(this.value, newChildren);
      }
    }
    /**
     * Performs a depth first fold on this tree. Transforms a tree into a single
     * value, given a function that operates on the path to a node, an optional
     * current value, and a map of child names to folded subtrees
     */
  }, {
    key: "fold",
    value: function fold(fn) {
      return this.fold_(newEmptyPath(), fn);
    }
    /**
     * Recursive helper for public-facing fold() method
     */
  }, {
    key: "fold_",
    value: function fold_(pathSoFar, fn) {
      var accum = {};
      this.children.inorderTraversal(function (childKey, childTree) {
        accum[childKey] = childTree.fold_(pathChild(pathSoFar, childKey), fn);
      });
      return fn(pathSoFar, this.value, accum);
    }
    /**
     * Find the first matching value on the given path. Return the result of applying f to it.
     */
  }, {
    key: "findOnPath",
    value: function findOnPath(path, f) {
      return this.findOnPath_(path, newEmptyPath(), f);
    }
  }, {
    key: "findOnPath_",
    value: function findOnPath_(pathToFollow, pathSoFar, f) {
      var result = this.value ? f(pathSoFar, this.value) : false;
      if (result) {
        return result;
      } else {
        if (pathIsEmpty(pathToFollow)) {
          return null;
        } else {
          var front = pathGetFront(pathToFollow);
          var nextChild = this.children.get(front);
          if (nextChild) {
            return nextChild.findOnPath_(pathPopFront(pathToFollow), pathChild(pathSoFar, front), f);
          } else {
            return null;
          }
        }
      }
    }
  }, {
    key: "foreachOnPath",
    value: function foreachOnPath(path, f) {
      return this.foreachOnPath_(path, newEmptyPath(), f);
    }
  }, {
    key: "foreachOnPath_",
    value: function foreachOnPath_(pathToFollow, currentRelativePath, f) {
      if (pathIsEmpty(pathToFollow)) {
        return this;
      } else {
        if (this.value) {
          f(currentRelativePath, this.value);
        }
        var front = pathGetFront(pathToFollow);
        var nextChild = this.children.get(front);
        if (nextChild) {
          return nextChild.foreachOnPath_(pathPopFront(pathToFollow), pathChild(currentRelativePath, front), f);
        } else {
          return new ImmutableTree(null);
        }
      }
    }
    /**
     * Calls the given function for each node in the tree that has a value.
     *
     * @param f - A function to be called with the path from the root of the tree to
     * a node, and the value at that node. Called in depth-first order.
     */
  }, {
    key: "foreach",
    value: function foreach(f) {
      this.foreach_(newEmptyPath(), f);
    }
  }, {
    key: "foreach_",
    value: function foreach_(currentRelativePath, f) {
      this.children.inorderTraversal(function (childName, childTree) {
        childTree.foreach_(pathChild(currentRelativePath, childName), f);
      });
      if (this.value) {
        f(currentRelativePath, this.value);
      }
    }
  }, {
    key: "foreachChild",
    value: function foreachChild(f) {
      this.children.inorderTraversal(function (childName, childTree) {
        if (childTree.value) {
          f(childName, childTree.value);
        }
      });
    }
  }], [{
    key: "fromObject",
    value: function fromObject(obj) {
      var tree = new ImmutableTree(null);
      each(obj, function (childPath, childSnap) {
        tree = tree.set(new Path(childPath), childSnap);
      });
      return tree;
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * This class holds a collection of writes that can be applied to nodes in unison. It abstracts away the logic with
 * dealing with priority writes and multiple nested writes. At any given path there is only allowed to be one write
 * modifying that path. Any write to an existing path or shadowing an existing path will modify that existing write
 * to reflect the write added.
 */
var CompoundWrite = /*#__PURE__*/function () {
  function CompoundWrite(writeTree_) {
    _classCallCheck(this, CompoundWrite);
    this.writeTree_ = writeTree_;
  }
  return _createClass(CompoundWrite, null, [{
    key: "empty",
    value: function empty() {
      return new CompoundWrite(new ImmutableTree(null));
    }
  }]);
}();
function compoundWriteAddWrite(compoundWrite, path, node) {
  if (pathIsEmpty(path)) {
    return new CompoundWrite(new ImmutableTree(node));
  } else {
    var rootmost = compoundWrite.writeTree_.findRootMostValueAndPath(path);
    if (rootmost != null) {
      var rootMostPath = rootmost.path;
      var value = rootmost.value;
      var relativePath = newRelativePath(rootMostPath, path);
      value = value.updateChild(relativePath, node);
      return new CompoundWrite(compoundWrite.writeTree_.set(rootMostPath, value));
    } else {
      var subtree = new ImmutableTree(node);
      var _newWriteTree = compoundWrite.writeTree_.setTree(path, subtree);
      return new CompoundWrite(_newWriteTree);
    }
  }
}
function compoundWriteAddWrites(compoundWrite, path, updates) {
  var newWrite = compoundWrite;
  each(updates, function (childKey, node) {
    newWrite = compoundWriteAddWrite(newWrite, pathChild(path, childKey), node);
  });
  return newWrite;
}
/**
 * Will remove a write at the given path and deeper paths. This will <em>not</em> modify a write at a higher
 * location, which must be removed by calling this method with that path.
 *
 * @param compoundWrite - The CompoundWrite to remove.
 * @param path - The path at which a write and all deeper writes should be removed
 * @returns The new CompoundWrite with the removed path
 */
function compoundWriteRemoveWrite(compoundWrite, path) {
  if (pathIsEmpty(path)) {
    return CompoundWrite.empty();
  } else {
    var _newWriteTree2 = compoundWrite.writeTree_.setTree(path, new ImmutableTree(null));
    return new CompoundWrite(_newWriteTree2);
  }
}
/**
 * Returns whether this CompoundWrite will fully overwrite a node at a given location and can therefore be
 * considered "complete".
 *
 * @param compoundWrite - The CompoundWrite to check.
 * @param path - The path to check for
 * @returns Whether there is a complete write at that path
 */
function compoundWriteHasCompleteWrite(compoundWrite, path) {
  return compoundWriteGetCompleteNode(compoundWrite, path) != null;
}
/**
 * Returns a node for a path if and only if the node is a "complete" overwrite at that path. This will not aggregate
 * writes from deeper paths, but will return child nodes from a more shallow path.
 *
 * @param compoundWrite - The CompoundWrite to get the node from.
 * @param path - The path to get a complete write
 * @returns The node if complete at that path, or null otherwise.
 */
function compoundWriteGetCompleteNode(compoundWrite, path) {
  var rootmost = compoundWrite.writeTree_.findRootMostValueAndPath(path);
  if (rootmost != null) {
    return compoundWrite.writeTree_.get(rootmost.path).getChild(newRelativePath(rootmost.path, path));
  } else {
    return null;
  }
}
/**
 * Returns all children that are guaranteed to be a complete overwrite.
 *
 * @param compoundWrite - The CompoundWrite to get children from.
 * @returns A list of all complete children.
 */
function compoundWriteGetCompleteChildren(compoundWrite) {
  var children = [];
  var node = compoundWrite.writeTree_.value;
  if (node != null) {
    // If it's a leaf node, it has no children; so nothing to do.
    if (!node.isLeafNode()) {
      node.forEachChild(PRIORITY_INDEX, function (childName, childNode) {
        children.push(new NamedNode(childName, childNode));
      });
    }
  } else {
    compoundWrite.writeTree_.children.inorderTraversal(function (childName, childTree) {
      if (childTree.value != null) {
        children.push(new NamedNode(childName, childTree.value));
      }
    });
  }
  return children;
}
function compoundWriteChildCompoundWrite(compoundWrite, path) {
  if (pathIsEmpty(path)) {
    return compoundWrite;
  } else {
    var shadowingNode = compoundWriteGetCompleteNode(compoundWrite, path);
    if (shadowingNode != null) {
      return new CompoundWrite(new ImmutableTree(shadowingNode));
    } else {
      return new CompoundWrite(compoundWrite.writeTree_.subtree(path));
    }
  }
}
/**
 * Returns true if this CompoundWrite is empty and therefore does not modify any nodes.
 * @returns Whether this CompoundWrite is empty
 */
function compoundWriteIsEmpty(compoundWrite) {
  return compoundWrite.writeTree_.isEmpty();
}
/**
 * Applies this CompoundWrite to a node. The node is returned with all writes from this CompoundWrite applied to the
 * node
 * @param node - The node to apply this CompoundWrite to
 * @returns The node with all writes applied
 */
function compoundWriteApply(compoundWrite, node) {
  return applySubtreeWrite(newEmptyPath(), compoundWrite.writeTree_, node);
}
function applySubtreeWrite(relativePath, writeTree, node) {
  if (writeTree.value != null) {
    // Since there a write is always a leaf, we're done here
    return node.updateChild(relativePath, writeTree.value);
  } else {
    var priorityWrite = null;
    writeTree.children.inorderTraversal(function (childKey, childTree) {
      if (childKey === '.priority') {
        // Apply priorities at the end so we don't update priorities for either empty nodes or forget
        // to apply priorities to empty nodes that are later filled
        (0, _util.assert)(childTree.value !== null, 'Priority writes must always be leaf nodes');
        priorityWrite = childTree.value;
      } else {
        node = applySubtreeWrite(pathChild(relativePath, childKey), childTree, node);
      }
    });
    // If there was a priority write, we only apply it if the node is not empty
    if (!node.getChild(relativePath).isEmpty() && priorityWrite !== null) {
      node = node.updateChild(pathChild(relativePath, '.priority'), priorityWrite);
    }
    return node;
  }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Create a new WriteTreeRef for the given path. For use with a new sync point at the given path.
 *
 */
function writeTreeChildWrites(writeTree, path) {
  return newWriteTreeRef(path, writeTree);
}
/**
 * Record a new overwrite from user code.
 *
 * @param visible - This is set to false by some transactions. It should be excluded from event caches
 */
function writeTreeAddOverwrite(writeTree, path, snap, writeId, visible) {
  (0, _util.assert)(writeId > writeTree.lastWriteId, 'Stacking an older write on top of newer ones');
  if (visible === undefined) {
    visible = true;
  }
  writeTree.allWrites.push({
    path: path,
    snap: snap,
    writeId: writeId,
    visible: visible
  });
  if (visible) {
    writeTree.visibleWrites = compoundWriteAddWrite(writeTree.visibleWrites, path, snap);
  }
  writeTree.lastWriteId = writeId;
}
/**
 * Record a new merge from user code.
 */
function writeTreeAddMerge(writeTree, path, changedChildren, writeId) {
  (0, _util.assert)(writeId > writeTree.lastWriteId, 'Stacking an older merge on top of newer ones');
  writeTree.allWrites.push({
    path: path,
    children: changedChildren,
    writeId: writeId,
    visible: true
  });
  writeTree.visibleWrites = compoundWriteAddWrites(writeTree.visibleWrites, path, changedChildren);
  writeTree.lastWriteId = writeId;
}
function writeTreeGetWrite(writeTree, writeId) {
  for (var i = 0; i < writeTree.allWrites.length; i++) {
    var record = writeTree.allWrites[i];
    if (record.writeId === writeId) {
      return record;
    }
  }
  return null;
}
/**
 * Remove a write (either an overwrite or merge) that has been successfully acknowledge by the server. Recalculates
 * the tree if necessary.  We return true if it may have been visible, meaning views need to reevaluate.
 *
 * @returns true if the write may have been visible (meaning we'll need to reevaluate / raise
 * events as a result).
 */
function writeTreeRemoveWrite(writeTree, writeId) {
  // Note: disabling this check. It could be a transaction that preempted another transaction, and thus was applied
  // out of order.
  //const validClear = revert || this.allWrites_.length === 0 || writeId <= this.allWrites_[0].writeId;
  //assert(validClear, "Either we don't have this write, or it's the first one in the queue");
  var idx = writeTree.allWrites.findIndex(function (s) {
    return s.writeId === writeId;
  });
  (0, _util.assert)(idx >= 0, 'removeWrite called with nonexistent writeId.');
  var writeToRemove = writeTree.allWrites[idx];
  writeTree.allWrites.splice(idx, 1);
  var removedWriteWasVisible = writeToRemove.visible;
  var removedWriteOverlapsWithOtherWrites = false;
  var i = writeTree.allWrites.length - 1;
  while (removedWriteWasVisible && i >= 0) {
    var currentWrite = writeTree.allWrites[i];
    if (currentWrite.visible) {
      if (i >= idx && writeTreeRecordContainsPath_(currentWrite, writeToRemove.path)) {
        // The removed write was completely shadowed by a subsequent write.
        removedWriteWasVisible = false;
      } else if (pathContains(writeToRemove.path, currentWrite.path)) {
        // Either we're covering some writes or they're covering part of us (depending on which came first).
        removedWriteOverlapsWithOtherWrites = true;
      }
    }
    i--;
  }
  if (!removedWriteWasVisible) {
    return false;
  } else if (removedWriteOverlapsWithOtherWrites) {
    // There's some shadowing going on. Just rebuild the visible writes from scratch.
    writeTreeResetTree_(writeTree);
    return true;
  } else {
    // There's no shadowing.  We can safely just remove the write(s) from visibleWrites.
    if (writeToRemove.snap) {
      writeTree.visibleWrites = compoundWriteRemoveWrite(writeTree.visibleWrites, writeToRemove.path);
    } else {
      var children = writeToRemove.children;
      each(children, function (childName) {
        writeTree.visibleWrites = compoundWriteRemoveWrite(writeTree.visibleWrites, pathChild(writeToRemove.path, childName));
      });
    }
    return true;
  }
}
function writeTreeRecordContainsPath_(writeRecord, path) {
  if (writeRecord.snap) {
    return pathContains(writeRecord.path, path);
  } else {
    for (var childName in writeRecord.children) {
      if (writeRecord.children.hasOwnProperty(childName) && pathContains(pathChild(writeRecord.path, childName), path)) {
        return true;
      }
    }
    return false;
  }
}
/**
 * Re-layer the writes and merges into a tree so we can efficiently calculate event snapshots
 */
function writeTreeResetTree_(writeTree) {
  writeTree.visibleWrites = writeTreeLayerTree_(writeTree.allWrites, writeTreeDefaultFilter_, newEmptyPath());
  if (writeTree.allWrites.length > 0) {
    writeTree.lastWriteId = writeTree.allWrites[writeTree.allWrites.length - 1].writeId;
  } else {
    writeTree.lastWriteId = -1;
  }
}
/**
 * The default filter used when constructing the tree. Keep everything that's visible.
 */
function writeTreeDefaultFilter_(write) {
  return write.visible;
}
/**
 * Static method. Given an array of WriteRecords, a filter for which ones to include, and a path, construct the tree of
 * event data at that path.
 */
function writeTreeLayerTree_(writes, filter, treeRoot) {
  var compoundWrite = CompoundWrite.empty();
  for (var i = 0; i < writes.length; ++i) {
    var write = writes[i];
    // Theory, a later set will either:
    // a) abort a relevant transaction, so no need to worry about excluding it from calculating that transaction
    // b) not be relevant to a transaction (separate branch), so again will not affect the data for that transaction
    if (filter(write)) {
      var writePath = write.path;
      var relativePath = void 0;
      if (write.snap) {
        if (pathContains(treeRoot, writePath)) {
          relativePath = newRelativePath(treeRoot, writePath);
          compoundWrite = compoundWriteAddWrite(compoundWrite, relativePath, write.snap);
        } else if (pathContains(writePath, treeRoot)) {
          relativePath = newRelativePath(writePath, treeRoot);
          compoundWrite = compoundWriteAddWrite(compoundWrite, newEmptyPath(), write.snap.getChild(relativePath));
        } else ;
      } else if (write.children) {
        if (pathContains(treeRoot, writePath)) {
          relativePath = newRelativePath(treeRoot, writePath);
          compoundWrite = compoundWriteAddWrites(compoundWrite, relativePath, write.children);
        } else if (pathContains(writePath, treeRoot)) {
          relativePath = newRelativePath(writePath, treeRoot);
          if (pathIsEmpty(relativePath)) {
            compoundWrite = compoundWriteAddWrites(compoundWrite, newEmptyPath(), write.children);
          } else {
            var _child8 = (0, _util.safeGet)(write.children, pathGetFront(relativePath));
            if (_child8) {
              // There exists a child in this node that matches the root path
              var deepNode = _child8.getChild(pathPopFront(relativePath));
              compoundWrite = compoundWriteAddWrite(compoundWrite, newEmptyPath(), deepNode);
            }
          }
        } else ;
      } else {
        throw (0, _util.assertionError)('WriteRecord should have .snap or .children');
      }
    }
  }
  return compoundWrite;
}
/**
 * Given optional, underlying server data, and an optional set of constraints (exclude some sets, include hidden
 * writes), attempt to calculate a complete snapshot for the given path
 *
 * @param writeIdsToExclude - An optional set to be excluded
 * @param includeHiddenWrites - Defaults to false, whether or not to layer on writes with visible set to false
 */
function writeTreeCalcCompleteEventCache(writeTree, treePath, completeServerCache, writeIdsToExclude, includeHiddenWrites) {
  if (!writeIdsToExclude && !includeHiddenWrites) {
    var shadowingNode = compoundWriteGetCompleteNode(writeTree.visibleWrites, treePath);
    if (shadowingNode != null) {
      return shadowingNode;
    } else {
      var subMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
      if (compoundWriteIsEmpty(subMerge)) {
        return completeServerCache;
      } else if (completeServerCache == null && !compoundWriteHasCompleteWrite(subMerge, newEmptyPath())) {
        // We wouldn't have a complete snapshot, since there's no underlying data and no complete shadow
        return null;
      } else {
        var layeredCache = completeServerCache || ChildrenNode.EMPTY_NODE;
        return compoundWriteApply(subMerge, layeredCache);
      }
    }
  } else {
    var merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
    if (!includeHiddenWrites && compoundWriteIsEmpty(merge)) {
      return completeServerCache;
    } else {
      // If the server cache is null, and we don't have a complete cache, we need to return null
      if (!includeHiddenWrites && completeServerCache == null && !compoundWriteHasCompleteWrite(merge, newEmptyPath())) {
        return null;
      } else {
        var filter = function filter(write) {
          return (write.visible || includeHiddenWrites) && (!writeIdsToExclude || !~writeIdsToExclude.indexOf(write.writeId)) && (pathContains(write.path, treePath) || pathContains(treePath, write.path));
        };
        var mergeAtPath = writeTreeLayerTree_(writeTree.allWrites, filter, treePath);
        var _layeredCache = completeServerCache || ChildrenNode.EMPTY_NODE;
        return compoundWriteApply(mergeAtPath, _layeredCache);
      }
    }
  }
}
/**
 * With optional, underlying server data, attempt to return a children node of children that we have complete data for.
 * Used when creating new views, to pre-fill their complete event children snapshot.
 */
function writeTreeCalcCompleteEventChildren(writeTree, treePath, completeServerChildren) {
  var completeChildren = ChildrenNode.EMPTY_NODE;
  var topLevelSet = compoundWriteGetCompleteNode(writeTree.visibleWrites, treePath);
  if (topLevelSet) {
    if (!topLevelSet.isLeafNode()) {
      // we're shadowing everything. Return the children.
      topLevelSet.forEachChild(PRIORITY_INDEX, function (childName, childSnap) {
        completeChildren = completeChildren.updateImmediateChild(childName, childSnap);
      });
    }
    return completeChildren;
  } else if (completeServerChildren) {
    // Layer any children we have on top of this
    // We know we don't have a top-level set, so just enumerate existing children
    var merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
    completeServerChildren.forEachChild(PRIORITY_INDEX, function (childName, childNode) {
      var node = compoundWriteApply(compoundWriteChildCompoundWrite(merge, new Path(childName)), childNode);
      completeChildren = completeChildren.updateImmediateChild(childName, node);
    });
    // Add any complete children we have from the set
    compoundWriteGetCompleteChildren(merge).forEach(function (namedNode) {
      completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
    });
    return completeChildren;
  } else {
    // We don't have anything to layer on top of. Layer on any children we have
    // Note that we can return an empty snap if we have a defined delete
    var _merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
    compoundWriteGetCompleteChildren(_merge).forEach(function (namedNode) {
      completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
    });
    return completeChildren;
  }
}
/**
 * Given that the underlying server data has updated, determine what, if anything, needs to be
 * applied to the event cache.
 *
 * Possibilities:
 *
 * 1. No writes are shadowing. Events should be raised, the snap to be applied comes from the server data
 *
 * 2. Some write is completely shadowing. No events to be raised
 *
 * 3. Is partially shadowed. Events
 *
 * Either existingEventSnap or existingServerSnap must exist
 */
function writeTreeCalcEventCacheAfterServerOverwrite(writeTree, treePath, childPath, existingEventSnap, existingServerSnap) {
  (0, _util.assert)(existingEventSnap || existingServerSnap, 'Either existingEventSnap or existingServerSnap must exist');
  var path = pathChild(treePath, childPath);
  if (compoundWriteHasCompleteWrite(writeTree.visibleWrites, path)) {
    // At this point we can probably guarantee that we're in case 2, meaning no events
    // May need to check visibility while doing the findRootMostValueAndPath call
    return null;
  } else {
    // No complete shadowing. We're either partially shadowing or not shadowing at all.
    var childMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, path);
    if (compoundWriteIsEmpty(childMerge)) {
      // We're not shadowing at all. Case 1
      return existingServerSnap.getChild(childPath);
    } else {
      // This could be more efficient if the serverNode + updates doesn't change the eventSnap
      // However this is tricky to find out, since user updates don't necessary change the server
      // snap, e.g. priority updates on empty nodes, or deep deletes. Another special case is if the server
      // adds nodes, but doesn't change any existing writes. It is therefore not enough to
      // only check if the updates change the serverNode.
      // Maybe check if the merge tree contains these special cases and only do a full overwrite in that case?
      return compoundWriteApply(childMerge, existingServerSnap.getChild(childPath));
    }
  }
}
/**
 * Returns a complete child for a given server snap after applying all user writes or null if there is no
 * complete child for this ChildKey.
 */
function writeTreeCalcCompleteChild(writeTree, treePath, childKey, existingServerSnap) {
  var path = pathChild(treePath, childKey);
  var shadowingNode = compoundWriteGetCompleteNode(writeTree.visibleWrites, path);
  if (shadowingNode != null) {
    return shadowingNode;
  } else {
    if (existingServerSnap.isCompleteForChild(childKey)) {
      var childMerge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, path);
      return compoundWriteApply(childMerge, existingServerSnap.getNode().getImmediateChild(childKey));
    } else {
      return null;
    }
  }
}
/**
 * Returns a node if there is a complete overwrite for this path. More specifically, if there is a write at
 * a higher path, this will return the child of that write relative to the write and this path.
 * Returns null if there is no write at this path.
 */
function writeTreeShadowingWrite(writeTree, path) {
  return compoundWriteGetCompleteNode(writeTree.visibleWrites, path);
}
/**
 * This method is used when processing child remove events on a query. If we can, we pull in children that were outside
 * the window, but may now be in the window.
 */
function writeTreeCalcIndexedSlice(writeTree, treePath, completeServerData, startPost, count, reverse, index) {
  var toIterate;
  var merge = compoundWriteChildCompoundWrite(writeTree.visibleWrites, treePath);
  var shadowingNode = compoundWriteGetCompleteNode(merge, newEmptyPath());
  if (shadowingNode != null) {
    toIterate = shadowingNode;
  } else if (completeServerData != null) {
    toIterate = compoundWriteApply(merge, completeServerData);
  } else {
    // no children to iterate on
    return [];
  }
  toIterate = toIterate.withIndex(index);
  if (!toIterate.isEmpty() && !toIterate.isLeafNode()) {
    var nodes = [];
    var cmp = index.getCompare();
    var iter = reverse ? toIterate.getReverseIteratorFrom(startPost, index) : toIterate.getIteratorFrom(startPost, index);
    var next = iter.getNext();
    while (next && nodes.length < count) {
      if (cmp(next, startPost) !== 0) {
        nodes.push(next);
      }
      next = iter.getNext();
    }
    return nodes;
  } else {
    return [];
  }
}
function newWriteTree() {
  return {
    visibleWrites: CompoundWrite.empty(),
    allWrites: [],
    lastWriteId: -1
  };
}
/**
 * If possible, returns a complete event cache, using the underlying server data if possible. In addition, can be used
 * to get a cache that includes hidden writes, and excludes arbitrary writes. Note that customizing the returned node
 * can lead to a more expensive calculation.
 *
 * @param writeIdsToExclude - Optional writes to exclude.
 * @param includeHiddenWrites - Defaults to false, whether or not to layer on writes with visible set to false
 */
function writeTreeRefCalcCompleteEventCache(writeTreeRef, completeServerCache, writeIdsToExclude, includeHiddenWrites) {
  return writeTreeCalcCompleteEventCache(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerCache, writeIdsToExclude, includeHiddenWrites);
}
/**
 * If possible, returns a children node containing all of the complete children we have data for. The returned data is a
 * mix of the given server data and write data.
 *
 */
function writeTreeRefCalcCompleteEventChildren(writeTreeRef, completeServerChildren) {
  return writeTreeCalcCompleteEventChildren(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerChildren);
}
/**
 * Given that either the underlying server data has updated or the outstanding writes have updated, determine what,
 * if anything, needs to be applied to the event cache.
 *
 * Possibilities:
 *
 * 1. No writes are shadowing. Events should be raised, the snap to be applied comes from the server data
 *
 * 2. Some write is completely shadowing. No events to be raised
 *
 * 3. Is partially shadowed. Events should be raised
 *
 * Either existingEventSnap or existingServerSnap must exist, this is validated via an assert
 *
 *
 */
function writeTreeRefCalcEventCacheAfterServerOverwrite(writeTreeRef, path, existingEventSnap, existingServerSnap) {
  return writeTreeCalcEventCacheAfterServerOverwrite(writeTreeRef.writeTree, writeTreeRef.treePath, path, existingEventSnap, existingServerSnap);
}
/**
 * Returns a node if there is a complete overwrite for this path. More specifically, if there is a write at
 * a higher path, this will return the child of that write relative to the write and this path.
 * Returns null if there is no write at this path.
 *
 */
function writeTreeRefShadowingWrite(writeTreeRef, path) {
  return writeTreeShadowingWrite(writeTreeRef.writeTree, pathChild(writeTreeRef.treePath, path));
}
/**
 * This method is used when processing child remove events on a query. If we can, we pull in children that were outside
 * the window, but may now be in the window
 */
function writeTreeRefCalcIndexedSlice(writeTreeRef, completeServerData, startPost, count, reverse, index) {
  return writeTreeCalcIndexedSlice(writeTreeRef.writeTree, writeTreeRef.treePath, completeServerData, startPost, count, reverse, index);
}
/**
 * Returns a complete child for a given server snap after applying all user writes or null if there is no
 * complete child for this ChildKey.
 */
function writeTreeRefCalcCompleteChild(writeTreeRef, childKey, existingServerCache) {
  return writeTreeCalcCompleteChild(writeTreeRef.writeTree, writeTreeRef.treePath, childKey, existingServerCache);
}
/**
 * Return a WriteTreeRef for a child.
 */
function writeTreeRefChild(writeTreeRef, childName) {
  return newWriteTreeRef(pathChild(writeTreeRef.treePath, childName), writeTreeRef.writeTree);
}
function newWriteTreeRef(path, writeTree) {
  return {
    treePath: path,
    writeTree: writeTree
  };
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ChildChangeAccumulator = /*#__PURE__*/function () {
  function ChildChangeAccumulator() {
    _classCallCheck(this, ChildChangeAccumulator);
    this.changeMap = new Map();
  }
  return _createClass(ChildChangeAccumulator, [{
    key: "trackChildChange",
    value: function trackChildChange(change) {
      var type = change.type;
      var childKey = change.childName;
      (0, _util.assert)(type === "child_added" /* ChangeType.CHILD_ADDED */ || type === "child_changed" /* ChangeType.CHILD_CHANGED */ || type === "child_removed" /* ChangeType.CHILD_REMOVED */, 'Only child changes supported for tracking');
      (0, _util.assert)(childKey !== '.priority', 'Only non-priority child changes can be tracked.');
      var oldChange = this.changeMap.get(childKey);
      if (oldChange) {
        var oldType = oldChange.type;
        if (type === "child_added" /* ChangeType.CHILD_ADDED */ && oldType === "child_removed" /* ChangeType.CHILD_REMOVED */) {
          this.changeMap.set(childKey, changeChildChanged(childKey, change.snapshotNode, oldChange.snapshotNode));
        } else if (type === "child_removed" /* ChangeType.CHILD_REMOVED */ && oldType === "child_added" /* ChangeType.CHILD_ADDED */) {
          this.changeMap.delete(childKey);
        } else if (type === "child_removed" /* ChangeType.CHILD_REMOVED */ && oldType === "child_changed" /* ChangeType.CHILD_CHANGED */) {
          this.changeMap.set(childKey, changeChildRemoved(childKey, oldChange.oldSnap));
        } else if (type === "child_changed" /* ChangeType.CHILD_CHANGED */ && oldType === "child_added" /* ChangeType.CHILD_ADDED */) {
          this.changeMap.set(childKey, changeChildAdded(childKey, change.snapshotNode));
        } else if (type === "child_changed" /* ChangeType.CHILD_CHANGED */ && oldType === "child_changed" /* ChangeType.CHILD_CHANGED */) {
          this.changeMap.set(childKey, changeChildChanged(childKey, change.snapshotNode, oldChange.oldSnap));
        } else {
          throw (0, _util.assertionError)('Illegal combination of changes: ' + change + ' occurred after ' + oldChange);
        }
      } else {
        this.changeMap.set(childKey, change);
      }
    }
  }, {
    key: "getChanges",
    value: function getChanges() {
      return Array.from(this.changeMap.values());
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An implementation of CompleteChildSource that never returns any additional children
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var NoCompleteChildSource_ = /*#__PURE__*/function () {
  function NoCompleteChildSource_() {
    _classCallCheck(this, NoCompleteChildSource_);
  }
  return _createClass(NoCompleteChildSource_, [{
    key: "getCompleteChild",
    value: function getCompleteChild(childKey) {
      return null;
    }
  }, {
    key: "getChildAfterChild",
    value: function getChildAfterChild(index, child, reverse) {
      return null;
    }
  }]);
}();
/**
 * Singleton instance.
 */
var NO_COMPLETE_CHILD_SOURCE = new NoCompleteChildSource_();
/**
 * An implementation of CompleteChildSource that uses a WriteTree in addition to any other server data or
 * old event caches available to calculate complete children.
 */
var WriteTreeCompleteChildSource = /*#__PURE__*/function () {
  function WriteTreeCompleteChildSource(writes_, viewCache_) {
    var optCompleteServerCache_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    _classCallCheck(this, WriteTreeCompleteChildSource);
    this.writes_ = writes_;
    this.viewCache_ = viewCache_;
    this.optCompleteServerCache_ = optCompleteServerCache_;
  }
  return _createClass(WriteTreeCompleteChildSource, [{
    key: "getCompleteChild",
    value: function getCompleteChild(childKey) {
      var node = this.viewCache_.eventCache;
      if (node.isCompleteForChild(childKey)) {
        return node.getNode().getImmediateChild(childKey);
      } else {
        var serverNode = this.optCompleteServerCache_ != null ? new CacheNode(this.optCompleteServerCache_, true, false) : this.viewCache_.serverCache;
        return writeTreeRefCalcCompleteChild(this.writes_, childKey, serverNode);
      }
    }
  }, {
    key: "getChildAfterChild",
    value: function getChildAfterChild(index, child, reverse) {
      var completeServerData = this.optCompleteServerCache_ != null ? this.optCompleteServerCache_ : viewCacheGetCompleteServerSnap(this.viewCache_);
      var nodes = writeTreeRefCalcIndexedSlice(this.writes_, completeServerData, child, 1, reverse, index);
      if (nodes.length === 0) {
        return null;
      } else {
        return nodes[0];
      }
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function newViewProcessor(filter) {
  return {
    filter: filter
  };
}
function viewProcessorAssertIndexed(viewProcessor, viewCache) {
  (0, _util.assert)(viewCache.eventCache.getNode().isIndexed(viewProcessor.filter.getIndex()), 'Event snap not indexed');
  (0, _util.assert)(viewCache.serverCache.getNode().isIndexed(viewProcessor.filter.getIndex()), 'Server snap not indexed');
}
function viewProcessorApplyOperation(viewProcessor, oldViewCache, operation, writesCache, completeCache) {
  var accumulator = new ChildChangeAccumulator();
  var newViewCache, filterServerNode;
  if (operation.type === OperationType.OVERWRITE) {
    var overwrite = operation;
    if (overwrite.source.fromUser) {
      newViewCache = viewProcessorApplyUserOverwrite(viewProcessor, oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, accumulator);
    } else {
      (0, _util.assert)(overwrite.source.fromServer, 'Unknown source.');
      // We filter the node if it's a tagged update or the node has been previously filtered  and the
      // update is not at the root in which case it is ok (and necessary) to mark the node unfiltered
      // again
      filterServerNode = overwrite.source.tagged || oldViewCache.serverCache.isFiltered() && !pathIsEmpty(overwrite.path);
      newViewCache = viewProcessorApplyServerOverwrite(viewProcessor, oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, filterServerNode, accumulator);
    }
  } else if (operation.type === OperationType.MERGE) {
    var merge = operation;
    if (merge.source.fromUser) {
      newViewCache = viewProcessorApplyUserMerge(viewProcessor, oldViewCache, merge.path, merge.children, writesCache, completeCache, accumulator);
    } else {
      (0, _util.assert)(merge.source.fromServer, 'Unknown source.');
      // We filter the node if it's a tagged update or the node has been previously filtered
      filterServerNode = merge.source.tagged || oldViewCache.serverCache.isFiltered();
      newViewCache = viewProcessorApplyServerMerge(viewProcessor, oldViewCache, merge.path, merge.children, writesCache, completeCache, filterServerNode, accumulator);
    }
  } else if (operation.type === OperationType.ACK_USER_WRITE) {
    var ackUserWrite = operation;
    if (!ackUserWrite.revert) {
      newViewCache = viewProcessorAckUserWrite(viewProcessor, oldViewCache, ackUserWrite.path, ackUserWrite.affectedTree, writesCache, completeCache, accumulator);
    } else {
      newViewCache = viewProcessorRevertUserWrite(viewProcessor, oldViewCache, ackUserWrite.path, writesCache, completeCache, accumulator);
    }
  } else if (operation.type === OperationType.LISTEN_COMPLETE) {
    newViewCache = viewProcessorListenComplete(viewProcessor, oldViewCache, operation.path, writesCache, accumulator);
  } else {
    throw (0, _util.assertionError)('Unknown operation type: ' + operation.type);
  }
  var changes = accumulator.getChanges();
  viewProcessorMaybeAddValueEvent(oldViewCache, newViewCache, changes);
  return {
    viewCache: newViewCache,
    changes: changes
  };
}
function viewProcessorMaybeAddValueEvent(oldViewCache, newViewCache, accumulator) {
  var eventSnap = newViewCache.eventCache;
  if (eventSnap.isFullyInitialized()) {
    var isLeafOrEmpty = eventSnap.getNode().isLeafNode() || eventSnap.getNode().isEmpty();
    var oldCompleteSnap = viewCacheGetCompleteEventSnap(oldViewCache);
    if (accumulator.length > 0 || !oldViewCache.eventCache.isFullyInitialized() || isLeafOrEmpty && !eventSnap.getNode().equals(oldCompleteSnap) || !eventSnap.getNode().getPriority().equals(oldCompleteSnap.getPriority())) {
      accumulator.push(changeValue(viewCacheGetCompleteEventSnap(newViewCache)));
    }
  }
}
function viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, viewCache, changePath, writesCache, source, accumulator) {
  var oldEventSnap = viewCache.eventCache;
  if (writeTreeRefShadowingWrite(writesCache, changePath) != null) {
    // we have a shadowing write, ignore changes
    return viewCache;
  } else {
    var newEventCache, serverNode;
    if (pathIsEmpty(changePath)) {
      // TODO: figure out how this plays with "sliding ack windows"
      (0, _util.assert)(viewCache.serverCache.isFullyInitialized(), 'If change path is empty, we must have complete server data');
      if (viewCache.serverCache.isFiltered()) {
        // We need to special case this, because we need to only apply writes to complete children, or
        // we might end up raising events for incomplete children. If the server data is filtered deep
        // writes cannot be guaranteed to be complete
        var serverCache = viewCacheGetCompleteServerSnap(viewCache);
        var completeChildren = serverCache instanceof ChildrenNode ? serverCache : ChildrenNode.EMPTY_NODE;
        var completeEventChildren = writeTreeRefCalcCompleteEventChildren(writesCache, completeChildren);
        newEventCache = viewProcessor.filter.updateFullNode(viewCache.eventCache.getNode(), completeEventChildren, accumulator);
      } else {
        var completeNode = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
        newEventCache = viewProcessor.filter.updateFullNode(viewCache.eventCache.getNode(), completeNode, accumulator);
      }
    } else {
      var childKey = pathGetFront(changePath);
      if (childKey === '.priority') {
        (0, _util.assert)(pathGetLength(changePath) === 1, "Can't have a priority with additional path components");
        var oldEventNode = oldEventSnap.getNode();
        serverNode = viewCache.serverCache.getNode();
        // we might have overwrites for this priority
        var updatedPriority = writeTreeRefCalcEventCacheAfterServerOverwrite(writesCache, changePath, oldEventNode, serverNode);
        if (updatedPriority != null) {
          newEventCache = viewProcessor.filter.updatePriority(oldEventNode, updatedPriority);
        } else {
          // priority didn't change, keep old node
          newEventCache = oldEventSnap.getNode();
        }
      } else {
        var childChangePath = pathPopFront(changePath);
        // update child
        var newEventChild;
        if (oldEventSnap.isCompleteForChild(childKey)) {
          serverNode = viewCache.serverCache.getNode();
          var eventChildUpdate = writeTreeRefCalcEventCacheAfterServerOverwrite(writesCache, changePath, oldEventSnap.getNode(), serverNode);
          if (eventChildUpdate != null) {
            newEventChild = oldEventSnap.getNode().getImmediateChild(childKey).updateChild(childChangePath, eventChildUpdate);
          } else {
            // Nothing changed, just keep the old child
            newEventChild = oldEventSnap.getNode().getImmediateChild(childKey);
          }
        } else {
          newEventChild = writeTreeRefCalcCompleteChild(writesCache, childKey, viewCache.serverCache);
        }
        if (newEventChild != null) {
          newEventCache = viewProcessor.filter.updateChild(oldEventSnap.getNode(), childKey, newEventChild, childChangePath, source, accumulator);
        } else {
          // no complete child available or no change
          newEventCache = oldEventSnap.getNode();
        }
      }
    }
    return viewCacheUpdateEventSnap(viewCache, newEventCache, oldEventSnap.isFullyInitialized() || pathIsEmpty(changePath), viewProcessor.filter.filtersNodes());
  }
}
function viewProcessorApplyServerOverwrite(viewProcessor, oldViewCache, changePath, changedSnap, writesCache, completeCache, filterServerNode, accumulator) {
  var oldServerSnap = oldViewCache.serverCache;
  var newServerCache;
  var serverFilter = filterServerNode ? viewProcessor.filter : viewProcessor.filter.getIndexedFilter();
  if (pathIsEmpty(changePath)) {
    newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), changedSnap, null);
  } else if (serverFilter.filtersNodes() && !oldServerSnap.isFiltered()) {
    // we want to filter the server node, but we didn't filter the server node yet, so simulate a full update
    var newServerNode = oldServerSnap.getNode().updateChild(changePath, changedSnap);
    newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), newServerNode, null);
  } else {
    var childKey = pathGetFront(changePath);
    if (!oldServerSnap.isCompleteForPath(changePath) && pathGetLength(changePath) > 1) {
      // We don't update incomplete nodes with updates intended for other listeners
      return oldViewCache;
    }
    var childChangePath = pathPopFront(changePath);
    var childNode = oldServerSnap.getNode().getImmediateChild(childKey);
    var newChildNode = childNode.updateChild(childChangePath, changedSnap);
    if (childKey === '.priority') {
      newServerCache = serverFilter.updatePriority(oldServerSnap.getNode(), newChildNode);
    } else {
      newServerCache = serverFilter.updateChild(oldServerSnap.getNode(), childKey, newChildNode, childChangePath, NO_COMPLETE_CHILD_SOURCE, null);
    }
  }
  var newViewCache = viewCacheUpdateServerSnap(oldViewCache, newServerCache, oldServerSnap.isFullyInitialized() || pathIsEmpty(changePath), serverFilter.filtersNodes());
  var source = new WriteTreeCompleteChildSource(writesCache, newViewCache, completeCache);
  return viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, newViewCache, changePath, writesCache, source, accumulator);
}
function viewProcessorApplyUserOverwrite(viewProcessor, oldViewCache, changePath, changedSnap, writesCache, completeCache, accumulator) {
  var oldEventSnap = oldViewCache.eventCache;
  var newViewCache, newEventCache;
  var source = new WriteTreeCompleteChildSource(writesCache, oldViewCache, completeCache);
  if (pathIsEmpty(changePath)) {
    newEventCache = viewProcessor.filter.updateFullNode(oldViewCache.eventCache.getNode(), changedSnap, accumulator);
    newViewCache = viewCacheUpdateEventSnap(oldViewCache, newEventCache, true, viewProcessor.filter.filtersNodes());
  } else {
    var childKey = pathGetFront(changePath);
    if (childKey === '.priority') {
      newEventCache = viewProcessor.filter.updatePriority(oldViewCache.eventCache.getNode(), changedSnap);
      newViewCache = viewCacheUpdateEventSnap(oldViewCache, newEventCache, oldEventSnap.isFullyInitialized(), oldEventSnap.isFiltered());
    } else {
      var childChangePath = pathPopFront(changePath);
      var oldChild = oldEventSnap.getNode().getImmediateChild(childKey);
      var newChild;
      if (pathIsEmpty(childChangePath)) {
        // Child overwrite, we can replace the child
        newChild = changedSnap;
      } else {
        var childNode = source.getCompleteChild(childKey);
        if (childNode != null) {
          if (pathGetBack(childChangePath) === '.priority' && childNode.getChild(pathParent(childChangePath)).isEmpty()) {
            // This is a priority update on an empty node. If this node exists on the server, the
            // server will send down the priority in the update, so ignore for now
            newChild = childNode;
          } else {
            newChild = childNode.updateChild(childChangePath, changedSnap);
          }
        } else {
          // There is no complete child node available
          newChild = ChildrenNode.EMPTY_NODE;
        }
      }
      if (!oldChild.equals(newChild)) {
        var newEventSnap = viewProcessor.filter.updateChild(oldEventSnap.getNode(), childKey, newChild, childChangePath, source, accumulator);
        newViewCache = viewCacheUpdateEventSnap(oldViewCache, newEventSnap, oldEventSnap.isFullyInitialized(), viewProcessor.filter.filtersNodes());
      } else {
        newViewCache = oldViewCache;
      }
    }
  }
  return newViewCache;
}
function viewProcessorCacheHasChild(viewCache, childKey) {
  return viewCache.eventCache.isCompleteForChild(childKey);
}
function viewProcessorApplyUserMerge(viewProcessor, viewCache, path, changedChildren, writesCache, serverCache, accumulator) {
  // HACK: In the case of a limit query, there may be some changes that bump things out of the
  // window leaving room for new items.  It's important we process these changes first, so we
  // iterate the changes twice, first processing any that affect items currently in view.
  // TODO: I consider an item "in view" if cacheHasChild is true, which checks both the server
  // and event snap.  I'm not sure if this will result in edge cases when a child is in one but
  // not the other.
  var curViewCache = viewCache;
  changedChildren.foreach(function (relativePath, childNode) {
    var writePath = pathChild(path, relativePath);
    if (viewProcessorCacheHasChild(viewCache, pathGetFront(writePath))) {
      curViewCache = viewProcessorApplyUserOverwrite(viewProcessor, curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
    }
  });
  changedChildren.foreach(function (relativePath, childNode) {
    var writePath = pathChild(path, relativePath);
    if (!viewProcessorCacheHasChild(viewCache, pathGetFront(writePath))) {
      curViewCache = viewProcessorApplyUserOverwrite(viewProcessor, curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
    }
  });
  return curViewCache;
}
function viewProcessorApplyMerge(viewProcessor, node, merge) {
  merge.foreach(function (relativePath, childNode) {
    node = node.updateChild(relativePath, childNode);
  });
  return node;
}
function viewProcessorApplyServerMerge(viewProcessor, viewCache, path, changedChildren, writesCache, serverCache, filterServerNode, accumulator) {
  // If we don't have a cache yet, this merge was intended for a previously listen in the same location. Ignore it and
  // wait for the complete data update coming soon.
  if (viewCache.serverCache.getNode().isEmpty() && !viewCache.serverCache.isFullyInitialized()) {
    return viewCache;
  }
  // HACK: In the case of a limit query, there may be some changes that bump things out of the
  // window leaving room for new items.  It's important we process these changes first, so we
  // iterate the changes twice, first processing any that affect items currently in view.
  // TODO: I consider an item "in view" if cacheHasChild is true, which checks both the server
  // and event snap.  I'm not sure if this will result in edge cases when a child is in one but
  // not the other.
  var curViewCache = viewCache;
  var viewMergeTree;
  if (pathIsEmpty(path)) {
    viewMergeTree = changedChildren;
  } else {
    viewMergeTree = new ImmutableTree(null).setTree(path, changedChildren);
  }
  var serverNode = viewCache.serverCache.getNode();
  viewMergeTree.children.inorderTraversal(function (childKey, childTree) {
    if (serverNode.hasChild(childKey)) {
      var serverChild = viewCache.serverCache.getNode().getImmediateChild(childKey);
      var newChild = viewProcessorApplyMerge(viewProcessor, serverChild, childTree);
      curViewCache = viewProcessorApplyServerOverwrite(viewProcessor, curViewCache, new Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
    }
  });
  viewMergeTree.children.inorderTraversal(function (childKey, childMergeTree) {
    var isUnknownDeepMerge = !viewCache.serverCache.isCompleteForChild(childKey) && childMergeTree.value === null;
    if (!serverNode.hasChild(childKey) && !isUnknownDeepMerge) {
      var serverChild = viewCache.serverCache.getNode().getImmediateChild(childKey);
      var newChild = viewProcessorApplyMerge(viewProcessor, serverChild, childMergeTree);
      curViewCache = viewProcessorApplyServerOverwrite(viewProcessor, curViewCache, new Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
    }
  });
  return curViewCache;
}
function viewProcessorAckUserWrite(viewProcessor, viewCache, ackPath, affectedTree, writesCache, completeCache, accumulator) {
  if (writeTreeRefShadowingWrite(writesCache, ackPath) != null) {
    return viewCache;
  }
  // Only filter server node if it is currently filtered
  var filterServerNode = viewCache.serverCache.isFiltered();
  // Essentially we'll just get our existing server cache for the affected paths and re-apply it as a server update
  // now that it won't be shadowed.
  var serverCache = viewCache.serverCache;
  if (affectedTree.value != null) {
    // This is an overwrite.
    if (pathIsEmpty(ackPath) && serverCache.isFullyInitialized() || serverCache.isCompleteForPath(ackPath)) {
      return viewProcessorApplyServerOverwrite(viewProcessor, viewCache, ackPath, serverCache.getNode().getChild(ackPath), writesCache, completeCache, filterServerNode, accumulator);
    } else if (pathIsEmpty(ackPath)) {
      // This is a goofy edge case where we are acking data at this location but don't have full data.  We
      // should just re-apply whatever we have in our cache as a merge.
      var changedChildren = new ImmutableTree(null);
      serverCache.getNode().forEachChild(KEY_INDEX, function (name, node) {
        changedChildren = changedChildren.set(new Path(name), node);
      });
      return viewProcessorApplyServerMerge(viewProcessor, viewCache, ackPath, changedChildren, writesCache, completeCache, filterServerNode, accumulator);
    } else {
      return viewCache;
    }
  } else {
    // This is a merge.
    var _changedChildren = new ImmutableTree(null);
    affectedTree.foreach(function (mergePath, value) {
      var serverCachePath = pathChild(ackPath, mergePath);
      if (serverCache.isCompleteForPath(serverCachePath)) {
        _changedChildren = _changedChildren.set(mergePath, serverCache.getNode().getChild(serverCachePath));
      }
    });
    return viewProcessorApplyServerMerge(viewProcessor, viewCache, ackPath, _changedChildren, writesCache, completeCache, filterServerNode, accumulator);
  }
}
function viewProcessorListenComplete(viewProcessor, viewCache, path, writesCache, accumulator) {
  var oldServerNode = viewCache.serverCache;
  var newViewCache = viewCacheUpdateServerSnap(viewCache, oldServerNode.getNode(), oldServerNode.isFullyInitialized() || pathIsEmpty(path), oldServerNode.isFiltered());
  return viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor, newViewCache, path, writesCache, NO_COMPLETE_CHILD_SOURCE, accumulator);
}
function viewProcessorRevertUserWrite(viewProcessor, viewCache, path, writesCache, completeServerCache, accumulator) {
  var complete;
  if (writeTreeRefShadowingWrite(writesCache, path) != null) {
    return viewCache;
  } else {
    var source = new WriteTreeCompleteChildSource(writesCache, viewCache, completeServerCache);
    var oldEventCache = viewCache.eventCache.getNode();
    var newEventCache;
    if (pathIsEmpty(path) || pathGetFront(path) === '.priority') {
      var newNode;
      if (viewCache.serverCache.isFullyInitialized()) {
        newNode = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
      } else {
        var serverChildren = viewCache.serverCache.getNode();
        (0, _util.assert)(serverChildren instanceof ChildrenNode, 'serverChildren would be complete if leaf node');
        newNode = writeTreeRefCalcCompleteEventChildren(writesCache, serverChildren);
      }
      newNode = newNode;
      newEventCache = viewProcessor.filter.updateFullNode(oldEventCache, newNode, accumulator);
    } else {
      var childKey = pathGetFront(path);
      var newChild = writeTreeRefCalcCompleteChild(writesCache, childKey, viewCache.serverCache);
      if (newChild == null && viewCache.serverCache.isCompleteForChild(childKey)) {
        newChild = oldEventCache.getImmediateChild(childKey);
      }
      if (newChild != null) {
        newEventCache = viewProcessor.filter.updateChild(oldEventCache, childKey, newChild, pathPopFront(path), source, accumulator);
      } else if (viewCache.eventCache.getNode().hasChild(childKey)) {
        // No complete child available, delete the existing one, if any
        newEventCache = viewProcessor.filter.updateChild(oldEventCache, childKey, ChildrenNode.EMPTY_NODE, pathPopFront(path), source, accumulator);
      } else {
        newEventCache = oldEventCache;
      }
      if (newEventCache.isEmpty() && viewCache.serverCache.isFullyInitialized()) {
        // We might have reverted all child writes. Maybe the old event was a leaf node
        complete = writeTreeRefCalcCompleteEventCache(writesCache, viewCacheGetCompleteServerSnap(viewCache));
        if (complete.isLeafNode()) {
          newEventCache = viewProcessor.filter.updateFullNode(newEventCache, complete, accumulator);
        }
      }
    }
    complete = viewCache.serverCache.isFullyInitialized() || writeTreeRefShadowingWrite(writesCache, newEmptyPath()) != null;
    return viewCacheUpdateEventSnap(viewCache, newEventCache, complete, viewProcessor.filter.filtersNodes());
  }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A view represents a specific location and query that has 1 or more event registrations.
 *
 * It does several things:
 *  - Maintains the list of event registrations for this location/query.
 *  - Maintains a cache of the data visible for this location/query.
 *  - Applies new operations (via applyOperation), updates the cache, and based on the event
 *    registrations returns the set of events to be raised.
 */
var View = /*#__PURE__*/function () {
  function View(query_, initialViewCache) {
    _classCallCheck(this, View);
    this.query_ = query_;
    this.eventRegistrations_ = [];
    var params = this.query_._queryParams;
    var indexFilter = new IndexedFilter(params.getIndex());
    var filter = queryParamsGetNodeFilter(params);
    this.processor_ = newViewProcessor(filter);
    var initialServerCache = initialViewCache.serverCache;
    var initialEventCache = initialViewCache.eventCache;
    // Don't filter server node with other filter than index, wait for tagged listen
    var serverSnap = indexFilter.updateFullNode(ChildrenNode.EMPTY_NODE, initialServerCache.getNode(), null);
    var eventSnap = filter.updateFullNode(ChildrenNode.EMPTY_NODE, initialEventCache.getNode(), null);
    var newServerCache = new CacheNode(serverSnap, initialServerCache.isFullyInitialized(), indexFilter.filtersNodes());
    var newEventCache = new CacheNode(eventSnap, initialEventCache.isFullyInitialized(), filter.filtersNodes());
    this.viewCache_ = newViewCache(newEventCache, newServerCache);
    this.eventGenerator_ = new EventGenerator(this.query_);
  }
  return _createClass(View, [{
    key: "query",
    get: function get() {
      return this.query_;
    }
  }]);
}();
function viewGetServerCache(view) {
  return view.viewCache_.serverCache.getNode();
}
function viewGetCompleteNode(view) {
  return viewCacheGetCompleteEventSnap(view.viewCache_);
}
function viewGetCompleteServerCache(view, path) {
  var cache = viewCacheGetCompleteServerSnap(view.viewCache_);
  if (cache) {
    // If this isn't a "loadsAllData" view, then cache isn't actually a complete cache and
    // we need to see if it contains the child we're interested in.
    if (view.query._queryParams.loadsAllData() || !pathIsEmpty(path) && !cache.getImmediateChild(pathGetFront(path)).isEmpty()) {
      return cache.getChild(path);
    }
  }
  return null;
}
function viewIsEmpty(view) {
  return view.eventRegistrations_.length === 0;
}
function viewAddEventRegistration(view, eventRegistration) {
  view.eventRegistrations_.push(eventRegistration);
}
/**
 * @param eventRegistration - If null, remove all callbacks.
 * @param cancelError - If a cancelError is provided, appropriate cancel events will be returned.
 * @returns Cancel events, if cancelError was provided.
 */
function viewRemoveEventRegistration(view, eventRegistration, cancelError) {
  var cancelEvents = [];
  if (cancelError) {
    (0, _util.assert)(eventRegistration == null, 'A cancel should cancel all event registrations.');
    var path = view.query._path;
    view.eventRegistrations_.forEach(function (registration) {
      var maybeEvent = registration.createCancelEvent(cancelError, path);
      if (maybeEvent) {
        cancelEvents.push(maybeEvent);
      }
    });
  }
  if (eventRegistration) {
    var remaining = [];
    for (var i = 0; i < view.eventRegistrations_.length; ++i) {
      var existing = view.eventRegistrations_[i];
      if (!existing.matches(eventRegistration)) {
        remaining.push(existing);
      } else if (eventRegistration.hasAnyCallback()) {
        // We're removing just this one
        remaining = remaining.concat(view.eventRegistrations_.slice(i + 1));
        break;
      }
    }
    view.eventRegistrations_ = remaining;
  } else {
    view.eventRegistrations_ = [];
  }
  return cancelEvents;
}
/**
 * Applies the given Operation, updates our cache, and returns the appropriate events.
 */
function viewApplyOperation(view, operation, writesCache, completeServerCache) {
  if (operation.type === OperationType.MERGE && operation.source.queryId !== null) {
    (0, _util.assert)(viewCacheGetCompleteServerSnap(view.viewCache_), 'We should always have a full cache before handling merges');
    (0, _util.assert)(viewCacheGetCompleteEventSnap(view.viewCache_), 'Missing event cache, even though we have a server cache');
  }
  var oldViewCache = view.viewCache_;
  var result = viewProcessorApplyOperation(view.processor_, oldViewCache, operation, writesCache, completeServerCache);
  viewProcessorAssertIndexed(view.processor_, result.viewCache);
  (0, _util.assert)(result.viewCache.serverCache.isFullyInitialized() || !oldViewCache.serverCache.isFullyInitialized(), 'Once a server snap is complete, it should never go back');
  view.viewCache_ = result.viewCache;
  return viewGenerateEventsForChanges_(view, result.changes, result.viewCache.eventCache.getNode(), null);
}
function viewGetInitialEvents(view, registration) {
  var eventSnap = view.viewCache_.eventCache;
  var initialChanges = [];
  if (!eventSnap.getNode().isLeafNode()) {
    var eventNode = eventSnap.getNode();
    eventNode.forEachChild(PRIORITY_INDEX, function (key, childNode) {
      initialChanges.push(changeChildAdded(key, childNode));
    });
  }
  if (eventSnap.isFullyInitialized()) {
    initialChanges.push(changeValue(eventSnap.getNode()));
  }
  return viewGenerateEventsForChanges_(view, initialChanges, eventSnap.getNode(), registration);
}
function viewGenerateEventsForChanges_(view, changes, eventCache, eventRegistration) {
  var registrations = eventRegistration ? [eventRegistration] : view.eventRegistrations_;
  return eventGeneratorGenerateEventsForChanges(view.eventGenerator_, changes, eventCache, registrations);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var referenceConstructor$1;
/**
 * SyncPoint represents a single location in a SyncTree with 1 or more event registrations, meaning we need to
 * maintain 1 or more Views at this location to cache server data and raise appropriate events for server changes
 * and user writes (set, transaction, update).
 *
 * It's responsible for:
 *  - Maintaining the set of 1 or more views necessary at this location (a SyncPoint with 0 views should be removed).
 *  - Proxying user / server operations to the views as appropriate (i.e. applyServerOverwrite,
 *    applyUserOverwrite, etc.)
 */
var SyncPoint = /*#__PURE__*/_createClass(function SyncPoint() {
  _classCallCheck(this, SyncPoint);
  /**
   * The Views being tracked at this location in the tree, stored as a map where the key is a
   * queryId and the value is the View for that query.
   *
   * NOTE: This list will be quite small (usually 1, but perhaps 2 or 3; any more is an odd use case).
   */
  this.views = new Map();
});
function syncPointSetReferenceConstructor(val) {
  (0, _util.assert)(!referenceConstructor$1, '__referenceConstructor has already been defined');
  referenceConstructor$1 = val;
}
function syncPointGetReferenceConstructor() {
  (0, _util.assert)(referenceConstructor$1, 'Reference.ts has not been loaded');
  return referenceConstructor$1;
}
function syncPointIsEmpty(syncPoint) {
  return syncPoint.views.size === 0;
}
function syncPointApplyOperation(syncPoint, operation, writesCache, optCompleteServerCache) {
  var queryId = operation.source.queryId;
  if (queryId !== null) {
    var view = syncPoint.views.get(queryId);
    (0, _util.assert)(view != null, 'SyncTree gave us an op for an invalid query.');
    return viewApplyOperation(view, operation, writesCache, optCompleteServerCache);
  } else {
    var events = [];
    var _iterator5 = _createForOfIteratorHelper(syncPoint.views.values()),
      _step4;
    try {
      for (_iterator5.s(); !(_step4 = _iterator5.n()).done;) {
        var _view = _step4.value;
        events = events.concat(viewApplyOperation(_view, operation, writesCache, optCompleteServerCache));
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    return events;
  }
}
/**
 * Get a view for the specified query.
 *
 * @param query - The query to return a view for
 * @param writesCache
 * @param serverCache
 * @param serverCacheComplete
 * @returns Events to raise.
 */
function syncPointGetView(syncPoint, query, writesCache, serverCache, serverCacheComplete) {
  var queryId = query._queryIdentifier;
  var view = syncPoint.views.get(queryId);
  if (!view) {
    // TODO: make writesCache take flag for complete server node
    var eventCache = writeTreeRefCalcCompleteEventCache(writesCache, serverCacheComplete ? serverCache : null);
    var eventCacheComplete = false;
    if (eventCache) {
      eventCacheComplete = true;
    } else if (serverCache instanceof ChildrenNode) {
      eventCache = writeTreeRefCalcCompleteEventChildren(writesCache, serverCache);
      eventCacheComplete = false;
    } else {
      eventCache = ChildrenNode.EMPTY_NODE;
      eventCacheComplete = false;
    }
    var viewCache = newViewCache(new CacheNode(eventCache, eventCacheComplete, false), new CacheNode(serverCache, serverCacheComplete, false));
    return new View(query, viewCache);
  }
  return view;
}
/**
 * Add an event callback for the specified query.
 *
 * @param query
 * @param eventRegistration
 * @param writesCache
 * @param serverCache - Complete server cache, if we have it.
 * @param serverCacheComplete
 * @returns Events to raise.
 */
function syncPointAddEventRegistration(syncPoint, query, eventRegistration, writesCache, serverCache, serverCacheComplete) {
  var view = syncPointGetView(syncPoint, query, writesCache, serverCache, serverCacheComplete);
  if (!syncPoint.views.has(query._queryIdentifier)) {
    syncPoint.views.set(query._queryIdentifier, view);
  }
  // This is guaranteed to exist now, we just created anything that was missing
  viewAddEventRegistration(view, eventRegistration);
  return viewGetInitialEvents(view, eventRegistration);
}
/**
 * Remove event callback(s).  Return cancelEvents if a cancelError is specified.
 *
 * If query is the default query, we'll check all views for the specified eventRegistration.
 * If eventRegistration is null, we'll remove all callbacks for the specified view(s).
 *
 * @param eventRegistration - If null, remove all callbacks.
 * @param cancelError - If a cancelError is provided, appropriate cancel events will be returned.
 * @returns removed queries and any cancel events
 */
function syncPointRemoveEventRegistration(syncPoint, query, eventRegistration, cancelError) {
  var queryId = query._queryIdentifier;
  var removed = [];
  var cancelEvents = [];
  var hadCompleteView = syncPointHasCompleteView(syncPoint);
  if (queryId === 'default') {
    // When you do ref.off(...), we search all views for the registration to remove.
    var _iterator6 = _createForOfIteratorHelper(syncPoint.views.entries()),
      _step5;
    try {
      for (_iterator6.s(); !(_step5 = _iterator6.n()).done;) {
        var _step5$value = _slicedToArray(_step5.value, 2),
          viewQueryId = _step5$value[0],
          view = _step5$value[1];
        cancelEvents = cancelEvents.concat(viewRemoveEventRegistration(view, eventRegistration, cancelError));
        if (viewIsEmpty(view)) {
          syncPoint.views.delete(viewQueryId);
          // We'll deal with complete views later.
          if (!view.query._queryParams.loadsAllData()) {
            removed.push(view.query);
          }
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  } else {
    // remove the callback from the specific view.
    var _view2 = syncPoint.views.get(queryId);
    if (_view2) {
      cancelEvents = cancelEvents.concat(viewRemoveEventRegistration(_view2, eventRegistration, cancelError));
      if (viewIsEmpty(_view2)) {
        syncPoint.views.delete(queryId);
        // We'll deal with complete views later.
        if (!_view2.query._queryParams.loadsAllData()) {
          removed.push(_view2.query);
        }
      }
    }
  }
  if (hadCompleteView && !syncPointHasCompleteView(syncPoint)) {
    // We removed our last complete view.
    removed.push(new (syncPointGetReferenceConstructor())(query._repo, query._path));
  }
  return {
    removed: removed,
    events: cancelEvents
  };
}
function syncPointGetQueryViews(syncPoint) {
  var result = [];
  var _iterator7 = _createForOfIteratorHelper(syncPoint.views.values()),
    _step6;
  try {
    for (_iterator7.s(); !(_step6 = _iterator7.n()).done;) {
      var view = _step6.value;
      if (!view.query._queryParams.loadsAllData()) {
        result.push(view);
      }
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
  return result;
}
/**
 * @param path - The path to the desired complete snapshot
 * @returns A complete cache, if it exists
 */
function syncPointGetCompleteServerCache(syncPoint, path) {
  var serverCache = null;
  var _iterator8 = _createForOfIteratorHelper(syncPoint.views.values()),
    _step7;
  try {
    for (_iterator8.s(); !(_step7 = _iterator8.n()).done;) {
      var view = _step7.value;
      serverCache = serverCache || viewGetCompleteServerCache(view, path);
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
  return serverCache;
}
function syncPointViewForQuery(syncPoint, query) {
  var params = query._queryParams;
  if (params.loadsAllData()) {
    return syncPointGetCompleteView(syncPoint);
  } else {
    var queryId = query._queryIdentifier;
    return syncPoint.views.get(queryId);
  }
}
function syncPointViewExistsForQuery(syncPoint, query) {
  return syncPointViewForQuery(syncPoint, query) != null;
}
function syncPointHasCompleteView(syncPoint) {
  return syncPointGetCompleteView(syncPoint) != null;
}
function syncPointGetCompleteView(syncPoint) {
  var _iterator9 = _createForOfIteratorHelper(syncPoint.views.values()),
    _step8;
  try {
    for (_iterator9.s(); !(_step8 = _iterator9.n()).done;) {
      var view = _step8.value;
      if (view.query._queryParams.loadsAllData()) {
        return view;
      }
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
  return null;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var referenceConstructor;
function syncTreeSetReferenceConstructor(val) {
  (0, _util.assert)(!referenceConstructor, '__referenceConstructor has already been defined');
  referenceConstructor = val;
}
function syncTreeGetReferenceConstructor() {
  (0, _util.assert)(referenceConstructor, 'Reference.ts has not been loaded');
  return referenceConstructor;
}
/**
 * Static tracker for next query tag.
 */
var syncTreeNextQueryTag_ = 1;
/**
 * SyncTree is the central class for managing event callback registration, data caching, views
 * (query processing), and event generation.  There are typically two SyncTree instances for
 * each Repo, one for the normal Firebase data, and one for the .info data.
 *
 * It has a number of responsibilities, including:
 *  - Tracking all user event callbacks (registered via addEventRegistration() and removeEventRegistration()).
 *  - Applying and caching data changes for user set(), transaction(), and update() calls
 *    (applyUserOverwrite(), applyUserMerge()).
 *  - Applying and caching data changes for server data changes (applyServerOverwrite(),
 *    applyServerMerge()).
 *  - Generating user-facing events for server and user changes (all of the apply* methods
 *    return the set of events that need to be raised as a result).
 *  - Maintaining the appropriate set of server listens to ensure we are always subscribed
 *    to the correct set of paths and queries to satisfy the current set of user event
 *    callbacks (listens are started/stopped using the provided listenProvider).
 *
 * NOTE: Although SyncTree tracks event callbacks and calculates events to raise, the actual
 * events are returned to the caller rather than raised synchronously.
 *
 */
var SyncTree = /*#__PURE__*/_createClass(
/**
 * @param listenProvider_ - Used by SyncTree to start / stop listening
 *   to server data.
 */
function SyncTree(listenProvider_) {
  _classCallCheck(this, SyncTree);
  this.listenProvider_ = listenProvider_;
  /**
   * Tree of SyncPoints.  There's a SyncPoint at any location that has 1 or more views.
   */
  this.syncPointTree_ = new ImmutableTree(null);
  /**
   * A tree of all pending user writes (user-initiated set()'s, transaction()'s, update()'s, etc.).
   */
  this.pendingWriteTree_ = newWriteTree();
  this.tagToQueryMap = new Map();
  this.queryToTagMap = new Map();
});
/**
 * Apply the data changes for a user-generated set() or transaction() call.
 *
 * @returns Events to raise.
 */
function syncTreeApplyUserOverwrite(syncTree, path, newData, writeId, visible) {
  // Record pending write.
  writeTreeAddOverwrite(syncTree.pendingWriteTree_, path, newData, writeId, visible);
  if (!visible) {
    return [];
  } else {
    return syncTreeApplyOperationToSyncPoints_(syncTree, new Overwrite(newOperationSourceUser(), path, newData));
  }
}
/**
 * Apply the data from a user-generated update() call
 *
 * @returns Events to raise.
 */
function syncTreeApplyUserMerge(syncTree, path, changedChildren, writeId) {
  // Record pending merge.
  writeTreeAddMerge(syncTree.pendingWriteTree_, path, changedChildren, writeId);
  var changeTree = ImmutableTree.fromObject(changedChildren);
  return syncTreeApplyOperationToSyncPoints_(syncTree, new Merge(newOperationSourceUser(), path, changeTree));
}
/**
 * Acknowledge a pending user write that was previously registered with applyUserOverwrite() or applyUserMerge().
 *
 * @param revert - True if the given write failed and needs to be reverted
 * @returns Events to raise.
 */
function syncTreeAckUserWrite(syncTree, writeId) {
  var revert = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var write = writeTreeGetWrite(syncTree.pendingWriteTree_, writeId);
  var needToReevaluate = writeTreeRemoveWrite(syncTree.pendingWriteTree_, writeId);
  if (!needToReevaluate) {
    return [];
  } else {
    var affectedTree = new ImmutableTree(null);
    if (write.snap != null) {
      // overwrite
      affectedTree = affectedTree.set(newEmptyPath(), true);
    } else {
      each(write.children, function (pathString) {
        affectedTree = affectedTree.set(new Path(pathString), true);
      });
    }
    return syncTreeApplyOperationToSyncPoints_(syncTree, new AckUserWrite(write.path, affectedTree, revert));
  }
}
/**
 * Apply new server data for the specified path..
 *
 * @returns Events to raise.
 */
function syncTreeApplyServerOverwrite(syncTree, path, newData) {
  return syncTreeApplyOperationToSyncPoints_(syncTree, new Overwrite(newOperationSourceServer(), path, newData));
}
/**
 * Apply new server data to be merged in at the specified path.
 *
 * @returns Events to raise.
 */
function syncTreeApplyServerMerge(syncTree, path, changedChildren) {
  var changeTree = ImmutableTree.fromObject(changedChildren);
  return syncTreeApplyOperationToSyncPoints_(syncTree, new Merge(newOperationSourceServer(), path, changeTree));
}
/**
 * Apply a listen complete for a query
 *
 * @returns Events to raise.
 */
function syncTreeApplyListenComplete(syncTree, path) {
  return syncTreeApplyOperationToSyncPoints_(syncTree, new ListenComplete(newOperationSourceServer(), path));
}
/**
 * Apply a listen complete for a tagged query
 *
 * @returns Events to raise.
 */
function syncTreeApplyTaggedListenComplete(syncTree, path, tag) {
  var queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
  if (queryKey) {
    var r = syncTreeParseQueryKey_(queryKey);
    var queryPath = r.path,
      queryId = r.queryId;
    var relativePath = newRelativePath(queryPath, path);
    var op = new ListenComplete(newOperationSourceServerTaggedQuery(queryId), relativePath);
    return syncTreeApplyTaggedOperation_(syncTree, queryPath, op);
  } else {
    // We've already removed the query. No big deal, ignore the update
    return [];
  }
}
/**
 * Remove event callback(s).
 *
 * If query is the default query, we'll check all queries for the specified eventRegistration.
 * If eventRegistration is null, we'll remove all callbacks for the specified query/queries.
 *
 * @param eventRegistration - If null, all callbacks are removed.
 * @param cancelError - If a cancelError is provided, appropriate cancel events will be returned.
 * @param skipListenerDedup - When performing a `get()`, we don't add any new listeners, so no
 *  deduping needs to take place. This flag allows toggling of that behavior
 * @returns Cancel events, if cancelError was provided.
 */
function syncTreeRemoveEventRegistration(syncTree, query, eventRegistration, cancelError) {
  var skipListenerDedup = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  // Find the syncPoint first. Then deal with whether or not it has matching listeners
  var path = query._path;
  var maybeSyncPoint = syncTree.syncPointTree_.get(path);
  var cancelEvents = [];
  // A removal on a default query affects all queries at that location. A removal on an indexed query, even one without
  // other query constraints, does *not* affect all queries at that location. So this check must be for 'default', and
  // not loadsAllData().
  if (maybeSyncPoint && (query._queryIdentifier === 'default' || syncPointViewExistsForQuery(maybeSyncPoint, query))) {
    var removedAndEvents = syncPointRemoveEventRegistration(maybeSyncPoint, query, eventRegistration, cancelError);
    if (syncPointIsEmpty(maybeSyncPoint)) {
      syncTree.syncPointTree_ = syncTree.syncPointTree_.remove(path);
    }
    var removed = removedAndEvents.removed;
    cancelEvents = removedAndEvents.events;
    if (!skipListenerDedup) {
      /**
       * We may have just removed one of many listeners and can short-circuit this whole process
       * We may also not have removed a default listener, in which case all of the descendant listeners should already be
       * properly set up.
       */
      // Since indexed queries can shadow if they don't have other query constraints, check for loadsAllData(), instead of
      // queryId === 'default'
      var removingDefault = -1 !== removed.findIndex(function (query) {
        return query._queryParams.loadsAllData();
      });
      var covered = syncTree.syncPointTree_.findOnPath(path, function (relativePath, parentSyncPoint) {
        return syncPointHasCompleteView(parentSyncPoint);
      });
      if (removingDefault && !covered) {
        var subtree = syncTree.syncPointTree_.subtree(path);
        // There are potentially child listeners. Determine what if any listens we need to send before executing the
        // removal
        if (!subtree.isEmpty()) {
          // We need to fold over our subtree and collect the listeners to send
          var newViews = syncTreeCollectDistinctViewsForSubTree_(subtree);
          // Ok, we've collected all the listens we need. Set them up.
          for (var i = 0; i < newViews.length; ++i) {
            var view = newViews[i],
              newQuery = view.query;
            var listener = syncTreeCreateListenerForView_(syncTree, view);
            syncTree.listenProvider_.startListening(syncTreeQueryForListening_(newQuery), syncTreeTagForQuery(syncTree, newQuery), listener.hashFn, listener.onComplete);
          }
        }
        // Otherwise there's nothing below us, so nothing we need to start listening on
      }
      // If we removed anything and we're not covered by a higher up listen, we need to stop listening on this query
      // The above block has us covered in terms of making sure we're set up on listens lower in the tree.
      // Also, note that if we have a cancelError, it's already been removed at the provider level.
      if (!covered && removed.length > 0 && !cancelError) {
        // If we removed a default, then we weren't listening on any of the other queries here. Just cancel the one
        // default. Otherwise, we need to iterate through and cancel each individual query
        if (removingDefault) {
          // We don't tag default listeners
          var defaultTag = null;
          syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(query), defaultTag);
        } else {
          removed.forEach(function (queryToRemove) {
            var tagToRemove = syncTree.queryToTagMap.get(syncTreeMakeQueryKey_(queryToRemove));
            syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(queryToRemove), tagToRemove);
          });
        }
      }
    }
    // Now, clear all of the tags we're tracking for the removed listens
    syncTreeRemoveTags_(syncTree, removed);
  }
  return cancelEvents;
}
/**
 * Apply new server data for the specified tagged query.
 *
 * @returns Events to raise.
 */
function syncTreeApplyTaggedQueryOverwrite(syncTree, path, snap, tag) {
  var queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
  if (queryKey != null) {
    var r = syncTreeParseQueryKey_(queryKey);
    var queryPath = r.path,
      queryId = r.queryId;
    var relativePath = newRelativePath(queryPath, path);
    var op = new Overwrite(newOperationSourceServerTaggedQuery(queryId), relativePath, snap);
    return syncTreeApplyTaggedOperation_(syncTree, queryPath, op);
  } else {
    // Query must have been removed already
    return [];
  }
}
/**
 * Apply server data to be merged in for the specified tagged query.
 *
 * @returns Events to raise.
 */
function syncTreeApplyTaggedQueryMerge(syncTree, path, changedChildren, tag) {
  var queryKey = syncTreeQueryKeyForTag_(syncTree, tag);
  if (queryKey) {
    var r = syncTreeParseQueryKey_(queryKey);
    var queryPath = r.path,
      queryId = r.queryId;
    var relativePath = newRelativePath(queryPath, path);
    var changeTree = ImmutableTree.fromObject(changedChildren);
    var op = new Merge(newOperationSourceServerTaggedQuery(queryId), relativePath, changeTree);
    return syncTreeApplyTaggedOperation_(syncTree, queryPath, op);
  } else {
    // We've already removed the query. No big deal, ignore the update
    return [];
  }
}
/**
 * Add an event callback for the specified query.
 *
 * @returns Events to raise.
 */
function syncTreeAddEventRegistration(syncTree, query, eventRegistration) {
  var skipSetupListener = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var path = query._path;
  var serverCache = null;
  var foundAncestorDefaultView = false;
  // Any covering writes will necessarily be at the root, so really all we need to find is the server cache.
  // Consider optimizing this once there's a better understanding of what actual behavior will be.
  syncTree.syncPointTree_.foreachOnPath(path, function (pathToSyncPoint, sp) {
    var relativePath = newRelativePath(pathToSyncPoint, path);
    serverCache = serverCache || syncPointGetCompleteServerCache(sp, relativePath);
    foundAncestorDefaultView = foundAncestorDefaultView || syncPointHasCompleteView(sp);
  });
  var syncPoint = syncTree.syncPointTree_.get(path);
  if (!syncPoint) {
    syncPoint = new SyncPoint();
    syncTree.syncPointTree_ = syncTree.syncPointTree_.set(path, syncPoint);
  } else {
    foundAncestorDefaultView = foundAncestorDefaultView || syncPointHasCompleteView(syncPoint);
    serverCache = serverCache || syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
  }
  var serverCacheComplete;
  if (serverCache != null) {
    serverCacheComplete = true;
  } else {
    serverCacheComplete = false;
    serverCache = ChildrenNode.EMPTY_NODE;
    var subtree = syncTree.syncPointTree_.subtree(path);
    subtree.foreachChild(function (childName, childSyncPoint) {
      var completeCache = syncPointGetCompleteServerCache(childSyncPoint, newEmptyPath());
      if (completeCache) {
        serverCache = serverCache.updateImmediateChild(childName, completeCache);
      }
    });
  }
  var viewAlreadyExists = syncPointViewExistsForQuery(syncPoint, query);
  if (!viewAlreadyExists && !query._queryParams.loadsAllData()) {
    // We need to track a tag for this query
    var queryKey = syncTreeMakeQueryKey_(query);
    (0, _util.assert)(!syncTree.queryToTagMap.has(queryKey), 'View does not exist, but we have a tag');
    var tag = syncTreeGetNextQueryTag_();
    syncTree.queryToTagMap.set(queryKey, tag);
    syncTree.tagToQueryMap.set(tag, queryKey);
  }
  var writesCache = writeTreeChildWrites(syncTree.pendingWriteTree_, path);
  var events = syncPointAddEventRegistration(syncPoint, query, eventRegistration, writesCache, serverCache, serverCacheComplete);
  if (!viewAlreadyExists && !foundAncestorDefaultView && !skipSetupListener) {
    var view = syncPointViewForQuery(syncPoint, query);
    events = events.concat(syncTreeSetupListener_(syncTree, query, view));
  }
  return events;
}
/**
 * Returns a complete cache, if we have one, of the data at a particular path. If the location does not have a
 * listener above it, we will get a false "null". This shouldn't be a problem because transactions will always
 * have a listener above, and atomic operations would correctly show a jitter of <increment value> ->
 *     <incremented total> as the write is applied locally and then acknowledged at the server.
 *
 * Note: this method will *include* hidden writes from transaction with applyLocally set to false.
 *
 * @param path - The path to the data we want
 * @param writeIdsToExclude - A specific set to be excluded
 */
function syncTreeCalcCompleteEventCache(syncTree, path, writeIdsToExclude) {
  var includeHiddenSets = true;
  var writeTree = syncTree.pendingWriteTree_;
  var serverCache = syncTree.syncPointTree_.findOnPath(path, function (pathSoFar, syncPoint) {
    var relativePath = newRelativePath(pathSoFar, path);
    var serverCache = syncPointGetCompleteServerCache(syncPoint, relativePath);
    if (serverCache) {
      return serverCache;
    }
  });
  return writeTreeCalcCompleteEventCache(writeTree, path, serverCache, writeIdsToExclude, includeHiddenSets);
}
function syncTreeGetServerValue(syncTree, query) {
  var path = query._path;
  var serverCache = null;
  // Any covering writes will necessarily be at the root, so really all we need to find is the server cache.
  // Consider optimizing this once there's a better understanding of what actual behavior will be.
  syncTree.syncPointTree_.foreachOnPath(path, function (pathToSyncPoint, sp) {
    var relativePath = newRelativePath(pathToSyncPoint, path);
    serverCache = serverCache || syncPointGetCompleteServerCache(sp, relativePath);
  });
  var syncPoint = syncTree.syncPointTree_.get(path);
  if (!syncPoint) {
    syncPoint = new SyncPoint();
    syncTree.syncPointTree_ = syncTree.syncPointTree_.set(path, syncPoint);
  } else {
    serverCache = serverCache || syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
  }
  var serverCacheComplete = serverCache != null;
  var serverCacheNode = serverCacheComplete ? new CacheNode(serverCache, true, false) : null;
  var writesCache = writeTreeChildWrites(syncTree.pendingWriteTree_, query._path);
  var view = syncPointGetView(syncPoint, query, writesCache, serverCacheComplete ? serverCacheNode.getNode() : ChildrenNode.EMPTY_NODE, serverCacheComplete);
  return viewGetCompleteNode(view);
}
/**
 * A helper method that visits all descendant and ancestor SyncPoints, applying the operation.
 *
 * NOTES:
 * - Descendant SyncPoints will be visited first (since we raise events depth-first).
 *
 * - We call applyOperation() on each SyncPoint passing three things:
 *   1. A version of the Operation that has been made relative to the SyncPoint location.
 *   2. A WriteTreeRef of any writes we have cached at the SyncPoint location.
 *   3. A snapshot Node with cached server data, if we have it.
 *
 * - We concatenate all of the events returned by each SyncPoint and return the result.
 */
function syncTreeApplyOperationToSyncPoints_(syncTree, operation) {
  return syncTreeApplyOperationHelper_(operation, syncTree.syncPointTree_, /*serverCache=*/null, writeTreeChildWrites(syncTree.pendingWriteTree_, newEmptyPath()));
}
/**
 * Recursive helper for applyOperationToSyncPoints_
 */
function syncTreeApplyOperationHelper_(operation, syncPointTree, serverCache, writesCache) {
  if (pathIsEmpty(operation.path)) {
    return syncTreeApplyOperationDescendantsHelper_(operation, syncPointTree, serverCache, writesCache);
  } else {
    var syncPoint = syncPointTree.get(newEmptyPath());
    // If we don't have cached server data, see if we can get it from this SyncPoint.
    if (serverCache == null && syncPoint != null) {
      serverCache = syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
    }
    var events = [];
    var childName = pathGetFront(operation.path);
    var childOperation = operation.operationForChild(childName);
    var childTree = syncPointTree.children.get(childName);
    if (childTree && childOperation) {
      var childServerCache = serverCache ? serverCache.getImmediateChild(childName) : null;
      var childWritesCache = writeTreeRefChild(writesCache, childName);
      events = events.concat(syncTreeApplyOperationHelper_(childOperation, childTree, childServerCache, childWritesCache));
    }
    if (syncPoint) {
      events = events.concat(syncPointApplyOperation(syncPoint, operation, writesCache, serverCache));
    }
    return events;
  }
}
/**
 * Recursive helper for applyOperationToSyncPoints_
 */
function syncTreeApplyOperationDescendantsHelper_(operation, syncPointTree, serverCache, writesCache) {
  var syncPoint = syncPointTree.get(newEmptyPath());
  // If we don't have cached server data, see if we can get it from this SyncPoint.
  if (serverCache == null && syncPoint != null) {
    serverCache = syncPointGetCompleteServerCache(syncPoint, newEmptyPath());
  }
  var events = [];
  syncPointTree.children.inorderTraversal(function (childName, childTree) {
    var childServerCache = serverCache ? serverCache.getImmediateChild(childName) : null;
    var childWritesCache = writeTreeRefChild(writesCache, childName);
    var childOperation = operation.operationForChild(childName);
    if (childOperation) {
      events = events.concat(syncTreeApplyOperationDescendantsHelper_(childOperation, childTree, childServerCache, childWritesCache));
    }
  });
  if (syncPoint) {
    events = events.concat(syncPointApplyOperation(syncPoint, operation, writesCache, serverCache));
  }
  return events;
}
function syncTreeCreateListenerForView_(syncTree, view) {
  var query = view.query;
  var tag = syncTreeTagForQuery(syncTree, query);
  return {
    hashFn: function hashFn() {
      var cache = viewGetServerCache(view) || ChildrenNode.EMPTY_NODE;
      return cache.hash();
    },
    onComplete: function onComplete(status) {
      if (status === 'ok') {
        if (tag) {
          return syncTreeApplyTaggedListenComplete(syncTree, query._path, tag);
        } else {
          return syncTreeApplyListenComplete(syncTree, query._path);
        }
      } else {
        // If a listen failed, kill all of the listeners here, not just the one that triggered the error.
        // Note that this may need to be scoped to just this listener if we change permissions on filtered children
        var _error2 = errorForServerCode(status, query);
        return syncTreeRemoveEventRegistration(syncTree, query, /*eventRegistration*/null, _error2);
      }
    }
  };
}
/**
 * Return the tag associated with the given query.
 */
function syncTreeTagForQuery(syncTree, query) {
  var queryKey = syncTreeMakeQueryKey_(query);
  return syncTree.queryToTagMap.get(queryKey);
}
/**
 * Given a query, computes a "queryKey" suitable for use in our queryToTagMap_.
 */
function syncTreeMakeQueryKey_(query) {
  return query._path.toString() + '$' + query._queryIdentifier;
}
/**
 * Return the query associated with the given tag, if we have one
 */
function syncTreeQueryKeyForTag_(syncTree, tag) {
  return syncTree.tagToQueryMap.get(tag);
}
/**
 * Given a queryKey (created by makeQueryKey), parse it back into a path and queryId.
 */
function syncTreeParseQueryKey_(queryKey) {
  var splitIndex = queryKey.indexOf('$');
  (0, _util.assert)(splitIndex !== -1 && splitIndex < queryKey.length - 1, 'Bad queryKey.');
  return {
    queryId: queryKey.substr(splitIndex + 1),
    path: new Path(queryKey.substr(0, splitIndex))
  };
}
/**
 * A helper method to apply tagged operations
 */
function syncTreeApplyTaggedOperation_(syncTree, queryPath, operation) {
  var syncPoint = syncTree.syncPointTree_.get(queryPath);
  (0, _util.assert)(syncPoint, "Missing sync point for query tag that we're tracking");
  var writesCache = writeTreeChildWrites(syncTree.pendingWriteTree_, queryPath);
  return syncPointApplyOperation(syncPoint, operation, writesCache, null);
}
/**
 * This collapses multiple unfiltered views into a single view, since we only need a single
 * listener for them.
 */
function syncTreeCollectDistinctViewsForSubTree_(subtree) {
  return subtree.fold(function (relativePath, maybeChildSyncPoint, childMap) {
    if (maybeChildSyncPoint && syncPointHasCompleteView(maybeChildSyncPoint)) {
      var completeView = syncPointGetCompleteView(maybeChildSyncPoint);
      return [completeView];
    } else {
      // No complete view here, flatten any deeper listens into an array
      var views = [];
      if (maybeChildSyncPoint) {
        views = syncPointGetQueryViews(maybeChildSyncPoint);
      }
      each(childMap, function (_key, childViews) {
        views = views.concat(childViews);
      });
      return views;
    }
  });
}
/**
 * Normalizes a query to a query we send the server for listening
 *
 * @returns The normalized query
 */
function syncTreeQueryForListening_(query) {
  if (query._queryParams.loadsAllData() && !query._queryParams.isDefault()) {
    // We treat queries that load all data as default queries
    // Cast is necessary because ref() technically returns Firebase which is actually fb.api.Firebase which inherits
    // from Query
    return new (syncTreeGetReferenceConstructor())(query._repo, query._path);
  } else {
    return query;
  }
}
function syncTreeRemoveTags_(syncTree, queries) {
  for (var j = 0; j < queries.length; ++j) {
    var removedQuery = queries[j];
    if (!removedQuery._queryParams.loadsAllData()) {
      // We should have a tag for this
      var removedQueryKey = syncTreeMakeQueryKey_(removedQuery);
      var removedQueryTag = syncTree.queryToTagMap.get(removedQueryKey);
      syncTree.queryToTagMap.delete(removedQueryKey);
      syncTree.tagToQueryMap.delete(removedQueryTag);
    }
  }
}
/**
 * Static accessor for query tags.
 */
function syncTreeGetNextQueryTag_() {
  return syncTreeNextQueryTag_++;
}
/**
 * For a given new listen, manage the de-duplication of outstanding subscriptions.
 *
 * @returns This method can return events to support synchronous data sources
 */
function syncTreeSetupListener_(syncTree, query, view) {
  var path = query._path;
  var tag = syncTreeTagForQuery(syncTree, query);
  var listener = syncTreeCreateListenerForView_(syncTree, view);
  var events = syncTree.listenProvider_.startListening(syncTreeQueryForListening_(query), tag, listener.hashFn, listener.onComplete);
  var subtree = syncTree.syncPointTree_.subtree(path);
  // The root of this subtree has our query. We're here because we definitely need to send a listen for that, but we
  // may need to shadow other listens as well.
  if (tag) {
    (0, _util.assert)(!syncPointHasCompleteView(subtree.value), "If we're adding a query, it shouldn't be shadowed");
  } else {
    // Shadow everything at or below this location, this is a default listener.
    var queriesToStop = subtree.fold(function (relativePath, maybeChildSyncPoint, childMap) {
      if (!pathIsEmpty(relativePath) && maybeChildSyncPoint && syncPointHasCompleteView(maybeChildSyncPoint)) {
        return [syncPointGetCompleteView(maybeChildSyncPoint).query];
      } else {
        // No default listener here, flatten any deeper queries into an array
        var queries = [];
        if (maybeChildSyncPoint) {
          queries = queries.concat(syncPointGetQueryViews(maybeChildSyncPoint).map(function (view) {
            return view.query;
          }));
        }
        each(childMap, function (_key, childQueries) {
          queries = queries.concat(childQueries);
        });
        return queries;
      }
    });
    for (var i = 0; i < queriesToStop.length; ++i) {
      var queryToStop = queriesToStop[i];
      syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(queryToStop), syncTreeTagForQuery(syncTree, queryToStop));
    }
  }
  return events;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ExistingValueProvider = /*#__PURE__*/function () {
  function ExistingValueProvider(node_) {
    _classCallCheck(this, ExistingValueProvider);
    this.node_ = node_;
  }
  return _createClass(ExistingValueProvider, [{
    key: "getImmediateChild",
    value: function getImmediateChild(childName) {
      var child = this.node_.getImmediateChild(childName);
      return new ExistingValueProvider(child);
    }
  }, {
    key: "node",
    value: function node() {
      return this.node_;
    }
  }]);
}();
var DeferredValueProvider = /*#__PURE__*/function () {
  function DeferredValueProvider(syncTree, path) {
    _classCallCheck(this, DeferredValueProvider);
    this.syncTree_ = syncTree;
    this.path_ = path;
  }
  return _createClass(DeferredValueProvider, [{
    key: "getImmediateChild",
    value: function getImmediateChild(childName) {
      var childPath = pathChild(this.path_, childName);
      return new DeferredValueProvider(this.syncTree_, childPath);
    }
  }, {
    key: "node",
    value: function node() {
      return syncTreeCalcCompleteEventCache(this.syncTree_, this.path_);
    }
  }]);
}();
/**
 * Generate placeholders for deferred values.
 */
var generateWithValues = function generateWithValues(values) {
  values = values || {};
  values['timestamp'] = values['timestamp'] || new Date().getTime();
  return values;
};
/**
 * Value to use when firing local events. When writing server values, fire
 * local events with an approximate value, otherwise return value as-is.
 */
var resolveDeferredLeafValue = function resolveDeferredLeafValue(value, existingVal, serverValues) {
  if (!value || _typeof(value) !== 'object') {
    return value;
  }
  (0, _util.assert)('.sv' in value, 'Unexpected leaf node or priority contents');
  if (typeof value['.sv'] === 'string') {
    return resolveScalarDeferredValue(value['.sv'], existingVal, serverValues);
  } else if (_typeof(value['.sv']) === 'object') {
    return resolveComplexDeferredValue(value['.sv'], existingVal);
  } else {
    (0, _util.assert)(false, 'Unexpected server value: ' + JSON.stringify(value, null, 2));
  }
};
var resolveScalarDeferredValue = function resolveScalarDeferredValue(op, existing, serverValues) {
  switch (op) {
    case 'timestamp':
      return serverValues['timestamp'];
    default:
      (0, _util.assert)(false, 'Unexpected server value: ' + op);
  }
};
var resolveComplexDeferredValue = function resolveComplexDeferredValue(op, existing, unused) {
  if (!op.hasOwnProperty('increment')) {
    (0, _util.assert)(false, 'Unexpected server value: ' + JSON.stringify(op, null, 2));
  }
  var delta = op['increment'];
  if (typeof delta !== 'number') {
    (0, _util.assert)(false, 'Unexpected increment value: ' + delta);
  }
  var existingNode = existing.node();
  (0, _util.assert)(existingNode !== null && typeof existingNode !== 'undefined', 'Expected ChildrenNode.EMPTY_NODE for nulls');
  // Incrementing a non-number sets the value to the incremented amount
  if (!existingNode.isLeafNode()) {
    return delta;
  }
  var leaf = existingNode;
  var existingVal = leaf.getValue();
  if (typeof existingVal !== 'number') {
    return delta;
  }
  // No need to do over/underflow arithmetic here because JS only handles floats under the covers
  return existingVal + delta;
};
/**
 * Recursively replace all deferred values and priorities in the tree with the
 * specified generated replacement values.
 * @param path - path to which write is relative
 * @param node - new data written at path
 * @param syncTree - current data
 */
var resolveDeferredValueTree = function resolveDeferredValueTree(path, node, syncTree, serverValues) {
  return resolveDeferredValue(node, new DeferredValueProvider(syncTree, path), serverValues);
};
/**
 * Recursively replace all deferred values and priorities in the node with the
 * specified generated replacement values.  If there are no server values in the node,
 * it'll be returned as-is.
 */
var resolveDeferredValueSnapshot = function resolveDeferredValueSnapshot(node, existing, serverValues) {
  return resolveDeferredValue(node, new ExistingValueProvider(existing), serverValues);
};
function resolveDeferredValue(node, existingVal, serverValues) {
  var rawPri = node.getPriority().val();
  var priority = resolveDeferredLeafValue(rawPri, existingVal.getImmediateChild('.priority'), serverValues);
  var newNode;
  if (node.isLeafNode()) {
    var leafNode = node;
    var value = resolveDeferredLeafValue(leafNode.getValue(), existingVal, serverValues);
    if (value !== leafNode.getValue() || priority !== leafNode.getPriority().val()) {
      return new LeafNode(value, nodeFromJSON(priority));
    } else {
      return node;
    }
  } else {
    var childrenNode = node;
    newNode = childrenNode;
    if (priority !== childrenNode.getPriority().val()) {
      newNode = newNode.updatePriority(new LeafNode(priority));
    }
    childrenNode.forEachChild(PRIORITY_INDEX, function (childName, childNode) {
      var newChildNode = resolveDeferredValue(childNode, existingVal.getImmediateChild(childName), serverValues);
      if (newChildNode !== childNode) {
        newNode = newNode.updateImmediateChild(childName, newChildNode);
      }
    });
    return newNode;
  }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A light-weight tree, traversable by path.  Nodes can have both values and children.
 * Nodes are not enumerated (by forEachChild) unless they have a value or non-empty
 * children.
 */
var Tree = /*#__PURE__*/_createClass(
/**
 * @param name - Optional name of the node.
 * @param parent - Optional parent node.
 * @param node - Optional node to wrap.
 */
function Tree() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var node = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    children: {},
    childCount: 0
  };
  _classCallCheck(this, Tree);
  this.name = name;
  this.parent = parent;
  this.node = node;
});
/**
 * Returns a sub-Tree for the given path.
 *
 * @param pathObj - Path to look up.
 * @returns Tree for path.
 */
function treeSubTree(tree, pathObj) {
  // TODO: Require pathObj to be Path?
  var path = pathObj instanceof Path ? pathObj : new Path(pathObj);
  var child = tree,
    next = pathGetFront(path);
  while (next !== null) {
    var childNode = (0, _util.safeGet)(child.node.children, next) || {
      children: {},
      childCount: 0
    };
    child = new Tree(next, child, childNode);
    path = pathPopFront(path);
    next = pathGetFront(path);
  }
  return child;
}
/**
 * Returns the data associated with this tree node.
 *
 * @returns The data or null if no data exists.
 */
function treeGetValue(tree) {
  return tree.node.value;
}
/**
 * Sets data to this tree node.
 *
 * @param value - Value to set.
 */
function treeSetValue(tree, value) {
  tree.node.value = value;
  treeUpdateParents(tree);
}
/**
 * @returns Whether the tree has any children.
 */
function treeHasChildren(tree) {
  return tree.node.childCount > 0;
}
/**
 * @returns Whether the tree is empty (no value or children).
 */
function treeIsEmpty(tree) {
  return treeGetValue(tree) === undefined && !treeHasChildren(tree);
}
/**
 * Calls action for each child of this tree node.
 *
 * @param action - Action to be called for each child.
 */
function treeForEachChild(tree, action) {
  each(tree.node.children, function (child, childTree) {
    action(new Tree(child, tree, childTree));
  });
}
/**
 * Does a depth-first traversal of this node's descendants, calling action for each one.
 *
 * @param action - Action to be called for each child.
 * @param includeSelf - Whether to call action on this node as well. Defaults to
 *   false.
 * @param childrenFirst - Whether to call action on children before calling it on
 *   parent.
 */
function treeForEachDescendant(tree, action, includeSelf, childrenFirst) {
  if (includeSelf && !childrenFirst) {
    action(tree);
  }
  treeForEachChild(tree, function (child) {
    treeForEachDescendant(child, action, true, childrenFirst);
  });
  if (includeSelf && childrenFirst) {
    action(tree);
  }
}
/**
 * Calls action on each ancestor node.
 *
 * @param action - Action to be called on each parent; return
 *   true to abort.
 * @param includeSelf - Whether to call action on this node as well.
 * @returns true if the action callback returned true.
 */
function treeForEachAncestor(tree, action, includeSelf) {
  var node = includeSelf ? tree : tree.parent;
  while (node !== null) {
    if (action(node)) {
      return true;
    }
    node = node.parent;
  }
  return false;
}
/**
 * @returns The path of this tree node, as a Path.
 */
function treeGetPath(tree) {
  return new Path(tree.parent === null ? tree.name : treeGetPath(tree.parent) + '/' + tree.name);
}
/**
 * Adds or removes this child from its parent based on whether it's empty or not.
 */
function treeUpdateParents(tree) {
  if (tree.parent !== null) {
    treeUpdateChild(tree.parent, tree.name, tree);
  }
}
/**
 * Adds or removes the passed child to this tree node, depending on whether it's empty.
 *
 * @param childName - The name of the child to update.
 * @param child - The child to update.
 */
function treeUpdateChild(tree, childName, child) {
  var childEmpty = treeIsEmpty(child);
  var childExists = (0, _util.contains)(tree.node.children, childName);
  if (childEmpty && childExists) {
    delete tree.node.children[childName];
    tree.node.childCount--;
    treeUpdateParents(tree);
  } else if (!childEmpty && !childExists) {
    tree.node.children[childName] = child.node;
    tree.node.childCount++;
    treeUpdateParents(tree);
  }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * True for invalid Firebase keys
 */
var INVALID_KEY_REGEX_ = /[\[\].#$\/\u0000-\u001F\u007F]/;
/**
 * True for invalid Firebase paths.
 * Allows '/' in paths.
 */
var INVALID_PATH_REGEX_ = /[\[\].#$\u0000-\u001F\u007F]/;
/**
 * Maximum number of characters to allow in leaf value
 */
var MAX_LEAF_SIZE_ = 10 * 1024 * 1024;
var isValidKey = function isValidKey(key) {
  return typeof key === 'string' && key.length !== 0 && !INVALID_KEY_REGEX_.test(key);
};
var isValidPathString = function isValidPathString(pathString) {
  return typeof pathString === 'string' && pathString.length !== 0 && !INVALID_PATH_REGEX_.test(pathString);
};
var isValidRootPathString = function isValidRootPathString(pathString) {
  if (pathString) {
    // Allow '/.info/' at the beginning.
    pathString = pathString.replace(/^\/*\.info(\/|$)/, '/');
  }
  return isValidPathString(pathString);
};
var isValidPriority = function isValidPriority(priority) {
  return priority === null || typeof priority === 'string' || typeof priority === 'number' && !isInvalidJSONNumber(priority) || priority && _typeof(priority) === 'object' &&
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (0, _util.contains)(priority, '.sv');
};
/**
 * Pre-validate a datum passed as an argument to Firebase function.
 */
var validateFirebaseDataArg = function validateFirebaseDataArg(fnName, value, path, optional) {
  if (optional && value === undefined) {
    return;
  }
  _validateFirebaseData((0, _util.errorPrefix)(fnName, 'value'), value, path);
};
/**
 * Validate a data object client-side before sending to server.
 */
var _validateFirebaseData = function validateFirebaseData(errorPrefix, data, path_) {
  var path = path_ instanceof Path ? new ValidationPath(path_, errorPrefix) : path_;
  if (data === undefined) {
    throw new Error(errorPrefix + 'contains undefined ' + validationPathToErrorString(path));
  }
  if (typeof data === 'function') {
    throw new Error(errorPrefix + 'contains a function ' + validationPathToErrorString(path) + ' with contents = ' + data.toString());
  }
  if (isInvalidJSONNumber(data)) {
    throw new Error(errorPrefix + 'contains ' + data.toString() + ' ' + validationPathToErrorString(path));
  }
  // Check max leaf size, but try to avoid the utf8 conversion if we can.
  if (typeof data === 'string' && data.length > MAX_LEAF_SIZE_ / 3 && (0, _util.stringLength)(data) > MAX_LEAF_SIZE_) {
    throw new Error(errorPrefix + 'contains a string greater than ' + MAX_LEAF_SIZE_ + ' utf8 bytes ' + validationPathToErrorString(path) + " ('" + data.substring(0, 50) + "...')");
  }
  // TODO = Perf = Consider combining the recursive validation of keys into NodeFromJSON
  // to save extra walking of large objects.
  if (data && _typeof(data) === 'object') {
    var hasDotValue = false;
    var hasActualChild = false;
    each(data, function (key, value) {
      if (key === '.value') {
        hasDotValue = true;
      } else if (key !== '.priority' && key !== '.sv') {
        hasActualChild = true;
        if (!isValidKey(key)) {
          throw new Error(errorPrefix + ' contains an invalid key (' + key + ') ' + validationPathToErrorString(path) + '.  Keys must be non-empty strings ' + 'and can\'t contain ".", "#", "$", "/", "[", or "]"');
        }
      }
      validationPathPush(path, key);
      _validateFirebaseData(errorPrefix, value, path);
      validationPathPop(path);
    });
    if (hasDotValue && hasActualChild) {
      throw new Error(errorPrefix + ' contains ".value" child ' + validationPathToErrorString(path) + ' in addition to actual children.');
    }
  }
};
/**
 * Pre-validate paths passed in the firebase function.
 */
var validateFirebaseMergePaths = function validateFirebaseMergePaths(errorPrefix, mergePaths) {
  var i, curPath;
  for (i = 0; i < mergePaths.length; i++) {
    curPath = mergePaths[i];
    var keys = pathSlice(curPath);
    for (var j = 0; j < keys.length; j++) {
      if (keys[j] === '.priority' && j === keys.length - 1) ;else if (!isValidKey(keys[j])) {
        throw new Error(errorPrefix + 'contains an invalid key (' + keys[j] + ') in path ' + curPath.toString() + '. Keys must be non-empty strings ' + 'and can\'t contain ".", "#", "$", "/", "[", or "]"');
      }
    }
  }
  // Check that update keys are not descendants of each other.
  // We rely on the property that sorting guarantees that ancestors come
  // right before descendants.
  mergePaths.sort(pathCompare);
  var prevPath = null;
  for (i = 0; i < mergePaths.length; i++) {
    curPath = mergePaths[i];
    if (prevPath !== null && pathContains(prevPath, curPath)) {
      throw new Error(errorPrefix + 'contains a path ' + prevPath.toString() + ' that is ancestor of another path ' + curPath.toString());
    }
    prevPath = curPath;
  }
};
/**
 * pre-validate an object passed as an argument to firebase function (
 * must be an object - e.g. for firebase.update()).
 */
var validateFirebaseMergeDataArg = function validateFirebaseMergeDataArg(fnName, data, path, optional) {
  if (optional && data === undefined) {
    return;
  }
  var errorPrefix$1 = (0, _util.errorPrefix)(fnName, 'values');
  if (!(data && _typeof(data) === 'object') || Array.isArray(data)) {
    throw new Error(errorPrefix$1 + ' must be an object containing the children to replace.');
  }
  var mergePaths = [];
  each(data, function (key, value) {
    var curPath = new Path(key);
    _validateFirebaseData(errorPrefix$1, value, pathChild(path, curPath));
    if (pathGetBack(curPath) === '.priority') {
      if (!isValidPriority(value)) {
        throw new Error(errorPrefix$1 + "contains an invalid value for '" + curPath.toString() + "', which must be a valid " + 'Firebase priority (a string, finite number, server value, or null).');
      }
    }
    mergePaths.push(curPath);
  });
  validateFirebaseMergePaths(errorPrefix$1, mergePaths);
};
var validatePriority = function validatePriority(fnName, priority, optional) {
  if (optional && priority === undefined) {
    return;
  }
  if (isInvalidJSONNumber(priority)) {
    throw new Error((0, _util.errorPrefix)(fnName, 'priority') + 'is ' + priority.toString() + ', but must be a valid Firebase priority (a string, finite number, ' + 'server value, or null).');
  }
  // Special case to allow importing data with a .sv.
  if (!isValidPriority(priority)) {
    throw new Error((0, _util.errorPrefix)(fnName, 'priority') + 'must be a valid Firebase priority ' + '(a string, finite number, server value, or null).');
  }
};
var validateKey = function validateKey(fnName, argumentName, key, optional) {
  if (optional && key === undefined) {
    return;
  }
  if (!isValidKey(key)) {
    throw new Error((0, _util.errorPrefix)(fnName, argumentName) + 'was an invalid key = "' + key + '".  Firebase keys must be non-empty strings and ' + 'can\'t contain ".", "#", "$", "/", "[", or "]").');
  }
};
/**
 * @internal
 */
var validatePathString = exports._validatePathString = function validatePathString(fnName, argumentName, pathString, optional) {
  if (optional && pathString === undefined) {
    return;
  }
  if (!isValidPathString(pathString)) {
    throw new Error((0, _util.errorPrefix)(fnName, argumentName) + 'was an invalid path = "' + pathString + '". Paths must be non-empty strings and ' + 'can\'t contain ".", "#", "$", "[", or "]"');
  }
};
var validateRootPathString = function validateRootPathString(fnName, argumentName, pathString, optional) {
  if (pathString) {
    // Allow '/.info/' at the beginning.
    pathString = pathString.replace(/^\/*\.info(\/|$)/, '/');
  }
  validatePathString(fnName, argumentName, pathString, optional);
};
/**
 * @internal
 */
var validateWritablePath = exports._validateWritablePath = function validateWritablePath(fnName, path) {
  if (pathGetFront(path) === '.info') {
    throw new Error(fnName + " failed = Can't modify data under /.info/");
  }
};
var validateUrl = function validateUrl(fnName, parsedUrl) {
  // TODO = Validate server better.
  var pathString = parsedUrl.path.toString();
  if (!(typeof parsedUrl.repoInfo.host === 'string') || parsedUrl.repoInfo.host.length === 0 || !isValidKey(parsedUrl.repoInfo.namespace) && parsedUrl.repoInfo.host.split(':')[0] !== 'localhost' || pathString.length !== 0 && !isValidRootPathString(pathString)) {
    throw new Error((0, _util.errorPrefix)(fnName, 'url') + 'must be a valid firebase URL and ' + 'the path can\'t contain ".", "#", "$", "[", or "]".');
  }
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The event queue serves a few purposes:
 * 1. It ensures we maintain event order in the face of event callbacks doing operations that result in more
 *    events being queued.
 * 2. raiseQueuedEvents() handles being called reentrantly nicely.  That is, if in the course of raising events,
 *    raiseQueuedEvents() is called again, the "inner" call will pick up raising events where the "outer" call
 *    left off, ensuring that the events are still raised synchronously and in order.
 * 3. You can use raiseEventsAtPath and raiseEventsForChangedPath to ensure only relevant previously-queued
 *    events are raised synchronously.
 *
 * NOTE: This can all go away if/when we move to async events.
 *
 */
var EventQueue = /*#__PURE__*/_createClass(function EventQueue() {
  _classCallCheck(this, EventQueue);
  this.eventLists_ = [];
  /**
   * Tracks recursion depth of raiseQueuedEvents_, for debugging purposes.
   */
  this.recursionDepth_ = 0;
});
/**
 * @param eventDataList - The new events to queue.
 */
function eventQueueQueueEvents(eventQueue, eventDataList) {
  // We group events by path, storing them in a single EventList, to make it easier to skip over them quickly.
  var currList = null;
  for (var i = 0; i < eventDataList.length; i++) {
    var data = eventDataList[i];
    var path = data.getPath();
    if (currList !== null && !pathEquals(path, currList.path)) {
      eventQueue.eventLists_.push(currList);
      currList = null;
    }
    if (currList === null) {
      currList = {
        events: [],
        path: path
      };
    }
    currList.events.push(data);
  }
  if (currList) {
    eventQueue.eventLists_.push(currList);
  }
}
/**
 * Queues the specified events and synchronously raises all events (including previously queued ones)
 * for the specified path.
 *
 * It is assumed that the new events are all for the specified path.
 *
 * @param path - The path to raise events for.
 * @param eventDataList - The new events to raise.
 */
function eventQueueRaiseEventsAtPath(eventQueue, path, eventDataList) {
  eventQueueQueueEvents(eventQueue, eventDataList);
  eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, function (eventPath) {
    return pathEquals(eventPath, path);
  });
}
/**
 * Queues the specified events and synchronously raises all events (including previously queued ones) for
 * locations related to the specified change path (i.e. all ancestors and descendants).
 *
 * It is assumed that the new events are all related (ancestor or descendant) to the specified path.
 *
 * @param changedPath - The path to raise events for.
 * @param eventDataList - The events to raise
 */
function eventQueueRaiseEventsForChangedPath(eventQueue, changedPath, eventDataList) {
  eventQueueQueueEvents(eventQueue, eventDataList);
  eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, function (eventPath) {
    return pathContains(eventPath, changedPath) || pathContains(changedPath, eventPath);
  });
}
function eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue, predicate) {
  eventQueue.recursionDepth_++;
  var sentAll = true;
  for (var i = 0; i < eventQueue.eventLists_.length; i++) {
    var eventList = eventQueue.eventLists_[i];
    if (eventList) {
      var eventPath = eventList.path;
      if (predicate(eventPath)) {
        eventListRaise(eventQueue.eventLists_[i]);
        eventQueue.eventLists_[i] = null;
      } else {
        sentAll = false;
      }
    }
  }
  if (sentAll) {
    eventQueue.eventLists_ = [];
  }
  eventQueue.recursionDepth_--;
}
/**
 * Iterates through the list and raises each event
 */
function eventListRaise(eventList) {
  for (var i = 0; i < eventList.events.length; i++) {
    var eventData = eventList.events[i];
    if (eventData !== null) {
      eventList.events[i] = null;
      var eventFn = eventData.getEventRunner();
      if (logger) {
        log('event: ' + eventData.toString());
      }
      exceptionGuard(eventFn);
    }
  }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var INTERRUPT_REASON = 'repo_interrupt';
/**
 * If a transaction does not succeed after 25 retries, we abort it. Among other
 * things this ensure that if there's ever a bug causing a mismatch between
 * client / server hashes for some data, we won't retry indefinitely.
 */
var MAX_TRANSACTION_RETRIES = 25;
/**
 * A connection to a single data repository.
 */
var Repo = /*#__PURE__*/function () {
  function Repo(repoInfo_, forceRestClient_, authTokenProvider_, appCheckProvider_) {
    _classCallCheck(this, Repo);
    this.repoInfo_ = repoInfo_;
    this.forceRestClient_ = forceRestClient_;
    this.authTokenProvider_ = authTokenProvider_;
    this.appCheckProvider_ = appCheckProvider_;
    this.dataUpdateCount = 0;
    this.statsListener_ = null;
    this.eventQueue_ = new EventQueue();
    this.nextWriteId_ = 1;
    this.interceptServerDataCallback_ = null;
    /** A list of data pieces and paths to be set when this client disconnects. */
    this.onDisconnect_ = newSparseSnapshotTree();
    /** Stores queues of outstanding transactions for Firebase locations. */
    this.transactionQueueTree_ = new Tree();
    // TODO: This should be @private but it's used by test_access.js and internal.js
    this.persistentConnection_ = null;
    // This key is intentionally not updated if RepoInfo is later changed or replaced
    this.key = this.repoInfo_.toURLString();
  }
  /**
   * @returns The URL corresponding to the root of this Firebase.
   */
  return _createClass(Repo, [{
    key: "toString",
    value: function toString() {
      return (this.repoInfo_.secure ? 'https://' : 'http://') + this.repoInfo_.host;
    }
  }]);
}();
function repoStart(repo, appId, authOverride) {
  repo.stats_ = statsManagerGetCollection(repo.repoInfo_);
  if (repo.forceRestClient_ || beingCrawled()) {
    repo.server_ = new ReadonlyRestClient(repo.repoInfo_, function (pathString, data, isMerge, tag) {
      repoOnDataUpdate(repo, pathString, data, isMerge, tag);
    }, repo.authTokenProvider_, repo.appCheckProvider_);
    // Minor hack: Fire onConnect immediately, since there's no actual connection.
    setTimeout(function () {
      return repoOnConnectStatus(repo, /* connectStatus= */true);
    }, 0);
  } else {
    // Validate authOverride
    if (typeof authOverride !== 'undefined' && authOverride !== null) {
      if (_typeof(authOverride) !== 'object') {
        throw new Error('Only objects are supported for option databaseAuthVariableOverride');
      }
      try {
        (0, _util.stringify)(authOverride);
      } catch (e) {
        throw new Error('Invalid authOverride provided: ' + e);
      }
    }
    repo.persistentConnection_ = new PersistentConnection(repo.repoInfo_, appId, function (pathString, data, isMerge, tag) {
      repoOnDataUpdate(repo, pathString, data, isMerge, tag);
    }, function (connectStatus) {
      repoOnConnectStatus(repo, connectStatus);
    }, function (updates) {
      repoOnServerInfoUpdate(repo, updates);
    }, repo.authTokenProvider_, repo.appCheckProvider_, authOverride);
    repo.server_ = repo.persistentConnection_;
  }
  repo.authTokenProvider_.addTokenChangeListener(function (token) {
    repo.server_.refreshAuthToken(token);
  });
  repo.appCheckProvider_.addTokenChangeListener(function (result) {
    repo.server_.refreshAppCheckToken(result.token);
  });
  // In the case of multiple Repos for the same repoInfo (i.e. there are multiple Firebase.Contexts being used),
  // we only want to create one StatsReporter.  As such, we'll report stats over the first Repo created.
  repo.statsReporter_ = statsManagerGetOrCreateReporter(repo.repoInfo_, function () {
    return new StatsReporter(repo.stats_, repo.server_);
  });
  // Used for .info.
  repo.infoData_ = new SnapshotHolder();
  repo.infoSyncTree_ = new SyncTree({
    startListening: function startListening(query, tag, currentHashFn, onComplete) {
      var infoEvents = [];
      var node = repo.infoData_.getNode(query._path);
      // This is possibly a hack, but we have different semantics for .info endpoints. We don't raise null events
      // on initial data...
      if (!node.isEmpty()) {
        infoEvents = syncTreeApplyServerOverwrite(repo.infoSyncTree_, query._path, node);
        setTimeout(function () {
          onComplete('ok');
        }, 0);
      }
      return infoEvents;
    },
    stopListening: function stopListening() {}
  });
  repoUpdateInfo(repo, 'connected', false);
  repo.serverSyncTree_ = new SyncTree({
    startListening: function startListening(query, tag, currentHashFn, onComplete) {
      repo.server_.listen(query, currentHashFn, tag, function (status, data) {
        var events = onComplete(status, data);
        eventQueueRaiseEventsForChangedPath(repo.eventQueue_, query._path, events);
      });
      // No synchronous events for network-backed sync trees
      return [];
    },
    stopListening: function stopListening(query, tag) {
      repo.server_.unlisten(query, tag);
    }
  });
}
/**
 * @returns The time in milliseconds, taking the server offset into account if we have one.
 */
function repoServerTime(repo) {
  var offsetNode = repo.infoData_.getNode(new Path('.info/serverTimeOffset'));
  var offset = offsetNode.val() || 0;
  return new Date().getTime() + offset;
}
/**
 * Generate ServerValues using some variables from the repo object.
 */
function repoGenerateServerValues(repo) {
  return generateWithValues({
    timestamp: repoServerTime(repo)
  });
}
/**
 * Called by realtime when we get new messages from the server.
 */
function repoOnDataUpdate(repo, pathString, data, isMerge, tag) {
  // For testing.
  repo.dataUpdateCount++;
  var path = new Path(pathString);
  data = repo.interceptServerDataCallback_ ? repo.interceptServerDataCallback_(pathString, data) : data;
  var events = [];
  if (tag) {
    if (isMerge) {
      var taggedChildren = (0, _util.map)(data, function (raw) {
        return nodeFromJSON(raw);
      });
      events = syncTreeApplyTaggedQueryMerge(repo.serverSyncTree_, path, taggedChildren, tag);
    } else {
      var taggedSnap = nodeFromJSON(data);
      events = syncTreeApplyTaggedQueryOverwrite(repo.serverSyncTree_, path, taggedSnap, tag);
    }
  } else if (isMerge) {
    var changedChildren = (0, _util.map)(data, function (raw) {
      return nodeFromJSON(raw);
    });
    events = syncTreeApplyServerMerge(repo.serverSyncTree_, path, changedChildren);
  } else {
    var snap = nodeFromJSON(data);
    events = syncTreeApplyServerOverwrite(repo.serverSyncTree_, path, snap);
  }
  var affectedPath = path;
  if (events.length > 0) {
    // Since we have a listener outstanding for each transaction, receiving any events
    // is a proxy for some change having occurred.
    affectedPath = repoRerunTransactions(repo, path);
  }
  eventQueueRaiseEventsForChangedPath(repo.eventQueue_, affectedPath, events);
}
function repoOnConnectStatus(repo, connectStatus) {
  repoUpdateInfo(repo, 'connected', connectStatus);
  if (connectStatus === false) {
    repoRunOnDisconnectEvents(repo);
  }
}
function repoOnServerInfoUpdate(repo, updates) {
  each(updates, function (key, value) {
    repoUpdateInfo(repo, key, value);
  });
}
function repoUpdateInfo(repo, pathString, value) {
  var path = new Path('/.info/' + pathString);
  var newNode = nodeFromJSON(value);
  repo.infoData_.updateSnapshot(path, newNode);
  var events = syncTreeApplyServerOverwrite(repo.infoSyncTree_, path, newNode);
  eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
}
function repoGetNextWriteId(repo) {
  return repo.nextWriteId_++;
}
/**
 * The purpose of `getValue` is to return the latest known value
 * satisfying `query`.
 *
 * This method will first check for in-memory cached values
 * belonging to active listeners. If they are found, such values
 * are considered to be the most up-to-date.
 *
 * If the client is not connected, this method will wait until the
 *  repo has established a connection and then request the value for `query`.
 * If the client is not able to retrieve the query result for another reason,
 * it reports an error.
 *
 * @param query - The query to surface a value for.
 */
function repoGetValue(repo, query, eventRegistration) {
  // Only active queries are cached. There is no persisted cache.
  var cached = syncTreeGetServerValue(repo.serverSyncTree_, query);
  if (cached != null) {
    return Promise.resolve(cached);
  }
  return repo.server_.get(query).then(function (payload) {
    var node = nodeFromJSON(payload).withIndex(query._queryParams.getIndex());
    /**
     * Below we simulate the actions of an `onlyOnce` `onValue()` event where:
     * Add an event registration,
     * Update data at the path,
     * Raise any events,
     * Cleanup the SyncTree
     */
    syncTreeAddEventRegistration(repo.serverSyncTree_, query, eventRegistration, true);
    var events;
    if (query._queryParams.loadsAllData()) {
      events = syncTreeApplyServerOverwrite(repo.serverSyncTree_, query._path, node);
    } else {
      var tag = syncTreeTagForQuery(repo.serverSyncTree_, query);
      events = syncTreeApplyTaggedQueryOverwrite(repo.serverSyncTree_, query._path, node, tag);
    }
    /*
     * We need to raise events in the scenario where `get()` is called at a parent path, and
     * while the `get()` is pending, `onValue` is called at a child location. While get() is waiting
     * for the data, `onValue` will register a new event. Then, get() will come back, and update the syncTree
     * and its corresponding serverCache, including the child location where `onValue` is called. Then,
     * `onValue` will receive the event from the server, but look at the syncTree and see that the data received
     * from the server is already at the SyncPoint, and so the `onValue` callback will never get fired.
     * Calling `eventQueueRaiseEventsForChangedPath()` is the correct way to propagate the events and
     * ensure the corresponding child events will get fired.
     */
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, query._path, events);
    syncTreeRemoveEventRegistration(repo.serverSyncTree_, query, eventRegistration, null, true);
    return node;
  }, function (err) {
    repoLog(repo, 'get for query ' + (0, _util.stringify)(query) + ' failed: ' + err);
    return Promise.reject(new Error(err));
  });
}
function repoSetWithPriority(repo, path, newVal, newPriority, onComplete) {
  repoLog(repo, 'set', {
    path: path.toString(),
    value: newVal,
    priority: newPriority
  });
  // TODO: Optimize this behavior to either (a) store flag to skip resolving where possible and / or
  // (b) store unresolved paths on JSON parse
  var serverValues = repoGenerateServerValues(repo);
  var newNodeUnresolved = nodeFromJSON(newVal, newPriority);
  var existing = syncTreeCalcCompleteEventCache(repo.serverSyncTree_, path);
  var newNode = resolveDeferredValueSnapshot(newNodeUnresolved, existing, serverValues);
  var writeId = repoGetNextWriteId(repo);
  var events = syncTreeApplyUserOverwrite(repo.serverSyncTree_, path, newNode, writeId, true);
  eventQueueQueueEvents(repo.eventQueue_, events);
  repo.server_.put(path.toString(), newNodeUnresolved.val(/*export=*/true), function (status, errorReason) {
    var success = status === 'ok';
    if (!success) {
      warn('set at ' + path + ' failed: ' + status);
    }
    var clearEvents = syncTreeAckUserWrite(repo.serverSyncTree_, writeId, !success);
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, clearEvents);
    repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
  });
  var affectedPath = repoAbortTransactions(repo, path);
  repoRerunTransactions(repo, affectedPath);
  // We queued the events above, so just flush the queue here
  eventQueueRaiseEventsForChangedPath(repo.eventQueue_, affectedPath, []);
}
function repoUpdate(repo, path, childrenToMerge, onComplete) {
  repoLog(repo, 'update', {
    path: path.toString(),
    value: childrenToMerge
  });
  // Start with our existing data and merge each child into it.
  var empty = true;
  var serverValues = repoGenerateServerValues(repo);
  var changedChildren = {};
  each(childrenToMerge, function (changedKey, changedValue) {
    empty = false;
    changedChildren[changedKey] = resolveDeferredValueTree(pathChild(path, changedKey), nodeFromJSON(changedValue), repo.serverSyncTree_, serverValues);
  });
  if (!empty) {
    var writeId = repoGetNextWriteId(repo);
    var events = syncTreeApplyUserMerge(repo.serverSyncTree_, path, changedChildren, writeId);
    eventQueueQueueEvents(repo.eventQueue_, events);
    repo.server_.merge(path.toString(), childrenToMerge, function (status, errorReason) {
      var success = status === 'ok';
      if (!success) {
        warn('update at ' + path + ' failed: ' + status);
      }
      var clearEvents = syncTreeAckUserWrite(repo.serverSyncTree_, writeId, !success);
      var affectedPath = clearEvents.length > 0 ? repoRerunTransactions(repo, path) : path;
      eventQueueRaiseEventsForChangedPath(repo.eventQueue_, affectedPath, clearEvents);
      repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
    });
    each(childrenToMerge, function (changedPath) {
      var affectedPath = repoAbortTransactions(repo, pathChild(path, changedPath));
      repoRerunTransactions(repo, affectedPath);
    });
    // We queued the events above, so just flush the queue here
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, []);
  } else {
    log("update() called with empty data.  Don't do anything.");
    repoCallOnCompleteCallback(repo, onComplete, 'ok', undefined);
  }
}
/**
 * Applies all of the changes stored up in the onDisconnect_ tree.
 */
function repoRunOnDisconnectEvents(repo) {
  repoLog(repo, 'onDisconnectEvents');
  var serverValues = repoGenerateServerValues(repo);
  var resolvedOnDisconnectTree = newSparseSnapshotTree();
  sparseSnapshotTreeForEachTree(repo.onDisconnect_, newEmptyPath(), function (path, node) {
    var resolved = resolveDeferredValueTree(path, node, repo.serverSyncTree_, serverValues);
    sparseSnapshotTreeRemember(resolvedOnDisconnectTree, path, resolved);
  });
  var events = [];
  sparseSnapshotTreeForEachTree(resolvedOnDisconnectTree, newEmptyPath(), function (path, snap) {
    events = events.concat(syncTreeApplyServerOverwrite(repo.serverSyncTree_, path, snap));
    var affectedPath = repoAbortTransactions(repo, path);
    repoRerunTransactions(repo, affectedPath);
  });
  repo.onDisconnect_ = newSparseSnapshotTree();
  eventQueueRaiseEventsForChangedPath(repo.eventQueue_, newEmptyPath(), events);
}
function repoOnDisconnectCancel(repo, path, onComplete) {
  repo.server_.onDisconnectCancel(path.toString(), function (status, errorReason) {
    if (status === 'ok') {
      sparseSnapshotTreeForget(repo.onDisconnect_, path);
    }
    repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
  });
}
function repoOnDisconnectSet(repo, path, value, onComplete) {
  var newNode = nodeFromJSON(value);
  repo.server_.onDisconnectPut(path.toString(), newNode.val(/*export=*/true), function (status, errorReason) {
    if (status === 'ok') {
      sparseSnapshotTreeRemember(repo.onDisconnect_, path, newNode);
    }
    repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
  });
}
function repoOnDisconnectSetWithPriority(repo, path, value, priority, onComplete) {
  var newNode = nodeFromJSON(value, priority);
  repo.server_.onDisconnectPut(path.toString(), newNode.val(/*export=*/true), function (status, errorReason) {
    if (status === 'ok') {
      sparseSnapshotTreeRemember(repo.onDisconnect_, path, newNode);
    }
    repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
  });
}
function repoOnDisconnectUpdate(repo, path, childrenToMerge, onComplete) {
  if ((0, _util.isEmpty)(childrenToMerge)) {
    log("onDisconnect().update() called with empty data.  Don't do anything.");
    repoCallOnCompleteCallback(repo, onComplete, 'ok', undefined);
    return;
  }
  repo.server_.onDisconnectMerge(path.toString(), childrenToMerge, function (status, errorReason) {
    if (status === 'ok') {
      each(childrenToMerge, function (childName, childNode) {
        var newChildNode = nodeFromJSON(childNode);
        sparseSnapshotTreeRemember(repo.onDisconnect_, pathChild(path, childName), newChildNode);
      });
    }
    repoCallOnCompleteCallback(repo, onComplete, status, errorReason);
  });
}
function repoAddEventCallbackForQuery(repo, query, eventRegistration) {
  var events;
  if (pathGetFront(query._path) === '.info') {
    events = syncTreeAddEventRegistration(repo.infoSyncTree_, query, eventRegistration);
  } else {
    events = syncTreeAddEventRegistration(repo.serverSyncTree_, query, eventRegistration);
  }
  eventQueueRaiseEventsAtPath(repo.eventQueue_, query._path, events);
}
function repoRemoveEventCallbackForQuery(repo, query, eventRegistration) {
  // These are guaranteed not to raise events, since we're not passing in a cancelError. However, we can future-proof
  // a little bit by handling the return values anyways.
  var events;
  if (pathGetFront(query._path) === '.info') {
    events = syncTreeRemoveEventRegistration(repo.infoSyncTree_, query, eventRegistration);
  } else {
    events = syncTreeRemoveEventRegistration(repo.serverSyncTree_, query, eventRegistration);
  }
  eventQueueRaiseEventsAtPath(repo.eventQueue_, query._path, events);
}
function repoInterrupt(repo) {
  if (repo.persistentConnection_) {
    repo.persistentConnection_.interrupt(INTERRUPT_REASON);
  }
}
function repoResume(repo) {
  if (repo.persistentConnection_) {
    repo.persistentConnection_.resume(INTERRUPT_REASON);
  }
}
function repoLog(repo) {
  var prefix = '';
  if (repo.persistentConnection_) {
    prefix = repo.persistentConnection_.id + ':';
  }
  for (var _len6 = arguments.length, varArgs = new Array(_len6 > 1 ? _len6 - 1 : 0), _key7 = 1; _key7 < _len6; _key7++) {
    varArgs[_key7 - 1] = arguments[_key7];
  }
  log.apply(void 0, [prefix].concat(varArgs));
}
function repoCallOnCompleteCallback(repo, callback, status, errorReason) {
  if (callback) {
    exceptionGuard(function () {
      if (status === 'ok') {
        callback(null);
      } else {
        var code = (status || 'error').toUpperCase();
        var message = code;
        if (errorReason) {
          message += ': ' + errorReason;
        }
        var _error3 = new Error(message);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _error3.code = code;
        callback(_error3);
      }
    });
  }
}
/**
 * Creates a new transaction, adds it to the transactions we're tracking, and
 * sends it to the server if possible.
 *
 * @param path - Path at which to do transaction.
 * @param transactionUpdate - Update callback.
 * @param onComplete - Completion callback.
 * @param unwatcher - Function that will be called when the transaction no longer
 * need data updates for `path`.
 * @param applyLocally - Whether or not to make intermediate results visible
 */
function repoStartTransaction(repo, path, transactionUpdate, onComplete, unwatcher, applyLocally) {
  repoLog(repo, 'transaction on ' + path);
  // Initialize transaction.
  var transaction = {
    path: path,
    update: transactionUpdate,
    onComplete: onComplete,
    // One of TransactionStatus enums.
    status: null,
    // Used when combining transactions at different locations to figure out
    // which one goes first.
    order: LUIDGenerator(),
    // Whether to raise local events for this transaction.
    applyLocally: applyLocally,
    // Count of how many times we've retried the transaction.
    retryCount: 0,
    // Function to call to clean up our .on() listener.
    unwatcher: unwatcher,
    // Stores why a transaction was aborted.
    abortReason: null,
    currentWriteId: null,
    currentInputSnapshot: null,
    currentOutputSnapshotRaw: null,
    currentOutputSnapshotResolved: null
  };
  // Run transaction initially.
  var currentState = repoGetLatestState(repo, path, undefined);
  transaction.currentInputSnapshot = currentState;
  var newVal = transaction.update(currentState.val());
  if (newVal === undefined) {
    // Abort transaction.
    transaction.unwatcher();
    transaction.currentOutputSnapshotRaw = null;
    transaction.currentOutputSnapshotResolved = null;
    if (transaction.onComplete) {
      transaction.onComplete(null, false, transaction.currentInputSnapshot);
    }
  } else {
    _validateFirebaseData('transaction failed: Data returned ', newVal, transaction.path);
    // Mark as run and add to our queue.
    transaction.status = 0 /* TransactionStatus.RUN */;
    var queueNode = treeSubTree(repo.transactionQueueTree_, path);
    var nodeQueue = treeGetValue(queueNode) || [];
    nodeQueue.push(transaction);
    treeSetValue(queueNode, nodeQueue);
    // Update visibleData and raise events
    // Note: We intentionally raise events after updating all of our
    // transaction state, since the user could start new transactions from the
    // event callbacks.
    var priorityForNode;
    if (_typeof(newVal) === 'object' && newVal !== null && (0, _util.contains)(newVal, '.priority')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      priorityForNode = (0, _util.safeGet)(newVal, '.priority');
      (0, _util.assert)(isValidPriority(priorityForNode), 'Invalid priority returned by transaction. ' + 'Priority must be a valid string, finite number, server value, or null.');
    } else {
      var currentNode = syncTreeCalcCompleteEventCache(repo.serverSyncTree_, path) || ChildrenNode.EMPTY_NODE;
      priorityForNode = currentNode.getPriority().val();
    }
    var serverValues = repoGenerateServerValues(repo);
    var newNodeUnresolved = nodeFromJSON(newVal, priorityForNode);
    var newNode = resolveDeferredValueSnapshot(newNodeUnresolved, currentState, serverValues);
    transaction.currentOutputSnapshotRaw = newNodeUnresolved;
    transaction.currentOutputSnapshotResolved = newNode;
    transaction.currentWriteId = repoGetNextWriteId(repo);
    var events = syncTreeApplyUserOverwrite(repo.serverSyncTree_, path, newNode, transaction.currentWriteId, transaction.applyLocally);
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
    repoSendReadyTransactions(repo, repo.transactionQueueTree_);
  }
}
/**
 * @param excludeSets - A specific set to exclude
 */
function repoGetLatestState(repo, path, excludeSets) {
  return syncTreeCalcCompleteEventCache(repo.serverSyncTree_, path, excludeSets) || ChildrenNode.EMPTY_NODE;
}
/**
 * Sends any already-run transactions that aren't waiting for outstanding
 * transactions to complete.
 *
 * Externally it's called with no arguments, but it calls itself recursively
 * with a particular transactionQueueTree node to recurse through the tree.
 *
 * @param node - transactionQueueTree node to start at.
 */
function repoSendReadyTransactions(repo) {
  var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : repo.transactionQueueTree_;
  // Before recursing, make sure any completed transactions are removed.
  if (!node) {
    repoPruneCompletedTransactionsBelowNode(repo, node);
  }
  if (treeGetValue(node)) {
    var queue = repoBuildTransactionQueue(repo, node);
    (0, _util.assert)(queue.length > 0, 'Sending zero length transaction queue');
    var allRun = queue.every(function (transaction) {
      return transaction.status === 0;
    } /* TransactionStatus.RUN */);
    // If they're all run (and not sent), we can send them.  Else, we must wait.
    if (allRun) {
      repoSendTransactionQueue(repo, treeGetPath(node), queue);
    }
  } else if (treeHasChildren(node)) {
    treeForEachChild(node, function (childNode) {
      repoSendReadyTransactions(repo, childNode);
    });
  }
}
/**
 * Given a list of run transactions, send them to the server and then handle
 * the result (success or failure).
 *
 * @param path - The location of the queue.
 * @param queue - Queue of transactions under the specified location.
 */
function repoSendTransactionQueue(repo, path, queue) {
  // Mark transactions as sent and increment retry count!
  var setsToIgnore = queue.map(function (txn) {
    return txn.currentWriteId;
  });
  var latestState = repoGetLatestState(repo, path, setsToIgnore);
  var snapToSend = latestState;
  var latestHash = latestState.hash();
  for (var i = 0; i < queue.length; i++) {
    var txn = queue[i];
    (0, _util.assert)(txn.status === 0 /* TransactionStatus.RUN */, 'tryToSendTransactionQueue_: items in queue should all be run.');
    txn.status = 1 /* TransactionStatus.SENT */;
    txn.retryCount++;
    var relativePath = newRelativePath(path, txn.path);
    // If we've gotten to this point, the output snapshot must be defined.
    snapToSend = snapToSend.updateChild(relativePath /** @type {!Node} */, txn.currentOutputSnapshotRaw);
  }
  var dataToSend = snapToSend.val(true);
  var pathToSend = path;
  // Send the put.
  repo.server_.put(pathToSend.toString(), dataToSend, function (status) {
    repoLog(repo, 'transaction put response', {
      path: pathToSend.toString(),
      status: status
    });
    var events = [];
    if (status === 'ok') {
      // Queue up the callbacks and fire them after cleaning up all of our
      // transaction state, since the callback could trigger more
      // transactions or sets.
      var callbacks = [];
      var _loop3 = function _loop3(_i4) {
        queue[_i4].status = 2 /* TransactionStatus.COMPLETED */;
        events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, queue[_i4].currentWriteId));
        if (queue[_i4].onComplete) {
          // We never unset the output snapshot, and given that this
          // transaction is complete, it should be set
          callbacks.push(function () {
            return queue[_i4].onComplete(null, true, queue[_i4].currentOutputSnapshotResolved);
          });
        }
        queue[_i4].unwatcher();
      };
      for (var _i4 = 0; _i4 < queue.length; _i4++) {
        _loop3(_i4);
      }
      // Now remove the completed transactions.
      repoPruneCompletedTransactionsBelowNode(repo, treeSubTree(repo.transactionQueueTree_, path));
      // There may be pending transactions that we can now send.
      repoSendReadyTransactions(repo, repo.transactionQueueTree_);
      eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
      // Finally, trigger onComplete callbacks.
      for (var _i5 = 0; _i5 < callbacks.length; _i5++) {
        exceptionGuard(callbacks[_i5]);
      }
    } else {
      // transactions are no longer sent.  Update their status appropriately.
      if (status === 'datastale') {
        for (var _i6 = 0; _i6 < queue.length; _i6++) {
          if (queue[_i6].status === 3 /* TransactionStatus.SENT_NEEDS_ABORT */) {
            queue[_i6].status = 4 /* TransactionStatus.NEEDS_ABORT */;
          } else {
            queue[_i6].status = 0 /* TransactionStatus.RUN */;
          }
        }
      } else {
        warn('transaction at ' + pathToSend.toString() + ' failed: ' + status);
        for (var _i7 = 0; _i7 < queue.length; _i7++) {
          queue[_i7].status = 4 /* TransactionStatus.NEEDS_ABORT */;
          queue[_i7].abortReason = status;
        }
      }
      repoRerunTransactions(repo, path);
    }
  }, latestHash);
}
/**
 * Finds all transactions dependent on the data at changedPath and reruns them.
 *
 * Should be called any time cached data changes.
 *
 * Return the highest path that was affected by rerunning transactions. This
 * is the path at which events need to be raised for.
 *
 * @param changedPath - The path in mergedData that changed.
 * @returns The rootmost path that was affected by rerunning transactions.
 */
function repoRerunTransactions(repo, changedPath) {
  var rootMostTransactionNode = repoGetAncestorTransactionNode(repo, changedPath);
  var path = treeGetPath(rootMostTransactionNode);
  var queue = repoBuildTransactionQueue(repo, rootMostTransactionNode);
  repoRerunTransactionQueue(repo, queue, path);
  return path;
}
/**
 * Does all the work of rerunning transactions (as well as cleans up aborted
 * transactions and whatnot).
 *
 * @param queue - The queue of transactions to run.
 * @param path - The path the queue is for.
 */
function repoRerunTransactionQueue(repo, queue, path) {
  if (queue.length === 0) {
    return; // Nothing to do!
  }
  // Queue up the callbacks and fire them after cleaning up all of our
  // transaction state, since the callback could trigger more transactions or
  // sets.
  var callbacks = [];
  var events = [];
  // Ignore all of the sets we're going to re-run.
  var txnsToRerun = queue.filter(function (q) {
    return q.status === 0 /* TransactionStatus.RUN */;
  });
  var setsToIgnore = txnsToRerun.map(function (q) {
    return q.currentWriteId;
  });
  var _loop4 = function _loop4(i) {
    var transaction = queue[i];
    var relativePath = newRelativePath(path, transaction.path);
    var abortTransaction = false,
      abortReason;
    (0, _util.assert)(relativePath !== null, 'rerunTransactionsUnderNode_: relativePath should not be null.');
    if (transaction.status === 4 /* TransactionStatus.NEEDS_ABORT */) {
      abortTransaction = true;
      abortReason = transaction.abortReason;
      events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
    } else if (transaction.status === 0 /* TransactionStatus.RUN */) {
      if (transaction.retryCount >= MAX_TRANSACTION_RETRIES) {
        abortTransaction = true;
        abortReason = 'maxretry';
        events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
      } else {
        // This code reruns a transaction
        var currentNode = repoGetLatestState(repo, transaction.path, setsToIgnore);
        transaction.currentInputSnapshot = currentNode;
        var newData = queue[i].update(currentNode.val());
        if (newData !== undefined) {
          _validateFirebaseData('transaction failed: Data returned ', newData, transaction.path);
          var newDataNode = nodeFromJSON(newData);
          var hasExplicitPriority = _typeof(newData) === 'object' && newData != null && (0, _util.contains)(newData, '.priority');
          if (!hasExplicitPriority) {
            // Keep the old priority if there wasn't a priority explicitly specified.
            newDataNode = newDataNode.updatePriority(currentNode.getPriority());
          }
          var oldWriteId = transaction.currentWriteId;
          var serverValues = repoGenerateServerValues(repo);
          var newNodeResolved = resolveDeferredValueSnapshot(newDataNode, currentNode, serverValues);
          transaction.currentOutputSnapshotRaw = newDataNode;
          transaction.currentOutputSnapshotResolved = newNodeResolved;
          transaction.currentWriteId = repoGetNextWriteId(repo);
          // Mutates setsToIgnore in place
          setsToIgnore.splice(setsToIgnore.indexOf(oldWriteId), 1);
          events = events.concat(syncTreeApplyUserOverwrite(repo.serverSyncTree_, transaction.path, newNodeResolved, transaction.currentWriteId, transaction.applyLocally));
          events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, oldWriteId, true));
        } else {
          abortTransaction = true;
          abortReason = 'nodata';
          events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, transaction.currentWriteId, true));
        }
      }
    }
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, path, events);
    events = [];
    if (abortTransaction) {
      // Abort.
      queue[i].status = 2 /* TransactionStatus.COMPLETED */;
      // Removing a listener can trigger pruning which can muck with
      // mergedData/visibleData (as it prunes data). So defer the unwatcher
      // until we're done.
      (function (unwatcher) {
        setTimeout(unwatcher, Math.floor(0));
      })(queue[i].unwatcher);
      if (queue[i].onComplete) {
        if (abortReason === 'nodata') {
          callbacks.push(function () {
            return queue[i].onComplete(null, false, queue[i].currentInputSnapshot);
          });
        } else {
          callbacks.push(function () {
            return queue[i].onComplete(new Error(abortReason), false, null);
          });
        }
      }
    }
  };
  for (var i = 0; i < queue.length; i++) {
    _loop4(i);
  }
  // Clean up completed transactions.
  repoPruneCompletedTransactionsBelowNode(repo, repo.transactionQueueTree_);
  // Now fire callbacks, now that we're in a good, known state.
  for (var _i8 = 0; _i8 < callbacks.length; _i8++) {
    exceptionGuard(callbacks[_i8]);
  }
  // Try to send the transaction result to the server.
  repoSendReadyTransactions(repo, repo.transactionQueueTree_);
}
/**
 * Returns the rootmost ancestor node of the specified path that has a pending
 * transaction on it, or just returns the node for the given path if there are
 * no pending transactions on any ancestor.
 *
 * @param path - The location to start at.
 * @returns The rootmost node with a transaction.
 */
function repoGetAncestorTransactionNode(repo, path) {
  var front;
  // Start at the root and walk deeper into the tree towards path until we
  // find a node with pending transactions.
  var transactionNode = repo.transactionQueueTree_;
  front = pathGetFront(path);
  while (front !== null && treeGetValue(transactionNode) === undefined) {
    transactionNode = treeSubTree(transactionNode, front);
    path = pathPopFront(path);
    front = pathGetFront(path);
  }
  return transactionNode;
}
/**
 * Builds the queue of all transactions at or below the specified
 * transactionNode.
 *
 * @param transactionNode
 * @returns The generated queue.
 */
function repoBuildTransactionQueue(repo, transactionNode) {
  // Walk any child transaction queues and aggregate them into a single queue.
  var transactionQueue = [];
  repoAggregateTransactionQueuesForNode(repo, transactionNode, transactionQueue);
  // Sort them by the order the transactions were created.
  transactionQueue.sort(function (a, b) {
    return a.order - b.order;
  });
  return transactionQueue;
}
function repoAggregateTransactionQueuesForNode(repo, node, queue) {
  var nodeQueue = treeGetValue(node);
  if (nodeQueue) {
    for (var i = 0; i < nodeQueue.length; i++) {
      queue.push(nodeQueue[i]);
    }
  }
  treeForEachChild(node, function (child) {
    repoAggregateTransactionQueuesForNode(repo, child, queue);
  });
}
/**
 * Remove COMPLETED transactions at or below this node in the transactionQueueTree_.
 */
function repoPruneCompletedTransactionsBelowNode(repo, node) {
  var queue = treeGetValue(node);
  if (queue) {
    var to = 0;
    for (var from = 0; from < queue.length; from++) {
      if (queue[from].status !== 2 /* TransactionStatus.COMPLETED */) {
        queue[to] = queue[from];
        to++;
      }
    }
    queue.length = to;
    treeSetValue(node, queue.length > 0 ? queue : undefined);
  }
  treeForEachChild(node, function (childNode) {
    repoPruneCompletedTransactionsBelowNode(repo, childNode);
  });
}
/**
 * Aborts all transactions on ancestors or descendants of the specified path.
 * Called when doing a set() or update() since we consider them incompatible
 * with transactions.
 *
 * @param path - Path for which we want to abort related transactions.
 */
function repoAbortTransactions(repo, path) {
  var affectedPath = treeGetPath(repoGetAncestorTransactionNode(repo, path));
  var transactionNode = treeSubTree(repo.transactionQueueTree_, path);
  treeForEachAncestor(transactionNode, function (node) {
    repoAbortTransactionsOnNode(repo, node);
  });
  repoAbortTransactionsOnNode(repo, transactionNode);
  treeForEachDescendant(transactionNode, function (node) {
    repoAbortTransactionsOnNode(repo, node);
  });
  return affectedPath;
}
/**
 * Abort transactions stored in this transaction queue node.
 *
 * @param node - Node to abort transactions for.
 */
function repoAbortTransactionsOnNode(repo, node) {
  var queue = treeGetValue(node);
  if (queue) {
    // Queue up the callbacks and fire them after cleaning up all of our
    // transaction state, since the callback could trigger more transactions
    // or sets.
    var callbacks = [];
    // Go through queue.  Any already-sent transactions must be marked for
    // abort, while the unsent ones can be immediately aborted and removed.
    var events = [];
    var lastSent = -1;
    for (var i = 0; i < queue.length; i++) {
      if (queue[i].status === 3 /* TransactionStatus.SENT_NEEDS_ABORT */) ;else if (queue[i].status === 1 /* TransactionStatus.SENT */) {
        (0, _util.assert)(lastSent === i - 1, 'All SENT items should be at beginning of queue.');
        lastSent = i;
        // Mark transaction for abort when it comes back.
        queue[i].status = 3 /* TransactionStatus.SENT_NEEDS_ABORT */;
        queue[i].abortReason = 'set';
      } else {
        (0, _util.assert)(queue[i].status === 0 /* TransactionStatus.RUN */, 'Unexpected transaction status in abort');
        // We can abort it immediately.
        queue[i].unwatcher();
        events = events.concat(syncTreeAckUserWrite(repo.serverSyncTree_, queue[i].currentWriteId, true));
        if (queue[i].onComplete) {
          callbacks.push(queue[i].onComplete.bind(null, new Error('set'), false, null));
        }
      }
    }
    if (lastSent === -1) {
      // We're not waiting for any sent transactions.  We can clear the queue.
      treeSetValue(node, undefined);
    } else {
      // Remove the transactions we aborted.
      queue.length = lastSent + 1;
    }
    // Now fire the callbacks.
    eventQueueRaiseEventsForChangedPath(repo.eventQueue_, treeGetPath(node), events);
    for (var _i9 = 0; _i9 < callbacks.length; _i9++) {
      exceptionGuard(callbacks[_i9]);
    }
  }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function decodePath(pathString) {
  var pathStringDecoded = '';
  var pieces = pathString.split('/');
  for (var i = 0; i < pieces.length; i++) {
    if (pieces[i].length > 0) {
      var piece = pieces[i];
      try {
        piece = decodeURIComponent(piece.replace(/\+/g, ' '));
      } catch (e) {}
      pathStringDecoded += '/' + piece;
    }
  }
  return pathStringDecoded;
}
/**
 * @returns key value hash
 */
function decodeQuery(queryString) {
  var results = {};
  if (queryString.charAt(0) === '?') {
    queryString = queryString.substring(1);
  }
  var _iterator10 = _createForOfIteratorHelper(queryString.split('&')),
    _step9;
  try {
    for (_iterator10.s(); !(_step9 = _iterator10.n()).done;) {
      var segment = _step9.value;
      if (segment.length === 0) {
        continue;
      }
      var kv = segment.split('=');
      if (kv.length === 2) {
        results[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
      } else {
        warn("Invalid query segment '".concat(segment, "' in query '").concat(queryString, "'"));
      }
    }
  } catch (err) {
    _iterator10.e(err);
  } finally {
    _iterator10.f();
  }
  return results;
}
var parseRepoInfo = function parseRepoInfo(dataURL, nodeAdmin) {
  var parsedUrl = parseDatabaseURL(dataURL),
    namespace = parsedUrl.namespace;
  if (parsedUrl.domain === 'firebase.com') {
    fatal(parsedUrl.host + ' is no longer supported. ' + 'Please use <YOUR FIREBASE>.firebaseio.com instead');
  }
  // Catch common error of uninitialized namespace value.
  if ((!namespace || namespace === 'undefined') && parsedUrl.domain !== 'localhost') {
    fatal('Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com');
  }
  if (!parsedUrl.secure) {
    warnIfPageIsSecure();
  }
  var webSocketOnly = parsedUrl.scheme === 'ws' || parsedUrl.scheme === 'wss';
  return {
    repoInfo: new RepoInfo(parsedUrl.host, parsedUrl.secure, namespace, webSocketOnly, nodeAdmin, /*persistenceKey=*/'', /*includeNamespaceInQueryParams=*/namespace !== parsedUrl.subdomain),
    path: new Path(parsedUrl.pathString)
  };
};
var parseDatabaseURL = function parseDatabaseURL(dataURL) {
  // Default to empty strings in the event of a malformed string.
  var host = '',
    domain = '',
    subdomain = '',
    pathString = '',
    namespace = '';
  // Always default to SSL, unless otherwise specified.
  var secure = true,
    scheme = 'https',
    port = 443;
  // Don't do any validation here. The caller is responsible for validating the result of parsing.
  if (typeof dataURL === 'string') {
    // Parse scheme.
    var colonInd = dataURL.indexOf('//');
    if (colonInd >= 0) {
      scheme = dataURL.substring(0, colonInd - 1);
      dataURL = dataURL.substring(colonInd + 2);
    }
    // Parse host, path, and query string.
    var slashInd = dataURL.indexOf('/');
    if (slashInd === -1) {
      slashInd = dataURL.length;
    }
    var questionMarkInd = dataURL.indexOf('?');
    if (questionMarkInd === -1) {
      questionMarkInd = dataURL.length;
    }
    host = dataURL.substring(0, Math.min(slashInd, questionMarkInd));
    if (slashInd < questionMarkInd) {
      // For pathString, questionMarkInd will always come after slashInd
      pathString = decodePath(dataURL.substring(slashInd, questionMarkInd));
    }
    var queryParams = decodeQuery(dataURL.substring(Math.min(dataURL.length, questionMarkInd)));
    // If we have a port, use scheme for determining if it's secure.
    colonInd = host.indexOf(':');
    if (colonInd >= 0) {
      secure = scheme === 'https' || scheme === 'wss';
      port = parseInt(host.substring(colonInd + 1), 10);
    } else {
      colonInd = host.length;
    }
    var hostWithoutPort = host.slice(0, colonInd);
    if (hostWithoutPort.toLowerCase() === 'localhost') {
      domain = 'localhost';
    } else if (hostWithoutPort.split('.').length <= 2) {
      domain = hostWithoutPort;
    } else {
      // Interpret the subdomain of a 3 or more component URL as the namespace name.
      var dotInd = host.indexOf('.');
      subdomain = host.substring(0, dotInd).toLowerCase();
      domain = host.substring(dotInd + 1);
      // Normalize namespaces to lowercase to share storage / connection.
      namespace = subdomain;
    }
    // Always treat the value of the `ns` as the namespace name if it is present.
    if ('ns' in queryParams) {
      namespace = queryParams['ns'];
    }
  }
  return {
    host: host,
    port: port,
    domain: domain,
    subdomain: subdomain,
    secure: secure,
    scheme: scheme,
    pathString: pathString,
    namespace: namespace
  };
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Modeled after base64 web-safe chars, but ordered by ASCII.
var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
/**
 * Fancy ID generator that creates 20-character string identifiers with the
 * following properties:
 *
 * 1. They're based on timestamp so that they sort *after* any existing ids.
 * 2. They contain 72-bits of random data after the timestamp so that IDs won't
 *    collide with other clients' IDs.
 * 3. They sort *lexicographically* (so the timestamp is converted to characters
 *    that will sort properly).
 * 4. They're monotonically increasing. Even if you generate more than one in
 *    the same timestamp, the latter ones will sort after the former ones. We do
 *    this by using the previous random bits but "incrementing" them by 1 (only
 *    in the case of a timestamp collision).
 */
var nextPushId = function () {
  // Timestamp of last push, used to prevent local collisions if you push twice
  // in one ms.
  var lastPushTime = 0;
  // We generate 72-bits of randomness which get turned into 12 characters and
  // appended to the timestamp to prevent collisions with other clients. We
  // store the last characters we generated because in the event of a collision,
  // we'll use those same characters except "incremented" by one.
  var lastRandChars = [];
  return function (now) {
    var duplicateTime = now === lastPushTime;
    lastPushTime = now;
    var i;
    var timeStampChars = new Array(8);
    for (i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      // NOTE: Can't use << here because javascript will convert to int and lose
      // the upper bits.
      now = Math.floor(now / 64);
    }
    (0, _util.assert)(now === 0, 'Cannot push at time == 0');
    var id = timeStampChars.join('');
    if (!duplicateTime) {
      for (i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
      }
    } else {
      // If the timestamp hasn't changed since last push, use the same random
      // number, except incremented by 1.
      for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
        lastRandChars[i] = 0;
      }
      lastRandChars[i]++;
    }
    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }
    (0, _util.assert)(id.length === 20, 'nextPushId: Length should be 20.');
    return id;
  };
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Encapsulates the data needed to raise an event
 */
var DataEvent = /*#__PURE__*/function () {
  /**
   * @param eventType - One of: value, child_added, child_changed, child_moved, child_removed
   * @param eventRegistration - The function to call to with the event data. User provided
   * @param snapshot - The data backing the event
   * @param prevName - Optional, the name of the previous child for child_* events.
   */
  function DataEvent(eventType, eventRegistration, snapshot, prevName) {
    _classCallCheck(this, DataEvent);
    this.eventType = eventType;
    this.eventRegistration = eventRegistration;
    this.snapshot = snapshot;
    this.prevName = prevName;
  }
  return _createClass(DataEvent, [{
    key: "getPath",
    value: function getPath() {
      var ref = this.snapshot.ref;
      if (this.eventType === 'value') {
        return ref._path;
      } else {
        return ref.parent._path;
      }
    }
  }, {
    key: "getEventType",
    value: function getEventType() {
      return this.eventType;
    }
  }, {
    key: "getEventRunner",
    value: function getEventRunner() {
      return this.eventRegistration.getEventRunner(this);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.getPath().toString() + ':' + this.eventType + ':' + (0, _util.stringify)(this.snapshot.exportVal());
    }
  }]);
}();
var CancelEvent = /*#__PURE__*/function () {
  function CancelEvent(eventRegistration, error, path) {
    _classCallCheck(this, CancelEvent);
    this.eventRegistration = eventRegistration;
    this.error = error;
    this.path = path;
  }
  return _createClass(CancelEvent, [{
    key: "getPath",
    value: function getPath() {
      return this.path;
    }
  }, {
    key: "getEventType",
    value: function getEventType() {
      return 'cancel';
    }
  }, {
    key: "getEventRunner",
    value: function getEventRunner() {
      return this.eventRegistration.getEventRunner(this);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.path.toString() + ':cancel';
    }
  }]);
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A wrapper class that converts events from the database@exp SDK to the legacy
 * Database SDK. Events are not converted directly as event registration relies
 * on reference comparison of the original user callback (see `matches()`) and
 * relies on equality of the legacy SDK's `context` object.
 */
var CallbackContext = /*#__PURE__*/function () {
  function CallbackContext(snapshotCallback, cancelCallback) {
    _classCallCheck(this, CallbackContext);
    this.snapshotCallback = snapshotCallback;
    this.cancelCallback = cancelCallback;
  }
  return _createClass(CallbackContext, [{
    key: "onValue",
    value: function onValue(expDataSnapshot, previousChildName) {
      this.snapshotCallback.call(null, expDataSnapshot, previousChildName);
    }
  }, {
    key: "onCancel",
    value: function onCancel(error) {
      (0, _util.assert)(this.hasCancelCallback, 'Raising a cancel event on a listener with no cancel callback');
      return this.cancelCallback.call(null, error);
    }
  }, {
    key: "hasCancelCallback",
    get: function get() {
      return !!this.cancelCallback;
    }
  }, {
    key: "matches",
    value: function matches(other) {
      return this.snapshotCallback === other.snapshotCallback || this.snapshotCallback.userCallback !== undefined && this.snapshotCallback.userCallback === other.snapshotCallback.userCallback && this.snapshotCallback.context === other.snapshotCallback.context;
    }
  }]);
}();
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The `onDisconnect` class allows you to write or clear data when your client
 * disconnects from the Database server. These updates occur whether your
 * client disconnects cleanly or not, so you can rely on them to clean up data
 * even if a connection is dropped or a client crashes.
 *
 * The `onDisconnect` class is most commonly used to manage presence in
 * applications where it is useful to detect how many clients are connected and
 * when other clients disconnect. See
 * {@link https://firebase.google.com/docs/database/web/offline-capabilities | Enabling Offline Capabilities in JavaScript}
 * for more information.
 *
 * To avoid problems when a connection is dropped before the requests can be
 * transferred to the Database server, these functions should be called before
 * writing any data.
 *
 * Note that `onDisconnect` operations are only triggered once. If you want an
 * operation to occur each time a disconnect occurs, you'll need to re-establish
 * the `onDisconnect` operations each time you reconnect.
 */
var OnDisconnect = exports.OnDisconnect = /*#__PURE__*/function () {
  /** @hideconstructor */
  function OnDisconnect(_repo, _path) {
    _classCallCheck(this, OnDisconnect);
    this._repo = _repo;
    this._path = _path;
  }
  /**
   * Cancels all previously queued `onDisconnect()` set or update events for this
   * location and all children.
   *
   * If a write has been queued for this location via a `set()` or `update()` at a
   * parent location, the write at this location will be canceled, though writes
   * to sibling locations will still occur.
   *
   * @returns Resolves when synchronization to the server is complete.
   */
  return _createClass(OnDisconnect, [{
    key: "cancel",
    value: function cancel() {
      var deferred = new _util.Deferred();
      repoOnDisconnectCancel(this._repo, this._path, deferred.wrapCallback(function () {}));
      return deferred.promise;
    }
    /**
     * Ensures the data at this location is deleted when the client is disconnected
     * (due to closing the browser, navigating to a new page, or network issues).
     *
     * @returns Resolves when synchronization to the server is complete.
     */
  }, {
    key: "remove",
    value: function remove() {
      validateWritablePath('OnDisconnect.remove', this._path);
      var deferred = new _util.Deferred();
      repoOnDisconnectSet(this._repo, this._path, null, deferred.wrapCallback(function () {}));
      return deferred.promise;
    }
    /**
     * Ensures the data at this location is set to the specified value when the
     * client is disconnected (due to closing the browser, navigating to a new page,
     * or network issues).
     *
     * `set()` is especially useful for implementing "presence" systems, where a
     * value should be changed or cleared when a user disconnects so that they
     * appear "offline" to other users. See
     * {@link https://firebase.google.com/docs/database/web/offline-capabilities | Enabling Offline Capabilities in JavaScript}
     * for more information.
     *
     * Note that `onDisconnect` operations are only triggered once. If you want an
     * operation to occur each time a disconnect occurs, you'll need to re-establish
     * the `onDisconnect` operations each time.
     *
     * @param value - The value to be written to this location on disconnect (can
     * be an object, array, string, number, boolean, or null).
     * @returns Resolves when synchronization to the Database is complete.
     */
  }, {
    key: "set",
    value: function set(value) {
      validateWritablePath('OnDisconnect.set', this._path);
      validateFirebaseDataArg('OnDisconnect.set', value, this._path, false);
      var deferred = new _util.Deferred();
      repoOnDisconnectSet(this._repo, this._path, value, deferred.wrapCallback(function () {}));
      return deferred.promise;
    }
    /**
     * Ensures the data at this location is set to the specified value and priority
     * when the client is disconnected (due to closing the browser, navigating to a
     * new page, or network issues).
     *
     * @param value - The value to be written to this location on disconnect (can
     * be an object, array, string, number, boolean, or null).
     * @param priority - The priority to be written (string, number, or null).
     * @returns Resolves when synchronization to the Database is complete.
     */
  }, {
    key: "setWithPriority",
    value: function setWithPriority(value, priority) {
      validateWritablePath('OnDisconnect.setWithPriority', this._path);
      validateFirebaseDataArg('OnDisconnect.setWithPriority', value, this._path, false);
      validatePriority('OnDisconnect.setWithPriority', priority, false);
      var deferred = new _util.Deferred();
      repoOnDisconnectSetWithPriority(this._repo, this._path, value, priority, deferred.wrapCallback(function () {}));
      return deferred.promise;
    }
    /**
     * Writes multiple values at this location when the client is disconnected (due
     * to closing the browser, navigating to a new page, or network issues).
     *
     * The `values` argument contains multiple property-value pairs that will be
     * written to the Database together. Each child property can either be a simple
     * property (for example, "name") or a relative path (for example, "name/first")
     * from the current location to the data to update.
     *
     * As opposed to the `set()` method, `update()` can be use to selectively update
     * only the referenced properties at the current location (instead of replacing
     * all the child properties at the current location).
     *
     * @param values - Object containing multiple values.
     * @returns Resolves when synchronization to the Database is complete.
     */
  }, {
    key: "update",
    value: function update(values) {
      validateWritablePath('OnDisconnect.update', this._path);
      validateFirebaseMergeDataArg('OnDisconnect.update', values, this._path, false);
      var deferred = new _util.Deferred();
      repoOnDisconnectUpdate(this._repo, this._path, values, deferred.wrapCallback(function () {}));
      return deferred.promise;
    }
  }]);
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @internal
 */
var QueryImpl = exports._QueryImpl = /*#__PURE__*/function () {
  /**
   * @hideconstructor
   */
  function QueryImpl(_repo, _path, _queryParams, _orderByCalled) {
    _classCallCheck(this, QueryImpl);
    this._repo = _repo;
    this._path = _path;
    this._queryParams = _queryParams;
    this._orderByCalled = _orderByCalled;
  }
  return _createClass(QueryImpl, [{
    key: "key",
    get: function get() {
      if (pathIsEmpty(this._path)) {
        return null;
      } else {
        return pathGetBack(this._path);
      }
    }
  }, {
    key: "ref",
    get: function get() {
      return new ReferenceImpl(this._repo, this._path);
    }
  }, {
    key: "_queryIdentifier",
    get: function get() {
      var obj = queryParamsGetQueryObject(this._queryParams);
      var id = _ObjectToUniqueKey(obj);
      return id === '{}' ? 'default' : id;
    }
    /**
     * An object representation of the query parameters used by this Query.
     */
  }, {
    key: "_queryObject",
    get: function get() {
      return queryParamsGetQueryObject(this._queryParams);
    }
  }, {
    key: "isEqual",
    value: function isEqual(other) {
      other = (0, _util.getModularInstance)(other);
      if (!(other instanceof QueryImpl)) {
        return false;
      }
      var sameRepo = this._repo === other._repo;
      var samePath = pathEquals(this._path, other._path);
      var sameQueryIdentifier = this._queryIdentifier === other._queryIdentifier;
      return sameRepo && samePath && sameQueryIdentifier;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toString();
    }
  }, {
    key: "toString",
    value: function toString() {
      return this._repo.toString() + pathToUrlEncodedString(this._path);
    }
  }]);
}();
/**
 * Validates that no other order by call has been made
 */
function validateNoPreviousOrderByCall(query, fnName) {
  if (query._orderByCalled === true) {
    throw new Error(fnName + ": You can't combine multiple orderBy calls.");
  }
}
/**
 * Validates start/end values for queries.
 */
function validateQueryEndpoints(params) {
  var startNode = null;
  var endNode = null;
  if (params.hasStart()) {
    startNode = params.getIndexStartValue();
  }
  if (params.hasEnd()) {
    endNode = params.getIndexEndValue();
  }
  if (params.getIndex() === KEY_INDEX) {
    var tooManyArgsError = 'Query: When ordering by key, you may only pass one argument to ' + 'startAt(), endAt(), or equalTo().';
    var wrongArgTypeError = 'Query: When ordering by key, the argument passed to startAt(), startAfter(), ' + 'endAt(), endBefore(), or equalTo() must be a string.';
    if (params.hasStart()) {
      var startName = params.getIndexStartName();
      if (startName !== MIN_NAME) {
        throw new Error(tooManyArgsError);
      } else if (typeof startNode !== 'string') {
        throw new Error(wrongArgTypeError);
      }
    }
    if (params.hasEnd()) {
      var endName = params.getIndexEndName();
      if (endName !== MAX_NAME) {
        throw new Error(tooManyArgsError);
      } else if (typeof endNode !== 'string') {
        throw new Error(wrongArgTypeError);
      }
    }
  } else if (params.getIndex() === PRIORITY_INDEX) {
    if (startNode != null && !isValidPriority(startNode) || endNode != null && !isValidPriority(endNode)) {
      throw new Error('Query: When ordering by priority, the first argument passed to startAt(), ' + 'startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value ' + '(null, a number, or a string).');
    }
  } else {
    (0, _util.assert)(params.getIndex() instanceof PathIndex || params.getIndex() === VALUE_INDEX, 'unknown index type.');
    if (startNode != null && _typeof(startNode) === 'object' || endNode != null && _typeof(endNode) === 'object') {
      throw new Error('Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or ' + 'equalTo() cannot be an object.');
    }
  }
}
/**
 * Validates that limit* has been called with the correct combination of parameters
 */
function validateLimit(params) {
  if (params.hasStart() && params.hasEnd() && params.hasLimit() && !params.hasAnchoredLimit()) {
    throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use " + 'limitToFirst() or limitToLast() instead.');
  }
}
/**
 * @internal
 */
var ReferenceImpl = exports._ReferenceImpl = /*#__PURE__*/function (_QueryImpl) {
  /** @hideconstructor */
  function ReferenceImpl(repo, path) {
    _classCallCheck(this, ReferenceImpl);
    return _callSuper(this, ReferenceImpl, [repo, path, new QueryParams(), false]);
  }
  _inherits(ReferenceImpl, _QueryImpl);
  return _createClass(ReferenceImpl, [{
    key: "parent",
    get: function get() {
      var parentPath = pathParent(this._path);
      return parentPath === null ? null : new ReferenceImpl(this._repo, parentPath);
    }
  }, {
    key: "root",
    get: function get() {
      var ref = this;
      while (ref.parent !== null) {
        ref = ref.parent;
      }
      return ref;
    }
  }]);
}(QueryImpl);
/**
 * A `DataSnapshot` contains data from a Database location.
 *
 * Any time you read data from the Database, you receive the data as a
 * `DataSnapshot`. A `DataSnapshot` is passed to the event callbacks you attach
 * with `on()` or `once()`. You can extract the contents of the snapshot as a
 * JavaScript object by calling the `val()` method. Alternatively, you can
 * traverse into the snapshot by calling `child()` to return child snapshots
 * (which you could then call `val()` on).
 *
 * A `DataSnapshot` is an efficiently generated, immutable copy of the data at
 * a Database location. It cannot be modified and will never change (to modify
 * data, you always call the `set()` method on a `Reference` directly).
 */
var DataSnapshot = exports.DataSnapshot = /*#__PURE__*/function () {
  /**
   * @param _node - A SnapshotNode to wrap.
   * @param ref - The location this snapshot came from.
   * @param _index - The iteration order for this snapshot
   * @hideconstructor
   */
  function DataSnapshot(_node,
  /**
   * The location of this DataSnapshot.
   */
  ref, _index) {
    _classCallCheck(this, DataSnapshot);
    this._node = _node;
    this.ref = ref;
    this._index = _index;
  }
  /**
   * Gets the priority value of the data in this `DataSnapshot`.
   *
   * Applications need not use priority but can order collections by
   * ordinary properties (see
   * {@link https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data |Sorting and filtering data}
   * ).
   */
  return _createClass(DataSnapshot, [{
    key: "priority",
    get: function get() {
      // typecast here because we never return deferred values or internal priorities (MAX_PRIORITY)
      return this._node.getPriority().val();
    }
    /**
     * The key (last part of the path) of the location of this `DataSnapshot`.
     *
     * The last token in a Database location is considered its key. For example,
     * "ada" is the key for the /users/ada/ node. Accessing the key on any
     * `DataSnapshot` will return the key for the location that generated it.
     * However, accessing the key on the root URL of a Database will return
     * `null`.
     */
  }, {
    key: "key",
    get: function get() {
      return this.ref.key;
    }
    /** Returns the number of child properties of this `DataSnapshot`. */
  }, {
    key: "size",
    get: function get() {
      return this._node.numChildren();
    }
    /**
     * Gets another `DataSnapshot` for the location at the specified relative path.
     *
     * Passing a relative path to the `child()` method of a DataSnapshot returns
     * another `DataSnapshot` for the location at the specified relative path. The
     * relative path can either be a simple child name (for example, "ada") or a
     * deeper, slash-separated path (for example, "ada/name/first"). If the child
     * location has no data, an empty `DataSnapshot` (that is, a `DataSnapshot`
     * whose value is `null`) is returned.
     *
     * @param path - A relative path to the location of child data.
     */
  }, {
    key: "child",
    value: function child(path) {
      var childPath = new Path(path);
      var childRef = _child9(this.ref, path);
      return new DataSnapshot(this._node.getChild(childPath), childRef, PRIORITY_INDEX);
    }
    /**
     * Returns true if this `DataSnapshot` contains any data. It is slightly more
     * efficient than using `snapshot.val() !== null`.
     */
  }, {
    key: "exists",
    value: function exists() {
      return !this._node.isEmpty();
    }
    /**
     * Exports the entire contents of the DataSnapshot as a JavaScript object.
     *
     * The `exportVal()` method is similar to `val()`, except priority information
     * is included (if available), making it suitable for backing up your data.
     *
     * @returns The DataSnapshot's contents as a JavaScript value (Object,
     *   Array, string, number, boolean, or `null`).
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "exportVal",
    value: function exportVal() {
      return this._node.val(true);
    }
    /**
     * Enumerates the top-level children in the `IteratedDataSnapshot`.
     *
     * Because of the way JavaScript objects work, the ordering of data in the
     * JavaScript object returned by `val()` is not guaranteed to match the
     * ordering on the server nor the ordering of `onChildAdded()` events. That is
     * where `forEach()` comes in handy. It guarantees the children of a
     * `DataSnapshot` will be iterated in their query order.
     *
     * If no explicit `orderBy*()` method is used, results are returned
     * ordered by key (unless priorities are used, in which case, results are
     * returned by priority).
     *
     * @param action - A function that will be called for each child DataSnapshot.
     * The callback can return true to cancel further enumeration.
     * @returns true if enumeration was canceled due to your callback returning
     * true.
     */
  }, {
    key: "forEach",
    value: function forEach(action) {
      var _this37 = this;
      if (this._node.isLeafNode()) {
        return false;
      }
      var childrenNode = this._node;
      // Sanitize the return value to a boolean. ChildrenNode.forEachChild has a weird return type...
      return !!childrenNode.forEachChild(this._index, function (key, node) {
        return action(new DataSnapshot(node, _child9(_this37.ref, key), PRIORITY_INDEX));
      });
    }
    /**
     * Returns true if the specified child path has (non-null) data.
     *
     * @param path - A relative path to the location of a potential child.
     * @returns `true` if data exists at the specified child path; else
     *  `false`.
     */
  }, {
    key: "hasChild",
    value: function hasChild(path) {
      var childPath = new Path(path);
      return !this._node.getChild(childPath).isEmpty();
    }
    /**
     * Returns whether or not the `DataSnapshot` has any non-`null` child
     * properties.
     *
     * You can use `hasChildren()` to determine if a `DataSnapshot` has any
     * children. If it does, you can enumerate them using `forEach()`. If it
     * doesn't, then either this snapshot contains a primitive value (which can be
     * retrieved with `val()`) or it is empty (in which case, `val()` will return
     * `null`).
     *
     * @returns true if this snapshot has any children; else false.
     */
  }, {
    key: "hasChildren",
    value: function hasChildren() {
      if (this._node.isLeafNode()) {
        return false;
      } else {
        return !this._node.isEmpty();
      }
    }
    /**
     * Returns a JSON-serializable representation of this object.
     */
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.exportVal();
    }
    /**
     * Extracts a JavaScript value from a `DataSnapshot`.
     *
     * Depending on the data in a `DataSnapshot`, the `val()` method may return a
     * scalar type (string, number, or boolean), an array, or an object. It may
     * also return null, indicating that the `DataSnapshot` is empty (contains no
     * data).
     *
     * @returns The DataSnapshot's contents as a JavaScript value (Object,
     *   Array, string, number, boolean, or `null`).
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "val",
    value: function val() {
      return this._node.val();
    }
  }]);
}();
/**
 *
 * Returns a `Reference` representing the location in the Database
 * corresponding to the provided path. If no path is provided, the `Reference`
 * will point to the root of the Database.
 *
 * @param db - The database instance to obtain a reference for.
 * @param path - Optional path representing the location the returned
 *   `Reference` will point. If not provided, the returned `Reference` will
 *   point to the root of the Database.
 * @returns If a path is provided, a `Reference`
 *   pointing to the provided path. Otherwise, a `Reference` pointing to the
 *   root of the Database.
 */
function ref(db, path) {
  db = (0, _util.getModularInstance)(db);
  db._checkNotDeleted('ref');
  return path !== undefined ? _child9(db._root, path) : db._root;
}
/**
 * Returns a `Reference` representing the location in the Database
 * corresponding to the provided Firebase URL.
 *
 * An exception is thrown if the URL is not a valid Firebase Database URL or it
 * has a different domain than the current `Database` instance.
 *
 * Note that all query parameters (`orderBy`, `limitToLast`, etc.) are ignored
 * and are not applied to the returned `Reference`.
 *
 * @param db - The database instance to obtain a reference for.
 * @param url - The Firebase URL at which the returned `Reference` will
 *   point.
 * @returns A `Reference` pointing to the provided
 *   Firebase URL.
 */
function refFromURL(db, url) {
  db = (0, _util.getModularInstance)(db);
  db._checkNotDeleted('refFromURL');
  var parsedURL = parseRepoInfo(url, db._repo.repoInfo_.nodeAdmin);
  validateUrl('refFromURL', parsedURL);
  var repoInfo = parsedURL.repoInfo;
  if (!db._repo.repoInfo_.isCustomHost() && repoInfo.host !== db._repo.repoInfo_.host) {
    fatal('refFromURL' + ': Host name does not match the current database: ' + '(found ' + repoInfo.host + ' but expected ' + db._repo.repoInfo_.host + ')');
  }
  return ref(db, parsedURL.path.toString());
}
/**
 * Gets a `Reference` for the location at the specified relative path.
 *
 * The relative path can either be a simple child name (for example, "ada") or
 * a deeper slash-separated path (for example, "ada/name/first").
 *
 * @param parent - The parent location.
 * @param path - A relative path from this location to the desired child
 *   location.
 * @returns The specified child location.
 */
function _child9(parent, path) {
  parent = (0, _util.getModularInstance)(parent);
  if (pathGetFront(parent._path) === null) {
    validateRootPathString('child', 'path', path, false);
  } else {
    validatePathString('child', 'path', path, false);
  }
  return new ReferenceImpl(parent._repo, pathChild(parent._path, path));
}
/**
 * Returns an `OnDisconnect` object - see
 * {@link https://firebase.google.com/docs/database/web/offline-capabilities | Enabling Offline Capabilities in JavaScript}
 * for more information on how to use it.
 *
 * @param ref - The reference to add OnDisconnect triggers for.
 */
function onDisconnect(ref) {
  ref = (0, _util.getModularInstance)(ref);
  return new OnDisconnect(ref._repo, ref._path);
}
/**
 * Generates a new child location using a unique key and returns its
 * `Reference`.
 *
 * This is the most common pattern for adding data to a collection of items.
 *
 * If you provide a value to `push()`, the value is written to the
 * generated location. If you don't pass a value, nothing is written to the
 * database and the child remains empty (but you can use the `Reference`
 * elsewhere).
 *
 * The unique keys generated by `push()` are ordered by the current time, so the
 * resulting list of items is chronologically sorted. The keys are also
 * designed to be unguessable (they contain 72 random bits of entropy).
 *
 * See {@link https://firebase.google.com/docs/database/web/lists-of-data#append_to_a_list_of_data | Append to a list of data}.
 * See {@link https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html | The 2^120 Ways to Ensure Unique Identifiers}.
 *
 * @param parent - The parent location.
 * @param value - Optional value to be written at the generated location.
 * @returns Combined `Promise` and `Reference`; resolves when write is complete,
 * but can be used immediately as the `Reference` to the child location.
 */
function push(parent, value) {
  parent = (0, _util.getModularInstance)(parent);
  validateWritablePath('push', parent._path);
  validateFirebaseDataArg('push', value, parent._path, true);
  var now = repoServerTime(parent._repo);
  var name = nextPushId(now);
  // push() returns a ThennableReference whose promise is fulfilled with a
  // regular Reference. We use child() to create handles to two different
  // references. The first is turned into a ThennableReference below by adding
  // then() and catch() methods and is used as the return value of push(). The
  // second remains a regular Reference and is used as the fulfilled value of
  // the first ThennableReference.
  var thenablePushRef = _child9(parent, name);
  var pushRef = _child9(parent, name);
  var promise;
  if (value != null) {
    promise = set(pushRef, value).then(function () {
      return pushRef;
    });
  } else {
    promise = Promise.resolve(pushRef);
  }
  thenablePushRef.then = promise.then.bind(promise);
  thenablePushRef.catch = promise.then.bind(promise, undefined);
  return thenablePushRef;
}
/**
 * Removes the data at this Database location.
 *
 * Any data at child locations will also be deleted.
 *
 * The effect of the remove will be visible immediately and the corresponding
 * event 'value' will be triggered. Synchronization of the remove to the
 * Firebase servers will also be started, and the returned Promise will resolve
 * when complete. If provided, the onComplete callback will be called
 * asynchronously after synchronization has finished.
 *
 * @param ref - The location to remove.
 * @returns Resolves when remove on server is complete.
 */
function remove(ref) {
  validateWritablePath('remove', ref._path);
  return set(ref, null);
}
/**
 * Writes data to this Database location.
 *
 * This will overwrite any data at this location and all child locations.
 *
 * The effect of the write will be visible immediately, and the corresponding
 * events ("value", "child_added", etc.) will be triggered. Synchronization of
 * the data to the Firebase servers will also be started, and the returned
 * Promise will resolve when complete. If provided, the `onComplete` callback
 * will be called asynchronously after synchronization has finished.
 *
 * Passing `null` for the new value is equivalent to calling `remove()`; namely,
 * all data at this location and all child locations will be deleted.
 *
 * `set()` will remove any priority stored at this location, so if priority is
 * meant to be preserved, you need to use `setWithPriority()` instead.
 *
 * Note that modifying data with `set()` will cancel any pending transactions
 * at that location, so extreme care should be taken if mixing `set()` and
 * `transaction()` to modify the same data.
 *
 * A single `set()` will generate a single "value" event at the location where
 * the `set()` was performed.
 *
 * @param ref - The location to write to.
 * @param value - The value to be written (string, number, boolean, object,
 *   array, or null).
 * @returns Resolves when write to server is complete.
 */
function set(ref, value) {
  ref = (0, _util.getModularInstance)(ref);
  validateWritablePath('set', ref._path);
  validateFirebaseDataArg('set', value, ref._path, false);
  var deferred = new _util.Deferred();
  repoSetWithPriority(ref._repo, ref._path, value, /*priority=*/null, deferred.wrapCallback(function () {}));
  return deferred.promise;
}
/**
 * Sets a priority for the data at this Database location.
 *
 * Applications need not use priority but can order collections by
 * ordinary properties (see
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data | Sorting and filtering data}
 * ).
 *
 * @param ref - The location to write to.
 * @param priority - The priority to be written (string, number, or null).
 * @returns Resolves when write to server is complete.
 */
function setPriority(ref, priority) {
  ref = (0, _util.getModularInstance)(ref);
  validateWritablePath('setPriority', ref._path);
  validatePriority('setPriority', priority, false);
  var deferred = new _util.Deferred();
  repoSetWithPriority(ref._repo, pathChild(ref._path, '.priority'), priority, null, deferred.wrapCallback(function () {}));
  return deferred.promise;
}
/**
 * Writes data the Database location. Like `set()` but also specifies the
 * priority for that data.
 *
 * Applications need not use priority but can order collections by
 * ordinary properties (see
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data | Sorting and filtering data}
 * ).
 *
 * @param ref - The location to write to.
 * @param value - The value to be written (string, number, boolean, object,
 *   array, or null).
 * @param priority - The priority to be written (string, number, or null).
 * @returns Resolves when write to server is complete.
 */
function setWithPriority(ref, value, priority) {
  validateWritablePath('setWithPriority', ref._path);
  validateFirebaseDataArg('setWithPriority', value, ref._path, false);
  validatePriority('setWithPriority', priority, false);
  if (ref.key === '.length' || ref.key === '.keys') {
    throw 'setWithPriority failed: ' + ref.key + ' is a read-only object.';
  }
  var deferred = new _util.Deferred();
  repoSetWithPriority(ref._repo, ref._path, value, priority, deferred.wrapCallback(function () {}));
  return deferred.promise;
}
/**
 * Writes multiple values to the Database at once.
 *
 * The `values` argument contains multiple property-value pairs that will be
 * written to the Database together. Each child property can either be a simple
 * property (for example, "name") or a relative path (for example,
 * "name/first") from the current location to the data to update.
 *
 * As opposed to the `set()` method, `update()` can be use to selectively update
 * only the referenced properties at the current location (instead of replacing
 * all the child properties at the current location).
 *
 * The effect of the write will be visible immediately, and the corresponding
 * events ('value', 'child_added', etc.) will be triggered. Synchronization of
 * the data to the Firebase servers will also be started, and the returned
 * Promise will resolve when complete. If provided, the `onComplete` callback
 * will be called asynchronously after synchronization has finished.
 *
 * A single `update()` will generate a single "value" event at the location
 * where the `update()` was performed, regardless of how many children were
 * modified.
 *
 * Note that modifying data with `update()` will cancel any pending
 * transactions at that location, so extreme care should be taken if mixing
 * `update()` and `transaction()` to modify the same data.
 *
 * Passing `null` to `update()` will remove the data at this location.
 *
 * See
 * {@link https://firebase.googleblog.com/2015/09/introducing-multi-location-updates-and_86.html | Introducing multi-location updates and more}.
 *
 * @param ref - The location to write to.
 * @param values - Object containing multiple values.
 * @returns Resolves when update on server is complete.
 */
function update(ref, values) {
  validateFirebaseMergeDataArg('update', values, ref._path, false);
  var deferred = new _util.Deferred();
  repoUpdate(ref._repo, ref._path, values, deferred.wrapCallback(function () {}));
  return deferred.promise;
}
/**
 * Gets the most up-to-date result for this query.
 *
 * @param query - The query to run.
 * @returns A `Promise` which resolves to the resulting DataSnapshot if a value is
 * available, or rejects if the client is unable to return a value (e.g., if the
 * server is unreachable and there is nothing cached).
 */
function get(query) {
  query = (0, _util.getModularInstance)(query);
  var callbackContext = new CallbackContext(function () {});
  var container = new ValueEventRegistration(callbackContext);
  return repoGetValue(query._repo, query, container).then(function (node) {
    return new DataSnapshot(node, new ReferenceImpl(query._repo, query._path), query._queryParams.getIndex());
  });
}
/**
 * Represents registration for 'value' events.
 */
var ValueEventRegistration = /*#__PURE__*/function () {
  function ValueEventRegistration(callbackContext) {
    _classCallCheck(this, ValueEventRegistration);
    this.callbackContext = callbackContext;
  }
  return _createClass(ValueEventRegistration, [{
    key: "respondsTo",
    value: function respondsTo(eventType) {
      return eventType === 'value';
    }
  }, {
    key: "createEvent",
    value: function createEvent(change, query) {
      var index = query._queryParams.getIndex();
      return new DataEvent('value', this, new DataSnapshot(change.snapshotNode, new ReferenceImpl(query._repo, query._path), index));
    }
  }, {
    key: "getEventRunner",
    value: function getEventRunner(eventData) {
      var _this38 = this;
      if (eventData.getEventType() === 'cancel') {
        return function () {
          return _this38.callbackContext.onCancel(eventData.error);
        };
      } else {
        return function () {
          return _this38.callbackContext.onValue(eventData.snapshot, null);
        };
      }
    }
  }, {
    key: "createCancelEvent",
    value: function createCancelEvent(error, path) {
      if (this.callbackContext.hasCancelCallback) {
        return new CancelEvent(this, error, path);
      } else {
        return null;
      }
    }
  }, {
    key: "matches",
    value: function matches(other) {
      if (!(other instanceof ValueEventRegistration)) {
        return false;
      } else if (!other.callbackContext || !this.callbackContext) {
        // If no callback specified, we consider it to match any callback.
        return true;
      } else {
        return other.callbackContext.matches(this.callbackContext);
      }
    }
  }, {
    key: "hasAnyCallback",
    value: function hasAnyCallback() {
      return this.callbackContext !== null;
    }
  }]);
}();
/**
 * Represents the registration of a child_x event.
 */
var ChildEventRegistration = /*#__PURE__*/function () {
  function ChildEventRegistration(eventType, callbackContext) {
    _classCallCheck(this, ChildEventRegistration);
    this.eventType = eventType;
    this.callbackContext = callbackContext;
  }
  return _createClass(ChildEventRegistration, [{
    key: "respondsTo",
    value: function respondsTo(eventType) {
      var eventToCheck = eventType === 'children_added' ? 'child_added' : eventType;
      eventToCheck = eventToCheck === 'children_removed' ? 'child_removed' : eventToCheck;
      return this.eventType === eventToCheck;
    }
  }, {
    key: "createCancelEvent",
    value: function createCancelEvent(error, path) {
      if (this.callbackContext.hasCancelCallback) {
        return new CancelEvent(this, error, path);
      } else {
        return null;
      }
    }
  }, {
    key: "createEvent",
    value: function createEvent(change, query) {
      (0, _util.assert)(change.childName != null, 'Child events should have a childName.');
      var childRef = _child9(new ReferenceImpl(query._repo, query._path), change.childName);
      var index = query._queryParams.getIndex();
      return new DataEvent(change.type, this, new DataSnapshot(change.snapshotNode, childRef, index), change.prevName);
    }
  }, {
    key: "getEventRunner",
    value: function getEventRunner(eventData) {
      var _this39 = this;
      if (eventData.getEventType() === 'cancel') {
        return function () {
          return _this39.callbackContext.onCancel(eventData.error);
        };
      } else {
        return function () {
          return _this39.callbackContext.onValue(eventData.snapshot, eventData.prevName);
        };
      }
    }
  }, {
    key: "matches",
    value: function matches(other) {
      if (other instanceof ChildEventRegistration) {
        return this.eventType === other.eventType && (!this.callbackContext || !other.callbackContext || this.callbackContext.matches(other.callbackContext));
      }
      return false;
    }
  }, {
    key: "hasAnyCallback",
    value: function hasAnyCallback() {
      return !!this.callbackContext;
    }
  }]);
}();
function addEventListener(query, eventType, callback, cancelCallbackOrListenOptions, options) {
  var cancelCallback;
  if (_typeof(cancelCallbackOrListenOptions) === 'object') {
    cancelCallback = undefined;
    options = cancelCallbackOrListenOptions;
  }
  if (typeof cancelCallbackOrListenOptions === 'function') {
    cancelCallback = cancelCallbackOrListenOptions;
  }
  if (options && options.onlyOnce) {
    var userCallback = callback;
    var onceCallback = function onceCallback(dataSnapshot, previousChildName) {
      repoRemoveEventCallbackForQuery(query._repo, query, container);
      userCallback(dataSnapshot, previousChildName);
    };
    onceCallback.userCallback = callback.userCallback;
    onceCallback.context = callback.context;
    callback = onceCallback;
  }
  var callbackContext = new CallbackContext(callback, cancelCallback || undefined);
  var container = eventType === 'value' ? new ValueEventRegistration(callbackContext) : new ChildEventRegistration(eventType, callbackContext);
  repoAddEventCallbackForQuery(query._repo, query, container);
  return function () {
    return repoRemoveEventCallbackForQuery(query._repo, query, container);
  };
}
function onValue(query, callback, cancelCallbackOrListenOptions, options) {
  return addEventListener(query, 'value', callback, cancelCallbackOrListenOptions, options);
}
function onChildAdded(query, callback, cancelCallbackOrListenOptions, options) {
  return addEventListener(query, 'child_added', callback, cancelCallbackOrListenOptions, options);
}
function onChildChanged(query, callback, cancelCallbackOrListenOptions, options) {
  return addEventListener(query, 'child_changed', callback, cancelCallbackOrListenOptions, options);
}
function onChildMoved(query, callback, cancelCallbackOrListenOptions, options) {
  return addEventListener(query, 'child_moved', callback, cancelCallbackOrListenOptions, options);
}
function onChildRemoved(query, callback, cancelCallbackOrListenOptions, options) {
  return addEventListener(query, 'child_removed', callback, cancelCallbackOrListenOptions, options);
}
/**
 * Detaches a callback previously attached with the corresponding `on*()` (`onValue`, `onChildAdded`) listener.
 * Note: This is not the recommended way to remove a listener. Instead, please use the returned callback function from
 * the respective `on*` callbacks.
 *
 * Detach a callback previously attached with `on*()`. Calling `off()` on a parent listener
 * will not automatically remove listeners registered on child nodes, `off()`
 * must also be called on any child listeners to remove the callback.
 *
 * If a callback is not specified, all callbacks for the specified eventType
 * will be removed. Similarly, if no eventType is specified, all callbacks
 * for the `Reference` will be removed.
 *
 * Individual listeners can also be removed by invoking their unsubscribe
 * callbacks.
 *
 * @param query - The query that the listener was registered with.
 * @param eventType - One of the following strings: "value", "child_added",
 * "child_changed", "child_removed", or "child_moved." If omitted, all callbacks
 * for the `Reference` will be removed.
 * @param callback - The callback function that was passed to `on()` or
 * `undefined` to remove all callbacks.
 */
function off(query, eventType, callback) {
  var container = null;
  var expCallback = callback ? new CallbackContext(callback) : null;
  if (eventType === 'value') {
    container = new ValueEventRegistration(expCallback);
  } else if (eventType) {
    container = new ChildEventRegistration(eventType, expCallback);
  }
  repoRemoveEventCallbackForQuery(query._repo, query, container);
}
/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Database query. `QueryConstraint`s are created by invoking {@link endAt},
 * {@link endBefore}, {@link startAt}, {@link startAfter}, {@link
 * limitToFirst}, {@link limitToLast}, {@link orderByChild},
 * {@link orderByChild}, {@link orderByKey} , {@link orderByPriority} ,
 * {@link orderByValue}  or {@link equalTo} and
 * can then be passed to {@link query} to create a new query instance that
 * also contains this `QueryConstraint`.
 */
var QueryConstraint = exports.QueryConstraint = /*#__PURE__*/_createClass(function QueryConstraint() {
  _classCallCheck(this, QueryConstraint);
});
var QueryEndAtConstraint = /*#__PURE__*/function (_QueryConstraint) {
  function QueryEndAtConstraint(_value, _key) {
    var _this40;
    _classCallCheck(this, QueryEndAtConstraint);
    _this40 = _callSuper(this, QueryEndAtConstraint);
    _this40._value = _value;
    _this40._key = _key;
    _this40.type = 'endAt';
    return _this40;
  }
  _inherits(QueryEndAtConstraint, _QueryConstraint);
  return _createClass(QueryEndAtConstraint, [{
    key: "_apply",
    value: function _apply(query) {
      validateFirebaseDataArg('endAt', this._value, query._path, true);
      var newParams = queryParamsEndAt(query._queryParams, this._value, this._key);
      validateLimit(newParams);
      validateQueryEndpoints(newParams);
      if (query._queryParams.hasEnd()) {
        throw new Error('endAt: Starting point was already set (by another call to endAt, ' + 'endBefore or equalTo).');
      }
      return new QueryImpl(query._repo, query._path, newParams, query._orderByCalled);
    }
  }]);
}(QueryConstraint);
/**
 * Creates a `QueryConstraint` with the specified ending point.
 *
 * Using `startAt()`, `startAfter()`, `endBefore()`, `endAt()` and `equalTo()`
 * allows you to choose arbitrary starting and ending points for your queries.
 *
 * The ending point is inclusive, so children with exactly the specified value
 * will be included in the query. The optional key argument can be used to
 * further limit the range of the query. If it is specified, then children that
 * have exactly the specified value must also have a key name less than or equal
 * to the specified key.
 *
 * You can read more about `endAt()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#filtering_data | Filtering data}.
 *
 * @param value - The value to end at. The argument type depends on which
 * `orderBy*()` function was used in this query. Specify a value that matches
 * the `orderBy*()` type. When used in combination with `orderByKey()`, the
 * value must be a string.
 * @param key - The child key to end at, among the children with the previously
 * specified priority. This argument is only allowed if ordering by child,
 * value, or priority.
 */
function endAt(value, key) {
  validateKey('endAt', 'key', key, true);
  return new QueryEndAtConstraint(value, key);
}
var QueryEndBeforeConstraint = /*#__PURE__*/function (_QueryConstraint2) {
  function QueryEndBeforeConstraint(_value, _key) {
    var _this41;
    _classCallCheck(this, QueryEndBeforeConstraint);
    _this41 = _callSuper(this, QueryEndBeforeConstraint);
    _this41._value = _value;
    _this41._key = _key;
    _this41.type = 'endBefore';
    return _this41;
  }
  _inherits(QueryEndBeforeConstraint, _QueryConstraint2);
  return _createClass(QueryEndBeforeConstraint, [{
    key: "_apply",
    value: function _apply(query) {
      validateFirebaseDataArg('endBefore', this._value, query._path, false);
      var newParams = queryParamsEndBefore(query._queryParams, this._value, this._key);
      validateLimit(newParams);
      validateQueryEndpoints(newParams);
      if (query._queryParams.hasEnd()) {
        throw new Error('endBefore: Starting point was already set (by another call to endAt, ' + 'endBefore or equalTo).');
      }
      return new QueryImpl(query._repo, query._path, newParams, query._orderByCalled);
    }
  }]);
}(QueryConstraint);
/**
 * Creates a `QueryConstraint` with the specified ending point (exclusive).
 *
 * Using `startAt()`, `startAfter()`, `endBefore()`, `endAt()` and `equalTo()`
 * allows you to choose arbitrary starting and ending points for your queries.
 *
 * The ending point is exclusive. If only a value is provided, children
 * with a value less than the specified value will be included in the query.
 * If a key is specified, then children must have a value less than or equal
 * to the specified value and a key name less than the specified key.
 *
 * @param value - The value to end before. The argument type depends on which
 * `orderBy*()` function was used in this query. Specify a value that matches
 * the `orderBy*()` type. When used in combination with `orderByKey()`, the
 * value must be a string.
 * @param key - The child key to end before, among the children with the
 * previously specified priority. This argument is only allowed if ordering by
 * child, value, or priority.
 */
function endBefore(value, key) {
  validateKey('endBefore', 'key', key, true);
  return new QueryEndBeforeConstraint(value, key);
}
var QueryStartAtConstraint = /*#__PURE__*/function (_QueryConstraint3) {
  function QueryStartAtConstraint(_value, _key) {
    var _this42;
    _classCallCheck(this, QueryStartAtConstraint);
    _this42 = _callSuper(this, QueryStartAtConstraint);
    _this42._value = _value;
    _this42._key = _key;
    _this42.type = 'startAt';
    return _this42;
  }
  _inherits(QueryStartAtConstraint, _QueryConstraint3);
  return _createClass(QueryStartAtConstraint, [{
    key: "_apply",
    value: function _apply(query) {
      validateFirebaseDataArg('startAt', this._value, query._path, true);
      var newParams = queryParamsStartAt(query._queryParams, this._value, this._key);
      validateLimit(newParams);
      validateQueryEndpoints(newParams);
      if (query._queryParams.hasStart()) {
        throw new Error('startAt: Starting point was already set (by another call to startAt, ' + 'startBefore or equalTo).');
      }
      return new QueryImpl(query._repo, query._path, newParams, query._orderByCalled);
    }
  }]);
}(QueryConstraint);
/**
 * Creates a `QueryConstraint` with the specified starting point.
 *
 * Using `startAt()`, `startAfter()`, `endBefore()`, `endAt()` and `equalTo()`
 * allows you to choose arbitrary starting and ending points for your queries.
 *
 * The starting point is inclusive, so children with exactly the specified value
 * will be included in the query. The optional key argument can be used to
 * further limit the range of the query. If it is specified, then children that
 * have exactly the specified value must also have a key name greater than or
 * equal to the specified key.
 *
 * You can read more about `startAt()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#filtering_data | Filtering data}.
 *
 * @param value - The value to start at. The argument type depends on which
 * `orderBy*()` function was used in this query. Specify a value that matches
 * the `orderBy*()` type. When used in combination with `orderByKey()`, the
 * value must be a string.
 * @param key - The child key to start at. This argument is only allowed if
 * ordering by child, value, or priority.
 */
function startAt() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var key = arguments.length > 1 ? arguments[1] : undefined;
  validateKey('startAt', 'key', key, true);
  return new QueryStartAtConstraint(value, key);
}
var QueryStartAfterConstraint = /*#__PURE__*/function (_QueryConstraint4) {
  function QueryStartAfterConstraint(_value, _key) {
    var _this43;
    _classCallCheck(this, QueryStartAfterConstraint);
    _this43 = _callSuper(this, QueryStartAfterConstraint);
    _this43._value = _value;
    _this43._key = _key;
    _this43.type = 'startAfter';
    return _this43;
  }
  _inherits(QueryStartAfterConstraint, _QueryConstraint4);
  return _createClass(QueryStartAfterConstraint, [{
    key: "_apply",
    value: function _apply(query) {
      validateFirebaseDataArg('startAfter', this._value, query._path, false);
      var newParams = queryParamsStartAfter(query._queryParams, this._value, this._key);
      validateLimit(newParams);
      validateQueryEndpoints(newParams);
      if (query._queryParams.hasStart()) {
        throw new Error('startAfter: Starting point was already set (by another call to startAt, ' + 'startAfter, or equalTo).');
      }
      return new QueryImpl(query._repo, query._path, newParams, query._orderByCalled);
    }
  }]);
}(QueryConstraint);
/**
 * Creates a `QueryConstraint` with the specified starting point (exclusive).
 *
 * Using `startAt()`, `startAfter()`, `endBefore()`, `endAt()` and `equalTo()`
 * allows you to choose arbitrary starting and ending points for your queries.
 *
 * The starting point is exclusive. If only a value is provided, children
 * with a value greater than the specified value will be included in the query.
 * If a key is specified, then children must have a value greater than or equal
 * to the specified value and a a key name greater than the specified key.
 *
 * @param value - The value to start after. The argument type depends on which
 * `orderBy*()` function was used in this query. Specify a value that matches
 * the `orderBy*()` type. When used in combination with `orderByKey()`, the
 * value must be a string.
 * @param key - The child key to start after. This argument is only allowed if
 * ordering by child, value, or priority.
 */
function startAfter(value, key) {
  validateKey('startAfter', 'key', key, true);
  return new QueryStartAfterConstraint(value, key);
}
var QueryLimitToFirstConstraint = /*#__PURE__*/function (_QueryConstraint5) {
  function QueryLimitToFirstConstraint(_limit) {
    var _this44;
    _classCallCheck(this, QueryLimitToFirstConstraint);
    _this44 = _callSuper(this, QueryLimitToFirstConstraint);
    _this44._limit = _limit;
    _this44.type = 'limitToFirst';
    return _this44;
  }
  _inherits(QueryLimitToFirstConstraint, _QueryConstraint5);
  return _createClass(QueryLimitToFirstConstraint, [{
    key: "_apply",
    value: function _apply(query) {
      if (query._queryParams.hasLimit()) {
        throw new Error('limitToFirst: Limit was already set (by another call to limitToFirst ' + 'or limitToLast).');
      }
      return new QueryImpl(query._repo, query._path, queryParamsLimitToFirst(query._queryParams, this._limit), query._orderByCalled);
    }
  }]);
}(QueryConstraint);
/**
 * Creates a new `QueryConstraint` that if limited to the first specific number
 * of children.
 *
 * The `limitToFirst()` method is used to set a maximum number of children to be
 * synced for a given callback. If we set a limit of 100, we will initially only
 * receive up to 100 `child_added` events. If we have fewer than 100 messages
 * stored in our Database, a `child_added` event will fire for each message.
 * However, if we have over 100 messages, we will only receive a `child_added`
 * event for the first 100 ordered messages. As items change, we will receive
 * `child_removed` events for each item that drops out of the active list so
 * that the total number stays at 100.
 *
 * You can read more about `limitToFirst()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#filtering_data | Filtering data}.
 *
 * @param limit - The maximum number of nodes to include in this query.
 */
function limitToFirst(limit) {
  if (typeof limit !== 'number' || Math.floor(limit) !== limit || limit <= 0) {
    throw new Error('limitToFirst: First argument must be a positive integer.');
  }
  return new QueryLimitToFirstConstraint(limit);
}
var QueryLimitToLastConstraint = /*#__PURE__*/function (_QueryConstraint6) {
  function QueryLimitToLastConstraint(_limit) {
    var _this45;
    _classCallCheck(this, QueryLimitToLastConstraint);
    _this45 = _callSuper(this, QueryLimitToLastConstraint);
    _this45._limit = _limit;
    _this45.type = 'limitToLast';
    return _this45;
  }
  _inherits(QueryLimitToLastConstraint, _QueryConstraint6);
  return _createClass(QueryLimitToLastConstraint, [{
    key: "_apply",
    value: function _apply(query) {
      if (query._queryParams.hasLimit()) {
        throw new Error('limitToLast: Limit was already set (by another call to limitToFirst ' + 'or limitToLast).');
      }
      return new QueryImpl(query._repo, query._path, queryParamsLimitToLast(query._queryParams, this._limit), query._orderByCalled);
    }
  }]);
}(QueryConstraint);
/**
 * Creates a new `QueryConstraint` that is limited to return only the last
 * specified number of children.
 *
 * The `limitToLast()` method is used to set a maximum number of children to be
 * synced for a given callback. If we set a limit of 100, we will initially only
 * receive up to 100 `child_added` events. If we have fewer than 100 messages
 * stored in our Database, a `child_added` event will fire for each message.
 * However, if we have over 100 messages, we will only receive a `child_added`
 * event for the last 100 ordered messages. As items change, we will receive
 * `child_removed` events for each item that drops out of the active list so
 * that the total number stays at 100.
 *
 * You can read more about `limitToLast()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#filtering_data | Filtering data}.
 *
 * @param limit - The maximum number of nodes to include in this query.
 */
function limitToLast(limit) {
  if (typeof limit !== 'number' || Math.floor(limit) !== limit || limit <= 0) {
    throw new Error('limitToLast: First argument must be a positive integer.');
  }
  return new QueryLimitToLastConstraint(limit);
}
var QueryOrderByChildConstraint = /*#__PURE__*/function (_QueryConstraint7) {
  function QueryOrderByChildConstraint(_path) {
    var _this46;
    _classCallCheck(this, QueryOrderByChildConstraint);
    _this46 = _callSuper(this, QueryOrderByChildConstraint);
    _this46._path = _path;
    _this46.type = 'orderByChild';
    return _this46;
  }
  _inherits(QueryOrderByChildConstraint, _QueryConstraint7);
  return _createClass(QueryOrderByChildConstraint, [{
    key: "_apply",
    value: function _apply(query) {
      validateNoPreviousOrderByCall(query, 'orderByChild');
      var parsedPath = new Path(this._path);
      if (pathIsEmpty(parsedPath)) {
        throw new Error('orderByChild: cannot pass in empty path. Use orderByValue() instead.');
      }
      var index = new PathIndex(parsedPath);
      var newParams = queryParamsOrderBy(query._queryParams, index);
      validateQueryEndpoints(newParams);
      return new QueryImpl(query._repo, query._path, newParams, /*orderByCalled=*/true);
    }
  }]);
}(QueryConstraint);
/**
 * Creates a new `QueryConstraint` that orders by the specified child key.
 *
 * Queries can only order by one key at a time. Calling `orderByChild()`
 * multiple times on the same query is an error.
 *
 * Firebase queries allow you to order your data by any child key on the fly.
 * However, if you know in advance what your indexes will be, you can define
 * them via the .indexOn rule in your Security Rules for better performance. See
 * the{@link https://firebase.google.com/docs/database/security/indexing-data}
 * rule for more information.
 *
 * You can read more about `orderByChild()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sort_data | Sort data}.
 *
 * @param path - The path to order by.
 */
function orderByChild(path) {
  if (path === '$key') {
    throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');
  } else if (path === '$priority') {
    throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');
  } else if (path === '$value') {
    throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');
  }
  validatePathString('orderByChild', 'path', path, false);
  return new QueryOrderByChildConstraint(path);
}
var QueryOrderByKeyConstraint = /*#__PURE__*/function (_QueryConstraint8) {
  function QueryOrderByKeyConstraint() {
    var _this47;
    _classCallCheck(this, QueryOrderByKeyConstraint);
    _this47 = _callSuper(this, QueryOrderByKeyConstraint, arguments);
    _this47.type = 'orderByKey';
    return _this47;
  }
  _inherits(QueryOrderByKeyConstraint, _QueryConstraint8);
  return _createClass(QueryOrderByKeyConstraint, [{
    key: "_apply",
    value: function _apply(query) {
      validateNoPreviousOrderByCall(query, 'orderByKey');
      var newParams = queryParamsOrderBy(query._queryParams, KEY_INDEX);
      validateQueryEndpoints(newParams);
      return new QueryImpl(query._repo, query._path, newParams, /*orderByCalled=*/true);
    }
  }]);
}(QueryConstraint);
/**
 * Creates a new `QueryConstraint` that orders by the key.
 *
 * Sorts the results of a query by their (ascending) key values.
 *
 * You can read more about `orderByKey()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sort_data | Sort data}.
 */
function orderByKey() {
  return new QueryOrderByKeyConstraint();
}
var QueryOrderByPriorityConstraint = /*#__PURE__*/function (_QueryConstraint9) {
  function QueryOrderByPriorityConstraint() {
    var _this48;
    _classCallCheck(this, QueryOrderByPriorityConstraint);
    _this48 = _callSuper(this, QueryOrderByPriorityConstraint, arguments);
    _this48.type = 'orderByPriority';
    return _this48;
  }
  _inherits(QueryOrderByPriorityConstraint, _QueryConstraint9);
  return _createClass(QueryOrderByPriorityConstraint, [{
    key: "_apply",
    value: function _apply(query) {
      validateNoPreviousOrderByCall(query, 'orderByPriority');
      var newParams = queryParamsOrderBy(query._queryParams, PRIORITY_INDEX);
      validateQueryEndpoints(newParams);
      return new QueryImpl(query._repo, query._path, newParams, /*orderByCalled=*/true);
    }
  }]);
}(QueryConstraint);
/**
 * Creates a new `QueryConstraint` that orders by priority.
 *
 * Applications need not use priority but can order collections by
 * ordinary properties (see
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sort_data | Sort data}
 * for alternatives to priority.
 */
function orderByPriority() {
  return new QueryOrderByPriorityConstraint();
}
var QueryOrderByValueConstraint = /*#__PURE__*/function (_QueryConstraint10) {
  function QueryOrderByValueConstraint() {
    var _this49;
    _classCallCheck(this, QueryOrderByValueConstraint);
    _this49 = _callSuper(this, QueryOrderByValueConstraint, arguments);
    _this49.type = 'orderByValue';
    return _this49;
  }
  _inherits(QueryOrderByValueConstraint, _QueryConstraint10);
  return _createClass(QueryOrderByValueConstraint, [{
    key: "_apply",
    value: function _apply(query) {
      validateNoPreviousOrderByCall(query, 'orderByValue');
      var newParams = queryParamsOrderBy(query._queryParams, VALUE_INDEX);
      validateQueryEndpoints(newParams);
      return new QueryImpl(query._repo, query._path, newParams, /*orderByCalled=*/true);
    }
  }]);
}(QueryConstraint);
/**
 * Creates a new `QueryConstraint` that orders by value.
 *
 * If the children of a query are all scalar values (string, number, or
 * boolean), you can order the results by their (ascending) values.
 *
 * You can read more about `orderByValue()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sort_data | Sort data}.
 */
function orderByValue() {
  return new QueryOrderByValueConstraint();
}
var QueryEqualToValueConstraint = /*#__PURE__*/function (_QueryConstraint11) {
  function QueryEqualToValueConstraint(_value, _key) {
    var _this50;
    _classCallCheck(this, QueryEqualToValueConstraint);
    _this50 = _callSuper(this, QueryEqualToValueConstraint);
    _this50._value = _value;
    _this50._key = _key;
    _this50.type = 'equalTo';
    return _this50;
  }
  _inherits(QueryEqualToValueConstraint, _QueryConstraint11);
  return _createClass(QueryEqualToValueConstraint, [{
    key: "_apply",
    value: function _apply(query) {
      validateFirebaseDataArg('equalTo', this._value, query._path, false);
      if (query._queryParams.hasStart()) {
        throw new Error('equalTo: Starting point was already set (by another call to startAt/startAfter or ' + 'equalTo).');
      }
      if (query._queryParams.hasEnd()) {
        throw new Error('equalTo: Ending point was already set (by another call to endAt/endBefore or ' + 'equalTo).');
      }
      return new QueryEndAtConstraint(this._value, this._key)._apply(new QueryStartAtConstraint(this._value, this._key)._apply(query));
    }
  }]);
}(QueryConstraint);
/**
 * Creates a `QueryConstraint` that includes children that match the specified
 * value.
 *
 * Using `startAt()`, `startAfter()`, `endBefore()`, `endAt()` and `equalTo()`
 * allows you to choose arbitrary starting and ending points for your queries.
 *
 * The optional key argument can be used to further limit the range of the
 * query. If it is specified, then children that have exactly the specified
 * value must also have exactly the specified key as their key name. This can be
 * used to filter result sets with many matches for the same value.
 *
 * You can read more about `equalTo()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#filtering_data | Filtering data}.
 *
 * @param value - The value to match for. The argument type depends on which
 * `orderBy*()` function was used in this query. Specify a value that matches
 * the `orderBy*()` type. When used in combination with `orderByKey()`, the
 * value must be a string.
 * @param key - The child key to start at, among the children with the
 * previously specified priority. This argument is only allowed if ordering by
 * child, value, or priority.
 */
function equalTo(value, key) {
  validateKey('equalTo', 'key', key, true);
  return new QueryEqualToValueConstraint(value, key);
}
/**
 * Creates a new immutable instance of `Query` that is extended to also include
 * additional query constraints.
 *
 * @param query - The Query instance to use as a base for the new constraints.
 * @param queryConstraints - The list of `QueryConstraint`s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */
function query(query) {
  var queryImpl = (0, _util.getModularInstance)(query);
  for (var _len7 = arguments.length, queryConstraints = new Array(_len7 > 1 ? _len7 - 1 : 0), _key8 = 1; _key8 < _len7; _key8++) {
    queryConstraints[_key8 - 1] = arguments[_key8];
  }
  for (var _i10 = 0, _queryConstraints = queryConstraints; _i10 < _queryConstraints.length; _i10++) {
    var constraint = _queryConstraints[_i10];
    queryImpl = constraint._apply(queryImpl);
  }
  return queryImpl;
}
/**
 * Define reference constructor in various modules
 *
 * We are doing this here to avoid several circular
 * dependency issues
 */
syncPointSetReferenceConstructor(ReferenceImpl);
syncTreeSetReferenceConstructor(ReferenceImpl);

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * This variable is also defined in the firebase Node.js Admin SDK. Before
 * modifying this definition, consult the definition in:
 *
 * https://github.com/firebase/firebase-admin-node
 *
 * and make sure the two are consistent.
 */
var FIREBASE_DATABASE_EMULATOR_HOST_VAR = 'FIREBASE_DATABASE_EMULATOR_HOST';
/**
 * Creates and caches `Repo` instances.
 */
var repos = {};
/**
 * If true, any new `Repo` will be created to use `ReadonlyRestClient` (for testing purposes).
 */
var useRestClient = false;
/**
 * Update an existing `Repo` in place to point to a new host/port.
 */
function repoManagerApplyEmulatorSettings(repo, host, port, tokenProvider) {
  repo.repoInfo_ = new RepoInfo("".concat(host, ":").concat(port), /* secure= */false, repo.repoInfo_.namespace, repo.repoInfo_.webSocketOnly, repo.repoInfo_.nodeAdmin, repo.repoInfo_.persistenceKey, repo.repoInfo_.includeNamespaceInQueryParams, /*isUsingEmulator=*/true);
  if (tokenProvider) {
    repo.authTokenProvider_ = tokenProvider;
  }
}
/**
 * This function should only ever be called to CREATE a new database instance.
 * @internal
 */
function repoManagerDatabaseFromApp(app, authProvider, appCheckProvider, url, nodeAdmin) {
  var dbUrl = url || app.options.databaseURL;
  if (dbUrl === undefined) {
    if (!app.options.projectId) {
      fatal("Can't determine Firebase Database URL. Be sure to include " + ' a Project ID when calling firebase.initializeApp().');
    }
    log('Using default host for project ', app.options.projectId);
    dbUrl = "".concat(app.options.projectId, "-default-rtdb.firebaseio.com");
  }
  var parsedUrl = parseRepoInfo(dbUrl, nodeAdmin);
  var repoInfo = parsedUrl.repoInfo;
  var isEmulator;
  var dbEmulatorHost = undefined;
  if (typeof process !== 'undefined' && process.env) {
    dbEmulatorHost = process.env[FIREBASE_DATABASE_EMULATOR_HOST_VAR];
  }
  if (dbEmulatorHost) {
    isEmulator = true;
    dbUrl = "http://".concat(dbEmulatorHost, "?ns=").concat(repoInfo.namespace);
    parsedUrl = parseRepoInfo(dbUrl, nodeAdmin);
    repoInfo = parsedUrl.repoInfo;
  } else {
    isEmulator = !parsedUrl.repoInfo.secure;
  }
  var authTokenProvider = nodeAdmin && isEmulator ? new EmulatorTokenProvider(EmulatorTokenProvider.OWNER) : new FirebaseAuthTokenProvider(app.name, app.options, authProvider);
  validateUrl('Invalid Firebase Database URL', parsedUrl);
  if (!pathIsEmpty(parsedUrl.path)) {
    fatal('Database URL must point to the root of a Firebase Database ' + '(not including a child path).');
  }
  var repo = repoManagerCreateRepo(repoInfo, app, authTokenProvider, new AppCheckTokenProvider(app.name, appCheckProvider));
  return new Database(repo, app);
}
/**
 * Remove the repo and make sure it is disconnected.
 *
 */
function repoManagerDeleteRepo(repo, appName) {
  var appRepos = repos[appName];
  // This should never happen...
  if (!appRepos || appRepos[repo.key] !== repo) {
    fatal("Database ".concat(appName, "(").concat(repo.repoInfo_, ") has already been deleted."));
  }
  repoInterrupt(repo);
  delete appRepos[repo.key];
}
/**
 * Ensures a repo doesn't already exist and then creates one using the
 * provided app.
 *
 * @param repoInfo - The metadata about the Repo
 * @returns The Repo object for the specified server / repoName.
 */
function repoManagerCreateRepo(repoInfo, app, authTokenProvider, appCheckProvider) {
  var appRepos = repos[app.name];
  if (!appRepos) {
    appRepos = {};
    repos[app.name] = appRepos;
  }
  var repo = appRepos[repoInfo.toURLString()];
  if (repo) {
    fatal('Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.');
  }
  repo = new Repo(repoInfo, useRestClient, authTokenProvider, appCheckProvider);
  appRepos[repoInfo.toURLString()] = repo;
  return repo;
}
/**
 * Forces us to use ReadonlyRestClient instead of PersistentConnection for new Repos.
 */
function repoManagerForceRestClient(forceRestClient) {
  useRestClient = forceRestClient;
}
/**
 * Class representing a Firebase Realtime Database.
 */
var Database = exports.Database = /*#__PURE__*/function () {
  /** @hideconstructor */
  function Database(_repoInternal, /** The {@link @firebase/app#FirebaseApp} associated with this Realtime Database instance. */
  app) {
    _classCallCheck(this, Database);
    this._repoInternal = _repoInternal;
    this.app = app;
    /** Represents a `Database` instance. */
    this['type'] = 'database';
    /** Track if the instance has been used (root or repo accessed) */
    this._instanceStarted = false;
  }
  return _createClass(Database, [{
    key: "_repo",
    get: function get() {
      if (!this._instanceStarted) {
        repoStart(this._repoInternal, this.app.options.appId, this.app.options['databaseAuthVariableOverride']);
        this._instanceStarted = true;
      }
      return this._repoInternal;
    }
  }, {
    key: "_root",
    get: function get() {
      if (!this._rootInternal) {
        this._rootInternal = new ReferenceImpl(this._repo, newEmptyPath());
      }
      return this._rootInternal;
    }
  }, {
    key: "_delete",
    value: function _delete() {
      if (this._rootInternal !== null) {
        repoManagerDeleteRepo(this._repo, this.app.name);
        this._repoInternal = null;
        this._rootInternal = null;
      }
      return Promise.resolve();
    }
  }, {
    key: "_checkNotDeleted",
    value: function _checkNotDeleted(apiName) {
      if (this._rootInternal === null) {
        fatal('Cannot call ' + apiName + ' on a deleted database.');
      }
    }
  }]);
}();
function checkTransportInit() {
  if (TransportManager.IS_TRANSPORT_INITIALIZED) {
    warn('Transport has already been initialized. Please call this function before calling ref or setting up a listener');
  }
}
/**
 * Force the use of websockets instead of longPolling.
 */
function forceWebSockets() {
  checkTransportInit();
  BrowserPollConnection.forceDisallow();
}
/**
 * Force the use of longPolling instead of websockets. This will be ignored if websocket protocol is used in databaseURL.
 */
function forceLongPolling() {
  checkTransportInit();
  WebSocketConnection.forceDisallow();
  BrowserPollConnection.forceAllow();
}
/**
 * Returns the instance of the Realtime Database SDK that is associated with the provided
 * {@link @firebase/app#FirebaseApp}. Initializes a new instance with default settings if
 * no instance exists or if the existing instance uses a custom database URL.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} instance that the returned Realtime
 * Database instance is associated with.
 * @param url - The URL of the Realtime Database instance to connect to. If not
 * provided, the SDK connects to the default instance of the Firebase App.
 * @returns The `Database` instance of the provided app.
 */
function getDatabase() {
  var app = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _app.getApp)();
  var url = arguments.length > 1 ? arguments[1] : undefined;
  var db = (0, _app._getProvider)(app, 'database').getImmediate({
    identifier: url
  });
  if (!db._instanceStarted) {
    var emulator = (0, _util.getDefaultEmulatorHostnameAndPort)('database');
    if (emulator) {
      connectDatabaseEmulator.apply(void 0, [db].concat(_toConsumableArray(emulator)));
    }
  }
  return db;
}
/**
 * Modify the provided instance to communicate with the Realtime Database
 * emulator.
 *
 * <p>Note: This method must be called before performing any other operation.
 *
 * @param db - The instance to modify.
 * @param host - The emulator host (ex: localhost)
 * @param port - The emulator port (ex: 8080)
 * @param options.mockUserToken - the mock auth token to use for unit testing Security Rules
 */
function connectDatabaseEmulator(db, host, port) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  db = (0, _util.getModularInstance)(db);
  db._checkNotDeleted('useEmulator');
  if (db._instanceStarted) {
    fatal('Cannot call useEmulator() after instance has already been initialized.');
  }
  var repo = db._repoInternal;
  var tokenProvider = undefined;
  if (repo.repoInfo_.nodeAdmin) {
    if (options.mockUserToken) {
      fatal('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".');
    }
    tokenProvider = new EmulatorTokenProvider(EmulatorTokenProvider.OWNER);
  } else if (options.mockUserToken) {
    var token = typeof options.mockUserToken === 'string' ? options.mockUserToken : (0, _util.createMockUserToken)(options.mockUserToken, db.app.options.projectId);
    tokenProvider = new EmulatorTokenProvider(token);
  }
  // Modify the repo to apply emulator settings
  repoManagerApplyEmulatorSettings(repo, host, port, tokenProvider);
}
/**
 * Disconnects from the server (all Database operations will be completed
 * offline).
 *
 * The client automatically maintains a persistent connection to the Database
 * server, which will remain active indefinitely and reconnect when
 * disconnected. However, the `goOffline()` and `goOnline()` methods may be used
 * to control the client connection in cases where a persistent connection is
 * undesirable.
 *
 * While offline, the client will no longer receive data updates from the
 * Database. However, all Database operations performed locally will continue to
 * immediately fire events, allowing your application to continue behaving
 * normally. Additionally, each operation performed locally will automatically
 * be queued and retried upon reconnection to the Database server.
 *
 * To reconnect to the Database and begin receiving remote events, see
 * `goOnline()`.
 *
 * @param db - The instance to disconnect.
 */
function goOffline(db) {
  db = (0, _util.getModularInstance)(db);
  db._checkNotDeleted('goOffline');
  repoInterrupt(db._repo);
}
/**
 * Reconnects to the server and synchronizes the offline Database state
 * with the server state.
 *
 * This method should be used after disabling the active connection with
 * `goOffline()`. Once reconnected, the client will transmit the proper data
 * and fire the appropriate events so that your client "catches up"
 * automatically.
 *
 * @param db - The instance to reconnect.
 */
function goOnline(db) {
  db = (0, _util.getModularInstance)(db);
  db._checkNotDeleted('goOnline');
  repoResume(db._repo);
}
function enableLogging(logger, persistent) {
  enableLogging$1(logger, persistent);
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerDatabase(variant) {
  setSDKVersion(_app.SDK_VERSION);
  (0, _app._registerComponent)(new _component.Component('database', function (container, _ref3) {
    var url = _ref3.instanceIdentifier;
    var app = container.getProvider('app').getImmediate();
    var authProvider = container.getProvider('auth-internal');
    var appCheckProvider = container.getProvider('app-check-internal');
    return repoManagerDatabaseFromApp(app, authProvider, appCheckProvider, url);
  }, "PUBLIC" /* ComponentType.PUBLIC */).setMultipleInstances(true));
  (0, _app.registerVersion)(name, version, variant);
  // BUILD_TARGET will be replaced by values like esm2017, cjs2017, etc during the compilation
  (0, _app.registerVersion)(name, version, 'esm2017');
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var SERVER_TIMESTAMP = {
  '.sv': 'timestamp'
};
/**
 * Returns a placeholder value for auto-populating the current timestamp (time
 * since the Unix epoch, in milliseconds) as determined by the Firebase
 * servers.
 */
function serverTimestamp() {
  return SERVER_TIMESTAMP;
}
/**
 * Returns a placeholder value that can be used to atomically increment the
 * current database value by the provided delta.
 *
 * @param delta - the amount to modify the current value atomically.
 * @returns A placeholder value for modifying data atomically server-side.
 */
function increment(delta) {
  return {
    '.sv': {
      'increment': delta
    }
  };
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A type for the resolve value of {@link runTransaction}.
 */
var TransactionResult = exports.TransactionResult = /*#__PURE__*/function () {
  /** @hideconstructor */
  function TransactionResult(/** Whether the transaction was successfully committed. */
  committed, /** The resulting data snapshot. */
  snapshot) {
    _classCallCheck(this, TransactionResult);
    this.committed = committed;
    this.snapshot = snapshot;
  }
  /** Returns a JSON-serializable representation of this object. */
  return _createClass(TransactionResult, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        committed: this.committed,
        snapshot: this.snapshot.toJSON()
      };
    }
  }]);
}();
/**
 * Atomically modifies the data at this location.
 *
 * Atomically modify the data at this location. Unlike a normal `set()`, which
 * just overwrites the data regardless of its previous value, `runTransaction()` is
 * used to modify the existing value to a new value, ensuring there are no
 * conflicts with other clients writing to the same location at the same time.
 *
 * To accomplish this, you pass `runTransaction()` an update function which is
 * used to transform the current value into a new value. If another client
 * writes to the location before your new value is successfully written, your
 * update function will be called again with the new current value, and the
 * write will be retried. This will happen repeatedly until your write succeeds
 * without conflict or you abort the transaction by not returning a value from
 * your update function.
 *
 * Note: Modifying data with `set()` will cancel any pending transactions at
 * that location, so extreme care should be taken if mixing `set()` and
 * `runTransaction()` to update the same data.
 *
 * Note: When using transactions with Security and Firebase Rules in place, be
 * aware that a client needs `.read` access in addition to `.write` access in
 * order to perform a transaction. This is because the client-side nature of
 * transactions requires the client to read the data in order to transactionally
 * update it.
 *
 * @param ref - The location to atomically modify.
 * @param transactionUpdate - A developer-supplied function which will be passed
 * the current data stored at this location (as a JavaScript object). The
 * function should return the new value it would like written (as a JavaScript
 * object). If `undefined` is returned (i.e. you return with no arguments) the
 * transaction will be aborted and the data at this location will not be
 * modified.
 * @param options - An options object to configure transactions.
 * @returns A `Promise` that can optionally be used instead of the `onComplete`
 * callback to handle success and failure.
 */
function runTransaction(ref,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
transactionUpdate, options) {
  var _a;
  ref = (0, _util.getModularInstance)(ref);
  validateWritablePath('Reference.transaction', ref._path);
  if (ref.key === '.length' || ref.key === '.keys') {
    throw 'Reference.transaction failed: ' + ref.key + ' is a read-only object.';
  }
  var applyLocally = (_a = options === null || options === void 0 ? void 0 : options.applyLocally) !== null && _a !== void 0 ? _a : true;
  var deferred = new _util.Deferred();
  var promiseComplete = function promiseComplete(error, committed, node) {
    var dataSnapshot = null;
    if (error) {
      deferred.reject(error);
    } else {
      dataSnapshot = new DataSnapshot(node, new ReferenceImpl(ref._repo, ref._path), PRIORITY_INDEX);
      deferred.resolve(new TransactionResult(committed, dataSnapshot));
    }
  };
  // Add a watch to make sure we get server updates.
  var unwatcher = onValue(ref, function () {});
  repoStartTransaction(ref._repo, ref._path, transactionUpdate, promiseComplete, unwatcher, applyLocally);
  return deferred.promise;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
PersistentConnection;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
PersistentConnection.prototype.simpleListen = function (pathString, onComplete) {
  this.sendRequest('q', {
    p: pathString
  }, onComplete);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
PersistentConnection.prototype.echo = function (data, onEcho) {
  this.sendRequest('echo', {
    d: data
  }, onEcho);
};
// RealTimeConnection properties that we use in tests.
Connection;
/**
 * @internal
 */
var hijackHash = exports._TEST_ACCESS_hijackHash = function hijackHash(newHash) {
  var oldPut = PersistentConnection.prototype.put;
  PersistentConnection.prototype.put = function (pathString, data, onComplete, hash) {
    if (hash !== undefined) {
      hash = newHash();
    }
    oldPut.call(this, pathString, data, onComplete, hash);
  };
  return function () {
    PersistentConnection.prototype.put = oldPut;
  };
};
RepoInfo;
/**
 * Forces the RepoManager to create Repos that use ReadonlyRestClient instead of PersistentConnection.
 * @internal
 */
var forceRestClient = exports._TEST_ACCESS_forceRestClient = function forceRestClient(_forceRestClient) {
  repoManagerForceRestClient(_forceRestClient);
};

/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Used by console to create a database based on the app,
 * passed database URL and a custom auth implementation.
 * @internal
 * @param app - A valid FirebaseApp-like object
 * @param url - A valid Firebase databaseURL
 * @param version - custom version e.g. firebase-admin version
 * @param customAppCheckImpl - custom app check implementation
 * @param customAuthImpl - custom auth implementation
 */
function _initStandalone(_ref4) {
  var app = _ref4.app,
    url = _ref4.url,
    version = _ref4.version,
    customAuthImpl = _ref4.customAuthImpl,
    customAppCheckImpl = _ref4.customAppCheckImpl,
    _ref4$nodeAdmin = _ref4.nodeAdmin,
    nodeAdmin = _ref4$nodeAdmin === void 0 ? false : _ref4$nodeAdmin;
  setSDKVersion(version);
  /**
   * ComponentContainer('database-standalone') is just a placeholder that doesn't perform
   * any actual function.
   */
  var componentContainer = new _component.ComponentContainer('database-standalone');
  var authProvider = new _component.Provider('auth-internal', componentContainer);
  var appCheckProvider;
  if (customAppCheckImpl) {
    appCheckProvider = new _component.Provider('app-check-internal', componentContainer);
    appCheckProvider.setComponent(new _component.Component('app-check-internal', function () {
      return customAppCheckImpl;
    }, "PRIVATE" /* ComponentType.PRIVATE */));
  }
  authProvider.setComponent(new _component.Component('auth-internal', function () {
    return customAuthImpl;
  }, "PRIVATE" /* ComponentType.PRIVATE */));
  return repoManagerDatabaseFromApp(app, authProvider, appCheckProvider, url, nodeAdmin);
}

/**
 * Firebase Realtime Database
 *
 * @packageDocumentation
 */
registerDatabase();
},{"@firebase/app":"../node_modules/@firebase/app/dist/esm/index.esm2017.js","@firebase/component":"../node_modules/@firebase/component/dist/esm/index.esm2017.js","@firebase/util":"../node_modules/@firebase/util/dist/index.esm2017.js","@firebase/logger":"../node_modules/@firebase/logger/dist/esm/index.esm2017.js","process":"../../../../../AppData/Roaming/nvm/v22.9.0/node_modules/parcel-bundler/node_modules/process/browser.js"}],"../node_modules/firebase/database/dist/esm/index.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _database = require("@firebase/database");
Object.keys(_database).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _database[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _database[key];
    }
  });
});
},{"@firebase/database":"../node_modules/@firebase/database/dist/index.esm2017.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _app = require("firebase/app");
var _database = require("firebase/database");
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC_4POpukuO7q2s866B_BAIkDXQH4MMMt0",
  authDomain: "bops-stats.firebaseapp.com",
  databaseURL: "https://bops-stats-default-rtdb.firebaseio.com",
  projectId: "bops-stats",
  storageBucket: "bops-stats.firebasestorage.app",
  messagingSenderId: "644014516522",
  appId: "1:644014516522:web:98144f508a3612e9029653"
};

// Initialize Firebase
var app = (0, _app.initializeApp)(firebaseConfig);
var database = (0, _database.getDatabase)(app);
var rootRef = (0, _database.ref)(database, "/");

// Example array of data
// const dataArray = ["item1", "item2", "item3"];

// Reference to the database location where you want to push the data
// const dataRef = ref(database, '/app.js');

// Set the data at the specified reference

/////////////////////////////////////////////////////////////
// ELEMENTS //////////////////////////////////////////////// 
var introEl = document.querySelector('.intro');
var firstEl = document.querySelector('.first');
var secondEl = document.querySelector('.second');
var killsLeftEl = document.querySelector('.killsLeft');
var inputRowEl = document.querySelector('.inputRow');
var gameArchiveEl = document.querySelector('.gameArchive');
var achievedSetEl = document.querySelector('.achievedSet');
var setTotalsEl = document.querySelector('.totals');
var inGameTotalsEl = document.querySelector('.inGameTotals');
var currKillTotal = document.querySelector('.currKillTotal');
var currdeathTotal = document.querySelector('.currDeathTotal');
var currRatioTotal = document.querySelector('.currRatioTotal');
//////////////////////////////////////////////////////////// 
// BUTTONS ////////////////////////////////////////////////
var leaderboardBtn = document.querySelector('.leaderboard');
var startBtn = document.querySelector('.startBtn');
var subSingleScoreBtn = document.createElement('button');
subSingleScoreBtn.textContent = 'SUBMIT';
subSingleScoreBtn.classList.add('subSingleScoreBtn');
//////////////////////////////////////////////////////////// 
// VALUES /////////////////////////////////////////////////
var killsLeft = 100;
var totalKills = 0;
var totalDeaths = 0;
///////////////////////////////////////////////////////////
// ARRAYS ////////////////////////////////////////////////
var mapArray = [' Babylon', 'Derelict', '  Gala  ', 'Hideout', ' Lowtown', 'Nuketown', ' Payback', '   Pit  ', 'Protocol', 'Red card', '  Rewind', '  Scud  ', 'Skyline ', 'Stakeout', 'Subsonic', ' Vault  ', 'Vorkuta ', 'Warehead'];
var singleGameArray = [];
var totalSetArray = [];
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
startBtn.addEventListener('click', function () {
  introEl.classList.add('hide');
  firstEl.classList.remove('hide');
  killInput.focus();
});
killsLeftEl.textContent = killsLeft;
var mapDropdown = document.createElement('select');
//////////////////////////////////////////////////////////
// INPUT ROW ELEMENTS ---> .inputRowEl ///////////////////
var kTotal = document.createElement('div');
kTotal.classList.add('kTotal');
var kDiv = document.createElement('div');
kDiv.classList.add('kDiv');
kDiv.textContent = 'Kills:';
var killInput = document.createElement('input');
killInput.type = 'number';
killInput.classList.add('killInput');
var dTotal = document.createElement('div');
dTotal.classList.add('dTotal');
var dDiv = document.createElement('div');
dDiv.classList.add('dDiv');
dDiv.textContent = 'Deaths:';
var deathInput = document.createElement('input');
deathInput.type = 'number';
deathInput.classList.add('deathInput');
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
for (var i = 0; i <= mapArray.length - 1; i++) {
  var option = document.createElement('option');
  option.value = mapArray[i];
  option.textContent = mapArray[i];
  mapDropdown.appendChild(option);
}
kTotal.appendChild(kDiv);
kTotal.appendChild(killInput);
dTotal.appendChild(dDiv);
dTotal.appendChild(deathInput);
inputRowEl.appendChild(kTotal);
inputRowEl.appendChild(dTotal);
firstEl.appendChild(mapDropdown);
firstEl.appendChild(inputRowEl);
// firstEl.appendChild(subSingleScoreBtn);
firstEl.appendChild(gameArchiveEl);
var container = document.createElement('div');
container.classList.add('container');
var table = document.createElement('table');
table.classList.add('table-striped');
var tHead = document.createElement('thead');
tHead.classList.add('inGameArchHeaders');
var trEl = document.createElement('tr');
var thGameNum = document.createElement('th');
thGameNum.classList.add('col');
thGameNum.textContent = "#";
var thKills = document.createElement('th');
thKills.classList.add('col');
thKills.textContent = 'Kills';
var thDeaths = document.createElement('th');
thDeaths.classList.add('col');
thDeaths.textContent = 'Deaths';
var thRatio = document.createElement('th');
thRatio.classList.add('col');
thRatio.textContent = '%';
var thMap = document.createElement('th');
thMap.classList.add('col');
thMap.textContent = 'Map';
trEl.appendChild(thGameNum);
trEl.appendChild(thKills);
trEl.appendChild(thDeaths);
trEl.appendChild(thRatio);
trEl.appendChild(thMap);
tHead.appendChild(trEl);
table.appendChild(tHead);
container.appendChild(table);
container.appendChild(table);
gameArchiveEl.appendChild(container);
killInput.addEventListener('input', function () {
  if (killInput.value.length > 1) {
    deathInput.focus();
  }
});
killInput.addEventListener('keydown', function (e) {
  if ((event.key === 'Enter' || event.keyCode === 13) && killInput.value) {
    deathInput.focus();
  }
});
deathInput.addEventListener('input', function () {
  if (deathInput.value.length > 1) {
    if (killInput.value && deathInput.value) {
      killsLeft -= killInput.value;
      totalDeaths += parseInt(deathInput.value, 10);
      totalKills += parseInt(killInput.value, 10);
      singleGameArray.push({
        kills: killInput.value,
        deaths: deathInput.value,
        map: mapDropdown.value
      });
      if (killsLeft <= 0) {
        firstEl.classList.add('hide');
        secondEl.classList.remove('hide');
        totalSetArray.push({
          totalKills: totalKills,
          totalDeaths: totalDeaths,
          games: {
            singleGameArray: singleGameArray
          }
        });
        (0, _database.push)(rootRef, totalSetArray).then(function () {
          console.log("Array pushed successfully");
        }).catch(function (error) {
          console.error("Error pushing array:", error);
        });
        leaderboardBtn.addEventListener('click', function () {
          (0, _database.get)(rootRef).then(function (snapshot) {
            if (snapshot.exists()) {
              var myObj = snapshot.val();
              var _loop = function _loop() {
                if (myObj.hasOwnProperty(key)) {
                  var entry = myObj[key];
                  var x = 0;
                  entry.forEach(function (item) {
                    x++;
                    ;
                    // console.log(`Set ${x} Total Kills: ${item.totalKills}`);
                    // console.log(`Set ${x} Total Deaths: ${item.totalDeaths}`);

                    item.games.singleGameArray.forEach(function (game) {
                      console.log("".concat(game));
                    });
                  });
                }
              };
              for (var key in myObj) {
                _loop();
              }
            } else {
              console.log("No data available");
            }
          }).catch(function (error) {
            console.error("Error fetching data:", error);
          });
        });
        for (var _i = 0; _i < totalSetArray[0].games.singleGameArray.length; _i++) {
          if (_i === singleGameArray.length - 1) {
            // const tableArch = document.createElement('table');
            var tBody = document.createElement('tbody');
            var trEl3 = document.createElement('tr');
            var thActGameNum = document.createElement('td');
            thActGameNum.classList.add('col');
            thActGameNum.textContent = "".concat(_i + 1);
            var thActKills = document.createElement('td');
            thActKills.classList.add('col');
            thActKills.textContent = singleGameArray[_i].kills;
            var thActDeaths = document.createElement('td');
            thActDeaths.classList.add('col');
            thActDeaths.textContent = singleGameArray[_i].deaths;
            var thActRatio = document.createElement('td');
            thActRatio.classList.add('col');
            thActRatio.textContent = (singleGameArray[_i].kills / singleGameArray[_i].deaths).toFixed(2);
            var thActMap = document.createElement('td');
            thActMap.classList.add('col');
            thActMap.textContent = singleGameArray[_i].map;
            trEl3.appendChild(thActGameNum);
            trEl3.appendChild(thActKills);
            trEl3.appendChild(thActDeaths);
            trEl3.appendChild(thActRatio);
            trEl3.appendChild(thActMap);
            tBody.appendChild(trEl3);
            if ((singleGameArray[_i].kills / singleGameArray[_i].deaths).toFixed(2) < 1) {
              tBody.classList.add('red');
            } else if ((singleGameArray[_i].kills / singleGameArray[_i].deaths).toFixed(2) > 1) {
              tBody.classList.add('green');
            } else if ((singleGameArray[_i].kills / singleGameArray[_i].deaths).toFixed(2) == 1) {
              tBody.classList.add('grey');
            }
            table.appendChild(tBody);
            achievedSetEl.appendChild(table);
            if (_i === totalSetArray[0].games.singleGameArray.length - 1) {
              var totalKillDiv = document.createElement('div');
              var totalDeathDiv = document.createElement('div');
              var totalRatioDiv = document.createElement('div');
              totalKillDiv.textContent = 'KILLS: ' + totalSetArray[0].totalKills;
              totalDeathDiv.textContent = 'DEATHS: ' + totalSetArray[0].totalDeaths;
              totalRatioDiv.textContent = '%: ' + (totalSetArray[0].totalKills / totalSetArray[0].totalDeaths).toFixed(2);
              setTotalsEl.appendChild(totalKillDiv);
              setTotalsEl.appendChild(totalDeathDiv);
              setTotalsEl.appendChild(totalRatioDiv);
              secondEl.appendChild(setTotalsEl);
            }
            ;
          }
          ;
          secondEl.appendChild(setTotalsEl);
        }
      } else {
        gameArchiveEl.classList.remove('hide');
        // console.log(singleGameArray);
        killsLeftEl.textContent = killsLeft;
        currKillTotal.textContent = 'K: ' + (100 - killsLeft);
        currdeathTotal.textContent = 'D: ' + totalDeaths;
        currRatioTotal.textContent = '%: ' + ((killsLeft * -1 + 100) / totalDeaths).toFixed(2);
        inGameTotalsEl.appendChild(currKillTotal);
        inGameTotalsEl.appendChild(currdeathTotal);
        inGameTotalsEl.appendChild(currRatioTotal);
        for (var _i2 = 0; _i2 < singleGameArray.length; _i2++) {
          if (_i2 === singleGameArray.length - 1) {
            var _tBody = document.createElement('tbody');
            var trEl2 = document.createElement('tr');
            var _thActGameNum = document.createElement('td');
            _thActGameNum.classList.add('col');
            _thActGameNum.textContent = "".concat(_i2 + 1);
            var _thActKills = document.createElement('td');
            _thActKills.classList.add('col');
            _thActKills.textContent = singleGameArray[_i2].kills;
            var _thActDeaths = document.createElement('td');
            _thActDeaths.classList.add('col');
            _thActDeaths.textContent = singleGameArray[_i2].deaths;
            var _thActRatio = document.createElement('td');
            _thActRatio.classList.add('col');
            _thActRatio.textContent = (singleGameArray[_i2].kills / singleGameArray[_i2].deaths).toFixed(2);
            var _thActMap = document.createElement('td');
            _thActMap.classList.add('col');
            _thActMap.textContent = singleGameArray[_i2].map;
            trEl2.appendChild(_thActGameNum);
            trEl2.appendChild(_thActKills);
            trEl2.appendChild(_thActDeaths);
            trEl2.appendChild(_thActRatio);
            trEl2.appendChild(_thActMap);
            _tBody.appendChild(trEl2);
            if ((singleGameArray[_i2].kills / singleGameArray[_i2].deaths).toFixed(2) < 1) {
              _tBody.classList.add('red');
            } else if ((singleGameArray[_i2].kills / singleGameArray[_i2].deaths).toFixed(2) > 1) {
              _tBody.classList.add('green');
            } else if ((singleGameArray[_i2].kills / singleGameArray[_i2].deaths).toFixed(2) == 1) {
              _tBody.classList.add('grey');
            }
            table.appendChild(_tBody);
            container.appendChild(table);
            gameArchiveEl.appendChild(container);
          }
        }
        killInput.value = '';
        deathInput.value = '';
        killInput.focus();
      }
    }
  }
});
deathInput.addEventListener('keydown', function (e) {
  if (event.key === 'Enter' || event.keyCode === 13) {
    console.log(deathInput.value);
    if (killInput.value && deathInput.value) {
      killsLeft -= killInput.value;
      totalDeaths += parseInt(deathInput.value, 10);
      totalKills += parseInt(killInput.value, 10);
      singleGameArray.push({
        kills: killInput.value,
        deaths: deathInput.value,
        map: mapDropdown.value
      });
      if (killsLeft <= 0) {
        firstEl.classList.add('hide');
        secondEl.classList.remove('hide');
        totalSetArray.push({
          totalKills: totalKills,
          totalDeaths: totalDeaths,
          games: {
            singleGameArray: singleGameArray
          }
        });
        for (var _i3 = 0; _i3 < totalSetArray[0].games.singleGameArray.length; _i3++) {
          if (_i3 === singleGameArray.length - 1) {
            // const tableArch = document.createElement('table');
            var tBody = document.createElement('tbody');
            var trEl3 = document.createElement('tr');
            var thActGameNum = document.createElement('td');
            thActGameNum.classList.add('col');
            thActGameNum.textContent = "".concat(_i3 + 1);
            var thActKills = document.createElement('td');
            thActKills.classList.add('col');
            thActKills.textContent = singleGameArray[_i3].kills;
            var thActDeaths = document.createElement('td');
            thActDeaths.classList.add('col');
            thActDeaths.textContent = singleGameArray[_i3].deaths;
            var thActRatio = document.createElement('td');
            thActRatio.classList.add('col');
            thActRatio.textContent = (singleGameArray[_i3].kills / singleGameArray[_i3].deaths).toFixed(2);
            var thActMap = document.createElement('td');
            thActMap.classList.add('col');
            thActMap.textContent = singleGameArray[_i3].map;
            trEl3.appendChild(thActGameNum);
            trEl3.appendChild(thActKills);
            trEl3.appendChild(thActDeaths);
            trEl3.appendChild(thActRatio);
            trEl3.appendChild(thActMap);
            tBody.appendChild(trEl3);
            if ((singleGameArray[_i3].kills / singleGameArray[_i3].deaths).toFixed(2) < 1) {
              tBody.classList.add('red');
            } else if ((singleGameArray[_i3].kills / singleGameArray[_i3].deaths).toFixed(2) > 1) {
              tBody.classList.add('green');
            } else if ((singleGameArray[_i3].kills / singleGameArray[_i3].deaths).toFixed(2) == 1) {
              tBody.classList.add('grey');
            }
            table.appendChild(tBody);
            achievedSetEl.appendChild(table);
            if (_i3 === totalSetArray[0].games.singleGameArray.length - 1) {
              var totalKillDiv = document.createElement('div');
              var totalDeathDiv = document.createElement('div');
              var totalRatioDiv = document.createElement('div');
              totalKillDiv.textContent = 'KILLS: ' + totalSetArray[0].totalKills;
              totalDeathDiv.textContent = 'DEATHS: ' + totalSetArray[0].totalDeaths;
              totalRatioDiv.textContent = '%: ' + (totalSetArray[0].totalKills / totalSetArray[0].totalDeaths).toFixed(2);
              setTotalsEl.appendChild(totalKillDiv);
              setTotalsEl.appendChild(totalDeathDiv);
              setTotalsEl.appendChild(totalRatioDiv);
              secondEl.appendChild(setTotalsEl);
            }
            ;
          }
          ;
          secondEl.appendChild(setTotalsEl);
        }
      } else {
        gameArchiveEl.classList.remove('hide');
        console.log(singleGameArray);
        killsLeftEl.textContent = killsLeft;
        currKillTotal.textContent = 'K: ' + (100 - killsLeft);
        currdeathTotal.textContent = 'D: ' + totalDeaths;
        currRatioTotal.textContent = '%: ' + ((killsLeft * -1 + 100) / totalDeaths).toFixed(2);
        inGameTotalsEl.appendChild(currKillTotal);
        inGameTotalsEl.appendChild(currdeathTotal);
        inGameTotalsEl.appendChild(currRatioTotal);
        for (var _i4 = 0; _i4 < singleGameArray.length; _i4++) {
          if (_i4 === singleGameArray.length - 1) {
            var _tBody2 = document.createElement('tbody');
            var trEl2 = document.createElement('tr');
            var _thActGameNum2 = document.createElement('td');
            _thActGameNum2.classList.add('col');
            _thActGameNum2.textContent = "".concat(_i4 + 1);
            var _thActKills2 = document.createElement('td');
            _thActKills2.classList.add('col');
            _thActKills2.textContent = singleGameArray[_i4].kills;
            var _thActDeaths2 = document.createElement('td');
            _thActDeaths2.classList.add('col');
            _thActDeaths2.textContent = singleGameArray[_i4].deaths;
            var _thActRatio2 = document.createElement('td');
            _thActRatio2.classList.add('col');
            _thActRatio2.textContent = (singleGameArray[_i4].kills / singleGameArray[_i4].deaths).toFixed(2);
            var _thActMap2 = document.createElement('td');
            _thActMap2.classList.add('col');
            _thActMap2.textContent = singleGameArray[_i4].map;
            trEl2.appendChild(_thActGameNum2);
            trEl2.appendChild(_thActKills2);
            trEl2.appendChild(_thActDeaths2);
            trEl2.appendChild(_thActRatio2);
            trEl2.appendChild(_thActMap2);
            _tBody2.appendChild(trEl2);
            if ((singleGameArray[_i4].kills / singleGameArray[_i4].deaths).toFixed(2) < 1) {
              _tBody2.classList.add('red');
            } else if ((singleGameArray[_i4].kills / singleGameArray[_i4].deaths).toFixed(2) > 1) {
              _tBody2.classList.add('green');
            } else if ((singleGameArray[_i4].kills / singleGameArray[_i4].deaths).toFixed(2) == 1) {
              _tBody2.classList.add('grey');
            }
            table.appendChild(_tBody2);
            container.appendChild(table);
            gameArchiveEl.appendChild(container);
          }
        }
        killInput.value = '';
        deathInput.value = '';
        killInput.focus();
      }
    }
  }
});
subSingleScoreBtn.addEventListener('click', function () {
  if (killInput.value != '' || deathInput.value != '') {
    killsLeft -= killInput.value;
    totalDeaths += parseInt(deathInput.value, 10);
    totalKills += parseInt(killInput.value, 10);
    singleGameArray.push({
      kills: killInput.value,
      deaths: deathInput.value,
      map: mapDropdown.value
    });
    if (killsLeft <= 0) {
      firstEl.classList.add('hide');
      secondEl.classList.remove('hide');
      totalSetArray.push({
        totalKills: totalKills,
        totalDeaths: totalDeaths,
        games: {
          singleGameArray: singleGameArray
        }
      });
      for (var _i5 = 0; _i5 < totalSetArray[0].games.singleGameArray.length; _i5++) {
        if (_i5 === singleGameArray.length - 1) {
          var tBody = document.createElement('tbody');
          var trEl3 = document.createElement('tr');
          var thActGameNum = document.createElement('td');
          thActGameNum.classList.add('col');
          thActGameNum.textContent = "".concat(_i5 + 1);
          var thActKills = document.createElement('td');
          thActKills.classList.add('col');
          thActKills.textContent = singleGameArray[_i5].kills;
          var thActDeaths = document.createElement('td');
          thActDeaths.classList.add('col');
          thActDeaths.textContent = singleGameArray[_i5].deaths;
          var thActRatio = document.createElement('td');
          thActRatio.classList.add('col');
          thActRatio.textContent = (singleGameArray[_i5].kills / singleGameArray[_i5].deaths).toFixed(2);
          var thActMap = document.createElement('td');
          thActMap.classList.add('col');
          thActMap.textContent = singleGameArray[_i5].map;
          trEl3.appendChild(thActGameNum);
          trEl3.appendChild(thActKills);
          trEl3.appendChild(thActDeaths);
          trEl3.appendChild(thActRatio);
          trEl3.appendChild(thActMap);
          tBody.appendChild(trEl3);
          if ((singleGameArray[_i5].kills / singleGameArray[_i5].deaths).toFixed(2) < 1) {
            tBody.classList.add('red');
          } else if ((singleGameArray[_i5].kills / singleGameArray[_i5].deaths).toFixed(2) > 1) {
            tBody.classList.add('green');
          } else if ((singleGameArray[_i5].kills / singleGameArray[_i5].deaths).toFixed(2) == 1) {
            tBody.classList.add('grey');
          }
          table.appendChild(tBody);
          achievedSetEl.appendChild(table);
          if (_i5 === totalSetArray[0].games.singleGameArray.length - 1) {
            var totalKillDiv = document.createElement('div');
            var totalDeathDiv = document.createElement('div');
            var totalRatioDiv = document.createElement('div');
            totalKillDiv.textContent = 'KILLS: ' + totalSetArray[0].totalKills;
            totalDeathDiv.textContent = 'DEATHS: ' + totalSetArray[0].totalDeaths;
            totalRatioDiv.textContent = '%: ' + (totalSetArray[0].totalKills / totalSetArray[0].totalDeaths).toFixed(2);
            setTotalsEl.appendChild(totalKillDiv);
            setTotalsEl.appendChild(totalDeathDiv);
            setTotalsEl.appendChild(totalRatioDiv);
            secondEl.appendChild(setTotalsEl);
          }
          ;
        }
        ;
        secondEl.appendChild(setTotalsEl);
      }
    } else {
      gameArchiveEl.classList.remove('hide');
      killsLeftEl.textContent = killsLeft;
      currKillTotal.textContent = 'K: ' + (100 - killsLeft);
      currdeathTotal.textContent = 'D: ' + totalDeaths;
      currRatioTotal.textContent = '%: ' + ((killsLeft * -1 + 100) / totalDeaths).toFixed(2);
      inGameTotalsEl.appendChild(currKillTotal);
      inGameTotalsEl.appendChild(currdeathTotal);
      inGameTotalsEl.appendChild(currRatioTotal);
      for (var _i6 = 0; _i6 < singleGameArray.length; _i6++) {
        if (_i6 === singleGameArray.length - 1) {
          var _tBody3 = document.createElement('tbody');
          var trEl2 = document.createElement('tr');
          var _thActGameNum3 = document.createElement('td');
          _thActGameNum3.classList.add('col');
          _thActGameNum3.textContent = "".concat(_i6 + 1);
          var _thActKills3 = document.createElement('td');
          _thActKills3.classList.add('col');
          _thActKills3.textContent = singleGameArray[_i6].kills;
          var _thActDeaths3 = document.createElement('td');
          _thActDeaths3.classList.add('col');
          _thActDeaths3.textContent = singleGameArray[_i6].deaths;
          var _thActRatio3 = document.createElement('td');
          _thActRatio3.classList.add('col');
          _thActRatio3.textContent = (singleGameArray[_i6].kills / singleGameArray[_i6].deaths).toFixed(2);
          var _thActMap3 = document.createElement('td');
          _thActMap3.classList.add('col');
          _thActMap3.textContent = singleGameArray[_i6].map;
          trEl2.appendChild(_thActGameNum3);
          trEl2.appendChild(_thActKills3);
          trEl2.appendChild(_thActDeaths3);
          trEl2.appendChild(_thActRatio3);
          trEl2.appendChild(_thActMap3);
          _tBody3.appendChild(trEl2);
          if ((singleGameArray[_i6].kills / singleGameArray[_i6].deaths).toFixed(2) < 1) {
            _tBody3.classList.add('red');
          } else if ((singleGameArray[_i6].kills / singleGameArray[_i6].deaths).toFixed(2) > 1) {
            _tBody3.classList.add('green');
          } else if ((singleGameArray[_i6].kills / singleGameArray[_i6].deaths).toFixed(2) == 1) {
            _tBody3.classList.add('grey');
          }
          console.log((singleGameArray[_i6].kills / singleGameArray[_i6].deaths).toFixed(2));
          table.appendChild(_tBody3);
          container.appendChild(table);
          gameArchiveEl.appendChild(container);
        }
      }
      killInput.value = '';
      deathInput.value = '';
      killInput.focus();
    }
  }
});
},{"firebase/app":"../node_modules/firebase/app/dist/esm/index.esm.js","firebase/database":"../node_modules/firebase/database/dist/esm/index.esm.js"}],"../../../../../AppData/Roaming/nvm/v22.9.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56545" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
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
}
},{}]},{},["../../../../../AppData/Roaming/nvm/v22.9.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map