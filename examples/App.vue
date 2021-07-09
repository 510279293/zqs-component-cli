<template>
  <div id="app">
    <div class="container">
      <sideNav class="nav"></sideNav>
      <router-view class="view"></router-view>
    </div>
  </div>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import sideNav from './components/nav-side.vue'
@Component({
  components: {
    sideNav
  }
})
export default class App extends Vue {}
</script>
<style lang="less" scoped>
@import "./assets/style/index";
.container {
  margin: 48px auto;
  width: 90%;
  background-color: #fff;
  box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.5);
  display: flex;
  .nav {
    width: 210px;
  }
  .zeng-doc {
    width: calc(100% - 215px);
    padding: 32px 48px 48px;
    box-sizing: border-box;
  }
}
.container:after {
  content: '';
  clear: both;
  display: block;
}
</style>
