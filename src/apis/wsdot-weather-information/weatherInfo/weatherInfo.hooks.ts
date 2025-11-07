import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
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

export const useWeatherInformation: (
  params?: WeatherInformationInput,
  options?: QueryHookOptions<WeatherInfo[]>
) => UseQueryResult<WeatherInfo[], Error> = hooks.useWeatherInformation;

export const useWeatherInformationByStationId: (
  params?: WeatherInformationByStationIdInput,
  options?: QueryHookOptions<WeatherInfo>
) => UseQueryResult<WeatherInfo, Error> =
  hooks.useWeatherInformationByStationId;

export const useCurrentWeatherForStations: (
  params?: CurrentWeatherForStationsInput,
  options?: QueryHookOptions<WeatherInfo[]>
) => UseQueryResult<WeatherInfo[], Error> = hooks.useCurrentWeatherForStations;

export const useSearchWeatherInformation: (
  params?: SearchWeatherInformationInput,
  options?: QueryHookOptions<WeatherInfo[]>
) => UseQueryResult<WeatherInfo[], Error> = hooks.useSearchWeatherInformation;
