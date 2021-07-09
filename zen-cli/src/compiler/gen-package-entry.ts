//@ts-ignore
import { get } from 'lodash'
import {join} from 'path'
import {
  pascalize,
  getComponents,
  normalizePath,
  smartOutputFile,
} from '../common'
import { SRC_DIR, getPackageJson, getZenConfig } from '../common/constant'
type Options = {
    outputPath: string;
    pathResolver?: Function;
}

function genImports(components: string[], options: Options): string {
  return components.map(name => {
      let path = join(SRC_DIR, name);
      if (options.pathResolver) {
          path = options.pathResolver(path)
      }
      return `import ${pascalize(name)} from  '${normalizePath(path)}'`
  }).join('\n')
}

function genExports(names: string[]): string {
    return names.map(name => `${name}`).join(',\n   ')
}

export function genPackageEntry(options: Options) {
   const names = getComponents();
   const zenConfig = getZenConfig()
   const skipInstall = get(zenConfig, 'build.skipInstall', []).map(pascalize)
   const version = process.env.PACKAGE_VERSION || getPackageJson().version;
   const components = names.map(pascalize);
   const content = `${genImports(names, options)}
   const version = '${version}';

   function install(Vue) {
       const components = [
           ${components.filter(item => !skipInstall.includes(item)).join(',\n   ')}
       ];

       components.forEach(item => {
           if (item.install) {
               Vue.use(item)
           } else if (item.name) {
               Vue.component(item.name, item);
           }
       })
   }

   if (typeof window !== 'undefined' && window.Vue) {
       install(window.Vue)
   }

   export {
       install,
       version,
       ${genExports(components)}
   };

   export default {
       install,
       version
   };
   `;

   smartOutputFile(options.outputPath, content);
}