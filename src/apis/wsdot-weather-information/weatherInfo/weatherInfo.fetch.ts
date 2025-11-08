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
