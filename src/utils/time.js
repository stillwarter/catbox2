import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isLeapYear from 'dayjs/plugin/isLeapYear'

// 扩展Day.js功能插件
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isLeapYear)

/**
 * 时间处理工具函数库（基于Day.js封装）
 * 支持格式化、相对时间、时间计算、时区转换等功能
 */
const daytime= {
  /**
   * 获取当前时间
   * @param {string} [format] - 格式化字符串，不传则返回Dayjs对象
   * @returns {Dayjs|string} 当前时间
   */
  now: format => {
    const current = dayjs()
    return format ? current.format(format) : current
  },

  /**
   * 格式化时间
   * @param {string|number|Date|Dayjs} time - 原始时间（支持时间戳、日期字符串等）
   * @param {string} [format='YYYY-MM-DD HH:mm:ss'] - 格式化模板
   * @returns {string} 格式化后的时间字符串
   */
  format: (time, format = 'YYYY-MM-DD HH:mm:ss') => {
    if (!time) return ''
    return dayjs(time).format(format)
  },

  /**
   * 生成相对时间（如：3分钟前、2小时后）
   * @param {string|number|Date|Dayjs} time - 目标时间
   * @param {boolean} [withoutSuffix=false] - 是否不带后缀（如"3分钟"而非"3分钟前"）
   * @returns {string} 相对时间文本
   */
  fromNow: (time, withoutSuffix = false) => {
    if (!time) return ''
    return dayjs(time).fromNow(withoutSuffix)
  },

  /**
   * 计算两个时间的差值
   * @param {string|number|Date|Dayjs} time1 - 时间1
   * @param {string|number|Date|Dayjs} time2 - 时间2
   * @param {string} [unit='day'] - 单位（year/month/day/hour/minute/second）
   * @returns {number} 时间差（time1 - time2）
   */
  diff: (time1, time2, unit = 'day') => {
    if (!time1 || !time2) return 0
    return dayjs(time1).diff(dayjs(time2), unit)
  },

  /**
   * 时间增减计算
   * @param {string|number|Date|Dayjs} time - 基准时间
   * @param {number} value - 增减数值
   * @param {string} [unit='day'] - 单位（year/month/day/hour/minute/second）
   * @param {string} [format] - 格式化字符串，不传则返回Dayjs对象
   * @returns {Dayjs|string} 计算后的时间
   */
  add: (time, value, unit = 'day', format) => {
    if (!time) return null
    const result = dayjs(time).add(value, unit)
    return format ? result.format(format) : result
  },

  /**
   * 时间减少计算
   * @param {string|number|Date|Dayjs} time - 基准时间
   * @param {number} value - 减少数值
   * @param {string} [unit='day'] - 单位
   * @param {string} [format] - 格式化字符串
   * @returns {Dayjs|string} 计算后的时间
   */
  subtract: (time, value, unit = 'day', format) => {
    if (!time) return null
    const result = dayjs(time).subtract(value, unit)
    return format ? result.format(format) : result
  },

  /**
   * 转换为指定时区时间
   * @param {string|number|Date|Dayjs} time - 原始时间
   * @param {string} [targetTimezone='Asia/Shanghai'] - 目标时区
   * @param {string} [format='YYYY-MM-DD HH:mm:ss'] - 格式化字符串
   * @returns {string} 转换后的时间
   */
  toTimezone: (
    time,
    targetTimezone = 'Asia/Shanghai',
    format = 'YYYY-MM-DD HH:mm:ss'
  ) => {
    if (!time) return ''
    return dayjs(time).tz(targetTimezone).format(format)
  },

  /**
   * 转换为时间戳
   * @param {string|number|Date|Dayjs} time - 时间
   * @param {boolean} [isSecond=false] - 是否返回秒级时间戳（默认毫秒）
   * @returns {number} 时间戳
   */
  toTimestamp: (time, isSecond = false) => {
    if (!time) return 0
    return isSecond ? dayjs(time).unix() : dayjs(time).valueOf()
  },

  /**
   * 判断是否为闰年
   * @param {string|number|Date|Dayjs} time - 时间
   * @returns {boolean} 是否为闰年
   */
  isLeapYear: time => {
    if (!time) return false
    return dayjs(time).isLeapYear()
  },

  /**
   * 获取指定时间所在月份的天数
   * @param {string|number|Date|Dayjs} time - 时间
   * @returns {number} 月份天数
   */
  getDaysInMonth: time => {
    if (!time) return 0
    return dayjs(time).daysInMonth()
  }
}

export default daytime
