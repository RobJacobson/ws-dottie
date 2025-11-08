import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotWeatherReadingsApi } from "@/apis/wsdot-weather-readings/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { weatherReadingsResource } from "./weatherReadings.endpoints";
import * as fetchFunctions from "./weatherReadings.fetch";
import type { WeatherReadingsInput } from "./weatherReadings.input";
import type { WeatherReading } from "./weatherReadings.output";

const hooks = createHooks(
  wsdotWeatherReadingsApi,
  weatherReadingsResource,
  fetchFunctions
);

export const useWeatherReadings: (
  params?: FetchFunctionParams<WeatherReadingsInput>,
  options?: QueryHookOptions<WeatherReading[]>
) => UseQueryResult<WeatherReading[], Error> = hooks.useWeatherReadings;
