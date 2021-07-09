"use strict";

exports.__esModule = true;
exports.default = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _icon = _interopRequireDefault(require("../icon"));

var _Wrapper = _interopRequireDefault(require("./Wrapper.js"));

var _Input = _interopRequireWildcard(require("./Input.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function noop() {}

var _createNamespace = (0, _utils.createNamespace)('input-password'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var ActionMap = {
  click: 'click',
  hover: 'mouseover'
};

var _default = createComponent({
  props: _extends({}, _Input.props, {
    prefixCls: {
      type: String,
      default: 'z-input-password'
    },
    inputPrefixCls: {
      type: String,
      default: 'z-input'
    },
    action: {
      type: String,
      default: 'click'
    },
    visibilityToggle: Boolean
  }),
  data: function data() {
    return {
      visible: false
    };
  },
  methods: {
    focus: function focus() {
      this.$refs.input.focus();
    },
    blur: function blur() {
      this.$refs.input.blur();
    },
    onVisibleChange: function onVisibleChange() {
      if (this.disabled) {
        return;
      }

      this.visible = !this.visible;
    },
    getIcon: function getIcon() {
      var _on;

      var h = this.$createElement;
      var _this$$props = this.$props,
          prefixCls = _this$$props.prefixCls,
          action = _this$$props.action;
      var iconTrigger = ActionMap[action] || '';
      var iconProps = {
        props: {
          type: this.visible ? 'eye' : 'eye-close'
        },
        on: (_on = {}, _on[iconTrigger] = this.onVisibleChange, _on.mousedown = function mousedown(e) {
          e.preventDefault();
        }, _on),
        class: prefixCls + "-icon",
        key: 'passwordIcon'
      };
      return h(_icon.default, (0, _babelHelperVueJsxMergeProps.default)([{}, iconProps]));
    }
  },
  render: function render(h) {
    var _inputClassName;

    var _this$$props2 = this.$props,
        prefixCls = _this$$props2.prefixCls,
        inputPrefixCls = _this$$props2.inputPrefixCls,
        size = _this$$props2.size,
        visibilityToggle = _this$$props2.visibilityToggle,
        restProps = _objectWithoutPropertiesLoose(_this$$props2, ["prefixCls", "inputPrefixCls", "size", "visibilityToggle"]);

    var suffixIcon = this.getIcon();
    var inputClassName = (_inputClassName = {}, _inputClassName[prefixCls + "-" + size] = !!size, _inputClassName);
    var props = {
      props: _extends({}, restProps, {
        prefixCls: inputPrefixCls,
        size: size,
        suffix: suffixIcon
      }),
      attrs: _extends({}, this.$attrs, {
        type: this.visible ? 'text' : 'password'
      }),
      class: inputClassName,
      ref: 'input',
      on: (0, _functional.getListeners)(this)
    };
    console.log(props);
    return h(_Input.default, (0, _babelHelperVueJsxMergeProps.default)([{}, props]));
  }
});

exports.default = _default;