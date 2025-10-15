/**
 * @fileoverview Output schemas for WSF Fares API ValidDateRange endpoint
 *
 * These schemas define the response structures for WSF Fares API ValidDateRange endpoint.
 */

import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * Valid date range response schema for GetValidDateRange endpoint
 *
 * This operation retrieves a date range for which fares data is currently published & available. */
export const validDateRangeResponseSchema = z
  .object({
    /**
     * Fares information is available from this date onward.
     */
    DateFrom: zDotnetDate().describe(
      "Fares information is available from this date onward."
    ),
    /**
     * Fares information is not available after this date.
     */
    DateThru: zDotnetDate().describe(
      "Fares information is not available after this date."
    ),
  })
  .describe(
    "This operation retrieves a date range for which fares data is currently published & available."
  );

export type ValidDateRangeResponse = z.infer<
  typeof validDateRangeResponseSchema
>;
