import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.less'


//按需加载ant组件
import "./ant-design-vue/components";
import "tippy.js/themes/light.css";
import "tippy.js/themes/light-border.css";
// import "tippy.js/themes/google.css";
import "tippy.js/themes/translucent.css";
import VueTippy, { TippyComponent } from "vue-tippy";

Vue.use(VueTippy);
Vue.component("tippy", TippyComponent);
Vue.config.productionTip = false
// import RealTime from '../packages'
// import RelativeTime from '../packages'
// import PresetTime from '../packages'
// import AbsoluteTime from '../packages'
// import PButton from "../packages"
// // // 使用组件库
// Vue.use(RealTime)
// Vue.use(RelativeTime)
// Vue.use(PresetTime)
// Vue.use(AbsoluteTime)
// Vue.use(PButton)
import mekkiDataPicker from "../packages/index"
Vue.use(mekkiDataPicker)
import moment from "moment"; //导入文件
Vue.prototype.$moment = moment; //赋值使用
new Vue({
  render: h => h(App),
}).$mount('#app')
