import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

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

export type FareTotals = z.infer<typeof fareTotalsArraySchema>;

// ============================================================================
// TanStack Query Hook
//
// useFareTotals
// ============================================================================

export const fareTotalsOptions = (params: GetFareTotalsParams) =>
  queryOptions({
    queryKey: [
      "wsf",
      "fares",
      "fareTotals",
      "getFareTotals",
      {
        ...params,
        tripDate:
          params.tripDate instanceof Date
            ? params.tripDate.toISOString()
            : params.tripDate,
      },
    ],
    queryFn: () => getFareTotals(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
