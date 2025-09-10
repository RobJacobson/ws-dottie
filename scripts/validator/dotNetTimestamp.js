/**
 * @fileoverview .NET timestamp parsing utilities (JavaScript version)
 *
 * This module provides utilities for parsing .NET timestamp formats
 * used by WSDOT/WSF APIs, avoiding code duplication across the codebase.
 */

/**
 * Converts a .NET timestamp string to a JavaScript Date object
 *
 * Handles the format "/Date(timestamp[timezone])/" where:
 * - timestamp is a Unix timestamp in milliseconds (can be negative)
 * - timezone is optional and in format +/-HHMM
 *
 * @param {string} dateString - The .NET date string to convert
 * @returns {Date|null} JavaScript Date object or null if parsing fails
 */
export const parseDotNetTimestamp = (dateString) => {
  if (!dateString || typeof dateString !== "string") {
    return null;
  }

  // Check if it's a .NET timestamp format
  if (!dateString.startsWith("/Date(") || !dateString.endsWith(")/")) {
    return null;
  }

  // Extract timestamp from /Date(timestamp[timezone])/ format
  const start = 6; // Skip "/Date("
  const end = dateString.indexOf(")");
  const timestampStr = dateString.substring(start, end);
  
  // Find where the timezone starts (look for + or - after the timestamp)
  let timestampEnd = timestampStr.length;
  for (let i = 0; i < timestampStr.length; i++) {
    if ((timestampStr[i] === '+' || timestampStr[i] === '-') && i > 0) {
      timestampEnd = i;
      break;
    }
  }
  
  const timestamp = parseInt(timestampStr.substring(0, timestampEnd), 10);
  
  // Validate timestamp is a valid number (allow negative timestamps for WSF Schedule API)
  if (Number.isNaN(timestamp)) {
    return null;
  }

  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? null : date;
};

/**
 * Converts a .NET timestamp string to an ISO string
 *
 * @param {string} dateString - The .NET date string to convert
 * @returns {string} ISO string or original string if parsing fails
 */
export const convertDotNetTimestampToISO = (dateString) => {
  const date = parseDotNetTimestamp(dateString);
  return date ? date.toISOString() : dateString;
};
