<template>
  <div class="arcana-date-content">
    <div class="custom-time-box">
      <div class="start-time-box">
        <a-input-number
          id="inputNumber"
          v-model="startTimeValue"
          :min="1"
          @change="changeInput"
        />
        <a-select
          v-model="startTimeUnit"
          placeholder="请选择"
          @change="changeUnit"
        >
          <a-select-option
            v-for="(item, index) in timeUnits"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
      <div class="time-text">
        至
      </div>
      <div class="end-time-box">
        <a-input-number
          id="inputNumber"
          v-model="endTimeValue"
          :min="1"
          @change="changeInput"
          v-show="showEndTimeValue"
        />
        <a-select
          v-model="endTimeUnit"
          placeholder="请选择"
          @change="changeUnit"
        >
          <a-select-option value="">
            现在（实时）
          </a-select-option>
          <a-select-option
            v-for="(item, index) in timeUnits"
            :key="index"
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
    </div>
    <div
      class="error-text"
      v-show="isError"
    >{{ errorMsg }}</div>
  </div>
</template>

<script>
import { timeUnits } from "./config";
import { isTimeNumber, compareDate } from "./utils";
export default {
  data() {
    return {
      isError: false,
      errorMsg: "",
      startTimeValue: 5, //开始时间值
      startTimeUnit: "s", //开始时间单位
      endTimeValue: "now", //结束时间值
      endTimeUnit: "", //结束时间单位
      timeUnits: timeUnits, //时间下拉选项
      showEndTimeValue: false //是否显示结束时间框，当选中现在时不显示
    };
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {
    onSubmit() {
      if (this.validateDate()) {
        let startTime = `-${this.startTimeValue}${this.startTimeUnit}`;
        let endTime = "now";
        if (this.endTimeValue != "now") {
          endTime = `-${this.endTimeValue}${this.endTimeUnit}`;
        }
        let value = {
          date: [startTime, endTime],
          type: "relative"
        };
        this.$emit("change", value);
      } else {
        console.warn("验证有误");
      }
    },
    //输入变化
    changeInput() {
      this.validateDate();
    },
    //切换单位
    changeUnit() {
      if (this.endTimeUnit == "") {
        this.endTimeValue = "now";
        this.showEndTimeValue = false;
      } else {
        this.endTimeValue = 1;
        this.showEndTimeValue = true;
      }
      this.validateDate();
    },
    //设置值
    setValue(startTime, endTime) {
      let start_obj = startTime.match(/^-(\d+)(s|m|h|d|w|mon|q|y)$/);
      let end_obj = endTime.match(/^-(\d+)(s|m|h|d|w|mon|q|y)$/);

      if (start_obj && end_obj) {
        this.startTimeValue = start_obj[1];
        this.startTimeUnit = start_obj[2];
        this.endTimeValue = end_obj[1];
        this.endTimeUnit = end_obj[2];
        this.showEndTimeValue = true;
      } else if (start_obj && endTime == "now") {
        this.startTimeValue = start_obj[1];
        this.startTimeUnit = start_obj[2];
        this.endTimeValue = "now";
        this.endTimeUnit = "";
        this.showEndTimeValue = false;
      }
      this.validateDate();
    },
    //验证时间是否正确
    validateDate() {
      let startFlag = isTimeNumber(this.startTimeValue);
      let endFlag = true;
      if (this.endTimeValue !== "now") {
        endFlag = isTimeNumber(this.endTimeValue);
      }
      if (startFlag && endFlag) {
        let result = compareDate(
          this.startTimeValue,
          this.startTimeUnit,
          this.endTimeValue,
          this.endTimeUnit
        );
        this.isError = !result.isValid;
        this.errorMsg = result.msg;
        return result.isValid;
      } else {
        this.isError = true;
        this.errorMsg = "无效的时间";
        return false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.arcana-date-content {
  .custom-time-box {
    text-align: left;
    display: flex;
    flex-direction: column;
    .start-time-box {
      display: flex;
      margin-bottom: 8px;
      ::v-deep.ant-select {
        flex: none;
        width: 126px;
      }
    }
    .time-text {
      margin-bottom: 8px;
    }
    .end-time-box {
      display: flex;
    }
    ::v-deep.ant-input-number {
      width: 120px;
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
      flex: 1;
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
    height: 22px;
    line-height: 22px;
    margin-top: 8px;
  }
}
</style>
