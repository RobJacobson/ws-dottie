/**
 * Terminal Locations API
 *
 * Provides detailed location information for Washington State Ferries terminals including GPS coordinates,
 * addresses, driving directions, and GIS zoom locations. This API returns comprehensive geographic data
 * for each terminal, making it useful for navigation, mapping applications, and providing directions
 * to passengers. The data includes street addresses, city/state information, latitude/longitude coordinates,
 * and detailed driving directions from major highways.
 *
 * API Functions:
 * - getTerminalLocationsByTerminalId: Returns one TerminalLocation object for the specified TerminalID
 * - getTerminalLocations: Returns an array of TerminalLocation objects for all terminals
 *
 * Input/Output Overview:
 * - getTerminalLocationsByTerminalId: Input: { terminalId: number }, Output: TerminalLocation
 * - getTerminalLocations: Input: none, Output: TerminalLocation[]
 *
 * Base Type: TerminalLocation
 *
 * interface TerminalLocation {
 *   TerminalID: number;
 *   TerminalSubjectID: number;
 *   RegionID: number;
 *   TerminalName: string;
 *   TerminalAbbrev: string;
 *   SortSeq: number;
 *   AddressLineOne: string;
 *   AddressLineTwo: string | null;
 *   City: string;
 *   State: string;
 *   ZipCode: string;
 *   Country: string;
 *   Latitude: number;
 *   Longitude: number;
 *   Directions: string | null;
 *   DispGISZoomLoc: DispGISZoomLoc[];
 *   MapLink: string | null;
 * }
 *
 * interface DispGISZoomLoc {
 *   Latitude: number;
 *   Longitude: number;
 *   ZoomLevel: number;
 * }
 *
 * Note: Only includes fields that are officially documented in the WSF Terminals API specification.
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/terminals/rest/terminallocations/7?apiaccesscode=$WSDOT_ACCESS_TOKEN"
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
 *   "AddressLineOne": "801 Alaskan Way Pier 52",
 *   "AddressLineTwo": null,
 *   "City": "Seattle",
 *   "State": "WA",
 *   "ZipCode": "98104",
 *   "Country": "USA",
 *   "Latitude": 47.602501,
 *   "Longitude": -122.340472,
 *   "Directions": "From I-5 northbound (SeaTac Airport)...",
 *   "DispGISZoomLoc": [
 *     {
 *       "Latitude": 47.602501,
 *       "Longitude": -122.340472,
 *       "ZoomLevel": 0
 *     }
 *   ],
 *   "MapLink": "https://www.google.com/maps/place/Seattle+Ferry+Terminal..."
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
// getTerminalLocationsByTerminalId (singular item)
// getTerminalLocations (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminallocations/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminallocations";

/**
 * Retrieves detailed location information for a specific terminal by its ID.
 *
 * @param params - Parameters object for terminal location query
 * @param params.terminalId - Unique terminal identifier (positive integer)
 * @returns Promise<TerminalLocation> - Terminal location data including coordinates, address, and directions
 *
 * @example
 * const terminalLocation = await getTerminalLocationsByTerminalId({ terminalId: 7 });
 * console.log(terminalLocation.TerminalName);  // "Seattle"
 * console.log(terminalLocation.Latitude);  // 47.602501
 * console.log(terminalLocation.Longitude);  // -122.340472
 *
 * @throws {Error} When terminal ID is invalid or API is unavailable
 */
export const getTerminalLocationsByTerminalId = async (
  params: GetTerminalLocationsByTerminalIdParams
): Promise<TerminalLocation> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getTerminalLocationsByTerminalIdParamsSchema,
      output: terminalLocationSchema,
    },
    params
  );
};

/**
 * Retrieves detailed location information for all terminals.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<TerminalLocation[]> - Array of terminal location data for all terminals
 *
 * @example
 * const terminalLocations = await getTerminalLocations();
 * console.log(terminalLocations.length);  // 25
 *
 * @throws {Error} When API is unavailable
 */
