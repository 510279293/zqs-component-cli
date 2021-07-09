function getCssLang() {
  // 暂时写上死用 less
  return 'less';
}

export var CSS_LANG = getCssLang();
var IMPORT_STYLE_RE = /import\s+?(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g; // "import 'a.css'; => import 'a.css' "

export function replaceCssImport(code) {
  // console.log(code)
  //@ts-ignore
  var ncode = code.replace(IMPORT_STYLE_RE, function (str) {
    return str.replace("." + CSS_LANG, '.css');
  });
  return ncode;
}