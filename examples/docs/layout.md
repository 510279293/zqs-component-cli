## Layout 布局

通过基础的 24 分栏，迅速简便地创建布局。

### 基础布局

使用单一分栏创建基础的栅格布局。

:::demo 通过 row 和 col 组件，并通过 col 组件的 `span` 属性我们就可以自由地组合布局。
```html
<z-row>
  <z-col :span="24"><div class="grid-content bg-purple-dark">233</div></z-col>
</z-row>
<z-row>
  <z-col :span="12"><div class="grid-content bg-purple">333</div></z-col>
  <z-col :span="12"><div class="grid-content bg-purple-light">33</div></z-col>
</z-row>
<z-row>
  <z-col :span="8"><div class="grid-content bg-purple">333</div></z-col>
  <z-col :span="8"><div class="grid-content bg-purple-light">33</div></z-col>
  <z-col :span="8"><div class="grid-content bg-purple">33</div></z-col>
</z-row>

<style>
  .z-row{
    margin-bottom: 20px;
  }
  .z-col {
    border-radius: 4px;
    text-align: center;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### 分栏间隔

分栏之间存在间隔。

:::demo Row 组件 提供 `gutter` 属性来指定每一栏之间的间隔，默认间隔为 0。
```html
<z-row :gutter="20">
  <z-col :span="6"><div class="grid-content bg-purple">111</div></z-col>
  <z-col :span="6"><div class="grid-content bg-purple">222</div></z-col>
  <z-col :span="6"><div class="grid-content bg-purple">333</div></z-col>
  <z-col :span="6"><div class="grid-content bg-purple">444</div></z-col>
</z-row>

<style>
  .z-row {
    margin-bottom: 20px;
  }
  .z-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### 混合布局

通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。

:::demo
```html
<z-row :gutter="20">
  <z-col :span="16"><div class="grid-content bg-purple">122</div></z-col>
  <z-col :span="8"><div class="grid-content bg-purple">234</div></z-col>
</z-row>
<z-row :gutter="20">
  <z-col :span="8"><div class="grid-content bg-purple">4565</div></z-col>
  <z-col :span="8"><div class="grid-content bg-purple">1111</div></z-col>
  <z-col :span="4"><div class="grid-content bg-purple">2222</div></z-col>
  <z-col :span="4"><div class="grid-content bg-purple">3333</div></z-col>
</z-row>
<z-row :gutter="20">
  <z-col :span="4"><div class="grid-content bg-purple">4444</div></z-col>
  <z-col :span="16"><div class="grid-content bg-purple">555</div></z-col>
  <z-col :span="4"><div class="grid-content bg-purple">66</div></z-col>
</z-row>

<style>
  .z-row {
    margin-bottom: 20px;
  }
  .z-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### 分栏偏移

支持偏移指定的栏数。

:::demo 通过制定 col 组件的 `offset` 属性可以指定分栏偏移的栏数。
```html
<z-row :gutter="20">
  <z-col :span="6"><div class="grid-content bg-purple">233</div></z-col>
  <z-col :span="6" :offset="6"><div class="grid-content bg-purple">4556</div></z-col>
</z-row>
<z-row :gutter="20">
  <z-col :span="6" :offset="6"><div class="grid-content bg-purple">5566</div></z-col>
  <z-col :span="6" :offset="6"><div class="grid-content bg-purple">4532</div></z-col>
</z-row>
<z-row :gutter="20">
  <z-col :span="12" :offset="6"><div class="grid-content bg-purple">3223</div></z-col>
</z-row>

<style>
  .z-row {
    margin-bottom: 20px;
  }
  .z-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### 对齐方式

通过 `flex` 布局来对分栏进行灵活的对齐。

