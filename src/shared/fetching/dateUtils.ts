// Date utilities for WSF Schedule API

/**
 * Converts a JavaScript Date to WSF API date format (MM/DD/YYYY)
 *
 * @example
 * Input: new Date('2024-12-25')
 * Output: "12/25/2024"
 */
export const dateToWsfFormat = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

/**
 * Converts a JavaScript Date to WSF API path parameter format (YYYY-MM-DD)
 *
 * @example
 * Input: new Date('2024-12-25')
 * Output: "2024-12-25"
 */
export const dateToWsfPathFormat = (date: Date): string => {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD format
};

/**
 * Converts a JavaScript Date to ISO date stamp (YYYY-MM-DD)
 *
 * @example
 * Input: new Date('2024-12-25')
 * Output: "2024-12-25"
 */
export const toDateStamp = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

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
  return `${dateToWsfFormat(date)} ${dateToWsfTimeFormat(date)}`;
};

/**
 * Parses WSF API date format (MM/DD/YYYY) to JavaScript Date
 *
 * @example
 * Input: "12/25/2024"
 * Output: Date object representing December 25, 2024
 */
export const parseWsfScheduleDate = (dateString: string): Date => {
  const [month, day, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Parses WSF API time format (HH:MM AM/PM) to JavaScript Date (today's date)
 *
 * @example
 * Input: "2:30 PM"
 * Output: Date object representing today at 2:30 PM
 */
export const parseWsfTime = (timeString: string): Date => {
  const [time, ampm] = timeString.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(
    ampm === "PM" && hours !== 12
      ? hours + 12
      : hours === 12 && ampm === "AM"
        ? 0
        : hours
  );
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};

/**
 * Parses WSF API datetime format (MM/DD/YYYY HH:MM AM/PM) to JavaScript Date
 *
 * @example
 * Input: "12/25/2024 2:30 PM"
 * Output: Date object representing December 25, 2024 at 2:30 PM
 */
export const parseWsfDateTime = (dateTimeString: string): Date => {
  const [datePart, timePart] = dateTimeString.split(" ");
  const date = parseWsfScheduleDate(datePart);
  const time = parseWsfTime(
    `${timePart} ${dateTimeString.split(" ").pop() || ""}`
  );

  date.setHours(time.getHours());
  date.setMinutes(time.getMinutes());
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};

/**
 * Parses WSF /Date(timestamp)/ format to JavaScript Date
 * Uses fixed substring operations instead of regex for better performance
 * WSF timestamps are always 13 digits (milliseconds since epoch)
 *
 * @example
 * Input: "/Date(1703123456789)/"
 * Output: Date object representing the timestamp
 */
export const parseWsfDateString = (dateString: string): Date => {
  // Check if it's a WSF date format: "/Date(timestamp)/"
  if (dateString.startsWith("/Date(") && dateString.endsWith(")/")) {
    // Extract the 13-digit timestamp: positions 6-19
    // "/Date(" is 6 characters, timestamp is 13 digits
    const timestamp = dateString.substring(6, 19);
    return new Date(parseInt(timestamp));
  }

  // Handle regular date strings
  return new Date(dateString);
};

/**
 * Parses various WSF date formats to JavaScript Date
 * Handles WSF /Date(timestamp)/ format, regular date strings, Date objects, and timestamps
 *
 * @param dateInput - Date input that can be a string, Date object, or number
 * @returns JavaScript Date object
 *
 * @example
 * Input: "/Date(1703123456789)/"
 * Output: Date object representing the timestamp
 *
 * @example
 * Input: "2024-12-25"
 * Output: Date object representing December 25, 2024
 *
 * @example
 * Input: new Date('2024-12-25')
 * Output: Same Date object (no conversion)
 *
 * @example
 * Input: 1703123456789
 * Output: Date object representing the timestamp
 */
export const parseWsfDate = (dateInput: string | Date | number): Date => {
  // If it's already a Date object, return it
  if (dateInput instanceof Date) {
    return dateInput;
  }

  // If it's a number (timestamp), convert it
  if (typeof dateInput === "number") {
    return new Date(dateInput);
  }

  // If it's a string, parse it
  if (typeof dateInput === "string") {
    return parseWsfDateString(dateInput);
  }

  // Fallback
  console.warn("Unexpected date format:", dateInput);
  return new Date();
};

/**
 * Gets today's date in WSF format (MM/DD/YYYY)
 *
 * @example
 * If today is December 25, 2024
 * Output: "12/25/2024"
 */
export const getTodayWsfFormat = (): string => {
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
 * Gets a human-readable date label (Today, Tomorrow, or formatted date)
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
 * Input: new Date('2024-12-25') (when not today or tomorrow)
 * Output: "12/25/2024"
 */
export const getDateLabel = (date: Date): string => {
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return dateToWsfFormat(date);
};
