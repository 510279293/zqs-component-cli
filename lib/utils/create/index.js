"use strict";

exports.__esModule = true;
exports.createNamespace = createNamespace;

var _bem = require("./bem");

var _component = require("./component");

function createNamespace(name) {
  name = 'z-' + name;
  return [(0, _component.createComponent)(name), (0, _bem.createBEM)(name)];
}