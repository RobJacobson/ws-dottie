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
