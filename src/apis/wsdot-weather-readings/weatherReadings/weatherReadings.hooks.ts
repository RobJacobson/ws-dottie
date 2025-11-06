import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
import { weatherReadingsResource } from "./weatherReadings.endpoints";
import * as fetchFunctions from "./weatherReadings.fetch";
import type { WeatherReadingsInput } from "./weatherReadings.input";
import type { WeatherReading } from "./weatherReadings.output";

const hooks = createEndpointGroupHooks(
  wsdotWeatherReadingsApi,
  weatherReadingsResource,
  fetchFunctions
);

export const useWeatherReadings = hooks.useWeatherReadings as (
  params?: WeatherReadingsInput,
  options?: QueryHookOptions<WeatherReading[]>
) => UseQueryResult<WeatherReading[], Error>;
