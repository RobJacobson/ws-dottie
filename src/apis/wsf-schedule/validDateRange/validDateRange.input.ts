/**
 * @fileoverview WSF Schedule API Input Schemas for Valid Date Range
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to valid date range operations.
 */

import { z } from "zod";

/**
 * Schema for ValidDateRange input parameters
 *
 * This operation retrieves a date range for which schedule data is currently published & available. */
export const validDateRangeSchema = z
  .object({})
  .describe(
    "Retrieves date range for which schedule data is currently published and available, returning start and end dates. Use to determine valid trip dates for schedule queries before calling other endpoints."
  );

export type ScheduleValidDateRangeInput = z.infer<typeof validDateRangeSchema>;
