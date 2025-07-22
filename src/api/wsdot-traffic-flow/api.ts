// WSDOT Traffic Flow API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html
// API Help: https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc/Help

import { createFetchFunction } from "@/shared/fetching/fetchApi";

import type { TrafficFlow, TrafficFlowsResponse } from "./types";

// Module-scoped fetch function for WSDOT traffic flow API
const fetchTrafficFlow = createFetchFunction(
  "https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc"
);

/**
 * Get all traffic flow data from WSDOT Traffic Flow API
 *
 * Retrieves current traffic flow readings from all flow stations.
 *
 * @returns Promise resolving to array of traffic flow data
 */
export const getTrafficFlows = (): Promise<TrafficFlowsResponse> =>
  fetchTrafficFlow<TrafficFlowsResponse>("/GetTrafficFlowsAsJson");

/**
 * Get specific traffic flow by ID from WSDOT Traffic Flow API
 *
 * @param flowDataID - The ID of the specific traffic flow station
 * @returns Promise resolving to traffic flow record
 */
export const getTrafficFlowById = (flowDataID: number): Promise<TrafficFlow> =>
  fetchTrafficFlow<TrafficFlow>(
    `/GetTrafficFlowAsJson?FlowDataID=${flowDataID}`
  );
