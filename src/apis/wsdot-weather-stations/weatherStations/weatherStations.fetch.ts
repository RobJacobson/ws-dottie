import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotWeatherStationsApi } from "../apiDefinition";
import { weatherStationsResource } from "./weatherStations.endpoints";
import type { WeatherStationsInput } from "./weatherStations.input";
import type { WeatherStation } from "./weatherStations.output";

const fetchFunctions = createFetchFunctions(
  wsdotWeatherStationsApi,
  weatherStationsResource
);

export const fetchWeatherStations: (
  params?: FetchFunctionParams<WeatherStationsInput>
) => Promise<WeatherStation[]> = fetchFunctions.fetchWeatherStations;
