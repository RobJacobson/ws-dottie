/**
 * WSDOT Travel Times API - Complete Export Module
 *
 * This module provides access to Washington State Department of Transportation
 * travel time data including route timing information and traffic estimates.
 *
 * Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___travel_times.html
 * API Help: https://wsdot.wa.gov/traffic/api/TravelTimes/TravelTimesREST.svc/Help
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./travelTimes";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Core schemas (from single-item endpoint for consistency)
export {
  getTravelTimeByIdParamsSchema,
  travelTimeEndpointSchema,
  travelTimeRouteSchema,
} from "./travelTimes";
// Array schemas
export {
  getTravelTimesParamsSchema,
  travelTimesArraySchema,
} from "./travelTimes";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  GetTravelTimeByIdParams,
  TravelTimeEndpoint,
  TravelTimeRoute,
} from "./travelTimes";
export type {
  GetTravelTimesParams,
  TravelTimesResponse,
} from "./travelTimes";
