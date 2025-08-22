import { z } from "zod";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { zodFetch } from "@/shared/fetching";
import { tanstackQueryOptions } from "@/shared/caching/config";
import { jsDateToYyyyMmDd } from "@/shared/fetching/parsing";

// ============================================================================
// API FUNCTION
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
// INPUT SCHEMA & TYPES
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
// OUTPUT SCHEMA & TYPES
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
// QUERY
// ============================================================================

/**
 * Hook for getting terminal combo verbose from WSF Fares API
 *
 * Retrieves all valid terminal combinations for a given trip date. This endpoint provides
 * comprehensive information about all available routes and their fare collection methods.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result containing array of all terminal combinations
 */
export const useTerminalComboVerbose = (
  params: { tripDate: Date },
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getTerminalComboVerbose>>>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TerminalComboVerbose[], Error> => {
  return useQuery({
    queryKey: [
      "wsf",
      "fares",
      "terminalComboVerbose",
      jsDateToYyyyMmDd(params.tripDate),
    ],
    queryFn: () => getTerminalComboVerbose({ tripDate: params.tripDate }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
