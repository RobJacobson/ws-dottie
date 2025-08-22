/**
 * WSDOT Traffic Flow API - File-per-Endpoint Structure
 *
 * This module provides access to Washington State Department of Transportation
 * traffic flow data including real-time flow readings and station information.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getTrafficFlowById";
export * from "./getTrafficFlows";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type { GetTrafficFlowByIdParams } from "./getTrafficFlowById";
export type {
  FlowStationLocation,
  GetTrafficFlowsParams,
  TrafficFlow,
} from "./getTrafficFlows";
// Re-export shared schemas from one source to avoid ambiguity
export {
  flowStationLocationSchema,
  trafficFlowSchema,
} from "./getTrafficFlows";
