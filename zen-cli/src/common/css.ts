
//@ts-ignore
import { get } from 'lodash'
import { getZenConfig } from '../common'
import {STYLE_DIR, SRC_DIR} from './constant'
import { join, isAbsolute } from 'path'
import { existsSync } from 'fs-extra'
type CSS_LANG = 'css' | 'less' | 'scss'

function getCssLang(): CSS_LANG {
    // 暂时写上死用 less
    return 'less'
}

export const CSS_LANG = getCssLang()

const IMPORT_STYLE_RE = /import\s+?(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;
// "import 'a.less'; => import 'a.css' "
export function replaceCssImport(code: string) {
    // console.log(code)
    //@ts-ignore
  const ncode = code.replace(IMPORT_STYLE_RE, str => {
      return str.replace(`.${CSS_LANG}`, '.css')
  })
  return ncode
}

export function getCssBaseFile(){
    const zenConfig = getZenConfig()
    let path = join(STYLE_DIR, `base.${CSS_LANG}`)
    const baseFile = get(zenConfig, 'build.css.base', '');
    if (baseFile) {
        path = isAbsolute(baseFile) ? baseFile : join(SRC_DIR, baseFile)
    }
    if (existsSync(path)) {
        return path;
    }
    return null;
}