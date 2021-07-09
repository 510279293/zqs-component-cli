"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

// utils
var _createNamespace = (0, _utils.createNamespace)('button-group'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function ButtonGroup(h, props, slots, ctx) {
  var classes = [bem()];
  return h("section", {
    "class": classes
  }, [slots.default && slots.default()]);
}

ButtonGroup.props = {};

var _default = createComponent(ButtonGroup);

exports.default = _default;