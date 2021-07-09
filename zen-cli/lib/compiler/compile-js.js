"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileJs = void 0;
const core_1 = require("@babel/core");
// import syntaxJsx from '@babel/plugin-syntax-jsx'
const fs_extra_1 = require("fs-extra");
const common_1 = require("../common");
const css_1 = require("../common/css");
const babel_config_1 = __importDefault(require("../config/babel.config"));
// console.log(babelConfig())
function compileJs(filePath) {
    const { presets } = babel_config_1.default();
    return new Promise((resolve, reject) => {
        let code = fs_extra_1.readFileSync(filePath, 'utf-8');
        code = css_1.replaceCssImport(code);
        core_1.transformAsync(code, {
            filename: filePath,
            presets,
        })
            .then(result => {
            if (result) {
                const jsFilePath = common_1.replaceExt(filePath, '.js');
                fs_extra_1.removeSync(filePath);
                fs_extra_1.outputFileSync(jsFilePath, result.code);
                resolve(result.code);
            }
        })
            .catch(reject);
    });
}
exports.compileJs = compileJs;
