import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";

import { fareLineItemSchema } from "./fareLineItems";
import { getFaresCacheFlushDate } from "./getFaresCacheFlushDate";
import { terminalComboVerboseSchema } from "./terminalCombo";

// ============================================================================
// API Function
//
// getFareLineItemsVerbose
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/farelineitemsverbose/{tripDate}";

/**
 * Get all fares for all terminal combinations on a trip date from WSF Fares API
 *
 * Retrieves all fare line items for all terminal combinations on a given trip date.
 * This endpoint provides comprehensive fare information for all available routes
 * in a single call.
 *
 * @param params - Object containing tripDate parameter
 * @param params.tripDate - The trip date as a Date object
 * @returns Promise resolving to complex object with all fare line items for all routes
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const fareLineItemsVerbose = await getFareLineItemsVerbose({ tripDate: new Date('2024-01-15') });
 * console.log(fareLineItemsVerbose.TerminalComboVerbose.length); // 15
 * ```
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

export const lineItemLookupSchema = z
  .object({
    TerminalComboIndex: z.number().int().min(0).describe(""),
    LineItemIndex: z.number().int().min(0).describe(""),
    RoundTripLineItemIndex: z.number().int().min(0).describe(""),
  })
  .catchall(z.unknown())
  .describe("");

export const fareLineItemsVerboseResponseSchema = z
  .object({
    TerminalComboVerbose: z
      .array(terminalComboVerboseExtendedSchema)
      .describe(""),
    LineItemLookup: z.array(lineItemLookupSchema).describe(""),
    LineItems: z.array(z.array(fareLineItemSchema)).describe(""),
    RoundTripLineItems: z.array(z.array(fareLineItemSchema)).describe(""),
  })
  .catchall(z.unknown())
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
 * Hook for getting verbose fare line items from WSF Fares API
 *
 * Retrieves verbose fare line items for a specific route. This endpoint provides
 * comprehensive fare information including detailed descriptions and metadata for the specified
 * terminal combination and trip type.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, roundTrip
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @param params.roundTrip - Whether this is a round trip
 * @param options - Optional React Query options
 * @returns React Query result containing array of verbose fare line items
 */
export const useFareLineItemsVerbose = (
  params: {
    tripDate: Date;
  },
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFareLineItemsVerbose>>>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<FareLineItemsVerboseResponse, Error> => {
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
