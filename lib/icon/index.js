"use strict";

exports.__esModule = true;
exports.default = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utils
var _createNamespace = (0, _utils.createNamespace)('icon'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function Icon(h, props, slots, ctx) {
  var type = props.type,
      color = props.color,
      size = props.size;
  var classes = [bem([type])];
  return h(props.tag, (0, _babelHelperVueJsxMergeProps.default)([{
    "class": classes,
    "style": {
      color: color,
      fontSize: (0, _utils.addUnit)(size)
    }
  }, (0, _functional.inherit)(ctx, true)]), [slots.default && slots.default()]);
}

Icon.props = {
  dot: Boolean,
  info: [Number, String],
  badge: [Number, String],
  name: String,
  color: String,
  tag: {
    type: String,
    default: 'i'
  },
  classPrefix: {
    type: String,
    default: bem()
  },
  type: {
    type: String,
    default: ''
  },
  size: {
    type: [Number, String],
    default: 14
  }
};

var _default = createComponent(Icon);

exports.default = _default;