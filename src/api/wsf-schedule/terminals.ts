/**
 * WSF Schedule API - Terminals
 *
 * Provides comprehensive terminal information for the Washington State Ferries schedule system including:
 * - Valid departing terminals for specific dates
 * - Arriving terminal options (mates) from specific departing terminals
 * - All valid terminal combinations for trip planning
 * - Route-specific terminal combinations with operational constraints
 *
 * This API returns terminal information that can be used for trip planning, route selection,
 * and understanding terminal relationships on specific dates. The data includes terminal IDs,
 * descriptions, and combination relationships for building comprehensive trip planning interfaces.
 *
 * API Functions:
 * - getTerminals: Returns valid departing terminals for a specific date
 * - getTerminalMates: Returns valid arriving terminals for a departing terminal and date
 * - getTerminalsAndMates: Returns all valid terminal combinations for a specific date
 * - getTerminalsAndMatesByRoute: Returns terminal combinations for a specific route and date
 *
 * Input/Output Overview:
 * - getTerminals: Input: { tripDate: Date }, Output: ScheduleTerminal[]
 * - getTerminalMates: Input: { tripDate: Date, terminalId: number }, Output: ScheduleTerminal[]
 * - getTerminalsAndMates: Input: { tripDate: Date }, Output: ScheduleTerminalCombo[]
 * - getTerminalsAndMatesByRoute: Input: { tripDate: Date, routeId: number }, Output: ScheduleTerminalCombo[]
 *
 * Base Type: ScheduleTerminal
 *
 * interface ScheduleTerminal {
 *   TerminalID: number;
 *   Description: string;
 * }
 *
 * Base Type: ScheduleTerminalCombo
 *
 * interface ScheduleTerminalCombo {
 *   DepartingTerminalID: number;
 *   DepartingDescription: string;
 *   ArrivingTerminalID: number;
 *   ArrivingDescription: string;
 * }
 *
 * Note: The API returns terminal information with increasing specificity:
 * - ScheduleTerminal: Individual terminal with ID and description
 * - ScheduleTerminalCombo: Terminal pair with departing and arriving terminal details
 * Each represents valid ferry travel options for the specified date constraints.
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/schedule/rest/terminals/2025-08-26?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {"TerminalID": 1, "Description": "Anacortes"},
 *   {"TerminalID": 3, "Description": "Bainbridge Island"},
 *   {"TerminalID": 4, "Description": "Bremerton"},
 *   {"TerminalID": 5, "Description": "Clinton"},
 *   {"TerminalID": 7, "Description": "Seattle"},
 *   {"TerminalID": 8, "Description": "Edmonds"},
 *   {"TerminalID": 9, "Description": "Fauntleroy"},
 *   {"TerminalID": 10, "Description": "Friday Harbor"}
 * ]
 * ```
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/schedule/rest/terminalmates/2025-08-26/7?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {"TerminalID": 3, "Description": "Bainbridge Island"},
 *   {"TerminalID": 4, "Description": "Bremerton"}
 * ]
 * ```
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/schedule/rest/terminalsandmates/2025-08-26?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {"DepartingTerminalID": 1, "DepartingDescription": "Anacortes", "ArrivingTerminalID": 10, "ArrivingDescription": "Friday Harbor"},
 *   {"DepartingTerminalID": 3, "DepartingDescription": "Bainbridge Island", "ArrivingTerminalID": 7, "ArrivingDescription": "Seattle"},
 *   {"DepartingTerminalID": 7, "DepartingDescription": "Seattle", "ArrivingTerminalID": 3, "ArrivingDescription": "Bainbridge Island"},
 *   {"DepartingTerminalID": 7, "DepartingDescription": "Seattle", "ArrivingTerminalID": 4, "ArrivingDescription": "Bremerton"}
 * ]
 * ```
 *
 * @see {@link https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html WSF Schedule API Documentation}
 * @see {@link https://www.wsdot.wa.gov/ferries/schedule/ WSF Schedules}
 *
 * @example
 * ```typescript
 * import { getTerminals, getTerminalMates, getTerminalsAndMates } from '@ferryjoy/ws-dottie';
 *
 * // Get all valid departing terminals for a date
 * const terminals = await getTerminals({ tripDate: new Date('2025-08-26') });
 * console.log(`Available terminals: ${terminals.length}`);  // 22
 * console.log(terminals[0].Description);  // "Anacortes"
 *
 * // Get valid destinations from Seattle
 * const destinations = await getTerminalMates({
 *   tripDate: new Date('2025-08-26'),
 *   terminalId: 7  // Seattle
 * });
 * console.log(`Destinations from Seattle: ${destinations.length}`);  // 2
 * console.log(destinations[0].Description);  // "Bainbridge Island"
 *
 * // Get all valid terminal combinations
 * const combinations = await getTerminalsAndMates({ tripDate: new Date('2025-08-26') });
 * console.log(`Total combinations: ${combinations.length}`);  // 42
 * console.log(`${combinations[0].DepartingDescription} to ${combinations[0].ArrivingDescription}`);  // "Anacortes to Friday Harbor"
 * ```
 *
 * @module wsf-schedule/terminals
 */

