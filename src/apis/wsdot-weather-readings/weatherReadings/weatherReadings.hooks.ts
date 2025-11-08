import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
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
