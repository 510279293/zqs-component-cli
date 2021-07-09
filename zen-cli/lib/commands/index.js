"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapActions = void 0;
const mapActions = {
    build: {
        alias: 'b',
        description: '项目打包构建(Compile components in production mode)',
        option: ['--watch', 'Watch file change']
    }
};
exports.mapActions = mapActions;
