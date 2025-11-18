/**
 * @fileoverview wsdot-weather-information API - Exports hooks, fetch functions, and types
 *
 * This module provides exports for all hooks, fetch functions, and types in the wsdot-weather-information API.
 */

// Re-export everything from core (fetch functions and types)
export * from "./core";
export { useCurrentWeatherForStations } from "./weatherInfo/currentWeatherForStations";
export { useSearchWeatherInformation } from "./weatherInfo/searchWeatherInformation";
// Export hooks
export { useWeatherInformation } from "./weatherInfo/weatherInformation";
export { useWeatherInformationByStationId } from "./weatherInfo/weatherInformationByStationId";
