/**
 * @fileoverview WSDOT Travel Times API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Travel Times API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsdotTravelTimesApi } from "./apiDefinition";

// Export all input types
export type {
  GetTravelTimeInput,
  GetTravelTimesInput,
} from "./original/inputSchemas.original";

// Export all output types
export type { TravelTimeRoute } from "./original/outputSchemas.original";

// Export individual resources for direct use
export { travelTimeRoutesResource } from "./travelTimeRoutes/travelTimeRoutes";
