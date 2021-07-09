"use strict";

exports.__esModule = true;
exports.hasPrefixSuffix = hasPrefixSuffix;
exports.getInputClassName = getInputClassName;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var _icon = _interopRequireDefault(require("../icon"));

var _propsUtil = require("../utils/props-util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// utils
// Types
function hasPrefixSuffix(instance) {
  return !!((0, _propsUtil.getComponentFromProp)(instance, 'prefix') || (0, _propsUtil.getComponentFromProp)(instance, 'suffix') || instance.$props.allowClear);
}

function getInputClassName(prefixCls, size, disabled) {
  var _classNames;

  return (0, _classnames.default)(prefixCls, (_classNames = {}, _classNames[prefixCls + "-sm"] = size === 'small', _classNames[prefixCls + "-lg"] = size === 'large', _classNames[prefixCls + "-disabled"] = disabled, _classNames));
}

var props = {
  prefixCls: String,
  inputType: String,
  value: [String, Number],
  defaultValue: [String, Number],
  allowClear: Boolean,
  element: [Object],
  handleReset: Function,
  disabled: Boolean,
  size: {
    type: String,
    default: 'default'
  },
  suffix: [String, Object, Array],
  prefix: [String, Object, Array],
  addonBefore: [String, Object, Array],
  addonAfter: null,
  className: String,
  readOnly: Boolean
};
var ClearableInputType = ['text', 'input'];

var _createNamespace = (0, _utils.createNamespace)('wrapper'),
    createComponent = _createNamespace[0];

var _default = createComponent({
  props: props,
  methods: {
    renderClearIcon: function renderClearIcon(prefixCls) {
      var h = this.$createElement;
      var _this$$props = this.$props,
          allowClear = _this$$props.allowClear,
          value = _this$$props.value,
          disabled = _this$$props.disabled,
          readOnly = _this$$props.readOnly,
          inputType = _this$$props.inputType,
          handleReset = _this$$props.handleReset;

      if (!allowClear || disabled || readOnly || value === undefined || value === null || value === '') {
        return null;
      }

      var className = inputType === ClearableInputType[0] ? prefixCls + "-textarea-clear-icon" : prefixCls + "-clear-icon";
      return h(_icon.default, {
        "attrs": {
          "type": "close-circle"
        },
        "on": {
          "click": handleReset
        },
        "class": className
      });
    },
    renderSuffix: function renderSuffix(prefixCls) {
      var h = this.$createElement;
      var _this$$props2 = this.$props,
          suffix = _this$$props2.suffix,
          allowClear = _this$$props2.allowClear;

      if (suffix || allowClear) {
        return h("span", {
          "class": prefixCls + "-suffix"
        }, [this.renderClearIcon(prefixCls), suffix]);
      }

      return null;
    },
    renderLabeledIcon: function renderLabeledIcon(prefixCls, element) {
      var _classNames2;

      var h = this.$createElement;
      var props = this.$props;
      var suffix = this.renderSuffix(prefixCls);

      if (!hasPrefixSuffix(this)) {
        return Object.assign(element, {
          props: {
            value: props.value
          }
        });
      }

      var prefix = props.prefix ? h("span", {
        "class": prefixCls + "-prefix"
      }, [props.prefix]) : null; // console.log('caonima', props.className)

      var affixWrapperCls = (0, _classnames.default)(props.className, prefixCls + "-affix-wrapper", (_classNames2 = {}, _classNames2[prefixCls + "-affix-wrapper-sm"] = props.size === 'small', _classNames2[prefixCls + "-affix-wrapper-lg"] = props.size === 'large', _classNames2[prefixCls + "-affix-wrapper-input-with-clear-btn"] = props.suffix && props.allowClear && this.$props.value, _classNames2));
      return h("span", {
        "class": affixWrapperCls,
        "style": props.style
      }, [prefix, Object.assign(element, {
        style: null,
        props: {
          value: props.value
        },
        class: getInputClassName(prefixCls, props.size, props.disabled)
      }), suffix]);
    },
    renderInputWithLabel: function renderInputWithLabel(prefixCls, labeledElement) {
      var _classNames3, _classNames4;

      var h = this.$createElement;
      var _this$$props3 = this.$props,
          addonBefore = _this$$props3.addonBefore,
          addonAfter = _this$$props3.addonAfter,
          style = _this$$props3.style,
          size = _this$$props3.size,
          className = _this$$props3.className; // Not wrap when there is not addons

      if (!addonBefore && !addonAfter) {
        return labeledElement;
      }

      var wrapperClassName = prefixCls + "-group";
      var addonClassName = wrapperClassName + "-addon";
      var addonBeforeNode = addonBefore ? h("span", {
        "class": addonClassName
      }, [addonBefore]) : null;
      var addonAfterNode = addonAfter ? h("span", {
        "class": addonClassName
      }, [addonAfter]) : null;
      var mergedWrapperClassName = (0, _classnames.default)(prefixCls + "-wrapper", (_classNames3 = {}, _classNames3[wrapperClassName] = addonBefore || addonAfter, _classNames3));
      var mergedGroupClassName = (0, _classnames.default)(className, prefixCls + "-group-wrapper", (_classNames4 = {}, _classNames4[prefixCls + "-group-wrapper-sm"] = size === 'small', _classNames4[prefixCls + "-group-wrapper-lg"] = size === 'large', _classNames4)); // Need another wrapper for changing display:table to display:inline-block
      // and put style prop in wrapper
      // console.log(mergedGroupClassName, mergedWrapperClassName)

      return h("span", {
        "class": mergedGroupClassName,
        "style": style
      }, [h("span", {
        "class": mergedWrapperClassName
      }, [addonBeforeNode, Object.assign(labeledElement, {
        style: null
      }), addonAfterNode])]);
    },
    renderTextAreaWithClearIcon: function renderTextAreaWithClearIcon(prefixCls, element) {
      var h = this.$createElement;
      var _this$$props4 = this.$props,
          value = _this$$props4.value,
          allowClear = _this$$props4.allowClear,
          className = _this$$props4.className,
          style = _this$$props4.style;

      if (!allowClear) {
        return Object.assign(element, {
          props: {
            value: value
          }
        });
      }

      var affixWrapperCls = (0, _classnames.default)(className, prefixCls + "-affix-wrapper", prefixCls + "-affix-wrapper-textarea-with-clear-btn");
      return h("span", {
        "class": affixWrapperCls,
        "style": style
      }, [Object.assign(element, {
        style: null,
        props: {
          value: value
        }
      }), this.renderClearIcon(prefixCls)]);
    },
    renderClearableLabeledInput: function renderClearableLabeledInput() {
      var _this$$props5 = this.$props,
          prefixCls = _this$$props5.prefixCls,
          inputType = _this$$props5.inputType,
          element = _this$$props5.element;

      if (inputType === ClearableInputType[0]) {
        return this.renderTextAreaWithClearIcon(prefixCls, element);
      }

      return this.renderInputWithLabel(prefixCls, this.renderLabeledIcon(prefixCls, element));
    }
  },
  render: function render() {
    return this.renderClearableLabeledInput();
  }
});

exports.default = _default;