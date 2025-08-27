/**
 * WSF Fares API - Fare Totals
 *
 * Provides fare calculation functionality for Washington State Ferries, allowing
 * applications to calculate total costs for specific combinations of fare line items
 * and quantities. This endpoint is essential for booking systems, reservation
 * interfaces, and fare estimation tools.
 *
 * The fare totals endpoint calculates costs for various fare combinations including
 * passenger fares, vehicle fares, and multi-ride options. It supports both one-way
 * and round-trip journeys, with different pricing structures based on route distance
 * and terminal combinations.
 *
 * API Functions:
 * - getFareTotals: Calculates total fare cost for specific fare line items and quantities
 *
 * Input/Output Overview:
 * - getFareTotals: Input: { tripDate: Date, departingTerminalID: number, arrivingTerminalID: number, roundTrip: boolean, fareLineItemIDs: number[], quantities: number[] }, Output: FareTotal[]
 *
 * Base Type: FareTotal
 *
 * interface FareTotal {
 *   TotalType: number;        // 1=Depart, 3=Either, 4=Grand Total
 *   Description: string;      // Human-readable description of the total
 *   BriefDescription: string; // Short description (e.g., "Depart", "Total")
 *   Amount: number;           // Calculated fare amount
 * }
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/fares/rest/faretotals/2025-08-26/7/3/false/1/1?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "TotalType": 1,
 *     "Description": "Seattle to Bainbridge Island",
 *     "BriefDescription": "Depart",
 *     "Amount": 10.2500
 *   },
 *   {
 *     "TotalType": 3,
 *     "Description": "Either",
 *     "BriefDescription": "Either",
 *     "Amount": 0
 *   },
 *   {
 *     "TotalType": 4,
 *     "Description": "Grand Total",
 *     "BriefDescription": "Total",
 *     "Amount": 10.2500
 *   }
 * ]
 * ```
 *
 * Note: The API requires that fareLineItemIDs and quantities arrays have the same length,
 * with corresponding indices representing the fare type and quantity for that fare.
 * TotalType 1 represents departure fare, TotalType 4 represents the grand total.
 */

import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";

import { getFaresCacheFlushDate } from "../wsf/cacheFlushDate";

// ============================================================================
// API Function
//
// getFareTotals
// ============================================================================

const ENDPOINT =
  "/ferries/api/fares/rest/faretotals/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}/{fareLineItemIDs}/{quantities}";

/**
 * Calculates total fare cost for a specific combination of fare line items and quantities.
 *
 * This endpoint provides comprehensive fare calculation functionality for booking and
 * reservation systems. It calculates costs for various fare combinations including
 * passenger fares, vehicle fares, and multi-ride options, supporting both one-way
 * and round-trip journeys.
 *
 * @param params - Parameters object for fare total calculation
 * @param params.tripDate - Trip date (must be within valid date range)
 * @param params.departingTerminalID - Unique identifier for departing terminal
 * @param params.arrivingTerminalID - Unique identifier for arriving terminal
 * @param params.roundTrip - Whether the journey is round trip (true) or one-way (false)
 * @param params.fareLineItemIDs - Array of fare line item IDs to include in calculation
 * @param params.quantities - Array of quantities corresponding to fare line item IDs
 * @returns Promise<FareTotal[]> - Array of fare totals including departure, return, and grand total
 *
 * @example
 * const fareTotals = await getFareTotals({
 *   tripDate: new Date('2025-08-26'),
 *   departingTerminalID: 7, // Seattle
 *   arrivingTerminalID: 3,  // Bainbridge Island
 *   roundTrip: false,
 *   fareLineItemIDs: [1],   // Adult fare
 *   quantities: [1]         // 1 adult
 * });
 * console.log(fareTotals.length);  // 3
 * console.log(fareTotals[2].Amount);  // 10.25 (grand total)
 *
 * @throws {Error} When API is unavailable, invalid parameters, or authentication fails
 */
export const getFareTotals = async (
  params: GetFareTotalsParams
): Promise<FareTotal[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getFareTotalsParamsSchema,
      output: fareTotalsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getFareTotalsParamsSchema
// GetFareTotalsParams
// ============================================================================

/**
 * Parameters for fare total calculation - includes route, fare types, and quantities
 */
export const getFareTotalsParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    departingTerminalID: z.number().int().positive().describe(""),
    arrivingTerminalID: z.number().int().positive().describe(""),
    roundTrip: z.boolean().describe(""),
    fareLineItemIDs: z
      .array(z.number().int().positive())
      .min(1, "At least one fare line item ID must be provided")
      .describe(""),
    quantities: z
      .array(z.number().int().min(1))
      .min(1, "At least one quantity must be provided")
      .describe(""),
  })
  .refine((data) => data.fareLineItemIDs.length === data.quantities.length, {
    message: "fareLineItemIDs and quantities arrays must have the same length",
    path: ["quantities"],
  })
  .describe("");

export type GetFareTotalsParams = z.infer<typeof getFareTotalsParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// fareTotalsArraySchema
// FareTotal
// ============================================================================

/**
 * Fare total schema - represents individual fare total calculation results
 */
export const fareTotalSchema = z
  .object({
    TotalType: z.number().int().min(1).max(4).describe(""),
    Description: z.string().nullable().describe(""),
    BriefDescription: z.string().nullable().describe(""),
    Amount: z.number().describe(""),
  })
  .describe("");

/**
 * Array of fare total objects - wrapper around fareTotalSchema
 */
export const fareTotalsArraySchema = z.array(fareTotalSchema).describe("");

/**
 * FareTotal type - represents individual fare total calculation results
 */
export type FareTotal = z.infer<typeof fareTotalSchema>;

// ============================================================================
// TanStack Query Hook
//
// useFareTotals
// ============================================================================

/**
 * TanStack Query hook for fare totals with automatic updates.
 *
 * @param params - Parameters object for fare total calculation
 * @param params.tripDate - Trip date (must be within valid date range)
 * @param params.departingTerminalID - Unique identifier for departing terminal
 * @param params.arrivingTerminalID - Unique identifier for arriving terminal
 * @param params.roundTrip - Whether the journey is round trip (true) or one-way (false)
 * @param params.fareLineItemIDs - Array of fare line item IDs to include in calculation
 * @param params.quantities - Array of quantities corresponding to fare line item IDs
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<FareTotal[], Error> - Query result with fare total calculations
 *
 * @example
 * const { data: fareTotals, isLoading } = useFareTotals({
 *   tripDate: new Date('2025-08-26'),
 *   departingTerminalID: 7,
 *   arrivingTerminalID: 3,
 *   roundTrip: false,
 *   fareLineItemIDs: [1],
 *   quantities: [1]
 * });
 * if (fareTotals) {
 *   console.log(fareTotals.length);  // 3
 *   console.log(fareTotals[2].Amount);  // 10.25 (grand total)
 * }
 */
export const useFareTotals = (
  params: {
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
    roundTrip: boolean;
    fareLineItemIDs: number[];
    quantities: number[];
  },
  options?: Omit<
    UseQueryOptions<FareTotal[], Error>,
    "queryKey" | "queryFn" | "enabled"
  >
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "fares", "fareTotals", JSON.stringify(params)],
    queryFn: () => getFareTotals(params),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: {
      ...tanstackQueryOptions.DAILY_UPDATES,
      enabled:
        params.fareLineItemIDs.length > 0 && params.quantities.length > 0,
      ...options,
    },
    params,
  });
};
