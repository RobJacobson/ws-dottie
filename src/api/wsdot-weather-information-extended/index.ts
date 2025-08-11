// WSDOT Weather Information Extended API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_traveler_a_p_i_1_1_controller_1_1_scanweb_controller.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/api/Scanweb

// API functions
export { getWeatherInformationExtended } from "./api";
// React Query hooks
export { useWeatherInformationExtended } from "./queries";
// TypeScript types
export type {
  SubSurfaceMeasurement,
  SurfaceMeasurement,
  WeatherReading,
} from "./schemas";
