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
