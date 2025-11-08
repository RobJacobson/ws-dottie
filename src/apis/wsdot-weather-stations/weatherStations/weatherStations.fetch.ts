import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsdotWeatherStationsApi } from "@/apis/wsdot-weather-stations/apiDefinition";
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