import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getTerminals (all departing terminals for a date)
// getTerminalMates (arriving terminals from specific terminal and date)
// getTerminalsAndMates (all terminal combinations for a date)
// getTerminalsAndMatesByRoute (terminal combinations for specific route and date)
// ============================================================================

const ENDPOINT_TERMINALS = "/ferries/api/schedule/rest/terminals/{tripDate}";
const ENDPOINT_TERMINAL_MATES =
  "/ferries/api/schedule/rest/terminalmates/{tripDate}/{terminalId}";
const ENDPOINT_ALL_COMBOS =
  "/ferries/api/schedule/rest/terminalsandmates/{tripDate}";
const ENDPOINT_COMBOS_BY_ROUTE =
  "/ferries/api/schedule/rest/terminalsandmatesbyroute/{tripDate}/{routeId}";

/**
 * Retrieves valid departing terminals for a given trip date.
 *
 * @param params - Parameters object for terminals query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @returns Promise<ScheduleTerminal[]> - Array of valid departing terminal options
 *
 * @example
 * const terminals = await getTerminals({ tripDate: new Date('2025-01-27') });
 * console.log(terminals[0].Description);  // "Seattle"
 * console.log(terminals.length);  // 15 (number of available terminals)
 *
 * @throws {Error} When date is invalid or API is unavailable
 *
 * Note: This endpoint may have implementation issues based on testing results.
 */
export const getTerminals = async (
  params: GetTerminalsParams
): Promise<ScheduleTerminal[]> => {
  return zodFetch(
    ENDPOINT_TERMINALS,
    {
      input: getTerminalsParamsSchema,
      output: scheduleTerminalsArraySchema,
    },
    params
  );
};

/**
 * Retrieves valid arriving terminals (mates) for a given departing terminal and trip date.
 *
 * @param params - Parameters object for terminal mates query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @param params.terminalId - Unique identifier for the departing terminal (positive integer)
 * @returns Promise<ScheduleTerminal[]> - Array of valid arriving terminal options
 *
 * @example
 * const terminalMates = await getTerminalMates({
 *   tripDate: new Date('2025-01-27'),
 *   terminalId: 7  // Seattle
 * });
 * console.log(terminalMates[0].Description);  // "Bainbridge Island"
 * console.log(terminalMates.length);  // 3 (number of accessible destinations)
 *
 * @throws {Error} When terminal ID is invalid, date is invalid, or API is unavailable
 *
 * Note: This endpoint may have implementation issues based on testing results.
 */
export const getTerminalMates = async (
  params: GetTerminalMatesParams
): Promise<ScheduleTerminal[]> => {
  return zodFetch(
    ENDPOINT_TERMINAL_MATES,
    {
      input: getTerminalMatesParamsSchema,
      output: scheduleTerminalsArraySchema,
    },
    params
  );
};

/**
 * Retrieves all valid departing and arriving terminal combinations for a given trip date.
 *
 * @param params - Parameters object for terminal combinations query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @returns Promise<ScheduleTerminalCombo[]> - Array of valid terminal combinations
 *
 * @example
 * const terminalCombos = await getTerminalsAndMates({ tripDate: new Date('2025-01-27') });
 * console.log(terminalCombos[0].DepartingDescription);  // "Seattle"
 * console.log(terminalCombos[0].ArrivingDescription);   // "Bainbridge Island"
 * console.log(terminalCombos.length);  // 25 (number of valid combinations)
 *
 * @throws {Error} When date is invalid or API is unavailable
 *
 * Note: This endpoint may have implementation issues based on testing results.
 */
