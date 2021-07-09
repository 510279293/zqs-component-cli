## Alert 警告

用于页面中展示重要的提示信息。

### 基本用法

顶部公告 banner

:::demo Alert 页面顶部通告形式，默认有图标且`type` 为 `warning`。
```html
<template>
  <z-alert
    message="成功提示的文案"
    banner>
  </z-alert>
  <z-alert
    message="消息提示的文案"
    banner
    closable>
  </z-alert>
  <z-alert
    message="警告提示的文案"
    banner
    :show-icon="false">
  </z-alert>
  <z-alert
    message="错误提示的文案"
    banner
    type="error">
  </z-alert>
</template>
```
:::

### 主题

Alert 含有辅助性文字介绍。

:::demo 含有辅助性文字介绍的警告提示。
```html
<template>
  <z-alert message="Success Text" type="success">
      <p slot="description">
        Success Description <span style="color: red">Success</span> Description Success Description
      </p>
    </z-alert>
    <z-alert
      message="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
    />
    <z-alert
      message="Warning Text"
      description="Warning Description Warning Description Warning Description Warning Description"
      type="warning"
    />
    <z-alert
      message="Error Text"
      description="Error Description Error Description Error Description Error Description"
      type="error"
    />
</template>
```
:::



### 四种样式

自定义关闭按钮为文字或其他符号。

:::demo 共有四种样式 `success`、`info`、`warning`、`error`
```html
<template>
   <z-alert message="Success Text" type="success" />
    <z-alert message="Info Text" type="info" />
    <z-alert message="Warning Text" type="warning" />
    <z-alert message="Error Text" type="error" />
</template>

<script>
  export default {
    methods: {
      hello() {
        alert('Hello World!');
      }
    }
  }
</script>
```
:::

### 带有 icon

表示某种状态时提升可读性。

:::demo 通过设置`show-icon`属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。
```html
<template>
   <z-alert message="Success Tips" type="success" show-icon />
    <z-alert message="Informational Notes" type="info" show-icon />
    <z-alert message="Warning" type="warning" show-icon />
    <z-alert message="Error" type="error" show-icon />
    <z-alert
      message="Success Tips"
      description="Detailed description and advices about successful copywriting."
      type="success"
      show-icon
    />
    <z-alert
      message="Informational Notes"
      description="Additional description and informations about copywriting."
      type="info"
      show-icon
    />
    <z-alert
      message="Warning"
      description="This is a warning notice about copywriting."
      type="warning"
      show-icon
    />
    <z-alert
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      show-icon
    />
</template>
```
:::

### 文字居中

使用 `center` 属性让文字水平居中。

:::demo
```html
<template>
  <z-alert
    message="成功提示的文案"
    type="success"
    center
    show-icon>
  </z-alert>
  <z-alert
    message="消息提示的文案"
    type="info"
    center
    show-icon>
  </z-alert>
  <z-alert
    message="警告提示的文案"
    type="warning"
    center
    show-icon>
  </z-alert>
  <z-alert
    message="错误提示的文案"
    type="error"
    center
    show-icon>
  </z-alert>
</template>
```
:::

### 带有辅助性文字介绍

包含标题和内容，解释更详细的警告。

:::demo 除了必填的`title`属性外，你可以设置`description`属性来帮助你更好地介绍，我们称之为辅助性文字。辅助性文字只能存放单行文本，会自动换行显示。
```html
<template>
  <z-alert
    message="带辅助性文字介绍"
    type="success"
    description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……">
  </z-alert>
</template>
```
:::

### 带有 icon 和辅助性文字介绍

:::demo 最后，这是一个同时具有 icon 和辅助性文字的样例。
```html
<template>
  <z-alert
    message="成功提示的文案"
    type="success"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </z-alert>
  <z-alert
    message="消息提示的文案"
    type="info"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </z-alert>
  <z-alert
    message="警告提示的文案"
    type="warning"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </z-alert>
  <z-alert
    message="错误提示的文案"
    type="error"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </z-alert>
</template>
<style>
  .demo-block .z-alert{
    margin-bottom: 20px;
  }
</style>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title     | 标题           | string | — | — |
| type | 主题 | string | success/warning/info/error | info |
| description | 辅助性文字。也可通过默认 slot 传入 | string | — | — |
| closable | 是否可关闭 | boolean | — | true |
| center | 文字是否居中 | boolean | — | true |
| close-text | 关闭按钮自定义文本 | string | — | — |
| show-icon | 是否显示图标 | boolean | — | false |
| effect | 选择提供的主题 | string | light/dark | light |

### Slot

| Name | Description |
|------|--------|
| — | 描述 |
| title | 标题的内容 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |
