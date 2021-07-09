import { join } from 'path';
import { existsSync, readFileSync } from "fs-extra";
import { SCRIPT_EXTS } from "../common/constant";
var depsMap = {};
var existsCache = {};
var IMPORT_RE = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;
export function clearDepsCache() {
  depsMap = {};
  existsCache = {};
}

function matchImports(code) {
  return code.match(IMPORT_RE) || [];
}

export function exists(filePath) {
  if (!(filePath in existsCache)) {
    existsCache[filePath] = existsSync(filePath);
  }

  return existsCache[filePath];
}
export function fillExt(filePath) {
  for (var i = 0; i < SCRIPT_EXTS.length; i++) {
    var complatePath = "" + filePath + SCRIPT_EXTS[i];

    if (exists(complatePath)) {
      return complatePath;
    }
  }

  for (var _i = 0; _i < SCRIPT_EXTS.length; _i++) {
    var _complatePath = filePath + "/index" + SCRIPT_EXTS[_i];

    if (exists(_complatePath)) {
      return _complatePath;
    }
  }

  console.log(existsCache);
  return '';
}

function getPathByImport(code, filePath) {
  var divider = code.includes('"') ? '"' : "'";
  var relativePath = code.split(divider)[1];

  if (relativePath.includes('.')) {
    return fillExt(join(filePath, '..', relativePath));
  }

  return null;
}

export function getDeps(filePath) {
  if (depsMap[filePath]) {
    return depsMap[filePath];
  }

  var code = readFileSync(filePath, 'utf-8');
  var imports = matchImports(code);
  var paths = imports.map(function (item) {
    return getPathByImport(item, filePath);
  }).filter(function (item) {
    return !!item;
  });
  depsMap[filePath] = paths;
  paths.forEach(getDeps);
  return paths;
}