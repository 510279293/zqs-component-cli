// utils
import { createNamespace, isValidElement } from '../utils';
import Icon from '../icon';

var _createNamespace = createNamespace('alert'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var props = {
  closable: Boolean,
  closeText: String,
  message: String,
  description: String,
  showIcon: Boolean,
  iconType: String,
  banner: Boolean,
  icon: null,
  tag: {
    type: String,
    default: 'div'
  },
  type: {
    type: String,
    default: 'info'
  },
  afterClose: {
    type: Function,
    default: function _default() {}
  }
};
export default createComponent({
  props: props,
  data: function data() {
    return {
      closing: false,
      closed: false
    };
  },
  methods: {
    handleClose: function handleClose(e) {
      this.closing = true;
      this.$emit('close', e);
    }
  },
  render: function render(h) {
    var _bem;

    var tag = this.tag,
        banner = this.banner,
        closeText = this.closeText,
        description = this.description,
        message = this.message,
        closing = this.closing,
        closed = this.closed,
        icon = this.icon;
    var closable = this.closable,
        type = this.type,
        showIcon = this.showIcon,
        iconType = this.iconType; // banner 模式下默认有 Icon

    showIcon = banner && showIcon === undefined ? true : showIcon; // banner 模式下默认警告

    type = banner && type === undefined ? 'warning' : type || 'info';
    var iconTheme = 'filled';

    if (!iconType) {
      switch (type) {
        case 'success':
          iconType = 'success';
          break;

        case 'info':
          iconType = 'prompt';
          break;

        case 'error':
          iconType = 'close-circle';
          break;

        case 'warning':
          iconType = 'prompt';
          break;

        default:
          iconType = 'default';
      }

      description && (iconTheme = 'outlined');
    }

    closeText && (closable = true);
    var prefixCls = bem();
    var classes = bem((_bem = {}, _bem[type] = true, _bem.closing = closing, _bem['with-description'] = !!description, _bem['no-icon'] = !showIcon, _bem['banner'] = !!banner, _bem.closable = closable, _bem));
    var closeIcon = closable ? h("a", {
      "attrs": {
        "type": "button",
        "tabIndex": 0
      },
      "class": prefixCls + "-close-icon",
      "on": {
        "click": this.handleClose
      }
    }, [closeText ? h("span", {
      "class": prefixCls + "-close-text"
    }, [closeText]) : h(Icon, {
      "attrs": {
        "type": "close"
      }
    })]) : null;
    var iconNode = icon && (isValidElement(icon) ? h(icon, {
      class: prefixCls + "-icon"
    }) : h("span", {
      "class": prefixCls + "-icon"
    }, [icon])) || h(Icon, {
      "class": prefixCls + "-icon",
      "attrs": {
        "type": iconType,
        "theme": iconTheme
      }
    });
    return closed ? null : h("transition", [h(tag, {
      "class": classes,
      "directives": [{
        name: "show",
        value: !closing
      }],
      "attrs": {
        "data-show": !closing
      }
    }, [showIcon ? iconNode : null, h("span", {
      "class": prefixCls + "-message"
    }, [message]), h("span", {
      "class": prefixCls + "-description"
    }, [description]), closeIcon])]);
  }
});