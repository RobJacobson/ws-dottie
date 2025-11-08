import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotWeatherStationsApi } from "../apiDefinition";
import { weatherStationsResource } from "./weatherStations.endpoints";
import type { WeatherStationsInput } from "./weatherStations.input";
import type { WeatherStation } from "./weatherStations.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotWeatherStationsApi,
  weatherStationsResource
);

export const fetchWeatherStations: (
  params?: FetchFunctionParams<WeatherStationsInput>
) => Promise<WeatherStation[]> = fetchFunctions.fetchWeatherStations;
