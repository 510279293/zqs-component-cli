function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import execa from 'execa';
import consola from 'consola';
import { execSync } from 'child_process';
var hasYarnCache;
export function hasYarn() {
  if (hasYarnCache === undefined) {
    try {
      execSync('yarn --version', {
        stdio: 'ignore'
      });
      hasYarnCache = true;
    } catch (e) {
      hasYarnCache = false;
    }
  }

  return hasYarnCache;
}
export function installDependencies() {
  return _installDependencies.apply(this, arguments);
}

function _installDependencies() {
  _installDependencies = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var manager;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            consola.info('Install Dependencies\n');
            _context.prev = 1;
            manager = hasYarn() ? 'yarn' : 'npm';
            _context.next = 5;
            return execa(manager, ['install', '--prod=false'], {
              stdio: 'inherit'
            });

          case 5:
            console.log('');
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            consola.log(_context.t0);
            throw _context.t0;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));
  return _installDependencies.apply(this, arguments);
}