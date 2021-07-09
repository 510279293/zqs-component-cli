"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPackageStyle = void 0;
const common_1 = require("../common");
const constant_1 = require("../common/constant");
const css_1 = require("../common/css");
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
function genPackageStyle(options) {
    const styleDepsJson = require(constant_1.STYPE_DEPS_JSON_FILE);
    const ext = '.' + css_1.CSS_LANG;
    let content = '';
    let baseFile = css_1.getCssBaseFile();
    if (baseFile) {
        if (options.pathResolver) {
            baseFile = options.pathResolver(baseFile);
        }
        content += `@import "${common_1.normalizePath(baseFile)}";\n`;
    }
    content += styleDepsJson.sequence.map((name) => {
        let path = path_1.join(constant_1.SRC_DIR, `${name}/index${ext}`);
        let pathStyle = path_1.join(constant_1.SRC_DIR, `${name}/style/index${ext}`);
        if (!fs_extra_1.existsSync(path) && !fs_extra_1.existsSync(pathStyle)) {
            return '';
        }
        if (options.pathResolver) {
            path = fs_extra_1.existsSync(path) ? path : pathStyle;
            path = options.pathResolver(path);
        }
        return `@import "${common_1.normalizePath(path)}";`;
    })
        .filter((item) => !!item)
        .join('\n');
    common_1.smartOutputFile(options.outputPath, content);
}
exports.genPackageStyle = genPackageStyle;
