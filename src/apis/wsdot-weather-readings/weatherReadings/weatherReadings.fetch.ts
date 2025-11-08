import { wsdotWeatherReadingsApi } from "@/apis/wsdot-weather-readings/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { weatherReadingsResource } from "./weatherReadings.endpoints";
import type { WeatherReadingsInput } from "./weatherReadings.input";
import type { WeatherReading } from "./weatherReadings.output";

const fetchFunctions = createFetchFunctions(
  wsdotWeatherReadingsApi,
  weatherReadingsResource
);

export const fetchWeatherReadings: (
  params?: FetchFunctionParams<WeatherReadingsInput>
) => Promise<WeatherReading[]> = fetchFunctions.fetchWeatherReadings;
