import { 
    lstatSync,
    existsSync,
    readdirSync,
    readFileSync,
    outputFileSync
} from 'fs-extra'
import {
  ROOT_POSTCSS_CONFIG_FILE,
  SRC_DIR,
  getZenConfig
} from './constant'
import merge from 'webpack-merge';
import { sep, join } from 'path'
import { WebpackConfig } from './types'
export type NodeEnv = 'production' | 'development' | 'test'
export type ModuleEnv = 'esmodule' | 'commonjs'
export type BuildTarget = 'site' | 'package'

export const EXT_REGEXP = /\.\w+$/
export const SFC_REGEXP = /\.(vue)$/
export const DEMO_REGEXP = new RegExp('\\' + sep + 'demo$')
export const TEST_REGEXP = new RegExp('\\' + sep + 'test$')
export const STYLE_REGEXP = /\.(css|less|scss)$/
export const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/
export const ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue']

const camelizeRE = /-(\w)/g;
const pascalizeRE = /(\w)(\w*)/g;

export function hasDefaultExport(code: string) {
    return code.includes('export default') || code.includes('export { default }')
}

export function camelize(str: string): string {
    return str.replace(camelizeRE, (_, c) => c.toUpperCase())
}

export function pascalize(str: string): string {
    return camelize(str).replace(
        pascalizeRE,
        (_, c1, c2) => c1.toUpperCase() + c2
    )
}

export function normalizePath(path: string): string {
    return path.replace(/\\/g, '/');
}

export function getComponents() {
    const EXCLUDES = ['.DS_Store'];
    const dirs = readdirSync(SRC_DIR);
    return dirs.filter((dir) => !EXCLUDES.includes(dir))
               .filter((dir) => 
                ENTRY_EXTS.some((ext) => {
                    const path = join(SRC_DIR, dir, `index.${ext}`)
                    if (existsSync(path)) {
                        return hasDefaultExport(readFileSync(path, 'utf-8'))
                    }
                    return false
                }))
}

export function setNodeEnv(value: NodeEnv) {
    process.env.NODE_ENV = value
}

export function setModuleEnv(value: ModuleEnv) {
    process.env.BABEL_MODULE = value;
}

export function setBuildTarget(value: BuildTarget) {
    process.env.NODE_ENV = value
}

export function isDemoDir(dir: string) {
    return DEMO_REGEXP.test(dir)
}

export function isTestDir(dir: string) {
    return TEST_REGEXP.test(dir)
}

export function isSfc(path: string) {
    return SFC_REGEXP.test(path)
}

export function isDir(dir: string) {
    return lstatSync(dir).isDirectory()
}

export function isScript(path: string) {
    return SCRIPT_REGEXP.test(path)
}

export function isStyle(path: string) {
    return STYLE_REGEXP.test(path)
}

export function replaceExt(path: string, ext: string) {
    return path.replace(EXT_REGEXP, ext)
}

export function getPostcssConfig(): object {
    if (existsSync(ROOT_POSTCSS_CONFIG_FILE)) {
        return require(ROOT_POSTCSS_CONFIG_FILE)
    }
    
    return {}
}

// smarter outputFileSync
// skip output if file content unchanged
export function smartOutputFile(filePath: string, content: string) {
    if (existsSync(filePath)) {
        const previousContent = readFileSync(filePath, 'utf-8')

        if (previousContent === content) {
            return
        }
    }

    outputFileSync(filePath, content)
}

export function getWebpackConfig(defaultConfig: WebpackConfig): object {
    if (existsSync(ROOT_POSTCSS_CONFIG_FILE)) {
        const config = require(ROOT_POSTCSS_CONFIG_FILE);

        // 如果是函数形式，可能并不仅仅是添加额外的处理流程，而是在原有流程上进行修改
        // 比如修改markdown-loader,添加options.enableMetaData
        if(typeof config === 'function') {
            return config(defaultConfig)
        }

        return merge(defaultConfig, config)
    }

    return defaultConfig
}

export { getZenConfig }