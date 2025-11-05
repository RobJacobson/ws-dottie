/**
 * @fileoverview WSDOT Weather Information API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Weather Information API, exporting
 * all input/output types, core functions, React hooks, and main API definition.
 */

// Export the main API definition
export { wsdotWeatherInformationApi } from "./apiDefinition";
// Export all core functions
export {
  getCurrentWeatherForStations,
  getWeatherInformation,
  getWeatherInformationByStationId,
  searchWeatherInformation,
} from "./core";
// Export all React hooks
export {
  useGetCurrentWeatherForStations,
  useGetWeatherInformation,
  useGetWeatherInformationByStationId,
  useSearchWeatherInformation,
} from "./hooks";
// Export individual resources for direct use
export { weatherInfoResource } from "./weatherInfo/weatherInfo.endpoints";
// Export all input types
export type {
  GetCurrentWeatherForStationsInput,
  GetCurrentWeatherInformationByStationIDInput,
  GetCurrentWeatherInformationInput,
  SearchWeatherInformationInput,
} from "./weatherInfo/weatherInfo.input";
// Export all output types
export type { WeatherInfo } from "./weatherInfo/weatherInfo.output";
