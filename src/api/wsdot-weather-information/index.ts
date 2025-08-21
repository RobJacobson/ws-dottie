// WSDOT Weather Information API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html
// API Help: https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help

// API functions
export {
  getWeatherInformation,
  getWeatherInformationByStationId,
  getWeatherInformationForStations,
} from "./api";
// Input parameter types
export type {
  GetWeatherInformationByStationIdParams,
  GetWeatherInformationForStationsParams,
  GetWeatherInformationParams,
} from "./inputs";
// Export types
export type {
  WeatherInfo,
  WeatherInformationResponse,
} from "./outputs";
// React Query hooks
export {
  useWeatherInformation,
  useWeatherInformationByStationId,
  useWeatherInformationForStations,
} from "./queries";
