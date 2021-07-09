import Vue from 'vue';

export {createNamespace} from './create';
export {addUnit} from './format/unit';

export {isDef, isFunction, isObject, isPromise, isValidElement} from './tools'

export const inBrowser = typeof window !== 'undefined';
export const isServer: boolean = Vue.prototype.$isServer;
