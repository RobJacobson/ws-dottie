/**
 * @fileoverview WSDOT Weather Information API - Clean exports for types and API definition
 *
 * This module provides a clean interface for WSDOT Weather Information API, exporting
 * all input/output types, core functions, and React hooks.
 */

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
// Export all input types
export type {
  GetCurrentWeatherForStationsInput,
  GetCurrentWeatherInformationByStationIDInput,
  GetCurrentWeatherInformationInput,
  SearchWeatherInformationInput,
} from "./weatherInfo/weatherInfo.input";
// Export all output types
export type { WeatherInfo } from "./weatherInfo/weatherInfo.output";
