/**
 * @fileoverview Input schemas for WSF Fares API ValidDateRange endpoint
 *
 * These schemas define the input parameters for WSF Fares API ValidDateRange endpoint.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "zod";

/**
 * Input schema for ValidDateRange endpoint
 *
 * This operation retrieves a date range for which fares data is currently published & available.
 */
export const validDateRangeSchema = z
  .object({})
  .describe(
    "This operation retrieves a date range for which fares data is currently published & available."
  );

export type ValidDateRangeInput = z.infer<typeof validDateRangeSchema>;
