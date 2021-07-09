"use strict";

exports.__esModule = true;
exports.install = install;
exports.default = exports.version = void 0;

var _alert = _interopRequireDefault(require("./alert"));

exports.Alert = _alert.default;

var _button = _interopRequireDefault(require("./button"));

exports.Button = _button.default;

var _buttonGroup = _interopRequireDefault(require("./button-group"));

exports.ButtonGroup = _buttonGroup.default;

var _grid = _interopRequireDefault(require("./grid"));

exports.Grid = _grid.default;

var _icon = _interopRequireDefault(require("./icon"));

exports.Icon = _icon.default;

var _info = _interopRequireDefault(require("./info"));

exports.Info = _info.default;

var _input = _interopRequireDefault(require("./input"));

exports.Input = _input.default;

var _loading = _interopRequireDefault(require("./loading"));

exports.Loading = _loading.default;

var _vcNotification = _interopRequireDefault(require("./vc-notification"));

exports.VcNotification = _vcNotification.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = '0.1.0';
exports.version = version;

function install(Vue) {
  var components = [_alert.default, _button.default, _buttonGroup.default, _grid.default, _icon.default, _info.default, _input.default, _loading.default, _vcNotification.default];
  components.forEach(function (item) {
    if (item.install) {
      Vue.use(item);
    } else if (item.name) {
      Vue.component(item.name, item);
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var _default = {
  install: install,
  version: version
};
exports.default = _default;