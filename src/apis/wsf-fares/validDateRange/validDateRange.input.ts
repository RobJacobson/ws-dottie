/**
 * @fileoverview Input schemas for WSF Fares API ValidDateRange endpoint
 *
 * These schemas define the input parameters for WSF Fares API ValidDateRange endpoint.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "@/shared/zod";

/**
 * Input schema for ValidDateRange endpoint
 *
 * This operation retrieves a date range for which fares data is currently published & available.
 */
export const faresValidDateRangeInputSchema = z
  .object({})
  .describe(
    "Retrieves date range for which fares data is currently published and available, returning start and end dates. Use to determine valid trip dates for fare queries before calling other endpoints."
  );

export type FaresValidDateRangeInput = z.infer<
  typeof faresValidDateRangeInputSchema
>;
