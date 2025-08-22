import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import {
  zLatitude,
  zLongitude,
  zNullableString,
  zWsdotDate,
} from "@/shared/validation";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT = "/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson";

// ============================================================================
// API FUNCTION
// ============================================================================

/**
 * Get bridge clearances from WSDOT Bridge Clearances API
 *
 * Returns bridge clearance data for a specific route. The Route parameter is required
 * and should be a valid WSDOT route identifier (e.g., "005" for I-5).
 *
 * @param params - Object containing route parameter
 * @param params.route - The WSDOT route identifier (e.g., "005" for I-5)
 * @returns Promise containing bridge clearance data for the specified route
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const clearances = await getBridgeClearances({ route: "005" });
 * console.log(clearances[0].CrossingDescription); // "Over I-5"
 * ```
 */
export const getBridgeClearances = async (
  params: GetBridgeClearancesParams
): Promise<BridgeDataGIS[]> => {
  return zodFetch(
    `${ENDPOINT}?Route={route}`,
    {
      input: getBridgeClearancesParamsSchema,
      output: bridgeDataGisArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getBridgeClearancesParamsSchema = z
  .object({
    route: z
      .string()
      .min(1, "Route cannot be empty")
      .describe(
        "WSDOT route identifier for which to retrieve bridge clearance data. Examples include '005' for I-5, '090' for I-90, '405' for I-405. The route should be specified as a zero-padded 3-digit string for interstates (e.g., '005' not '5') or as the full route number for state routes (e.g., '20', '101')."
      ),
  })
  .describe(
    "Parameters for retrieving bridge clearance data for a specific WSDOT route"
  );

export type GetBridgeClearancesParams = z.infer<
  typeof getBridgeClearancesParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const bridgeDataGisSchema = z
  .object({
    APILastUpdate: zWsdotDate().describe(
      "Timestamp indicating when this bridge clearance data was last updated in the WSDOT system. This field shows the currency of the clearance information and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    BridgeNumber: z
      .string()
      .describe(
        "Unique identifier assigned to the bridge by WSDOT. This number is used internally by the department for bridge management, maintenance scheduling, and record keeping. It serves as the primary key for bridge identification in WSDOT systems."
      ),

    ControlEntityGuid: z
      .string()
      .describe(
        "Globally unique identifier (GUID) for the controlling entity responsible for this bridge. This typically refers to the organization or department that maintains jurisdiction over the bridge structure and its clearance specifications."
      ),

    CrossingDescription: z
      .string()
      .describe(
        "Human-readable description of what the bridge crosses over or under. Examples include 'Over I-5', 'Over Ship Canal', 'Under SR 520'. This field provides context about the bridge's location and purpose within the transportation network."
      ),

    CrossingLocationId: z
      .number()
      .describe(
        "Numeric identifier for the specific crossing location where the bridge is situated. This ID is used to correlate bridge data with other WSDOT location-based systems and databases."
      ),

    CrossingRecordGuid: z
      .string()
      .describe(
        "Globally unique identifier (GUID) for the crossing record in the WSDOT database. This serves as a permanent, unique reference for this specific bridge crossing record across all WSDOT systems."
      ),

    InventoryDirection: zNullableString().describe(
      "Direction indicator for bridge inventory purposes, typically showing the direction of travel or the orientation of the bridge structure. May be null if direction information is not applicable or not available for this bridge."
    ),

    Latitude: zLatitude().describe(
      "Latitude coordinate of the bridge location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the bridge structure. Essential for GPS navigation and geographic information systems."
    ),

    LocationGuid: z
      .string()
      .describe(
        "Globally unique identifier (GUID) for the geographic location of the bridge. This GUID can be used to correlate bridge location data with other WSDOT geographic information systems and mapping applications."
      ),

    Longitude: zLongitude().describe(
      "Longitude coordinate of the bridge location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the bridge structure. Essential for GPS navigation and geographic information systems."
    ),

    RouteDate: zWsdotDate().describe(
      "Date when the route information for this bridge was established or last verified. This timestamp indicates when the bridge's association with its current route designation was confirmed or updated in the WSDOT system."
    ),

    SRMP: z
      .number()
      .describe(
        "State Route Milepost (SRMP) indicating the precise location of the bridge along the state route. This is a decimal number representing the distance in miles from the route's origin point. Used for precise location identification and maintenance planning."
      ),

    SRMPAheadBackIndicator: zNullableString().describe(
      "Indicator showing whether the milepost measurement is ahead or back from the standard reference point. This helps clarify the exact positioning when bridges are located between standard milepost markers. May be null if not applicable."
    ),

    StateRouteID: z
      .string()
      .describe(
        "Official Washington State route identifier where the bridge is located. Examples include '005' for I-5, '090' for I-90, '101' for US-101. This is the primary route designation used by WSDOT for traffic management and navigation."
      ),

    StateStructureId: z
      .string()
      .describe(
        "Official state structure identifier assigned to the bridge by WSDOT. This ID is used for structural engineering records, inspection schedules, and maintenance planning. It serves as the primary reference for all bridge-related documentation."
      ),

    VerticalClearanceMaximumFeetInch: z
      .string()
      .describe(
        "Maximum vertical clearance under the bridge expressed in feet and inches format (e.g., '16-06' for 16 feet 6 inches). This represents the highest point where vehicles can safely pass under the bridge structure. Critical for commercial vehicle route planning."
      ),

    VerticalClearanceMaximumInches: z
      .number()
      .describe(
        "Maximum vertical clearance under the bridge expressed in total inches. This is the same measurement as VerticalClearanceMaximumFeetInch but converted to a single numeric value for easier computational use and comparison."
      ),

    VerticalClearanceMinimumFeetInch: z
      .string()
      .describe(
        "Minimum vertical clearance under the bridge expressed in feet and inches format (e.g., '15-08' for 15 feet 8 inches). This represents the lowest point where vehicles can pass under the bridge structure. This is the critical measurement for determining vehicle compatibility."
      ),

    VerticalClearanceMinimumInches: z
      .number()
      .describe(
        "Minimum vertical clearance under the bridge expressed in total inches. This is the same measurement as VerticalClearanceMinimumFeetInch but converted to a single numeric value. This is the key measurement used for route planning and vehicle restriction enforcement."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete bridge clearance information including location, identification, and clearance measurements. This schema represents comprehensive bridge data from the WSDOT Bridge Clearances API, providing essential information for commercial vehicle route planning, bridge management, and transportation safety. The clearance measurements are critical for preventing bridge strikes and ensuring safe passage of oversized vehicles."
  );

export const bridgeDataGisArraySchema = z
  .array(bridgeDataGisSchema)
  .describe(
    "Array of bridge clearance data for all bridges along a specified route. This collection provides comprehensive clearance information that enables route planning for commercial vehicles and helps prevent bridge strikes by providing accurate clearance measurements."
  );

export type BridgeDataGIS = z.infer<typeof bridgeDataGisSchema>;

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * Hook for getting bridge clearances from WSDOT Bridge Clearances API
 *
 * Returns bridge clearance data for a specific route. The Route parameter is required
 * and should be a valid WSDOT route identifier (e.g., "005" for I-5).
 *
 * @param params - Object containing route parameter
 * @param params.route - The WSDOT route identifier (e.g., "005" for I-5)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with bridge clearance data
 *
 * @example
 * ```typescript
 * const { data: clearances } = useBridgeClearances({ route: "005" });
 * console.log(clearances?.[0]?.CrossingDescription); // "Over I-5"
 * ```
 */
export const useBridgeClearances = (
  params: GetBridgeClearancesParams,
  options?: TanStackOptions<BridgeDataGIS[]>
): UseQueryResult<BridgeDataGIS[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "bridge-clearances", "getBridgeClearances", params],
    queryFn: () => getBridgeClearances(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
