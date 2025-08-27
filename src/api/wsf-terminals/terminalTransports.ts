/**
 * @fileoverview WSF Terminal Transports API
 *
 * This module provides access to comprehensive transportation information for Washington State Ferries terminals.
 * It includes details about parking, airport connections, motorcycle procedures, truck restrictions,
 * bicycle information, train connections, taxi services, HOV lanes, and transit links for each terminal.
 *
 * @api WSF Terminal Transports
 * @see {@link https://www.wsdot.wa.gov/ferries/api/terminals/rest/terminaltransports WSDOT Terminal Transports API}
 *
 * @functions
 * - getTerminalTransportsByTerminalId - Retrieve transportation info for a specific terminal
 * - getTerminalTransports - Retrieve transportation info for all terminals
 *
 * @input
 * - Terminal ID (for specific terminal queries)
 * - No parameters required for all terminals query
 *
 * @output
 * - TerminalTransport object with comprehensive transportation details
 * - Array of TerminalTransport objects for all terminals
 *
 * @baseType
 * TerminalTransport interface containing:
 * - Basic terminal identification (ID, name, abbreviation, region)
 * - Parking information and rates
 * - Airport and shuttle service details
 * - Motorcycle loading and staging procedures
 * - Truck restrictions and requirements
 * - Bicycle procedures and facilities
 * - Train connections and schedules
 * - Taxi service information
 * - HOV/carpool procedures
 * - Transit system links and connections
 *
 * @curl
 * ```bash
 * curl "https://www.wsdot.wa.gov/ferries/api/terminals/rest/terminaltransports?apiaccesscode=YOUR_TOKEN"
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
 *   "ParkingInfo": "Peak rates effective May 1 - September 30: 1 day rate (car) - $13.00...",
 *   "ParkingShuttleInfo": null,
 *   "AirportInfo": "From the Seattle-Tacoma International Airport, allow a minimum of 2 1/2 hours driving time...",
 *   "AirportShuttleInfo": "When traveling from Sea-Tac Airport to Anacortes there is a shuttle...",
 *   "MotorcycleInfo": "While motorcycles are not, by Washington Administrative Code...",
 *   "TruckInfo": "Expect heavy truck traffic on the first 3 sailings in the morning...",
 *   "BikeInfo": "Approaching the Anacortes Terminal, you will arrive at the vehicle tollbooths...",
 *   "TrainInfo": null,
 *   "TaxiInfo": null,
 *   "HovInfo": null,
 *   "TransitLinks": [
 *     {
 *       "LinkURL": "http://www.skagittransit.org/",
 *       "LinkName": "Skagit Transit",
 *       "SortSeq": null
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

import { getCacheFlushDateTerminals } from "../wsf/cacheFlushDate";
import { terminalTransitLinkSchema } from "./terminalVerbose";

// ============================================================================
// API Functions
//
// getTerminalTransportsByTerminalId (singular item)
// getTerminalTransports (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminaltransports/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminaltransports";

/**
 * Retrieves comprehensive transportation information for a specific WSF terminal.
 *
 * This function fetches detailed transportation details including parking, airport connections,
 * motorcycle procedures, truck restrictions, bicycle information, train connections, taxi services,
 * HOV procedures, and transit links for a single terminal.
 *
 * @param params - Parameters object containing the terminal ID
 * @param params.terminalId - The unique identifier for the terminal
 * @returns Promise resolving to a TerminalTransport object with complete transportation details
 *
 * @example
 * ```typescript
 * const terminalTransport = await getTerminalTransportsByTerminalId({ terminalId: 1 });
 * console.log(terminalTransport.TerminalName); // "Anacortes"
 * console.log(terminalTransport.ParkingInfo); // Parking rates and information
 * ```
 *
 * @throws {Error} When the API request fails or returns invalid data
 * @see {@link TerminalTransport} for the complete response structure
 */
export const getTerminalTransportsByTerminalId = async (
  params: GetTerminalTransportsByTerminalIdParams
): Promise<TerminalTransport> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getTerminalTransportsByTerminalIdParamsSchema,
      output: terminalTransportSchema,
    },
    params
  );
};

/**
 * Retrieves comprehensive transportation information for all WSF terminals.
 *
 * This function fetches transportation details for all terminals in the WSF system,
 * providing a complete overview of parking, connections, procedures, and transit options
 * across the entire ferry network.
 *
 * @param params - Optional parameters object (currently unused, provided for future extensibility)
 * @returns Promise resolving to an array of TerminalTransport objects
 *
 * @example
 * ```typescript
 * const allTerminalTransports = await getTerminalTransports();
 * const anacortes = allTerminalTransports.find(t => t.TerminalName === "Anacortes");
 * console.log(anacortes?.ParkingInfo); // Anacortes parking information
 * ```
 *
 * @throws {Error} When the API request fails or returns invalid data
 * @see {@link TerminalTransport} for the complete response structure
 */
export const getTerminalTransports = async (
  params: GetTerminalTransportsParams = {}
): Promise<TerminalTransport[]> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getTerminalTransportsParamsSchema,
      output: terminalTransportsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTerminalTransportsByTerminalIdParamsSchema
// getTerminalTransportsParamsSchema
// GetTerminalTransportsByTerminalIdParams
// GetTerminalTransportsParams
// ============================================================================

/**
 * Input schema for retrieving transportation information for a specific terminal.
 *
 * @description
 * Schema for the getTerminalTransportsByTerminalId function parameters.
 * Requires a terminal ID to identify which terminal's transportation information to retrieve.
 */
export const getTerminalTransportsByTerminalIdParamsSchema = z
  .object({
    terminalId: z.number().int().describe(""),
  })
  .describe("");

