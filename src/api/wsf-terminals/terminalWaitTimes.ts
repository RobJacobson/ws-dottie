/**
 * @fileoverview WSF Terminal Wait Times API
 *
 * This module provides access to real-time wait time information and arrival recommendations
 * for Washington State Ferries terminals. It includes detailed guidance on when to arrive
 * for different types of travel (peak vs. non-peak), vehicle vs. walk-on passenger advice,
 * and reservation requirements for specific routes.
 *
 * @api WSF Terminal Wait Times
 * @see {@link https://www.wsdot.wa.gov/ferries/api/terminals/rest/terminalwaittimes WSDOT Terminal Wait Times API}
 *
 * @functions
 * - getTerminalWaitTimesByTerminalId - Retrieve wait time info for a specific terminal
 * - getTerminalWaitTimes - Retrieve wait time info for all terminals
 *
 * @input
 * - Terminal ID (for specific terminal queries)
 * - No parameters required for all terminals query
 *
 * @output
 * - TerminalWaitTimes object with wait time details and recommendations
 * - Array of TerminalWaitTimes objects for all terminals
 *
 * @baseType
 * TerminalWaitTimes interface containing:
 * - Basic terminal identification (ID, name, abbreviation, region)
 * - Array of WaitTimes with route-specific guidance
 * - Arrival time recommendations for peak and non-peak travel
 * - Vehicle and walk-on passenger arrival advice
 * - Reservation requirements and procedures
 * - Last update timestamps for wait time information
 *
 * @curl
 * ```bash
 * curl "https://www.wsdot.wa.gov/ferries/api/terminals/rest/terminalwaittimes?apiaccesscode=YOUR_TOKEN"
 * ```
 *
 * @exampleResponse
 * ```json
 * {
 *   "TerminalID": 1,
 *   "TerminalSubjectID": 111,
 *   "RegionID": 1,
 *   "TerminalName": "Anacortes",
 *   "TerminalAbbrev": "ANA",
 *   "SortSeq": 10,
 *   "WaitTimes": [
 *     {
 *       "RouteID": null,
 *       "RouteName": null,
 *       "WaitTimeNotes": "Vehicle reservations to the San Juan Islands are available at www.takeaferry.com or by calling 511, and must be made at least 2 hours prior to sailing time. A 45 to 60 minute advance arrival is advised for reservation holders...",
 *       "WaitTimeLastUpdated": "/Date(1597779070000-0700)/",
 *       "WaitTimeIVRNotes": "Vehicle reservations to the San Juan Islands are available online or by speaking to an information agent, and must be made at least 2 hours prior to sailing time..."
 *     }
 *   ]
 * }
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
// getTerminalWaitTimesByTerminalId (singular item)
// getTerminalWaitTimes (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalwaittimes/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalwaittimes";

/**
 * Retrieves wait time information and arrival recommendations for a specific WSF terminal.
 *
 * This function fetches detailed wait time guidance including peak vs. non-peak arrival
 * recommendations, vehicle vs. walk-on passenger advice, reservation requirements, and
 * route-specific information for a single terminal.
 *
 * @param params - Parameters object containing the terminal ID
 * @param params.terminalId - The unique identifier for the terminal
 * @returns Promise resolving to a TerminalWaitTimes object with wait time details
 *
 * @example
 * ```typescript
 * const terminalWaitTimes = await getTerminalWaitTimesByTerminalId({ terminalId: 1 });
 * console.log(terminalWaitTimes.TerminalName); // "Anacortes"
 * console.log(terminalWaitTimes.WaitTimes[0].WaitTimeNotes); // Arrival recommendations
 * ```
 *
 * @throws {Error} When the API request fails or returns invalid data
 * @see {@link TerminalWaitTimes} for the complete response structure
 */
export const getTerminalWaitTimesByTerminalId = async (
  params: GetTerminalWaitTimesByTerminalIdParams
): Promise<TerminalWaitTimes> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getTerminalWaitTimesByTerminalIdParamsSchema,
      output: terminalWaitTimesSchema,
    },
    params
  );
};

