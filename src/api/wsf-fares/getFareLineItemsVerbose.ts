import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import { jsDateToYyyyMmDd } from "@/shared/fetching/parsing";

// ============================================================================
// API FUNCTION
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
// INPUT SCHEMA & TYPES
// ============================================================================

export const getFareLineItemsVerboseParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve all fare line items. This date must be within the valid date range returned by getFaresValidDateRange."
      ),
  })
  .describe(
    "Parameters for retrieving all fare line items for all terminal combinations on a specific trip date"
  );

export type GetFareLineItemsVerboseParams = z.infer<
  typeof getFareLineItemsVerboseParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Reuse the terminalComboVerboseSchema from getTerminalComboVerbose
export const terminalComboVerboseExtendedSchema = z
  .object({
    DepartingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the departing ferry terminal. This ID can be used to reference the terminal in other API calls and for data correlation purposes."
      ),
    DepartingDescription: z
      .string()
      .describe(
        "Human-readable name for the departing ferry terminal. This field shows the starting point of the ferry route and helps users identify the departure location."
      ),
    ArrivingTerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the arriving ferry terminal. This ID can be used to reference the terminal in other API calls and for data correlation purposes."
      ),
    ArrivingDescription: z
      .string()
      .describe(
        "Human-readable name for the arriving ferry terminal. This field shows the destination point of the ferry route and helps users identify the arrival location."
      ),
    CollectionDescription: z
      .string()
      .describe(
        "Description of how fares are collected for this terminal combination. This field provides information about the fare collection method, such as 'One-way', 'Round-trip', or specific collection instructions."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Detailed terminal combination information including terminal IDs, descriptions, and fare collection details. This schema provides comprehensive route information for fare calculations and route planning."
  );

// Reuse the fareLineItemSchema from getFareLineItems
export const fareLineItemVerboseSchema = z
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

export const lineItemLookupSchema = z
  .object({
    TerminalComboIndex: z
      .number()
      .int()
      .min(0)
      .describe(
        "Index into the TerminalComboVerbose array that identifies the specific terminal combination for this fare lookup. This field provides the reference to the route information."
      ),
    LineItemIndex: z
      .number()
      .int()
      .min(0)
      .describe(
        "Index into the LineItems array that identifies the specific fare line items for this lookup. This field provides the reference to the one-way fare information."
      ),
    RoundTripLineItemIndex: z
      .number()
      .int()
      .min(0)
      .describe(
        "Index into the RoundTripLineItems array that identifies the specific round trip fare line items for this lookup. This field provides the reference to the round trip fare information."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Line item lookup information that provides indices into the fare arrays for specific terminal combinations. This schema enables efficient fare lookup and calculation for complex fare structures."
  );

export const fareLineItemsVerboseResponseSchema = z
  .object({
    TerminalComboVerbose: z
      .array(terminalComboVerboseExtendedSchema)
      .describe(
        "Array of all valid terminal combinations for the specified trip date. This collection provides comprehensive route information for all available ferry routes."
      ),
    LineItemLookup: z
      .array(lineItemLookupSchema)
      .describe(
        "Array of line item lookup information that maps terminal combinations to their corresponding fare arrays. This collection enables efficient fare lookup and calculation."
      ),
    LineItems: z
      .array(z.array(fareLineItemVerboseSchema))
      .describe(
        "Two-dimensional array of fare line items for one-way travel. Each inner array contains the fare line items for a specific terminal combination, indexed by the LineItemIndex from the lookup."
      ),
    RoundTripLineItems: z
      .array(z.array(fareLineItemVerboseSchema))
      .describe(
        "Two-dimensional array of fare line items for round trip travel. Each inner array contains the fare line items for a specific terminal combination, indexed by the RoundTripLineItemIndex from the lookup."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Comprehensive fare information response including all terminal combinations, fare line items, and lookup indices. This schema provides complete fare data for all routes on a specific trip date, enabling comprehensive fare calculations and route planning."
  );

export type TerminalComboVerbose = z.infer<
  typeof terminalComboVerboseExtendedSchema
>;
export type FareLineItem = z.infer<typeof fareLineItemVerboseSchema>;
export type LineItemLookup = z.infer<typeof lineItemLookupSchema>;
export type FareLineItemsVerboseResponse = z.infer<
  typeof fareLineItemsVerboseResponseSchema
>;

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for getting verbose fare line items from WSF Fares API
 *
 * Retrieves all fare line items for all terminal combinations on a given trip date.
 * This endpoint provides comprehensive fare information for all available routes
 * in a single call.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result containing complex object with all fare line items for all routes
 */
export const useFareLineItemsVerbose = (
  params: { tripDate: Date },
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFareLineItemsVerbose>>>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<FareLineItemsVerboseResponse, Error> => {
  return useQuery({
    queryKey: [
      "wsf",
      "fares",
      "fareLineItemsVerbose",
      jsDateToYyyyMmDd(params.tripDate),
    ],
    queryFn: () => getFareLineItemsVerbose({ tripDate: params.tripDate }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
