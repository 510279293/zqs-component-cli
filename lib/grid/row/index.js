"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../../utils");

var _createNamespace = (0, _utils.createNamespace)('row'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

var _default = createComponent({
  props: {
    type: String,
    align: String,
    justify: String,
    tag: {
      type: String,
      default: 'div'
    },
    gutter: {
      type: [Number, String],
      default: 0
    }
  },
  render: function render() {
    var _ref;

    var h = arguments[0];
    var align = this.align,
        justify = this.justify,
        type = this.type;
    var flex = type === 'flex';
    var prefixCls = bem();
    return h(this.tag, {
      "class": (_ref = {}, _ref[prefixCls] = !flex, _ref[prefixCls + "-" + type] = flex, _ref[prefixCls + "-" + type + "-" + align] = flex && align, _ref[prefixCls + "-" + type + "-" + justify] = flex && justify, _ref)
    }, [this.slots()]);
  }
});

exports.default = _default;