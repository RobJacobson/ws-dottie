// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./weatherInformation";
export * from "./weatherInformationSearch";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Array schemas
// Core schemas (from single-item endpoint for consistency)
export {
  getWeatherInformationByStationIdParamsSchema,
  getWeatherInformationParamsSchema,
  weatherInfoArraySchema,
} from "./weatherInformation";
// Search schemas
// Station list schemas
export {
  getSearchWeatherInformationParamsSchema,
  getWeatherInformationForStationsParamsSchema,
} from "./weatherInformationSearch";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  GetWeatherInformationByStationIdParams,
  GetWeatherInformationParams,
} from "./weatherInformation";
export type {
  GetSearchWeatherInformationParams,
  GetWeatherInformationForStationsParams,
} from "./weatherInformationSearch";
