"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (api) {
    if (api) {
        api.cache.never();
    }
    const { BABEL_MODULE, NODE_ENV } = process.env;
    const isTest = NODE_ENV === 'test';
    const useESModules = BABEL_MODULE !== 'commonjs' && !isTest;
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    loose: true,
                    modules: useESModules ? false : 'commonjs',
                },
            ],
            [
                '@vue/babel-preset-jsx',
                {
                    functional: false,
                },
            ],
            '@babel/preset-typescript',
        ],
        plugins: [
            [
                '@babel/plugin-transform-runtime',
                {
                    corejs: false,
                    useESModules,
                },
            ],
            [
                'import',
                {
                    libraryName: 'zen',
                    libraryDirectory: useESModules ? 'es' : 'lib',
                    style: true,
                },
                'zen',
            ],
            '@babel/plugin-transform-object-assign',
        ],
    };
};
exports.default = module.exports;
