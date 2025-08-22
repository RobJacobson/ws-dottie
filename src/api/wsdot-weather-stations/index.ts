// WSDOT Weather Stations API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getWeatherStations";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Note: No cache.ts file exists for this API

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  GetWeatherStationsParams,
  WeatherStationData,
} from "./getWeatherStations";
