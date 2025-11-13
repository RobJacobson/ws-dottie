import * as endpoints from "./weatherInfo.endpoints";

export const fetchWeatherInformation = endpoints.fetchWeatherInformation.fetch;

export const fetchWeatherInformationByStationId =
  endpoints.fetchWeatherInformationByStationId.fetch;

export const fetchCurrentWeatherForStations =
  endpoints.fetchCurrentWeatherForStations.fetch;

export const searchWeatherInformation =
  endpoints.searchWeatherInformation.fetch;
