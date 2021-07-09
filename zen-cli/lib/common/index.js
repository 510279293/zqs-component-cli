"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZenConfig = exports.getWebpackConfig = exports.smartOutputFile = exports.getPostcssConfig = exports.replaceExt = exports.isStyle = exports.isScript = exports.isDir = exports.isSfc = exports.isTestDir = exports.isDemoDir = exports.setBuildTarget = exports.setModuleEnv = exports.setNodeEnv = exports.getComponents = exports.normalizePath = exports.pascalize = exports.camelize = exports.hasDefaultExport = exports.ENTRY_EXTS = exports.SCRIPT_REGEXP = exports.STYLE_REGEXP = exports.TEST_REGEXP = exports.DEMO_REGEXP = exports.SFC_REGEXP = exports.EXT_REGEXP = void 0;
const fs_extra_1 = require("fs-extra");
const constant_1 = require("./constant");
Object.defineProperty(exports, "getZenConfig", { enumerable: true, get: function () { return constant_1.getZenConfig; } });
const webpack_merge_1 = __importDefault(require("webpack-merge"));
const path_1 = require("path");
exports.EXT_REGEXP = /\.\w+$/;
exports.SFC_REGEXP = /\.(vue)$/;
exports.DEMO_REGEXP = new RegExp('\\' + path_1.sep + 'demo$');
exports.TEST_REGEXP = new RegExp('\\' + path_1.sep + 'test$');
exports.STYLE_REGEXP = /\.(css|less|scss)$/;
exports.SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/;
exports.ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue'];
const camelizeRE = /-(\w)/g;
const pascalizeRE = /(\w)(\w*)/g;
function hasDefaultExport(code) {
    return code.includes('export default') || code.includes('export { default }');
}
exports.hasDefaultExport = hasDefaultExport;
function camelize(str) {
    return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}
exports.camelize = camelize;
function pascalize(str) {
    return camelize(str).replace(pascalizeRE, (_, c1, c2) => c1.toUpperCase() + c2);
}
exports.pascalize = pascalize;
function normalizePath(path) {
    return path.replace(/\\/g, '/');
}
exports.normalizePath = normalizePath;
function getComponents() {
    const EXCLUDES = ['.DS_Store'];
    const dirs = fs_extra_1.readdirSync(constant_1.SRC_DIR);
    return dirs.filter((dir) => !EXCLUDES.includes(dir))
        .filter((dir) => exports.ENTRY_EXTS.some((ext) => {
        const path = path_1.join(constant_1.SRC_DIR, dir, `index.${ext}`);
        if (fs_extra_1.existsSync(path)) {
            return hasDefaultExport(fs_extra_1.readFileSync(path, 'utf-8'));
        }
        return false;
    }));
}
exports.getComponents = getComponents;
function setNodeEnv(value) {
    process.env.NODE_ENV = value;
}
exports.setNodeEnv = setNodeEnv;
function setModuleEnv(value) {
    process.env.BABEL_MODULE = value;
}
exports.setModuleEnv = setModuleEnv;
function setBuildTarget(value) {
    process.env.NODE_ENV = value;
}
exports.setBuildTarget = setBuildTarget;
function isDemoDir(dir) {
    return exports.DEMO_REGEXP.test(dir);
}
exports.isDemoDir = isDemoDir;
function isTestDir(dir) {
    return exports.TEST_REGEXP.test(dir);
}
exports.isTestDir = isTestDir;
function isSfc(path) {
    return exports.SFC_REGEXP.test(path);
}
exports.isSfc = isSfc;
function isDir(dir) {
    return fs_extra_1.lstatSync(dir).isDirectory();
}
exports.isDir = isDir;
function isScript(path) {
    return exports.SCRIPT_REGEXP.test(path);
}
exports.isScript = isScript;
function isStyle(path) {
    return exports.STYLE_REGEXP.test(path);
}
exports.isStyle = isStyle;
function replaceExt(path, ext) {
    return path.replace(exports.EXT_REGEXP, ext);
}
exports.replaceExt = replaceExt;
function getPostcssConfig() {
    if (fs_extra_1.existsSync(constant_1.ROOT_POSTCSS_CONFIG_FILE)) {
        return require(constant_1.ROOT_POSTCSS_CONFIG_FILE);
    }
    return {};
}
exports.getPostcssConfig = getPostcssConfig;
// smarter outputFileSync
// skip output if file content unchanged
function smartOutputFile(filePath, content) {
    if (fs_extra_1.existsSync(filePath)) {
        const previousContent = fs_extra_1.readFileSync(filePath, 'utf-8');
        if (previousContent === content) {
            return;
        }
    }
    fs_extra_1.outputFileSync(filePath, content);
}
exports.smartOutputFile = smartOutputFile;
function getWebpackConfig(defaultConfig) {
    if (fs_extra_1.existsSync(constant_1.ROOT_POSTCSS_CONFIG_FILE)) {
        const config = require(constant_1.ROOT_POSTCSS_CONFIG_FILE);
        // 如果是函数形式，可能并不仅仅是添加额外的处理流程，而是在原有流程上进行修改
        // 比如修改markdown-loader,添加options.enableMetaData
        if (typeof config === 'function') {
            return config(defaultConfig);
        }
        return webpack_merge_1.default(defaultConfig, config);
    }
    return defaultConfig;
}
exports.getWebpackConfig = getWebpackConfig;
