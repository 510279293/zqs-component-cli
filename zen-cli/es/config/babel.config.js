module.exports = function (api) {
  if (api) {
    api.cache.never();
  }

  var _process$env = process.env,
      BABEL_MODULE = _process$env.BABEL_MODULE,
      NODE_ENV = _process$env.NODE_ENV;
  var isTest = NODE_ENV === 'test';
  var useESModules = BABEL_MODULE !== 'commonjs' && !isTest;
  return {
    presets: [['@babel/preset-env', {
      loose: true,
      modules: useESModules ? false : 'commonjs'
    }], ['@vue/babel-preset-jsx', {
      functional: false
    }], '@babel/preset-typescript'],
    plugins: [['@babel/plugin-transform-runtime', {
      corejs: false,
      useESModules: useESModules
    }], ['import', {
      libraryName: 'zen',
      libraryDirectory: useESModules ? 'es' : 'lib',
      style: true
    }, 'zen'], '@babel/plugin-transform-object-assign']
  };
};

export default module.exports;