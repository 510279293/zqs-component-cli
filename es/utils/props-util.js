function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import isPlainObject from 'lodash/isPlainObject';
import classNames from 'classnames';

function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

var camelizeRE = /-(\w)/g;

var camelize = function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
};

var parseStyleText = function parseStyleText(cssText, camel) {
  if (cssText === void 0) {
    cssText = '';
  }

  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);

      if (tmp.length > 1) {
        var k = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k] = tmp[1].trim();
      }
    }
  });
  return res;
};

var hasProp = function hasProp(instance, prop) {
  var $options = instance.$options || {};
  var propsData = $options.propsData || {};
  return prop in propsData;
};

var slotHasProp = function slotHasProp(slot, prop) {
  var $options = slot.componentOptions || {};
  var propsData = $options.propsData || {};
  return prop in propsData;
};

var filterProps = function filterProps(props, propsData) {
  if (propsData === void 0) {
    propsData = {};
  }

  var res = {};
  Object.keys(props).forEach(function (k) {
    if (k in propsData || props[k] !== undefined) {
      res[k] = props[k];
    }
  });
  return res;
};

var getScopedSlots = function getScopedSlots(ele) {
  return ele.data && ele.data.scopedSlots || {};
};

var getSlots = function getSlots(ele) {
  var componentOptions = ele.componentOptions || {};

  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions || {};
  }

  var children = ele.children || componentOptions.children || [];
  var slots = {};
  children.forEach(function (child) {
    if (!isEmptyElement(child)) {
      var name = child.data && child.data.slot || 'default';
      slots[name] = slots[name] || [];
      slots[name].push(child);
    }
  });
  return _extends({}, slots, getScopedSlots(ele));
};

var getSlot = function getSlot(self, name, options) {
  if (name === void 0) {
    name = 'default';
  }

  if (options === void 0) {
    options = {};
  }

  return self.$scopedSlots && self.$scopedSlots[name] && self.$scopedSlots[name](options) || self.$slots[name] || [];
};

var getAllChildren = function getAllChildren(ele) {
  var componentOptions = ele.componentOptions || {};

  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions || {};
  }

  return ele.children || componentOptions.children || [];
};

var getSlotOptions = function getSlotOptions(ele) {
  if (ele.fnOptions) {
    // 函数式组件
    return ele.fnOptions;
  }

  var componentOptions = ele.componentOptions;

  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions;
  }

  return componentOptions ? componentOptions.Ctor.options || {} : {};
};

var getOptionProps = function getOptionProps(instance) {
  if (instance.componentOptions) {
    var componentOptions = instance.componentOptions;
    var _componentOptions$pro = componentOptions.propsData,
        propsData = _componentOptions$pro === void 0 ? {} : _componentOptions$pro,
        _componentOptions$Cto = componentOptions.Ctor,
        Ctor = _componentOptions$Cto === void 0 ? {} : _componentOptions$Cto;
    var props = (Ctor.options || {}).props || {};
    var res = {};

    for (var _i = 0, _Object$entries = Object.entries(props); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _Object$entries[_i],
          k = _Object$entries$_i[0],
          v = _Object$entries$_i[1];
      var def = v.default;

      if (def !== undefined) {
        res[k] = typeof def === 'function' && getType(v.type) !== 'Function' ? def.call(instance) : def;
      }
    }

    return _extends({}, res, propsData);
  }

  var _instance$$options = instance.$options,
      $options = _instance$$options === void 0 ? {} : _instance$$options,
      _instance$$props = instance.$props,
      $props = _instance$$props === void 0 ? {} : _instance$$props;
  return filterProps($props, $options.propsData);
};

var getComponentFromProp = function getComponentFromProp(instance, prop, options, execute) {
  if (options === void 0) {
    options = instance;
  }

  if (execute === void 0) {
    execute = true;
  }

  if (instance.$createElement) {
    var h = instance.$createElement;
    var temp = instance[prop];

    if (temp !== undefined) {
      return typeof temp === 'function' && execute ? temp(h, options) : temp;
    }

    return instance.$scopedSlots[prop] && execute && instance.$scopedSlots[prop](options) || instance.$scopedSlots[prop] || instance.$slots[prop] || undefined;
  } else {
    var _h = instance.context.$createElement;
    var _temp = getPropsData(instance)[prop];

    if (_temp !== undefined) {
      return typeof _temp === 'function' && execute ? _temp(_h, options) : _temp;
    }

    var slotScope = getScopedSlots(instance)[prop];

    if (slotScope !== undefined) {
      return typeof slotScope === 'function' && execute ? slotScope(_h, options) : slotScope;
    }

    var slotsProp = [];
    var componentOptions = instance.componentOptions || {};
    (componentOptions.children || []).forEach(function (child) {
      if (child.data && child.data.slot === prop) {
        if (child.data.attrs) {
          delete child.data.attrs.slot;
        }

        if (child.tag === 'template') {
          slotsProp.push(child.children);
        } else {
          slotsProp.push(child);
        }
      }
    });
    return slotsProp.length ? slotsProp : undefined;
  }
};

