import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
import { weatherReadingsResource } from "./weatherReadings.endpoints";
import type { WeatherReadingsInput } from "./weatherReadings.input";
import type { WeatherReading } from "./weatherReadings.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotWeatherReadingsApi,
  weatherReadingsResource
);

export const fetchWeatherReadings: (
  params?: FetchFunctionParams<WeatherReadingsInput>
) => Promise<WeatherReading[]> = fetchFunctions.fetchWeatherReadings;
