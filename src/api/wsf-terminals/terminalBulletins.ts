/**
 * Terminal Bulletins API
 *
 * Provides alerts and bulletins associated with Washington State Ferries terminals. This API returns
 * important service updates, construction notices, ADA alerts, schedule changes, and other operational
 * information for each terminal. Each terminal may have zero or more bulletins assigned to it, providing
 * real-time updates about conditions that may affect passenger travel.
 *
 * API Functions:
 * - getTerminalBulletinsByTerminalId: Returns one TerminalBulletin object for the specified TerminalID
 * - getTerminalBulletins: Returns an array of TerminalBulletin objects for all terminals
 *
 * Input/Output Overview:
 * - getTerminalBulletinsByTerminalId: Input: { terminalId: number }, Output: TerminalBulletin
 * - getTerminalBulletins: Input: none, Output: TerminalBulletin[]
 *
 * Base Type: TerminalBulletin
 *
 * interface TerminalBulletin {
 *   TerminalID: number;
 *   TerminalSubjectID: number;
 *   RegionID: number;
 *   TerminalName: string;
 *   TerminalAbbrev: string;
 *   SortSeq: number;
 *   Bulletins: TerminalBulletinItem[];
 * }
 *
 * interface TerminalBulletinItem {
 *   BulletinTitle: string;
 *   BulletinText: string;
 *   BulletinSortSeq: number;
 *   BulletinLastUpdated: Date | null;
 *   BulletinLastUpdatedSortable: string | null;
 * }
 *
 * Note: Only includes fields that are officially documented in the WSF Terminals API specification.
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/terminals/rest/terminalbulletins?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "TerminalID": 1,
 *     "TerminalSubjectID": 111,
 *     "RegionID": 1,
 *     "TerminalName": "Anacortes",
 *     "TerminalAbbrev": "ANA",
 *     "SortSeq": 10,
 *     "Bulletins": [
 *       {
 *         "BulletinTitle": "Ana/SJs - Anacortes 9:25 pm delayed one hour tonight for vessel maintenance",
 *         "BulletinText": "<p>Tonight, August 26, we need to take the #3 Chelan out of service early to complete vessel maintenance...</p>",
 *         "BulletinSortSeq": 1,
 *         "BulletinLastUpdated": "/Date(1756235285903-0700)/",
 *         "BulletinLastUpdatedSortable": "20250826120805"
 *       }
 *     ]
 *   }
 * ]
 * ```
 */

import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateTerminals } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getTerminalBulletinsByTerminalId (singular item)
// getTerminalBulletins (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalbulletins/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalbulletins";

/**
 * Retrieves bulletins and alerts for a specific terminal by its ID.
 *
 * @param params - Parameters object for terminal bulletins query
 * @param params.terminalId - Unique terminal identifier (positive integer)
 * @returns Promise<TerminalBulletin> - Terminal information with associated bulletins and alerts
 *
 * @example
 * const terminalBulletins = await getTerminalBulletinsByTerminalId({ terminalId: 1 });
 * console.log(terminalBulletins.TerminalName);  // "Anacortes"
 * console.log(terminalBulletins.Bulletins.length);  // 3
 *
 * @throws {Error} When terminal ID is invalid or API is unavailable
 */
export const getTerminalBulletinsByTerminalId = async (
  params: GetTerminalBulletinsByTerminalIdParams
): Promise<TerminalBulletin> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getTerminalBulletinsByTerminalIdParamsSchema,
      output: terminalBulletinSchema,
    },
    params
  );
};

/**
 * Retrieves bulletins and alerts for all terminals.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<TerminalBulletin[]> - Array of terminal information with associated bulletins and alerts
 *
 * @example
 * const terminalBulletins = await getTerminalBulletins();
 * console.log(terminalBulletins.length);  // 25
 *
 * @throws {Error} When API is unavailable
 */
export const getTerminalBulletins = async (
  params: GetTerminalBulletinsParams = {}
): Promise<TerminalBulletin[]> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getTerminalBulletinsParamsSchema,
      output: terminalBulletinsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalBulletinsByTerminalIdParamsSchema
