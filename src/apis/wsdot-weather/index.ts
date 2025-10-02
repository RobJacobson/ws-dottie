/**
 * @fileoverview WSDOT Weather API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Weather API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsdotWeatherApi } from "./endpoints";

// Export all input types
export type {
  GetCurrentStationsInput,
  GetCurrentWeatherInformationByStationIDInput,
  GetCurrentWeatherInformationInput,
  GetWeatherInformationExtendedInput,
} from "./original/inputSchemas.original";

// Export all output types
export type {
  WeatherInfo,
  WeatherInformationList,
  WeatherReadingsList,
  WeatherStationsList,
} from "./original/outputSchemas.original";
