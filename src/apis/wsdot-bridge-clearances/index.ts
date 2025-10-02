/**
 * @fileoverview WSDOT Bridge Clearances API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Bridge Clearances API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsdotBridgeClearancesApi } from "./endpoints";

// Export all input types
export type {
  GetClearancesByRouteInput,
  GetClearancesInput,
} from "./original/inputSchemas.original";

// Export all output types
export type { BridgeDataGISList } from "./original/outputSchemas.original";
