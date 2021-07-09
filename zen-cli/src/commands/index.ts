type ActionType = {
    [key: string]: {
        alias: string;
        description: string;
        option: Array<string>
    }
}
const mapActions: ActionType = {
    build: {
        alias: 'b', // 别名
        description: '项目打包构建(Compile components in production mode)',
        option: ['--watch', 'Watch file change']
    }
}

export{
    mapActions
}