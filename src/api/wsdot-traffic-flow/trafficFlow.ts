/**
 * WSDOT Traffic Flow API
 *
 * Real-time traffic flow data from Washington State Department of Transportation
 * traffic monitoring stations across major highways and roadways. Provides
 * current traffic conditions including flow readings, station locations, and
 * operational status for transportation planning and monitoring.
 *
 * This API returns traffic flow readings as numeric values (0-4) representing
 * different congestion levels, along with detailed station location information
 * including GPS coordinates, mile markers, and road names. Data covers major
 * highways like I-5, I-405, I-90, SR-520, and other state routes across
 * Washington's transportation network.
 *
 * API Functions:
 * - getTrafficFlowById: Returns one TrafficFlow object for the specified FlowDataID
 * - getTrafficFlows: Returns an array of TrafficFlow objects for all active stations
 *
 * Input/Output Overview:
 * - getTrafficFlowById: Input: { flowDataID: number }, Output: TrafficFlow
 * - getTrafficFlows: Input: none, Output: TrafficFlow[]
 *
 * Base Type: TrafficFlow
 *
 * interface TrafficFlow {
 *   FlowDataID: number | null;
 *   FlowReadingValue: number | null;
 *   FlowStationLocation: FlowStationLocation | null;
 *   Region: string | null;
 *   StationName: string | null;
 *   Time: Date | null;
 * }
 *
 * interface FlowStationLocation {
 *   Description: string | null;
 *   Direction: string | null;
 *   Latitude: number | null;
 *   Longitude: number | null;
 *   MilePost: number | null;
 *   RoadName: string | null;
 * }
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowAsJson?FlowDataID=2447&AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from the single flow endpoint:
 *
 * ```json
 * {
 *   "FlowDataID": 2447,
 *   "FlowReadingValue": 1,
 *   "FlowStationLocation": {
 *     "Description": "I-90 Interchange",
 *     "Direction": "SB",
 *     "Latitude": 47.582422547,
 *     "Longitude": -122.175886938,
 *     "MilePost": 11.28,
 *     "RoadName": "405"
 *   },
 *   "Region": "Northwest",
 *   "StationName": "405es01128",
 *   "Time": "/Date(1756189402000-0700)/"
 * }
 * ```
 *
 * FlowReadingValue Mapping:
 * - 0: Unknown/NoData
 * - 1: WideOpen (free-flowing traffic)
 * - 2: Moderate traffic
 * - 3: Heavy traffic
 * - 4: StopAndGo (congested traffic)
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Functions
//
// getTrafficFlowById (single item)
// getTrafficFlows (array)
// ============================================================================

const ENDPOINT_BASE =
  "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowAsJson";
const ALL_FLOWS_ENDPOINT =
  "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson";

/**
 * Retrieves real-time traffic flow data for a specific station by its FlowDataID.
 *
 * @param params - Parameters object for traffic flow query
 * @param params.flowDataID - Unique traffic flow station identifier (positive integer)
 * @returns Promise<TrafficFlow> - Real-time traffic flow data for the specified station
 *
 * @example
 * const trafficFlow = await getTrafficFlowById({ flowDataID: 2447 });
 * console.log(trafficFlow.FlowReadingValue);  // 1
 * console.log(trafficFlow.StationName);  // "405es01128"
 * console.log(trafficFlow.FlowStationLocation?.Description);  // "I-90 Interchange"
 *
 * @throws {Error} When FlowDataID is invalid or API is unavailable
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

/**
 * Retrieves real-time traffic flow data for all active monitoring stations.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<TrafficFlow[]> - Array of real-time traffic flow data from all stations
 *
 * @example
 * const trafficFlows = await getTrafficFlows();
 * console.log(trafficFlows.length);  // 200+
 *
 * @throws {Error} When API is unavailable
 */
export const getTrafficFlows = async (
  params: GetTrafficFlowsParams
): Promise<TrafficFlow[]> => {
  return zodFetch(
    ALL_FLOWS_ENDPOINT,
    {
      input: getTrafficFlowsParamsSchema,
      output: trafficFlowArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTrafficFlowById (single item)
// getTrafficFlows (array)
// ============================================================================

/**
 * Parameters for retrieving real-time traffic flow data for a specific station
 */
export const getTrafficFlowByIdParamsSchema = z
  .object({
    flowDataID: z.number().describe(""),
  })
  .describe("");

export type GetTrafficFlowByIdParams = z.infer<
  typeof getTrafficFlowByIdParamsSchema
>;

/**
 * Parameters for retrieving all traffic flow data (no parameters required)
 */
export const getTrafficFlowsParamsSchema = z.object({}).describe("");

export type GetTrafficFlowsParams = z.infer<typeof getTrafficFlowsParamsSchema>;

// ============================================================================
// Output Schemas & Types
//
// trafficFlow (shared schema)
// trafficFlowArray (array wrapper)
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
/**
 * Traffic flow reading value schema - represents congestion levels as numeric values
 */
export const flowStationReadingSchema = z
  .number()
  .int()
  .min(0)
  .max(4)
  .describe("");

/**
 * Traffic station location schema - includes GPS coordinates, mile markers, and road information
 */
export const flowStationLocationSchema = z
  .object({
    Description: z.string().nullable().describe(""),
    Direction: z.string().nullable().describe(""),
    Latitude: z.number().nullable().describe(""),
    Longitude: z.number().nullable().describe(""),
    MilePost: z.number().nullable().describe(""),
    RoadName: z.string().nullable().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

/**
 * Traffic flow data schema - combines flow readings with station location and metadata
 */
export const trafficFlowSchema = z
  .object({
    FlowDataID: z.number().nullable().describe(""),
    FlowReadingValue: flowStationReadingSchema.nullable().describe(""),
    FlowStationLocation: flowStationLocationSchema.nullable().describe(""),
    Region: z.string().nullable().describe(""),
    StationName: z.string().nullable().describe(""),
    Time: zWsdotDate().nullable().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

/**
 * Array of traffic flow objects - wrapper around trafficFlowSchema
 */
export const trafficFlowArraySchema = z.array(trafficFlowSchema).describe("");

export type FlowStationLocation = z.infer<typeof flowStationLocationSchema>;
export type TrafficFlow = z.infer<typeof trafficFlowSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTrafficFlowById (single item)
// useTrafficFlows (array)
// ============================================================================

/**
 * TanStack Query hook for traffic flow data with automatic updates (single item).
 *
 * @param params - Parameters object for traffic flow query
 * @param params.flowDataID - Unique traffic flow station identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TrafficFlow, Error> - Query result with real-time traffic flow data
 *
 * @example
 * const { data: trafficFlow, isLoading } = useTrafficFlowById({ flowDataID: 2447 });
 * if (trafficFlow) {
 *   console.log(trafficFlow.FlowReadingValue);  // 1
 *   console.log(trafficFlow.StationName);  // "405es01128"
 * }
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

/**
 * TanStack Query hook for all traffic flow data with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TrafficFlow[], Error> - Query result with array of real-time traffic flow data
 *
 * @example
 * const { data: trafficFlows, isLoading } = useTrafficFlows();
 * if (trafficFlows) {
 *   console.log(trafficFlows.length);  // 200+
 * }
 */
export const useTrafficFlows = (
  params: GetTrafficFlowsParams,
  options?: TanStackOptions<TrafficFlow[]>
): UseQueryResult<TrafficFlow[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "traffic-flow",
      "getTrafficFlows",
      JSON.stringify(params),
    ],
    queryFn: () => getTrafficFlows(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
