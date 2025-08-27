/**
 * WSF Fares API - Fare Line Items
 *
 * Provides access to Washington State Ferries fare line items including passenger fares,
 * vehicle fares, and multi-ride commuter cards. This API returns detailed pricing information
 * for specific terminal combinations and trip dates.
 *
 * The API supports both one-way and round-trip journeys, with different fare structures
 * for various passenger types (adult, senior, youth) and vehicle categories (standard,
 * motorcycle, length-based). Multi-ride commuter cards offer discounted rates for frequent
 * travelers.
 *
 * API Functions:
 * - getFareLineItems: Returns complete fare line items for a specific route and date
 * - getFareLineItemsBasic: Returns most popular fare line items for a specific route and date
 *
 * Input/Output Overview:
 * - getFareLineItems: Input: { tripDate: Date, departingTerminalID: number, arrivingTerminalID: number, roundTrip: boolean }, Output: FareLineItem[]
 * - getFareLineItemsBasic: Input: { tripDate: Date, departingTerminalID: number, arrivingTerminalID: number, roundTrip: boolean }, Output: FareLineItem[]
 *
 * Base Type: FareLineItem
 *
 * interface FareLineItem {
 *   FareLineItemID: number;
 *   FareLineItem: string;
 *   Category: string;
 *   DirectionIndependent: boolean;
 *   Amount: number;
 * }
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/fares/rest/farelineitems/2025-08-26/7/3/false?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "FareLineItemID": 1,
 *     "FareLineItem": "Adult (age 19 - 64)",
 *     "Category": "Passenger",
 *     "DirectionIndependent": false,
 *     "Amount": 10.2500
 *   },
 *   {
 *     "FareLineItemID": 2,
 *     "FareLineItem": "Senior (age 65 & over) / <a href=https://wsdot.wa.gov/ferries/rider-information/ada#Reduced%20fare%20passenger%20tickets target=\"_blank\" title=\"Disability\">Disability</a>",
 *     "Category": "Passenger",
 *     "DirectionIndependent": false,
 *     "Amount": 5.1000
 *   },
 *   {
 *     "FareLineItemID": 3,
 *     "FareLineItem": "Youth (age 18 and under)",
 *     "Category": "Passenger",
 *     "DirectionIndependent": false,
 *     "Amount": 0.0000
 *   },
 *   {
 *     "FareLineItemID": 168,
 *     "FareLineItem": "Vehicle Under 14' (less than 168\") & Driver",
 *     "Category": "Vehicle, Motorcycle, and Stowage Fares",
 *     "DirectionIndependent": false,
 *     "Amount": 18.2000
 *   }
 * ]
 * ```
 *
 * Note: The API returns different fare structures based on route distance and terminal
 * combinations. Some routes may have additional fare categories or different pricing.
 * The basic endpoint returns a subset of the most commonly used fare types.
 */

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";

import { getFaresCacheFlushDate } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getFareLineItems (all fare line items)
// getFareLineItemsBasic (most popular fare line items)
// ============================================================================

const ENDPOINT_ALL =
  "/ferries/api/fares/rest/farelineitems/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}";
const ENDPOINT_BASIC =
  "/ferries/api/fares/rest/farelineitemsbasic/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}";

/**
 * Retrieves complete fare line items for a specific route and trip date.
 *
 * @param params - Parameters object for fare line items query
 * @param params.tripDate - Trip date (must be within valid date range)
 * @param params.departingTerminalID - Unique identifier for departing terminal
 * @param params.arrivingTerminalID - Unique identifier for arriving terminal
 * @param params.roundTrip - Whether the journey is round trip (true) or one-way (false)
 * @returns Promise<FareLineItem[]> - Array of fare line items with pricing and category information
 *
 * @example
 * const fareLineItems = await getFareLineItems({
 *   tripDate: new Date('2025-08-26'),
 *   departingTerminalID: 7, // Seattle
 *   arrivingTerminalID: 3,  // Bainbridge Island
 *   roundTrip: false
 * });
 * console.log(fareLineItems.length);  // 26
 * console.log(fareLineItems[0].FareLineItem);  // "Adult (age 19 - 64)"
 * console.log(fareLineItems[0].Amount);  // 10.25
 *
 * @throws {Error} When API is unavailable, invalid parameters, or authentication fails
 */
export const getFareLineItems = async (
  params: GetFareLineItemsParams
): Promise<FareLineItem[]> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getFareLineItemsParamsSchema,
      output: fareLineItemsArraySchema,
    },
    params
  );
};

/**
 * Retrieves most popular fare line items for a specific route and trip date.
 *
 * This endpoint returns a subset of the most commonly used fare types, providing
 * a streamlined view for applications that don't need the complete fare catalog.
 *
 * @param params - Parameters object for basic fare line items query
 * @param params.tripDate - Trip date (must be within valid date range)
 * @param params.departingTerminalID - Unique identifier for departing terminal
 * @param params.arrivingTerminalID - Unique identifier for arriving terminal
 * @param params.roundTrip - Whether the journey is round trip (true) or one-way (false)
 * @returns Promise<FareLineItem[]> - Array of most popular fare line items
 *
 * @example
 * const basicFares = await getFareLineItemsBasic({
 *   tripDate: new Date('2025-08-26'),
 *   departingTerminalID: 7, // Seattle
 *   arrivingTerminalID: 3,  // Bainbridge Island
 *   roundTrip: false
 * });
 * console.log(basicFares.length);  // Fewer than getFareLineItems
 *
 * @throws {Error} When API is unavailable, invalid parameters, or authentication fails
 */
