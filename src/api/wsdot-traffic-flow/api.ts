// WSDOT Traffic Flow API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html
// API Help: https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc/Help

import { createFetchFactory } from "@/shared/fetching/api";

import type { TrafficFlow } from "./types";

// Create a factory function for WSDOT Traffic Flow API
const createWsdotTrafficFlowFetch = createFetchFactory(
  "https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc"
);

/**
 * Get all traffic flow data from WSDOT Traffic Flow API
 *
 * Retrieves current traffic flow readings from all flow stations.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise containing all traffic flow data
 * @throws {WsdotApiError} When the API request fails
 */
export const getTrafficFlows = createWsdotTrafficFlowFetch<TrafficFlow[]>(
  "/GetTrafficFlowsAsJson"
);

/**
 * Get specific traffic flow by ID from WSDOT Traffic Flow API
 *
 * Returns detailed information about a specific traffic flow station
 * identified by its ID.
 *
 * @param params - Object containing flowDataID and optional logMode
 * @param params.flowDataID - The ID of the specific traffic flow station
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise containing the specific traffic flow data
 * @throws {WsdotApiError} When the API request fails
 */
export const getTrafficFlowById = createWsdotTrafficFlowFetch<
  { flowDataID: number },
  TrafficFlow
>("/GetTrafficFlowAsJson?FlowDataID={flowDataID}");
