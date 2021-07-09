function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { remove, copy, readdirSync } from 'fs-extra';
import { join } from 'path';
import { clean } from './clean';
import { ora, consola } from '../common/logger';
import { installDependencies } from '../common/manager';
import { SRC_DIR, LIB_DIR, ES_DIR } from '../common/constant';
import { compileJs } from '../compiler/compile-js';
import { compileStyle } from '../compiler/compile-style';
import { compileSfc } from '../compiler/compile-sfc';
import { setNodeEnv, setModuleEnv, isDemoDir, isTestDir, isDir, isSfc, isScript, isStyle } from '../common';
import { CSS_LANG } from '../common/css';
import { genStyleDepsMap } from '../compiler/gen-style-deps-map';
import { genComponentStyle } from '../compiler/gen-component-style';

function compileFile(_x) {
  return _compileFile.apply(this, arguments);
}

function _compileFile() {
  _compileFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(filePath) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!isSfc(filePath)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", compileSfc(filePath));

          case 2:
            if (!isScript(filePath)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", compileJs(filePath));

          case 4:
            if (!isStyle(filePath)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", compileStyle(filePath));

          case 6:
            return _context.abrupt("return", remove(filePath));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _compileFile.apply(this, arguments);
}

function compileDir(_x2) {
  return _compileDir.apply(this, arguments);
}

function _compileDir() {
  _compileDir = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dir) {
    var files;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            files = readdirSync(dir);
            _context2.next = 3;
            return Promise.all(files.map(function (filename) {
              var filePath = join(dir, filename);

              if (isDemoDir(filePath) || isTestDir(filePath)) {
                return remove(filePath);
              }

              if (isDir(filePath)) {
                return compileDir(filePath);
              }

              return compileFile(filePath);
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _compileDir.apply(this, arguments);
}

function buildEs() {
  return _buildEs.apply(this, arguments);
}

function _buildEs() {
  _buildEs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            setModuleEnv('esmodule');
            _context3.next = 3;
            return copy(SRC_DIR, ES_DIR);

          case 3:
            _context3.next = 5;
            return compileDir(ES_DIR);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _buildEs.apply(this, arguments);
}

function buildLid() {
  return _buildLid.apply(this, arguments);
}

function _buildLid() {
  _buildLid = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            setModuleEnv('commonjs');
            _context4.next = 3;
            return copy(SRC_DIR, LIB_DIR);

          case 3:
            _context4.next = 5;
            return compileDir(LIB_DIR);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _buildLid.apply(this, arguments);
}

function buildStyleEntry() {
  return _buildStyleEntry.apply(this, arguments);
}

function _buildStyleEntry() {
  _buildStyleEntry = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return genStyleDepsMap();

          case 2:
            genComponentStyle();

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _buildStyleEntry.apply(this, arguments);
}

function buildPackgeEntry() {
  return _buildPackgeEntry.apply(this, arguments);
}

function _buildPackgeEntry() {
  _buildPackgeEntry = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var esEntryFile, libEntryFile, styleEntryFile;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            esEntryFile = join(ES_DIR, 'index.js');
            libEntryFile = join(LIB_DIR, 'index.js');
            styleEntryFile = join(LIB_DIR, "index." + CSS_LANG); // genPackageEntry({
            // })

            setModuleEnv('esmodule');

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _buildPackgeEntry.apply(this, arguments);
}

function buildPackages() {
  return _buildPackages.apply(this, arguments);
}

function _buildPackages() {
  _buildPackages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _buildPackages.apply(this, arguments);
}

var tasks = [{
  text: 'Build ESModule Outputs',
  task: buildEs
}, {
  text: 'Build Commonjs outputs',
  task: buildLid
}, {
  text: 'Build Style Entry',
  task: buildStyleEntry
}, {
  text: 'Build Package Entry',
  task: buildPackgeEntry
} // {
//   text: 'Build Packed Outputs',
//   task: buildPackages
// }
];

function runBuildTasks() {
  return _runBuildTasks.apply(this, arguments);
}

function _runBuildTasks() {
  _runBuildTasks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var i, _tasks$i, task, text, spinner;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < tasks.length)) {
              _context8.next = 18;
              break;
            }

            _tasks$i = tasks[i], task = _tasks$i.task, text = _tasks$i.text;
            spinner = ora(text).start();
            _context8.prev = 4;
            _context8.next = 7;
            return task();

          case 7:
            spinner.succeed(text);
            _context8.next = 15;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](4);
            spinner.fail(text);
            console.log(_context8.t0);
            throw _context8.t0;

          case 15:
            i++;
            _context8.next = 1;
            break;

          case 18:
            consola.success('Compile successfully');

          case 19:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[4, 10]]);
  }));
  return _runBuildTasks.apply(this, arguments);
}

export function build(_x3) {
  return _build.apply(this, arguments);
}

function _build() {
  _build = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(cmd) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (cmd === void 0) {
              cmd = {};
            }

            console.log('hello, i am build');
            setNodeEnv('production');
            _context9.prev = 3;
            _context9.next = 6;
            return clean();

          case 6:
            _context9.next = 8;
            return installDependencies();

          case 8:
            _context9.next = 10;
            return runBuildTasks();

          case 10:
            _context9.next = 16;
            break;

          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](3);
            console.error('Build failed');
            process.exit(-1);

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[3, 12]]);
  }));
  return _build.apply(this, arguments);
}