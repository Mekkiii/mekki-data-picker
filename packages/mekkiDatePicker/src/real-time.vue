<template>
  <div class="arcana-date-content">
    <div class="quick-select-box">
      <a-tag
        v-for="(tag, index) in quickTags"
        :key="index"
        :class="[{ 'active-tag': activeTagIndex == index }]"
        @click="clickTag(index)"
      >
        {{ tag.label }}
      </a-tag>
    </div>
    <div class="custom-time-box">
      <span class="text-span">最早:</span>
      <a-input-number
        id="inputNumber"
        v-model="startTimeValue"
        :min="1"
        @change="changeInput"
      />
      <a-select
        v-model="startTimeUnit"
        placeholder="请选择"
        @change="changeSelect"
      >
        <a-select-option
          v-for="(item, index) in timeUnits"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
      <a-button
        type="primary"
        @click="onSubmit"
      >
        确定
      </a-button>
    </div>
    <div
      class="error-text"
      v-show="isError"
    >无效的时间</div>
  </div>
</template>

<script>
import { realTimeValues, timeUnits } from "./config";
import { isTimeNumber } from "./utils";
export default {
  data() {
    return {
      isError: false,
      activeTagIndex: -1, //默认选中快捷菜单
      startTimeValue: 5, //开始时间值
      startTimeUnit: "s", //开始时间单位
      quickTags: realTimeValues, //快捷菜单
      timeUnits: timeUnits //时间下拉选项
    };
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {
    //点击快捷菜单tag事件
    clickTag(index) {
      this.activeTagIndex = index; //选中
      let currentTag = this.quickTags[index];
      this.startTimeValue = currentTag.value;
      this.startTimeUnit = currentTag.unit;
    },
    //输入变化
    changeInput(value) {
      let flag = this.validateDate(value);
      if (flag) {
        this.updateActiveTag(value, this.startTimeUnit);
      }
    },
    //下拉框变化
    changeSelect(unit) {
      this.updateActiveTag(this.startTimeValue, unit);
    },
    //更新被选中的tag
    updateActiveTag(value, unit) {
      let index = this.quickTags.findIndex(
        item => item.value == value && item.unit == unit
      );
      this.activeTagIndex = index;
    },
    //验证时间是否正确
    validateDate(value) {
      let flag = isTimeNumber(value);
      this.isError = !flag;
      return flag;
    },
    //确定
    onSubmit() {
      let flag = this.validateDate(this.startTimeValue);
      if (flag) {
        let value = {
          date: [`rt-${this.startTimeValue}${this.startTimeUnit}`, `rtnow`],
          type: "real"
        };
        this.$emit("change", value);
      }
    },
    //设置值
    setValue(startTime, endTime) {
      let matchStartTime = startTime.match(/^rt-(\d+)(s|m|h|d|w|mon|q|y)$/);
      if (matchStartTime && endTime == "rtnow") {
        this.startTimeValue = matchStartTime[1];
        this.startTimeUnit = matchStartTime[2];
        this.updateActiveTag(this.startTimeValue, this.startTimeUnit);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.arcana-date-content {
  .quick-select-box {
    margin-bottom: 16px;
    text-align: left;
    .ant-tag {
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
  .custom-time-box {
    display: flex;
    align-items: center;
    .text-span {
      display: inline-block;
      margin-right: 8px;
      width: 42px;
    }
    ::v-deep.ant-input-number {
      width: 110px;
      border-radius: 2px;
      margin-right: 8px;
      .ant-input-number-handler-wrap {
        opacity: 1;
        width: 40px;
        background: rgba(0, 0, 0, 0.04);
        border-radius: 2px;
        border-left: 1px solid rgba(217, 217, 217, 1);
        .ant-input-number-handler-up-inner,
        .ant-input-number-handler-down-inner {
          right: 12px;
        }
      }
    }
    ::v-deep.ant-select {
      margin-right: 8px;
      width: 90px;
      .ant-select-selection {
        border-radius: 2px;
      }
    }
    ::v-deep.ant-btn {
      border-radius: 2px;
    }
  }
  .error-text {
    color: rgba(245, 51, 51, 1);
    font-size: 12px;
    padding-left: 46px;
    height: 22px;
    line-height: 22px;
    margin-top: 8px;
  }
}
</style>
