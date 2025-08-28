import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createUseQueryWsf, tanstackQueryOptions } from "@/shared/tanstack";

import { getFaresCacheFlushDate } from "../wsf/cacheFlushDate";

// ============================================================================
// API Function
//
// getFareTotals
// ============================================================================

const ENDPOINT =
  "/ferries/api/fares/rest/faretotals/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}/{fareLineItemIDs}/{quantities}";

export const getFareTotals = async (
  params: GetFareTotalsParams
): Promise<FareTotals> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getFareTotalsParamsSchema,
      output: fareTotalsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getFareTotalsParamsSchema
// GetFareTotalsParams
// ============================================================================

export const getFareTotalsParamsSchema = z
  .object({
    tripDate: z.date(),
    departingTerminalID: z.number().int().positive(),
    arrivingTerminalID: z.number().int().positive(),
    roundTrip: z.boolean(),
    fareLineItemIDs: z
      .array(z.number().int().positive())
      .min(1, "At least one fare line item ID must be provided"),
    quantities: z
      .array(z.number().int().min(1))
      .min(1, "At least one quantity must be provided"),
  })
  .refine((data) => data.fareLineItemIDs.length === data.quantities.length, {
    message: "fareLineItemIDs and quantities arrays must have the same length",
    path: ["quantities"],
  });

export type GetFareTotalsParams = z.infer<typeof getFareTotalsParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// fareTotalsArraySchema
// FareTotal
// ============================================================================

export const fareTotalSchema = z.object({
  TotalType: z.number().int().min(1).max(4),
  Description: z.string().nullable(),
  BriefDescription: z.string().nullable(),
  Amount: z.number(),
});

export const fareTotalsArraySchema = z.array(fareTotalSchema);

export type FareTotal = z.infer<typeof fareTotalSchema>;

/**
 * FareTotals type - represents an array of fare total objects
 */
export type FareTotals = z.infer<typeof fareTotalsArraySchema>;

// ============================================================================
// TanStack Query Hook
//
// useFareTotals
// ============================================================================

export const useFareTotals = createUseQueryWsf({
  queryFn: getFareTotals,
  queryKeyPrefix: ["wsf", "fares", "fareTotals", "getFareTotals"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getFaresCacheFlushDate,
});
