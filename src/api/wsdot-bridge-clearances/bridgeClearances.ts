import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zLatitude,
  zLongitude,
  zNullableString,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";
import { tanstackQueryOptions } from "@/shared/tanstack";

/**
 * WSDOT Bridge Clearances API
 *
 * Bridge clearance data for Washington State highways, providing vertical clearance
 * measurements for bridges and overpasses to help with route planning for vehicles
 * carrying tall loads.
 *
 * Provides:
 * - Vertical clearance measurements in both feet/inches and total inches
 * - Bridge location information including geographic coordinates and milepost data
 * - Route-specific bridge data for planning oversized load transportation
 * - State Route ID and bridge identification information
 * - Enables applications to help drivers avoid bridges with insufficient clearance
 *
 * Data includes:
 * - Bridge identification numbers and descriptions
 * - Minimum and maximum vertical clearance measurements
 * - Geographic location data with GPS coordinates
 * - State route and milepost information
 * - Bridge direction and inventory data
 *
 * @functions
 * - getBridgeClearances: Returns an array of BridgeDataGIS objects for bridges on the specified route
 *
 * @input
 * - getBridgeClearances: { route: string } - State route identifier (e.g., "005" for I-5)
 *
 * @output
 * - getBridgeClearances: BridgeDataGIS[] - Array of bridge clearance data for the specified route
 *
 * @baseType
 * interface BridgeDataGIS {
 *   APILastUpdate: Date; // Transformed from .NET timestamp to JS Date
 *   BridgeNumber: string | null;
 *   ControlEntityGuid: string;
 *   CrossingDescription: string | null;
 *   CrossingLocationId: number;
 *   CrossingRecordGuid: string;
 *   InventoryDirection: string | null;
 *   Latitude: number;
 *   Longitude: number;
 *   RouteDate: Date; // Transformed from .NET timestamp to JS Date
 *   SRMP: number;
 *   SRMPAheadBackIndicator: string | null;
 *   StateRouteID: string | null;
 *   StateStructureId: string | null;
 *   VerticalClearanceMaximumFeetInch: string | null;
 *   VerticalClearanceMaximumInches: number;
 *   VerticalClearanceMinimumFeetInch: string | null;
 *   VerticalClearanceMinimumInches: number;
 * }
 *
 * @curl
 * curl -s "https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson?Route=005&AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * @exampleResponse
 * Here is example output from ws-dottie (transformed from raw API response):
 *
 * ```json
 * [
 *   {
 *     "APILastUpdate": "2025-08-27T10:30:02.330Z",
 *     "BridgeNumber": "5/629A",
 *     "ControlEntityGuid": "88ba5341-b39c-43c9-95a5-bc9584b2d798",
 *     "CrossingDescription": "I-5 RAMPS UNDER BROADWAY AVE",
 *     "CrossingLocationId": 6192,
 *     "CrossingRecordGuid": "9b764b55-9fc1-4448-8b0b-3f35b83d6f5f",
 *     "InventoryDirection": "I",
 *     "Latitude": 47.961343,
 *     "Longitude": -122.200516,
 *     "RouteDate": "2016-12-31T08:00:00.000Z",
 *     "SRMP": 0,
 *     "SRMPAheadBackIndicator": "A",
 *     "StateRouteID": "005S119195",
 *     "StateStructureId": "0003842B",
 *     "VerticalClearanceMaximumFeetInch": "14 ft 5 in",
 *     "VerticalClearanceMaximumInches": 173,
 *     "VerticalClearanceMinimumFeetInch": "14 ft 1 in",
 *     "VerticalClearanceMinimumInches": 169
 *   }
 * ]
 * ```
 *
 * Note: APILastUpdate and RouteDate fields are transformed from .NET timestamps to ISO 8601 format.
 *
 * @see {@link https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc WSDOT Bridge Clearances API}
 * @see {@link https://wsdot.wa.gov/Traffic/api/ WSDOT Traffic APIs}
 */

// ============================================================================
// API Functions
// ============================================================================

