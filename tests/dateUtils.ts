// Date utilities for testing purposes
// These functions are not used in production code but may be useful for tests

/**
 * Converts a JavaScript Date to WSF API time format (HH:MM AM/PM)
 *
 * @example
 * Input: new Date('2024-12-25T14:30:00')
 * Output: "2:30 PM"
 */
export const dateToWsfTimeFormat = (date: Date): string => {
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes} ${ampm}`;
};

/**
 * Converts a JavaScript Date to WSF API datetime format (MM/DD/YYYY HH:MM AM/PM)
 *
 * @example
 * Input: new Date('2024-12-25T14:30:00')
 * Output: "12/25/2024 2:30 PM"
 */
export const dateToWsfDateTimeFormat = (date: Date): string => {
  const { dateToWsfFormat } = require("@/shared/fetching/dateUtils");
  return `${dateToWsfFormat(date)} ${dateToWsfTimeFormat(date)}`;
};

/**
 * Parses WSF API datetime format (MM/DD/YYYY HH:MM AM/PM) to JavaScript Date
 *
 * @example
 * Input: "12/25/2024 2:30 PM"
 * Output: Date object representing December 25, 2024 at 2:30 PM
 */
export const parseWsfDateTime = (dateTimeString: string): Date => {
  const {
    parseWsfScheduleDate,
    parseWsfTime,
  } = require("@/shared/fetching/dateUtils");
  const [datePart, timePart] = dateTimeString.split(" ");
  const date = parseWsfScheduleDate(datePart);
  const time = parseWsfTime(timePart);

  date.setHours(time.getHours());
  date.setMinutes(time.getMinutes());
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};

/**
 * Gets today's date in WSF format (MM/DD/YYYY)
 *
 * @example
 * If today is December 25, 2024
 * Output: "12/25/2024"
 */
export const getTodayWsfFormat = (): string => {
  const { dateToWsfFormat } = require("@/shared/fetching/dateUtils");
  return dateToWsfFormat(new Date());
};

/**
 * Gets tomorrow's date in WSF format (MM/DD/YYYY)
 *
 * @example
 * If today is December 25, 2024
 * Output: "12/26/2024"
 */
export const getTomorrowWsfFormat = (): string => {
  const { dateToWsfFormat } = require("@/shared/fetching/dateUtils");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return dateToWsfFormat(tomorrow);
};

/**
 * Checks if a date is today
 *
 * @example
 * Input: new Date() (current date)
 * Output: true
 *
 * @example
 * Input: new Date('2024-12-25') (when today is not December 25, 2024)
 * Output: false
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Checks if a date is tomorrow
 *
 * @example
 * Input: tomorrow's date
 * Output: true
 *
 * @example
 * Input: today's date
 * Output: false
 */
export const isTomorrow = (date: Date): boolean => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};

/**
 * Gets a user-friendly date label
 *
 * @example
 * Input: today's date
 * Output: "Today"
 *
 * @example
 * Input: tomorrow's date
 * Output: "Tomorrow"
 *
 * @example
 * Input: any other date
 * Output: "12/25/2024"
 */
export const getDateLabel = (date: Date): string => {
  const { dateToWsfFormat } = require("@/shared/fetching/dateUtils");
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return dateToWsfFormat(date);
};
