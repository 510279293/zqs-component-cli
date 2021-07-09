## Button 按钮
常用的操作按钮。

### 基础用法

基础的按钮用法。

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

```html
<z-row>
  <z-button >默认按钮</z-button>
  <z-button type="primary">主要按钮</z-button>
  <z-button type="dashed">虚线按钮</z-button>
  <z-button type="danger">危险按钮</z-button>
  <z-button type="link">Link</z-button>
</z-row>

<z-row>
  <z-button shape="round">朴素按钮</z-button>
  <z-button type="primary" shape="round">主要按钮</z-button>
  <z-button type="dashed" shape="round">虚线按钮</z-button>
  <z-button type="danger" shape="round">危险按钮</z-button>
  <z-button type="link" shape="round">Link</z-button>
</z-row>

<z-row>
  <z-button icon="search" shape="circle"></z-button>
  <z-button type="primary" icon="search" shape="round">主要按钮</z-button>
  <z-button type="dashed" icon="search" shape="circle-outline"></z-button>
  <z-button type="danger" icon="search" shape="round" iconPosition="right">危险按钮</z-button>
  <z-button type="link" shape="round">Link</z-button>
</z-row>

```
:::

### 禁用状态

按钮不可用状态。

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```html
<z-row>
  <z-button disabled>默认按钮</z-button>
  <z-button type="primary" disabled>主要按钮</z-button>
  <z-button type="dashed" disabled>警告按钮</z-button>
  <z-button type="danger" disabled>危险按钮</z-button>
  <z-button type="link" disabled>Link</z-button>
</z-row>

<z-row>
  <z-button plain disabled>朴素按钮</z-button>
  <z-button type="primary" plain disabled>主要按钮</z-button>
  <z-button type="dashed" plain disabled>警告按钮</z-button>
  <z-button type="danger" plain disabled>危险按钮</z-button>
  <z-button type="link" plain disabled>Link</z-button>
</z-row>
```
:::

### 文字按钮

没有边框和背景色的按钮。

:::demo
```html
<z-button type="link">文字按钮</z-button>
<z-button type="link" disabled>文字按钮</z-button>
```
:::

### 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

:::demo 设置`icon`属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。

```html
<z-button type="primary" icon="edit"></z-button>
<z-button type="primary" icon="share"></z-button>
<z-button type="primary" icon="delete"></z-button>
<z-button type="primary" icon="search">搜索</z-button>
<z-button type="primary">上传<i class="z-icon-import"></i></z-button>
```
:::

### 按钮组

以按钮组的方式出现，常用于多项类似操作。

:::demo 使用`<z-button-group>`标签来嵌套你的按钮。

```html
<z-button-group>
  <z-button type="primary" icon="arrow-left">上一页</z-button><z-button type="primary">下一页<i class="arrow-right-bold"></i></z-button>
</z-button-group>
<z-button-group>
  <z-button type="primary" icon="edit"></z-button><z-button type="primary" icon="share"></z-button><z-button type="primary" icon="delete"></z-button>
</z-button-group>
```
:::

### 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。

:::demo 要设置为 loading 状态，只要设置`loading`属性为`true`即可。

```html
<z-button type="primary" :loading="true">加载中</z-button>
```
:::

### 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：`large`、`default`、`small`，通过设置`size`属性来配置它们。

```html
<z-row>
  <z-button size="large">大按钮</z-button>
  <z-button>默认按钮</z-button>
  <z-button size="small">小型按钮</z-button>
</z-row>
<z-row>
  <z-button size="large" round>大按钮</z-button>
  <z-button round>默认按钮</z-button>
  <z-button size="small" round>超小按钮</z-button>
</z-row>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   medium / small / mini            |    —     |
| type     | 类型   | string    |   primary / success / warning / danger / info / text |     —    |
| plain     | 是否朴素按钮   | boolean    | — | false   |
| round     | 是否圆角按钮   | boolean    | — | false   |
| circle     | 是否圆形按钮   | boolean    | — | false   |
| loading     | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |
| native-type | 原生 type 属性 | string | button / submit / reset | button |
