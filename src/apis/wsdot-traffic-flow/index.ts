/**
 * @fileoverview WSDOT Traffic Flow API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Traffic Flow API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsdotTrafficFlowApi } from "./apiDefinition";
// Export individual resources for direct use
export { flowDataGroup } from "./flowData/flowData.endpoints";
// Export all input types
export type {
  GetTrafficFlowInput,
  GetTrafficFlowsInput,
} from "./flowData/flowData.input";
// Export all output types
export type { FlowData } from "./flowData/flowData.output";
