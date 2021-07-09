//@ts-ignore
import { get } from 'lodash';
import { existsSync } from 'fs-extra'
import { join, dirname, isAbsolute } from 'path'

function findRootDir(dir: string): string{
    if (dir === '/') {
        return '/'
    }
    if (existsSync(join(dir, 'zen.config.js'))) {
        return dir
    }

    return findRootDir(dirname(dir))
}

function getSrcDir() {
    const zenConfig = getZenConfig();
    const srcDir = get(zenConfig, 'build.srcDir');
    if (srcDir) {
        if (isAbsolute(srcDir)) {
            return srcDir;
        }
        return join(ROOT, srcDir)
    }
    return join(ROOT, 'src')
 }

// root paths
export const CWD = process.cwd();
export const ROOT = findRootDir(CWD);
export const ES_DIR = join(ROOT, 'es');
export const LIB_DIR = join(ROOT, 'lib');
export const ROOT_POSTCSS_CONFIG_FILE = join(ROOT, 'postcss.config.js')
export const PACKAGE_JSON_FILE = join(ROOT, 'package.json')
export const ZEN_CONFIG_FILE = join(ROOT, 'zen.config.js')

// relative paths
export const DIST_DIR = join(__dirname, '../../dist');
export const CONFIG_DIR = join(__dirname, '../config')

// Dist files
export const STYPE_DEPS_JSON_FILE = join(DIST_DIR, 'style-deps.json')

// config file 
export const POSTCSS_CONFIG_FILE = join(CONFIG_DIR, 'postcss.config.js')

export const SCRIPT_EXTS = ['.js', '.jsx', '.vue', '.ts', '.tsx']
export const STYLE_EXTS = ['.css', '.less', '.scss']


export function getPackageJson(){
    delete require.cache[PACKAGE_JSON_FILE];
    return require(PACKAGE_JSON_FILE)
}

export const SRC_DIR = getSrcDir();
export const STYLE_DIR = join(SRC_DIR, 'style')

export function getZenConfig(){
    delete require.cache[ZEN_CONFIG_FILE];

    try {
        return require(ZEN_CONFIG_FILE);
    } catch (err) {
        return {}
    }
}
