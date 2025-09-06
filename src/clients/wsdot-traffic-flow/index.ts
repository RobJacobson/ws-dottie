// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./trafficFlow";

// ============================================================================
// SCHEMAS
// ============================================================================

export * from "@/schemas/wsdot-traffic-flow";

// ============================================================================
// CONSTANTS
// ============================================================================

/** Canonical WSDOT Traffic Flow endpoints */
export const WSDOT_TRAFFIC_FLOW_ENDPOINTS = {
  /** GetTrafficFlowsAsJson endpoint */
  GET_ALL_FLOWS:
    "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson",
  /** GetTrafficFlowAsJson endpoint */
  GET_FLOW_BY_ID:
    "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowAsJson",
} as const;
