import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// utils
import { createNamespace } from '../utils';
import { inherit, emit, getListeners } from '../utils/functional';
import Icon from '../icon';
import Wrapper from './Wrapper.js'; // Types

import Input, { props } from './Input.js';

function noop() {}

var _createNamespace = createNamespace('input-password'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var ActionMap = {
  click: 'click',
  hover: 'mouseover'
};
export default createComponent({
  props: _extends({}, props, {
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
      return h(Icon, _mergeJSXProps([{}, iconProps]));
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
      on: getListeners(this)
    };
    console.log(props);
    return h(Input, _mergeJSXProps2([{}, props]));
  }
});