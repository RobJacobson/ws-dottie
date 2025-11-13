import {
  fetchCurrentWeatherForStations,
  fetchWeatherInformation,
  fetchWeatherInformationByStationId,
  searchWeatherInformation,
} from "./weatherInfo.endpoints";

export const useWeatherInformation = fetchWeatherInformation.useQuery;

export const useWeatherInformationByStationId =
  fetchWeatherInformationByStationId.useQuery;

export const useCurrentWeatherForStations =
  fetchCurrentWeatherForStations.useQuery;

export const useSearchWeatherInformation = searchWeatherInformation.useQuery;
