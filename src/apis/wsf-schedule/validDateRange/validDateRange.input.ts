/**
 * @fileoverview WSF Schedule API Input Schemas for Valid Date Range
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to valid date range operations.
 */

import { z } from "@/shared/zod";

/**
 * Schema for ValidDateRange input parameters
 *
 * This operation retrieves a date range for which schedule data is currently published & available. */
export const scheduleValidDateRangeInputSchema = z
  .object({})
  .describe(
    "Input parameters for retrieving the valid date range for schedule data."
  );

export type ScheduleValidDateRangeInput = z.infer<
  typeof scheduleValidDateRangeInputSchema
>;
