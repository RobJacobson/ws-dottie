/**
 * @fileoverview .NET Date Validation for TanStack Query
 *
 * This module provides Zod schema validation for JavaScript Date objects
 * that have been preprocessed from .NET date formats. All .NET date strings
 * are converted to JavaScript Date objects by convertDotNetDates() before
 * reaching Zod validation, ensuring a unified transformation path.
 */

import { z } from "@/shared/zod";

/**
 * Date validation schema for preprocessed dates
 *
 * This Zod schema validates JavaScript Date objects. All .NET date strings
 * (format: "/Date(timestamp)/") are automatically converted to Date objects
 * by convertDotNetDates() before validation, so this schema simply ensures
 * the value is a valid Date object.
 *
 * @returns Zod schema that validates Date objects
 */
export const zDotnetDate = () =>
  z.date().refine((date) => !Number.isNaN(date.getTime()), {
    message: "Invalid date object",
  });
