// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./weatherInformation";
export * from "./weatherInformationSearch";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Search schemas
export { getSearchWeatherInformationParamsSchema } from "./weatherInformationSearch";
// Array schemas
export {
  getWeatherInformationParamsSchema,
  weatherInfoArraySchema,
} from "./weatherInformation";
// Core schemas (from single-item endpoint for consistency)
export { getWeatherInformationByStationIdParamsSchema } from "./weatherInformation";
// Station list schemas
export { getWeatherInformationForStationsParamsSchema } from "./weatherInformationSearch";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type { GetSearchWeatherInformationParams } from "./weatherInformationSearch";
export type { GetWeatherInformationParams } from "./weatherInformation";
export type { GetWeatherInformationByStationIdParams } from "./weatherInformation";
export type { GetWeatherInformationForStationsParams } from "./weatherInformationSearch";
