/**
 * WSDOT Weather Information API - Complete Export Module
 *
 * This module provides access to Washington State Department of Transportation
 * weather information including station data, conditions, and forecasts.
 *
 * Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html
 * API Help: https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help
 */

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
