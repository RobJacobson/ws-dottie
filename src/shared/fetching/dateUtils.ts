// Date utilities for WSF Schedule API

/**
 * Converts a JavaScript Date to WSF API date format (MM/DD/YYYY)
 *
 * @example
 * Input: new Date('2024-12-25')
 * Output: "12/25/2024"
 */
export const jsDateToMmDdYyyy = (date: Date): string => {
  const [year, month, day] = date.toISOString().split("T")[0].split("-");
  return `${month}/${day}/${year}`;
};

/**
 * Converts a JavaScript Date to ISO date stamp (YYYY-MM-DD)
 *
 * @example
 * Input: new Date('2024-12-25')
 * Output: "2024-12-25"
 */
export const jsDateToYyyyMmDd = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Parses WSF API date format (MM/DD/YYYY) to JavaScript Date
 *
 * @example
 * Input: "12/25/2024"
 * Output: Date object representing December 25, 2024
 */
export const wsdotScheduleDateToJsDate = (dateString: string): Date => {
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
export const wsdotTimeToJsDate = (timeString: string): Date => {
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
 * Universal WSF date parser - handles various formats
 * Returns null for non-date strings (doesn't throw errors)
 *
 * @example
 * // MM/DD/YYYY format (WSF Schedule API)
 * Input: "12/25/2024"
 * Output: Date object representing December 25, 2024
 *
 * @example
 * // ISO format (YYYY-MM-DD)
 * Input: "2024-12-25"
 * Output: Date object representing December 25, 2024
 *
 * @example
 * // ISO datetime format (YYYY-MM-DDTHH:mm:ss)
 * Input: "2024-12-25T14:30:00"
 * Output: Date object representing December 25, 2024 at 2:30 PM
 *
 * @example
 * // WSF timestamp format (/Date(timestamp)/)
 * Input: "/Date(1703123456789)/"
 * Output: Date object representing the timestamp
 *
 * @example
 * // Already a Date object
 * Input: new Date('2024-12-25')
 * Output: Same Date object (no conversion)
 *
 * @example
 * // Unix timestamp (number)
 * Input: 1703123456789
 * Output: Date object representing the timestamp
 *
 * @example
 * // Non-date string
 * Input: "not a date"
 * Output: null
 */
export const wsdotDateToJsDate = (
  dateInput: string | Date | number
): Date | null => {
  if (dateInput instanceof Date) return dateInput;
  if (typeof dateInput === "number") return new Date(dateInput);

  const input = dateInput as string;

  // Handle empty strings
  if (input === "") {
    return null;
  }

  // Skip very short strings that are unlikely to be dates
  if (input.length < 8) {
    return null;
  }

  // Handle WSF /Date(timestamp)/ format
  if (input.startsWith("/Date(")) {
    const middle = input.slice(6, 19);
    const timestamp = parseInt(middle);
    return new Date(timestamp);
  }

  // Handle ISO datetime format (YYYY-MM-DDTHH:mm:ss)
  if (isIsoDateTime(input)) {
    return new Date(input);
  }

  // Handle YYYY-MM-DD format
  if (isYyyyMmDdDate(input)) {
    return new Date(input);
  }

  // Handle MM/DD/YYYY HH:MM:SS AM/PM format
  if (isMmDdYyyyDateTime(input)) {
    return new Date(input);
  }

  // Handle MM/DD/YYYY format
  if (isMmDdYyyyDate(input)) {
    const [month, day, year] = input.split("/").map(Number);
    return new Date(year, month - 1, day);
  }

  // Fallback to native Date parsing for other formats
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
};

/**
 * Checks if a string matches YYYY-MM-DD date format
 */
const isYyyyMmDdDate = (str: string): boolean => {
  const yyyyMmDdRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!yyyyMmDdRegex.test(str)) return false;

  // Additional validation to ensure it's actually a date
  const [year, month, day] = str.split("-").map(Number);

  // Check reasonable year range (1900-2100)
  if (year < 1900 || year > 2100) return false;

  // Check month range (1-12)
  if (month < 1 || month > 12) return false;

  // Check day range (1-31)
  if (day < 1 || day > 31) return false;

  // Validate the date is actually valid
  const date = new Date(str);
  return !Number.isNaN(date.getTime()) && jsDateToYyyyMmDd(date) === str;
};

/**
 * Checks if a string matches ISO datetime format (YYYY-MM-DDTHH:mm:ss)
 */
const isIsoDateTime = (str: string): boolean => {
  const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  if (!isoDateTimeRegex.test(str)) return false;

  // Validate the date is actually valid
  const date = new Date(str);
  return !Number.isNaN(date.getTime());
};

/**
 * Checks if a string matches MM/DD/YYYY date format
 */
const isMmDdYyyyDate = (str: string): boolean => {
  const mmDdYyyyRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!mmDdYyyyRegex.test(str)) return false;

  // Validate the date is actually valid
  const [month, day, year] = str.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    !Number.isNaN(date.getTime()) &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date.getFullYear() === year
  );
};

/**
 * Checks if a string matches MM/DD/YYYY HH:MM:SS AM/PM datetime format
 */
const isMmDdYyyyDateTime = (str: string): boolean => {
  const mmDdYyyyDateTimeRegex =
    /^\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d{2}:\d{2}\s+(AM|PM)$/i;
  if (!mmDdYyyyDateTimeRegex.test(str)) return false;

  // Validate the date is actually valid
  const [datePart, timePart] = str.split(" ");
  const [month, day, year] = datePart.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    !Number.isNaN(date.getTime()) &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date.getFullYear() === year
  );
};
