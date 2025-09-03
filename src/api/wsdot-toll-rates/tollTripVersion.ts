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
// getTollTripVersion
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripVersionAsJson";

export const getTollTripVersion = async (
  params: GetTollTripVersionParams = {}
): Promise<TollTripVersion> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTollTripVersionParamsSchema,
      output: tollTripVersionSchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTollTripVersionParamsSchema
// GetTollTripVersionParams
// ============================================================================

export const getTollTripVersionParamsSchema = z.object({});

export type GetTollTripVersionParams = z.infer<
  typeof getTollTripVersionParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// tollTripVersionSchema
// TollTripVersion
// ============================================================================

export const tollTripVersionSchema = z.object({
  Version: z.number(),
});

export type TollTripVersion = z.infer<typeof tollTripVersionSchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

export const tollTripVersionOptions = () =>
  queryOptions({
    queryKey: ["wsdot", "toll-rates", "getTollTripVersion"],
    queryFn: () => getTollTripVersion({}),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
