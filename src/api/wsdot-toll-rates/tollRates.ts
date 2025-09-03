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

export type TollRates = z.infer<typeof tollRateArraySchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

export const tollRatesOptions = () =>
  queryOptions({
    queryKey: ["wsdot", "toll-rates", "getTollRates"],
    queryFn: () => getTollRates({}),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