const ENDPOINT =
  "/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson?Route={route}";

/**
 * Retrieves bridge clearance data for all bridges on a specified state route.
 *
 * @param params - Parameters object for bridge clearance query
 * @param params.route - State route identifier (e.g., "005" for I-5, "099" for SR 99)
 * @returns Promise<BridgeDataGIS[]> - Array of bridge clearance data for the specified route
 *
 * @example
 * const clearances = await getBridgeClearances({ route: "005" });
 * console.log(clearances.length);  // 150
 * console.log(clearances[0].CrossingDescription);  // "I-5 RAMPS UNDER BROADWAY AVE"
 * console.log(clearances[0].VerticalClearanceMinimumInches);  // 169
 *
 * @throws {Error} When route parameter is invalid or API is unavailable
 */
export const getBridgeClearances = async (
  params: GetBridgeClearancesParams
): Promise<BridgeDataGISArray> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getBridgeClearancesParamsSchema,
      output: bridgeDataGisArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
// ============================================================================

/**
 * Parameters for retrieving bridge clearance data for a specific state route
 */
export const getBridgeClearancesParamsSchema = z.object({
  route: z.string().min(1, "Route cannot be empty"),
});

/**
 * GetBridgeClearancesParams type - represents parameters for bridge clearance queries
 */
export type GetBridgeClearancesParams = z.infer<
  typeof getBridgeClearancesParamsSchema
>;

// ============================================================================
// Output Schemas & Types
// ============================================================================

/**
 * Bridge clearance data schema - comprehensive bridge information including vertical clearance measurements
 */
export const bridgeDataGisSchema = z.object({
  APILastUpdate: zWsdotDate(),

  BridgeNumber: z.string().nullable(),

  ControlEntityGuid: z.string(),

  CrossingDescription: z.string().nullable(),

  CrossingLocationId: z.number(),

  CrossingRecordGuid: z.string(),

  InventoryDirection: zNullableString(),

  Latitude: zLatitude(),

  LocationGuid: z.string(),

  Longitude: zLongitude(),

  RouteDate: zWsdotDate(),

  SRMP: z.number(),

  SRMPAheadBackIndicator: zNullableString(),

  StateRouteID: z.string().nullable(),

  StateStructureId: z.string().nullable(),

  VerticalClearanceMaximumFeetInch: z.string().nullable(),

  VerticalClearanceMaximumInches: z.number(),

  VerticalClearanceMinimumFeetInch: z.string().nullable(),

  VerticalClearanceMinimumInches: z.number(),
});

/**
 * BridgeDataGIS type - represents comprehensive bridge clearance data with geographic and structural information
 */
export type BridgeDataGIS = z.infer<typeof bridgeDataGisSchema>;

/**
 * Array of bridge clearance data objects - wrapper around bridgeDataGisSchema
 */
export const bridgeDataGisArraySchema = z.array(bridgeDataGisSchema);

/**
 * BridgeDataGISArray type - represents an array of bridge clearance data objects
 */
export type BridgeDataGISArray = z.infer<typeof bridgeDataGisArraySchema>;

// ============================================================================
// TanStack Query Hooks
// ============================================================================

/**
 * TanStack Query hook for bridge clearance data with automatic daily updates.
 *
 * @param params - Parameters object for bridge clearance query
 * @param params.route - State route identifier (e.g., "005" for I-5, "099" for SR 99)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<BridgeDataGIS[], Error> - Query result with bridge clearance data array
 *
 * @example
 * const { data: clearances, isLoading } = useBridgeClearances({ route: "005" });
 * if (clearances) {
 *   console.log(clearances.length);  // 150
 *   console.log(clearances[0].VerticalClearanceMinimumInches);  // 169
 * }
 */
export const useBridgeClearances = (
  params: GetBridgeClearancesParams,
  options?: UseQueryOptions<BridgeDataGISArray, Error>
) => {
  return useQuery({
    queryKey: ["api", "wsdot", "bridge-clearances", JSON.stringify(params)],
    queryFn: () => getBridgeClearances(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
