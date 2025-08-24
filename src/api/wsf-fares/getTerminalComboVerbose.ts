import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/utils";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import { jsDateToYyyyMmDd } from "@/shared/zod/dateParsers";

import { getFaresCacheFlushDate } from "./getFaresCacheFlushDate";

// ============================================================================
// API Function
//
// getTerminalComboVerbose
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/terminalcomboverbose/{tripDate}";

/**
 * Get all terminal combinations for a trip date from WSF Fares API
 *
 * Retrieves all valid terminal combinations for a given trip date. This endpoint provides
 * comprehensive information about all available routes and their fare collection methods.
 *
 * @param params - Object containing tripDate parameter
 * @param params.tripDate - The trip date as a Date object
 * @returns Promise resolving to array of all terminal combinations
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const terminalCombos = await getTerminalComboVerbose({ tripDate: new Date('2024-01-15') });
 * console.log(terminalCombos.length); // 15
 * ```
 */
export const getTerminalComboVerbose = async (
  params: GetTerminalComboVerboseParams
): Promise<TerminalComboVerbose[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalComboVerboseParamsSchema,
      output: terminalComboVerboseArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalComboVerboseParamsSchema
// GetTerminalComboVerboseParams
// ============================================================================

export const getTerminalComboVerboseParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve all terminal combinations. This date must be within the valid date range returned by getFaresValidDateRange."
      ),
  })
  .describe(
    "Parameters for retrieving all valid terminal combinations for a specific trip date"
  );

export type GetTerminalComboVerboseParams = z.infer<
  typeof getTerminalComboVerboseParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalComboVerboseSchema
// TerminalComboVerbose
// ============================================================================

export const terminalComboVerboseSchema = z
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

export const terminalComboVerboseArraySchema = z
  .array(terminalComboVerboseSchema)
  .describe(
    "Array of all valid terminal combinations for a specific trip date. This collection provides comprehensive route information for all available ferry routes."
  );

export type TerminalComboVerbose = z.infer<typeof terminalComboVerboseSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTerminalComboVerbose
// ============================================================================

/**
 * Hook for getting terminal combo verbose from WSF Fares API
 *
 * Retrieves detailed terminal combination information for a specific route and trip date.
 * This endpoint provides comprehensive fare information for a specific terminal pair.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, roundTrip
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @param params.roundTrip - Whether this is a round trip
 * @param options - Optional React Query options
 * @returns React Query result containing detailed terminal combo information
 */
export const useTerminalComboVerbose = (
  params: {
    tripDate: Date;
  },
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getTerminalComboVerbose>>>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TerminalComboVerbose[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "fares", "terminalComboVerbose", JSON.stringify(params)],
    queryFn: () =>
      getTerminalComboVerbose({
        tripDate: params.tripDate,
      }),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};
