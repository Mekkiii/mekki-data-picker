import Vue from 'vue'
import App from './App.vue'
import '../examples/assets/antd.css'


//按需加载ant组件
import "./ant-design-vue/components";
// import tippy from 'tippy.js';
// Vue.use(tippy)
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/themes/light.css';
import 'tippy.js/themes/light-border.css';
Vue.config.productionTip = false
import mekkiDatePicker from "../packages/index"
Vue.use(mekkiDatePicker)

// import VueTippy, { TippyComponent } from "vue-tippy";

// Vue.use(VueTippy);
// Vue.component("tippy", TippyComponent);
// import "../examples/assets/index.css"
// import "../examples/assets/light.css";
import moment from "moment"; //导入文件
Vue.prototype.$moment = moment; //赋值使用
new Vue({
  render: h => h(App),
}).$mount('#app')
