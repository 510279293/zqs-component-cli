import demoBlock from './demo-block.vue'
const components = [
  demoBlock
]

const install = function (Vue: any) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export {
  demoBlock
}

export default {
  install
}
