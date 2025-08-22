import { z } from "zod";

import {
  isWsdotDateString,
  wsdotDateTimestampToJsDate,
} from "@/shared/fetching/parsing";

/**
 * Shared schemas for WSF Schedule API
 *
 * These schemas handle the fact that the API sometimes returns Date objects
 * instead of the expected string format, so we need to handle both cases.
 * Also handles Microsoft .NET JSON date format like "/Date(1753092000000-0700)/"
 */

// Date schema that handles both string and Date inputs, including .NET JSON date format
export const dateSchema = z.union([z.string(), z.date()]).transform((val) => {
  if (val instanceof Date) return val;

  // Handle Microsoft .NET JSON date format
  if (typeof val === "string" && isWsdotDateString(val)) {
    const parsedDate = wsdotDateTimestampToJsDate(val);
    if (parsedDate) return parsedDate;
  }

  // If it's a string, try to parse it as a regular date
  const date = new Date(val);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date string: ${val}`);
  }
  return date;
});

// Nullable date schema that handles both string and Date inputs, including .NET JSON date format
export const nullableDateSchema = z
  .union([z.string(), z.date()])
  .nullable()
  .transform((val) => {
    if (val === null) return null;
    if (val instanceof Date) return val;

    // Handle Microsoft .NET JSON date format
    if (typeof val === "string" && isWsdotDateString(val)) {
      const parsedDate = wsdotDateTimestampToJsDate(val);
      if (parsedDate) return parsedDate;
    }

    // If it's a string, try to parse it as a regular date
    const date = new Date(val);
    if (Number.isNaN(date.getTime())) {
      throw new Error(`Invalid date string: ${val}`);
    }
    return date;
  });

// Common nullable field schemas
export const nullableStringSchema = z.string().nullable();
export const nullableNumberSchema = z.number().nullable();
export const nullableBooleanSchema = z.boolean().nullable();
