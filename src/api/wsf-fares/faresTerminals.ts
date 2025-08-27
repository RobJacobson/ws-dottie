/**
 * WSF Fares API - Terminals and Terminal Mates
 *
 * Provides access to Washington State Ferries terminal information for fare queries.
 * This API returns valid departing terminals and their corresponding arriving terminals
 * (terminal mates) for specific trip dates, enabling applications to build proper
 * route selection interfaces.
 *
 * The terminals endpoint returns all valid departing terminals for a given date,
 * while the terminal mates endpoint returns the valid arriving terminals that can
 * be reached from a specific departing terminal. This information is essential for
 * constructing valid fare queries and providing users with appropriate route options.
 *
 * API Functions:
 * - getFaresTerminals: Returns valid departing terminals for a specific trip date
 * - getFaresTerminalMates: Returns valid arriving terminals for a specific departing terminal and date
 *
 * Input/Output Overview:
 * - getFaresTerminals: Input: { tripDate: Date }, Output: FaresTerminal[]
 * - getFaresTerminalMates: Input: { tripDate: Date, terminalID: number }, Output: TerminalMate[]
 *
 * Base Types: FaresTerminal, TerminalMate
 *
 * interface FaresTerminal {
 *   TerminalID: number;
 *   Description: string;
 * }
 *
 * interface TerminalMate {
 *   TerminalID: number;
 *   Description: string;
 * }
 *
 * Example Usage:
 *
 * # Get valid departing terminals
 * curl -s "https://www.wsdot.wa.gov/ferries/api/fares/rest/terminals/2025-08-26?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * # Get terminal mates for Seattle (TerminalID: 7)
 * curl -s "https://www.wsdot.wa.gov/ferries/api/fares/rest/terminalmates/2025-08-26/7?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from the terminals endpoint:
 *
 * ```json
 * [
 *   {"TerminalID": 1, "Description": "Anacortes"},
 *   {"TerminalID": 3, "Description": "Bainbridge Island"},
 *   {"TerminalID": 4, "Description": "Bremerton"},
 *   {"TerminalID": 7, "Description": "Seattle"},
 *   {"TerminalID": 8, "Description": "Edmonds"}
 * ]
 * ```
 *
 * Here is example output from the terminal mates endpoint:
 *
 * ```json
 * [
 *   {"TerminalID": 3, "Description": "Bainbridge Island"},
 *   {"TerminalID": 4, "Description": "Bremerton"}
 * ]
 * ```
 *
 * Note: Terminal IDs are consistent across the WSF system and can be used
 * in other API endpoints. The Description field provides human-readable
 * terminal names for user interfaces.
 */

import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import { jsDateToYyyyMmDd } from "@/shared/fetching/zod/dateParsers";

import { getFaresCacheFlushDate } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getFaresTerminals (valid departing terminals)
// getFaresTerminalMates (arriving terminals for a departing terminal)
// ============================================================================

const ENDPOINT_TERMINALS = "/ferries/api/fares/rest/terminals/{tripDate}";
const ENDPOINT_TERMINAL_MATES =
  "/ferries/api/fares/rest/terminalmates/{tripDate}/{terminalID}";

/**
 * Retrieves valid departing terminals for a specific trip date.
 *
 * This endpoint returns all terminals that can serve as departure points for
 * fare queries on the specified date. Applications should use this information
 * to populate departure terminal selection interfaces and validate user input.
 *
 * @param params - Parameters object for terminals query
 * @param params.tripDate - Trip date (must be within valid date range)
 * @returns Promise<FaresTerminal[]> - Array of valid departing terminals with IDs and descriptions
 *
 * @example
 * const terminals = await getFaresTerminals({ tripDate: new Date('2025-08-26') });
 * console.log(terminals.length);  // 19
 * console.log(terminals[0].Description);  // "Anacortes"
 * console.log(terminals[0].TerminalID);  // 1
 *
 * @throws {Error} When API is unavailable, invalid date, or authentication fails
 */
export const getFaresTerminals = async (
  params: GetFaresTerminalsParams
): Promise<FaresTerminal[]> => {
  return zodFetch(
    ENDPOINT_TERMINALS,
    {
      input: getFaresTerminalsParamsSchema,
      output: faresTerminalsArraySchema,
    },
    params
  );
};

/**
 * Retrieves valid arriving terminals (terminal mates) for a specific departing terminal and date.
 *
 * This endpoint returns all terminals that can be reached from the specified
 * departing terminal on the given date. This information is essential for
 * building route selection interfaces and ensuring valid fare queries.
 *
 * @param params - Parameters object for terminal mates query
 * @param params.tripDate - Trip date (must be within valid date range)
 * @param params.terminalID - Unique identifier for the departing terminal
 * @returns Promise<TerminalMate[]> - Array of valid arriving terminals with IDs and descriptions
 *
 * @example
 * const terminalMates = await getFaresTerminalMates({
 *   tripDate: new Date('2025-08-26'),
 *   terminalID: 7 // Seattle
 * });
 * console.log(terminalMates.length);  // 2
 * console.log(terminalMates[0].Description);  // "Bainbridge Island"
 * console.log(terminalMates[0].TerminalID);  // 3
 *
 * @throws {Error} When API is unavailable, invalid parameters, or authentication fails
 */
