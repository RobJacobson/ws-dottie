import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/caching";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zWsdotDate } from "@/shared/validation";

import { getCacheFlushDateTerminals } from "./getCacheFlushDateTerminals";

// ============================================================================
// API Function
//
// getTerminalBulletinsByTerminalId
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminalbulletins/{terminalId}";

/**
 * API function for fetching terminal bulletins for a specific terminal from WSF Terminals API
 *
 * Retrieves bulletin and announcement information for a specific terminal identified by terminal ID.
 * This includes important notices, alerts, and information for passengers at the specified terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to a TerminalBulletin object containing bulletin information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const bulletins = await getTerminalBulletinsByTerminalId({ terminalId: 7 });
 * console.log(bulletins.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalBulletinsByTerminalId = async (
  params: GetTerminalBulletinsByTerminalIdParams
): Promise<TerminalBulletin> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalBulletinsByTerminalIdParamsSchema,
      output: terminalBulletinSchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalBulletinsByTerminalIdParamsSchema
// GetTerminalBulletinsByTerminalIdParams
// ============================================================================

export const getTerminalBulletinsByTerminalIdParamsSchema = z
  .object({
    terminalId: z
      .number()
      .int()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
  })
  .describe(
    "Parameters for retrieving bulletin information for a specific terminal by ID."
  );

export type GetTerminalBulletinsByTerminalIdParams = z.infer<
  typeof getTerminalBulletinsByTerminalIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalBulletinItemSchema
// terminalBulletinSchema
// TerminalBulletin
// TerminalBulletinItem
// ============================================================================

export const terminalBulletinItemSchema = z
  .object({
    BulletinTitle: z
      .string()
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
    Bulletins: z
      .array(terminalBulletinItemSchema)
      .describe(
        "Array of bulletins and announcements for this terminal. Contains important information, alerts, and notices for passengers."
      ),
  })
  .describe(
    "Terminal information with associated bulletins and announcements. Provides both basic terminal details and current information for passengers."
  );

export type TerminalBulletin = z.infer<typeof terminalBulletinSchema>;
export type TerminalBulletinItem = z.infer<typeof terminalBulletinItemSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTerminalBulletinsByTerminalId
// ============================================================================

/**
 * React Query hook for fetching terminal bulletins by terminal ID
 *
 * Retrieves terminal bulletins for a specific terminal from the WSF Terminals API.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param params - Object containing terminalId
 * @param options - Optional React Query options
 * @returns Query result containing TerminalBulletin object
 */
export const useTerminalBulletinsByTerminalId = (
  params: GetTerminalBulletinsByTerminalIdParams,
  options?: TanStackOptions<TerminalBulletin>
): UseQueryResult<TerminalBulletin, Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "bulletins", params.terminalId],
    queryFn: () => getTerminalBulletinsByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
