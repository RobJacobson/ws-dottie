/**
 * JSON parsing utilities for WSDOT and WSF APIs
 *
 * This module provides specialized JSON parsing that automatically transforms
 * API responses into JavaScript-friendly data structures. It handles:
 * - WSDOT date strings in "/Date(timestamp)/" format
 * - WSF Schedule date formats (MM/DD/YYYY and MM/DD/YYYY HH:MM:SS AM/PM)
 * - Preserves PascalCase property names from APIs
 *
 * Use parseWsdotJson() for automatic transformation or wsdotDateReviver
 * as a custom reviver with JSON.parse().
 */

/** biome-ignore-all lint/suspicious/noExplicitAny: <JSON parsing> */

/**
 * Type representing JSON-like data that can be transformed
 */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

/**
 * Type representing transformed data with Date objects and preserved PascalCase keys
 * Note: Properties can be removed by returning undefined in the reviver function
 */
export type JsonWithDates =
  | string
  | number
  | boolean
  | null
  | Date
  | JsonWithDates[]
  | { [key: string]: JsonWithDates };

// Regex patterns for WSF Schedule date formats
const MM_DD_YYYY_REGEX = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
const MM_DD_YYYY_DATETIME_REGEX =
  /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})\s+(AM|PM)$/i;

// Undocumented VesselWatch fields to filter out from VesselLocation responses
const VESSEL_WATCH_FIELDS = new Set([
  "VesselWatchShutID",
  "VesselWatchShutMsg",
  "VesselWatchShutFlag",
  "VesselWatchStatus",
  "VesselWatchMsg",
]);

/**
 * Parse MM/DD/YYYY date format to JavaScript Date or null
 *
 * Handles WSF Schedule date-only fields like FromDate and ThruDate
 *
 * @param dateString - Date string in MM/DD/YYYY format (e.g., "12/25/2024")
 * @returns JavaScript Date object or null if invalid
 *
 * @example
 * ```typescript
 * parseMmDdYyyyDate("12/25/2024") // Returns Date object for Dec 25, 2024
 * parseMmDdYyyyDate("02/30/2024") // Returns null (invalid date)
 * parseMmDdYyyyDate("") // Returns null
 * ```
 */
const parseMmDdYyyyDate = (dateString: string): Date | null => {
  if (dateString === "") {
    return null;
  }

  const match = dateString.match(MM_DD_YYYY_REGEX);
  if (!match) {
    return null;
  }

  const [, month, day, year] = match.map(Number);

  // Validate date components
  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900) {
    return null;
  }

  try {
    const date = new Date(year, month - 1, day);
    // Check if the date is valid (handles edge cases like Feb 30)
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return null;
    }
    return date;
  } catch {
    return null;
  }
};

/**
 * Parse MM/DD/YYYY HH:MM:SS AM/PM datetime format to JavaScript Date or null
 *
 * Handles WSF Schedule datetime fields like ModifiedDate
 *
 * @param dateTimeString - DateTime string in MM/DD/YYYY HH:MM:SS AM/PM format
 * @returns JavaScript Date object or null if invalid
 *
 * @example
 * ```typescript
 * parseMmDdYyyyDateTime("12/25/2024 02:30:45 PM") // Returns Date object
 * parseMmDdYyyyDateTime("12/25/2024 12:00:00 AM") // Returns Date object
 * parseMmDdYyyyDateTime("invalid") // Returns null
 * ```
 */
const parseMmDdYyyyDateTime = (dateTimeString: string): Date | null => {
  if (dateTimeString === "") {
    return null;
  }

  const match = dateTimeString.match(MM_DD_YYYY_DATETIME_REGEX);
  if (!match) {
    return null;
  }

  // Extract all parts from regex capture groups
  const [, month, day, year, hours, minutes, seconds, ampm] = match.map(Number);
  const ampmStr = match[7]; // AM/PM is not a number

  const adjustedHours = convert12To24Hour(hours, ampmStr.toUpperCase());
  try {
    return new Date(year, month - 1, day, adjustedHours, minutes, seconds, 0);
  } catch {
    return null;
  }
};

/**
 * Convert 12-hour format to 24-hour format
 *
 * @param h - Hour in 12-hour format (1-12)
 * @param ampm - "AM" or "PM"
 * @returns Hour in 24-hour format (0-23)
 *
 * @example
 * ```typescript
 * convert12To24Hour(2, "PM") // Returns 14
 * convert12To24Hour(12, "AM") // Returns 0
 * convert12To24Hour(12, "PM") // Returns 12
 * ```
 */
