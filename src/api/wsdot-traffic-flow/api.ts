// WSDOT Traffic Flow API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html
// API Help: https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc/Help

import { createApiClient } from "@/shared/fetching/apiClient";

import type { TrafficFlow } from "./types";

// Module-scoped fetch function for WSDOT traffic flow API
const fetchTrafficFlow = createApiClient(
  "https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc"
);

/**
 * Get all traffic flow data from WSDOT Traffic Flow API
 *
 * Retrieves current traffic flow readings from all flow stations.
 *
 * @returns Promise resolving to array of traffic flow data
 */
export const getTrafficFlows = (): Promise<TrafficFlow[]> =>
  fetchTrafficFlow<TrafficFlow[]>("/GetTrafficFlowsAsJson");

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
