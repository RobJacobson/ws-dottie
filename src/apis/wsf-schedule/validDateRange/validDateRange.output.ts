/**
 * @fileoverview WSF Schedule API Output Schemas for Valid Date Range
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API valid date range operations.
 */

import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod-openapi-init";

/**
 * Schema for ValidDateRange - represents valid date range for schedule data
 *
 * This operation retrieves a date range for which schedule data is currently published & available.
 */
export const validDateRangeSchema = z
  .object({
    DateFrom: zDotnetDate().describe(
      "Start date when schedule information becomes available, as a UTC datetime. E.g., '2025-11-02T07:00:00.000Z' for schedules available from November 2, 2025. Indicates earliest trip date for which schedule data is published."
    ),
    DateThru: zDotnetDate().describe(
      "End date when schedule information stops being available, as a UTC datetime. E.g., '2026-03-21T07:00:00.000Z' for schedules available through March 21, 2026. Indicates latest trip date for which schedule data is published."
    ),
  })
  .describe(
    "Represents date range for which schedule data is currently published and available, including start and end dates. E.g., schedules available from November 2, 2025 through March 21, 2026. Use to determine valid trip dates for schedule queries before calling other endpoints."
  );

export type ValidDateRange = z.infer<typeof validDateRangeSchema>;
