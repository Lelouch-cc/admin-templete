/**
 * 日期时间工具函数
 * 基于 Day.js 实现，提供常用的日期格式化、计算、验证等功能
 */

import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import 'dayjs/locale/zh-cn';

// 加载插件
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);

// 设置中文语言
dayjs.locale('zh-cn');

export type DateInput = string | number | Date | Dayjs;

/**
 * 格式化日期
 * @param date 日期对象或时间戳
 * @param format 格式化模板 (YYYY-MM-DD HH:mm:ss)
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: DateInput, format = 'YYYY-MM-DD HH:mm:ss'): string {
  if (!date) return '';
  
  const d = dayjs(date);
  return d.isValid() ? d.format(format) : '';
}

/**
 * 格式化为相对时间
 * @param date 日期对象或时间戳
 * @returns 相对时间字符串 (如: 刚刚、5分钟前、2小时前)
 */
export function formatRelativeTime(date: DateInput): string {
  if (!date) return '';
  
  const d = dayjs(date);
  if (!d.isValid()) return '';
  
  return d.fromNow();
}

/**
 * 计算两个日期之间的天数差
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @returns 天数差
 */
export function getDaysDiff(startDate: DateInput, endDate: DateInput): number {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  
  if (!start.isValid() || !end.isValid()) return 0;
  
  return Math.abs(end.diff(start, 'day'));
}

/**
 * 添加天数
 * @param date 基础日期
 * @param days 要添加的天数
 * @returns 新的 Dayjs 对象
 */
export function addDays(date: DateInput, days: number): Dayjs {
  return dayjs(date).add(days, 'day');
}

/**
 * 添加月份
 * @param date 基础日期
 * @param months 要添加的月份数
 * @returns 新的 Dayjs 对象
 */
export function addMonths(date: DateInput, months: number): Dayjs {
  return dayjs(date).add(months, 'month');
}

/**
 * 添加年份
 * @param date 基础日期
 * @param years 要添加的年份数
 * @returns 新的 Dayjs 对象
 */
export function addYears(date: DateInput, years: number): Dayjs {
  return dayjs(date).add(years, 'year');
}

/**
 * 减去天数
 * @param date 基础日期
 * @param days 要减去的天数
 * @returns 新的 Dayjs 对象
 */
export function subtractDays(date: DateInput, days: number): Dayjs {
  return dayjs(date).subtract(days, 'day');
}

/**
 * 获取日期范围
 * @param type 范围类型
 * @returns 包含开始和结束日期的对象
 */
export function getDateRange(type: 'today' | 'yesterday' | 'week' | 'month' | 'year'): {
  start: Dayjs;
  end: Dayjs;
} {
  const now = dayjs();
  
  switch (type) {
    case 'today':
      return {
        start: now.startOf('day'),
        end: now.endOf('day')
      };
    
    case 'yesterday':
      const yesterday = now.subtract(1, 'day');
      return {
        start: yesterday.startOf('day'),
        end: yesterday.endOf('day')
      };
    
    case 'week':
      return {
        start: now.startOf('week'),
        end: now.endOf('week')
      };
    
    case 'month':
      return {
        start: now.startOf('month'),
        end: now.endOf('month')
      };
    
    case 'year':
      return {
        start: now.startOf('year'),
        end: now.endOf('year')
      };
    
    default:
      return {
        start: now.startOf('day'),
        end: now.endOf('day')
      };
  }
}

/**
 * 验证日期格式
 * @param dateString 日期字符串
 * @param format 期望的格式 (可选)
 * @returns 是否为有效日期
 */
export function isValidDate(dateString: string, format?: string): boolean {
  if (!dateString) return false;
  
  if (format) {
    return dayjs(dateString, format, true).isValid();
  }
  
  return dayjs(dateString).isValid();
}

/**
 * 获取当前时间戳
 * @returns 当前时间戳（毫秒）
 */
export function now(): number {
  return dayjs().valueOf();
}

/**
 * 获取今天开始时间
 * @param date 指定日期，默认为当前日期
 * @returns 今天 00:00:00 的 Dayjs 对象
 */
export function startOfDay(date?: DateInput): Dayjs {
  return dayjs(date).startOf('day');
}

/**
 * 获取今天结束时间
 * @param date 指定日期，默认为当前日期
 * @returns 今天 23:59:59.999 的 Dayjs 对象
 */
export function endOfDay(date?: DateInput): Dayjs {
  return dayjs(date).endOf('day');
}

/**
 * 获取月初时间
 * @param date 指定日期，默认为当前日期
 * @returns 月初 00:00:00 的 Dayjs 对象
 */
export function startOfMonth(date?: DateInput): Dayjs {
  return dayjs(date).startOf('month');
}

/**
 * 获取月末时间
 * @param date 指定日期，默认为当前日期
 * @returns 月末 23:59:59.999 的 Dayjs 对象
 */
