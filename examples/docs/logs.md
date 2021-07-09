## 更新日志

### v2.10.9
2020-10-01

**Feature**

- Locale: 新增德语语言包 #7245
- CollapseItem: 新增 toggle 方法，用于主动控制面板展开或收起 #7281
- Pagination: 新增 page、prev-text、next-text 插槽 #7222
- Tab: 当标签页内容为空时，不再渲染空的 van-tab-pane 节点 #7238

**Bug Fixes**

- Swipe: 修复 prev、next 方法缺少类型定义的问题 #7270
- Button: 修复在 v-for 中渲染时 ref 不正确的问题 #7237
- Field: 修复设置 maxlength 后在中间输入时截断结果不正确的问题 #7284
- @vant/markdown-vetur: 修复 Windows 系统下的兼容问题 #7277 #7287