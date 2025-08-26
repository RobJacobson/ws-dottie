/**
 * Toll Rates API
 *
 * Real-time toll rate data from Washington State Department of Transportation tolling system.
 * Provides current toll rates for various highway segments including SR-520, SR-167, and SR-405.
 *
 * This API returns current toll rates with location information, milepost data, and pricing details
 * for managed lanes and toll facilities across Washington State. The data includes start/end locations,
 * current toll amounts, travel directions, and state route information.
 *
 * API Functions:
 * - getTollRates: Returns an array of TollRate objects for all current toll rates
 *
 * Input/Output Overview:
 * - getTollRates: Input: none, Output: TollRate[]
 *
 * Base Type: TollRate
 *
 * interface TollRate {
 *   CurrentToll: number;
 *   EndLocationName: string | null;
 *   EndMilepost: number;
 *   StartLocationName: string | null;
 *   StartMilepost: number;
 *   StateRoute: string | null;
 *   TravelDirection: string | null;
 *   TripName: string | null;
 * }
 *
 * Note: The actual API response includes additional fields not documented in official WSDOT documentation:
 * - CurrentMessage: string | null
 * - EndLatitude: number
 * - EndLongitude: number
 * - StartLatitude: number
 * - StartLongitude: number
 * - TimeUpdated: Date
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * {
 *   "CurrentMessage": null,
 *   "CurrentToll": 125,
 *   "EndLatitude": 47.587648851,
 *   "EndLocationName": "NB S Portal",
 *   "EndLongitude": -122.338771924,
 *   "EndMilepost": 30.00,
 *   "StartLatitude": 47.626665944,
 *   "StartLocationName": "SB S Portal",
 *   "StartLongitude": -122.343652437,
 *   "StartMilepost": 33.00,
 *   "StateRoute": "099",
 *   "TimeUpdated": "/Date(1756189447951-0700)/",
 *   "TravelDirection": "S",
 *   "TripName": "099tp03268"
 * }
 * ```
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

// ============================================================================
// API Function
//
// getTollRates
// ============================================================================

const ENDPOINT = "/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson";

/**
 * Retrieves current toll rates for all active toll facilities.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<TollRate[]> - Array of current toll rate data
 *
 * @example
 * const tollRates = await getTollRates();
 * console.log(tollRates.length);  // 45
 * console.log(tollRates[0].CurrentToll);  // 125
 * console.log(tollRates[0].TripName);  // "099tp03268"
 * console.log(tollRates[0].StateRoute);  // "099"
 *
 * @throws {Error} When API is unavailable or returns invalid response
 */
export const getTollRates = async (): Promise<TollRate[]> => {
  return zodFetch(ENDPOINT, {
    input: getTollRatesParamsSchema,
    output: tollRateArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getTollRatesParamsSchema
// GetTollRatesParams
// ============================================================================

/**
 * Parameters for retrieving current toll rates (no parameters required)
 */
export const getTollRatesParamsSchema = z.object({}).describe("");

export type GetTollRatesParams = z.infer<typeof getTollRatesParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// tollRateSchema
// TollRate
// ============================================================================

/**
 * Current toll rate data schema - includes pricing, location, and route information
 */
export const tollRateSchema = z
  .object({
    CurrentToll: z.number().describe(""),
    EndLocationName: z.string().nullable().describe(""),
    EndMilepost: z.number().describe(""),
    StartLocationName: z.string().nullable().describe(""),
    StartMilepost: z.number().describe(""),
    StateRoute: z.string().nullable().describe(""),
    TravelDirection: z.string().nullable().describe(""),
    TripName: z.string().nullable().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

/**
 * Array of toll rate objects - wrapper around tollRateSchema
 */
export const tollRateArraySchema = z.array(tollRateSchema).describe("");

/**
 * TollRate type - represents current toll rate data for a highway segment
 */
export type TollRate = z.infer<typeof tollRateSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTollRates
// ============================================================================

/**
 * TanStack Query hook for current toll rates with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TollRate[], Error> - Query result with array of current toll rate data
 *
 * @example
 * const { data: tollRates, isLoading } = useTollRates();
 * if (tollRates) {
 *   console.log(tollRates.length);  // 45
 *   console.log(tollRates[0].CurrentToll);  // 125
 * }
 */
export const useTollRates = (
  options?: TanStackOptions<TollRate[]>
): UseQueryResult<TollRate[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollRates"],
    queryFn: () => getTollRates(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
