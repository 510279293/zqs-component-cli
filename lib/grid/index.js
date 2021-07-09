"use strict";

exports.__esModule = true;
exports.default = void 0;

var _col = _interopRequireDefault(require("./col"));

var _row = _interopRequireDefault(require("./row"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Col: _col.default,
  Row: _row.default
};
exports.default = _default;