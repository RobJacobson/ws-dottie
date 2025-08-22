import { z } from "zod";

import { zodFetch } from "@/shared/fetching";

// Import schemas from the single-item endpoint
import {
  type TerminalWaitTime,
  type TerminalWaitTimes,
  terminalWaitTimesSchema,
} from "./getTerminalWaitTimesByTerminalId";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminalwaittimes";

/**
 * API function for fetching all terminal wait times from WSF Terminals API
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

// Create array schema from the imported single-item schema
export const terminalWaitTimesArraySchema = z.array(terminalWaitTimesSchema);

// Re-export types from the single-item endpoint for consistency
export type { TerminalWaitTimes, TerminalWaitTime };
