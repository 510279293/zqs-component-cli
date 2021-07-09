import Vue from 'vue';
export { createNamespace } from './create';
export { addUnit } from './format/unit';
export { isDef, isFunction, isObject, isPromise, isValidElement } from './tools';
export var inBrowser = typeof window !== 'undefined';
export var isServer = Vue.prototype.$isServer;