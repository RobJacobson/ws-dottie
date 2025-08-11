// WSDOT Weather Information API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html
// API Help: https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help

// API functions
export {
  getWeatherInformation,
  getWeatherInformationByStationId,
  getWeatherInformationForStations,
} from "./api";
// React Query hooks
export {
  useWeatherInformation,
  useWeatherInformationByStationId,
  useWeatherInformationForStations,
} from "./queries";
// TypeScript types
export type { WeatherInfo } from "./schemas";
