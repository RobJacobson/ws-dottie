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
// TYPE EXPORTS - Direct from source only
// ============================================================================

// Types are exported directly from their source files:
// - getTravelTimeById.ts: GetTravelTimeByIdParams, TravelTimeEndpoint, TravelTimeRoute
// - getTravelTimes.ts: GetTravelTimesParams, TravelTimesResponse
