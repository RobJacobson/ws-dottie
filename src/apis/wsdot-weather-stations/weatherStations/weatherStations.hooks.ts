import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotWeatherStationsApi } from "@/apis/wsdot-weather-stations/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { weatherStationsResource } from "./weatherStations.endpoints";
import * as fetchFunctions from "./weatherStations.fetch";
import type { WeatherStationsInput } from "./weatherStations.input";
import type { WeatherStation } from "./weatherStations.output";

const hooks = createHooks(
  wsdotWeatherStationsApi,
  weatherStationsResource,
  fetchFunctions
);

export const useWeatherStations: (
  params?: FetchFunctionParams<WeatherStationsInput>,
  options?: QueryHookOptions<WeatherStation[]>
) => UseQueryResult<WeatherStation[], Error> = hooks.useWeatherStations;
