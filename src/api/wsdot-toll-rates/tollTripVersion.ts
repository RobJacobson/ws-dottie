/**
 * Toll Trip Version API
 *
 * Toll trip version information from Washington State Department of Transportation tolling system.
 * Provides version number for current toll trip rate data, allowing applications to track
 * when toll rate information has been updated.
 *
 * This API returns a simple version number that indicates the current version of toll trip rate data.
 * The version number can be used to determine if toll rate information has been updated since
 * the last request, enabling efficient caching and update detection.
 *
 * API Functions:
 * - getTollTripVersion: Returns a TollTripVersion object containing the current version number
 *
 * Input/Output Overview:
 * - getTollTripVersion: Input: none, Output: TollTripVersion
 *
 * Base Type: TollTripVersion
 *
 * interface TollTripVersion {
 *   Version: number;
 * }
 *
 * Note: This endpoint may return errors with demo access token. The actual API response structure
 * should be verified with a valid access token when available.
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripVersionAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Note: This endpoint may require valid authentication and may return error responses with demo tokens.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Function
//
// getTollTripVersion
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripVersionAsJson";

/**
 * Retrieves the current version number for toll trip rate data.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<TollTripVersion> - Current version number for toll trip data
 *
 * @example
 * const version = await getTollTripVersion();
 * console.log(version.Version);  // 123
 *
 * @throws {Error} When API is unavailable or returns invalid response
 */
export const getTollTripVersion = async (): Promise<TollTripVersion> => {
  return zodFetch(ENDPOINT, {
    input: getTollTripVersionParamsSchema,
    output: tollTripVersionSchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getTollTripVersionParamsSchema
// GetTollTripVersionParams
// ============================================================================

/**
 * Parameters for retrieving toll trip version (no parameters required)
 */
export const getTollTripVersionParamsSchema = z.object({}).describe("");

export type GetTollTripVersionParams = z.infer<
  typeof getTollTripVersionParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// tollTripVersionSchema
// TollTripVersion
// ============================================================================

/**
 * Toll trip version schema - contains current version number for toll rate data
 */
export const tollTripVersionSchema = z
  .object({
    Version: z.number().describe(""),
  })
  
  .describe("");

/**
 * TollTripVersion type - represents current version number for toll trip rate data
 */
export type TollTripVersion = z.infer<typeof tollTripVersionSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTollTripVersion
// ============================================================================

/**
 * TanStack Query hook for toll trip version with automatic updates (single item).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TollTripVersion, Error> - Query result with current version number
 *
 * @example
 * const { data: version, isLoading } = useTollTripVersion();
 * if (version) {
 *   console.log(version.Version);  // 123
 * }
 */
export const useTollTripVersion = (
  options?: TanStackOptions<TollTripVersion>
): UseQueryResult<TollTripVersion, Error> => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollTripVersion"],
    queryFn: () => getTollTripVersion(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
