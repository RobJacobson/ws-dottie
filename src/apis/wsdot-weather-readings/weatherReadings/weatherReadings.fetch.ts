import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
import { weatherReadingsResource } from "./weatherReadings.endpoints";
import type { WeatherReadingsInput } from "./weatherReadings.input";
import type { WeatherReading } from "./weatherReadings.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotWeatherReadingsApi,
  weatherReadingsResource
);

export const fetchWeatherReadings = fetchFunctions.fetchWeatherReadings as (
  params?: FetchFunctionParams<WeatherReadingsInput>
) => Promise<WeatherReading[]>;
