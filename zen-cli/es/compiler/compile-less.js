function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import { readFileSync } from "fs-extra";
import { render, FileManager } from 'less';

var TildeResolver = /*#__PURE__*/function (_FileManager) {
  _inheritsLoose(TildeResolver, _FileManager);

  function TildeResolver() {
    return _FileManager.apply(this, arguments) || this;
  }

  var _proto = TildeResolver.prototype;

  _proto.loadFile = function loadFile(filename) {
    filename = filename.replace('~', ''); //@ts-ignore

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return FileManager.prototype.loadFile.apply(this, [filename].concat(args));
  };

  return TildeResolver;
}(FileManager);

var TildeResolverPlugin = {
  install: function install(lessInstance, pluginManager) {
    pluginManager.addFileManager(new TildeResolver());
  }
};
export function compileLess(_x) {
  return _compileLess.apply(this, arguments);
}

function _compileLess() {
  _compileLess = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(filePath) {
    var source, _yield$render, css;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            source = readFileSync(filePath, 'utf-8');
            _context.next = 3;
            return render(source, {
              filename: filePath,
              javascriptEnabled: true,
              plugins: [TildeResolverPlugin]
            });

          case 3:
            _yield$render = _context.sent;
            css = _yield$render.css;
            return _context.abrupt("return", css);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _compileLess.apply(this, arguments);
}