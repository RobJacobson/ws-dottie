// WSDOT Travel Times API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___travel_times.html
// API Help: https://wsdot.wa.gov/traffic/api/TravelTimes/TravelTimesREST.svc/Help

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getTravelTimeById";
export * from "./getTravelTimes";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Note: No cache.ts file exists for this API

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type { GetTravelTimeByIdParams } from "./getTravelTimeById";
export type {
  GetTravelTimesParams,
  TravelTimeEndpoint,
  TravelTimeRoute,
  TravelTimesResponse,
} from "./getTravelTimes";
