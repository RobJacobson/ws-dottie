// WSDOT Traffic Flow API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html
// API Help: https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc/Help

import { zodFetch } from "@/shared/fetching";

import {
  type GetTrafficFlowByIdParams,
  type GetTrafficFlowsParams,
  getTrafficFlowByIdParamsSchema,
  getTrafficFlowsParamsSchema,
} from "./inputs";
import { trafficFlowArraySchema, trafficFlowSchema } from "./outputs";

// Base URL path for WSDOT Traffic Flow API
const WSDOT_TRAFFIC_FLOW_BASE = "/traffic/api/TrafficFlow/TrafficFlowREST.svc";

/**
 * Get all traffic flow data from WSDOT Traffic Flow API
 *
 * Retrieves current traffic flow readings from all flow stations.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all traffic flow data
 * @throws {Error} When the API request fails or validation fails
 */
export const getTrafficFlows = async (params: GetTrafficFlowsParams = {}) => {
  return zodFetch(
    `${WSDOT_TRAFFIC_FLOW_BASE}/GetTrafficFlowsAsJson`,
    {
      input: getTrafficFlowsParamsSchema,
      output: trafficFlowArraySchema,
    },
    params
  );
};

/**
 * Get specific traffic flow by ID from WSDOT Traffic Flow API
 *
 * Returns detailed information about a specific traffic flow station
 * identified by its ID.
 *
 * @param params - Object containing flowDataID parameter
 * @param params.flowDataID - The ID of the specific traffic flow station
 * @returns Promise containing the specific traffic flow data
 * @throws {Error} When the API request fails or validation fails
 */
export const getTrafficFlowById = async (params: GetTrafficFlowByIdParams) => {
  return zodFetch(
    `${WSDOT_TRAFFIC_FLOW_BASE}/GetTrafficFlowAsJson?FlowDataID={flowDataID}`,
    {
      input: getTrafficFlowByIdParamsSchema,
      output: trafficFlowSchema,
    },
    params
  );
};
