// WSDOT Weather Information API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html
// API Help: https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getSearchWeatherInformation";
export * from "./getWeatherInformation";
export * from "./getWeatherInformationByStationId";
export * from "./getWeatherInformationForStations";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Note: No cache.ts file exists for this API
// All caching is handled through React Query hooks

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type { GetSearchWeatherInformationParams } from "./getSearchWeatherInformation";
export type {
  GetWeatherInformationParams,
  WeatherInfo,
} from "./getWeatherInformation";
export type { GetWeatherInformationByStationIdParams } from "./getWeatherInformationByStationId";
export type { GetWeatherInformationForStationsParams } from "./getWeatherInformationForStations";
