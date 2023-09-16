import dayjs from "dayjs";

export class TimeSerivce{
   static transform(value: string | number | Date): string {
    if (!value) {
      return '';
    }
    const now = dayjs();
    const targetDate = dayjs(value);
    const diffYears = now.diff(targetDate, 'year');
    const diffMonths = now.diff(targetDate, 'month');
    const diffWeeks = now.diff(targetDate, 'week');
    const diffDays = now.diff(targetDate, 'day');
    const diffHours = now.diff(targetDate, 'hour');
    const diffMinutes = now.diff(targetDate, 'minute');
    const diffSeconds = now.diff(targetDate, 'second');
  
    if (diffMinutes === 0) {
      return '刚刚';
    } else if (diffMinutes > 0 && diffMinutes < 60) {
      return `${diffMinutes}分钟前`;
    } else if (diffYears > 0) {
      return `${diffYears}年前`;
    } else if (diffMonths > 0) {
      return `${diffMonths}个月前`;
    } else if (diffWeeks > 0) {
      return `${diffWeeks}周前`;
    } else if (diffDays > 0) {
      return `${diffDays}天前`;
    } else if (diffHours > 0) {
      return `${diffHours}小时前`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}分钟前`;
    } else {
      return '刚刚';
    }
  }

  static timeToStr(){}
}