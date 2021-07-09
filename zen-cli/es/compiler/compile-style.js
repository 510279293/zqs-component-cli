function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { parse } from "path";
import { readFileSync, writeFileSync } from "fs-extra";
import { replaceExt } from "../common";
import { consola } from "../common/logger";
import { compileCss } from "./compile-css";
import { compileLess } from "./compile-less";
import { compileSass } from "./compile-sass";

function compileFile(_x) {
  return _compileFile.apply(this, arguments);
}

function _compileFile() {
  _compileFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(filePath) {
    var parsedPath, _source, _source2, source;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            parsedPath = parse(filePath);
            _context.prev = 1;

            if (!(parsedPath.ext === '.less')) {
              _context.next = 9;
              break;
            }

            _context.next = 5;
            return compileLess(filePath);

          case 5:
            _source = _context.sent;
            _context.next = 8;
            return compileCss(_source);

          case 8:
            return _context.abrupt("return", _context.sent);

          case 9:
            if (!(parsedPath.ext === '.scss')) {
              _context.next = 16;
              break;
            }

            _context.next = 12;
            return compileSass(filePath);

          case 12:
            _source2 = _context.sent;
            _context.next = 15;
            return compileCss(_source2);

          case 15:
            return _context.abrupt("return", _context.sent);

          case 16:
            source = readFileSync(filePath, 'utf-8');
            _context.next = 19;
            return compileCss(source);

          case 19:
            return _context.abrupt("return", _context.sent);

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](1);
            consola.error('Compile style failed: ' + filePath);
            throw _context.t0;

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 22]]);
  }));
  return _compileFile.apply(this, arguments);
}

export function compileStyle(_x2) {
  return _compileStyle.apply(this, arguments);
}

function _compileStyle() {
  _compileStyle = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(filePath) {
    var css;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return compileFile(filePath);

          case 2:
            css = _context2.sent;
            writeFileSync(replaceExt(filePath, '.css'), css);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _compileStyle.apply(this, arguments);
}