export const getTerminalsAndMates = async (
  params: GetTerminalsAndMatesParams
): Promise<ScheduleTerminalCombo[]> => {
  return zodFetch(
    ENDPOINT_ALL_COMBOS,
    {
      input: getTerminalsAndMatesParamsSchema,
      output: scheduleTerminalCombosArraySchema,
    },
    params
  );
};

/**
 * Retrieves valid departing and arriving terminal combinations for a specific route and trip date.
 *
 * @param params - Parameters object for route-specific terminal combinations query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @param params.routeId - Unique identifier for the route (positive integer)
 * @returns Promise<ScheduleTerminalCombo[]> - Array of valid terminal combinations for the route
 *
 * @example
 * const routeTerminalCombos = await getTerminalsAndMatesByRoute({
 *   tripDate: new Date('2025-01-27'),
 *   routeId: 1  // Seattle-Bainbridge route
 * });
 * console.log(routeTerminalCombos[0].DepartingDescription);  // "Seattle"
 * console.log(routeTerminalCombos[0].ArrivingDescription);   // "Bainbridge Island"
 *
 * @throws {Error} When route ID is invalid, date is invalid, or API is unavailable
 *
 * Note: This endpoint may have implementation issues based on testing results.
 */
export const getTerminalsAndMatesByRoute = async (
  params: GetTerminalsAndMatesByRouteParams
): Promise<ScheduleTerminalCombo[]> => {
  return zodFetch(
    ENDPOINT_COMBOS_BY_ROUTE,
    {
      input: getTerminalsAndMatesByRouteParamsSchema,
      output: scheduleTerminalCombosArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTerminalsParamsSchema
// GetTerminalsParams
// getTerminalMatesParamsSchema
// GetTerminalMatesParams
// getTerminalsAndMatesParamsSchema
// GetTerminalsAndMatesParams
// getTerminalsAndMatesByRouteParamsSchema
// GetTerminalsAndMatesByRouteParams
// ============================================================================

/**
 * Parameters for retrieving valid departing terminals for a specific date
 */
export const getTerminalsParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
  })
  .describe("");

export type GetTerminalsParams = z.infer<typeof getTerminalsParamsSchema>;

/**
 * Parameters for retrieving valid arriving terminals for a departing terminal and date
 */
export const getTerminalMatesParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    terminalId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetTerminalMatesParams = z.infer<
  typeof getTerminalMatesParamsSchema
>;

/**
 * Parameters for retrieving all valid terminal combinations for a specific date
 */
export const getTerminalsAndMatesParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
  })
  .describe("");

export type GetTerminalsAndMatesParams = z.infer<
  typeof getTerminalsAndMatesParamsSchema
>;

/**
 * Parameters for retrieving terminal combinations for a specific route and date
 */
export const getTerminalsAndMatesByRouteParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    routeId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetTerminalsAndMatesByRouteParams = z.infer<
  typeof getTerminalsAndMatesByRouteParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// scheduleTerminalSchema
// scheduleTerminalsArraySchema
// scheduleTerminalComboSchema
// scheduleTerminalCombosArraySchema
// ScheduleTerminal
// ScheduleTerminalCombo
// ============================================================================

/**
 * Schedule terminal information schema - includes terminal ID and description
 */
export const scheduleTerminalSchema = z
  .object({
    TerminalID: z.number().int().positive().describe(""),
    Description: z.string().describe(""),
  })
  .describe("");

/**
 * Array of schedule terminal objects - wrapper around scheduleTerminalSchema
 */
export const scheduleTerminalsArraySchema = z.array(scheduleTerminalSchema);

/**
 * ScheduleTerminal type - represents a valid terminal option
 */
export type ScheduleTerminal = z.infer<typeof scheduleTerminalSchema>;

/**
 * Schedule terminal combination schema - includes departing and arriving terminal information
 */
export const scheduleTerminalComboSchema = z
  .object({
    DepartingTerminalID: z.number().int().positive().describe(""),
    DepartingDescription: z.string().describe(""),
    ArrivingTerminalID: z.number().int().positive().describe(""),
    ArrivingDescription: z.string().describe(""),
  })
  .describe("");

