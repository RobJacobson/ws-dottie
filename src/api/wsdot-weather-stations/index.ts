// WSDOT Weather Stations API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc

// API functions
export { getWeatherStations } from "./api";
// Input parameter types
export type { GetWeatherStationsParams } from "./inputs";
// Export types
export type { WeatherStationData } from "./outputs";
// React Query hooks
export { useWeatherStations } from "./queries";
