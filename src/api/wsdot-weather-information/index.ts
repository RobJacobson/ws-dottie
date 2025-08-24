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

export * from "./getSearchWeatherInformation";
export * from "./getWeatherInformation";
export * from "./getWeatherInformationByStationId";
export * from "./getWeatherInformationForStations";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Search schemas
export { getSearchWeatherInformationParamsSchema } from "./getSearchWeatherInformation";
// Array schemas
export {
  getWeatherInformationParamsSchema,
  weatherInfoArraySchema,
} from "./getWeatherInformation";
// Core schemas (from single-item endpoint for consistency)
export { getWeatherInformationByStationIdParamsSchema } from "./getWeatherInformationByStationId";
// Station list schemas
export { getWeatherInformationForStationsParamsSchema } from "./getWeatherInformationForStations";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type { GetSearchWeatherInformationParams } from "./getSearchWeatherInformation";
export type { GetWeatherInformationParams } from "./getWeatherInformation";
export type { GetWeatherInformationByStationIdParams } from "./getWeatherInformationByStationId";
export type { GetWeatherInformationForStationsParams } from "./getWeatherInformationForStations";
