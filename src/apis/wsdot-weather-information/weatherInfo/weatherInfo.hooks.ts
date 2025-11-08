import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsdotWeatherInformationApi } from "../apiDefinition";
import { weatherInfoResource } from "./weatherInfo.endpoints";
import * as fetchFunctions from "./weatherInfo.fetch";
import type {
  CurrentWeatherForStationsInput,
  SearchWeatherInformationInput,
  WeatherInformationByStationIdInput,
  WeatherInformationInput,
} from "./weatherInfo.input";
import type { WeatherInfo } from "./weatherInfo.output";

const hooks = createHooks(
  wsdotWeatherInformationApi,
  weatherInfoResource,
  fetchFunctions
);

export const useWeatherInformation: (
  params?: FetchFunctionParams<WeatherInformationInput>,
  options?: QueryHookOptions<WeatherInfo[]>
) => UseQueryResult<WeatherInfo[], Error> = hooks.useWeatherInformation;

export const useWeatherInformationByStationId: (
  params?: FetchFunctionParams<WeatherInformationByStationIdInput>,
  options?: QueryHookOptions<WeatherInfo>
) => UseQueryResult<WeatherInfo, Error> =
  hooks.useWeatherInformationByStationId;

export const useCurrentWeatherForStations: (
  params?: FetchFunctionParams<CurrentWeatherForStationsInput>,
  options?: QueryHookOptions<WeatherInfo[]>
) => UseQueryResult<WeatherInfo[], Error> = hooks.useCurrentWeatherForStations;

export const useSearchWeatherInformation: (
  params?: FetchFunctionParams<SearchWeatherInformationInput>,
  options?: QueryHookOptions<WeatherInfo[]>
) => UseQueryResult<WeatherInfo[], Error> = hooks.useSearchWeatherInformation;
