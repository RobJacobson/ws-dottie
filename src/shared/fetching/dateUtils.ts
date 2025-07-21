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
 * Universal WSF date parser - handles various formats
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
 * // Other formats (fallback to native Date parsing)
 * Input: "December 25, 2024"
 * Output: Date object (if parseable by native Date constructor)
 */
export const parseWsfDate = (dateInput: string | Date | number): Date => {
  if (dateInput instanceof Date) return dateInput;
  if (typeof dateInput === "number") return new Date(dateInput);

  const input = dateInput as string;

  // Handle MM/DD/YYYY format
  if (input.includes("/") && input.length === 10) {
    return parseWsfScheduleDate(input);
  }

  // Handle ISO format (YYYY-MM-DD)
  if (input.includes("-") && input.length === 10) {
    const date = new Date(input);
    if (Number.isNaN(date.getTime())) {
      throw new Error(`Invalid date format: ${input}`);
    }
    return date;
  }

  // Handle ISO datetime format (YYYY-MM-DDTHH:mm:ss)
  if (input.includes("T") && input.includes(":")) {
    const date = new Date(input);
    if (Number.isNaN(date.getTime())) {
      throw new Error(`Invalid datetime format: ${input}`);
    }
    return date;
  }

  // Handle /Date(timestamp)/ format
  if (input.startsWith("/Date(")) {
    const middle = input.slice(6, 19);
    const timestamp = parseInt(middle);
    return new Date(timestamp);
  }

  // Fallback to native Date parsing
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${input}`);
  }
  return date;
};

/**
 * Safe date parser that returns null for invalid dates instead of throwing
 * Used internally by transformWsdotData for data transformation
 */
// export const parseWsfDateSafe = (
//   dateInput: string | Date | number
// ): Date | null => {
//   if (dateInput instanceof Date) return dateInput;
//   if (typeof dateInput === "number") return new Date(dateInput);

//   const input = dateInput as string;

//   // Handle empty strings as null
//   if (input === "") {
//     return null;
//   }

//   // Handle MM/DD/YYYY format
//   if (input.includes("/") && input.length === 10) {
//     return parseWsfScheduleDate(input);
//   }

//   // Handle ISO format (YYYY-MM-DD)
//   if (input.includes("-") && input.length === 10) {
//     const date = new Date(input);
//     return Number.isNaN(date.getTime()) ? null : date;
//   }

//   // Handle ISO datetime format (YYYY-MM-DDTHH:mm:ss)
//   if (input.includes("T") && input.includes(":")) {
//     const date = new Date(input);
//     return Number.isNaN(date.getTime()) ? null : date;
//   }

//   // Handle /Date(timestamp)/ format
//   if (input.startsWith("/Date(")) {
//     const middle = input.slice(6, 19);
//     const timestamp = parseInt(middle);
//     return new Date(timestamp);
//   }

//   // Fallback to native Date parsing
//   const date = new Date(input);
//   return Number.isNaN(date.getTime()) ? null : date;
// };
