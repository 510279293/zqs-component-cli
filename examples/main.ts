/* eslint-disable no-useless-escape */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import zenUI from '../es'
import commonComponents from './components'
import './assets/style/index.less'
import '../es/index.less'

Vue.use(zenUI)
Vue.use(commonComponents)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
