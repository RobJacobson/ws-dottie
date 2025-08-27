// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./trafficFlow";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Core schemas (from single-item endpoint for consistency)
export {
  flowStationLocationSchema,
  flowStationReadingSchema,
  getTrafficFlowByIdParamsSchema,
  trafficFlowSchema,
} from "./trafficFlow";
// Array schemas
export {
  getTrafficFlowsParamsSchema,
  trafficFlowArraySchema,
} from "./trafficFlow";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  FlowStationLocation,
  GetTrafficFlowByIdParams,
  TrafficFlow,
} from "./trafficFlow";
export type { GetTrafficFlowsParams } from "./trafficFlow";

// ============================================================================
// CONSTANTS
// ============================================================================

export const WSDOT_TRAFFIC_FLOW_ENDPOINTS = {
  GET_ALL_FLOWS:
    "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson",
  GET_FLOW_BY_ID:
    "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowAsJson",
} as const;
