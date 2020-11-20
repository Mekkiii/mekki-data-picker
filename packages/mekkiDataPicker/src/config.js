/**
 * @description arcana日期选择器默认配置
 * @author haiyang
 */

//预设默认值
let presetValues = [
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
];

//实时快捷默认值
let realTimeValues = [
  {
    label: "30秒窗口",
    value: 30,
    unit: "s"
  },
  {
    label: "1分钟窗口",
    value: 1,
    unit: "m"
  },
  {
    label: "5分钟窗口",
    value: 5,
    unit: "m"
  },
  {
    label: "30分钟窗口",
    value: 30,
    unit: "m"
  },
  {
    label: "1小时窗口",
    value: 1,
    unit: "h"
  },
  {
    label: "3小时窗口",
    value: 3,
    unit: "h"
  }
];

//时间单位 moment属性是对应moment里面的单位，用来比较日期
let timeUnits = [
  {
    label: "秒前",
    value: "s",
    momentUnit: "second"
  },
  {
    label: "分钟前",
    value: "m",
    momentUnit: "minute"
  },
  {
    label: "小时前",
    value: "h",
    momentUnit: "hour"
  },
  {
    label: "天前",
    value: "d",
    momentUnit: "day"
  },
  {
    label: "周前",
    value: "w",
    momentUnit: "week"
  },
  {
    label: "个月前",
    value: "mon",
    momentUnit: "month"
  },
  {
    label: "季度前",
    value: "q",
    momentUnit: "quarter"
  },
  {
    label: "年前",
    value: "y",
    momentUnit: "year"
  }
];

export { presetValues, realTimeValues, timeUnits };
