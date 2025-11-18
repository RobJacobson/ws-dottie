/**
 * @fileoverview wsdot-highway-cameras API - Exports hooks, fetch functions, and types
 *
 * This module provides exports for all hooks, fetch functions, and types in the wsdot-highway-cameras API.
 */

export { useHighwayCameraByCameraId } from "./cameras/highwayCameraByCameraId";
// Export hooks
export { useHighwayCameras } from "./cameras/highwayCameras";
export { useSearchHighwayCamerasByRouteAndMilepost } from "./cameras/searchHighwayCamerasByRouteAndMilepost";
// Re-export everything from core (fetch functions and types)
export * from "./core";
