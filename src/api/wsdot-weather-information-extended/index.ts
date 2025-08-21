// WSDOT Weather Information Extended API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_traveler_a_p_i_1_1_controller_1_1_scanweb_controller.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/api/Scanweb

// API functions
export { getWeatherInformationExtended } from "./api";
// Input parameter types
export type { GetWeatherInformationExtendedParams } from "./inputs";
// Export types
export type {
  SubSurfaceMeasurement,
  SurfaceMeasurement,
  WeatherReading,
} from "./outputs";
// React Query hooks
export { useWeatherInformationExtended } from "./queries";
