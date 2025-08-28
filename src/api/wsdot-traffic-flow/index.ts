// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./trafficFlow";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Core schemas (from single-item endpoint for consistency)
// Array schemas
export {
  flowStationLocationSchema,
  flowStationReadingSchema,
  getTrafficFlowByIdParamsSchema,
  getTrafficFlowsParamsSchema,
  trafficFlowArraySchema,
  trafficFlowSchema,
} from "./trafficFlow";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  FlowStationLocation,
  GetTrafficFlowByIdParams,
  GetTrafficFlowsParams,
  TrafficFlow,
} from "./trafficFlow";

// ============================================================================
// CONSTANTS
// ============================================================================

export const WSDOT_TRAFFIC_FLOW_ENDPOINTS = {
  GET_ALL_FLOWS:
    "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson",
  GET_FLOW_BY_ID:
    "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowAsJson",
} as const;
