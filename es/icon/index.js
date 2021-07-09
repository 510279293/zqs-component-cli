import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
// Utils
import { createNamespace, addUnit } from '../utils';
import { inherit } from '../utils/functional'; // Components
// import Info from '../info';
// Types

var _createNamespace = createNamespace('icon'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function Icon(h, props, slots, ctx) {
  var type = props.type,
      color = props.color,
      size = props.size;
  var classes = [bem([type])];
  return h(props.tag, _mergeJSXProps([{
    "class": classes,
    "style": {
      color: color,
      fontSize: addUnit(size)
    }
  }, inherit(ctx, true)]), [slots.default && slots.default()]);
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
export default createComponent(Icon);