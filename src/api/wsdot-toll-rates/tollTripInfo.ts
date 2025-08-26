/**
 * Toll Trip Info API
 *
 * Toll trip information with geometry data from Washington State Department of Transportation tolling system.
 * Provides detailed trip information including start/end locations, milepost data, travel directions,
 * and geometry data for toll facilities across Washington State.
 *
 * This API returns trip information with geographic coordinates and route details for toll segments.
 * The data includes location names, milepost information, travel directions, and geometry strings
 * that can be used for mapping and visualization purposes.
 *
 * API Functions:
 * - getTollTripInfo: Returns an array of TollTripInfo objects with geometry data
 *
 * Input/Output Overview:
 * - getTollTripInfo: Input: none, Output: TollTripInfo[]
 *
 * Base Type: TollTripInfo
 *
 * interface TollTripInfo {
 *   EndLocationName: string | null;
 *   EndMilepost: number;
 *   Geometry: string;
 *   ModifiedDate: Date | null;
 *   StartLocationName: string | null;
 *   StartMilepost: number;
 *   TravelDirection: string | null;
 *   TripName: string | null;
 * }
 *
 * Note: This endpoint may return errors with demo access token. The actual API response structure
 * should be verified with a valid access token when available.
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripInfoAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Note: This endpoint may require valid authentication and may return error responses with demo tokens.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Function
//
// getTollTripInfo
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripInfoAsJson";

/**
 * Retrieves toll trip information with geometry data for all toll facilities.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<TollTripInfo[]> - Array of toll trip information with geometry data
 *
 * @example
 * const tripInfo = await getTollTripInfo();
 * console.log(tripInfo.length);  // 45
 * console.log(tripInfo[0].TripName);  // "099tp03268"
 * console.log(tripInfo[0].Geometry);  // "POINT(-122.338771924 47.587648851)"
 * console.log(tripInfo[0].StartLocationName);  // "SB S Portal"
 *
 * @throws {Error} When API is unavailable or returns invalid response
 */
export const getTollTripInfo = async (): Promise<TollTripInfo[]> => {
  return zodFetch(ENDPOINT, {
    input: getTollTripInfoParamsSchema,
    output: tollTripInfoArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getTollTripInfoParamsSchema
// GetTollTripInfoParams
// ============================================================================

/**
 * Parameters for retrieving toll trip information (no parameters required)
 */
export const getTollTripInfoParamsSchema = z.object({}).describe("");

export type GetTollTripInfoParams = z.infer<typeof getTollTripInfoParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// tollTripInfoSchema
// TollTripInfo
// ============================================================================

/**
 * Toll trip information schema - includes location data and geometry information
 */
export const tollTripInfoSchema = z
  .object({
    EndLocationName: z.string().nullable().describe(""),
    EndMilepost: z.number().describe(""),
    Geometry: z.string().describe(""),
    ModifiedDate: zWsdotDate().nullable().describe(""),
    StartLocationName: z.string().nullable().describe(""),
    StartMilepost: z.number().describe(""),
    TravelDirection: z.string().nullable().describe(""),
    TripName: z.string().nullable().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

/**
 * Array of toll trip info objects - wrapper around tollTripInfoSchema
 */
export const tollTripInfoArraySchema = z.array(tollTripInfoSchema).describe("");

/**
 * TollTripInfo type - represents toll trip information with geometry data
 */
export type TollTripInfo = z.infer<typeof tollTripInfoSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTollTripInfo
// ============================================================================

/**
 * TanStack Query hook for toll trip information with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TollTripInfo[], Error> - Query result with array of toll trip information
 *
 * @example
 * const { data: tripInfo, isLoading } = useTollTripInfo();
 * if (tripInfo) {
 *   console.log(tripInfo.length);  // 45
 *   console.log(tripInfo[0].Geometry);  // "POINT(-122.338771924 47.587648851)"
 * }
 */
export const useTollTripInfo = (
  options?: TanStackOptions<TollTripInfo[]>
): UseQueryResult<TollTripInfo[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollTripInfo"],
    queryFn: () => getTollTripInfo(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
