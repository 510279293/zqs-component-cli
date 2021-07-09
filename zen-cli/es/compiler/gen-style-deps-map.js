function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { existsSync } from 'fs-extra';
import { join, relative, sep } from 'path';
import { getComponents, smartOutputFile } from "../common";
import { SRC_DIR, STYPE_DEPS_JSON_FILE } from "../common/constant";
import { CSS_LANG } from '../common/css';
import { clearDepsCache, fillExt, getDeps } from "./get-deps";

function mathchPath(path, component) {
  var p = relative(SRC_DIR, path);
  var arr = p.split(sep);
  return arr.includes(component);
}

function getStylePath(component) {
  return join(SRC_DIR, component + "/index." + CSS_LANG);
}

export function checkStyleExists(component) {
  return existsSync(getStylePath(component));
} // analyze component dependencies

function analyzeComponentDeps(components, component) {
  var checkList = [];
  var componentEntry = fillExt(join(SRC_DIR, component, 'index'));
  var record = new Set();

  function search(filePath) {
    record.add(filePath);
    getDeps(filePath).forEach(function (key) {
      if (record.has(key)) {
        return;
      }

      search(key);
      components.filter(function (item) {
        return mathchPath(key, item);
      }).forEach(function (item) {
        if (!checkList.includes(item) && item !== component) {
          checkList.push(item);
        }
      });
    });
  }

  search(componentEntry);
  return checkList.filter(checkStyleExists);
}

function getSequence(components, depsMap) {
  var sequence = [];
  var record = new Set();

  function add(item) {
    var deps = depsMap[item];

    if (sequence.includes(item) || !deps) {
      return;
    }

    if (record.has(item)) {
      sequence.push(item);
      return;
    }

    record.add(item);

    if (!deps.length) {
      sequence.push(item);
      return;
    }

    deps.forEach(add);

    if (sequence.includes(item)) {
      return;
    }

    var maxIndex = Math.max.apply(Math, deps.map(function (dep) {
      return sequence.indexOf(dep);
    }));
    sequence.splice(maxIndex + 1, 0, item);
  }

  components.forEach(add);
  return sequence;
}

export function genStyleDepsMap() {
  return _genStyleDepsMap.apply(this, arguments);
}

function _genStyleDepsMap() {
  _genStyleDepsMap = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var components;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            components = getComponents();
            return _context.abrupt("return", new Promise(function (resolve) {
              clearDepsCache();
              var map = {};
              components.forEach(function (component) {
                map[component] = analyzeComponentDeps(components, component);
              });
              var sequence = getSequence(components, map);
              Object.keys(map).forEach(function (key) {
                map[key] = map[key].sort(function (a, b) {
                  return sequence.indexOf(a) - sequence.indexOf(b);
                });
              });
              smartOutputFile(STYPE_DEPS_JSON_FILE, JSON.stringify({
                map: map,
                sequence: sequence
              }, null, 2));
              resolve(undefined);
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _genStyleDepsMap.apply(this, arguments);
}