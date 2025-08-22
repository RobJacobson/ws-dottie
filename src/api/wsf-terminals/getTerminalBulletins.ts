import { z } from "zod";

import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/validation";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminalbulletins";

/**
 * API function for fetching terminal bulletins from WSF Terminals API
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

export const terminalBulletinItemSchema = z
  .object({
    BulletinTitle: z
      .string()
      .min(1)
      .describe(
        "Title of the bulletin or announcement. Provides a brief, descriptive heading for the bulletin content."
      ),
    BulletinText: z
      .string()
      .describe(
        "Full text content of the bulletin or announcement. Contains the complete message or information being communicated to passengers."
      ),
    BulletinSortSeq: z
      .number()
      .int()
      .describe(
        "Sort sequence for the bulletin. Used to determine the display order of multiple bulletins at a terminal."
      ),
    BulletinLastUpdated: zWsdotDate()
      .optional()
      .describe(
        "Timestamp when the bulletin was last updated. Indicates when the information was most recently modified."
      ),
    BulletinLastUpdatedSortable: z
      .string()
      .optional()
      .describe(
        "Sortable string representation of the last update timestamp. Used for chronological sorting of bulletins."
      ),
  })
  .describe(
    "Individual bulletin or announcement item displayed at a terminal. Contains important information, alerts, or notices for passengers."
  );

export const terminalBulletinSchema = z
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
    Bulletins: z
      .array(terminalBulletinItemSchema)
      .describe(
        "Array of bulletins and announcements for this terminal. Contains important information, alerts, and notices for passengers."
      ),
  })
  .describe(
    "Terminal information with associated bulletins and announcements. Provides both basic terminal details and current information for passengers."
  );

export const terminalBulletinArraySchema = z.array(terminalBulletinSchema);

export type TerminalBulletin = z.infer<typeof terminalBulletinSchema>;
export type TerminalBulletinItem = z.infer<typeof terminalBulletinItemSchema>;
