"use strict";

exports.__esModule = true;
exports.default = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _propsUtil = require("../utils/props-util");

var _icon = _interopRequireDefault(require("../icon"));

var _button = _interopRequireDefault(require("../button"));

var _Wrapper = _interopRequireDefault(require("./Wrapper.js"));

var _Input = _interopRequireWildcard(require("./Input"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function noop() {}

var _createNamespace = (0, _utils.createNamespace)('input-search'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var ActionMap = {
  click: 'click',
  hover: 'mouseover'
};

var _default = createComponent({
  props: _extends({}, _Input.props, {
    enterButton: null,
    prefixCls: {
      type: String,
      default: bem()
    }
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
    onSearch: function onSearch(e) {},
    onChange: function onChange(e) {},
    renderLoading: function renderLoading(prefixCls) {
      var h = this.$createElement;
      var size = this.$props.size;
      var enterButton = this.$props.enterButton;
      enterButton = enterButton || enterButton === '';

      if (enterButton) {
        return h(_button.default, {
          "class": prefixCls + "-button",
          "attrs": {
            "type": "primary",
            "size": size
          },
          "key": "enterButton"
        }, [h(_icon.default, {
          "attrs": {
            "type": "loading"
          }
        })]);
      }

      return h(_icon.default, {
        "class": prefixCls + "-icon",
        "attrs": {
          "type": "loading"
        },
        "key": "loadingIcon"
      });
    },
    renderSuffix: function renderSuffix(prefixCls) {
      var h = this.$createElement;
      var loading = this.loading,
          suffix = this.suffix,
          enterButton = this.enterButton;
      enterButton = enterButton || enterButton === '';

      if (loading && !enterButton) {
        return [suffix, this.renderLoading(prefixCls)];
      }

      if (enterButton) return suffix;
      var icon = h(_icon.default, {
        "class": prefixCls + "-icon",
        "attrs": {
          "type": "search"
        },
        "key": "searchIcon",
        "on": {
          "click": this.onSearch
        }
      });

      if (suffix) {
        return [suffix, icon];
      }

      return icon;
    },
    renderAddonAfter: function renderAddonAfter(prefixCls) {
      var h = this.$createElement;
      var size = this.size,
          disabled = this.disabled,
          loading = this.loading,
          addonAfter = this.addonAfter;
      var enterButton = this.enterButton || this.$slots.enterButton;
      var btnClassName = prefixCls + "-button";
      enterButton = enterButton || enterButton === '' || enterButton === undefined;

      if (loading && enterButton) {
        return [this.renderLoading(prefixCls), addonAfter];
      }

      if (!enterButton) return addonAfter;
      var enterButtonAsElement = Array.isArray(enterButton) ? enterButton[0] : enterButton;
      var button;
      var isZButton = enterButtonAsElement.componentOptions && enterButtonAsElement.componentOptions.Ctor;

      if (enterButtonAsElement.tag === 'button' || isZButton) {
        button = Object.assign(enterButtonAsElement, {
          key: 'enterButton',
          class: isZButton ? btnClassName : '',
          props: isZButton ? {
            size: size
          } : {},
          on: {
            click: this.onSearch
          }
        });
      } else {
        button = h(_button.default, {
          "class": btnClassName,
          "attrs": {
            "type": "primary",
            "size": size,
            "disabled": disabled
          },
          "key": "enterButton",
          "on": {
            "click": this.onSearch
          }
        }, [enterButton === true || enterButton === '' ? h(_icon.default, {
          "attrs": {
            "type": "search"
          }
        }) : enterButton]);
      }

      if (addonAfter) {
        return [button, addonAfter];
      }

      return button;
    }
  },
  render: function render(h) {
    var _getOptionProps = (0, _propsUtil.getOptionProps)(this),
        prefixCls = _getOptionProps.prefixCls,
        inputPrefixCls = _getOptionProps.inputPrefixCls,
        size = _getOptionProps.size,
        loading = _getOptionProps.loading,
        others = _objectWithoutPropertiesLoose(_getOptionProps, ["prefixCls", "inputPrefixCls", "size", "loading"]);

    var enterButton = (0, _propsUtil.getComponentFromProp)(this, 'enterButton');
    var addonBefore = (0, _propsUtil.getComponentFromProp)(this, 'addonBefore');
    enterButton = enterButton || enterButton === '';
    var inputClassName;

    if (enterButton) {
      var _classNames;

      inputClassName = (0, _classnames.default)(prefixCls, (_classNames = {}, _classNames[prefixCls + "-enter-button"] = !!enterButton, _classNames[prefixCls + "-" + size] = !!size, _classNames));
    } else {
      inputClassName = prefixCls;
    }

    var on = _extends({}, (0, _propsUtil.getListeners)(this));

    delete on.search;
    var inputProps = {
      props: _extends({}, others, {
        prefixCls: inputPrefixCls,
        size: size,
        suffix: this.renderSuffix(prefixCls),
        prefix: (0, _propsUtil.getComponentFromProp)(this, 'prefix'),
        addonAfter: this.renderAddonAfter(prefixCls),
        addonBefore: addonBefore,
        className: inputClassName
      }),
      attrs: this.$attrs,
      ref: 'input',
      on: _extends({
        pressEnter: this.onSearch
      }, on, {
        change: this.onChange
      })
    };
    return h(_Input.default, (0, _babelHelperVueJsxMergeProps.default)([{}, inputProps]));
  }
});

exports.default = _default;