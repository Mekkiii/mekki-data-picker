import mekkiDatePicker from './src/index.vue'

// 为组件提供 install 方法
mekkiDatePicker.install = function (Vue) {
  Vue.component(mekkiDatePicker.name, mekkiDatePicker)
}

// 导出组件
export default mekkiDatePicker