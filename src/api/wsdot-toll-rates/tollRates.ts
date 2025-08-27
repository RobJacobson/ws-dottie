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

export const getTollRatesParamsSchema = z.object({}).describe("");

export type GetTollRatesParams = z.infer<typeof getTollRatesParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// tollRateSchema
// TollRate
// ============================================================================

export const tollRateSchema = z
  .object({
    CurrentToll: z.number().describe(""),
    EndLocationName: z.string().nullable().describe(""),
    EndMilepost: z.number().describe(""),
    StartLocationName: z.string().nullable().describe(""),
    StartMilepost: z.number().describe(""),
    StateRoute: z.string().nullable().describe(""),
    TravelDirection: z.string().nullable().describe(""),
    TripName: z.string().nullable().describe(""),
  })
  
  .describe("");

export const tollRateArraySchema = z.array(tollRateSchema).describe("");

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
