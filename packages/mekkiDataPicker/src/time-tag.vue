<template>
  <div class="arcana-date-content">
    <a-tag
      v-for="(tag, index) in quickTags"
      :key="index"
      :class="[{ 'active-tag': tagIndex == index }]"
      @click="selectQuickTag(index)"
    >
      {{ tag.label }}
    </a-tag>
  </div>
</template>

<script>
export default {
  props: {
    timeChange: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      tagIndex: -1,
      //快捷菜单
      quickTags: [
        {
          label: "前10秒",
          startTime: "-10s",
          endTime: "now"
        },
        {
          label: "前30秒",
          startTime: "-30s",
          endTime: "now"
        },
        {
          label: "前1分钟",
          startTime: "-1m",
          endTime: "now"
        },
        {
          label: "前5分钟",
          startTime: "-5m",
          endTime: "now"
        },
        {
          label: "前10分钟",
          startTime: "-10m",
          endTime: "now"
        },
        {
          label: "前15分钟",
          startTime: "-15m",
          endTime: "now"
        },
        {
          label: "前30分钟",
          startTime: "-30m",
          endTime: "now"
        },
        {
          label: "前60分钟",
          startTime: "-60m",
          endTime: "now"
        },
        {
          label: "前12小时",
          startTime: "-12h@m",
          endTime: "now"
        },
        {
          label: "今天",
          startTime: "@d",
          endTime: "now"
        },
        {
          label: "本周",
          startTime: "@w1",
          endTime: "now"
        },
        {
          label: "本月",
          startTime: "@mon",
          endTime: "now"
        },
        {
          label: "本季度",
          startTime: "@q",
          endTime: "now"
        },
        {
          label: "本年度",
          startTime: "@y",
          endTime: "now"
        },
        {
          label: "昨天",
          startTime: "-1d@d",
          endTime: "@d"
        },
        {
          label: "前天",
          startTime: "-2d@d",
          endTime: "-1d@d"
        },
        {
          label: "上周",
          startTime: "-6d@w1",
          endTime: "-1d@w6"
        },
        {
          label: "上月",
          startTime: "-1mon@mon",
          endTime: "@mon"
        },
        {
          label: "上季度",
          startTime: "-1q@q",
          endTime: "@q"
        },
        {
          label: "上年度",
          startTime: "-1y@y",
          endTime: "@y"
        },
        {
          label: "所有时间",
          startTime: "",
          endTime: ""
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {
    //默认选中所有时间
    this.tagIndex = this.quickTags.length - 1;
  },

  methods: {
    //预设时间tag选择事件
    selectQuickTag(index) {
      this.tagIndex = index;
      this.onSubmit(index);
    },
    //提交
    onSubmit(index) {
      let tag = this.quickTags[index];
      let value = {
        label: tag.label,
        startTime: tag.startTime,
        endTime: tag.endTime,
        type: 0
      };
      this.$emit("update:timeChange", value);
    },
    //设置值
    setValue(data) {
      let index = this.quickTags.findIndex(item => {
        return item.startTime == data.startTime && item.endTime == data.endTime;
      });
      this.tagIndex = index;
    },
    //根据传进来的值查找是否存在
    isExistTime(data) {
      let _index = this.quickTags.findIndex(
        item => item.startTime == data.startTime && item.endTime == data.endTime
      );
      //如果存在则返回当前选项的type
      if (_index == -1) {
        return -1; //没找到
      } else {
        return 0; //表示能填充到预设里面
      }
    },
    //组装显示的label
    assembleLabel() {
      let tag = this.quickTags[this.tagIndex];
      if (tag != undefined) {
        return `${tag.label}`;
      } else {
        return "";
      }
    }
  },

  watch: {}
};
</script>
<style lang="less" scoped>
.arcana-date-content {
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
</style>
