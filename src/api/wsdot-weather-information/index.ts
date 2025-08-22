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
// TYPE EXPORTS FOR CONVENIENCE
// ============================================================================

// Types are exported directly from their source files to avoid re-export chains
// Consumers should import types directly from the endpoint files where they are defined
