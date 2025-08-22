import { z } from "zod";

import { zodFetch } from "@/shared/fetching";

// Import schemas from the single-item endpoint
import {
  type TerminalBulletin,
  type TerminalBulletinItem,
  terminalBulletinSchema,
} from "./getTerminalBulletinsByTerminalId";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminalbulletins";

/**
 * API function for fetching all terminal bulletins from WSF Terminals API
 *
 * Retrieves bulletin and announcement information for all terminals.
 * This includes important notices, alerts, and information for passengers
 * at each terminal.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to an array of TerminalBulletin objects containing bulletin information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const bulletins = await getTerminalBulletins({});
 * console.log(bulletins[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalBulletins = async (
  params: GetTerminalBulletinsParams = {}
): Promise<TerminalBulletin[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalBulletinsParamsSchema,
      output: terminalBulletinArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalBulletinsParamsSchema = z
  .object({})
  .describe("No parameters required for getting all terminal bulletins.");

export type GetTerminalBulletinsParams = z.infer<
  typeof getTerminalBulletinsParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Create array schema from the imported single-item schema
export const terminalBulletinArraySchema = z.array(terminalBulletinSchema);

// Re-export types from the single-item endpoint for consistency
export type { TerminalBulletin, TerminalBulletinItem };
