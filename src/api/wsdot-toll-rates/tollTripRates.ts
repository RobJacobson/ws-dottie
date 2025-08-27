import type { UseQueryResult, UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

// ============================================================================
// API Function
//
// getTollTripRates
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson";

export const getTollTripRates = async (): Promise<TollTripRates> => {
  return zodFetch(ENDPOINT, {
    input: getTollTripRatesParamsSchema,
    output: tollTripRatesSchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getTollTripRatesParamsSchema
// GetTollTripRatesParams
// ============================================================================

export const getTollTripRatesParamsSchema = z.object({}).describe("");

export type GetTollTripRatesParams = z.infer<
  typeof getTollTripRatesParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// tollTripRatesSchema
// TollTripRates
// ============================================================================

export const tollTripRateSchema = z
  .object({
    Message: z.string().describe(""),
    Toll: z.number().describe(""),
    TripName: z.string().describe(""),
  })
  
  .describe("");

export const tollTripRatesSchema = z
  .object({
    Trips: z.array(tollTripRateSchema).describe(""),
    Version: z.number().describe(""),
  })
  
  .describe("");

export type TollTripRate = z.infer<typeof tollTripRateSchema>;

export type TollTripRates = z.infer<typeof tollTripRatesSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTollTripRates
// ============================================================================

export const useTollTripRates = (
  params: GetTollTripRatesParams,
  options?: UseQueryOptions<TollTripRates, Error>
) => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollTripRates"],
    queryFn: () => getTollTripRates(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
