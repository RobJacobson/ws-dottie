import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";

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
): Promise<FareTotal[]> => {
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
    tripDate: z.date().describe(""),
    departingTerminalID: z.number().int().positive().describe(""),
    arrivingTerminalID: z.number().int().positive().describe(""),
    roundTrip: z.boolean().describe(""),
    fareLineItemIDs: z
      .array(z.number().int().positive())
      .min(1, "At least one fare line item ID must be provided")
      .describe(""),
    quantities: z
      .array(z.number().int().min(1))
      .min(1, "At least one quantity must be provided")
      .describe(""),
  })
  .refine((data) => data.fareLineItemIDs.length === data.quantities.length, {
    message: "fareLineItemIDs and quantities arrays must have the same length",
    path: ["quantities"],
  })
  .describe("");

export type GetFareTotalsParams = z.infer<typeof getFareTotalsParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// fareTotalsArraySchema
// FareTotal
// ============================================================================

export const fareTotalSchema = z
  .object({
    TotalType: z.number().int().min(1).max(4).describe(""),
    Description: z.string().nullable().describe(""),
    BriefDescription: z.string().nullable().describe(""),
    Amount: z.number().describe(""),
  })
  .describe("");

export const fareTotalsArraySchema = z.array(fareTotalSchema).describe("");

export type FareTotal = z.infer<typeof fareTotalSchema>;

// ============================================================================
// TanStack Query Hook
//
// useFareTotals
// ============================================================================

export const useFareTotals = (
  params: {
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
    roundTrip: boolean;
    fareLineItemIDs: number[];
    quantities: number[];
  },
  options?: Omit<
    UseQueryOptions<FareTotal[], Error>,
    "queryKey" | "queryFn" | "enabled"
  >
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "fares", "fareTotals", JSON.stringify(params)],
    queryFn: () => getFareTotals(params),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: {
      ...tanstackQueryOptions.DAILY_UPDATES,
      enabled:
        params.fareLineItemIDs.length > 0 && params.quantities.length > 0,
      ...options,
    },
    params,
  });
};
