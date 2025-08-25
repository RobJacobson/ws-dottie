import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

// Import schemas from getTollRates to avoid duplication
import { type TollRate, tollRateArraySchema } from "./getTollRates";

// ============================================================================
// API Function
//
// getTripRatesByDate
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByDateAsJson";

/**
 * Retrieves historical toll rates by date range from WSDOT Toll Rates API
 *
 * Returns historical toll rate data for a specified date range, enabling analysis of toll rate trends over time.
 * This endpoint provides access to past toll pricing for all Washington State toll facilities including
 * I-405 Express Toll Lanes, SR 167 High Occupancy Toll (HOT) lanes, SR 520 Bridge, SR 99 Tunnel,
 * SR 509 Expressway, and Tacoma Narrows Bridge. Historical data is essential for analyzing pricing patterns,
 * planning budgets, and understanding toll rate changes over time.
 *
 * @param params - Date range parameters for historical data retrieval
 * @returns Promise containing historical toll rate data array with pricing information for the specified period
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const historicalRates = await getTripRatesByDate({
 *   fromDate: new Date('2024-01-01'),
 *   toDate: new Date('2024-01-31')
 * });
 * console.log(historicalRates[0].CurrentToll); // Historical toll rate in cents
 * console.log(historicalRates[0].StateRoute); // '520' (SR 520)
 * console.log(historicalRates[0].TravelDirection); // 'E' (Eastbound)
 * ```
 */
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

export const getTripRatesByDateParamsSchema = z
  .object({
    fromDate: z
      .date()
      .describe(
        "Start date for historical data retrieval. This field specifies the beginning of the date range for historical toll rate analysis."
      ),

    toDate: z
      .date()
      .describe(
        "End date for historical data retrieval. This field specifies the end of the date range for historical toll rate analysis."
      ),
  })
  .describe(
    "Date range parameters for retrieving historical toll rate data. Both dates represent a valid date range for historical analysis."
  );

export type GetTripRatesByDateParams = z.infer<
  typeof getTripRatesByDateParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// tollRateArraySchema (imported from ./getTollRates)
// ============================================================================

// ============================================================================
// TanStack Query Hook
//
// useTripRatesByDate
// ============================================================================

/**
 * Hook for retrieving historical toll rates by date range from WSDOT Toll Rates API
 *
 * Returns historical toll rate data for a specified date range, enabling analysis of toll rate trends over time.
 * This hook provides access to past toll pricing for all Washington State toll facilities including
 * I-405 Express Toll Lanes, SR 167 High Occupancy Toll (HOT) lanes, SR 520 Bridge, SR 99 Tunnel,
 * SR 509 Expressway, and Tacoma Narrows Bridge. Historical data is essential for analyzing pricing patterns,
 * planning budgets, and understanding toll rate changes over time.
 *
 * @param params - Date range parameters for historical data retrieval
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with historical toll rate data array for trend analysis and budget planning
 *
 * @example
 * ```typescript
 * const { data: historicalRates, isLoading } = useTripRatesByDate({
 *   fromDate: new Date('2024-01-01'),
 *   toDate: new Date('2024-01-31')
 * });
 * const sr520Rates = historicalRates?.filter(rate => rate.StateRoute === '520');
 * console.log(sr520Rates?.[0]?.CurrentToll); // Historical toll rate in cents
 * ```
 */
export const useTripRatesByDate = (
  params: GetTripRatesByDateParams,
  options?: TanStackOptions<TollRate[]>
): UseQueryResult<TollRate[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "toll-rates",
      "getTripRatesByDate",
      JSON.stringify(params),
    ],
    queryFn: () => getTripRatesByDate(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
