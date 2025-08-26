/**
 * Trip Rates By Date API
 *
 * Historical toll rate data by date range from Washington State Department of Transportation tolling system.
 * Provides toll rate information for specific date ranges, allowing applications to retrieve
 * historical pricing data for analysis and reporting purposes.
 *
 * This API returns toll rate data for a specified date range, enabling historical analysis
 * of toll pricing changes over time. The data includes the same structure as current toll rates
 * but filtered by the specified date range parameters.
 *
 * API Functions:
 * - getTripRatesByDate: Returns an array of TollRate objects for the specified date range
 *
 * Input/Output Overview:
 * - getTripRatesByDate: Input: { fromDate: Date, toDate: Date }, Output: TollRate[]
 *
 * Base Type: GetTripRatesByDateParams
 *
 * interface GetTripRatesByDateParams {
 *   fromDate: Date;
 *   toDate: Date;
 * }
 *
 * Note: This endpoint returns empty arrays with demo access token. The actual API response structure
 * should be verified with a valid access token when available.
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByDateAsJson?AccessCode=$WSDOT_ACCESS_TOKEN&fromDate=2024-01-01&toDate=2024-01-02"
 *
 * Note: This endpoint may require valid authentication and may return empty arrays with demo tokens.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

// Import schemas from tollRates to avoid duplication
import { type TollRate, tollRateArraySchema } from "./tollRates";

// ============================================================================
// API Function
//
// getTripRatesByDate
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByDateAsJson";

/**
 * Retrieves historical toll rate data for a specified date range.
 *
 * @param params - Parameters object containing date range for historical toll rate query
 * @param params.fromDate - Start date for the historical data range
 * @param params.toDate - End date for the historical data range
 * @returns Promise<TollRate[]> - Array of historical toll rate data for the specified date range
 *
 * @example
 * const fromDate = new Date('2024-01-01');
 * const toDate = new Date('2024-01-02');
 * const historicalRates = await getTripRatesByDate({ fromDate, toDate });
 * console.log(historicalRates.length);  // 45
 * console.log(historicalRates[0].CurrentToll);  // 125
 * console.log(historicalRates[0].TripName);  // "099tp03268"
 *
 * @throws {Error} When API is unavailable, dates are invalid, or returns invalid response
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

/**
 * Parameters for retrieving historical toll rates by date range
 */
export const getTripRatesByDateParamsSchema = z
  .object({
    fromDate: z.date().describe(""),
    toDate: z.date().describe(""),
  })
  .describe("");

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

/**
 * TanStack Query hook for historical toll rates by date range with automatic updates (array).
 *
 * @param params - Parameters object containing date range for historical toll rate query
 * @param params.fromDate - Start date for the historical data range
 * @param params.toDate - End date for the historical data range
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TollRate[], Error> - Query result with array of historical toll rate data
 *
 * @example
 * const fromDate = new Date('2024-01-01');
 * const toDate = new Date('2024-01-02');
 * const { data: historicalRates, isLoading } = useTripRatesByDate({ fromDate, toDate });
 * if (historicalRates) {
 *   console.log(historicalRates.length);  // 45
 *   console.log(historicalRates[0].CurrentToll);  // 125
 * }
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
