/* eslint-disable vue/require-v-for-key */
<template>
<div class="side-nav">
 <div v-for="(title, idx) in (Object.keys(data))" :key="idx" class="group-container">
    <p class="side-nav-title">{{title}}</p>
    <div class="side-nav-items" v-for="(nav,k) in data[title]" :key="k" >
        <div v-if="nav.desc">
            <router-link :class="$router.name === nav.name ? 'active' : ''" v-if="nav.name" :to="{name: nav.name}">{{nav.desc}}</router-link>
            <p v-else class="side-nav-group">{{nav.desc}}</p>
            <div v-for="(item,i) in nav.items" :key="i">
                <router-link :to="{name: item.name}" :class="$route.name === item.name ? 'active' : ''" class="slide-nav-component">{{item.desc}}</router-link>
            </div>
        </div>
    </div>
 </div>
</div>
</template>

<script>
import navConf from '../nav.config.json'

export default {
  data () {
    return {
      data: navConf
    }
  }

}
</script>
<style lang="less" scoped>
.side-nav {
display: inline-block;
margin: 32px 0;
padding: 0;
color: #3F536E;
    background-color: #fff;
    z-index: 99;
    .side-nav-title{
      padding: 0 24px 8px;
      color: #8DABC4;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .side-nav-items{
      font-size: 14px;
      font-weight: normal;
      line-height: 1.8;
      a{
        display: block;
        position: relative;
        padding: 8px 24px;
        color: #3F536E;
        font-weight: normal;
        line-height: 1.5;
        cursor: pointer;
      }
      .side-nav-group{
        display: block;
        position: relative;
        padding: 6px 0 6px 24px;
        color: #2C405A;
        font-weight: bold;
      }
      .slide-nav-component{
        display: block;
        position: relative;
        padding: 6px 24px 6px 32px;
        color: #616367;
        font-size: 14px;
      }
      .active{
        color: #3FAAF5;
      }
     }
}
</style>
