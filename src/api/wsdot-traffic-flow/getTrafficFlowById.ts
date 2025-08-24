import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zWsdotDate } from "@/shared/validation";

// ============================================================================
// API Function
//
// getTrafficFlowById
// ============================================================================

const ENDPOINT_BASE =
  "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowAsJson";

/**
 * Get specific traffic flow by ID from WSDOT Traffic Flow API
 *
 * Returns detailed information about a specific traffic flow station
 * identified by its ID.
 *
 * IMPORTANT: API Response Discrepancy
 * The actual WSDOT API returns FlowReadingValue as numeric values (0, 1, 2, 3, 4),
 * but the official WSDOT documentation shows string enum values:
 *     0=Unknown/NoData, 1=WideOpen, 2=Moderate, 3=Heavy, 4=StopAndGo
 * This schema uses the actual numeric values returned by the API.
 *
 * @param params - Object containing flowDataID parameter
 * @param params.flowDataID - The ID of the specific traffic flow station
 * @returns Promise containing the specific traffic flow data
 * @throws {Error} When the API request fails or validation fails
 */
export const getTrafficFlowById = async (
  params: GetTrafficFlowByIdParams
): Promise<TrafficFlow> => {
  // Build query string with flowDataID parameter
  const queryParams = new URLSearchParams();
  queryParams.append("FlowDataID", String(params.flowDataID));

  const endpoint = `${ENDPOINT_BASE}?${queryParams.toString()}`;

  return zodFetch(
    endpoint,
    {
      input: getTrafficFlowByIdParamsSchema,
      output: trafficFlowSchema,
    },
    undefined // No URL template interpolation needed since we build the URL ourselves
  );
};

// ============================================================================
// Input Schema & Types
//
// getTrafficFlowByIdParamsSchema
// GetTrafficFlowByIdParams
// ============================================================================

export const getTrafficFlowByIdParamsSchema = z
  .object({
    flowDataID: z
      .number()
      .describe(
        "Unique identifier for the specific traffic flow station to retrieve. This ID is assigned by the WSDOT system and can be obtained from the getTrafficFlows endpoint or other traffic flow listings."
      ),
  })
  .describe(
    "Parameters for retrieving a specific traffic flow station by its unique identifier."
  );

export type GetTrafficFlowByIdParams = z.infer<
  typeof getTrafficFlowByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// trafficFlowSchema
// TrafficFlow
// ============================================================================

// WSDOT Traffic Flow Reading schema based on ACTUAL API RESPONSE
//
// IMPORTANT: The actual WSDOT API returns FlowReadingValue as numeric values (0, 1, 2, 3, 4),
// not string enum values as shown in the official documentation. This schema uses the actual
// numeric values returned by the API.
//
// Numeric Value Mapping:
// - 0: Unknown/NoData
// - 1: WideOpen (free-flowing traffic)
// - 2: Moderate traffic
// - 3: Heavy traffic
// - 4: StopAndGo (congested traffic)
export const flowStationReadingSchema = z
  .number()
  .int()
  .min(0)
  .max(4)
  .describe(
    "Traffic flow reading value indicating the current traffic condition at the monitoring station. Numeric values represent traffic flow levels: 0=Unknown/NoData, 1=WideOpen (free-flowing), 2=Moderate, 3=Heavy, 4=StopAndGo (congested)."
  );

