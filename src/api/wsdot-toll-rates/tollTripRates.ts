import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_MINUTE,
  ONE_HOUR,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

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
// TanStack Query Options
// ============================================================================

export const tollTripRatesOptions = () =>
  queryOptions({
    queryKey: ["wsdot", "toll-rates", "getTollTripRates"],
    queryFn: () => getTollTripRates({}),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
