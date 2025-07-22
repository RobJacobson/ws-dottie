/**
 * JSON parsing utilities for WSDOT and WSF APIs
 *
 * Automatically transforms API responses into JavaScript-friendly data structures:
 * - WSDOT date strings: "/Date(timestamp)/" format
 * - WSF Schedule dates: "MM/DD/YYYY" and "MM/DD/YYYY HH:MM:SS AM/PM" formats
 * - Filters out unreliable VesselWatch fields
 * - Preserves PascalCase property names
 */

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

// Regex pattern for WSF Schedule date-only format (MM/DD/YYYY)
const MM_DD_YYYY_REGEX = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

// Regex pattern for WSF Schedule datetime format (MM/DD/YYYY HH:MM:SS AM/PM)
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
 * JSON reviver function that transforms WSDOT and WSF API data
 *
 * Handles:
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
    return undefined;
  }

  // Early return for non-string values
  if (typeof value !== "string") {
    return value;
  }

  // Handle WSF Schedule field-specific date parsing
  const wsfParser = WSF_DATE_PARSERS.get(key);
  if (wsfParser) {
    return wsfParser(value);
  }

  // Handle WSDOT date strings
  if (isWsdotDateString(value)) {
    return wsdotDateTimestampToJsDate(value);
  }

  return value;
};

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
  if (!dateString) return null;

  const match = dateString.match(MM_DD_YYYY_REGEX);
  if (!match) return null;

  const [, month, day, year] = match.map(Number);

  // Validate date components
  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  // Validate the created date matches the input (handles edge cases like Feb 30)
  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
    ? date
    : null;
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
  if (!dateTimeString) return null;

  const match = dateTimeString.match(MM_DD_YYYY_DATETIME_REGEX);
  if (!match) return null;

  const [, month, day, year, hours, minutes, seconds] = match.map(Number);
  const ampm = match[7].toUpperCase();

  const adjustedHours = convert12To24Hour(hours, ampm);
  const date = new Date(
    year,
    month - 1,
    day,
    adjustedHours,
    minutes,
    seconds,
    0
  );

  return Number.isNaN(date.getTime()) ? null : date;
};

/**
 * Convert 12-hour format to 24-hour format
 *
 * @param h - Hour in 12-hour format (1-12)
 * @param ampm - "AM" or "PM"
 * @returns Hour in 24-hour format (0-23)
 */
const convert12To24Hour = (hour: number, ampm: string): number => {
  if (ampm === "PM") return hour === 12 ? 12 : hour + 12;
  if (ampm === "AM") return hour === 12 ? 0 : hour;
  return hour;
};

// Field-specific date parsers for WSF Schedule API
const WSF_DATE_PARSERS = new Map<string, (value: string) => Date | null>([
  ["FromDate", parseMmDdYyyyDate],
  ["ThruDate", parseMmDdYyyyDate],
  ["ModifiedDate", parseMmDdYyyyDateTime],
]);

/**
 * Check if a string is a valid WSDOT date string
 */
const isWsdotDateString = (value: string): boolean =>
  value.length >= 19 && value.startsWith("/Date(") && value.endsWith(")/");

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
export const parseWsdotJson = <T = JsonWithDates>(text: string): T => {
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
  const timestamp = parseInt(dateString.slice(6, 19), 10);

  // Validate timestamp is a valid positive number
  if (Number.isNaN(timestamp) || timestamp < 0) {
    return null;
  }

  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? null : date;
};
