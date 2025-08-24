/**
 * WSDOT Weather Stations API - Complete Export Module
 *
 * This module provides access to Washington State Department of Transportation
 * weather station data including station locations and operational information.
 *
 * Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html
 * API Endpoint: https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getWeatherStations";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export {
  getWeatherStationsParamsSchema,
  weatherStationDataArraySchema,
  weatherStationDataSchema,
} from "./getWeatherStations";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  GetWeatherStationsParams,
  WeatherStationData,
} from "./getWeatherStations";
