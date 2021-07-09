import { outputFileSync } from 'fs-extra';
import { relative, join, sep } from 'path';
import { getComponents, replaceExt } from "../common";
import { ES_DIR, LIB_DIR, SRC_DIR, STYPE_DEPS_JSON_FILE } from "../common/constant";
import { CSS_LANG } from "../common/css";
import { checkStyleExists } from "./gen-style-deps-map";
var OUTPUT_CONFIG = [{
  dir: ES_DIR,
  template: function template(dep) {
    return "import '" + dep + "';";
  }
}, {
  dir: LIB_DIR,
  template: function template(dep) {
    return "require('" + dep + "');";
  }
}];

function getPath(component, ext) {
  if (ext === void 0) {
    ext = '.css';
  }

  return join(ES_DIR, component + "/index" + ext);
}

function getRelativePath(component, style, ext) {
  return relative(join(ES_DIR, component + "/style"), getPath(style, ext));
}

function getDeps(component) {
  var styleDepsJson = require(STYPE_DEPS_JSON_FILE);

  if (styleDepsJson.map[component]) {
    var deps = styleDepsJson.map[component].slice(0);

    if (checkStyleExists(component)) {
      deps.push(component);
    }

    return deps;
  }

  return [];
}

export function genEntry(params) {
  var ext = params.ext,
      filename = params.filename,
      component = params.component,
      baseFile = params.baseFile;
  var deps = getDeps(component);
  var depsPath = deps.map(function (dep) {
    return getRelativePath(component, dep, ext);
  });
  OUTPUT_CONFIG.forEach(function (_ref) {
    var dir = _ref.dir,
        template = _ref.template;
    var outputDir = join(dir, component, 'style');
    var outputFile = join(outputDir, filename);
    var content = '';

    if (baseFile) {
      var compiledBaseFile = replaceExt(baseFile.replace(SRC_DIR, dir), ext);
      content += template(relative(outputDir, compiledBaseFile));
      content += '\n';
    }

    content += depsPath.map(template).join('\n');
    content = content.replace(new RegExp('\\' + sep, 'g'), '/');
    outputFileSync(outputFile, content);
  });
}
export function genComponentStyle(options) {
  if (options === void 0) {
    options = {
      cache: true
    };
  }

  if (!options.cache) {
    delete require.cache[STYPE_DEPS_JSON_FILE];
  }

  var components = getComponents(); // const baseFile = getCssBaseFile();

  var baseFile = null;
  components.forEach(function (component) {
    genEntry({
      baseFile: baseFile,
      component: component,
      filename: 'index.js',
      ext: '.css'
    });

    if (CSS_LANG !== 'css') {
      genEntry({
        baseFile: baseFile,
        component: component,
        filename: CSS_LANG + '.js',
        ext: '.' + CSS_LANG
      });
    }
  });
}