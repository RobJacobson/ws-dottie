// WSDOT Weather Stations API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc

// API functions
export { getWeatherStations } from "./api";
// React Query hooks
export { useWeatherStations } from "./hook";
// TypeScript types
export type {
  WeatherStationData,
  WeatherStationsResponse,
} from "./types";
