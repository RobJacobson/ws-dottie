import { z } from "zod";
import { parseDotNetTimestamp } from "../utils/dotNetTimestamp";

/**
 * @fileoverview TanStack Query validation utilities
 *
 * This module provides validation schemas specifically for TanStack Query
 * data fetching operations, including specialized date parsing for WSDOT APIs.
 */

/**
 * Creates a Zod schema for WSDOT date format validation and transformation
 *
 * This schema validates and transforms WSDOT date strings in the format
 * "/Date(timestamp)/" to JavaScript Date objects. WSDOT APIs return dates
 * as Unix timestamps wrapped in this special format.
 *
 * @returns Zod schema that validates WSDOT date strings and transforms them to Date objects
 * @example
 * ```typescript
 * const dateSchema = zWsdotDate();
 * const result = dateSchema.parse("/Date(1640995200000)/"); // Returns Date object
 * ```
 */
export const zWsdotDate = () =>
  z
    .string()
    .refine(isWsdotDateString, {
      message:
        "Invalid WSDOT date format. Expected format: /Date(timestamp)/ where timestamp is milliseconds since Unix epoch",
    })
    .transform((val) => {
      const date = wsdotDateTimestampToJsDate(val);
      if (!date) throw new Error(`Failed to parse WSDOT date: ${val}`);
      return date;
    });

/**
 * Type guard to check if a string is a WSDOT date format
 *
 * WSDOT APIs return dates in the format "/Date(1234567890123)/" or "\/Date(1234567890123)\/"
 * where the number is a Unix timestamp in milliseconds.
 *
 * @param value - The string to check
 * @returns True if the string matches WSDOT date format
 */
const isWsdotDateString = (value: string): boolean =>
  value.length >= 19 &&
  (value.startsWith("/Date(") || value.startsWith("\\/Date(")) &&
  (value.endsWith(")/") || value.endsWith(")\\/"));

/**
 * Converts a WSDOT date string to a JavaScript Date object
 *
 * Handles both escaped and unescaped forward slashes in the date format.
 * Supports negative timestamps for WSF Schedule API historical data.
 *
 * @param dateString - The WSDOT date string to convert
 * @returns JavaScript Date object or null if parsing fails
 */
const wsdotDateTimestampToJsDate = (dateString: string): Date | null => {
  // Remove escaped forward slashes if present
  const cleanDateString = dateString.replace(/\\\//g, "/");

  // Use the shared parsing utility
  return parseDotNetTimestamp(cleanDateString);
};
