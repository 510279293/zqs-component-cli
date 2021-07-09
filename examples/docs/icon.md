<script>
  import icons from '@/icon'
  export default {
    data(){
      return {
        input: '',
        icons
      }
    },
    methods: {
      searchIcon(ev) {
        this.icons = icons.filter(v => v.includes(ev))
      }
    }
  }
</script>

## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `z-icon-iconName` 来使用即可。例如：


### 图标集合
<z-row>
  <z-input placeholder="搜索图标" v-model="input" @input="searchIcon" />
</z-row>
<ul class="icon-list">
  <li v-for="name in icons" :key="name">
    <span>
      <i :class="name"></i>
      <span class="icon-name">{{name}}</span>
    </span>
  </li>
</ul>