var getAllProps = function getAllProps(ele) {
  var data = ele.data || {};
  var componentOptions = ele.componentOptions || {};

  if (ele.$vnode) {
    data = ele.$vnode.data || {};
    componentOptions = ele.$vnode.componentOptions || {};
  }

  return _extends({}, data.props, data.attrs, componentOptions.propsData);
};

var getPropsData = function getPropsData(ele) {
  var componentOptions = ele.componentOptions;

  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions;
  }

  return componentOptions ? componentOptions.propsData || {} : {};
};

var getValueByProp = function getValueByProp(ele, prop) {
  return getPropsData(ele)[prop];
};

var getAttrs = function getAttrs(ele) {
  var data = ele.data;

  if (ele.$vnode) {
    data = ele.$vnode.data;
  }

  return data ? data.attrs || {} : {};
};

var getKey = function getKey(ele) {
  var key = ele.key;

  if (ele.$vnode) {
    key = ele.$vnode.key;
  }

  return key;
};

export function getEvents(child) {
  var events = {};

  if (child.componentOptions && child.componentOptions.listeners) {
    events = child.componentOptions.listeners;
  } else if (child.data && child.data.on) {
    events = child.data.on;
  }

  return _extends({}, events);
} // 获取 xxx.native 或者 原生标签 事件

export function getDataEvents(child) {
  var events = {};

  if (child.data && child.data.on) {
    events = child.data.on;
  }

  return _extends({}, events);
} // use getListeners instead this.$listeners
// https://github.com/vueComponent/ant-design-vue/issues/1705

export function getListeners(context) {
  return (context.$vnode ? context.$vnode.componentOptions.listeners : context.$listeners) || {};
}
export function getClass(ele) {
  var data = {};

  if (ele.data) {
    data = ele.data;
  } else if (ele.$vnode && ele.$vnode.data) {
    data = ele.$vnode.data;
  }

  var tempCls = data.class || {};
  var staticClass = data.staticClass;
  var cls = {};
  staticClass && staticClass.split(' ').forEach(function (c) {
    cls[c.trim()] = true;
  });

  if (typeof tempCls === 'string') {
    tempCls.split(' ').forEach(function (c) {
      cls[c.trim()] = true;
    });
  } else if (Array.isArray(tempCls)) {
    classNames(tempCls).split(' ').forEach(function (c) {
      cls[c.trim()] = true;
    });
  } else {
    cls = _extends({}, cls, tempCls);
  }

  return cls;
}
export function getStyle(ele, camel) {
  var data = {};

  if (ele.data) {
    data = ele.data;
  } else if (ele.$vnode && ele.$vnode.data) {
    data = ele.$vnode.data;
  }

  var style = data.style || data.staticStyle;

  if (typeof style === 'string') {
    style = parseStyleText(style, camel);
  } else if (camel && style) {
    // 驼峰化
    var res = {};
    Object.keys(style).forEach(function (k) {
      return res[camelize(k)] = style[k];
    });
    return res;
  }

  return style;
}
export function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}
export function isEmptyElement(c) {
  return !(c.tag || c.text && c.text.trim() !== '');
}
export function isStringElement(c) {
  return !c.tag;
}
export function filterEmpty(children) {
  if (children === void 0) {
    children = [];
  }

  return children.filter(function (c) {
    return !isEmptyElement(c);
  });
}

var initDefaultProps = function initDefaultProps(propTypes, defaultProps) {
  Object.keys(defaultProps).forEach(function (k) {
    if (propTypes[k]) {
      propTypes[k].def && (propTypes[k] = propTypes[k].def(defaultProps[k]));
    } else {
      throw new Error("not have " + k + " prop");
    }
  });
  return propTypes;
};

export function mergeProps() {
  var args = [].slice.call(arguments, 0);
  var props = {};
  args.forEach(function (p) {
    if (p === void 0) {
      p = {};
    }

    for (var _i2 = 0, _Object$entries2 = Object.entries(p); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _Object$entries2[_i2],
          k = _Object$entries2$_i[0],
          v = _Object$entries2$_i[1];
      props[k] = props[k] || {};

      if (isPlainObject(v)) {
        Object.assign(props[k], v);
      } else {
        props[k] = v;
      }
    }
  });
  return props;
}

function isValidElement(element) {
  return element && typeof element === 'object' && 'componentOptions' in element && 'context' in element && element.tag !== undefined; // remove text node
}

export { hasProp, filterProps, getOptionProps, getComponentFromProp, getSlotOptions, slotHasProp, getPropsData, getKey, getAttrs, getValueByProp, parseStyleText, initDefaultProps, isValidElement, camelize, getSlots, getSlot, getAllProps, getAllChildren };
export default hasProp;