import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

// Import schemas from getTollRates to avoid duplication
import { type TollRate, tollRateArraySchema } from "./getTollRates";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByDateAsJson";

// ============================================================================
// API FUNCTION
// ============================================================================

/**
 * Retrieves historical toll rates by date range from WSDOT API
 *
 * Returns historical toll rate data for a specified date range,
 * enabling analysis of toll rate trends over time.
 *
 * @param params - Date range parameters for historical data retrieval
 * @returns Promise containing historical toll rate data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const historicalRates = await getTripRatesByDate({
 *   fromDate: "2024-01-01",
 *   toDate: "2024-01-31"
 * });
 * console.log(historicalRates[0].CurrentToll); // Historical toll amount
 * ```
 */
export const getTripRatesByDate = async (
  params: GetTripRatesByDateParams
): Promise<TollRate[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTripRatesByDateParamsSchema,
      output: tollRateArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTripRatesByDateParamsSchema = z
  .object({
    fromDate: z
      .string()
      .describe(
        "Start date for historical data retrieval in YYYY-MM-DD format. This field specifies the beginning of the date range for historical toll rate analysis."
      ),

    toDate: z
      .string()
      .describe(
        "End date for historical data retrieval in YYYY-MM-DD format. This field specifies the end of the date range for historical toll rate analysis."
      ),
  })
  .describe(
    "Date range parameters for retrieving historical toll rate data. Both dates must be in YYYY-MM-DD format and represent a valid date range for historical analysis."
  );

export type GetTripRatesByDateParams = z.infer<
  typeof getTripRatesByDateParamsSchema
>;

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for retrieving historical toll rates by date range from WSDOT API
 *
 * Returns historical toll rate data for a specified date range,
 * enabling analysis of toll rate trends over time.
 *
 * @param params - Date range parameters for historical data retrieval
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with historical toll rate data
 *
 * @example
 * ```typescript
 * const { data: historicalRates, isLoading } = useTripRatesByDate({
 *   fromDate: "2024-01-01",
 *   toDate: "2024-01-31"
 * });
 * ```
 */
export const useTripRatesByDate = (
  params: GetTripRatesByDateParams,
  options?: TanStackOptions<TollRate[]>
): UseQueryResult<TollRate[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTripRatesByDate", params],
    queryFn: () => getTripRatesByDate(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
