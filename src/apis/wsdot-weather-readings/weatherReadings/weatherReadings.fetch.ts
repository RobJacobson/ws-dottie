import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
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
