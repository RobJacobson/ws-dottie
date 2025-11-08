/**
 * @fileoverview .NET Date Validation for TanStack Query
 *
 * This module provides Zod schema validation for .NET date formats,
 * including the specialized "/Date(timestamp)/" format used by .NET
 * APIs. It handles validation and transformation to JavaScript Date objects.
 */

import { wsdotDateTimeToJSDate } from "@/shared/utils/dateUtils";
import { z } from "@/shared/zod";

/**
 * .NET date validation and transformation schema
 *
 * This Zod schema handles .NET's "/Date(timestamp)/" format only.
 * It validates the input format and transforms it to a JavaScript Date object.
 */
export const zDotnetDate = () =>
  z
    .string()
    .refine((value) => isDotnetDateString(value), {
      message: "Invalid date format. Expected .NET /Date(timestamp)/ format",
    })
    .transform((val) => {
      const date = wsdotDateTimeToJSDate(val.replace(/\\\//g, "/"));
      if (!date) throw new Error(`Failed to parse .NET date: ${val}`);
      return date;
    });

/**
 * Type guard for .NET date format
 *
 * This function checks if a string matches the .NET "/Date(timestamp)/"
 * format, including escaped versions that may appear in JSON responses.
 *
 * @param value - The string to check
 * @returns True if the string matches .NET date format
 */
const isDotnetDateString = (value: string): boolean =>
  value.length >= 19 &&
  (value.startsWith("/Date(") || value.startsWith("\\/Date(")) &&
  (value.endsWith(")/") || value.endsWith(")\\/"));
