<template>
  <div class="arcana-date-content">
    <a-tag
      v-for="(tag, index) in quickTags"
      :key="index"
      :class="[{ 'active-tag': activeTagIndex == index }]"
      @click="clickTag(index)"
    >
      {{ tag.label }}
    </a-tag>
  </div>
</template>

<script>
import { presetValues } from "./config";
export default {
  data() {
    return {
      activeTagIndex: -1,
      //快捷菜单
      quickTags: presetValues
    };
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {
    //点击tag事件
    clickTag(index) {
      this.activeTagIndex = index;
      let tag = this.quickTags[index];
      this.$emit("change", {
        date: [tag.startTime, tag.endTime],
        type: "preset"
      });
    },
    //设置值
    setValue(startTime, endTime) {
      let index = this.quickTags.findIndex(item => {
        return item.startTime == startTime && item.endTime == endTime;
      });
      this.activeTagIndex = index;
    }
  }
};
</script>
<style lang="less" scoped>
.arcana-date-content {
  text-align: left;
  .ant-tag {
    text-align: left;
    margin-right: 8px;
    margin-bottom: 8px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.85);
    background-color: rgba(0, 0, 0, 0.05);
    width: 78px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    display: inline-block;
    border: 0;
    border-radius: 0;
    cursor: pointer;
    &:nth-child(4n) {
      margin-right: 0;
    }
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
    &:nth-last-child(2) {
      margin-bottom: 0;
    }
    &:nth-last-child(3) {
      margin-bottom: 0;
    }
    &:nth-last-child(4) {
      margin-bottom: 0;
    }
    &:hover {
      background: rgba(52, 112, 255, 1);
      color: rgba(255, 255, 255, 1);
    }
  }
  .active-tag {
    background: rgba(52, 112, 255, 1);
    color: rgba(255, 255, 255, 1);
  }
}
</style>
