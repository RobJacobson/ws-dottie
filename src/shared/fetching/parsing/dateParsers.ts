/**
 * Date Parsing Utilities for WSDOT and WSF APIs
 *
 * This module provides comprehensive date parsing and formatting utilities for
 * handling the various date formats used by WSDOT and WSF APIs. It includes
 * both parsing functions for converting API date strings to JavaScript Date
 * objects and formatting functions for converting JavaScript Date objects to
 * API-compatible string formats.
 *
 * Key Features:
 * - WSDOT date format parsing ("/Date(timestamp)/")
 * - WSF Schedule date format parsing ("MM/DD/YYYY", "MM/DD/YYYY HH:MM:SS AM/PM")
 * - Date formatting for API requests (YYYY-MM-DD, MM/DD/YYYY)
 * - Field-specific date parsers for WSF Schedule API
 * - Comprehensive validation and error handling
 *
 * Supported Formats:
 * - WSDOT: "/Date(1703123456789)/" or "/Date(1703123456789-0700)/"
 * - WSF Schedule: "12/25/2024" or "12/25/2024 02:30:45 PM"
 * - ISO: "2024-12-25" or "2024-12-25T14:30:00"
 *
 * Usage:
 * ```typescript
 * // Parse WSDOT date format
 * const date = wsdotDateTimestampToJsDate("/Date(1703123456789)/");
 *
 * // Parse WSF Schedule date format
 * const date = parseMmDdYyyyDate("12/25/2024");
 *
 * // Format date for API requests
 * const formatted = jsDateToYyyyMmDd(new Date("2024-12-25"));
 * ```
 */

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
 * Converts a JavaScript Date to WSF API date format (MM/DD/YYYY)
 *
 * @example
 * Input: new Date('2024-12-25')
 * Output: "12/25/2024"
 */
export const jsDateToMmDdYyyy = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${month}/${day}/${year}`;
};

// Regex patterns for date parsing
const MM_DD_YYYY_REGEX = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
const MM_DD_YYYY_DATETIME_REGEX =
  /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})\s+(AM|PM)$/i;

/**
 * Parse MM/DD/YYYY date format to JavaScript Date or null
 *
 * Handles WSF Schedule date fields like FromDate and ThruDate
 *
 * @param dateString - Date string in MM/DD/YYYY format
 * @returns JavaScript Date object or null if invalid
 *
 * @example
 * ```typescript
 * parseMmDdYyyyDate("12/25/2024") // Returns Date object for Dec 25, 2024
 * parseMmDdYyyyDate("02/30/2024") // Returns null (invalid date)
 * parseMmDdYyyyDate("") // Returns null
 * ```
 */
export const parseMmDdYyyyDate = (dateString: string): Date | null => {
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
export const parseMmDdYyyyDateTime = (dateTimeString: string): Date | null => {
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
export const convert12To24Hour = (hour: number, ampm: string): number => {
  if (ampm === "PM") return hour === 12 ? 12 : hour + 12;
  if (ampm === "AM") return hour === 12 ? 0 : hour;
  return hour;
};

/**
 * Check if a string is a valid WSDOT date string
 * Handles both regular "/Date(timestamp)/" and escaped "\/Date(timestamp)\/" formats
 */
export const isWsdotDateString = (value: string): boolean =>
  value.length >= 19 &&
  (value.startsWith("/Date(") || value.startsWith("\\/Date(")) &&
  (value.endsWith(")/") || value.endsWith(")\\/"));

/**
 * Convert WSDOT date string format to JavaScript Date
 *
 * WSDOT APIs return dates in "/Date(timestamp)/" format where timestamp
 * is milliseconds since Unix epoch, optionally with timezone offset.
 * WSF APIs may return escaped versions like "\/Date(timestamp)\/".
 *
 * @param dateString - Date string in "/Date(timestamp)/" or "\/Date(timestamp)\/" format
 * @returns JavaScript Date object or null if invalid
 *
 * @example
 * wsdotDateTimestampToJsDate("/Date(1753121700000-0700)/") // Returns Date object
 * wsdotDateTimestampToJsDate("\\/Date(1753121700000-0700)\\/") // Returns Date object
 * wsdotDateTimestampToJsDate("/Date(1753121700000)/") // Returns Date object
 * wsdotDateTimestampToJsDate("not a date") // Returns null
 */
export const wsdotDateTimestampToJsDate = (dateString: string): Date | null => {
  // Remove escaped forward slashes if present
  const cleanDateString = dateString.replace(/\\\//g, "/");
  const timestamp = parseInt(cleanDateString.slice(6, 19), 10);

  // Validate timestamp is a valid number (allow negative timestamps for WSF Schedule API)
  if (Number.isNaN(timestamp)) {
    return null;
  }

  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? null : date;
};

// Field-specific date parsers for WSF APIs
export const WSF_DATE_PARSERS = new Map<string, (value: string) => Date | null>(
  [
    // WSF Schedule API fields
    ["FromDate", parseMmDdYyyyDate],
    ["ThruDate", parseMmDdYyyyDate],
    ["ModifiedDate", parseMmDdYyyyDateTime],
    // WSF Vessels API fields (WSDOT date format)
    ["ScheduledDeparture", wsdotDateTimestampToJsDate],
    ["TimeStamp", wsdotDateTimestampToJsDate],
    ["LeftDock", wsdotDateTimestampToJsDate],
    ["Eta", wsdotDateTimestampToJsDate],
  ]
);
