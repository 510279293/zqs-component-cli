// utils
import { createNamespace } from '../utils'; // Types

var _createNamespace = createNamespace('button-group'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function ButtonGroup(h, props, slots, ctx) {
  var classes = [bem()];
  return h("section", {
    "class": classes
  }, [slots.default && slots.default()]);
}

ButtonGroup.props = {};
export default createComponent(ButtonGroup);