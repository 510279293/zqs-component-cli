"use strict";

exports.__esModule = true;
exports.isServer = exports.inBrowser = exports.isValidElement = exports.isPromise = exports.isObject = exports.isFunction = exports.isDef = exports.addUnit = exports.createNamespace = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _create = require("./create");

exports.createNamespace = _create.createNamespace;

var _unit = require("./format/unit");

exports.addUnit = _unit.addUnit;

var _tools = require("./tools");

exports.isDef = _tools.isDef;
exports.isFunction = _tools.isFunction;
exports.isObject = _tools.isObject;
exports.isPromise = _tools.isPromise;
exports.isValidElement = _tools.isValidElement;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inBrowser = typeof window !== 'undefined';
exports.inBrowser = inBrowser;
var isServer = _vue.default.prototype.$isServer;
exports.isServer = isServer;