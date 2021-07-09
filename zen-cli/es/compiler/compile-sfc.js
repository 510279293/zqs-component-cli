function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import * as compileUtils from '@vue/component-compiler-utils';
import * as compiler from 'vue-template-compiler';
import hash from 'hash-sum';
import { parse } from 'path';
import { remove, writeFileSync, readFileSync } from 'fs-extra';
import { replaceExt } from '../common';
import { compileJs } from './compile-js';
import { compileStyle } from './compile-style';
var RENDER_FN = '__vue_render__';
var STATIC_RENDER_FN = '__vue__staticRenderFns__';
var EXPORT = "export default {"; // trim some unused code

function trim(code) {
  return code.replace(/\/\/\n/g, '').trim();
}

export function parseSfc(filePath) {
  var source = readFileSync(filePath, 'utf-8');
  var descriptor = compileUtils.parse({
    source: source,
    compiler: compiler,
    needMap: false
  });
  return descriptor;
}

function getSfcStylePath(filePath, ext, index) {
  var number = index !== 0 ? "-" + (index + 1) : '';
  return replaceExt(filePath, "-sfc" + number + "." + ext);
}

function injectScopeId(script, scopeId) {
  return script.replace(EXPORT, EXPORT + "\n _scopeId: '" + scopeId + "',\n\n");
}

function injectStyle(script, styles, filePath) {
  if (styles.length) {
    var imports = styles.map(function (style, index) {
      var _parse = parse(getSfcStylePath(filePath, 'css', index)),
          base = _parse.base;

      return "import './" + base + "';";
    }).join('\n');
    return script.replace(EXPORT, imports + "\n\n" + EXPORT);
  }

  return script;
}

function compileTemplate(template) {
  var result = compileUtils.compileTemplate({
    compiler: compiler,
    source: template,
    isProduction: true
  });
  return result.code;
} // inject render fn to script


function injectRender(script, render) {
  script = trim(script);
  render = render.replace('var render', "var " + RENDER_FN).replace('var staticRenderFns', "var " + STATIC_RENDER_FN);
  var nscript = script.replace(EXPORT, render + "\n" + EXPORT + "\n render: " + RENDER_FN + ",\n\n staticRenderFns: " + STATIC_RENDER_FN + ",\n");
  return nscript;
}

export function compileSfc(_x) {
  return _compileSfc.apply(this, arguments);
}

function _compileSfc() {
  _compileSfc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(filePath) {
    var tasks, source, jsFilePath, descriptor, template, styles, hasScoped, scopeId;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tasks = [remove(filePath)];
            source = readFileSync(filePath, 'utf-8');
            jsFilePath = replaceExt(filePath, '.js');
            descriptor = parseSfc(filePath);
            template = descriptor.template, styles = descriptor.styles;
            hasScoped = styles.some(function (s) {
              return s.scoped;
            });
            scopeId = hasScoped ? "data-v-" + hash(source) : ''; // compiler js part

            if (descriptor.script) {
              tasks.push(new Promise(function (resolve, reject) {
                var script = descriptor.script.content;
                script = injectStyle(script, styles, filePath);

                if (template) {
                  var render = compileTemplate(template.content);
                  script = injectRender(script, render);
                }

                if (scopeId) {
                  script = injectScopeId(script, scopeId);
                }

                writeFileSync(jsFilePath, script);
                compileJs(jsFilePath).then(resolve).catch(reject);
              }));
            } // compile style part


            tasks.push.apply(tasks, styles.map(function (style, index) {
              var cssFilePath = getSfcStylePath(filePath, style.lang || 'css', index);
              var styleSource = trim(style.content);

              if (style.scoped) {
                styleSource = compileUtils.compileStyle({
                  id: scopeId,
                  scoped: true,
                  source: styleSource,
                  filename: cssFilePath,
                  preprocessLang: style.lang
                }).code;
              }

              writeFileSync(cssFilePath, styleSource);
              return compileStyle(cssFilePath);
            }));
            return _context.abrupt("return", Promise.all(tasks));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _compileSfc.apply(this, arguments);
}