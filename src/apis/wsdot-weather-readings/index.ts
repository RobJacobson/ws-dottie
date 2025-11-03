/**
 * @fileoverview WSDOT Weather Readings API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Weather Readings API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
// Export all resources for direct use
export {
  subSurfaceMeasurementsResource,
  surfaceMeasurementsResource,
  weatherReadingsResource,
  wsdotWeatherReadingsApi,
} from "./apiDefinition";
// Export all output types
export type { ScanwebSubSurfaceMeasurements } from "./subSurfaceMeasurements/subSurfaceMeasurements.output";
export type { ScanwebSurfaceMeasurements } from "./surfaceMeasurements/surfaceMeasurements.output";
// Export all input types
export type { GetWeatherReadingsInput } from "./weatherReadings/weatherReadings.input";
export type { WeatherReading } from "./weatherReadings/weatherReadings.output";
