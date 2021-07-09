import { lstatSync, existsSync, readdirSync, readFileSync, outputFileSync } from 'fs-extra';
import { ROOT_POSTCSS_CONFIG_FILE, SRC_DIR } from './constant';
import { sep, join } from 'path';
export var EXT_REGEXP = /\.\w+$/;
export var SFC_REGEXP = /\.(vue)$/;
export var DEMO_REGEXP = new RegExp('\\' + sep + 'demo$');
export var TEST_REGEXP = new RegExp('\\' + sep + 'test$');
export var STYLE_REGEXP = /\.(css|less|scss)$/;
export var SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/;
export var ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue'];
export function hasDefaultExport(code) {
  return code.includes('export default') || code.includes('export { default }');
}
export function getComponents() {
  var EXCLUDES = ['.DS_Store'];
  var dirs = readdirSync(SRC_DIR);
  return dirs.filter(function (dir) {
    return !EXCLUDES.includes(dir);
  }).filter(function (dir) {
    return ENTRY_EXTS.some(function (ext) {
      var path = join(SRC_DIR, dir, "index." + ext);

      if (existsSync(path)) {
        return hasDefaultExport(readFileSync(path, 'utf-8'));
      }

      return false;
    });
  });
}
export function setNodeEnv(value) {
  process.env.NODE_ENV = value;
}
export function setModuleEnv(value) {
  process.env.BABEL_MODULE = value;
}
export function isDemoDir(dir) {
  return DEMO_REGEXP.test(dir);
}
export function isTestDir(dir) {
  return TEST_REGEXP.test(dir);
}
export function isSfc(path) {
  return SFC_REGEXP.test(path);
}
export function isDir(dir) {
  return lstatSync(dir).isDirectory();
}
export function isScript(path) {
  return SCRIPT_REGEXP.test(path);
}
export function isStyle(path) {
  return STYLE_REGEXP.test(path);
}
export function replaceExt(path, ext) {
  return path.replace(EXT_REGEXP, ext);
}
export function getPostcssConfig() {
  if (existsSync(ROOT_POSTCSS_CONFIG_FILE)) {
    return require(ROOT_POSTCSS_CONFIG_FILE);
  }

  return {};
} // smarter outputFileSync
// skip output if file content unchanged

export function smartOutputFile(filePath, content) {
  if (existsSync(filePath)) {
    var previousContent = readFileSync(filePath, 'utf-8');

    if (previousContent === content) {
      return;
    }
  }

  outputFileSync(filePath, content);
}