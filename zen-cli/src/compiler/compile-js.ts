import { transformAsync } from '@babel/core';
// import syntaxJsx from '@babel/plugin-syntax-jsx'
import { readFileSync, removeSync, outputFileSync } from 'fs-extra';
import { replaceExt } from '../common';
import { replaceCssImport } from '../common/css';
import babelConfig from '../config/babel.config'
// console.log(babelConfig())
export function compileJs(filePath: string): Promise<any> {
  const { presets } = babelConfig()
  return new Promise((resolve, reject) => {
    let code = readFileSync(filePath, 'utf-8');
    
    code = replaceCssImport(code);

    transformAsync(code, { 
      filename: filePath, 
      presets,
      // presets: [
      //   '@vue/cli-plugin-babel/preset',
      //   "@babel/preset-typescript", 
      // ]
    })
      .then(result => {
        if (result) {
          const jsFilePath = replaceExt(filePath, '.js');

          removeSync(filePath);
          outputFileSync(jsFilePath, result.code);
          resolve(result.code)
        }
      })
      .catch(reject);
  });
}
