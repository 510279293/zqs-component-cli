import { normalizePath, smartOutputFile } from "../common";
import { SRC_DIR, STYPE_DEPS_JSON_FILE } from "../common/constant"
import { CSS_LANG, getCssBaseFile } from "../common/css";
import {join} from 'path'
import { existsSync } from "fs-extra";

type Options = {
    outputPath: string;
    pathResolver? (path: string): string;
}
export function genPackageStyle(options: Options) {
    const styleDepsJson = require(STYPE_DEPS_JSON_FILE);
    const ext = '.' + CSS_LANG;
    let content = '';
    let baseFile = getCssBaseFile();
    if (baseFile) {
        if (options.pathResolver) {
            baseFile = options.pathResolver(baseFile)
        }

        content += `@import "${normalizePath(baseFile)}";\n`
    }

    content += styleDepsJson.sequence.map((name: string) => {
        let path = join(SRC_DIR, `${name}/index${ext}`);
        let pathStyle = join(SRC_DIR, `${name}/style/index${ext}`);
        if (!existsSync(path) && !existsSync(pathStyle)) {
            return ''
        }
        if (options.pathResolver) {
            path = existsSync(path) ? path : pathStyle
            path = options.pathResolver(path) 
        }

        return `@import "${normalizePath(path)}";`
    })
    .filter((item: string) => !!item)
    .join('\n')

    smartOutputFile(options.outputPath, content)    
}