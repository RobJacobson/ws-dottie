/**
 * @fileoverview WSDOT Weather Stations API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Weather Stations API, exporting
 * all input/output types, core functions, React hooks, and main API definition.
 */

// Export the main API definition
export { wsdotWeatherStationsApi } from "./apiDefinition";
// Export all core functions
export { getWeatherStations } from "./core";
// Export all React hooks
export { useGetWeatherStations } from "./hooks";
// Export individual resources for direct use
export { weatherStationsResource } from "./weatherStations/weatherStations.endpoints";
// Export all input types
export type { GetCurrentStationsInput } from "./weatherStations/weatherStations.input";
// Export all output types
export type {
  WeatherStation,
  WeatherStationData,
} from "./weatherStations/weatherStations.output";
