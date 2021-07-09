<script>
  export default {
    mounted(){
      console.log(123)
    }
  }
</script>

## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `z-icon-iconName` 来使用即可。例如：

<!-- :::demo
```html
<i class="z-icon-play"></i>
<z-icon type="play" color="red" />
<i class="z-icon-edit"></i>
<z-button type="primary" icon="search">搜索</z-button>

```
::: -->

### 图标集合
<z-row>
  <input placeholder="搜索图标" />
</z-row>
<ul class="icon-list">
  <li v-for="name in $icon" :key="name">
    <span>
      <i :class="name"></i>
      <span class="icon-name">{{name}}</span>
    </span>
  </li>
</ul>