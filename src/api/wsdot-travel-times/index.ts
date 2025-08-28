// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./travelTimes";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Core schemas (from single-item endpoint for consistency)
// Array schemas
export {
  getTravelTimeByIdParamsSchema,
  getTravelTimesParamsSchema,
  travelTimeEndpointSchema,
  travelTimeRouteSchema,
  travelTimesArraySchema,
} from "./travelTimes";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  GetTravelTimeByIdParams,
  GetTravelTimesParams,
  TravelTimeEndpoint,
  TravelTimeRoute,
  TravelTimesResponse,
} from "./travelTimes";