export const getTerminalLocations = async (
  params: GetTerminalLocationsParams = {}
): Promise<TerminalLocation[]> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getTerminalLocationsParamsSchema,
      output: terminalLocationsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalLocationsByTerminalIdParamsSchema
// getTerminalLocationsParamsSchema
// GetTerminalLocationsByTerminalIdParams
// GetTerminalLocationsParams
// ============================================================================

/**
 * Parameters for retrieving detailed location information for a specific terminal
 */
export const getTerminalLocationsByTerminalIdParamsSchema = z
  .object({
    terminalId: z.number().int().describe(""),
  })
  .describe("");

/**
 * Parameters for retrieving all terminal locations (no parameters required)
 */
export const getTerminalLocationsParamsSchema = z.object({}).describe("");

export type GetTerminalLocationsByTerminalIdParams = z.infer<
  typeof getTerminalLocationsByTerminalIdParamsSchema
>;
export type GetTerminalLocationsParams = z.infer<
  typeof getTerminalLocationsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalLocationSchema
// terminalLocationsArraySchema
// TerminalLocation
// ============================================================================

/**
 * Terminal location data schema - includes geographic coordinates, addresses, directions, and GIS zoom locations
 */
export const terminalLocationSchema = z
  .object({
    TerminalID: z.number().int().describe(""),
    TerminalSubjectID: z.number().int().describe(""),
    RegionID: z.number().int().describe(""),
    TerminalName: z.string().describe(""),
    TerminalAbbrev: z.string().describe(""),
    SortSeq: z.number().int().describe(""),
    AddressLineOne: z.string().describe(""),
    AddressLineTwo: z.string().nullable().describe(""),
    City: z.string().describe(""),
    State: z.string().describe(""),
    ZipCode: z.string().describe(""),
    Country: z.string().describe(""),
    Latitude: z.number().describe(""),
    Longitude: z.number().describe(""),
    Directions: z.string().nullable().describe(""),
    DispGISZoomLoc: z
      .array(
        z
          .object({
            Latitude: z.number().describe(""),
            Longitude: z.number().describe(""),
            ZoomLevel: z.number().int().min(0).describe(""),
          })
          .describe("")
      )
      .describe(""),
    MapLink: z.string().nullable().describe(""),
  })
  .describe("");

/**
 * TerminalLocation type - represents detailed terminal location data including coordinates and addresses
 */
export type TerminalLocation = z.infer<typeof terminalLocationSchema>;

/**
 * Array of terminal location objects - wrapper around terminalLocationSchema
 */
export const terminalLocationsArraySchema = z.array(terminalLocationSchema);

// ============================================================================
// TanStack Query Hooks
//
// useTerminalLocationsByTerminalId (singular item)
// useTerminalLocations (array)
// ============================================================================

/**
 * TanStack Query hook for terminal location data with automatic updates (single item).
 *
 * @param params - Parameters object for terminal location query
 * @param params.terminalId - Unique terminal identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TerminalLocation, Error> - Query result with terminal location data
 *
 * @example
 * const { data: terminalLocation, isLoading } = useTerminalLocationsByTerminalId({ terminalId: 7 });
 * if (terminalLocation) {
 *   console.log(terminalLocation.TerminalName);  // "Seattle"
 *   console.log(terminalLocation.Latitude);  // 47.602501
 *   console.log(terminalLocation.Longitude);  // -122.340472
 * }
 */
export const useTerminalLocationsByTerminalId = (
  params: GetTerminalLocationsByTerminalIdParams,
  options?: TanStackOptions<TerminalLocation>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "locations", params.terminalId],
    queryFn: () => getTerminalLocationsByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

/**
 * TanStack Query hook for all terminal location data with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TerminalLocation[], Error> - Query result with array of terminal location data
 *
 * @example
 * const { data: terminalLocations, isLoading } = useTerminalLocations();
 * if (terminalLocations) {
 *   console.log(terminalLocations.length);  // 25
 * }
 */
export const useTerminalLocations = (
  options?: TanStackOptions<TerminalLocation[]>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "locations"],
    queryFn: getTerminalLocations,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