export const getFareLineItemsBasic = async (
  params: GetFareLineItemsBasicParams
): Promise<FareLineItem[]> => {
  return zodFetch(
    ENDPOINT_BASIC,
    {
      input: getFareLineItemsBasicParamsSchema,
      output: fareLineItemsBasicArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getFareLineItemsParamsSchema
// getFareLineItemsBasicParamsSchema
// GetFareLineItemsParams
// GetFareLineItemsBasicParams
// ============================================================================

/**
 * Parameters for retrieving complete fare line items for a specific route
 */
export const getFareLineItemsParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    departingTerminalID: z.number().int().positive().describe(""),
    arrivingTerminalID: z.number().int().positive().describe(""),
    roundTrip: z.boolean().describe(""),
  })
  .describe("");

/**
 * Parameters for retrieving most popular fare line items for a specific route
 */
export const getFareLineItemsBasicParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    departingTerminalID: z.number().int().positive().describe(""),
    arrivingTerminalID: z.number().int().positive().describe(""),
    roundTrip: z.boolean().describe(""),
  })
  .describe("");

export type GetFareLineItemsParams = z.infer<
  typeof getFareLineItemsParamsSchema
>;

export type GetFareLineItemsBasicParams = z.infer<
  typeof getFareLineItemsBasicParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// fareLineItemSchema
// fareLineItemsArraySchema
// fareLineItemsBasicArraySchema
// FareLineItem
// ============================================================================

/**
 * Fare line item schema - represents individual fare pricing and category information
 */
export const fareLineItemSchema = z
  .object({
    FareLineItemID: z.number().int().positive().describe(""),
    FareLineItem: z.string().describe(""),
    Category: z.string().describe(""),
    DirectionIndependent: z.boolean().describe(""),
    Amount: z.number().positive().describe(""),
  })
  .describe("");

/**
 * Array of fare line item objects - wrapper around fareLineItemSchema
 */
export const fareLineItemsArraySchema = z.array(fareLineItemSchema);

/**
 * Array of basic fare line item objects - wrapper around fareLineItemSchema
 */
export const fareLineItemsBasicArraySchema = z.array(fareLineItemSchema);

/**
 * FareLineItem type - represents individual fare pricing and category information
 */
export type FareLineItem = z.infer<typeof fareLineItemSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useFareLineItems (all fare line items)
// useFareLineItemsBasic (most popular fare line items)
// ============================================================================

/**
 * TanStack Query hook for fare line items with automatic updates (complete catalog).
 *
 * @param params - Parameters object for fare line items query
 * @param params.tripDate - Trip date (must be within valid date range)
 * @param params.departingTerminalID - Unique identifier for departing terminal
 * @param params.arrivingTerminalID - Unique identifier for arriving terminal
 * @param params.roundTrip - Whether the journey is round trip (true) or one-way (false)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<FareLineItem[], Error> - Query result with complete fare catalog
 *
 * @example
 * const { data: fareLineItems, isLoading } = useFareLineItems({
 *   tripDate: new Date('2025-08-26'),
 *   departingTerminalID: 7,
 *   arrivingTerminalID: 3,
 *   roundTrip: false
 * });
 * if (fareLineItems) {
 *   console.log(fareLineItems.length);  // 26
 *   console.log(fareLineItems[0].FareLineItem);  // "Adult (age 19 - 64)"
 * }
 */
export const useFareLineItems = (
  params: GetFareLineItemsParams,
  options?: UseQueryOptions<FareLineItem[], Error>
) => {
  return useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "fares",
      "lineItems",
      params.tripDate.toISOString(),
      params.departingTerminalID,
      params.arrivingTerminalID,
      params.roundTrip,
    ],
    queryFn: () => getFareLineItems(params),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

/**
 * TanStack Query hook for basic fare line items with automatic updates (most popular).
 *
 * @param params - Parameters object for basic fare line items query
 * @param params.tripDate - Trip date (must be within valid date range)
 * @param params.departingTerminalID - Unique identifier for departing terminal
 * @param params.arrivingTerminalID - Unique identifier for arriving terminal
 * @param params.roundTrip - Whether the journey is round trip (true) or one-way (false)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<FareLineItem[], Error> - Query result with most popular fares
 *
 * @example
 * const { data: basicFares, isLoading } = useFareLineItemsBasic({
 *   tripDate: new Date('2025-08-26'),
 *   departingTerminalID: 7,
 *   arrivingTerminalID: 3,
 *   roundTrip: false
 * });
 * if (basicFares) {
 *   console.log(basicFares.length);  // Fewer than complete catalog
 * }
 */
export const useFareLineItemsBasic = (
  params: GetFareLineItemsBasicParams,
  options?: UseQueryOptions<FareLineItem[], Error>
) => {
  return useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "fares",
      "lineItemsBasic",
      params.tripDate.toISOString(),
      params.departingTerminalID,
      params.arrivingTerminalID,
      params.roundTrip,
    ],
    queryFn: () => getFareLineItemsBasic(params),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
