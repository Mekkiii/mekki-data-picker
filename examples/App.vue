<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <mekkiDataPicker></mekkiDataPicker>
      <tippy
        to="tippy01"
        @init="onTippyInit"
        @hidden="onHidden"
        interactive="true"
        theme="light"
        :distance="20"
        watch-props="true"
      >
        <div>
          Can coffee make you a better developer?
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptatibus quia, nulla!
          Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>

        <p> Timer: { { timer } } </p>

        <button @click="timer +=3">
          Increase
        </button>

      </tippy>

      <button name="tippy01">
        Click Me
      </button>
    </div>
  </a-config-provider>
</template>

<script>

import zhCN from "ant-design-vue/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
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

 