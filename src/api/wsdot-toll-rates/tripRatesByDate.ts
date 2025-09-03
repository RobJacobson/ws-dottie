import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// Import schemas from tollRates to avoid duplication
import { type TollRate, tollRateArraySchema } from "./tollRates";

// ============================================================================
// API Function
//
// getTripRatesByDate
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByDateAsJson";

export const getTripRatesByDate = async (
  params: GetTripRatesByDateParams
): Promise<TollRate[]> => {
  // Build query string with date parameters
  const queryParams = new URLSearchParams();
  queryParams.append("fromDate", params.fromDate.toISOString().split("T")[0]);
  queryParams.append("toDate", params.toDate.toISOString().split("T")[0]);

  const endpoint = `${ENDPOINT}?${queryParams.toString()}`;

  return zodFetch(
    endpoint,
    {
      input: getTripRatesByDateParamsSchema,
      output: tollRateArraySchema,
    },
    undefined // No URL template interpolation needed since we build the URL ourselves
  );
};

// ============================================================================
// Input Schema & Types
//
// getTripRatesByDateParamsSchema
// GetTripRatesByDateParams
// ============================================================================

export const getTripRatesByDateParamsSchema = z.object({
  fromDate: z.date(),
  toDate: z.date(),
});

export type GetTripRatesByDateParams = z.infer<
  typeof getTripRatesByDateParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// tollRateArraySchema (imported from ./tollRates)
// ============================================================================

// ============================================================================
// TanStack Query Options
// ============================================================================

export const tripRatesByDateOptions = (params: GetTripRatesByDateParams) =>
  queryOptions({
    queryKey: [
      "wsdot",
      "toll-rates",
      "getTripRatesByDate",
      {
        ...params,
        fromDate:
          params.fromDate instanceof Date
            ? params.fromDate.toISOString().split("T")[0]
            : params.fromDate,
        toDate:
          params.toDate instanceof Date
            ? params.toDate.toISOString().split("T")[0]
            : params.toDate,
      },
    ],
    queryFn: () => getTripRatesByDate(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
