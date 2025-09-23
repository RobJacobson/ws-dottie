/**
 * @fileoverview Date Utilities for WS-Dottie
 *
 * This module provides date conversion utilities specifically designed for
 * handling WSDOT/WSF API date formats. It includes conversion from .NET
 * datetime strings to JavaScript Date objects and various date formatting
 * utilities for API requests and responses.
 */

/**
 * Converts a WSDOT .NET timestamp string to a JavaScript Date object
 *
 * This function parses WSDOT's .NET datetime format ("/Date(timestamp)/")
 * and converts it to a JavaScript Date object. It handles both positive
 * and negative timestamps, as well as timezone offsets.
 *
 * The parsing logic:
 * - Extracts timestamp from position 6 to 6 characters from the end
 * - Handles timezone separators (+ or - after timestamp)
 * - Validates the resulting timestamp number
 *
 * @param dateString - The WSDOT date string to convert
 * @returns JavaScript Date object or null if parsing fails
 * @example
 * ```typescript
 * wsdotDateTimeToJSDate("/Date(1757451301100-0700)/") // Returns Date object
 * wsdotDateTimeToJSDate("/Date(-2208945600000-0800)/") // Returns Date object
 * wsdotDateTimeToJSDate("invalid") // Returns null
 * ```
 */
export const wsdotDateTimeToJSDate = (dateString: string): Date | null => {
  if (!dateString || typeof dateString !== "string") {
    return null;
  }

  // Simple validation: must start with "/Date(" and end with ")/"
  if (!dateString.startsWith("/Date(") || !dateString.endsWith(")/")) {
    return null;
  }

  // Extract timestamp: start 6 chars in, end 6 chars from the end
  const timestampStr = dateString.slice(6, -6);

  // Find timezone separator (+ or - after timestamp)
  const timezoneIndex = timestampStr.search(/[+-]/);
  const timestamp =
    timezoneIndex > 0 ? timestampStr.slice(0, timezoneIndex) : timestampStr;

  const timestampNum = parseInt(timestamp, 10);

  // Validate timestamp is a valid number
  if (Number.isNaN(timestampNum)) {
    return null;
  }

  const date = new Date(timestampNum);
  return Number.isNaN(date.getTime()) ? null : date;
};

/**
 * Converts a JavaScript Date to ISO date stamp (YYYY-MM-DD)
 *
 * This function formats a JavaScript Date object as an ISO date string
 * in YYYY-MM-DD format, which is commonly used in API requests.
 *
 * @param date - The JavaScript Date object to convert
 * @returns ISO date string in YYYY-MM-DD format
 * @example
 * ```typescript
 * jsDateToYyyyMmDd(new Date(2024, 0, 15)) // Returns "2024-01-15"
 * ```
 */
export const jsDateToYyyyMmDd = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Converts .NET datetime strings to JavaScript Date objects in response data
 *
 * This function recursively traverses an object/array structure and converts
 * any .NET datetime strings (format: "/Date(1234567890123)/") to JavaScript
 * Date objects, leaving other values unchanged. It uses JSON.parse with a
 * reviver function to process the data during parsing.
 *
 * @param data - The data structure to process
 * @returns The data with .NET dates converted to JS Date objects
 * @example
 * ```typescript
 * const data = { date: "/Date(1757451301100-0700)/", name: "test" };
 * const converted = convertDotNetDates(data);
 * // Result: { date: Date object, name: "test" }
 * ```
 */
export const convertDotNetDates = (data: unknown): unknown => {
  return JSON.parse(JSON.stringify(data), (_, value) => {
    if (typeof value === "string") {
      // Try .NET date format first
      const dotNetDate = wsdotDateTimeToJSDate(value);
      if (dotNetDate) {
        return dotNetDate;
      }

      // Try ISO-8601 date format
      const isoDate = new Date(value);
      if (!Number.isNaN(isoDate.getTime()) && isIso8601DateString(value)) {
        return isoDate;
      }

      return value;
    }
    return value;
  });
};

/**
 * Type guard for ISO-8601 date format
 *
 * This function checks if a string matches the ISO-8601 date format
 * with optional time and timezone information.
 *
 * @param value - The string to check
 * @returns True if the string matches ISO-8601 date format
 */
const isIso8601DateString = (value: string): boolean => {
  const isoRegex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?(Z|[+-]\d{2}:\d{2})?$/;
  return isoRegex.test(value);
};

/**
 * Date helper functions for runtime evaluation
 *
 * These functions return Date objects when called, ensuring they are
 * evaluated at runtime rather than build time. This is useful for
 * generating dynamic dates in API requests and sample data.
 */
export const datesHelper = {
  /** Returns tomorrow's date */
  tomorrow: (): Date => new Date(Date.now() + 24 * 60 * 60 * 1000),
  /** Returns the day after tomorrow's date */
  dayAfterTomorrow: (): Date => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  /** Returns today's date */
  today: (): Date => new Date(),
  /** Returns yesterday's date */
  yesterday: (): Date => new Date(Date.now() - 24 * 60 * 60 * 1000),
  /** Returns August 1, 2025 (start of month for sample data) */
  startOfMonth: (): Date => new Date(2025, 7, 1), // August 1, 2025
  /** Returns August 31, 2025 (end of month for sample data) */
  endOfMonth: (): Date => new Date(2025, 7, 31), // August 31, 2025
} as const;
