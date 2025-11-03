/**
 * @fileoverview WSDOT Weather Information API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Weather Information API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsdotWeatherInformationApi } from "./apiDefinition";
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
