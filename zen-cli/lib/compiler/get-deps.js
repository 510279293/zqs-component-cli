"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeps = exports.fillExt = exports.exists = exports.clearDepsCache = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const constant_1 = require("../common/constant");
let depsMap = {};
let existsCache = {};
const IMPORT_RE = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;
function clearDepsCache() {
    depsMap = {};
    existsCache = {};
}
exports.clearDepsCache = clearDepsCache;
function matchImports(code) {
    return code.match(IMPORT_RE) || [];
}
function exists(filePath) {
    if (!(filePath in existsCache)) {
        existsCache[filePath] = fs_extra_1.existsSync(filePath);
    }
    return existsCache[filePath];
}
exports.exists = exists;
function fillExt(filePath) {
    for (let i = 0; i < constant_1.SCRIPT_EXTS.length; i++) {
        const complatePath = `${filePath}${constant_1.SCRIPT_EXTS[i]}`;
        if (exists(complatePath)) {
            return complatePath;
        }
    }
    for (let i = 0; i < constant_1.SCRIPT_EXTS.length; i++) {
        const complatePath = `${filePath}/index${constant_1.SCRIPT_EXTS[i]}`;
        if (exists(complatePath)) {
            return complatePath;
        }
    }
    return '';
}
exports.fillExt = fillExt;
function getPathByImport(code, filePath) {
    const divider = code.includes('"') ? '"' : "'";
    const relativePath = code.split(divider)[1];
    if (relativePath.includes('.')) {
        return fillExt(path_1.join(filePath, '..', relativePath));
    }
    return null;
}
function getDeps(filePath) {
    if (depsMap[filePath]) {
        return depsMap[filePath];
    }
    const code = fs_extra_1.readFileSync(filePath, 'utf-8');
    const imports = matchImports(code);
    const paths = imports.map(item => getPathByImport(item, filePath))
        .filter(item => !!item);
    depsMap[filePath] = paths;
    paths.forEach(getDeps);
    return paths;
}
exports.getDeps = getDeps;
