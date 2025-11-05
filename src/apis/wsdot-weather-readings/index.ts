/**
 * @fileoverview WSDOT Weather Readings API - Clean exports for types and API definition
 *
 * This module provides a clean interface for WSDOT Weather Readings API, exporting
 * all input/output types, core functions, React hooks, and main API definition.
 */

// Export the main API definition
// Export all resources for direct use
export {
  subSurfaceMeasurementsResource,
  surfaceMeasurementsResource,
  weatherReadingsResource,
  wsdotWeatherReadingsApi,
} from "./apiDefinition";
// Export all core functions
export {
  getSubSurfaceMeasurements,
  getSurfaceMeasurements,
  getWeatherReadings,
} from "./core";
// Export all React hooks
export {
  useGetSubSurfaceMeasurements,
  useGetSurfaceMeasurements,
  useGetWeatherReadings,
} from "./hooks";
export type { GetSubSurfaceMeasurementsInput } from "./subSurfaceMeasurements/subSurfaceMeasurements.input";
// Export all output types
export type { ScanwebSubSurfaceMeasurements } from "./subSurfaceMeasurements/subSurfaceMeasurements.output";
export type { GetSurfaceMeasurementsInput } from "./surfaceMeasurements/surfaceMeasurements.input";
export type { ScanwebSurfaceMeasurements } from "./surfaceMeasurements/surfaceMeasurements.output";
// Export all input types
export type { GetWeatherReadingsInput } from "./weatherReadings/weatherReadings.input";
export type { WeatherReading } from "./weatherReadings/weatherReadings.output";
