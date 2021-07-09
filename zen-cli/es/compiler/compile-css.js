function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import postcss from 'postcss';
import postcssrc from 'postcss-load-config';
import CleanCss from 'clean-css';
import { POSTCSS_CONFIG_FILE } from '../common/constant';
var cleanCss = new CleanCss();
export function compileCss(_x) {
  return _compileCss.apply(this, arguments);
}

function _compileCss() {
  _compileCss = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
    var config, _yield$postcss$proces, css;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return postcssrc({}, POSTCSS_CONFIG_FILE);

          case 2:
            config = _context.sent;
            _context.next = 5;
            return postcss(config.plugins).process(source, {
              from: undefined
            });

          case 5:
            _yield$postcss$proces = _context.sent;
            css = _yield$postcss$proces.css;
            return _context.abrupt("return", cleanCss.minify(css).styles);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _compileCss.apply(this, arguments);
}