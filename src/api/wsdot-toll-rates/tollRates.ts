import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createUseQueryWsdot, tanstackQueryOptions } from "@/shared/tanstack";

// ============================================================================
// API Function
//
// getTollRates
// ============================================================================

const ENDPOINT = "/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson";

export const getTollRates = async (
  params: GetTollRatesParams = {}
): Promise<TollRates> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTollRatesParamsSchema,
      output: tollRateArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTollRatesParamsSchema
// GetTollRatesParams
// ============================================================================

export const getTollRatesParamsSchema = z.object({});

export type GetTollRatesParams = z.infer<typeof getTollRatesParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// tollRateSchema
// TollRate
// ============================================================================

export const tollRateSchema = z.object({
  CurrentToll: z.number(),
  EndLocationName: z.string().nullable(),
  EndMilepost: z.number(),
  StartLocationName: z.string().nullable(),
  StartMilepost: z.number(),
  StateRoute: z.string().nullable(),
  TravelDirection: z.string().nullable(),
  TripName: z.string().nullable(),
});

export const tollRateArraySchema = z.array(tollRateSchema);

export type TollRate = z.infer<typeof tollRateSchema>;

/**
 * TollRates type - represents an array of toll rate objects
 */
export type TollRates = z.infer<typeof tollRateArraySchema>;

// ============================================================================
// TanStack Query Hook
//
// useTollRates
// ============================================================================

export const useTollRates = createUseQueryWsdot({
  queryFn: getTollRates,
  queryKeyPrefix: ["wsdot", "toll-rates", "getTollRates"],
  defaultOptions: tanstackQueryOptions.ONE_MIN_POLLING,
});
