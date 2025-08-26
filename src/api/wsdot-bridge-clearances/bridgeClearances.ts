/**
 * WSDOT Bridge Clearances API
 *
 * Provides access to Washington State Department of Transportation bridge clearance data including
 * height restrictions, location information, and structural details for commercial vehicle operators.
 * This API is essential for planning routes that require specific vertical clearance requirements.
 *
 * The API returns comprehensive bridge data for specified WSDOT routes, including GPS coordinates,
 * milepost locations, and both minimum and maximum vertical clearances in both feet/inches format
 * and total inches. This data is critical for commercial vehicle route planning to prevent bridge
 * strikes and ensure safe passage for oversized vehicles.
 *
 * API Functions:
 * - getBridgeClearances: Returns an array of BridgeDataGIS objects for the specified route
 *
 * Input/Output Overview:
 * - getBridgeClearances: Input: { route: string }, Output: BridgeDataGIS[]
 *
 * Base Type: BridgeDataGIS
 *
 * interface BridgeDataGIS {
 *   APILastUpdate: Date;
 *   BridgeNumber: string | null;
 *   ControlEntityGuid: string;
 *   CrossingDescription: string | null;
 *   CrossingLocationId: number;
 *   CrossingRecordGuid: string;
 *   InventoryDirection: string | null;
 *   Latitude: number;
 *   LocationGuid: string;
 *   Longitude: number;
 *   RouteDate: Date;
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
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson?Route=005&AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "APILastUpdate": "/Date(1756176829000-0700)/",
 *     "BridgeNumber": "005-001",
 *     "ControlEntityGuid": "12345678-1234-1234-1234-123456789012",
 *     "CrossingDescription": "Bridge over river",
 *     "CrossingLocationId": 12345,
 *     "CrossingRecordGuid": "87654321-4321-4321-4321-210987654321",
 *     "InventoryDirection": "I",
 *     "Latitude": 47.6062,
 *     "LocationGuid": "11111111-2222-3333-4444-555555555555",
 *     "Longitude": -122.3321,
 *     "RouteDate": "/Date(1756176829000-0700)/",
 *     "SRMP": 123.45,
 *     "SRMPAheadBackIndicator": null,
 *     "StateRouteID": "005",
 *     "StateStructureId": "12345678",
 *     "VerticalClearanceMaximumFeetInch": "16' 6\"",
 *     "VerticalClearanceMaximumInches": 198,
 *     "VerticalClearanceMinimumFeetInch": "16' 0\"",
 *     "VerticalClearanceMinimumInches": 192
 *   }
 * ]
 * ```
 *
 * Note: The API requires a valid WSDOT access token. Route IDs should be in the format "005" for I-5,
 * "090" for I-90, etc. The API returns bridge clearance data for commercial vehicle operators to plan
 * routes with height restrictions.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zLatitude,
  zLongitude,
  zNullableString,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Function
//
// getBridgeClearances
// ============================================================================

const ENDPOINT =
  "/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson?Route={route}";

/**
 * Retrieves bridge clearance data for a specific WSDOT route.
 *
 * @param params - Parameters object for bridge clearance query
 * @param params.route - Route identifier (e.g., "005" for I-5, "090" for I-90, "405" for I-405)
 * @returns Promise<BridgeDataGIS[]> - Array of bridge clearance and location data
 *
 * @example
 * const bridgeData = await getBridgeClearances({ route: "005" });
 * console.log(bridgeData.length);  // 25
 * console.log(bridgeData[0].BridgeNumber);  // "005-001"
 * console.log(bridgeData[0].VerticalClearanceMinimumInches);  // 192
 * console.log(bridgeData[0].Latitude);  // 47.6062
 * console.log(bridgeData[0].CrossingDescription);  // "Bridge over river"
 * console.log(bridgeData[0].SRMP);  // 123.45
 *
 * @throws {Error} When route parameter is invalid or API is unavailable
 */
export const getBridgeClearances = async (
  params: GetBridgeClearancesParams
): Promise<BridgeDataGIS[]> => {
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
// Input Schema & Types
//
// getBridgeClearancesParamsSchema
// GetBridgeClearancesParams
// ============================================================================

/**
 * Parameters for retrieving bridge clearance data for a specific WSDOT route
 */
export const getBridgeClearancesParamsSchema = z
  .object({
    route: z.string().min(1, "Route cannot be empty").describe(""),
  })
  .describe("");

export type GetBridgeClearancesParams = z.infer<
  typeof getBridgeClearancesParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// bridgeDataGisSchema
// BridgeDataGIS
// ============================================================================

/**
 * Bridge clearance data schema - includes height restrictions, location, and structural information for WSDOT bridges
 */
export const bridgeDataGisSchema = z
  .object({
    APILastUpdate: zWsdotDate().describe(""),

    BridgeNumber: z.string().nullable().describe(""),

    ControlEntityGuid: z.string().describe(""),

    CrossingDescription: z.string().nullable().describe(""),

    CrossingLocationId: z.number().describe(""),

    CrossingRecordGuid: z.string().describe(""),

    InventoryDirection: zNullableString().describe(""),

    Latitude: zLatitude().describe(""),

    LocationGuid: z.string().describe(""),

    Longitude: zLongitude().describe(""),

    RouteDate: zWsdotDate().describe(""),

    SRMP: z.number().describe(""),

    SRMPAheadBackIndicator: zNullableString().describe(""),

    StateRouteID: z.string().nullable().describe(""),

    StateStructureId: z.string().nullable().describe(""),

    VerticalClearanceMaximumFeetInch: z.string().nullable().describe(""),

    VerticalClearanceMaximumInches: z.number().describe(""),

    VerticalClearanceMinimumFeetInch: z.string().nullable().describe(""),

    VerticalClearanceMinimumInches: z.number().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

/**
 * Array of bridge clearance objects - wrapper around bridgeDataGisSchema for multiple bridge results
 */
export const bridgeDataGisArraySchema = z
  .array(bridgeDataGisSchema)
  .describe("");

/**
 * BridgeDataGIS type - represents bridge clearance and location data for WSDOT bridges
 */
export type BridgeDataGIS = z.infer<typeof bridgeDataGisSchema>;

// ============================================================================
// TanStack Query Hook
//
// useBridgeClearances
// ============================================================================

/**
 * TanStack Query hook for bridge clearance data with automatic updates (array).
 *
 * @param params - Parameters object for bridge clearance query
 * @param params.route - Route identifier (e.g., "005" for I-5, "090" for I-90, "405" for I-405)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<BridgeDataGIS[], Error> - Query result with bridge clearance data
 *
 * @example
 * const { data: bridgeData, isLoading } = useBridgeClearances({ route: "005" });
 * if (bridgeData) {
 *   console.log(bridgeData.length);  // 25
 *   console.log(bridgeData[0].BridgeNumber);  // "005-001"
 *   console.log(bridgeData[0].VerticalClearanceMinimumInches);  // 192
 *   console.log(bridgeData[0].CrossingDescription);  // "Bridge over river"
 *   console.log(bridgeData[0].SRMP);  // 123.45
 * }
 */
export const useBridgeClearances = (
  params: GetBridgeClearancesParams,
  options?: TanStackOptions<BridgeDataGIS[]>
): UseQueryResult<BridgeDataGIS[], Error> => {
  return useQuery({
    queryKey: ["api", "wsdot", "bridge-clearances", JSON.stringify(params)],
    queryFn: () => getBridgeClearances(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
