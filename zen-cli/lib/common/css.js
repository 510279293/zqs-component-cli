"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCssBaseFile = exports.replaceCssImport = exports.CSS_LANG = void 0;
//@ts-ignore
const lodash_1 = require("lodash");
const common_1 = require("../common");
const constant_1 = require("./constant");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
function getCssLang() {
    // 暂时写上死用 less
    return 'less';
}
exports.CSS_LANG = getCssLang();
const IMPORT_STYLE_RE = /import\s+?(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;
// "import 'a.less'; => import 'a.css' "
function replaceCssImport(code) {
    // console.log(code)
    //@ts-ignore
    const ncode = code.replace(IMPORT_STYLE_RE, str => {
        return str.replace(`.${exports.CSS_LANG}`, '.css');
    });
    return ncode;
}
exports.replaceCssImport = replaceCssImport;
function getCssBaseFile() {
    const zenConfig = common_1.getZenConfig();
    let path = path_1.join(constant_1.STYLE_DIR, `base.${exports.CSS_LANG}`);
    const baseFile = lodash_1.get(zenConfig, 'build.css.base', '');
    if (baseFile) {
        path = path_1.isAbsolute(baseFile) ? baseFile : path_1.join(constant_1.SRC_DIR, baseFile);
    }
    if (fs_extra_1.existsSync(path)) {
        return path;
    }
    return null;
}
exports.getCssBaseFile = getCssBaseFile;
