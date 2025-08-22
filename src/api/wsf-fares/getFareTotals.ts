import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import { jsDateToYyyyMmDd } from "@/shared/fetching/parsing";

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT =
  "/ferries/api/fares/rest/faretotals/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}/{fareLineItemIDs}/{quantities}";

/**
 * Calculate fare totals for a set of fare line items from WSF Fares API
 *
 * Calculates the total fare cost for a specific combination of fare line items and quantities.
 * This endpoint provides fare calculation functionality for booking and reservation systems.
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, roundTrip, fareLineItemIDs, and quantities parameters
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @param params.roundTrip - Whether this is a round trip
 * @param params.fareLineItemIDs - Array of fare line item IDs to include in the calculation
 * @param params.quantities - Array of quantities corresponding to fare line item IDs
 * @returns Promise resolving to fare total calculation
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const fareTotals = await getFareTotals({
 *   tripDate: new Date('2024-01-15'),
 *   departingTerminalID: 1,
 *   arrivingTerminalID: 2,
 *   roundTrip: false,
 *   fareLineItemIDs: [1, 2],
 *   quantities: [2, 1]
 * });
 * console.log(fareTotals.length); // 2
 * ```
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
// INPUT SCHEMA & TYPES
// ============================================================================

export const getFareTotalsParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to calculate fare totals. This date must be within the valid date range returned by getFaresValidDateRange."
      ),
    departingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "The unique identifier for the departing terminal. This ID can be obtained from the getFaresTerminals endpoint."
      ),
    arrivingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "The unique identifier for the arriving terminal. This ID can be obtained from the getFaresTerminalMates endpoint."
      ),
    roundTrip: z
      .boolean()
      .describe(
        "Whether this is a round trip. Set to true for round trip fares, false for one-way fares."
      ),
    fareLineItemIDs: z
      .array(z.number().int().positive())
      .min(1, "At least one fare line item ID must be provided")
      .describe(
        "Array of fare line item IDs to include in the fare calculation. These IDs can be obtained from the getFareLineItems endpoint."
      ),
    quantities: z
      .array(z.number().int().min(1))
      .min(1, "At least one quantity must be provided")
      .describe(
        "Array of quantities corresponding to the fare line item IDs. The length must match the fareLineItemIDs array."
      ),
  })
  .refine((data) => data.fareLineItemIDs.length === data.quantities.length, {
    message: "fareLineItemIDs and quantities arrays must have the same length",
    path: ["quantities"],
  })
  .describe(
    "Parameters for calculating fare totals for a specific combination of fare line items and quantities"
  );

export type GetFareTotalsParams = z.infer<typeof getFareTotalsParamsSchema>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Reuse the fareLineItemSchema from getFareLineItems
export const fareTotalItemSchema = z
  .object({
    FareLineItemID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier assigned to this fare line item by the WSF system. This ID serves as a permanent, unique reference for the fare across all WSF systems and can be used for tracking, reporting, and data correlation purposes."
      ),
    FareLineItem: z
      .string()
      .describe(
        "Human-readable description of the fare line item. Examples include 'Adult', 'Child (6-18)', 'Senior (65+)', 'Disabled', 'Vehicle under 20 feet', 'Vehicle 20-30 feet', 'Motorcycle', or 'Bicycle'. This field is the primary display name used in applications."
      ),
    Category: z
      .string()
      .describe(
        "Category classification for the fare line item. Examples include 'Passenger', 'Vehicle', 'Special', or 'Discount'. This field helps group similar fare types together for display and calculation purposes."
      ),
    DirectionIndependent: z
      .boolean()
      .describe(
        "Whether this fare is independent of travel direction. When true, the same fare applies regardless of whether the passenger is traveling from terminal A to B or B to A. When false, different fares may apply for each direction."
      ),
    Amount: z
      .number()
      .describe(
        "Fare amount in US dollars. This field shows the cost for this specific fare line item and is used for fare calculations and total cost computations."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Basic fare line item information including fare details, category, direction independence, and amount. This schema represents individual fare components that can be combined to calculate total trip costs."
  );

export const fareTotalsArraySchema = z
  .array(fareTotalItemSchema)
  .describe(
    "Array of fare total calculations for a specific combination of fare line items and quantities. This collection provides the calculated total costs for fare combinations."
  );

export type FareLineItem = z.infer<typeof fareTotalItemSchema>;
export type FareTotal = z.infer<typeof fareTotalItemSchema>; // Reusing fareTotalItemSchema for fare totals

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for getting fare totals from WSF Fares API
 *
 * Calculates the total fare cost for a specific combination of fare line items and quantities.
 * This endpoint provides fare calculation functionality for booking and reservation systems.
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, roundTrip, fareLineItemIDs, quantities
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @param params.roundTrip - Whether this is a round trip
 * @param params.fareLineItemIDs - Array of fare line item IDs to include in the calculation
 * @param params.quantities - Array of quantities corresponding to fare line item IDs
 * @param options - Optional React Query options
 * @returns React Query result containing fare total calculation
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
    UseQueryOptions<Awaited<ReturnType<typeof getFareTotals>>>,
    "queryKey" | "queryFn" | "enabled"
  >
): UseQueryResult<FareTotal[], Error> => {
  return useQuery({
    queryKey: [
      "wsf",
      "fares",
      "fareTotals",
      jsDateToYyyyMmDd(params.tripDate),
      params.departingTerminalID,
      params.arrivingTerminalID,
      params.roundTrip,
      params.fareLineItemIDs,
      params.quantities,
    ],
    queryFn: () => getFareTotals(params),
    enabled: params.fareLineItemIDs.length > 0 && params.quantities.length > 0,
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
