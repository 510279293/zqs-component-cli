import { join } from 'path';
import { existsSync, readFileSync } from "fs-extra";
import { SCRIPT_EXTS } from "../common/constant";

let depsMap: Record<string, string[]> = {};
let existsCache: Record<string, boolean> = {};

const IMPORT_RE = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

export function clearDepsCache() {
    depsMap = {}
    existsCache = {}
}

function matchImports(code: string): string[] {
   return code.match(IMPORT_RE) || []
}

export function exists(filePath: string) {
   if (!(filePath in existsCache)) {
       existsCache[filePath] = existsSync(filePath)
   }

   return existsCache[filePath]
}

export function fillExt(filePath: string) {
    for (let i = 0; i < SCRIPT_EXTS.length; i++) {
        const complatePath = `${filePath}${SCRIPT_EXTS[i]}`
        if (exists(complatePath)) {
            return complatePath
        }
    }

    for(let i = 0; i < SCRIPT_EXTS.length; i++) {
        const complatePath = `${filePath}/index${SCRIPT_EXTS[i]}`
        if (exists(complatePath)) {
            return complatePath
        }
    }
    return ''
}

function getPathByImport(code: string, filePath: string) {
    const divider = code.includes('"') ? '"' : "'"
    const relativePath = code.split(divider)[1]

    if(relativePath.includes('.')) {
        return fillExt(join(filePath, '..', relativePath))
    }
    return null
}

export function getDeps(filePath: string) {
    if (depsMap[filePath]) {
        return depsMap[filePath]
    }

    const code = readFileSync(filePath, 'utf-8')
    const imports = matchImports(code);
    const paths = imports.map(item => getPathByImport(item, filePath))
                         .filter(item => !!item) as string[];
    depsMap[filePath] = paths 
    paths.forEach(getDeps)   
    
    return paths                

}