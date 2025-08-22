import { z } from "zod";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { zodFetch } from "@/shared/fetching";
import { tanstackQueryOptions } from "@/shared/caching/config";
import { jsDateToYyyyMmDd } from "@/shared/fetching/parsing";

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/terminalcombo/{tripDate}/{departingTerminalID}/{arrivingTerminalID}";

/**
 * Get fare collection description for a terminal combination from WSF Fares API
 *
 * Retrieves fare collection description for a specific terminal combination on a given trip date.
 * This endpoint provides information about how fares are collected for the specified route.
 *
 * @param params - Object containing tripDate, departingTerminalID, and arrivingTerminalID parameters
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @returns Promise resolving to terminal combination information
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const terminalCombo = await getTerminalCombo({
 *   tripDate: new Date('2024-01-15'),
 *   departingTerminalID: 1,
 *   arrivingTerminalID: 2
 * });
 * console.log(terminalCombo.CollectionDescription); // "One-way"
 * ```
 */
export const getTerminalCombo = async (
  params: GetTerminalComboParams
): Promise<TerminalCombo> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalComboParamsSchema,
      output: terminalComboSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalComboParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve terminal combination information. This date must be within the valid date range returned by getFaresValidDateRange."
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
  })
  .describe(
    "Parameters for retrieving fare collection description for a specific terminal combination"
  );

export type GetTerminalComboParams = z.infer<
  typeof getTerminalComboParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const terminalComboSchema = z
  .object({
    DepartingDescription: z
      .string()
      .describe(
        "Human-readable name for the departing ferry terminal. This field shows the starting point of the ferry route and helps users identify the departure location."
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
    "Terminal combination information including departure and arrival descriptions, plus fare collection details. This schema represents route information and fare collection methods for specific terminal pairs."
  );

export type TerminalCombo = z.infer<typeof terminalComboSchema>;

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for getting terminal combo from WSF Fares API
 *
 * Retrieves fare collection description for a specific terminal combination on a given trip date.
 * This endpoint provides information about how fares are collected for the specified route.
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @param options - Optional React Query options
 * @returns React Query result containing terminal combination information
 */
export const useTerminalCombo = (
  params: {
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
  },
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getTerminalCombo>>>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TerminalCombo, Error> => {
  return useQuery({
    queryKey: [
      "wsf",
      "fares",
      "terminalCombo",
      jsDateToYyyyMmDd(params.tripDate),
      params.departingTerminalID,
      params.arrivingTerminalID,
    ],
    queryFn: () =>
      getTerminalCombo({
        tripDate: params.tripDate,
        departingTerminalID: params.departingTerminalID,
        arrivingTerminalID: params.arrivingTerminalID,
      }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
