import mekkiDataPicker from './src/index.vue'

// 为组件提供 install 方法
mekkiDataPicker.install = function (Vue) {
  Vue.component(mekkiDataPicker.name, mekkiDataPicker)
}

// 导出组件
export default mekkiDataPicker