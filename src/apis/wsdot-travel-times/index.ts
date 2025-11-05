/**
 * @fileoverview WSDOT Travel Times API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Travel Times API, exporting
 * all input/output types, core functions, React hooks, and main API definition.
 */

// Export the main API definition
export { wsdotTravelTimesApi } from "./apiDefinition";
// Export all core functions
export {
  getTravelTimeById,
  getTravelTimes,
} from "./core";
// Export all React hooks
export {
  useGetTravelTimeById,
  useGetTravelTimes,
} from "./hooks";
// Export individual resources for direct use
export { travelTimeRoutesGroup } from "./travelTimeRoutes/travelTimeRoutes.endpoints";
// Export all input types
export type {
  GetTravelTimeInput,
  GetTravelTimesInput,
} from "./travelTimeRoutes/travelTimeRoutes.input";
// Export all output types
export type { TravelTimeRoute } from "./travelTimeRoutes/travelTimeRoutes.output";
