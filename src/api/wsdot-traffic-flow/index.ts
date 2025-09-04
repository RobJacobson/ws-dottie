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
  /** Station location schema */
  flowStationLocationSchema,
  /** Numeric flow reading schema */
  flowStationReadingSchema,
  /** Params schema for getTrafficFlowById */
  getTrafficFlowByIdParamsSchema,
  /** Params schema for getTrafficFlows */
  getTrafficFlowsParamsSchema,
  /** Traffic flow array schema */
  trafficFlowArraySchema,
  /** Traffic flow item schema */
  trafficFlowSchema,
} from "./trafficFlow";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  /** Station location type */
  FlowStationLocation,
  /** Params type for getTrafficFlowById */
  GetTrafficFlowByIdParams,
  /** Params type for getTrafficFlows */
  GetTrafficFlowsParams,
  /** Traffic flow item type */
  TrafficFlow,
} from "./trafficFlow";

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
