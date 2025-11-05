/**
 * @fileoverview WSDOT Bridge Clearances API - Clean exports for types and API definition
 *
 * This module provides a clean interface for WSDOT Bridge Clearances API, exporting
 * all input/output types, core functions, and React hooks.
 */

// Export all input types
export type {
  BridgeClearancesByRouteInput,
  BridgeClearancesInput,
} from "./bridgeClearances/bridgeClearances.input";

// Export all output types
export type { BridgeDataGIS } from "./bridgeClearances/bridgeClearances.output";

// Export all core functions
export {
  getBridgeClearances,
  getBridgeClearancesByRoute,
} from "./core";

// Export all React hooks
export {
  useGetBridgeClearances,
  useGetBridgeClearancesByRoute,
} from "./hooks";
