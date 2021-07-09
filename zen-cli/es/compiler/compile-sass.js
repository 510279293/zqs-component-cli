function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { renderSync } from "sass";
export function compileSass(_x) {
  return _compileSass.apply(this, arguments);
}

function _compileSass() {
  _compileSass = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(filePath) {
    var _renderSync, css;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _renderSync = renderSync({
              file: filePath
            }), css = _renderSync.css;
            return _context.abrupt("return", css);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _compileSass.apply(this, arguments);
}