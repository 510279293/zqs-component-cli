"use strict";

exports.__esModule = true;
exports.isDef = isDef;
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isPromise = isPromise;
exports.isValidElement = isValidElement;
exports.isEmptyElement = isEmptyElement;
exports.filterEmpty = filterEmpty;

function isDef(val) {
  return val !== undefined && val !== null;
}

function isFunction(val) {
  return typeof val === 'function';
}

function isObject(val) {
  return val !== null && typeof val === 'object';
}

function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

function isValidElement(element) {
  return element && typeof element === 'object' && 'componentOptions' in element && 'context' in element && element.tag !== undefined; // remove text node
}

function isEmptyElement(c) {
  return !(c.tag || c.text && c.text.trim() == '');
}

function filterEmpty(children) {
  if (children === void 0) {
    children = [];
  }

  return children.filter(function (c) {
    return !isEmptyElement(c);
  });
}