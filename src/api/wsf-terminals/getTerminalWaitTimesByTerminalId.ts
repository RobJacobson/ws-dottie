import { z } from "zod";

import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/validation";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminalwaittimes/{terminalId}";

/**
 * API function for fetching terminal wait times for a specific terminal from WSF Terminals API
 *
 * Retrieves wait time information for a specific terminal identified by terminal ID,
 * including current wait times for all routes at the specified terminal. This endpoint
 * provides real-time information about queue lengths and wait times.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to a TerminalWaitTimes object containing wait time information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const waitTimes = await getTerminalWaitTimesByTerminalId({ terminalId: 7 });
 * console.log(waitTimes.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalWaitTimesByTerminalId = async (
  params: GetTerminalWaitTimesByTerminalIdParams
): Promise<TerminalWaitTimes> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalWaitTimesByTerminalIdParamsSchema,
      output: terminalWaitTimesSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalWaitTimesByTerminalIdParamsSchema = z
  .object({
    terminalId: z
      .number()
      .int()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
  })
  .describe(
    "Parameters for retrieving wait time information for a specific terminal by ID."
  );

export type GetTerminalWaitTimesByTerminalIdParams = z.infer<
  typeof getTerminalWaitTimesByTerminalIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const terminalWaitTimeSchema = z
  .object({
    RouteID: z.number().nullable().describe("Unique identifier for the route"),
    RouteName: z.string().nullable().describe("Name of the route"),
    WaitTimeIVRNotes: z
      .string()
      .nullable()
      .describe("Interactive voice response notes for wait times"),
    WaitTimeLastUpdated: zWsdotDate().describe(
      "Last update timestamp for wait time information"
    ),
    WaitTimeNotes: z.string().nullable().describe("Notes about wait times"),
  })
  .describe("Wait time information for a specific route at a terminal");

export const terminalWaitTimesSchema = z
  .object({
    TerminalID: z.number().describe("Unique identifier for the terminal"),
    TerminalSubjectID: z
      .number()
      .describe("Subject identifier for the terminal"),
    RegionID: z
      .number()
      .describe("Region identifier where the terminal is located"),
    TerminalName: z.string().describe("Full name of the terminal"),
    TerminalAbbrev: z
      .string()
      .describe("Abbreviated name/code for the terminal"),
    SortSeq: z.number().describe("Sorting sequence for display order"),
    WaitTimes: z
      .array(terminalWaitTimeSchema)
      .describe("Wait time information for this terminal"),
  })
  .describe("Wait time information for a single terminal");

export type TerminalWaitTimes = z.infer<typeof terminalWaitTimesSchema>;
export type TerminalWaitTime = z.infer<typeof terminalWaitTimeSchema>;
