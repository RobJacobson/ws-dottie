/**
 * @fileoverview Output schemas for WSF Fares API ValidDateRange endpoint
 *
 * These schemas define the response structures for WSF Fares API ValidDateRange endpoint.
 */

import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod-openapi-init";

/**
 * Valid date range response schema for GetValidDateRange endpoint
 *
 * This operation retrieves a date range for which fares data is currently published & available. */
export const validDateRangeResponseSchema = z
  .object({
    DateFrom: zDotnetDate().describe(
      "Start date when fares information becomes available, as a UTC datetime. E.g., '2025-11-02T07:00:00.000Z' for fares available from November 2, 2025. Indicates earliest trip date for which fare data is published."
    ),
    DateThru: zDotnetDate().describe(
      "End date when fares information stops being available, as a UTC datetime. E.g., '2026-03-21T07:00:00.000Z' for fares available through March 21, 2026. Indicates latest trip date for which fare data is published."
    ),
  })
  .describe(
    "Represents date range for which fares data is currently published and available, including start and end dates. E.g., fares available from November 2, 2025 through March 21, 2026. Use to determine valid trip dates for fare queries before calling other endpoints."
  );

export type ValidDateRangeResponse = z.infer<
  typeof validDateRangeResponseSchema
>;
