"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileStyle = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const common_1 = require("../common");
const logger_1 = require("../common/logger");
const compile_css_1 = require("./compile-css");
const compile_less_1 = require("./compile-less");
const compile_sass_1 = require("./compile-sass");
async function compileFile(filePath) {
    const parsedPath = path_1.parse(filePath);
    try {
        if (parsedPath.ext === '.less') {
            const source = await compile_less_1.compileLess(filePath);
            return await compile_css_1.compileCss(source);
        }
        if (parsedPath.ext === '.scss') {
            const source = await compile_sass_1.compileSass(filePath);
            return await compile_css_1.compileCss(source);
        }
        const source = fs_extra_1.readFileSync(filePath, 'utf-8');
        return await compile_css_1.compileCss(source);
    }
    catch (err) {
        logger_1.consola.error('Compile style failed: ' + filePath);
        throw err;
    }
}
async function compileStyle(filePath) {
    const css = await compileFile(filePath);
    fs_extra_1.writeFileSync(common_1.replaceExt(filePath, '.css'), css);
}
exports.compileStyle = compileStyle;
