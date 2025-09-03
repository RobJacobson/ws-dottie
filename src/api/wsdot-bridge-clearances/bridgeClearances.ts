/**
 * @module WSDOT Bridge Clearances API
 * @description Bridge clearance data for Washington State highways, providing vertical clearance
 * measurements for bridges and overpasses to help with route planning for vehicles carrying tall loads.
 *
 * Provides:
 * - Vertical clearance measurements in feet/inches and total inches
 * - Bridge location information (GPS coordinates) and milepost data
 * - Route-specific bridge data for planning oversized load transportation
 * - State Route ID and bridge identification information
 *
 * Data includes:
 * - Bridge identification numbers and descriptions
 * - Minimum and maximum vertical clearance measurements
 * - Geographic location data with GPS coordinates
 * - State route and milepost information
 * - Bridge direction and inventory data
 *
 * @functions
 *   - getBridgeClearances: Returns an array of BridgeDataGIS objects for bridges on the specified route
 *
 * @input
 *   - getBridgeClearances: { route: string } - State route identifier (e.g., "005" for I-5)
 *
 * @output
 *   - getBridgeClearances: BridgeDataGIS[] - Array of bridge clearance data for the specified route
 *
 * @baseType
 *   - BridgeDataGIS: Comprehensive bridge clearance data with geographic and structural information
 *   - BridgeDataGISArray: Array wrapper for BridgeDataGIS objects
 *
 * @cli
 *   - getBridgeClearances: node dist/cli.mjs getBridgeClearances '{"route":"005"}'
 *
 * @exampleResponse
 * {
 *   "APILastUpdate": "2025-08-28T10:30:02.217Z",
 *   "BridgeNumber": "5/722",
 *   "ControlEntityGuid": "5816685f-1f00-4344-8888-43cdcacf7153",
 *   "CrossingDescription": "I-5 UNDER BOW HILL RD",
 *   "CrossingLocationId": 7224,
 *   "CrossingRecordGuid": "ba5ac02e-85ea-4e74-b740-7cbd4b595779",
 *   "InventoryDirection": "D",
 *   "Latitude": 48.557581,
 *   "LocationGuid": "c276f68a-fd11-4373-942f-b2d6aa250a1c",
 *   "Longitude": -122.350011,
 *   "RouteDate": "2016-12-31T08:00:00.000Z",
 *   "SRMP": 236.39,
 *   "SRMPAheadBackIndicator": "A",
 *   "StateRouteID": "005",
 *   "StateStructureId": "0007086A",
 *   "VerticalClearanceMaximumFeetInch": "16 ft 8 in",
 *   "VerticalClearanceMaximumInches": 200,
 *   "VerticalClearanceMinimumFeetInch": "16 ft 6 in",
 *   "VerticalClearanceMinimumInches": 198
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html
 */
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zLatitude,
  zLongitude,
  zNullableString,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";
// tanstackQueryOptions no longer used here after hook removal
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

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
  route: z.string().nullable().optional(),
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

// ==========================================================================
// TanStack Query Options (new pattern)
// ==========================================================================

export const bridgeClearancesOptions = (params: GetBridgeClearancesParams) =>
  queryOptions({
    queryKey: ["wsdot", "bridge-clearances", "getBridgeClearances", params],
    queryFn: () => getBridgeClearances(params),
    // Bridge data updates are infrequent; use one-day cadence
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
