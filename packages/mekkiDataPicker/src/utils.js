/**
 * @description arcana日期选择器工具类
 * @author haiyang
 */
import moment from "moment";
import { presetValues, realTimeValues, timeUnits } from "./config";

/**
 * 根据传进来的时间对象,判断属于什么类型【预设、实时、相对时间、绝对时间】
 * @param {object} data
 * {startTime: "-5s",endTime: "now"}
 */
function getTimeType(startTime, endTime) {
  let types = ["preset", "real", "relative", "absolute"]; //所有的类型
  //都先转成字符串来处理
  let result = { isMatch: false, activeIndex: -1, type: "" }; //结果
  for (let i = 0; i < types.length; i++) {
    let type = types[i];
    switch (type) {
      case "preset":
        result = isMatchPreset(startTime, endTime);
        break;
      case "real":
        result = isMatchRealTime(startTime, endTime);
        break;
      case "relative":
        result = isMatchRelativeTime(startTime, endTime);
        break;
      case "absolute":
        result = isMatchAbsoluteTime(startTime, endTime);
        break;
    }
    result.type = type;
    //如果匹配到就跳出循环
    if (result.isMatch) {
      break;
    }
  }
  return result;
}

/**
 * 是否匹配预设里面的选项
 * @param {string} startTime
 * @param {string} endTime
 */
function isMatchPreset(startTime, endTime) {
  let activeIndex = presetValues.findIndex(
    item => item.startTime == startTime && item.endTime == endTime
  );
  let isMatch = activeIndex == -1 ? false : true;
  return {
    isMatch: isMatch,
    activeIndex: activeIndex
  };
}

/**
 * 是否匹配实时里面的选项
 * @param {string} startTime
 * @param {string} endTime
 */
function isMatchRealTime(startTime, endTime) {
  let matchStartTime = startTime.match(/^rt-(\d+)(s|m|h|d|w|mon|q|y)$/);
  let matchEndTime = endTime.match(/^rtnow$/);
  let isMatch = matchStartTime && matchEndTime ? true : false;
  let activeIndex = -1;
  if (isMatch) {
    activeIndex = realTimeValues.findIndex(
      item => item.value == matchStartTime[1] && item.unit == matchStartTime[2]
    );
  }
  return {
    isMatch: isMatch,
    activeIndex: activeIndex
  };
}

/**
 * 是否匹配相对时间里面的选项
 * @param {string} startTime
 * @param {string} endTime
 */
function isMatchRelativeTime(startTime, endTime) {
  let matchStartTime = startTime.match(/^-(\d+)(s|m|h|d|w|mon|q|y)$/);
  let matchEndTime = endTime.match(/^-(\d+)(s|m|h|d|w|mon|q|y)$/);
  let isMatch =
    (matchStartTime && matchEndTime) || (matchStartTime && endTime == "now")
      ? true
      : false;
  return {
    isMatch: isMatch,
    activeIndex: -1 //相对时间不存在快捷菜单
  };
}

/**
 * 是否匹配绝对时间里面的选项
 * @param {string} startTime
 * @param {string} endTime
 */
function isMatchAbsoluteTime(startTime, endTime) {
  //绝对一定是时间戳，匹配开始和结束时间中任意一个为时间戳就行,10位数字
  let matchStartTime = startTime.match(/^\d{10}$/);
  let matchEndTime = endTime.match(/^\d{10}$/);
  let isMatch = false;
  if (matchStartTime && endTime == "now") {
    //可以匹配之后
    isMatch = true;
  } else if (matchEndTime && startTime == "") {
    //可以匹配之前
    isMatch = true;
  } else if (matchStartTime && matchEndTime) {
    //可以匹配介于
    isMatch = true;
  } else {
    isMatch = false;
  }
  return {
    isMatch: isMatch,
    activeIndex: -1 //绝对时间不存在快捷菜单
  };
}

/**
 * 获取标签文本
 * @param {string} type
 * @param {object} data
 */
function getLabelText(type, startTime, endTime) {
  let labelText = "";
  switch (type) {
    case "preset":
      labelText = getPresetLabelText(startTime, endTime);
      break;
    case "real":
      labelText = getRealLabelText(startTime, endTime);
      break;
    case "relative":
      labelText = getRelativeLabelText(startTime, endTime);
      break;
    case "absolute":
      labelText = getAbsoluteLabelText(startTime, endTime);
      break;
  }
  return labelText;
}

/**
 * 获取预设值的labeltext
 * @param {string} startTime
 * @param {string} endTime
 */
function getPresetLabelText(startTime, endTime) {
  let obj = presetValues.find(item => {
    return item.startTime == startTime && item.endTime == endTime;
  });
  if (obj) {
    return obj.label;
  } else {
    return "";
  }
}

