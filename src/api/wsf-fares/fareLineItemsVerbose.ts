/**
 * WSF Fares API - Fare Line Items Verbose
 *
 * Provides comprehensive fare information for all Washington State Ferries routes
 * on a specific trip date. This endpoint returns detailed fare data for all
 * terminal combinations, including both one-way and round-trip pricing structures.
 *
 * The verbose endpoint is designed for applications that need complete fare
 * information across all routes, such as fare comparison tools, comprehensive
 * booking systems, or administrative interfaces. It returns fare line items
 * organized by terminal combinations with lookup tables for efficient data access.
 *
 * API Functions:
 * - getFareLineItemsVerbose: Returns comprehensive fare data for all routes on a specific date
 *
 * Input/Output Overview:
 * - getFareLineItemsVerbose: Input: { tripDate: Date }, Output: FareLineItemsVerboseResponse
 *
 * Base Types: FareLineItemsVerboseResponse, TerminalComboVerbose, LineItemLookup
 *
 * interface FareLineItemsVerboseResponse {
 *   TerminalComboVerbose: TerminalComboVerbose[];  // Terminal combinations with route info
 *   LineItemLookup: LineItemLookup[];              // Lookup table for fare line items
 *   LineItems: FareLineItem[][];                   // One-way fare line items by route
 *   RoundTripLineItems: FareLineItem[][];          // Round-trip fare line items by route
 * }
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/fares/rest/farelineitemsverbose/2025-08-26?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * {
 *   "TerminalComboVerbose": [
 *     {
 *       "DepartingTerminalID": 1,
 *       "DepartingDescription": "Anacortes",
 *       "ArrivingTerminalID": 10,
 *       "ArrivingDescription": "Friday Harbor",
 *       "CollectionDescription": "Passenger and vehicle/driver fares are collected at Anacortes, while no fares are collected at Friday Harbor."
 *     }
 *   ],
 *   "LineItemLookup": [
 *     {
 *       "TerminalComboIndex": 0,
 *       "LineItemIndex": 0,
 *       "RoundTripLineItemIndex": 0
 *     }
 *   ],
 *   "LineItems": [
 *     [
 *       {
 *         "FareLineItemID": 1,
 *         "FareLineItem": "Adult (age 19 - 64)",
 *         "Category": "Passenger",
 *         "DirectionIndependent": false,
 *         "Amount": 10.2500
 *       }
 *     ]
 *   ],
 *   "RoundTripLineItems": []
 * }
 * ```
 *
 * Note: This endpoint returns a large amount of data and should be used when
 * comprehensive fare information across all routes is required. For single-route
 * fare queries, consider using the standard fare line items endpoints instead.
 */

import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";

import { fareLineItemSchema } from "./fareLineItems";
import { getFaresCacheFlushDate } from "../wsf/cacheFlushDate";
import { terminalComboVerboseSchema } from "./terminalCombo";

// ============================================================================
// API Function
//
// getFareLineItemsVerbose
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/farelineitemsverbose/{tripDate}";

/**
 * Retrieves comprehensive fare information for all terminal combinations on a specific trip date.
 *
 * This endpoint provides complete fare data across all WSF routes, including detailed
 * pricing information for both one-way and round-trip journeys. It's designed for
 * applications that need comprehensive fare comparison or administrative functionality.
 *
 * @param params - Parameters object for verbose fare line items query
 * @param params.tripDate - Trip date (must be within valid date range)
 * @returns Promise<FareLineItemsVerboseResponse> - Comprehensive fare data for all routes
 *
 * @example
 * const fareData = await getFareLineItemsVerbose({ tripDate: new Date('2025-08-26') });
 * console.log(fareData.TerminalComboVerbose.length);  // Number of route combinations
 * console.log(fareData.LineItems.length);  // Number of route fare arrays
 *
 * @throws {Error} When API is unavailable, invalid date, or authentication fails
 */
export const getFareLineItemsVerbose = async (
  params: GetFareLineItemsVerboseParams
): Promise<FareLineItemsVerboseResponse> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getFareLineItemsVerboseParamsSchema,
      output: fareLineItemsVerboseResponseSchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getFareLineItemsVerboseParamsSchema
// GetFareLineItemsVerboseParams
// ============================================================================

/**
 * Parameters for retrieving verbose fare line items (trip date only)
 */
export const getFareLineItemsVerboseParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
  })
  .describe("");

export type GetFareLineItemsVerboseParams = z.infer<
  typeof getFareLineItemsVerboseParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// fareLineItemsVerboseResponseSchema
// FareLineItemsVerboseResponse
// ============================================================================

// Import the terminal combo verbose schema
export const terminalComboVerboseExtendedSchema = terminalComboVerboseSchema;

// Import the fare line item schema from getFareLineItems

/**
 * Line item lookup schema - provides indexing information for fare line items
 */
export const lineItemLookupSchema = z
  .object({
    TerminalComboIndex: z.number().int().min(0).describe(""),
    LineItemIndex: z.number().int().min(0).describe(""),
    RoundTripLineItemIndex: z.number().int().min(0).describe(""),
  })
  
  .describe("");

/**
 * Verbose fare line items response schema - comprehensive fare data for all routes
 */
export const fareLineItemsVerboseResponseSchema = z
  .object({
    TerminalComboVerbose: z
      .array(terminalComboVerboseExtendedSchema)
      .describe(""),
    LineItemLookup: z.array(lineItemLookupSchema).describe(""),
    LineItems: z.array(z.array(fareLineItemSchema)).describe(""),
    RoundTripLineItems: z.array(z.array(fareLineItemSchema)).describe(""),
  })
  
  .describe("");

export type TerminalComboVerbose = z.infer<
  typeof terminalComboVerboseExtendedSchema
>;

export type LineItemLookup = z.infer<typeof lineItemLookupSchema>;
export type FareLineItemsVerboseResponse = z.infer<
  typeof fareLineItemsVerboseResponseSchema
>;

// ============================================================================
// TanStack Query Hook
//
// useFareLineItemsVerbose
// ============================================================================

/**
 * TanStack Query hook for verbose fare line items with automatic updates.
 *
 * @param params - Parameters object for verbose fare line items query
 * @param params.tripDate - Trip date (must be within valid date range)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<FareLineItemsVerboseResponse, Error> - Query result with comprehensive fare data
 *
 * @example
 * const { data: fareData, isLoading } = useFareLineItemsVerbose({
 *   tripDate: new Date('2025-08-26')
 * });
 * if (fareData) {
 *   console.log(fareData.TerminalComboVerbose.length);  // Number of route combinations
 *   console.log(fareData.LineItems.length);  // Number of route fare arrays
 * }
 */
export const useFareLineItemsVerbose = (
  params: {
    tripDate: Date;
  },
  options?: Omit<
    UseQueryOptions<FareLineItemsVerboseResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "fares", "fareLineItemsVerbose", JSON.stringify(params)],
    queryFn: () =>
      getFareLineItemsVerbose({
        tripDate: params.tripDate,
      }),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};
