/**
 * @fileoverview Input schemas for WSF Fares API ValidDateRange endpoint
 *
 * These schemas define the input parameters for WSF Fares API ValidDateRange endpoint.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "@/shared/zod";

export const faresValidDateRangeInputSchema = z
  .object({})
  .describe(
    "Input parameters for retrieving the validity date range for fares data."
  );

export type FaresValidDateRangeInput = z.infer<
  typeof faresValidDateRangeInputSchema
>;