export const flowStationLocationSchema = z
  .object({
    Description: z
      .string()
      .nullable()
      .describe(
        "Human-readable description of the traffic flow station location. Examples include 'Northbound lanes', 'Bridge approach', 'Tunnel entrance', 'Interchange with SR 520', or 'Mountain pass overlook'. This field provides context about where the station is positioned."
      ),

    Direction: z
      .string()
      .nullable()
      .describe(
        "Direction of travel indicator for the traffic flow station. Examples include 'Northbound', 'Southbound', 'Eastbound', 'Westbound', 'Both Directions', 'All Lanes', or 'Eastbound and Westbound'. This field indicates which direction of travel the station monitors."
      ),

    Latitude: z
      .number()
      .nullable()
      .describe(
        "Latitude coordinate of the traffic flow station location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the station. Essential for GPS navigation and geographic information systems."
      ),

    Longitude: z
      .number()
      .nullable()
      .describe(
        "Longitude coordinate of the traffic flow station location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the station. Essential for GPS navigation and geographic information systems."
      ),

    MilePost: z
      .number()
      .nullable()
      .describe(
        "Milepost marker indicating the distance along the highway where the traffic flow station is located. This is a standard highway reference point used by transportation departments for location identification and maintenance purposes."
      ),

    RoadName: z
      .string()
      .nullable()
      .describe(
        "Name of the highway or road where the traffic flow station is located. Examples include 'I-5', 'SR 520', 'US-2', 'I-90', or 'SR 9'. This field helps users identify which roadway the station monitors."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Geographic and descriptive information about a traffic flow station location where traffic volume monitoring occurs. Contains coordinates, road information, and descriptive details that help identify and locate the specific monitoring point."
  );

export const trafficFlowSchema = z
  .object({
    FlowDataID: z
      .number()
      .nullable()
      .describe(
        "Unique identifier assigned to this traffic flow reading by the WSDOT system. This ID serves as a permanent, unique reference for the flow data across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes."
      ),

    FlowReadingValue: flowStationReadingSchema
      .nullable()
      .describe(
        "Current traffic flow reading value from the station. This field represents the traffic condition level as numeric values: 0=Unknown/NoData, 1=WideOpen (free-flowing), 2=Moderate, 3=Heavy, 4=StopAndGo (congested)."
      ),

    FlowStationLocation: flowStationLocationSchema
      .nullable()
      .describe(
        "Detailed location information for the traffic flow station including coordinates, road details, and descriptive text. This object provides comprehensive geographic context for the station position."
      ),

    Region: z
      .string()
      .nullable()
      .describe(
        "Geographic region of Washington State where the traffic flow station is located. Examples include 'Northwest', 'Northeast', 'Southwest', 'Southeast', 'Central', 'Olympic Peninsula', or 'Puget Sound'. This field helps users understand the general area where the station operates."
      ),

    StationName: z
      .string()
      .nullable()
      .describe(
        "Human-readable name for the traffic flow station that provides quick identification. Examples include 'I-5 @ NE 85th St', 'SR 520 Floating Bridge', 'I-90 Snoqualmie Pass', or 'US-2 Stevens Pass'. This field is the primary display name used in applications."
      ),

    Time: zWsdotDate()
      .nullable()
      .describe(
        "Timestamp indicating when this traffic flow reading was taken by the WSDOT system. This field shows the currency of the flow data and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete traffic flow information including flow readings, station location, and monitoring details. This schema represents comprehensive flow data from the WSDOT Traffic Flow API, providing essential information for traffic monitoring, congestion analysis, and transportation planning. The flow details are critical for real-time traffic monitoring, route planning, and transportation management systems."
  );

export type FlowStationLocation = z.infer<typeof flowStationLocationSchema>;
export type TrafficFlow = z.infer<typeof trafficFlowSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTrafficFlowById
// ============================================================================

/**
 * React Query hook for retrieving a specific traffic flow by ID
 *
 * Returns detailed information about a specific traffic flow station
 * identified by its ID.
 *
 * @param params - Object containing flowDataID parameter
 * @param params.flowDataID - The ID of the specific traffic flow station
 * @param options - Optional query options
 * @returns React Query result containing traffic flow data
 *
 * @example
 * ```typescript
 * const { data: trafficFlow } = useTrafficFlowById({
 *   flowDataID: 2482
 * });
 * console.log(trafficFlow.FlowReadingValue); // 1 (WideOpen)
 * ```
 */
export const useTrafficFlowById = (
  params: GetTrafficFlowByIdParams,
  options?: TanStackOptions<TrafficFlow>
): UseQueryResult<TrafficFlow, Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "traffic-flow",
      "getTrafficFlowById",
      JSON.stringify(params),
    ],
    queryFn: () => getTrafficFlowById(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