export const getFaresTerminalMates = async (
  params: GetFaresTerminalMatesParams
): Promise<TerminalMate[]> => {
  return zodFetch(
    ENDPOINT_TERMINAL_MATES,
    {
      input: getFaresTerminalMatesParamsSchema,
      output: terminalMatesArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getFaresTerminalsParamsSchema
// GetFaresTerminalsParams
// getFaresTerminalMatesParamsSchema
// GetFaresTerminalMatesParams
// ============================================================================

/**
 * Parameters for retrieving valid departing terminals
 */
export const getFaresTerminalsParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
  })
  .describe("");

export type GetFaresTerminalsParams = z.infer<
  typeof getFaresTerminalsParamsSchema
>;

/**
 * Parameters for retrieving terminal mates (arriving terminals)
 */
export const getFaresTerminalMatesParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    terminalID: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetFaresTerminalMatesParams = z.infer<
  typeof getFaresTerminalMatesParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// faresTerminalSchema
// FaresTerminal
// terminalMateSchema
// TerminalMate
// ============================================================================

/**
 * Fares terminal schema - represents a valid departing terminal for fare queries
 */
export const faresTerminalSchema = z
  .object({
    TerminalID: z.number().int().positive().describe(""),
    Description: z.string().describe(""),
  })
  
  .describe("");

/**
 * Array of fares terminal objects - wrapper around faresTerminalSchema
 */
export const faresTerminalsArraySchema = z
  .array(faresTerminalSchema)
  .describe("");

/**
 * FaresTerminal type - represents a valid departing terminal for fare queries
 */
export type FaresTerminal = z.infer<typeof faresTerminalSchema>;

/**
 * Terminal mate schema - represents a valid arriving terminal for a departing terminal
 */
export const terminalMateSchema = z
  .object({
    TerminalID: z.number().int().positive().describe(""),
    Description: z.string().describe(""),
  })
  
  .describe("");

/**
 * Array of terminal mate objects - wrapper around terminalMateSchema
 */
export const terminalMatesArraySchema = z
  .array(terminalMateSchema)
  .describe("");

/**
 * TerminalMate type - represents a valid arriving terminal for a departing terminal
 */
export type TerminalMate = z.infer<typeof terminalMateSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminals
// useFaresTerminalMates
// ============================================================================

/**
 * TanStack Query hook for valid departing terminals with automatic updates.
 *
 * @param params - Parameters object for terminals query
 * @param params.tripDate - Trip date (must be within valid date range)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<FaresTerminal[]> - Query result with valid departing terminals
 *
 * @example
 * const { data: terminals, isLoading } = useFaresTerminals({
 *   tripDate: new Date('2025-08-26')
 * });
 * if (terminals) {
 *   console.log(terminals.length);  // 19
 *   console.log(terminals[0].Description);  // "Anacortes"
 * }
 */
export const useFaresTerminals = (
  params: GetFaresTerminalsParams,
  options?: UseQueryOptions<FaresTerminal[], Error>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf-fares", "terminals", jsDateToYyyyMmDd(params.tripDate)],
    queryFn: () => getFaresTerminals(params),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.MODERATE_FREQUENCY, ...options },
  });
};

/**
 * TanStack Query hook for terminal mates with automatic updates.
 *
 * @param params - Parameters object for terminal mates query
 * @param params.tripDate - Trip date (must be within valid date range)
 * @param params.terminalID - Unique identifier for the departing terminal
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TerminalMate[]> - Query result with valid arriving terminals
 *
 * @example
 * const { data: terminalMates, isLoading } = useFaresTerminalMates({
 *   tripDate: new Date('2025-08-26'),
 *   terminalID: 7 // Seattle
 * });
 * if (terminalMates) {
 *   console.log(terminalMates.length);  // 2
 *   console.log(terminalMates[0].Description);  // "Bainbridge Island"
 * }
 */
export const useFaresTerminalMates = (
  params: GetFaresTerminalMatesParams,
  options?: UseQueryOptions<TerminalMate[], Error>
) => {
  return useQueryWithAutoUpdate({
    queryKey: [
      "wsf-fares",
      "terminal-mates",
      jsDateToYyyyMmDd(params.tripDate),
      params.terminalID,
    ],
    queryFn: () => getFaresTerminalMates(params),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.MODERATE_FREQUENCY, ...options },
  });
};
