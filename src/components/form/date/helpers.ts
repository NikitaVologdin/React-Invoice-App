export const THIS_YEAR = new Date().getFullYear();
export const THIS_MONTH = new Date().getMonth();
export const THIS_DAY = new Date().getDate();

export const WEEK_DAYS = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
};

export const CALENDAR_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const CALENDAR_WEEKS = 6;

export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const months30 = [3, 5, 8, 10];
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  if (month === 1) {
    return isLeapYear ? 29 : 28;
  }

  return months30.includes(month) ? 30 : 31;
};

export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  const date = new Date(year, month, 1);
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0) return 7;
  return dayOfWeek;
};

export const getPreviousMonth = (month: number) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  return prevMonth;
};

export default function createCalendar(month: number, year: number) {
  const calendar = [];
  const firstDay = getMonthFirstDay(month, year);
  const daysInTheMonth = getMonthDays(month, year);
  const prevMonth = getPreviousMonth(month);
  const prevMonthDays = getMonthDays(prevMonth, year) + 1;

  for (let i = 1; i <= CALENDAR_WEEKS * 7 + 1; i++) {
    if (i < firstDay) {
      calendar.push(prevMonthDays - firstDay + i);
      continue;
    }
    if (i == firstDay) {
      continue;
    }

    if (i - firstDay > daysInTheMonth) {
      calendar.push(i - firstDay - daysInTheMonth);
      continue;
    }

    calendar.push(i - firstDay);
  }

  return calendar;
}

function formatDateNumber(numStr: string): string {
  if (numStr.startsWith("0") && numStr.length === 2) {
    return numStr[1];
  }
  return numStr;
}

export function dateStringToArrayNumber(date: string) {
  const arr = date.split("-");
  const year = formatDateNumber(arr[0]);
  const month = formatDateNumber(arr[1]);
  const day = formatDateNumber(arr[2]);
  return [parseInt(year), parseInt(month), parseInt(day)].reverse();
}
