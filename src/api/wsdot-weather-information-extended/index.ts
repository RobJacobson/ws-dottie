/**
 * WSDOT Weather Information Extended API - File-per-Endpoint Structure
 *
 * This module provides access to Washington State Department of Transportation
 * extended weather information including surface and subsurface measurements.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getWeatherInformationExtended";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  GetWeatherInformationExtendedParams,
  SubSurfaceMeasurement,
  SurfaceMeasurement,
  WeatherReading,
} from "./getWeatherInformationExtended";
