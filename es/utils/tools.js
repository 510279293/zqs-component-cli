export function isDef(val) {
  return val !== undefined && val !== null;
}
export function isFunction(val) {
  return typeof val === 'function';
}
export function isObject(val) {
  return val !== null && typeof val === 'object';
}
export function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
export function isValidElement(element) {
  return element && typeof element === 'object' && 'componentOptions' in element && 'context' in element && element.tag !== undefined; // remove text node
}
export function isEmptyElement(c) {
  return !(c.tag || c.text && c.text.trim() == '');
}
export function filterEmpty(children) {
  if (children === void 0) {
    children = [];
  }

  return children.filter(function (c) {
    return !isEmptyElement(c);
  });
}