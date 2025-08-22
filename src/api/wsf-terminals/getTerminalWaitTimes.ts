import { z } from "zod";

import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/validation";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminalwaittimes";

/**
 * API function for fetching terminal wait times from WSF Terminals API
 *
 * Retrieves wait time information for all terminals including current
 * wait times for all routes at each terminal. This endpoint provides
 * real-time information about queue lengths and wait times.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to an array of TerminalWaitTimes objects containing wait time information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const waitTimes = await getTerminalWaitTimes({});
 * console.log(waitTimes[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalWaitTimes = async (
  params: GetTerminalWaitTimesParams = {}
): Promise<TerminalWaitTimes[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalWaitTimesParamsSchema,
      output: terminalWaitTimesArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalWaitTimesParamsSchema = z
  .object({})
  .describe("No parameters required for getting all terminal wait times.");

export type GetTerminalWaitTimesParams = z.infer<
  typeof getTerminalWaitTimesParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const terminalWaitTimeSchema = z
  .object({
    RouteID: z
      .number()
      .int()
      .nullable()
      .describe(
        "Unique identifier for the route. Used to identify specific ferry routes in the WSF system."
      ),
    RouteName: z
      .string()
      .nullable()
      .describe(
        "Name of the route. Provides the human-readable name for the ferry route."
      ),
    WaitTimeIVRNotes: z
      .string()
      .nullable()
      .describe(
        "Interactive Voice Response notes for wait times. Contains automated phone system information about current wait times."
      ),
    WaitTimeLastUpdated: zWsdotDate().describe(
      "Timestamp when the wait time information was last updated. Indicates the freshness of the wait time data."
    ),
    WaitTimeNotes: z
      .string()
      .nullable()
      .describe(
        "Additional notes about wait times. Contains supplementary information about current wait time conditions."
      ),
  })
  .describe(
    "Wait time information for a specific route at a terminal. Contains current wait times and related notes for passengers."
  );

export const terminalWaitTimesSchema = z
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
    WaitTimes: z
      .array(terminalWaitTimeSchema)
      .describe(
        "Array of wait time information for all routes at this terminal. Contains current wait times for each route serving this terminal."
      ),
  })
  .describe(
    "Complete wait time information for a terminal including all routes and their current wait times. Used for planning travel and managing expectations."
  );

export const terminalWaitTimesArraySchema = z
  .array(terminalWaitTimesSchema)
  .describe(
    "Array of terminal wait time information. Contains current wait times for all routes at multiple terminals."
  );

export type TerminalWaitTimes = z.infer<typeof terminalWaitTimesSchema>;
export type TerminalWaitTime = z.infer<typeof terminalWaitTimeSchema>;