/**
 * 获取实时值的labeltext
 * @param {string} startTime
 * @param {string} endTime
 */
function getRealLabelText(startTime, endTime) {
  let textStr = "";
  let matchStartTime = startTime.match(/^rt-(\d+)(s|m|h|d|w|mon|q|y)$/);
  if (matchStartTime && endTime == "rtnow") {
    let value = matchStartTime[1];
    let unit = matchStartTime[2];
    let timeUnitLabel = getTimeUnitLabel(unit);
    textStr = `${value}${timeUnitLabel} 至 立即`;
  }
  return textStr;
}

/**
 * 获取相对时间值的labeltext
 * @param {string} startTime
 * @param {string} endTime
 */
function getRelativeLabelText(startTime, endTime) {
  let textStr = "";
  let matchStartTime = startTime.match(/^-(\d+)(s|m|h|d|w|mon|q|y)$/);
  let matchEndTime = endTime.match(/^-(\d+)(s|m|h|d|w|mon|q|y)$/);

  if (matchStartTime && matchEndTime) {
    let startValue = matchStartTime[1];
    let startUnit = matchStartTime[2];
    let startUnitLabel = getTimeUnitLabel(startUnit);
    let endValue = matchEndTime[1];
    let endUnit = matchEndTime[2];
    let endUnitLabel = getTimeUnitLabel(endUnit);
    textStr = `${startValue}${startUnitLabel} 至 ${endValue}${endUnitLabel}`;
  } else if (matchStartTime && endTime == "now") {
    let startValue = matchStartTime[1];
    let startUnit = matchStartTime[2];
    let startUnitLabel = getTimeUnitLabel(startUnit);
    textStr = `${startValue}${startUnitLabel} 至 现在`;
  }
  return textStr;
}

/**
 * 获取绝对时间值的labeltext
 * @param {string} startTime
 * @param {string} endTime
 */
function getAbsoluteLabelText(startTime, endTime) {
  let dateFormat = "YYYY-MM-DD HH:mm:ss";
  let textStr = "";
  //绝对一定是时间戳，匹配开始和结束时间中任意一个为时间戳就行,10位数字
  let matchStartTime = startTime.match(/^\d{10}$/);
  let matchEndTime = endTime.match(/^\d{10}$/);

  if (matchStartTime && endTime == "") {
    //匹配之后
    let startTimeFormat = moment.unix(startTime).format(dateFormat);
    textStr = `${startTimeFormat} 之后`;
  } else if (matchEndTime && startTime == "") {
    //可以匹配之前
    let endTimeFormat = moment.unix(endTime).format(dateFormat);
    textStr = `${endTimeFormat} 之前`;
  } else if (matchStartTime && matchEndTime) {
    //可以匹配介于
    let startTimeFormat = moment.unix(startTime).format(dateFormat);
    let endTimeFormat = moment.unix(endTime).format(dateFormat);
    textStr = `${startTimeFormat} - ${endTimeFormat}`;
  }
  return textStr;
}

/**
 * 根据单位获取label
 * @param {string} unit
 */
function getTimeUnitLabel(unit) {
  let timeUnit = timeUnits.find(item => item.value == unit);
  if (timeUnit) {
    return timeUnit.label;
  } else {
    return "";
  }
}

/**
 * 判断是不是时间数字，大于0的正整数
 * @param {*} value
 */
function isTimeNumber(value) {
  let num = Number(value);
  if (Number.isInteger(num) && num > 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * 比较开始和结束时间
 * @param {object} startTimeObj
 * @param {object} endTimeObj
 */
function compareDate(startValue, startUnit, endValue, endUnit) {
  //用当前时间减去选择的时间，然后进行比较
  let startMomentUnit = getMomentUnit(startUnit);
  let startMoment = moment().subtract(startMomentUnit, startValue);
  let endMoment = moment();
  if (endValue !== "now") {
    let endMomentUnit = getMomentUnit(endUnit);
    endMoment = moment().subtract(endMomentUnit, endValue);
  }
  //验证
  if (endMoment.isBefore(startMoment)) {
    return {
      isValid: false,
      msg: "结束时间不能早于开始时间"
    };
  } else if (startMoment.isSame(endMoment)) {
    return {
      isValid: false,
      msg: "开始时间不能等于结束时间"
    };
  } else {
    return {
      isValid: true,
      msg: "验证通过"
    };
  }
}

/**
 * 获取moment的单位
 * @param {string} unit
 */
function getMomentUnit(unit) {
  let timeUnit = timeUnits.find(item => item.value == unit);
  if (timeUnit) {
    return timeUnit.momentUnit;
  } else {
    return "";
  }
}

export { getTimeType, getLabelText, isTimeNumber, compareDate };
