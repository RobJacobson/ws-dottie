/**
 * Toll Trip Rates API
 *
 * Toll trip rates with messages from Washington State Department of Transportation tolling system.
 * Provides trip rate information including toll amounts, trip names, and associated messages
 * for toll facilities across Washington State.
 *
 * This API returns trip rate data with pricing information and optional messages for each toll segment.
 * The data includes individual trip rates within a versioned structure, allowing for tracking
 * of rate changes and updates over time.
 *
 * API Functions:
 * - getTollTripRates: Returns a TollTripRates object containing trip rates and version information
 *
 * Input/Output Overview:
 * - getTollTripRates: Input: none, Output: TollTripRates
 *
 * Base Type: TollTripRates
 *
 * interface TollTripRates {
 *   Trips: TollTripRate[];
 *   Version: number;
 * }
 *
 * Base Type: TollTripRate
 *
 * interface TollTripRate {
 *   Message: string;
 *   Toll: number;
 *   TripName: string;
 * }
 *
 * Note: This endpoint may return errors with demo access token. The actual API response structure
 * should be verified with a valid access token when available.
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Note: This endpoint may require valid authentication and may return error responses with demo tokens.
 */

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

/**
 * Retrieves toll trip rates with messages for all toll facilities.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<TollTripRates> - Toll trip rates with version information
 *
 * @example
 * const tripRates = await getTollTripRates();
 * console.log(tripRates.Version);  // 123
 * console.log(tripRates.Trips.length);  // 45
 * console.log(tripRates.Trips[0].Toll);  // 125
 * console.log(tripRates.Trips[0].TripName);  // "099tp03268"
 * console.log(tripRates.Trips[0].Message);  // "Current rate"
 *
 * @throws {Error} When API is unavailable or returns invalid response
 */
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

/**
 * Parameters for retrieving toll trip rates (no parameters required)
 */
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

/**
 * Individual toll trip rate schema - includes toll amount, trip name, and message
 */
export const tollTripRateSchema = z
  .object({
    Message: z.string().describe(""),
    Toll: z.number().describe(""),
    TripName: z.string().describe(""),
  })
  
  .describe("");

/**
 * Toll trip rates container schema - includes array of trip rates and version number
 */
export const tollTripRatesSchema = z
  .object({
    Trips: z.array(tollTripRateSchema).describe(""),
    Version: z.number().describe(""),
  })
  
  .describe("");

/**
 * TollTripRate type - represents individual toll trip rate data
 */
export type TollTripRate = z.infer<typeof tollTripRateSchema>;

/**
 * TollTripRates type - represents container for toll trip rates with version information
 */
export type TollTripRates = z.infer<typeof tollTripRatesSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTollTripRates
// ============================================================================

/**
 * TanStack Query hook for toll trip rates with automatic updates (single item).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TollTripRates, Error> - Query result with toll trip rates data
 *
 * @example
 * const { data: tripRates, isLoading } = useTollTripRates();
 * if (tripRates) {
 *   console.log(tripRates.Version);  // 123
 *   console.log(tripRates.Trips.length);  // 45
 * }
 */
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
