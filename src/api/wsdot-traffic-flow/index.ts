/**
 * WSDOT Traffic Flow API - File-per-Endpoint Structure
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
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export { getTrafficFlowById, useTrafficFlowById } from "./getTrafficFlowById";
export { getTrafficFlows, useTrafficFlows } from "./getTrafficFlows";

// ============================================================================
// SCHEMAS & TYPES
// ============================================================================

// ============================================================================
// SCHEMAS & TYPES
// ============================================================================

// Export types directly from their source files (no re-export chains)
export type {
  FlowStationLocation,
  GetTrafficFlowByIdParams,
  TrafficFlow,
} from "./getTrafficFlowById";
// Export schemas from their source files
export {
  flowStationLocationSchema,
  flowStationReadingSchema,
  trafficFlowSchema,
} from "./getTrafficFlowById";
export type { GetTrafficFlowsParams } from "./getTrafficFlows";
export { trafficFlowArraySchema } from "./getTrafficFlows";

// ============================================================================
// CONSTANTS
// ============================================================================

export const WSDOT_TRAFFIC_FLOW_ENDPOINTS = {
  GET_ALL_FLOWS:
    "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson",
  GET_FLOW_BY_ID:
    "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowAsJson",
} as const;

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * Basic usage examples for the WSDOT Traffic Flow API
 *
 * @example
 * ```typescript
 * // Get all traffic flows
 * const flows = await getTrafficFlows({});
 *
 * // Get specific traffic flow by ID
 * const flow = await getTrafficFlowById({
 *   flowDataID: 2482
 * });
 *
 * // React Query usage
 * const { data: flows } = useTrafficFlows({});
 * const { data: flow } = useTrafficFlowById({
 *   flowDataID: 2482
 * });
 * ```
 */