// getTerminalBulletinsParamsSchema
// GetTerminalBulletinsByTerminalIdParams
// GetTerminalBulletinsParams
// ============================================================================

/**
 * Parameters for retrieving bulletins and alerts for a specific terminal
 */
export const getTerminalBulletinsByTerminalIdParamsSchema = z
  .object({
    terminalId: z.number().int().describe(""),
  })
  .describe("");

/**
 * Parameters for retrieving all terminal bulletins (no parameters required)
 */
export const getTerminalBulletinsParamsSchema = z.object({}).describe("");

export type GetTerminalBulletinsByTerminalIdParams = z.infer<
  typeof getTerminalBulletinsByTerminalIdParamsSchema
>;
export type GetTerminalBulletinsParams = z.infer<
  typeof getTerminalBulletinsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalBulletinItemSchema
// terminalBulletinSchema
// terminalBulletinsArraySchema
// TerminalBulletin
// TerminalBulletinItem
// ============================================================================

/**
 * Individual bulletin item schema - includes title, text content, and update information
 */
export const terminalBulletinItemSchema = z
  .object({
    BulletinTitle: z.string().describe(""),
    BulletinText: z.string().describe(""),
    BulletinSortSeq: z.number().int().describe(""),
    BulletinLastUpdated: zWsdotDate().optional().describe(""),
    BulletinLastUpdatedSortable: z.string().optional().describe(""),
  })
  .describe("");

/**
 * Terminal bulletin data schema - includes terminal information and associated bulletins array
 */
export const terminalBulletinSchema = z
  .object({
    TerminalID: z.number().int().describe(""),
    TerminalSubjectID: z.number().int().describe(""),
    RegionID: z.number().int().describe(""),
    TerminalName: z.string().describe(""),
    TerminalAbbrev: z.string().describe(""),
    SortSeq: z.number().int().describe(""),
    Bulletins: z.array(terminalBulletinItemSchema).describe(""),
  })
  .describe("");

/**
 * TerminalBulletin type - represents terminal information with associated bulletins and alerts
 */
export type TerminalBulletin = z.infer<typeof terminalBulletinSchema>;

/**
 * TerminalBulletinItem type - represents individual bulletin items with title, content, and metadata
 */
export type TerminalBulletinItem = z.infer<typeof terminalBulletinItemSchema>;

/**
 * Array of terminal bulletin objects - wrapper around terminalBulletinSchema
 */
export const terminalBulletinsArraySchema = z.array(terminalBulletinSchema);

// ============================================================================
// TanStack Query Hooks
//
// useTerminalBulletinsByTerminalId (singular item)
// useTerminalBulletins (array)
// ============================================================================

/**
 * TanStack Query hook for terminal bulletins data with automatic updates (single item).
 *
 * @param params - Parameters object for terminal bulletins query
 * @param params.terminalId - Unique terminal identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TerminalBulletin, Error> - Query result with terminal bulletins data
 *
 * @example
 * const { data: terminalBulletins, isLoading } = useTerminalBulletinsByTerminalId({ terminalId: 1 });
 * if (terminalBulletins) {
 *   console.log(terminalBulletins.TerminalName);  // "Anacortes"
 *   console.log(terminalBulletins.Bulletins.length);  // 3
 * }
 */
export const useTerminalBulletinsByTerminalId = (
  params: GetTerminalBulletinsByTerminalIdParams,
  options?: TanStackOptions<TerminalBulletin>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "bulletins", params.terminalId],
    queryFn: () => getTerminalBulletinsByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

/**
 * TanStack Query hook for all terminal bulletins data with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TerminalBulletin[], Error> - Query result with array of terminal bulletins data
 *
 * @example
 * const { data: terminalBulletins, isLoading } = useTerminalBulletins();
 * if (terminalBulletins) {
 *   console.log(terminalBulletins.length);  // 25
 * }
 */
export const useTerminalBulletins = (
  options?: TanStackOptions<TerminalBulletin[]>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "bulletins"],
    queryFn: getTerminalBulletins,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
