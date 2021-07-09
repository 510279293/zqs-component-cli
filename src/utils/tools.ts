import { VNode } from 'vue/types/umd';

export function isDef<T>(val: T): val is NonNullable<T> {
    return val !== undefined && val !== null;
}

export function isFunction(val: unknown): val is Function {
    return typeof val === 'function'
}

export function isObject(val: unknown): val is Record<any, any> {
    return val !== null && typeof val === 'object';
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isValidElement(element: any): boolean {
    return (
        element && 
        typeof element === 'object' &&
        'componentOptions' in element && 
        'context' in element && 
        element.tag !== undefined
    ) // remove text node
} 

export function isEmptyElement(c: any): boolean {
    return !(c.tag || (c.text && c.text.trim() ! == ''))
}

export function filterEmpty(children: Array<any> = []) {
    return children.filter(c => !isEmptyElement(c));
}
