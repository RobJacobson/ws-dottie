import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
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

const hooks = createEndpointGroupHooks(
  wsdotWeatherInformationApi,
  weatherInfoResource,
  fetchFunctions
);

export const useWeatherInformation = hooks.useWeatherInformation as (
  params?: WeatherInformationInput,
  options?: QueryHookOptions<WeatherInfo[]>
) => UseQueryResult<WeatherInfo[], Error>;

export const useWeatherInformationByStationId =
  hooks.useWeatherInformationByStationId as (
    params?: WeatherInformationByStationIdInput,
    options?: QueryHookOptions<WeatherInfo>
  ) => UseQueryResult<WeatherInfo, Error>;

export const useCurrentWeatherForStations =
  hooks.useCurrentWeatherForStations as (
    params?: CurrentWeatherForStationsInput,
    options?: QueryHookOptions<WeatherInfo[]>
  ) => UseQueryResult<WeatherInfo[], Error>;

export const useSearchWeatherInformation =
  hooks.useSearchWeatherInformation as (
    params?: SearchWeatherInformationInput,
    options?: QueryHookOptions<WeatherInfo[]>
  ) => UseQueryResult<WeatherInfo[], Error>;
