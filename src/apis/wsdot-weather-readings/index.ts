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
// Export all input types
export type { GetWeatherReadingsInput } from "./original/inputSchemas.original";
// Export all output types
export type {
  ScanwebSubSurfaceMeasurements,
  ScanwebSurfaceMeasurements,
  WeatherReading,
} from "./original/outputSchemas.original";
