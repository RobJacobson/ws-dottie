/**
 * @fileoverview WSF Schedule API Input Schemas for Cache Flush Date
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to cache flush date operations.
 */

import { z } from "zod";

/**
 * Schema for ValidDateRange input parameters
 *
 * This operation retrieves a date range for which schedule data is currently published & available. */
export const validDateRangeSchema = z
  .object({})
  .describe(
    "This operation retrieves a date range for which schedule data is currently published & available."
  );

export type ScheduleValidDateRangeInput = z.infer<typeof validDateRangeSchema>;
