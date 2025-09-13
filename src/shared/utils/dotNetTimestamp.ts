/**
 * @fileoverview .NET timestamp parsing utilities
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
 * @param dateString - The .NET date string to convert
 * @returns JavaScript Date object or null if parsing fails
 * @example
 * ```typescript
 * parseDotNetTimestamp("/Date(1757451301100-0700)/") // Returns Date object
 * parseDotNetTimestamp("/Date(-2208945600000-0800)/") // Returns Date object
 * ```
 */
export const parseDotNetTimestamp = (dateString: string): Date | null => {
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
    if ((timestampStr[i] === "+" || timestampStr[i] === "-") && i > 0) {
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
 * @param dateString - The .NET date string to convert
 * @returns ISO string or original string if parsing fails
 * @example
 * ```typescript
 * convertDotNetTimestampToISO("/Date(1757451301100-0700)/") // Returns "2025-09-09T20:55:01.100Z"
 * ```
 */
export const convertDotNetTimestampToISO = (dateString: string): string => {
  const date = parseDotNetTimestamp(dateString);
  return date ? date.toISOString() : dateString;
};
