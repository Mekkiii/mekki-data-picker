<template>
  <div class="arcana-date-content">
    <div class="custom-time-box">
      <div class="time-type">
        <a-select
          v-model="rangeType"
          placeholder="请选择"
        >
          <a-select-option value="between">介于</a-select-option>
          <a-select-option value="before">在此之前</a-select-option>
          <a-select-option value="after">在此之后</a-select-option>
        </a-select>
      </div>
      <div class="date-picker-box">
        <template v-if="rangeType == 'between'">
          <a-range-picker
            v-model="rangeTime"
            show-time
            @change="validateDate"
          >
            <a-input
              v-model="_inputValue"
              placeholder="开始时间-结束时间"
            >
              <a-icon
                slot="prefix"
                type="calendar"
              />
            </a-input>
          </a-range-picker>
        </template>
        <template v-else>
          <a-date-picker
            v-model="singleTime"
            show-time
            @change="validateDate"
          >
            <a-input
              v-model="_inputValue"
              placeholder="选择时间"
            >
              <a-icon
                slot="prefix"
                type="calendar"
              />
            </a-input>
          </a-date-picker>
        </template>
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
      >{{ errorMsg }}</div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      rangeType: "between", //下拉选项值
      singleTime: "", //单日期值
      rangeTime: [], //时间范围值
      isError: false,
      errorMsg: "",
      dateFormat: "YYYY-MM-DD HH:mm:ss"
    };
  },

  components: {},

  computed: {
    _inputValue() {
      if (this.rangeType == "between") {
        if (this.rangeTime == null || this.rangeTime.length == 0) {
          return "";
        } else {
          let startStr = moment(this.rangeTime[0]).format(this.dateFormat);
          let endStr = moment(this.rangeTime[1]).format(this.dateFormat);
          return `${startStr} - ${endStr}`;
        }
      } else {
        if (this.singleTime == "") {
          return "";
        } else {
          let dateStr = moment(this.singleTime).format(this.dateFormat);
          return dateStr;
        }
      }
    }
  },

  mounted() { },

  methods: {
    //提交
    onSubmit() {
      this.validateDate();
      if (!this.isError) {
        let value = {
          date: [],
          type: "absolute"
        };
        if (this.rangeType == "between") {
          let startTime = moment(this.rangeTime[0]).unix();
          let endTime = moment(this.rangeTime[1]).unix();
          value.date = [startTime, endTime];
        } else if (this.rangeType == "before") {
          let startTime = "";
          let endTime = moment(this.singleTime).unix();
          value.date = [startTime, endTime];
        } else {
          let startTime = moment(this.singleTime).unix();
          let endTime = "now";
          value.date = [startTime, endTime];
        }
        this.$emit("change", value);
      } else {
        return false;
      }
    },
    //设置值
    setValue(startTime, endTime) {
      //绝对一定是时间戳，匹配开始和结束时间中任意一个为时间戳就行,10位数字
      let _startObj = startTime.match(/^\d{10}$/);
      let _endObj = endTime.match(/^\d{10}$/);
      if (_startObj && endTime == "") {
        //可以匹配之后
        this.rangeType = "after";
        let _sTime = moment.unix(startTime).format(this.dateFormat);
        this.singleTime = moment(_sTime, this.dateFormat);
      } else if (_endObj && startTime == "") {
        //可以匹配之前
        this.rangeType = "before";
        let _endTime = moment.unix(endTime).format(this.dateFormat);
        this.singleTime = moment(_endTime, this.dateFormat);
      } else if (_startObj && _endObj) {
        //可以匹配介于
        this.rangeType = "between";
        let _sTime = moment.unix(startTime).format(this.dateFormat);
        let _endTime = moment.unix(endTime).format(this.dateFormat);
        this.rangeTime = [
          moment(_sTime, this.dateFormat),
          moment(_endTime, this.dateFormat)
        ];
      }
    },
    //验证时间
    validateDate(value, dateString) {
      console.log(value, dateString);
      this.isError = false;
      this.errorMsg = "";
      switch (this.rangeType) {
        case "before":
          if (this.singleTime == "") {
            this.isError = true;
            this.errorMsg = "时间不能为空";
          }
          break;
        case "between":
          if (!Array.isArray(this.rangeTime) || this.rangeTime.length != 2) {
            this.isError = true;
            this.errorMsg = "时间不能为空";
          } else {
            if (moment(this.rangeTime[0]).isSame(this.rangeTime[1])) {
              this.isError = true;
              this.errorMsg = "开始时间不能等于结束时间";
            }
          }
          break;
        case "after":
          if (this.singleTime == "") {
            this.isError = true;
            this.errorMsg = "时间不能为空";
          } else {
            if (moment(this.singleTime).isAfter(moment())) {
              this.isError = true;
              this.errorMsg = "开始时间不能大于当前时间";
            }
          }
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.arcana-date-content {
  .custom-time-box {
    position: relative;
    .time-type {
      margin-bottom: 8px;
      /deep/.ant-select {
        margin-right: 8px;
        width: 110px;
        .ant-select-selection {
          border-radius: 2px;
        }
      }
    }
    .date-picker-box {
      display: flex;
      ::v-deep.ant-calendar-picker {
        margin-right: 8px;
        flex: 1;
        .ant-input-affix-wrapper {
          .ant-input {
            border-radius: 2px;
          }
        }
      }
      ::v-deep.ant-btn {
        border-radius: 2px;
      }
    }
    .error-text {
      color: #f53333;
      font-size: 12px;
      height: 22px;
      line-height: 22px;
      margin-top: 8px;
    }
  }
}
</style>
