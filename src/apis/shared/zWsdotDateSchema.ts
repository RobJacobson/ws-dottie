/**
 * @fileoverview WSDOT Date Validation for TanStack Query
 *
 * This module provides Zod schema validation for WSDOT date formats,
 * including the specialized "/Date(timestamp)/" format used by WSDOT/WSF
 * APIs and standard ISO-8601 dates. It handles both validation and
 * transformation to JavaScript Date objects.
 */

import { z } from "zod";

import { wsdotDateTimeToJSDate } from "@/shared/utils/dateUtils";

/**
 * WSDOT date validation and transformation schema
 *
 * This Zod schema handles both WSDOT's "/Date(timestamp)/" format and
 * standard ISO-8601 dates. It validates the input format and transforms
 * it to a JavaScript Date object for consistent handling.
 */
export const zWsdotDate = () =>
  z
    .string()
    .refine((value) => isWsdotDateString(value) || isIso8601DateString(value), {
      message:
        "Invalid date format. Expected /Date(timestamp)/ or ISO-8601 string",
    })
    .transform((val) => {
      if (isWsdotDateString(val)) {
        const date = wsdotDateTimeToJSDate(val.replace(/\\\//g, "/"));
        if (!date) throw new Error(`Failed to parse WSDOT date: ${val}`);
        return date;
      }
      return new Date(val);
    });

/**
 * Type guard for WSDOT date format
 *
 * This function checks if a string matches the WSDOT "/Date(timestamp)/"
 * format, including escaped versions that may appear in JSON responses.
 *
 * @param value - The string to check
 * @returns True if the string matches WSDOT date format
 */
const isWsdotDateString = (value: string): boolean =>
  value.length >= 19 &&
  (value.startsWith("/Date(") || value.startsWith("\\/Date(")) &&
  (value.endsWith(")/") || value.endsWith(")\\/"));

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
