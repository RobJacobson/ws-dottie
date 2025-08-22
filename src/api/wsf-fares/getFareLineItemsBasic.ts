import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import { jsDateToYyyyMmDd } from "@/shared/fetching/parsing";

import { type FareLineItem, fareLineItemSchema } from "./getFareLineItems";

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT =
  "/ferries/api/fares/rest/farelineitemsbasic/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}";

/**
 * Get most popular fares for a route from WSF Fares API
 *
 * Retrieves the most popular fare line items for a specific route. This endpoint provides
 * the commonly used fare options for the specified terminal combination and trip type.
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, and roundTrip parameters
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @param params.roundTrip - Whether this is a round trip
 * @returns Promise resolving to array of most popular fare line items
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const fareLineItems = await getFareLineItemsBasic({
 *   tripDate: new Date('2024-01-15'),
 *   departingTerminalID: 1,
 *   arrivingTerminalID: 2,
 *   roundTrip: false
 * });
 * console.log(fareLineItems.length); // 8
 * ```
 */
export const getFareLineItemsBasic = async (
  params: GetFareLineItemsBasicParams
): Promise<FareLineItem[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getFareLineItemsBasicParamsSchema,
      output: fareLineItemsBasicArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getFareLineItemsBasicParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve fare line items. This date must be within the valid date range returned by getFaresValidDateRange."
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
  })
  .describe(
    "Parameters for retrieving most popular fare line items for a specific route and trip type"
  );

export type GetFareLineItemsBasicParams = z.infer<
  typeof getFareLineItemsBasicParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Import the fare line item schema from getFareLineItems

export const fareLineItemsBasicArraySchema = z
  .array(fareLineItemSchema)
  .describe(
    "Array of most popular fare line items for a specific route and trip type. This collection provides the commonly used fare options for quick fare selection."
  );

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for getting basic fare line items from WSF Fares API
 *
 * Retrieves the most popular fare line items for a specific route. This endpoint provides
 * the commonly used fare options for the specified terminal combination and trip type.
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, roundTrip
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @param params.roundTrip - Whether this is a round trip
 * @param options - Optional React Query options
 * @returns React Query result containing array of most popular fare line items
 */
export const useFareLineItemsBasic = (
  params: {
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
    roundTrip: boolean;
  },
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFareLineItemsBasic>>>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<FareLineItem[], Error> => {
  return useQuery({
    queryKey: [
      "wsf",
      "fares",
      "fareLineItemsBasic",
      jsDateToYyyyMmDd(params.tripDate),
      params.departingTerminalID,
      params.arrivingTerminalID,
      params.roundTrip,
    ],
    queryFn: () =>
      getFareLineItemsBasic({
        tripDate: params.tripDate,
        departingTerminalID: params.departingTerminalID,
        arrivingTerminalID: params.arrivingTerminalID,
        roundTrip: params.roundTrip,
      }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
