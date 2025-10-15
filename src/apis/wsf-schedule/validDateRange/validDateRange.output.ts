/**
 * @fileoverview WSF Schedule API Output Schemas for Valid Date Range
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API valid date range operations.
 */

import { z } from "zod";

import { zDotnetDate } from "@/apis/shared";

/**
 * Schema for ValidDateRange - represents valid date range for schedule data
 *
 * This operation retrieves a date range for which schedule data is currently published & available.
 */
export const validDateRangeSchema = z
  .object({
    /**
     * Schedule information is available from this trip date onward.
     */
    DateFrom: zDotnetDate().describe(
      "Schedule information is available from this trip date onward."
    ),
    /**
     * Schedule information is not available after this trip date.
     */
    DateThru: zDotnetDate().describe(
      "Schedule information is not available after this trip date."
    ),
  })
  .describe(
    "This operation retrieves a date range for which schedule data is currently published & available."
  );

export type ValidDateRange = z.infer<typeof validDateRangeSchema>;