/**
 * Array of schedule terminal combination objects - wrapper around scheduleTerminalComboSchema
 */
export const scheduleTerminalCombosArraySchema = z.array(
  scheduleTerminalComboSchema
);

/**
 * ScheduleTerminalCombo type - represents a valid terminal combination for ferry travel
 */
export type ScheduleTerminalCombo = z.infer<typeof scheduleTerminalComboSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminals
// useTerminalMates
// useTerminalsAndMates
// useTerminalsAndMatesByRoute
// ============================================================================

/**
 * TanStack Query hook for terminals data with automatic updates.
 *
 * @param params - Parameters object for terminals query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<ScheduleTerminal[], Error> - Query result with terminals data
 *
 * @example
 * const { data: terminals, isLoading } = useTerminals({ tripDate: new Date('2025-01-27') });
 * if (terminals) {
 *   console.log(terminals[0].Description);  // "Seattle"
 *   console.log(terminals.length);  // 15 (number of available terminals)
 * }
 *
 * Note: This endpoint may have implementation issues based on testing results.
 */
export const useTerminals = (
  params: { tripDate: Date },
  options?: TanStackOptions<ScheduleTerminal[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "terminals", JSON.stringify(params)],
    queryFn: () => getTerminals(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });

/**
 * TanStack Query hook for terminal mates data with automatic updates.
 *
 * @param params - Parameters object for terminal mates query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @param params.terminalId - Unique identifier for the departing terminal (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<ScheduleTerminal[], Error> - Query result with terminal mates data
 *
 * @example
 * const { data: terminalMates, isLoading } = useTerminalMates({
 *   tripDate: new Date('2025-01-27'),
 *   terminalId: 7  // Seattle
 * });
 * if (terminalMates) {
 *   console.log(terminalMates[0].Description);  // "Bainbridge Island"
 *   console.log(terminalMates.length);  // 3 (number of accessible destinations)
 * }
 *
 * Note: This endpoint may have implementation issues based on testing results.
 */
export const useTerminalMates = (
  params: { tripDate: Date; terminalId: number },
  options?: TanStackOptions<ScheduleTerminal[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "terminalMates", JSON.stringify(params)],
    queryFn: () => getTerminalMates(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });

/**
 * TanStack Query hook for terminal combinations with automatic updates.
 *
 * @param params - Parameters object for terminal combinations query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<ScheduleTerminalCombo[], Error> - Query result with terminal combinations data
 *
 * @example
 * const { data: terminalCombos, isLoading } = useTerminalsAndMates({ tripDate: new Date('2025-01-27') });
 * if (terminalCombos) {
 *   console.log(terminalCombos[0].DepartingDescription);  // "Seattle"
 *   console.log(terminalCombos[0].ArrivingDescription);   // "Bainbridge Island"
 *   console.log(terminalCombos.length);  // 25 (number of valid combinations)
 * }
 *
 * Note: This endpoint may have implementation issues based on testing results.
 */
export const useTerminalsAndMates = (
  params: { tripDate: Date },
  options?: TanStackOptions<ScheduleTerminalCombo[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "terminalsAndMates", JSON.stringify(params)],
    queryFn: () => getTerminalsAndMates(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });

/**
 * TanStack Query hook for route-specific terminal combinations with automatic updates.
 *
 * @param params - Parameters object for route-specific terminal combinations query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @param params.routeId - Unique identifier for the route (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<ScheduleTerminalCombo[], Error> - Query result with route-specific terminal combinations data
 *
 * @example
 * const { data: routeTerminalCombos, isLoading } = useTerminalsAndMatesByRoute({
 *   tripDate: new Date('2025-01-27'),
 *   routeId: 1  // Seattle-Bainbridge route
 * });
 * if (routeTerminalCombos) {
 *   console.log(routeTerminalCombos[0].DepartingDescription);  // "Seattle"
 *   console.log(routeTerminalCombos[0].ArrivingDescription);   // "Bainbridge Island"
 * }
 *
 * Note: This endpoint may have implementation issues based on testing results.
 */
export const useTerminalsAndMatesByRoute = (
  params: { tripDate: Date; routeId: number },
  options?: TanStackOptions<ScheduleTerminalCombo[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "terminalsAndMatesByRoute",
      JSON.stringify(params),
    ],
    queryFn: () => getTerminalsAndMatesByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
