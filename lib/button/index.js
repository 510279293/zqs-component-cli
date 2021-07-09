"use strict";

exports.__esModule = true;
exports.default = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _router = require("../utils/router");

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// utils
// Components
var _createNamespace = (0, _utils.createNamespace)('button'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function Button(h, props, slots, ctx) {
  var _bem;

  var style = {};
  var tag = props.tag,
      icon = props.icon,
      type = props.type,
      size = props.size,
      shape = props.shape,
      block = props.block,
      disabled = props.disabled,
      loading = props.loading,
      iconPosition = props.iconPosition,
      htmlType = props.htmlType;

  function onClick(event) {
    if (!loading && !disabled) {
      (0, _functional.emit)(ctx, 'click', event);
      (0, _router.functionalRoute)(ctx);
    }
  } // const children = filterEmpty(slots.default())


  var _slots = slots.default && slots.default();

  var classes = [bem((_bem = {}, _bem[type] = type, _bem[shape] = shape, _bem[size] = size, _bem.loading = loading, _bem.disabled = disabled, _bem.block = block, _bem))];

  function renderIcon() {
    if (loading) {
      return slots.loading ? slots.loading() : h(_icon.default, {
        "attrs": {
          "type": 'loading'
        },
        "style": {
          fontWeight: 600
        }
      });
    }

    if (icon) {
      return h(_icon.default, {
        "attrs": {
          "type": icon
        },
        "style": {
          fontWeight: 600
        }
      });
    }
  }

  function renderContent() {
    var content = [];

    if (iconPosition === 'left') {
      content.push(renderIcon());
    }

    _slots && content.push(h("span", [_slots]));

    if (iconPosition === 'right') {
      content.push(renderIcon());
    }

    return content;
  }

  return h(tag, (0, _babelHelperVueJsxMergeProps.default)([{
    "style": style,
    "class": classes,
    "attrs": {
      "type": htmlType || 'button',
      "disabled": disabled
    }
  }, (0, _functional.inherit)(ctx)]), [renderContent()]);
}

Button.props = {
  icon: String,
  block: Boolean,
  shape: String,
  loading: [Boolean, Object],
  disabled: Boolean,
  tag: {
    type: String,
    default: 'button'
  },
  type: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'normal'
  },
  iconPosition: {
    type: String,
    default: 'left'
  }
};

var _default = createComponent(Button);

exports.default = _default;