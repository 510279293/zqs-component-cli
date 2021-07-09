# @zen/cli

Zen Cli 是一个 Vue 组件库构建工具，通过 Zen Cli 可以快速搭建一套功能完备的 Vue 组件库。

### 特性

- 提供丰富的命令，涵盖从开发测试到构建发布的完整流程
- 基于约定的目录结构，自动生成优雅的文档站点和组件示例
- 内置 ESlint、Stylelint 校验规则，提交代码时自动执行校验
- 构建后的组件库默认支持按需引入、主题定制、Tree Shaking

### 快速上手

执行以下命令可以快速创建一个基于 Zen Cli 的项目：

```bash
npx @zen/cli
```

### 手动安装

```shell
# 通过 npm 安装
npm i @zen/cli -D

# 通过 yarn 安装
yarn add @zen/cli --dev
```

安装完成后，请将以下配置添加到 package.json 文件中

```json
{
  "scripts": {
    "dev": "zen-cli dev",
    "test": "zen-cli test",
    "lint": "zen-cli lint",
    "build": "zen-cli build",
    "release": "zen-cli release",
    "build-site": "zen-cli build-site"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "zen commit-lint"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": "eslint --fix",
    "*.{vue,css,less,scss}": "stylelint --fix"
  },
  "eslintConfig": {
    "root": true,
    "extends": ["@zen"]
  },
  "stylelint": {
    "extends": ["@zen/stylelint-config"]
  },
  "prettier": {
    "singleQuote": true
  },
  "browserslist": ["Android >= 4.0", "iOS >= 8"]
}
```

## 详细文档


## 关于桌面端组件

目前 zen Cli 仅支持移动端组件的预览，桌面端组件暂不支持预览（欢迎 PR）。
