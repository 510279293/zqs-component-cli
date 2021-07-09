import { transformAsync } from '@babel/core'; // import syntaxJsx from '@babel/plugin-syntax-jsx'

import { readFileSync, removeSync, outputFileSync } from 'fs-extra';
import { replaceExt } from '../common';
import { replaceCssImport } from '../common/css';
import babelConfig from '../config/babel.config'; // console.log(babelConfig())

export function compileJs(filePath) {
  var _babelConfig = babelConfig(),
      presets = _babelConfig.presets;

  return new Promise(function (resolve, reject) {
    var code = readFileSync(filePath, 'utf-8');
    code = replaceCssImport(code);
    transformAsync(code, {
      filename: filePath,
      presets: presets // presets: [
      //   '@vue/cli-plugin-babel/preset',
      //   "@babel/preset-typescript", 
      // ]

    }).then(function (result) {
      if (result) {
        var jsFilePath = replaceExt(filePath, '.js');
        removeSync(filePath);
        outputFileSync(jsFilePath, result.code);
        resolve(result.code);
      }
    }).catch(reject);
  });
}