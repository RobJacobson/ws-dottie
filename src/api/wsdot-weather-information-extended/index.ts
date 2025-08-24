/**
 * WSDOT Weather Information Extended API - Complete Export Module
 *
 * This module provides access to Washington State Department of Transportation
 * extended weather information including surface and subsurface measurements.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getWeatherInformationExtended";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export {
  getWeatherInformationExtendedParamsSchema,
  weatherReadingArraySchema,
  weatherReadingSchema,
} from "./getWeatherInformationExtended";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  GetWeatherInformationExtendedParams,
  WeatherReading,
} from "./getWeatherInformationExtended";
