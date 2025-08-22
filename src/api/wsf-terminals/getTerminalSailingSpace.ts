import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zWsdotDate } from "@/shared/validation";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminalsailingspace";

/**
 * API function for fetching terminal sailing space from WSF Terminals API
 *
 * Retrieves sailing space availability information for all terminals.
 * This includes scheduled departures and space availability details
 * for each terminal.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to an array of TerminalSailingSpace objects containing sailing space information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const sailingSpaces = await getTerminalSailingSpace({});
 * console.log(sailingSpaces[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalSailingSpace = async (
  params: GetTerminalSailingSpaceParams = {}
): Promise<TerminalSailingSpace[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalSailingSpaceParamsSchema,
      output: terminalSailingSpaceArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalSailingSpaceParamsSchema = z
  .object({})
  .describe("No parameters required for getting all terminal sailing space.");

export type GetTerminalSailingSpaceParams = z.infer<
  typeof getTerminalSailingSpaceParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const terminalArrivalSpaceSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
    TerminalName: z
      .string()
      .min(1)
      .describe(
        "Full name of the terminal. Provides the complete, human-readable name for the ferry terminal."
      ),
    VesselID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the vessel. Used to identify specific ferries in the WSF fleet."
      ),
    VesselName: z
      .string()
      .min(1)
      .describe(
        "Name of the vessel. Provides the human-readable name for the ferry."
      ),
    DisplayReservableSpace: z
      .boolean()
      .describe(
        "Indicates whether reservable space information should be displayed. True if reservations are available for this route."
      ),
    ReservableSpaceCount: z
      .number()
      .int()
      .min(0)
      .nullable()
      .describe(
        "Number of reservable spaces available. Indicates how many vehicles can make reservations for this sailing."
      ),
    ReservableSpaceHexColor: z
      .string()
      .nullable()
      .describe(
        "Hex color code for displaying reservable space status. Used for visual indicators of space availability."
      ),
    DisplayDriveUpSpace: z
      .boolean()
      .describe(
        "Indicates whether drive-up space information should be displayed. True if drive-up spaces are available."
      ),
    DriveUpSpaceCount: z
      .number()
      .int()
      .describe(
        "Number of drive-up spaces available. Indicates how many vehicles can board without reservations. Negative values may indicate special conditions or unlimited availability."
      ),
    DriveUpSpaceHexColor: z
      .string()
      .describe(
        "Hex color code for displaying drive-up space status. Used for visual indicators of space availability."
      ),
    MaxSpaceCount: z
      .number()
      .int()
      .positive()
      .describe(
        "Maximum number of vehicle spaces on the vessel. Indicates the total capacity for vehicles on this sailing."
      ),
    ArrivalTerminalIDs: z
      .array(z.number().int().positive())
      .describe(
        "Array of terminal IDs where this vessel will arrive. Used to track the vessel's route and destinations."
      ),
  })
  .describe(
    "Space availability information for a specific vessel arriving at a terminal. Contains details about reservable and drive-up spaces."
  );

export const terminalDepartingSpaceSchema = z
  .object({
    Departure: zWsdotDate().describe(
      "Scheduled departure time for the sailing. Indicates when the vessel is scheduled to leave the terminal."
    ),
    IsCancelled: z
      .boolean()
      .describe(
        "Indicates whether the sailing has been cancelled. True if the scheduled sailing will not operate."
      ),
    VesselID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the vessel. Used to identify specific ferries in the WSF fleet."
      ),
    VesselName: z
      .string()
      .min(1)
      .describe(
        "Name of the vessel. Provides the human-readable name for the ferry."
      ),
    MaxSpaceCount: z
      .number()
      .int()
      .positive()
      .describe(
        "Maximum number of vehicle spaces on the vessel. Indicates the total capacity for vehicles on this sailing."
      ),
    SpaceForArrivalTerminals: z
      .array(terminalArrivalSpaceSchema)
      .describe(
        "Space availability information for each arrival terminal. Contains details about reservable and drive-up spaces for each destination."
      ),
  })
  .describe(
    "Departing sailing information with space availability details. Contains departure time, vessel information, and space availability for all destinations."
  );

export const terminalSailingSpaceSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
    TerminalSubjectID: z
      .number()
      .int()
      .positive()
      .describe(
        "Subject identifier for the terminal. Used for grouping related terminal information and maintaining data relationships."
      ),
    RegionID: z
      .number()
      .int()
      .positive()
      .describe(
        "Identifier for the geographic region where the terminal is located. Used for organizing terminals by area."
      ),
    TerminalName: z
      .string()
      .min(1)
      .describe(
        "Full name of the terminal. Provides the complete, human-readable name for the ferry terminal."
      ),
    TerminalAbbrev: z
      .string()
      .min(1)
      .describe(
        "Abbreviated name for the terminal. Used for display in space-constrained interfaces and quick identification."
      ),
    SortSeq: z
      .number()
      .int()
      .describe(
        "Sort sequence number for the terminal. Used to determine the display order of terminals in lists and menus."
      ),
    DepartingSpaces: z
      .array(terminalDepartingSpaceSchema)
      .describe(
        "Array of departing sailings with space availability information. Contains all scheduled departures and their space details."
      ),
    IsNoFareCollected: z
      .boolean()
      .nullable()
      .describe(
        "Indicates whether fares are collected at this terminal. True if no fare collection occurs at this location."
      ),
    NoFareCollectedMsg: z
      .string()
      .nullable()
      .describe(
        "Message explaining why no fare is collected. Provides information about fare collection policies at this terminal."
      ),
  })
  .describe(
    "Complete sailing space information for a terminal including all departing sailings and their space availability details."
  );

export const terminalSailingSpaceArraySchema = z
  .array(terminalSailingSpaceSchema)
  .describe(
    "Array of terminal sailing space information. Contains complete sailing schedules and space availability for multiple terminals."
  );

export type TerminalSailingSpace = z.infer<typeof terminalSailingSpaceSchema>;
export type TerminalDepartingSpace = z.infer<
  typeof terminalDepartingSpaceSchema
>;
export type TerminalArrivalSpace = z.infer<typeof terminalArrivalSpaceSchema>;

// ============================================================================
// REACT QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching all terminal sailing space information
 *
 * Retrieves sailing space availability information for all terminals including
 * departure times, vessel information, and space counts.
 *
 * @param options - Optional React Query options
 * @returns Query result containing array of TerminalSailingSpace objects
 */
export const useTerminalSailingSpace = (
  options?: TanStackOptions<TerminalSailingSpace[]>
): UseQueryResult<TerminalSailingSpace[], Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "sailingSpace"],
    queryFn: () => getTerminalSailingSpace(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