export function endOfMonth(date?: DateInput): Dayjs {
  return dayjs(date).endOf('month');
}

/**
 * 判断是否为同一天
 * @param date1 第一个日期
 * @param date2 第二个日期
 * @returns 是否为同一天
 */
export function isSameDay(date1: DateInput, date2: DateInput): boolean {
  return dayjs(date1).isSame(dayjs(date2), 'day');
}

/**
 * 判断是否为今天
 * @param date 要判断的日期
 * @returns 是否为今天
 */
export function isToday(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs(), 'day');
}

/**
 * 判断是否为昨天
 * @param date 要判断的日期
 * @returns 是否为昨天
 */
export function isYesterday(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
}

/**
 * 判断是否为明天
 * @param date 要判断的日期
 * @returns 是否为明天
 */
export function isTomorrow(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs().add(1, 'day'), 'day');
}

/**
 * 判断是否为本周
 * @param date 要判断的日期
 * @returns 是否为本周
 */
export function isThisWeek(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs(), 'week');
}

/**
 * 判断是否为本月
 * @param date 要判断的日期
 * @returns 是否为本月
 */
export function isThisMonth(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs(), 'month');
}

/**
 * 判断是否为本年
 * @param date 要判断的日期
 * @returns 是否为本年
 */
export function isThisYear(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs(), 'year');
}

/**
 * 判断日期是否在指定范围内
 * @param date 要判断的日期
 * @param start 开始日期
 * @param end 结束日期
 * @returns 是否在范围内
 */
export function isBetween(date: DateInput, start: DateInput, end: DateInput): boolean {
  const d = dayjs(date);
  return d.isSameOrAfter(dayjs(start), 'day') && d.isSameOrBefore(dayjs(end), 'day');
}

/**
 * 格式化时间区间
 * @param start 开始时间
 * @param end 结束时间
 * @param separator 分隔符
 * @param format 日期格式
 * @returns 格式化的时间区间字符串
 */
export function formatDateRange(
  start: DateInput,
  end: DateInput,
  separator = ' - ',
  format = 'YYYY-MM-DD'
): string {
  const startStr = formatDate(start, format);
  const endStr = formatDate(end, format);
  return `${startStr}${separator}${endStr}`;
}

/**
 * 获取星期几
 * @param date 日期
 * @param locale 语言环境
 * @returns 星期几的字符串
 */
export function getWeekday(date: DateInput, locale = 'zh-cn'): string {
  return dayjs(date).locale(locale).format('dddd');
}

/**
 * 获取月份名称
 * @param date 日期
 * @param locale 语言环境
 * @returns 月份名称
 */
export function getMonthName(date: DateInput, locale = 'zh-cn'): string {
  return dayjs(date).locale(locale).format('MMMM');
}

/**
 * 获取季度
 * @param date 日期
 * @returns 季度数字 (1-4)
 */
export function getQuarter(date: DateInput): number {
  return Math.ceil((dayjs(date).month() + 1) / 3);
}

/**
 * 获取一年中的第几周
 * @param date 日期
 * @returns 周数
 */
export function getWeekOfYear(date: DateInput): number {
  return dayjs(date).week();
}

/**
 * 获取一年中的第几天
 * @param date 日期
 * @returns 天数
 */
export function getDayOfYear(date: DateInput): number {
  return dayjs(date).dayOfYear();
}

/**
 * 获取本月的天数
 * @param date 日期
 * @returns 本月的天数
 */
export function getDaysInMonth(date: DateInput): number {
  return dayjs(date).daysInMonth();
}

/**
 * 转换时区
 * @param date 日期
 * @param timezone 目标时区
 * @returns 转换后的 Dayjs 对象
 */
export function toTimezone(date: DateInput, timezone: string): Dayjs {
  return dayjs(date).tz(timezone);
}

/**
 * 转换为 UTC 时间
 * @param date 日期
 * @returns UTC 时间的 Dayjs 对象
 */
export function toUTC(date: DateInput): Dayjs {
  return dayjs(date).utc();
}

/**
 * 从 UTC 时间转换为本地时间
 * @param date UTC 日期
 * @returns 本地时间的 Dayjs 对象
 */
export function fromUTC(date: DateInput): Dayjs {
  return dayjs.utc(date).local();
}

/**
 * 创建 Dayjs 对象
 * @param date 日期输入
 * @returns Dayjs 对象
 */
export function createDate(date?: DateInput): Dayjs {
  return dayjs(date);
}

/**
 * 解析日期字符串
 * @param dateString 日期字符串
 * @param format 解析格式
 * @returns Dayjs 对象
 */
export function parseDate(dateString: string, format: string): Dayjs {
  return dayjs(dateString, format);
}

// 导出 dayjs 实例供直接使用
export { dayjs };
export default dayjs;