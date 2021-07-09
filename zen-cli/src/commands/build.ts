import { remove, copy, readdirSync } from 'fs-extra'
import { join, relative } from 'path'
import { clean } from './clean'
import { ora, consola, slimPath } from '../common/logger'
import { installDependencies } from '../common/manager'
import { SRC_DIR, LIB_DIR, ES_DIR } from '../common/constant'
import { compileJs } from '../compiler/compile-js'
import { compileStyle } from '../compiler/compile-style'
import { compileSfc } from '../compiler/compile-sfc'

import { 
  setNodeEnv, 
  setModuleEnv, 
  isDemoDir,
  isTestDir,
  isDir, 
  isSfc,
  isScript,
  isStyle
  } from '../common'
import { CSS_LANG } from '../common/css'
import { genStyleDepsMap } from '../compiler/gen-style-deps-map'
import { genComponentStyle } from '../compiler/gen-component-style'
import { genPackageEntry } from '../compiler/gen-package-entry'
import { genPackageStyle } from '../compiler/gen-package-style'

async function compileFile(filePath: string) {
  if (isSfc(filePath)) {
     return compileSfc(filePath)
  } 

  if (isScript(filePath)) {
     return compileJs(filePath)
  }

  if (isStyle(filePath)) {
    return compileStyle(filePath)
  }

  return remove(filePath)
}

async function compileDir(dir: string) {
  const files = readdirSync(dir);
  await Promise.all(
    files.map(filename => {
      const filePath = join(dir, filename)

      if (isDemoDir(filePath) || isTestDir(filePath)) {
        return remove(filePath)
      }

      if (isDir(filePath)) {
        return compileDir(filePath)
      }

      return compileFile(filePath)
    })
  )
}

async function buildEs() {
  setModuleEnv('esmodule')
  await copy(SRC_DIR, ES_DIR);
  await compileDir(ES_DIR)
}

async function buildLid() {
  setModuleEnv('commonjs')
  await copy(SRC_DIR, LIB_DIR);
  await compileDir(LIB_DIR);
}

async function buildStyleEntry() {
  await genStyleDepsMap()
  genComponentStyle()
}

async function buildPackgeEntry() {
  const esEntryFile = join(ES_DIR, 'index.js')
  const libEntryFile = join(LIB_DIR, 'index.js')
  const styleEntryFile = join(LIB_DIR, `index.${CSS_LANG}`)

  genPackageEntry({
    outputPath: esEntryFile,
    pathResolver: (path: string) => `./${relative(SRC_DIR, path)}`
  })

  setModuleEnv('esmodule')
  await compileJs(esEntryFile);

  genPackageStyle({
    outputPath: styleEntryFile,
    pathResolver: (path: string) => path.replace(SRC_DIR, '.')
  })

  setModuleEnv('commonjs');
  await copy(esEntryFile, libEntryFile);
  await compileJs(libEntryFile);
  await compileStyle(styleEntryFile)
}

async function buildPackages() {
  setModuleEnv('esmodule')
  // await compilePackage(false)
}
const tasks = [
  {
    text: 'Build ESModule Outputs',
    task: buildEs,
  },
  {
    text: 'Build Commonjs outputs',
    task: buildLid
  },
  {
    text: 'Build Style Entry',
    task: buildStyleEntry,
  }, 
  {
    text: 'Build Package Entry',
    task: buildPackgeEntry
  },
  {
    text: 'Build Packed Outputs',
    task: buildPackages
  }
]
async function runBuildTasks() {
  for(let i = 0; i < tasks.length; i++) {
    const { task, text } = tasks[i];
    const spinner = ora(text).start()
    try {
      await task();
      spinner.succeed(text)
    } catch (err) {
      spinner.fail(text);
      console.log(err);
      throw(err)
    }
  }
  consola.success('Compile successfully')
}

export async function build(cmd: { watch?: boolean} = {}) {
  console.log('hello, i am build')
  setNodeEnv('production')
  try {
    await clean();
    await installDependencies();
    await runBuildTasks();
  } catch (err) {
      console.error('Build failed')
      process.exit(-1)
  }
}
