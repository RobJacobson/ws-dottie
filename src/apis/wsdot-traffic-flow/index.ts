/**
 * @fileoverview WSDOT Traffic Flow API - Clean exports for types and API definition
 *
 * This module provides a clean interface for WSDOT Traffic Flow API, exporting
 * all input/output types, core functions, and React hooks.
 */

// Export all core functions
export {
  getTrafficFlowById,
  getTrafficFlows,
} from "./core";
// Export all input types
export type {
  GetTrafficFlowInput,
  GetTrafficFlowsInput,
} from "./flowData/flowData.input";
// Export all output types
export type { FlowData } from "./flowData/flowData.output";

// Export all React hooks
export {
  useGetTrafficFlowById,
  useGetTrafficFlows,
} from "./hooks";
