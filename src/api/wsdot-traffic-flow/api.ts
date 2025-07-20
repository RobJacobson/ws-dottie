// WSDOT Traffic Flow API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html
// API Help: https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc/Help

import { fetchWsdot } from "@/shared/fetching/fetch";

import type { TrafficFlow, TrafficFlowsResponse } from "./types";

/**
 * Retrieves all traffic flow data from WSDOT API
 *
 * @returns Promise resolving to an array of traffic flow data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const trafficFlows = await getTrafficFlows();
 * console.log(trafficFlows[0].FlowReadingValue); // 1
 * ```
 */
export const getTrafficFlows = async (): Promise<TrafficFlowsResponse> => {
  return await fetchWsdot<TrafficFlowsResponse>(
    "trafficFlow",
    "/GetTrafficFlowsAsJson"
  );
};

/**
 * Retrieves a specific traffic flow by ID from WSDOT API
 *
 * @param flowDataId - The ID of the specific traffic flow station
 * @returns Promise resolving to a traffic flow record
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const trafficFlow = await getTrafficFlowById(2482);
 * console.log(trafficFlow.FlowReadingValue); // 1
 * ```
 */
export const getTrafficFlowById = async (
  flowDataId: number
): Promise<TrafficFlow> => {
  return await fetchWsdot<TrafficFlow>(
    "trafficFlow",
    `/GetTrafficFlowAsJson?FlowDataID=${flowDataId}`
  );
};
