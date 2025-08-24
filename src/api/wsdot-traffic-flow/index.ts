/**
 * WSDOT Traffic Flow API - Complete Export Module
 *
 * This module provides access to Washington State Department of Transportation
 * traffic flow data including real-time flow readings and station information.
 *
 * IMPORTANT: API Response Discrepancy
 *
 * The actual WSDOT API returns FlowReadingValue as numeric values (0, 1, 2, 3, 4),
 * but the official WSDOT documentation shows string enum values. This schema uses
 * the actual numeric values returned by the API.
 *
 * Numeric Value Mapping:
 * - 0: Unknown/NoData
 * - 1: WideOpen (free-flowing traffic)
 * - 2: Moderate traffic
 * - 3: Heavy traffic
 * - 4: StopAndGo (congested traffic)
 *
 * Following PRD guidance: when official documentation and actual API behavior differ,
 * the actual API response is authoritative for field types.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getTrafficFlowById";
export * from "./getTrafficFlows";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Core schemas (from single-item endpoint for consistency)
export {
  flowStationLocationSchema,
  flowStationReadingSchema,
  getTrafficFlowByIdParamsSchema,
  trafficFlowSchema,
} from "./getTrafficFlowById";
// Array schemas
export {
  getTrafficFlowsParamsSchema,
  trafficFlowArraySchema,
} from "./getTrafficFlows";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  FlowStationLocation,
  GetTrafficFlowByIdParams,
  TrafficFlow,
} from "./getTrafficFlowById";
export type { GetTrafficFlowsParams } from "./getTrafficFlows";

// ============================================================================
// CONSTANTS
// ============================================================================

export const WSDOT_TRAFFIC_FLOW_ENDPOINTS = {
  GET_ALL_FLOWS:
    "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson",
  GET_FLOW_BY_ID:
    "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowAsJson",
} as const;
