import { join } from 'path';

function findRootDir(dir) {
  console.log('dir', dir);

  if (dir === '/') {
    return '/';
  }

  return dir; // return findRootDir(dirname(dir))
} // root paths


export var CWD = join();
export var ROOT = findRootDir(CWD);
export var ES_DIR = join(ROOT, 'es');
export var LIB_DIR = join(ROOT, 'lib');
export var ROOT_POSTCSS_CONFIG_FILE = join(ROOT, 'postcss.config.js'); // relative paths

export var DIST_DIR = join(__dirname, '../../dist');
export var CONFIG_DIR = join(__dirname, '../config'); // Dist files

export var STYPE_DEPS_JSON_FILE = join(DIST_DIR, 'style-deps.json'); // config file 

export var POSTCSS_CONFIG_FILE = join(CONFIG_DIR, 'postcss.config.js');
export var SCRIPT_EXTS = ['.js', '.jsx', '.vue', '.ts', '.tsx'];
export var STYLE_EXTS = ['.css', '.less', '.scss'];

function getSrcDir() {
  return join(ROOT, 'src');
}

export var SRC_DIR = getSrcDir();