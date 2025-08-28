import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";

// ============================================================================
// API Function
//
// getTollTripRates
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson";

export const getTollTripRates = async (
  params: GetTollTripRatesParams = {}
): Promise<TollTripRates> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTollTripRatesParamsSchema,
      output: tollTripRatesSchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTollTripRatesParamsSchema
// GetTollTripRatesParams
// ============================================================================

export const getTollTripRatesParamsSchema = z.object({});

export type GetTollTripRatesParams = z.infer<
  typeof getTollTripRatesParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// tollTripRatesSchema
// TollTripRates
// ============================================================================

export const tollTripRateSchema = z.object({
  Message: z.string(),
  Toll: z.number(),
  TripName: z.string(),
});

export const tollTripRatesSchema = z.object({
  Trips: z.array(tollTripRateSchema),
  Version: z.number(),
});

export type TollTripRate = z.infer<typeof tollTripRateSchema>;

export type TollTripRates = z.infer<typeof tollTripRatesSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTollTripRates
// ============================================================================

export const useTollTripRates = (
  params: GetTollTripRatesParams = {},
  options?: UseQueryOptions<TollTripRates, Error>
) => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollTripRates"],
    queryFn: () => getTollTripRates(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
