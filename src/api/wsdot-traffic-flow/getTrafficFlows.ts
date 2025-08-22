import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zWsdotDate } from "@/shared/validation";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson";

// ============================================================================
// API FUNCTION
// ============================================================================

/**
 * Get all traffic flow data from WSDOT Traffic Flow API
 *
 * Retrieves current traffic flow readings from all flow stations.
 *
 * @param params - No parameters required
 * @returns Promise containing all traffic flow data
 * @throws {Error} When the API request fails or validation fails
 */
export const getTrafficFlows = async (
  params: GetTrafficFlowsParams
): Promise<TrafficFlow[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTrafficFlowsParamsSchema,
      output: trafficFlowArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTrafficFlowsParamsSchema = z
  .object({})
  .describe(
    "Parameters for getting all traffic flow data. No parameters required."
  );

export type GetTrafficFlowsParams = z.infer<typeof getTrafficFlowsParamsSchema>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// WSDOT Traffic Flow Reading enum based on official API specification
export const flowStationReadingSchema = z
  .number()
  .int()
  .min(0)
  .max(4)
  .describe(
    "Traffic flow reading value from the monitoring station. Numeric values 0-4 represent traffic flow levels as defined by the WSDOT API."
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
        "Current traffic flow reading value from the station. This field represents the traffic condition level, not a numeric measurement. Values include 'WideOpen' (free-flowing), 'Moderate', 'Heavy', 'StopAndGo' (congested), 'Unknown', or 'NoData'."
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

export const trafficFlowArraySchema = z
  .array(trafficFlowSchema)
  .describe(
    "Array of traffic flow data for all active monitoring stations across Washington State highways. This collection provides comprehensive flow information that enables traffic monitoring, congestion analysis, and transportation planning."
  );

export type FlowStationLocation = z.infer<typeof flowStationLocationSchema>;
export type TrafficFlow = z.infer<typeof trafficFlowSchema>;

// ============================================================================
// REACT QUERY HOOK
// ============================================================================

/**
 * React Query hook for retrieving all traffic flow data
 *
 * Retrieves current traffic flow readings from all flow stations.
 *
 * @param params - No parameters required
 * @param options - Optional query options
 * @returns React Query result containing traffic flow data
 *
 * @example
 * ```typescript
 * const { data: trafficFlows } = useTrafficFlows({});
 * console.log(trafficFlows[0].FlowReadingValue); // "WideOpen"
 * ```
 */
export const useTrafficFlows = (
  params: GetTrafficFlowsParams,
  options?: TanStackOptions<TrafficFlow[]>
): UseQueryResult<TrafficFlow[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "traffic-flow", "getTrafficFlows", params],
    queryFn: () => getTrafficFlows(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
