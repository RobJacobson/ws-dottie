import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsdotWeatherStationsApi } from "../apiDefinition";
import { weatherStationsResource } from "./weatherStations.endpoints";
import * as fetchFunctions from "./weatherStations.fetch";
import type { WeatherStationsInput } from "./weatherStations.input";
import type { WeatherStation } from "./weatherStations.output";

const hooks = createEndpointGroupHooks(
  wsdotWeatherStationsApi,
  weatherStationsResource,
  fetchFunctions
);

export const useWeatherStations: (
  params?: WeatherStationsInput,
  options?: QueryHookOptions<WeatherStation[]>
) => UseQueryResult<WeatherStation[], Error> = hooks.useWeatherStations;
