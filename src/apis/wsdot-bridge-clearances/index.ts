/**
 * @fileoverview WSDOT Bridge Clearances API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Bridge Clearances API, exporting
 * all input/output types, the main API definition, and individual resources.
 */

// Export the main API definition (backward compatibility)
export { wsdotBridgeClearancesApi } from "./apiDefinition";
// Export individual resources for direct use
export { bridgeClearancesGroup } from "./bridgeClearances/bridgeClearances";

// Export all input types
export type {
  GetClearancesByRouteInput,
  GetClearancesInput,
} from "./original/inputSchemas.original";

// Export all output types
export type { BridgeDataGIS } from "./original/outputSchemas.original";