:::demo 将 `type` 属性赋值为 'flex'，可以启用 flex 布局，并可通过 `justify` 属性来指定 start, center, end, space-between, space-around 其中的值来定义子元素的排版方式。
```html
<z-row type="flex" class="row-bg">
  <z-col :span="6"><div class="grid-content bg-purple">2334</div></z-col>
  <z-col :span="6"><div class="grid-content bg-purple-light">3455</div></z-col>
  <z-col :span="6"><div class="grid-content bg-purple">2334</div></z-col>
</z-row>
<z-row type="flex" class="row-bg" justify="center">
  <z-col :span="6"><div class="grid-content bg-purple">4523</div></z-col>
  <z-col :span="6"><div class="grid-content bg-purple-light">3333</div></z-col>
  <z-col :span="6"><div class="grid-content bg-purple">4444</div></z-col>
</z-row>
<z-row type="flex" class="row-bg" justify="end">
  <z-col :span="6"><div class="grid-content bg-purple">5555</div></z-col>
  <z-col :span="6"><div class="grid-content bg-purple-light">6666</div></z-col>
  <z-col :span="6"><div class="grid-content bg-purple">7777</div></z-col>
</z-row>
<z-row type="flex" class="row-bg" justify="space-between">
  <z-col :span="6"><div class="grid-content bg-purple">3445</div></z-col>
  <z-col :span="6"><div class="grid-content bg-purple-light">6875</div></z-col>
  <z-col :span="6"><div class="grid-content bg-purple">45</div></z-col>
</z-row>
<z-row type="flex" class="row-bg" justify="space-around">
  <z-col :span="6"><div class="grid-content bg-purple">56</div></z-col>
  <z-col :span="6"><div class="grid-content bg-purple-light">3</div></z-col>
  <z-col :span="6"><div class="grid-content bg-purple">3</div></z-col>
</z-row>

<style>
  .z-row {
    margin-bottom: 20px;
  }
  .z-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### 响应式布局

参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：`xs`、`sm`、`md`、`lg` 和 `xl`。

:::demo
```html
<z-row :gutter="10">
  <z-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple">23</div></z-col>
  <z-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light">33</div></z-col>
  <z-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple">44</div></z-col>
  <z-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light">66</div></z-col>
</z-row>

<style>
  .z-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
```
:::

### 基于断点的隐藏类

Element 额外提供了一系列类名，用于在某些条件下隐藏元素。这些类名可以添加在任何 DOM 元素或自定义组件上。如果需要，请自行引入以下文件：

```js
import 'element-ui/lib/theme-chalk/display.css';
```

包含的类名及其含义为：
- `hidden-xs-only` - 当视口在 `xs` 尺寸时隐藏
- `hidden-sm-only` - 当视口在 `sm` 尺寸时隐藏
- `hidden-sm-and-down` - 当视口在 `sm` 及以下尺寸时隐藏
- `hidden-sm-and-up` - 当视口在 `sm` 及以上尺寸时隐藏
- `hidden-md-only` - 当视口在 `md` 尺寸时隐藏
- `hidden-md-and-down` - 当视口在 `md` 及以下尺寸时隐藏
- `hidden-md-and-up` - 当视口在 `md` 及以上尺寸时隐藏
- `hidden-lg-only` - 当视口在 `lg` 尺寸时隐藏
- `hidden-lg-and-down` - 当视口在 `lg` 及以下尺寸时隐藏
- `hidden-lg-and-up` - 当视口在 `lg` 及以上尺寸时隐藏
- `hidden-xl-only` - 当视口在 `xl` 尺寸时隐藏

### Row Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| gutter | 栅格间隔 | number | — | 0 |
| type | 布局模式，可选 flex，现代浏览器下有效 | string | — | — |
| justify | flex 布局下的水平排列方式 | string | start/end/center/space-around/space-between | start |
| align | flex 布局下的垂直排列方式 | string | top/middle/bottom | top |
| tag | 自定义元素标签 | string | * | div |

### Col Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| span | 栅格占据的列数 | number | — | 24 |
| offset | 栅格左侧的间隔格数 | number | — | 0 |
| push |  栅格向右移动格数 | number | — | 0 |
| pull |  栅格向左移动格数 | number | — | 0 |
| xs | `<768px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| sm | `≥768px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| md | `≥992px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| lg | `≥1200px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| xl | `≥1920px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| tag | 自定义元素标签 | string | * | div |
