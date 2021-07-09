function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Utils
import { createNamespace } from '../../utils';

var _createNamespace = createNamespace('col'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function Col(h, props, slots, ctx) {
  var _extends3;

  var span = props.span,
      order = props.order,
      offset = props.offset,
      push = props.push,
      pull = props.pull;
  var sizeClassObj = {};
  var prefixCls = bem();
  ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(function (size) {
    var _extends2;

    var sizeProps = {}; // @ts-ignore

    var propSize = props[size];

    if (typeof propSize === 'number') {
      sizeProps.span = propSize;
    } else if (typeof propSize === 'object') {
      sizeProps = propSize || {};
    }

    sizeClassObj = _extends({}, sizeClassObj, (_extends2 = {}, _extends2[prefixCls + "-" + size + "-" + sizeProps.span] = sizeProps.span !== undefined, _extends2[prefixCls + "-" + size + "-order-" + sizeProps.order] = sizeProps.order || sizeProps.order === 0, _extends2[prefixCls + "-" + size + "-offset-" + sizeProps.offset] = sizeProps.offset || sizeProps.offset === 0, _extends2[prefixCls + "-" + size + "-push-" + sizeProps.push] = sizeProps.push || sizeProps.push === 0, _extends2[prefixCls + "-" + size + "-pull-" + sizeProps.pull] = sizeProps.pull || sizeProps.pull === 0, _extends2));
  });
  return h(props.tag, {
    "class": _extends((_extends3 = {}, _extends3["" + prefixCls] = true, _extends3[prefixCls + "-" + span] = span, _extends3[prefixCls + "-order-" + order] = order, _extends3[prefixCls + "-offset-" + offset] = offset, _extends3[prefixCls + "-push-" + push] = push, _extends3[prefixCls + "-pull-" + pull] = pull, _extends3), sizeClassObj)
  }, [slots.default && slots.default()]);
}

Col.props = {
  span: [Number, String],
  offset: [Number, String],
  order: [Number, String],
  pull: [Number, String],
  push: [Number, String],
  xs: [Number, Object],
  sm: [Number, Object],
  md: [Number, Object],
  lg: [Number, Object],
  xl: [Number, Object],
  xxl: [Number, Object],
  tag: {
    type: String,
    default: 'div'
  },
  prefixCls: {
    type: String,
    default: bem()
  }
};
export default createComponent(Col);