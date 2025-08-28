import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createUseQueryWsdot, tanstackQueryOptions } from "@/shared/tanstack";

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
// TanStack Query Hook
//
// useTripRatesByDate
// ============================================================================

export const useTripRatesByDate = createUseQueryWsdot({
  queryFn: getTripRatesByDate,
  queryKeyPrefix: ["wsdot", "toll-rates", "getTripRatesByDate"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
});
