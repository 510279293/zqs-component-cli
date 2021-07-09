// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// const HyperDown = require('hyperdown')
// const parser = new HyperDown()

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.ts'
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.ts', '.json'],
      alias: {
        '@': path.resolve(__dirname, './examples'),
        '@src': path.resolve(__dirname, './src')
      }
    }
  },
  chainWebpack: config => {
    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader(path.resolve(__dirname, './build/md-loader/index.js'))
      .end()
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        }
      }
    }
  },
}
