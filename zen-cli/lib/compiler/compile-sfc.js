"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSfc = exports.parseSfc = void 0;
const compileUtils = __importStar(require("@vue/component-compiler-utils"));
const compiler = __importStar(require("vue-template-compiler"));
const hash_sum_1 = __importDefault(require("hash-sum"));
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const common_1 = require("../common");
const compile_js_1 = require("./compile-js");
const compile_style_1 = require("./compile-style");
const RENDER_FN = '__vue_render__';
const STATIC_RENDER_FN = '__vue__staticRenderFns__';
const EXPORT = `export default {`;
// trim some unused code
function trim(code) {
    return code.replace(/\/\/\n/g, '').trim();
}
function parseSfc(filePath) {
    const source = fs_extra_1.readFileSync(filePath, 'utf-8');
    const descriptor = compileUtils.parse({
        source,
        compiler,
        needMap: false
    });
    return descriptor;
}
exports.parseSfc = parseSfc;
function getSfcStylePath(filePath, ext, index) {
    const number = index !== 0 ? `-${index + 1}` : '';
    return common_1.replaceExt(filePath, `-sfc${number}.${ext}`);
}
function injectScopeId(script, scopeId) {
    return script.replace(EXPORT, `${EXPORT}\n _scopeId: '${scopeId}',\n\n`);
}
function injectStyle(script, styles, filePath) {
    if (styles.length) {
        const imports = styles
            .map((style, index) => {
            const { base } = path_1.parse(getSfcStylePath(filePath, 'css', index));
            return `import './${base}';`;
        })
            .join('\n');
        return script.replace(EXPORT, `${imports}\n\n${EXPORT}`);
    }
    return script;
}
function compileTemplate(template) {
    const result = compileUtils.compileTemplate({
        compiler,
        source: template,
        isProduction: true
    });
    return result.code;
}
// inject render fn to script
function injectRender(script, render) {
    script = trim(script);
    render = render.replace('var render', `var ${RENDER_FN}`)
        .replace('var staticRenderFns', `var ${STATIC_RENDER_FN}`);
    const nscript = script.replace(EXPORT, `${render}\n${EXPORT}\n render: ${RENDER_FN},\n\n staticRenderFns: ${STATIC_RENDER_FN},\n`);
    return nscript;
}
async function compileSfc(filePath) {
    const tasks = [fs_extra_1.remove(filePath)];
    const source = fs_extra_1.readFileSync(filePath, 'utf-8');
    const jsFilePath = common_1.replaceExt(filePath, '.js');
    const descriptor = parseSfc(filePath);
    const { template, styles } = descriptor;
    const hasScoped = styles.some(s => s.scoped);
    const scopeId = hasScoped ? `data-v-${hash_sum_1.default(source)}` : '';
    // compiler js part
    if (descriptor.script) {
        tasks.push(new Promise((resolve, reject) => {
            let script = descriptor.script.content;
            script = injectStyle(script, styles, filePath);
            if (template) {
                const render = compileTemplate(template.content);
                script = injectRender(script, render);
            }
            if (scopeId) {
                script = injectScopeId(script, scopeId);
            }
            fs_extra_1.writeFileSync(jsFilePath, script);
            compile_js_1.compileJs(jsFilePath)
                .then(resolve)
                .catch(reject);
        }));
    }
    // compile style part
    tasks.push(...styles.map((style, index) => {
        const cssFilePath = getSfcStylePath(filePath, style.lang || 'css', index);
        let styleSource = trim(style.content);
        if (style.scoped) {
            styleSource = compileUtils.compileStyle({
                id: scopeId,
                scoped: true,
                source: styleSource,
                filename: cssFilePath,
                preprocessLang: style.lang
            }).code;
        }
        fs_extra_1.writeFileSync(cssFilePath, styleSource);
        return compile_style_1.compileStyle(cssFilePath);
    }));
    return Promise.all(tasks);
}
exports.compileSfc = compileSfc;
