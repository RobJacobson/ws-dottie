import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotWeatherInformationApi } from "../apiDefinition";
import { weatherInfoResource } from "./weatherInfo.endpoints";
import type {
  CurrentWeatherForStationsInput,
  SearchWeatherInformationInput,
  WeatherInformationByStationIdInput,
  WeatherInformationInput,
} from "./weatherInfo.input";
import type { WeatherInfo } from "./weatherInfo.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotWeatherInformationApi,
  weatherInfoResource
);

export const fetchWeatherInformation =
  fetchFunctions.fetchWeatherInformation as (
    params?: FetchFunctionParams<WeatherInformationInput>
  ) => Promise<WeatherInfo[]>;

export const fetchWeatherInformationByStationId =
  fetchFunctions.fetchWeatherInformationByStationId as (
    params?: FetchFunctionParams<WeatherInformationByStationIdInput>
  ) => Promise<WeatherInfo>;

export const fetchCurrentWeatherForStations =
  fetchFunctions.fetchCurrentWeatherForStations as (
    params?: FetchFunctionParams<CurrentWeatherForStationsInput>
  ) => Promise<WeatherInfo[]>;

export const searchWeatherInformation =
  fetchFunctions.searchWeatherInformation as (
    params?: FetchFunctionParams<SearchWeatherInformationInput>
  ) => Promise<WeatherInfo[]>;
