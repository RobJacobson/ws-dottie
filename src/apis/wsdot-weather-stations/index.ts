/**
 * @fileoverview WSDOT Weather Stations API - Clean exports for types and API definition
 *
 * This module provides a clean interface for WSDOT Weather Stations API, exporting
 * all input/output types, core functions, and React hooks.
 */

// Export all core functions
export { getWeatherStations } from "./core";
// Export all React hooks
export { useGetWeatherStations } from "./hooks";
// Export all input types
export type { WeatherStationsInput } from "./weatherStations/weatherStations.input";
// Export all output types
export type {
  WeatherStation,
  WeatherStationData,
} from "./weatherStations/weatherStations.output";
