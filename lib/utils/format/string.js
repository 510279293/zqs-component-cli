"use strict";

exports.__esModule = true;
exports.camelize = camelize;
var camelizeRE = /-(\w)/g;

function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    return c.toUpperCase();
  });
}