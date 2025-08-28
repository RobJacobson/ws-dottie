import type { UseQueryResult, UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

// ============================================================================
// API Function
//
// getTollRates
// ============================================================================

const ENDPOINT = "/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson";

export const getTollRates = async (): Promise<TollRate[]> => {
  return zodFetch(ENDPOINT, {
    input: getTollRatesParamsSchema,
    output: tollRateArraySchema,
  });
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

// ============================================================================
// TanStack Query Hook
//
// useTollRates
// ============================================================================

export const useTollRates = (
  params: GetTollRatesParams = {},
  options?: UseQueryOptions<TollRate[], Error>
) => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollRates"],
    queryFn: () => getTollRates(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
