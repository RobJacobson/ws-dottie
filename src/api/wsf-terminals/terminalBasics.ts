/**
 * Terminal Basics API
 *
 * Provides basic information about Washington State Ferries terminals including amenities, facilities, and operational details.
 * This API returns data about terminal infrastructure such as overhead passenger loading, elevators, waiting rooms,
 * food services, and restrooms. The data is useful for passengers planning their journey and understanding what
 * facilities are available at specific terminals.
 *
 * API Functions:
 * - getTerminalBasicsByTerminalId: Returns one TerminalBasics object for the specified TerminalID
 * - getTerminalBasics: Returns an array of TerminalBasics objects for all terminals
 *
 * Input/Output Overview:
 * - getTerminalBasicsByTerminalId: Input: { terminalId: number }, Output: TerminalBasics
 * - getTerminalBasics: Input: none, Output: TerminalBasics[]
 *
 * Base Type: TerminalBasics
 *
 * interface TerminalBasics {
 *   TerminalID: number;
 *   TerminalSubjectID: number;
 *   RegionID: number;
 *   TerminalName: string;
 *   TerminalAbbrev: string;
 *   SortSeq: number;
 *   OverheadPassengerLoading: boolean;
 *   Elevator: boolean;
 *   WaitingRoom: boolean;
 *   FoodService: boolean;
 *   Restroom: boolean;
 * }
 *
 * Note: Only includes fields that are officially documented in the WSF Terminals API specification.
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/terminals/rest/terminalbasics/7?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * {
 *   "TerminalID": 7,
 *   "TerminalSubjectID": 101,
 *   "RegionID": 4,
 *   "TerminalName": "Seattle",
 *   "TerminalAbbrev": "P52",
 *   "SortSeq": 20,
 *   "OverheadPassengerLoading": true,
 *   "Elevator": true,
 *   "WaitingRoom": true,
 *   "FoodService": true,
 *   "Restroom": true
 * }
 * ```
 */

import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import { getCacheFlushDateTerminals } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getTerminalBasicsByTerminalId (singular item)
// getTerminalBasics (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalbasics/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalbasics";

/**
 * Retrieves basic terminal information for a specific terminal by its ID.
 *
 * @param params - Parameters object for terminal basics query
 * @param params.terminalId - Unique terminal identifier (positive integer)
 * @returns Promise<TerminalBasics> - Basic terminal information including amenities and facilities
 *
 * @example
 * const terminalBasics = await getTerminalBasicsByTerminalId({ terminalId: 7 });
 * console.log(terminalBasics.TerminalName);  // "Seattle"
 * console.log(terminalBasics.Elevator);  // true
 * console.log(terminalBasics.FoodService);  // true
 *
 * @throws {Error} When terminal ID is invalid or API is unavailable
 */
export const getTerminalBasicsByTerminalId = async (
  params: GetTerminalBasicsByTerminalIdParams
): Promise<TerminalBasics> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getTerminalBasicsByTerminalIdParamsSchema,
      output: terminalBasicsSchema,
    },
    params
  );
};

/**
 * Retrieves basic terminal information for all terminals.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<TerminalBasics[]> - Array of basic terminal information for all terminals
 *
 * @example
 * const terminalBasics = await getTerminalBasics();
 * console.log(terminalBasics.length);  // 25
 *
 * @throws {Error} When API is unavailable
 */
export const getTerminalBasics = async (
  params: GetTerminalBasicsParams = {}
): Promise<TerminalBasics[]> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getTerminalBasicsParamsSchema,
      output: terminalBasicsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalBasicsByTerminalIdParamsSchema
// getTerminalBasicsParamsSchema
// GetTerminalBasicsByTerminalIdParams
// GetTerminalBasicsParams
// ============================================================================

/**
 * Parameters for retrieving basic terminal information for a specific terminal
 */
export const getTerminalBasicsByTerminalIdParamsSchema = z
  .object({
    terminalId: z.number().int().describe(""),
  })
  .describe("");

/**
 * Parameters for retrieving all terminal basics (no parameters required)
 */
export const getTerminalBasicsParamsSchema = z.object({}).describe("");

export type GetTerminalBasicsByTerminalIdParams = z.infer<
  typeof getTerminalBasicsByTerminalIdParamsSchema
>;
export type GetTerminalBasicsParams = z.infer<
  typeof getTerminalBasicsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalBasicsSchema
// terminalBasicsArraySchema
// TerminalBasics
// ============================================================================

/**
 * Terminal basics data schema - includes terminal identification, amenities, and facility information
 */
export const terminalBasicsSchema = z
  .object({
    TerminalID: z.number().describe(""),
    TerminalSubjectID: z.number().describe(""),
    RegionID: z.number().describe(""),
    TerminalName: z.string().describe(""),
    TerminalAbbrev: z.string().describe(""),
    SortSeq: z.number().describe(""),
    OverheadPassengerLoading: z.boolean().describe(""),
    Elevator: z.boolean().describe(""),
    WaitingRoom: z.boolean().describe(""),
    FoodService: z.boolean().describe(""),
    Restroom: z.boolean().describe(""),
  })
  .describe("");

/**
 * TerminalBasics type - represents basic terminal information including amenities and facilities
 */
export type TerminalBasics = z.infer<typeof terminalBasicsSchema>;

/**
 * Array of terminal basics objects - wrapper around terminalBasicsSchema
 */
export const terminalBasicsArraySchema = z.array(terminalBasicsSchema);

// ============================================================================
// TanStack Query Hooks
//
// useTerminalBasicsByTerminalId (singular item)
// useTerminalBasics (array)
// ============================================================================

/**
 * TanStack Query hook for terminal basics data with automatic updates (single item).
 *
 * @param params - Parameters object for terminal basics query
 * @param params.terminalId - Unique terminal identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TerminalBasics, Error> - Query result with terminal basics data
 *
 * @example
 * const { data: terminalBasics, isLoading } = useTerminalBasicsByTerminalId({ terminalId: 7 });
 * if (terminalBasics) {
 *   console.log(terminalBasics.TerminalName);  // "Seattle"
 *   console.log(terminalBasics.Elevator);  // true
 * }
 */
export const useTerminalBasicsByTerminalId = (
  params: GetTerminalBasicsByTerminalIdParams,
  options?: TanStackOptions<TerminalBasics>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "basics", JSON.stringify(params)],
    queryFn: () => getTerminalBasicsByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};

/**
 * TanStack Query hook for all terminal basics data with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TerminalBasics[], Error> - Query result with array of terminal basics data
 *
 * @example
 * const { data: terminalBasics, isLoading } = useTerminalBasics();
 * if (terminalBasics) {
 *   console.log(terminalBasics.length);  // 25
 * }
 */
export const useTerminalBasics = (
  options?: TanStackOptions<TerminalBasics[]>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "basics"],
    queryFn: getTerminalBasics,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
