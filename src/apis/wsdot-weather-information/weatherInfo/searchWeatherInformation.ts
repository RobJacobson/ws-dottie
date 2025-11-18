import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotWeatherInformationApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { weatherInfoGroup } from "./shared/weatherInfo.endpoints";
import {
  type SearchWeatherInformationInput,
  searchWeatherInformationInputSchema,
} from "./shared/weatherInfo.input";
import {
  type WeatherInfo,
  weatherInfoSchema,
} from "./shared/weatherInfo.output";

/**
 * Metadata for the searchWeatherInformation endpoint
 */
export const searchWeatherInformationMeta = {
  functionName: "searchWeatherInformation",
  endpoint:
    "/SearchWeatherInformationAsJson?StationID={StationID}&SearchStartTime={SearchStartTime}&SearchEndTime={SearchEndTime}",
  inputSchema: searchWeatherInformationInputSchema,
  outputSchema: weatherInfoSchema.array(),
  sampleParams: {
    StationID: 1980,
    SearchStartTime: new Date(
      `${datesHelper.yesterday()}T00:00:00Z`
    ).toISOString(),
    SearchEndTime: new Date(`${datesHelper.today()}T23:59:59Z`).toISOString(),
  },
  endpointDescription:
    "Search historical weather information for a station within a time range.",
} satisfies EndpointMeta<SearchWeatherInformationInput, WeatherInfo[]>;

/**
 * Fetch function for retrieving historical weather information for a station within a time range
 */
export const searchWeatherInformation: (
  params?: FetchFunctionParams<SearchWeatherInformationInput>
) => Promise<WeatherInfo[]> = createFetchFunction(
  wsdotWeatherInformationApi.api,
  weatherInfoGroup,
  searchWeatherInformationMeta
);

/**
 * React Query hook for retrieving historical weather information for a station within a time range
 */
export const useSearchWeatherInformation: (
  params?: FetchFunctionParams<SearchWeatherInformationInput>,
  options?: QueryHookOptions<WeatherInfo[]>
) => UseQueryResult<WeatherInfo[], Error> = createHook(
  wsdotWeatherInformationApi.api,
  weatherInfoGroup,
  searchWeatherInformationMeta
);
