// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./weatherInformationExtended";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export {
  getWeatherInformationExtendedParamsSchema,
  weatherReadingArraySchema,
  weatherReadingSchema,
} from "./weatherInformationExtended";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  GetWeatherInformationExtendedParams,
  WeatherReading,
} from "./weatherInformationExtended";