const convert12To24Hour = (h: number, ampm: string) =>
  ampm === "PM" && h !== 12 ? h + 12 : ampm === "AM" && h === 12 ? 0 : h;

/**
 * JSON reviver function that transforms WSDOT and WSF API data
 *
 * This function can be used as the second parameter to JSON.parse() to automatically
 * transform date strings during JSON parsing. It handles:
 * - WSF Schedule date formats (FromDate, ThruDate, ModifiedDate)
 * - WSDOT date strings in "/Date(timestamp)/" format
 * - Filters out unreliable VesselWatch fields from VesselLocation objects
 * - Preserves all other data types unchanged
 *
 * @param key - The property key (used to identify specific date fields)
 * @param value - The property value to potentially transform
 * @returns The original value, a Date object if the value was a date string, or undefined to remove the property
 *
 * @example
 * ```typescript
 * // WSDOT API response
 * const wsdotJson = '{"Time": "/Date(1753121700000-0700)/", "Name": "Test"}';
 * const data = JSON.parse(wsdotJson, wsdotDateReviver);
 * // data.Time is now a Date object, data.Name remains a string
 *
 * // WSF Schedule API response
 * const wsfJson = '{"FromDate": "12/25/2024", "ModifiedDate": "12/25/2024 02:30:45 PM"}';
 * const data = JSON.parse(wsfJson, wsdotDateReviver);
 * // Both FromDate and ModifiedDate are now Date objects
 *
 * // Undocumented VesselWatch fields are removed from the result
 * ```
 */
export const wsdotDateReviver = (
  key: string,
  value: JsonValue
): JsonWithDates | undefined => {
  // Filter out unreliable VesselWatch fields from VesselLocation objects
  if (VESSEL_WATCH_FIELDS.has(key)) {
    return undefined; // Remove these fields from the result
  }

  // Handle WSF Schedule alternative formats date-only fields (FromDate, ThruDate)
  if (typeof value === "string" && (key === "FromDate" || key === "ThruDate")) {
    return parseMmDdYyyyDate(value);
  }

  // Handle WSF Schedule alternative formats datetime field (ModifiedDate)
  if (typeof value === "string" && key === "ModifiedDate") {
    return parseMmDdYyyyDateTime(value);
  }

  // Handle WSDOT date strings - try to parse, returns original value if not a date
  if (
    typeof value === "string" &&
    value.startsWith("/Date(") &&
    value.endsWith(")/")
  ) {
    return wsdotDateTimestampToJsDate(value);
  }

  // Return all other values as-is (objects, arrays, primitives)
  return value;
};

/**
 * Parse JSON string with automatic WSDOT and WSF date conversion
 *
 * Convenience function that combines JSON.parse() with wsdotDateReviver
 * to automatically convert date strings to Date objects during parsing.
 *
 * @param text - The JSON string to parse
 * @returns The parsed object with Date objects for date strings
 *
 * @example
 * ```typescript
 * // WSDOT API response
 * const wsdotJson = '{"Time": "/Date(1753121700000-0700)/", "Name": "Test"}';
 * const data = parseWsdotJson(wsdotJson);
 * // data.Time is now a Date object, data.Name remains a string
 *
 * // WSF Schedule API response
 * const wsfJson = '{"FromDate": "12/25/2024", "ModifiedDate": "12/25/2024 02:30:45 PM"}';
 * const data = parseWsdotJson(wsfJson);
 * // Both FromDate and ModifiedDate are now Date objects
 *
 * // With TypeScript typing
 * interface ApiResponse { Time: Date; Name: string; }
 * const data = parseWsdotJson<ApiResponse>(wsdotJson);
 * ```
 */
export const parseWsdotJson = <T = any>(text: string): T => {
  return JSON.parse(text, wsdotDateReviver) as T;
};

/**
 * Convert WSDOT date string format to JavaScript Date
 *
 * WSDOT APIs return dates in "/Date(timestamp)/" format where timestamp
 * is milliseconds since Unix epoch, optionally with timezone offset.
 *
 * @param dateString - Date string in "/Date(timestamp)/" format
 * @returns JavaScript Date object or null if invalid
 *
 * @example
 * ```typescript
 * wsdotDateTimestampToJsDate("/Date(1753121700000-0700)/") // Returns Date object
 * wsdotDateTimestampToJsDate("/Date(1753121700000)/") // Returns Date object
 * wsdotDateTimestampToJsDate("not a date") // Returns null
 * ```
 */
const wsdotDateTimestampToJsDate = (dateString: string): Date | null => {
  const middle = dateString.slice(6, 19);
  const timestamp = parseInt(middle);

  try {
    return new Date(timestamp);
  } catch {
    return null;
  }
};
