import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import hljs from 'highlight.js'
import navConf from '@/nav.config.json'

Vue.use(VueRouter)

let docRoutes: Array<RouteConfig> = []

Object.keys(navConf).forEach((header) => {
  docRoutes = docRoutes.concat(navConf[header])
})

const addComponent = (router: any = []) => {
  router.forEach((route: any) => {
    if (route.items) {
      addComponent(route.items)
      docRoutes = docRoutes.concat(route.items)
    } else {
      if (route.type === 'pages') {
        route.component = (r: any) => require.ensure([], () =>
          r(require(`../views/${route.name}.vue`)))
        return
      }
      route.component = (r: any) => require.ensure([], () => {
        // console.log('wewe', require(`../docs/${route.name}.md`))
        return r(require(`../docs/${route.name}.md`))
      })
    }
  })
}
addComponent(docRoutes)

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: docRoutes
})

router.afterEach(() => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
})

export default router
