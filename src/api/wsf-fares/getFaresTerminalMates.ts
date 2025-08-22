import { z } from "zod";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { zodFetch } from "@/shared/fetching";
import { tanstackQueryOptions } from "@/shared/caching/config";
import { jsDateToYyyyMmDd } from "@/shared/fetching/parsing";

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/terminalmates/{tripDate}/{terminalID}";

/**
 * Get arriving terminals for a departing terminal and trip date from WSF Fares API
 *
 * Provides arriving terminals for a given departing terminal and trip date. A valid departing
 * terminal may be found by using terminals. Similarly, a valid trip date may be determined
 * using validDateRange.
 *
 * @param params - Object containing tripDate and terminalID parameters
 * @param params.tripDate - The trip date as a Date object
 * @param params.terminalID - The unique identifier for the departing terminal
 * @returns Promise resolving to array of arriving terminals
 * @throws {Error} When the API request fails or validation fails
 */
export const getFaresTerminalMates = async (
  params: GetFaresTerminalMatesParams
): Promise<TerminalMate[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getFaresTerminalMatesParamsSchema,
      output: terminalMatesArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getFaresTerminalMatesParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve arriving terminals. This date must be within the valid date range returned by getFaresValidDateRange."
      ),
    terminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "The unique identifier for the departing terminal. This ID can be obtained from the getFaresTerminals endpoint."
      ),
  })
  .describe(
    "Parameters for retrieving arriving terminals for a specific departing terminal and trip date"
  );

export type GetFaresTerminalMatesParams = z.infer<
  typeof getFaresTerminalMatesParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const terminalMateSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier assigned to this ferry terminal by the WSF system. This ID serves as a permanent, unique reference for the terminal across all WSF systems and can be used for tracking, reporting, and data correlation purposes."
      ),
    Description: z
      .string()
      .describe(
        "Human-readable name for the ferry terminal that provides quick identification. Examples include 'Anacortes', 'Friday Harbor', 'Orcas Island', 'Lopez Island', 'Shaw Island', 'San Juan Island', 'Sidney BC', or 'Victoria BC'. This field is the primary display name used in applications."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Terminal mate information for arriving terminals. This schema extends the basic terminal schema to represent destinations that can be reached from a specific departing terminal."
  );

export const terminalMatesArraySchema = z
  .array(terminalMateSchema)
  .describe(
    "Array of valid arriving terminals for a specific departing terminal and trip date. This collection provides all available destinations for a given departure point."
  );

export type TerminalMate = z.infer<typeof terminalMateSchema>;

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for getting terminal mates from WSF Fares API
 *
 * Provides arriving terminals for a given departing terminal and trip date. A valid departing
 * terminal may be found by using terminals. Similarly, a valid trip date may be determined
 * using validDateRange.
 *
 * @param params - Object containing tripDate and terminalID
 * @param params.tripDate - The trip date as a Date object
 * @param params.terminalID - The unique identifier for the departing terminal
 * @param options - Optional React Query options
 * @returns React Query result containing array of arriving terminals
 */
export const useFaresTerminalMates = (
  params: { tripDate: Date; terminalID: number },
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFaresTerminalMates>>>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TerminalMate[], Error> => {
  return useQuery({
    queryKey: [
      "wsf",
      "fares",
      "terminalMates",
      jsDateToYyyyMmDd(params.tripDate),
      params.terminalID,
    ],
    queryFn: () =>
      getFaresTerminalMates({
        tripDate: params.tripDate,
        terminalID: params.terminalID,
      }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
