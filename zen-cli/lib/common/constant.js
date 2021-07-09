"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZenConfig = exports.STYLE_DIR = exports.SRC_DIR = exports.getPackageJson = exports.STYLE_EXTS = exports.SCRIPT_EXTS = exports.POSTCSS_CONFIG_FILE = exports.STYPE_DEPS_JSON_FILE = exports.CONFIG_DIR = exports.DIST_DIR = exports.ZEN_CONFIG_FILE = exports.PACKAGE_JSON_FILE = exports.ROOT_POSTCSS_CONFIG_FILE = exports.LIB_DIR = exports.ES_DIR = exports.ROOT = exports.CWD = void 0;
//@ts-ignore
const lodash_1 = require("lodash");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
function findRootDir(dir) {
    if (dir === '/') {
        return '/';
    }
    if (fs_extra_1.existsSync(path_1.join(dir, 'zen.config.js'))) {
        return dir;
    }
    return findRootDir(path_1.dirname(dir));
}
function getSrcDir() {
    const zenConfig = getZenConfig();
    const srcDir = lodash_1.get(zenConfig, 'build.srcDir');
    if (srcDir) {
        if (path_1.isAbsolute(srcDir)) {
            return srcDir;
        }
        return path_1.join(exports.ROOT, srcDir);
    }
    return path_1.join(exports.ROOT, 'src');
}
// root paths
exports.CWD = process.cwd();
exports.ROOT = findRootDir(exports.CWD);
exports.ES_DIR = path_1.join(exports.ROOT, 'es');
exports.LIB_DIR = path_1.join(exports.ROOT, 'lib');
exports.ROOT_POSTCSS_CONFIG_FILE = path_1.join(exports.ROOT, 'postcss.config.js');
exports.PACKAGE_JSON_FILE = path_1.join(exports.ROOT, 'package.json');
exports.ZEN_CONFIG_FILE = path_1.join(exports.ROOT, 'zen.config.js');
// relative paths
exports.DIST_DIR = path_1.join(__dirname, '../../dist');
exports.CONFIG_DIR = path_1.join(__dirname, '../config');
// Dist files
exports.STYPE_DEPS_JSON_FILE = path_1.join(exports.DIST_DIR, 'style-deps.json');
// config file 
exports.POSTCSS_CONFIG_FILE = path_1.join(exports.CONFIG_DIR, 'postcss.config.js');
exports.SCRIPT_EXTS = ['.js', '.jsx', '.vue', '.ts', '.tsx'];
exports.STYLE_EXTS = ['.css', '.less', '.scss'];
function getPackageJson() {
    delete require.cache[exports.PACKAGE_JSON_FILE];
    return require(exports.PACKAGE_JSON_FILE);
}
exports.getPackageJson = getPackageJson;
exports.SRC_DIR = getSrcDir();
exports.STYLE_DIR = path_1.join(exports.SRC_DIR, 'style');
function getZenConfig() {
    delete require.cache[exports.ZEN_CONFIG_FILE];
    try {
        return require(exports.ZEN_CONFIG_FILE);
    }
    catch (err) {
        return {};
    }
}
exports.getZenConfig = getZenConfig;
