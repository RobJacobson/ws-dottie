/**
 * Date Parsing Utilities for WSDOT APIs
 *
 * This module provides date parsing and formatting utilities for
 * handling the date formats used by WSDOT APIs. It includes
 * parsing functions for converting API date strings to JavaScript Date
 * objects and formatting functions for converting JavaScript Date objects to
 * API-compatible string formats.
 *
 * Key Features:
 * - WSDOT date format parsing ("/Date(timestamp)/")
 * - Date formatting for API requests (YYYY-MM-DD)
 * - Comprehensive validation and error handling
 *
 * Supported Formats:
 * - WSDOT: "/Date(1703123456789)/" or "/Date(1703123456789-0700)/"
 * - ISO: "2024-12-25" or "2024-12-25T14:30:00"
 *
 * Usage:
 * ```typescript
 * // Parse WSDOT date format
 * const date = wsdotDateTimestampToJsDate("/Date(1703123456789)/");
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
 * Some APIs may return escaped versions like "\/Date(timestamp)\/".
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
