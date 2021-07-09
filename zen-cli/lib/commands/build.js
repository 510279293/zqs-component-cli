"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const clean_1 = require("./clean");
const logger_1 = require("../common/logger");
const manager_1 = require("../common/manager");
const constant_1 = require("../common/constant");
const compile_js_1 = require("../compiler/compile-js");
const compile_style_1 = require("../compiler/compile-style");
const compile_sfc_1 = require("../compiler/compile-sfc");
const common_1 = require("../common");
const css_1 = require("../common/css");
const gen_style_deps_map_1 = require("../compiler/gen-style-deps-map");
const gen_component_style_1 = require("../compiler/gen-component-style");
const gen_package_entry_1 = require("../compiler/gen-package-entry");
const gen_package_style_1 = require("../compiler/gen-package-style");
async function compileFile(filePath) {
    if (common_1.isSfc(filePath)) {
        return compile_sfc_1.compileSfc(filePath);
    }
    if (common_1.isScript(filePath)) {
        return compile_js_1.compileJs(filePath);
    }
    if (common_1.isStyle(filePath)) {
        return compile_style_1.compileStyle(filePath);
    }
    return fs_extra_1.remove(filePath);
}
async function compileDir(dir) {
    const files = fs_extra_1.readdirSync(dir);
    await Promise.all(files.map(filename => {
        const filePath = path_1.join(dir, filename);
        if (common_1.isDemoDir(filePath) || common_1.isTestDir(filePath)) {
            return fs_extra_1.remove(filePath);
        }
        if (common_1.isDir(filePath)) {
            return compileDir(filePath);
        }
        return compileFile(filePath);
    }));
}
async function buildEs() {
    common_1.setModuleEnv('esmodule');
    await fs_extra_1.copy(constant_1.SRC_DIR, constant_1.ES_DIR);
    await compileDir(constant_1.ES_DIR);
}
async function buildLid() {
    common_1.setModuleEnv('commonjs');
    await fs_extra_1.copy(constant_1.SRC_DIR, constant_1.LIB_DIR);
    await compileDir(constant_1.LIB_DIR);
}
async function buildStyleEntry() {
    await gen_style_deps_map_1.genStyleDepsMap();
    gen_component_style_1.genComponentStyle();
}
async function buildPackgeEntry() {
    const esEntryFile = path_1.join(constant_1.ES_DIR, 'index.js');
    const libEntryFile = path_1.join(constant_1.LIB_DIR, 'index.js');
    const styleEntryFile = path_1.join(constant_1.LIB_DIR, `index.${css_1.CSS_LANG}`);
    gen_package_entry_1.genPackageEntry({
        outputPath: esEntryFile,
        pathResolver: (path) => `./${path_1.relative(constant_1.SRC_DIR, path)}`
    });
    common_1.setModuleEnv('esmodule');
    await compile_js_1.compileJs(esEntryFile);
    gen_package_style_1.genPackageStyle({
        outputPath: styleEntryFile,
        pathResolver: (path) => path.replace(constant_1.SRC_DIR, '.')
    });
    common_1.setModuleEnv('commonjs');
    await fs_extra_1.copy(esEntryFile, libEntryFile);
    await compile_js_1.compileJs(libEntryFile);
    await compile_style_1.compileStyle(styleEntryFile);
}
async function buildPackages() {
    common_1.setModuleEnv('esmodule');
    // await compilePackage(false)
}
const tasks = [
    {
        text: 'Build ESModule Outputs',
        task: buildEs,
    },
    {
        text: 'Build Commonjs outputs',
        task: buildLid
    },
    {
        text: 'Build Style Entry',
        task: buildStyleEntry,
    },
    {
        text: 'Build Package Entry',
        task: buildPackgeEntry
    },
    {
        text: 'Build Packed Outputs',
        task: buildPackages
    }
];
async function runBuildTasks() {
    for (let i = 0; i < tasks.length; i++) {
        const { task, text } = tasks[i];
        const spinner = logger_1.ora(text).start();
        try {
            await task();
            spinner.succeed(text);
        }
        catch (err) {
            spinner.fail(text);
            console.log(err);
            throw (err);
        }
    }
    logger_1.consola.success('Compile successfully');
}
async function build(cmd = {}) {
    console.log('hello, i am build');
    common_1.setNodeEnv('production');
    try {
        await clean_1.clean();
        await manager_1.installDependencies();
        await runBuildTasks();
    }
    catch (err) {
        console.error('Build failed');
        process.exit(-1);
    }
}
exports.build = build;
