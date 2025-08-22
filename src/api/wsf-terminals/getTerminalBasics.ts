import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminalbasics";

/**
 * API function for fetching all terminal basics from WSF Terminals API
 *
 * Retrieves the most basic/brief information pertaining to terminals.
 * This includes location, contact details, and basic status information.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to an array of TerminalBasics objects containing basic terminal information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const terminals = await getTerminalBasics({});
 * console.log(terminals[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalBasics = async (
  params: GetTerminalBasicsParams = {}
): Promise<TerminalBasics[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalBasicsParamsSchema,
      output: terminalBasicsArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalBasicsParamsSchema = z
  .object({})
  .describe("No parameters required for getting all terminal basics.");

export type GetTerminalBasicsParams = z.infer<
  typeof getTerminalBasicsParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const terminalBasicsSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
    TerminalSubjectID: z
      .number()
      .int()
      .describe(
        "Subject identifier for the terminal. Used for grouping related terminal information and maintaining data relationships."
      ),
    RegionID: z
      .number()
      .int()
      .describe(
        "Identifier for the geographic region where the terminal is located. Used for organizing terminals by area."
      ),
    TerminalName: z
      .string()
      .describe(
        "Full name of the terminal. Provides the complete, human-readable name for the ferry terminal."
      ),
    TerminalAbbrev: z
      .string()
      .describe(
        "Abbreviated name for the terminal. Used for display in space-constrained interfaces and quick identification."
      ),
    SortSeq: z
      .number()
      .int()
      .describe(
        "Sort sequence number for the terminal. Used to determine the display order of terminals in lists and menus."
      ),
    OverheadPassengerLoading: z
      .boolean()
      .describe(
        "Indicates whether the terminal supports overhead passenger loading. True if passengers can board from an elevated platform."
      ),
    Elevator: z
      .boolean()
      .describe(
        "Indicates whether the terminal has elevator access. True if passengers with mobility needs can access the terminal via elevator."
      ),
    WaitingRoom: z
      .boolean()
      .describe(
        "Indicates whether the terminal has a waiting room. True if passengers can wait indoors before boarding."
      ),
    FoodService: z
      .boolean()
      .describe(
        "Indicates whether the terminal offers food service. True if food and beverages are available for purchase."
      ),
    Restroom: z
      .boolean()
      .describe(
        "Indicates whether the terminal has restroom facilities. True if public restrooms are available for passengers."
      ),
  })
  .describe(
    "Basic terminal information including core details like name, location, and basic amenities. Used for quick terminal identification and basic facility information."
  );

export const terminalBasicsArraySchema = z.array(terminalBasicsSchema);

export type TerminalBasics = z.infer<typeof terminalBasicsSchema>;

// ============================================================================
// REACT QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching all terminal basics
 *
 * Retrieves the most basic/brief information pertaining to terminals.
 * This includes location, contact details, and basic status information.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param options - Optional React Query options
 * @returns Query result containing array of TerminalBasics objects
 *
 * @example
 * ```typescript
 * const { data: terminals } = useTerminalBasics();
 * console.log(terminals?.[0]?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalBasics = (
  options?: TanStackOptions<TerminalBasics[]>
): UseQueryResult<TerminalBasics[], Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "basics"],
    queryFn: () => getTerminalBasics(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