/**
 * Input schema for retrieving transportation information for all terminals.
 *
 * @description
 * Schema for the getTerminalTransports function parameters.
 * Currently accepts no parameters but provided for future extensibility.
 */
export const getTerminalTransportsParamsSchema = z.object({}).describe("");

export type GetTerminalTransportsByTerminalIdParams = z.infer<
  typeof getTerminalTransportsByTerminalIdParamsSchema
>;

export type GetTerminalTransportsParams = z.infer<
  typeof getTerminalTransportsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalTransitLinkSchema
// terminalTransportSchema
// terminalTransportsArraySchema
// TerminalTransport
// TerminalTransitLink
// ============================================================================

/**
 * Schema for comprehensive terminal transportation information.
 *
 * @description
 * Defines the structure for terminal transportation data including parking, connections,
 * procedures, and transit options. This schema validates the complete transportation
 * information returned by the WSF Terminal Transports API.
 *
 * @fields
 * - TerminalID: Unique identifier for the terminal
 * - TerminalSubjectID: Subject identifier for the terminal
 * - RegionID: Geographic region identifier
 * - TerminalName: Full name of the terminal
 * - TerminalAbbrev: Abbreviated terminal name
 * - SortSeq: Sorting sequence for display order
 * - ParkingInfo: Detailed parking rates, policies, and contact information
 * - ParkingShuttleInfo: Information about parking shuttle services
 * - AirportInfo: Directions and information for airport connections
 * - AirportShuttleInfo: Details about airport shuttle services
 * - MotorcycleInfo: Motorcycle loading procedures and staging information
 * - TruckInfo: Truck restrictions, requirements, and special procedures
 * - BikeInfo: Bicycle procedures, facilities, and loading information
 * - TrainInfo: Train connection details and schedules
 * - TaxiInfo: Taxi service information and contact details
 * - HovInfo: HOV/carpool procedures and requirements
 * - TransitLinks: Array of transit system connections and links
 */
export const terminalTransportSchema = z
  .object({
    TerminalID: z.number().describe(""),
    TerminalSubjectID: z.number().describe(""),
    RegionID: z.number().describe(""),
    TerminalName: z.string().describe(""),
    TerminalAbbrev: z.string().describe(""),
    SortSeq: z.number().describe(""),
    ParkingInfo: z.string().nullable().describe(""),
    ParkingShuttleInfo: z.string().nullable().describe(""),
    AirportInfo: z.string().nullable().describe(""),
    AirportShuttleInfo: z.string().nullable().describe(""),
    MotorcycleInfo: z.string().nullable().describe(""),
    TruckInfo: z.string().nullable().describe(""),
    BikeInfo: z.string().nullable().describe(""),
    TrainInfo: z.string().nullable().describe(""),
    TaxiInfo: z.string().nullable().describe(""),
    HovInfo: z.string().nullable().describe(""),
    TransitLinks: z.array(terminalTransitLinkSchema).describe(""),
  })
  .describe("");

/**
 * Schema for an array of terminal transportation objects.
 *
 * @description
 * Validates an array of TerminalTransport objects, typically returned when
 * querying transportation information for all terminals.
 */
export const terminalTransportsArraySchema = z.array(terminalTransportSchema);

export type TerminalTransport = z.infer<typeof terminalTransportSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalTransportsByTerminalId (singular item)
// useTerminalTransports (array)
// ============================================================================

/**
 * TanStack Query hook for retrieving transportation information for a specific terminal.
 *
 * This hook automatically manages the data fetching lifecycle for terminal transportation
 * information, including caching, background updates, and error handling. It's optimized
 * for daily updates to ensure transportation information remains current.
 *
 * @param params - Parameters object containing the terminal ID
 * @param params.terminalId - The unique identifier for the terminal
 * @param options - Optional TanStack Query options to override defaults
 * @returns TanStack Query result object with terminal transportation data
 *
 * @example
 * ```typescript
 * const { data: terminalTransport, isLoading, error } = useTerminalTransportsByTerminalId(
 *   { terminalId: 1 }
 * );
 *
 * if (isLoading) return <div>Loading transportation info...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     <h2>{terminalTransport.TerminalName} Transportation</h2>
 *     <div dangerouslySetInnerHTML={{ __html: terminalTransport.ParkingInfo }} />
 *   </div>
 * );
 * ```
 *
 * @see {@link getTerminalTransportsByTerminalId} for the underlying API function
 * @see {@link TerminalTransport} for the complete data structure
 */
export const useTerminalTransportsByTerminalId = (
  params: GetTerminalTransportsByTerminalIdParams,
  options?: TanStackOptions<TerminalTransport>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "transports", params.terminalId],
    queryFn: () => getTerminalTransportsByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

/**
 * TanStack Query hook for retrieving transportation information for all terminals.
 *
 * This hook automatically manages the data fetching lifecycle for all terminal transportation
 * information, including caching, background updates, and error handling. It's optimized
 * for daily updates to ensure transportation information remains current across all terminals.
 *
 * @param options - Optional TanStack Query options to override defaults
 * @returns TanStack Query result object with array of terminal transportation data
 *
 * @example
 * ```typescript
 * const { data: allTerminalTransports, isLoading, error } = useTerminalTransports();
 *
 * if (isLoading) return <div>Loading all terminal transportation info...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     {allTerminalTransports.map(terminal => (
 *       <div key={terminal.TerminalID}>
 *         <h3>{terminal.TerminalName}</h3>
 *         <div dangerouslySetInnerHTML={{ __html: terminal.ParkingInfo || 'No parking info' }} />
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 *
 * @see {@link getTerminalTransports} for the underlying API function
 * @see {@link TerminalTransport} for the complete data structure
 */
export const useTerminalTransports = (
  options?: TanStackOptions<TerminalTransport[]>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "transports"],
    queryFn: getTerminalTransports,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
