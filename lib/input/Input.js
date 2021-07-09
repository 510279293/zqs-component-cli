"use strict";

exports.__esModule = true;
exports.default = exports.props = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _icon = _interopRequireDefault(require("../icon"));

var _Wrapper = _interopRequireDefault(require("./Wrapper.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Types
var _createNamespace = (0, _utils.createNamespace)('input'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function noop() {}

var props = {
  value: [String],
  defaultValue: [String],
  placeholder: [String, Number],
  disabled: Boolean,
  readOnly: Boolean,
  addonBefore: null,
  addonAfter: null,
  prefix: null,
  suffix: null,
  autoFocus: Boolean,
  allowClear: Boolean,
  maxLength: [Number],
  loading: Boolean,
  lazy: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'default'
  },
  type: {
    type: String,
    default: 'text'
  },
  prefixCls: {
    type: String,
    default: bem()
  },
  className: {
    default: ''
  }
};
exports.props = props;

var _default = createComponent({
  props: _extends({}, props),
  methods: {
    renderInput: function renderInput() {
      var _bem,
          _this = this;

      var h = this.$createElement;
      var $attrs = this.$attrs,
          $props = this.$props;
      var size = $props.size,
          disabled = $props.disabled,
          defaultValue = $props.defaultValue,
          value = $props.value;
      var inputProps = {
        ref: 'input',
        key: 'z-input',
        attrs: _extends({}, $props, $attrs),
        domProps: {
          value: value
        },
        class: bem((_bem = {}, _bem[size] = size, _bem.disabled = disabled, _bem)),
        on: _extends({}, (0, _functional.getListeners)(this), {
          change: noop,
          input: function input(event) {
            _this.$emit('input', event.target.value);
          },
          keydown: function keydown(event) {
            if (event.keyCode === 13) {
              _this.$emit('pressEnter', event);
            }

            _this.$emit('keydown', event);
          }
        })
      };
      return h("input", (0, _babelHelperVueJsxMergeProps.default)([{}, inputProps]));
    },
    handleReset: function handleReset() {}
  },
  render: function render(h) {
    var $props = this.$props,
        $slots = this.$slots;
    var props = {
      props: _extends({}, $props, {
        inputType: 'input',
        element: this.renderInput(),
        handleReset: this.handleReset
      }, $slots),
      on: (0, _functional.getListeners)(this)
    };
    return h(_Wrapper.default, (0, _babelHelperVueJsxMergeProps.default)([{}, props]));
  }
});

exports.default = _default;