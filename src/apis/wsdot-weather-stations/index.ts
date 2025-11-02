/**
 * @fileoverview WSDOT Weather Stations API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Weather Stations API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsdotWeatherStationsApi } from "./apiDefinition";

// Export all input types
export type { GetCurrentStationsInput } from "./original/inputSchemas.original";

// Export all output types
export type {
  WeatherStation,
  WeatherStationData,
} from "./original/outputSchemas.original";

// Export individual resources for direct use
export { weatherStationsResource } from "./weatherStations/weatherStations.endpoints";
