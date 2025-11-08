import { wsdotWeatherInformationApi } from "@/apis/wsdot-weather-information/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { weatherInfoResource } from "./weatherInfo.endpoints";
import type {
  CurrentWeatherForStationsInput,
  SearchWeatherInformationInput,
  WeatherInformationByStationIdInput,
  WeatherInformationInput,
} from "./weatherInfo.input";
import type { WeatherInfo } from "./weatherInfo.output";

const fetchFunctions = createFetchFunctions(
  wsdotWeatherInformationApi,
  weatherInfoResource
);

export const fetchWeatherInformation: (
  params?: FetchFunctionParams<WeatherInformationInput>
) => Promise<WeatherInfo[]> = fetchFunctions.fetchWeatherInformation;

export const fetchWeatherInformationByStationId: (
  params?: FetchFunctionParams<WeatherInformationByStationIdInput>
) => Promise<WeatherInfo> = fetchFunctions.fetchWeatherInformationByStationId;

export const fetchCurrentWeatherForStations: (
  params?: FetchFunctionParams<CurrentWeatherForStationsInput>
) => Promise<WeatherInfo[]> = fetchFunctions.fetchCurrentWeatherForStations;

export const searchWeatherInformation: (
  params?: FetchFunctionParams<SearchWeatherInformationInput>
) => Promise<WeatherInfo[]> = fetchFunctions.searchWeatherInformation;