/**
 * Retrieves wait time information and arrival recommendations for all WSF terminals.
 *
 * This function fetches wait time guidance for all terminals in the WSF system,
 * providing comprehensive arrival recommendations across the entire ferry network
 * including peak travel times, reservation requirements, and passenger guidance.
 *
 * @param params - Optional parameters object (currently unused, provided for future extensibility)
 * @returns Promise resolving to an array of TerminalWaitTimes objects
 *
 * @example
 * ```typescript
 * const allTerminalWaitTimes = await getTerminalWaitTimes();
 * const anacortes = allTerminalWaitTimes.find(t => t.TerminalName === "Anacortes");
 * console.log(anacortes?.WaitTimes[0].WaitTimeNotes); // Anacortes arrival advice
 * ```
 *
 * @throws {Error} When the API request fails or returns invalid data
 * @see {@link TerminalWaitTimes} for the complete response structure
 */
export const getTerminalWaitTimes = async (
  params: GetTerminalWaitTimesParams = {}
): Promise<TerminalWaitTimes[]> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getTerminalWaitTimesParamsSchema,
      output: terminalWaitTimesArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTerminalWaitTimesByTerminalIdParamsSchema
// getTerminalWaitTimesParamsSchema
// GetTerminalWaitTimesByTerminalIdParams
// GetTerminalWaitTimesParams
// ============================================================================

/**
 * Input schema for retrieving wait time information for a specific terminal.
 *
 * @description
 * Schema for the getTerminalWaitTimesByTerminalId function parameters.
 * Requires a terminal ID to identify which terminal's wait time information to retrieve.
 */
export const getTerminalWaitTimesByTerminalIdParamsSchema = z
  .object({
    terminalId: z.number().int().describe(""),
  })
  .describe("");

/**
 * Input schema for retrieving wait time information for all terminals.
 *
 * @description
 * Schema for the getTerminalWaitTimes function parameters.
 * Currently accepts no parameters but provided for future extensibility.
 */
export const getTerminalWaitTimesParamsSchema = z.object({}).describe("");

export type GetTerminalWaitTimesByTerminalIdParams = z.infer<
  typeof getTerminalWaitTimesByTerminalIdParamsSchema
>;

export type GetTerminalWaitTimesParams = z.infer<
  typeof getTerminalWaitTimesParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalWaitTimeSchema
// terminalWaitTimesSchema
// terminalWaitTimesArraySchema
// TerminalWaitTimes
// TerminalWaitTime
// ============================================================================

/**
 * Schema for individual wait time information and recommendations.
 *
 * @description
 * Defines the structure for route-specific wait time data including arrival
 * recommendations, reservation requirements, and IVR (Interactive Voice Response)
 * notes for automated phone systems.
 *
 * @fields
 * - RouteID: Unique identifier for the specific route (nullable for general terminal info)
 * - RouteName: Human-readable name of the route (nullable for general terminal info)
 * - WaitTimeNotes: Detailed arrival recommendations and travel advice
 * - WaitTimeLastUpdated: Timestamp when the wait time information was last updated
 * - WaitTimeIVRNotes: Abbreviated notes for automated phone systems
 */
export const terminalWaitTimeSchema = z
  .object({
    RouteID: z.number().nullable().describe(""),
    RouteName: z.string().nullable().describe(""),
    WaitTimeIVRNotes: z.string().nullable().describe(""),
    WaitTimeLastUpdated: zWsdotDate().describe(""),
    WaitTimeNotes: z.string().nullable().describe(""),
  })
  .describe("");

