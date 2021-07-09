const babelConfig = require('./lib/config/babel.config');

console.log('babelConfig', babelConfig)
module.exports = api => babelConfig(api)