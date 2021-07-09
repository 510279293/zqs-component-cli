import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
// utils
import { createNamespace } from '../utils';
import { emit, inherit } from '../utils/functional';
import { functionalRoute } from '../utils/router'; // Components

import Icon from '../icon'; // Types

var _createNamespace = createNamespace('button'),
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
      emit(ctx, 'click', event);
      functionalRoute(ctx);
    }
  } // const children = filterEmpty(slots.default())


  var _slots = slots.default && slots.default();

  var classes = [bem((_bem = {}, _bem[type] = type, _bem[shape] = shape, _bem[size] = size, _bem.loading = loading, _bem.disabled = disabled, _bem.block = block, _bem))];

  function renderIcon() {
    if (loading) {
      return slots.loading ? slots.loading() : h(Icon, {
        "attrs": {
          "type": 'loading'
        },
        "style": {
          fontWeight: 600
        }
      });
    }

    if (icon) {
      return h(Icon, {
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

  return h(tag, _mergeJSXProps([{
    "style": style,
    "class": classes,
    "attrs": {
      "type": htmlType || 'button',
      "disabled": disabled
    }
  }, inherit(ctx)]), [renderContent()]);
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
export default createComponent(Button);