/**
 * Schema for comprehensive terminal wait time information.
 *
 * @description
 * Defines the structure for terminal wait time data including basic terminal
 * identification and an array of wait time recommendations for different routes
 * or general terminal guidance.
 *
 * @fields
 * - TerminalID: Unique identifier for the terminal
 * - TerminalSubjectID: Subject identifier for the terminal
 * - RegionID: Geographic region identifier
 * - TerminalName: Full name of the terminal
 * - TerminalAbbrev: Abbreviated terminal name
 * - SortSeq: Sorting sequence for display order
 * - WaitTimes: Array of wait time recommendations and arrival advice
 */
export const terminalWaitTimesSchema = z
  .object({
    TerminalID: z.number().describe(""),
    TerminalSubjectID: z.number().describe(""),
    RegionID: z.number().describe(""),
    TerminalName: z.string().describe(""),
    TerminalAbbrev: z.string().describe(""),
    SortSeq: z.number().describe(""),
    WaitTimes: z.array(terminalWaitTimeSchema).describe(""),
  })
  .describe("");

/**
 * Schema for an array of terminal wait time objects.
 *
 * @description
 * Validates an array of TerminalWaitTimes objects, typically returned when
 * querying wait time information for all terminals.
 */
export const terminalWaitTimesArraySchema = z.array(terminalWaitTimesSchema);

export type TerminalWaitTimes = z.infer<typeof terminalWaitTimesSchema>;
export type TerminalWaitTime = z.infer<typeof terminalWaitTimeSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalWaitTimesByTerminalId (singular item)
// useTerminalWaitTimes (array)
// ============================================================================

/**
 * TanStack Query hook for retrieving wait time information for a specific terminal.
 *
 * This hook automatically manages the data fetching lifecycle for terminal wait time
 * information, including caching, background updates, and error handling. It's optimized
 * for daily updates to ensure wait time recommendations remain current.
 *
 * @param params - Parameters object containing the terminal ID
 * @param params.terminalId - The unique identifier for the terminal
 * @param options - Optional TanStack Query options to override defaults
 * @returns TanStack Query result object with terminal wait time data
 *
 * @example
 * ```typescript
 * const { data: terminalWaitTimes, isLoading, error } = useTerminalWaitTimesByTerminalId(
 *   { terminalId: 1 }
 * );
 *
 * if (isLoading) return <div>Loading wait time info...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     <h2>{terminalWaitTimes.TerminalName} Wait Times</h2>
 *     {terminalWaitTimes.WaitTimes.map((waitTime, index) => (
 *       <div key={index}>
 *         <h3>{waitTime.RouteName || 'General Terminal Info'}</h3>
 *         <div dangerouslySetInnerHTML={{ __html: waitTime.WaitTimeNotes }} />
 *         <small>Last updated: {waitTime.WaitTimeLastUpdated}</small>
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 *
 * @see {@link getTerminalWaitTimesByTerminalId} for the underlying API function
 * @see {@link TerminalWaitTimes} for the complete data structure
 */
export const useTerminalWaitTimesByTerminalId = (
  params: GetTerminalWaitTimesByTerminalIdParams,
  options?: TanStackOptions<TerminalWaitTimes>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "waitTimes", params.terminalId],
    queryFn: () => getTerminalWaitTimesByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

/**
 * TanStack Query hook for retrieving wait time information for all terminals.
 *
 * This hook automatically manages the data fetching lifecycle for all terminal wait time
 * information, including caching, background updates, and error handling. It's optimized
 * for daily updates to ensure wait time recommendations remain current across all terminals.
 *
 * @param options - Optional TanStack Query options to override defaults
 * @returns TanStack Query result object with array of terminal wait time data
 *
 * @example
 * ```typescript
 * const { data: allTerminalWaitTimes, isLoading, error } = useTerminalWaitTimes();
 *
 * if (isLoading) return <div>Loading all terminal wait time info...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * @see {@link getTerminalWaitTimes} for the underlying API function
 * @see {@link TerminalWaitTimes} for the complete data structure
 */
export const useTerminalWaitTimes = (
  options?: TanStackOptions<TerminalWaitTimes[]>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "waitTimes"],
    queryFn: getTerminalWaitTimes,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
