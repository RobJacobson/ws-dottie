/**
 * Map Areas API
 *
 * Retrieves available geographic map areas used for filtering highway alerts within Washington state.
 * This API provides the list of valid map area names that can be used with the getHighwayAlertsByMapArea
 * endpoint to get localized traffic information for specific regions.
 *
 * The API returns a list of map areas with descriptive names, allowing applications to present
 * users with available filtering options and provide region-specific traffic alert functionality.
 *
 * API Functions:
 * - getMapAreas: Returns an array of MapArea objects for all available map areas
 *
 * Input/Output Overview:
 * - getMapAreas: Input: none, Output: MapArea[]
 *
 * Base Type: MapArea
 *
 * interface MapArea {
 *   MapArea: string;
 *   MapAreaDescription: string;
 * }
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetMapAreasAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "MapArea": "Seattle",
 *     "MapAreaDescription": "Seattle metropolitan area"
 *   },
 *   {
 *     "MapArea": "Tacoma",
 *     "MapAreaDescription": "Tacoma and surrounding areas"
 *   },
 *   {
 *     "MapArea": "Spokane",
 *     "MapAreaDescription": "Spokane and eastern Washington"
 *   },
 *   {
 *     "MapArea": "Olympia",
 *     "MapAreaDescription": "Olympia and state capital region"
 *   }
 * ]
 * ```
 *
 * Note: The API requires a valid WSDOT access token. Map areas are predefined geographic regions
 * used by WSDOT for organizing and filtering traffic alert information. These areas can be used
 * with the getHighwayAlertsByMapArea endpoint to get filtered alerts.
 */

import type { UseQueryResult, UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

// ============================================================================
// API Function
//
// getMapAreas
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetMapAreasAsJson";

/**
 * Retrieves all available geographic map areas for filtering highway alerts.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<MapArea[]> - Array of available map areas with descriptions
 *
 * @example
 * const mapAreas = await getMapAreas();
 * console.log(mapAreas.length);  // 4
 * console.log(mapAreas[0].MapArea);  // "Seattle"
 * console.log(mapAreas[0].MapAreaDescription);  // "Seattle metropolitan area"
 *
 * @throws {Error} When API is unavailable
 */
export const getMapAreas = async (
  params: GetMapAreasParams = {}
): Promise<MapArea[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getMapAreasParamsSchema,
      output: mapAreasArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getMapAreasParamsSchema
// GetMapAreasParams
// ============================================================================

/**
 * Parameters for retrieving map areas (no parameters required)
 */
export const getMapAreasParamsSchema = z.object({}).describe("");

export type GetMapAreasParams = z.infer<typeof getMapAreasParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// mapAreaSchema
// MapArea
// ============================================================================

/**
 * Map area schema - represents a geographic region for filtering highway alerts
 */
export const mapAreaSchema = z
  .object({
    MapArea: z.string().describe(""),

    MapAreaDescription: z.string().describe(""),
  })
  
  .describe("");

/**
 * Array of map area objects - wrapper around mapAreaSchema
 */
export const mapAreasArraySchema = z.array(mapAreaSchema).describe("");

export type MapArea = z.infer<typeof mapAreaSchema>;

// ============================================================================
// TanStack Query Hook
//
// useMapAreas
// ============================================================================

/**
 * TanStack Query hook for map areas data with automatic updates.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<MapArea[], Error> - Query result with map areas data
 *
 * @example
 * const { data: mapAreas, isLoading } = useMapAreas();
 * if (mapAreas) {
 *   console.log(mapAreas.length);  // 4
 * }
 */
export const useMapAreas = (
  params: GetMapAreasParams = {},
  options?: UseQueryOptions<MapArea[], Error>
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "highway-alerts",
      "getMapAreas",
      JSON.stringify(params),
    ],
    queryFn: () => getMapAreas(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
