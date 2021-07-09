import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// utils
import classNames from 'classnames';
import { createNamespace } from '../utils';
import { inherit, emit } from '../utils/functional';
import { getOptionProps, getComponentFromProp, getListeners } from '../utils/props-util';
import Icon from '../icon';
import Button from '../button';
import Wrapper from './Wrapper.js'; // Types

import Input, { props, InputProps } from './Input';

function noop() {}

var _createNamespace = createNamespace('input-search'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var ActionMap = {
  click: 'click',
  hover: 'mouseover'
};
export default createComponent({
  props: _extends({}, props, {
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
        return h(Button, {
          "class": prefixCls + "-button",
          "attrs": {
            "type": "primary",
            "size": size
          },
          "key": "enterButton"
        }, [h(Icon, {
          "attrs": {
            "type": "loading"
          }
        })]);
      }

      return h(Icon, {
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
      var icon = h(Icon, {
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
        button = h(Button, {
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
        }, [enterButton === true || enterButton === '' ? h(Icon, {
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
    var _getOptionProps = getOptionProps(this),
        prefixCls = _getOptionProps.prefixCls,
        inputPrefixCls = _getOptionProps.inputPrefixCls,
        size = _getOptionProps.size,
        loading = _getOptionProps.loading,
        others = _objectWithoutPropertiesLoose(_getOptionProps, ["prefixCls", "inputPrefixCls", "size", "loading"]);

    var enterButton = getComponentFromProp(this, 'enterButton');
    var addonBefore = getComponentFromProp(this, 'addonBefore');
    enterButton = enterButton || enterButton === '';
    var inputClassName;

    if (enterButton) {
      var _classNames;

      inputClassName = classNames(prefixCls, (_classNames = {}, _classNames[prefixCls + "-enter-button"] = !!enterButton, _classNames[prefixCls + "-" + size] = !!size, _classNames));
    } else {
      inputClassName = prefixCls;
    }

    var on = _extends({}, getListeners(this));

    delete on.search;
    var inputProps = {
      props: _extends({}, others, {
        prefixCls: inputPrefixCls,
        size: size,
        suffix: this.renderSuffix(prefixCls),
        prefix: getComponentFromProp(this, 'prefix'),
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
    return h(Input, _mergeJSXProps([{}, inputProps]));
  }
});