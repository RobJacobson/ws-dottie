/**
 * @fileoverview ISO Date String Validation for TanStack Query
 *
 * This module provides Zod schema validation for ISO date format strings,
 * including standard ISO-8601 date formats. It handles validation and
 * transformation to JavaScript Date objects.
 */

import { z } from "@/shared/zod-openapi-init";

/**
 * ISO date string validation and transformation schema
 *
 * This Zod schema handles ISO date formats (e.g., "2024-01-01T12:00:00.000Z").
 * It validates the input format and transforms it to a JavaScript Date object.
 */
export const zIsoDateString = () =>
  z
    .string()
    .refine((value) => isISODateString(value), {
      message: "Invalid date format. Expected ISO date string format",
    })
    .transform((val) => {
      const date = new Date(val);
      if (Number.isNaN(date.getTime()))
        throw new Error(`Failed to parse ISO date: ${val}`);
      return date;
    });

/**
 * Type guard for ISO date format
 *
 * This function checks if a string matches the ISO-8601 date format
 * with optional time and timezone information.
 *
 * @param value - The string to check
 * @returns True if the string matches ISO-8601 date format
 */
const isISODateString = (value: string): boolean => {
  const isoRegex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?(Z|[+-]\d{2}:\d{2})?$/;
  if (!isoRegex.test(value)) {
    // Try basic date parsing as fallback
    const date = new Date(value);
    return !Number.isNaN(date.getTime());
  }
  return true;
};
