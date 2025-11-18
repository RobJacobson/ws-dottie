/**
 * @fileoverview wsdot-travel-times API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

export * from "./travelTimeRoutes/shared/travelTimeRoutes.input";
export * from "./travelTimeRoutes/shared/travelTimeRoutes.output";
// Travel Time Routes
export { fetchTravelTimeById } from "./travelTimeRoutes/travelTimeById";
export { fetchTravelTimes } from "./travelTimeRoutes/travelTimes";
