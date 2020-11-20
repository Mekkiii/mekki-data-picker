<template>
  <a-config-provider :locale="zhCN">
    <a-popover
      :disabled="true"
      v-model="visible"
      trigger="click"
      placement="bottom"
      overlayClassName="arcana-date-picker-popover"
      @visibleChange="visibleChange"
    >
      <template slot="content">
        <a-card
          ref="time-card"
          class="arcana-date-picker-box"
          :bordered="false"
        >
          <a-collapse
            v-model="activeKey"
            accordion
            expandIconPosition="right"
          >
            <template #expandIcon="props">
              <a-icon
                type="caret-right"
                :rotate="props.isActive ? 90 : -90"
              />
            </template>
            <template v-for="type in items">
              <template v-if="type == 'preset'">
                <a-collapse-panel
                  header="预设"
                  :key="type"
                >
                  <preset-time
                    @change="timeChange"
                    ref="preset"
                  ></preset-time>
                </a-collapse-panel>
              </template>
              <template v-else-if="type == 'real'">
                <a-collapse-panel
                  header="实时"
                  :key="type"
                >
                  <real-time
                    @change="timeChange"
                    ref="real"
                  ></real-time>
                </a-collapse-panel>
              </template>
              <template v-else-if="type == 'relative'">
                <a-collapse-panel
                  header="相对时间"
                  :key="type"
                >
                  <relative-time
                    @change="timeChange"
                    ref="relative"
                  ></relative-time>
                </a-collapse-panel>
              </template>
              <template v-else-if="type == 'absolute'">
                <a-collapse-panel
                  header="绝对时间"
                  :key="type"
                >
                  <absolute-time
                    @change="timeChange"
                    ref="absolute"
                  ></absolute-time>
                </a-collapse-panel>
              </template>
            </template>
          </a-collapse>
        </a-card>
      </template>
      <slot name="content">
        <div
          class="time-content"
          :title="labelText"
        >
          {{ labelText }}
          <a-icon
            type="caret-down"
            class="arcana-date-arrow"
          />
        </div>
      </slot>
    </a-popover>
  </a-config-provider>
</template>

<script>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("en");
import PresetTime from "./preset-time";
import RelativeTime from "./relative-time";
import AbsoluteTime from "./absolute-time";
import RealTime from "./real-time";
import { getTimeType, getLabelText } from "./utils";
export default {
  name: "mekkiDataPicker",
  props: {
    value: {
      type: Array,
      default: function () {
        return ["", ""];
      }
    },
    items: {
      type: Array,
      default: function () {
        return ["preset", "real", "relative", "absolute"];
      }
    }
  },
  data() {
    return {
      zhCN,
      activeKey: "",
      timeValue: this.value,
      visible: false,
      labelText: ""
    };
  },

  components: {
    PresetTime,
    RelativeTime,
    AbsoluteTime,
    RealTime
  },

  computed: {},

  mounted() {
    this.init();
  },

  methods: {
    //初始化
    init() {
      if (this.timeValue.length == 2) {
        let startTime = this.timeValue[0].toString();
        let endTime = this.timeValue[1].toString();
        let result = getTimeType(startTime, endTime);
        this.labelText = getLabelText(result.type, startTime, endTime);
        this.$emit("getLabelText", this.labelText);
      }
    },
    //查找应该哪项默认展开并设置值
    findDefaultActiveItem() {
      if (this.timeValue.length == 2) {
        let startTime = this.timeValue[0].toString();
        let endTime = this.timeValue[1].toString();
        let result = getTimeType(startTime, endTime);
        this.activeKey = result.type;
        this.$nextTick(() => {
          this.$refs[result.type][0].setValue(startTime, endTime);
        });
      }
    },
    //显示隐藏的回调
    visibleChange(visible) {
      if (visible) {
        this.findDefaultActiveItem();
      } else {
        this.activeKey = "";
      }
    },
    //时间发生变化
    timeChange(data) {
      console.log(data);
      this.timeValue = data.date;
      let startTime = data.date[0].toString();
      let endTime = data.date[1].toString();
      this.labelText = getLabelText(data.type, startTime, endTime);
      this.$emit("getLabelText", this.labelText);
      this.visible = false;
    }
  },

  watch: {
    value(val) {
      this.timeValue = val;
      this.init();
    },
    timeValue(val) {
      this.$emit("input", val);
    }
  }
};
</script>
<style lang="less">
.arcana-date-picker-popover {
  padding: 10px;
  .ant-popover-inner-content {
    padding: 0;
  }
}
</style>
<style lang="less" scoped>
.time-content {
  background-color: white;
  border: 1px solid rgba(217, 217, 217, 1);
  height: 40px;
  line-height: 40px;
  padding: 0 16px;
  position: relative;
  min-width: 80px;
  padding-right: 30px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    border-color: #2977ff;
  }
  .arcana-date-arrow {
    position: absolute;
    right: 10px;
    left: auto;
    top: 50%;
    display: inline-block;
    font-size: 12px;
    transform: translateY(-50%);
  }
}
.arcana-date-picker-box {
  width: 368px;
  border-radius: 4px;
  box-sizing: content-box;
  ::v-deep.ant-card-body {
    padding: 0;
    .ant-collapse {
      border: 0;
      background-color: #ffffff;
      .ant-collapse-item {
        border-bottom: 0;
        margin-bottom: 8px;
        &:last-child {
          margin-bottom: 0;
        }
        .ant-collapse-header {
          background-color: rgba(0, 0, 0, 0.02);
          padding: 9px 16px;
          color: rgba(0, 0, 0, 0.45);
          font-weight: bold;
          .ant-collapse-arrow {
            color: rgba(0, 0, 0, 0.25);
          }
        }
        .ant-collapse-content {
          border-top: 0;
        }
      }
    }
  }
}
</style>
