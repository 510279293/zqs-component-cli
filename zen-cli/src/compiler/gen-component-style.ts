import { outputFileSync } from 'fs-extra';
import { relative, join, sep } from 'path'
import { getComponents, replaceExt } from "../common"
import { ES_DIR, LIB_DIR, SRC_DIR, STYPE_DEPS_JSON_FILE } from "../common/constant"
import { CSS_LANG } from "../common/css";
import { checkStyleExists } from "./gen-style-deps-map";

const OUTPUT_CONFIG = [
    {
        dir: ES_DIR,
        template: (dep: string) => `import '${dep}';`
    },
    {
        dir: LIB_DIR,
        template: (dep: string) => `require('${dep}');`
    }
]
function getPath(component: string, ext = '.css') {
    return join(ES_DIR, `${component}/index${ext}`)
}

function getRelativePath(component: string, style: string, ext: string){
    return relative(join(ES_DIR, `${component}/style`), getPath(style, ext))
}

function getDeps(component: string): string[] {
    const styleDepsJson = require(STYPE_DEPS_JSON_FILE);

    if (styleDepsJson.map[component]) {
        const deps = styleDepsJson.map[component].slice(0)

        if(checkStyleExists(component)) {
            deps.push(component)
        }

        return deps
    }

    return []
}
export function genEntry(params: {
    ext: string;
    filename: string;
    component: string;
    baseFile: string | null
}){
   const { ext, filename, component, baseFile } = params;
   const deps = getDeps(component)
   const depsPath = deps.map(dep => getRelativePath(component, dep, ext))
   OUTPUT_CONFIG.forEach(({dir, template}) => {
       const outputDir = join(dir, component, 'style')
       const outputFile = join(outputDir, filename)
       let content = ''
       if (baseFile) {
           const compiledBaseFile = replaceExt(baseFile.replace(SRC_DIR, dir), ext)
           content += template(relative(outputDir, compiledBaseFile))
           content += '\n'
       }
       
       content += depsPath.map(template).join('\n')
       content = content.replace(new RegExp('\\' + sep, 'g'), '/')
       outputFileSync(outputFile, content)

   })
}

export function genComponentStyle(options: { cache: boolean } = {cache: true}){
    if (!options.cache) {
        delete require.cache[STYPE_DEPS_JSON_FILE]
    }
    const components = getComponents();
    // const baseFile = getCssBaseFile();
    const baseFile = null;

    components.forEach(component => {
        genEntry({
           baseFile,
           component,
           filename: 'index.js',
           ext: '.css'
        })

        if (CSS_LANG !== 'css') {
            genEntry({
                baseFile,
                component,
                filename: CSS_LANG + '.js',
                ext: '.' + CSS_LANG,
            })
        }
    })
}