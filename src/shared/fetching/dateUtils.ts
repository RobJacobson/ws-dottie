// Date utilities for WSF Schedule API

/**
 * Converts a JavaScript Date to WSF API date format (MM/DD/YYYY)
 */
export const dateToWsfFormat = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

/**
 * Converts a JavaScript Date to WSF API path parameter format (YYYY-MM-DD)
 */
export const dateToWsfPathFormat = (date: Date): string => {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD format
};

/**
 * Converts a JavaScript Date to WSF API time format (HH:MM AM/PM)
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
 */
export const dateToWsfDateTimeFormat = (date: Date): string => {
  return `${dateToWsfFormat(date)} ${dateToWsfTimeFormat(date)}`;
};

/**
 * Parses WSF API date format (MM/DD/YYYY) to JavaScript Date
 */
export const parseWsfScheduleDate = (dateString: string): Date => {
  const [month, day, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Parses WSF API time format (HH:MM AM/PM) to JavaScript Date (today's date)
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
 * Parses various WSF date formats to JavaScript Date
 * Handles WSF /Date(timestamp)/ format, regular date strings, Date objects, and timestamps
 *
 * @param dateInput - Date input that can be a string, Date object, or number
 * @returns JavaScript Date object
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
    // Handle WSF date format: "/Date(timestamp)/"
    const match = dateInput.match(/\/Date\((\d+)(?:[+-]\d+)?\)\//);
    if (match) {
      return new Date(parseInt(match[1]));
    }

    // Handle regular date strings
    return new Date(dateInput);
  }

  // Fallback
  console.warn("Unexpected date format:", dateInput);
  return new Date();
};

/**
 * Gets today's date in WSF format
 */
export const getTodayWsfFormat = (): string => {
  return dateToWsfFormat(new Date());
};

/**
 * Gets tomorrow's date in WSF format
 */
export const getTomorrowWsfFormat = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return dateToWsfFormat(tomorrow);
};

/**
 * Checks if a date is today
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
 */
export const getDateLabel = (date: Date): string => {
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return dateToWsfFormat(date);
};
