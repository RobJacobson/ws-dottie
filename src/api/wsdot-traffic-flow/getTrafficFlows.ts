import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

// Import schemas from single-item endpoint
import { trafficFlowSchema } from "./getTrafficFlowById";

// ============================================================================
// API Function
//
// getTrafficFlows
// ============================================================================

const ENDPOINT =
  "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson";

/**
 * Get all traffic flow data from WSDOT Traffic Flow API
 *
 * Retrieves current traffic flow readings from all active monitoring stations across Washington State.
 * This data is collected through the Washington State Department of Transportation's vehicular traffic
 * data monitoring program, which maintains a network of permanent and short-duration traffic counters
 * that collect hourly or sub-hourly vehicle volume, classification, speed, and weight data.
 *
 * IMPORTANT: API Response Discrepancy
 * The actual WSDOT API returns FlowReadingValue as numeric values (0, 1, 2, 3, 4),
 * but the official WSDOT documentation shows string enum values:
 *     0=Unknown/NoData, 1=WideOpen, 2=Moderate, 3=Heavy, 4=StopAndGo
 * This schema uses the actual numeric values returned by the API.
 *
 * @param params - No parameters required
 * @returns Promise containing all traffic flow data with real-time conditions from monitoring stations
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const trafficFlows = await getTrafficFlows({});
 * console.log(trafficFlows[0].FlowReadingValue); // 1 (WideOpen)
 * console.log(trafficFlows[0].FlowStationLocation.RoadName); // '405' (I-405)
 * console.log(trafficFlows.find(flow => flow.StationName === '520es00028')?.FlowReadingValue); // SR 520 flow
 * ```
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
// Input Schema & Types
//
// getTrafficFlowsParamsSchema
// GetTrafficFlowsParams
// ============================================================================

export const getTrafficFlowsParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all traffic flow data. The API returns comprehensive real-time traffic flow readings from the Washington State Department of Transportation's network of permanent traffic monitoring stations. This includes flow conditions on major highways like I-405, SR 520, SR 99 Tunnel, SR 167 HOT lanes, SR 522, SR 526, SR 532, and SR 599, providing essential data for traffic monitoring, congestion analysis, and transportation planning."
  );

export type GetTrafficFlowsParams = z.infer<typeof getTrafficFlowsParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// trafficFlowArraySchema
// ============================================================================

export const trafficFlowArraySchema = z
  .array(trafficFlowSchema)
  .describe(
    "Array of traffic flow data for all active monitoring stations across Washington State highways. This comprehensive collection includes real-time flow readings from hundreds of monitoring stations on major highways including I-405 Express Toll Lanes, SR 520 Bridge, SR 99 Tunnel, SR 167 High Occupancy Toll (HOT) lanes, SR 522, SR 526, SR 532, and SR 599. Each station provides traffic flow conditions using numeric codes (0=Unknown/NoData, 1=WideOpen, 2=Moderate, 3=Heavy, 4=StopAndGo) along with geographic coordinates and location details for mapping and navigation applications."
  );

// Import types from single-item endpoint
import type { TrafficFlow } from "./getTrafficFlowById";

// ============================================================================
// TanStack Query Hook
//
// useTrafficFlows
// ============================================================================

/**
 * React Query hook for retrieving all traffic flow data from WSDOT Traffic Flow API
 *
 * Retrieves current traffic flow readings from all active monitoring stations across Washington State.
 * This hook provides real-time traffic conditions data that updates frequently to support transportation
 * planning, congestion analysis, and travel time estimation. The data includes flow conditions from
 * hundreds of monitoring stations on major highways and is essential for traffic management applications.
 *
 * @param params - No parameters required
 * @param options - Optional React Query options to override defaults
 * @returns React Query result containing traffic flow data array for real-time traffic monitoring
 *
 * @example
 * ```typescript
 * const { data: trafficFlows } = useTrafficFlows({});
 * console.log(trafficFlows[0].FlowReadingValue); // 1 (WideOpen)
 * console.log(trafficFlows[0].FlowStationLocation.RoadName); // '405' (I-405)
 * console.log(trafficFlows[0].Region); // 'Northwest' (geographic region)
 * ```
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
