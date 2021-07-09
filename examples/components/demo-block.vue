<template>
  <div
    class="demo-block">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta" :style="{height: isExpand ? 'auto': '0'}">
        <div class="description" v-if="$slots.default">
          <slot></slot>
        </div>
        <div class="highlight">
          <slot name="highlight"></slot>
        </div>
    </div>
    <div class="demo-block-control" @click="toggle">{{isExpand ? '隐藏代码' : '显示代码'}}</div>
  </div>
</template>

<script>
/* eslint-disable */
  import Vue from 'vue'
  import hljs from 'highlight.js';
  import { stripStyle} from '../util'
  export default {
    name: 'demo-block',
    data() {
      return {
        isExpand: false
      };
    },
    mounted(){
      this.$nextTick(() => {
        const blocks = document.querySelectorAll('pre code:not(.hljs)');
        Array.prototype.forEach.call(blocks, hljs.highlightBlock);
      });
      // this.init()
    },
    methods: {
      toggle() {
        this.isExpand = !this.isExpand;
      },
      init () {
        const highlight = this.$slots.highlight;
        if (highlight && highlight[0]) {
          let code  = '';
          let cur = highlight[0];
          if (cur.tag === 'pre' && (cur.children && cur.children[0])) {
            cur = cur.children[0];
            if (cur.tag === 'code') {
              code = cur.children[0].text
            }
          }
          if (code) {
            stripStyle(code);
          }
          console.log(code)
        }
      }
    },
  };
</script>

<style lang="less" scoped>
.demo-block {
    border: solid 1px #ebebeb;
    border-radius: 3px;
    transition: .2s;

    &.hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
    }

    code {
      font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }

    .demo-button {
      float: right;
    }

    .source {
      padding: 24px;
    }

    .meta {
      background-color: #fafafa;
      border-top: solid 1px #eaeefb;
      overflow: hidden;
      height: 0;
      transition: height .2s;
    }

    .description {
      padding: 20px;
      box-sizing: border-box;
      border: solid 1px #ebebeb;
      border-radius: 3px;
      font-size: 14px;
      line-height: 22px;
      color: #666;
      word-break: break-word;
      margin: 10px;
      background-color: #fff;

      p {
        margin: 0;
        line-height: 26px;
      }

      code {
        color: #5e6d82;
        background-color: #e6effb;
        margin: 0 4px;
        display: inline-block;
        padding: 1px 5px;
        font-size: 12px;
        border-radius: 3px;
        height: 18px;
        line-height: 18px;
      }
    }

    .highlight {
      pre {
        margin: 0;
      }

      code.hljs {
        margin: 0;
        border: none;
        max-height: none;
        border-radius: 0;

        &::before {
          content: none;
        }
      }
    }

    .demo-block-control {
      border-top: solid 1px #eaeefb;
      height: 44px;
      line-height: 44px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      text-align: center;
      margin-top: -1px;
      color: #d3dce6;
      cursor: pointer;
      position: relative;
    
      &.is-fixed {
        position: fixed;
        bottom: 0;
        width: 868px;
      }

      i {
        font-size: 16px;
        line-height: 44px;
        transition: .3s;
        &.hovering {
          transform: translateX(-40px);
        }
      }

      > span {
        position: absolute;
        transform: translateX(-30px);
        font-size: 14px;
        line-height: 44px;
        transition: .3s;
        display: inline-block;
      }

      &:hover {
        color: #409EFF;
        background-color: #f9fafc;
      }

      & .text-slide-enter,
      & .text-slide-leave-active {
        opacity: 0;
        transform: translateX(10px);
      }
      
      .control-button {
        line-height: 26px;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 14px;
        padding-left: 5px;
        padding-right: 25px;
      }
    }
    /deep/ .z-row{
      margin-bottom: 20px;
    }
  }
</style>
<style lang="less" >
.content>ul.icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0!important;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    li {
      float: left;
      width: 16.66%;
      text-align: center;
      height: 120px;
      line-height: 120px;
      color: #666;
      font-size: 13px;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      margin-right: -1px;
      margin-bottom: -1px;
      &:after{
        content: "";
        height: 100%
      }
      span {
          line-height: normal;
          font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
          color: #99a9bf;
          transition: color .15s linear
      }
      i {
          display: block;
          font-size: 32px;
          margin-bottom: 15px;
          color: #606266;
          transition: color .15s linear
      }
      .icon-name {
          display: inline-block;
          padding: 0 3px;
          height: 1em
      }
    }
    li:after,li span {
      display: inline-block;
      vertical-align: middle
    }
    li:hover i,li:hover span {
        color: #5cb6ff
    }
}
</style>

