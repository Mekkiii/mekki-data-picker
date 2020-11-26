<template>
  <div id="app">
    1<br>
    1<br>
    1<br>
    1<br>
    1<br>
    1<br>
    1<br>
    1<br>
    1<br>
    1<br>
    1<br>
    1<br>
    1<br>
    1<br>

    1<br>
    <mekkiDatePicker></mekkiDatePicker>

  </div>
</template>

<script>

import zhCN from "ant-design-vue/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
// import tippy from 'tippy.js';
moment.locale("en");
export default {

  name: 'App',
  data() {
    return {
      zhCN
    }
  },
}
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

 