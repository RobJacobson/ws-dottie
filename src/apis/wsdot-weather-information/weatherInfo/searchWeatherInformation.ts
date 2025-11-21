import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsdotWeatherInformationApiMeta } from "../apiMeta";
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
 * Factory result for search weather information
 */
const searchWeatherInformationFactory = createFetchAndHook<
  SearchWeatherInformationInput,
  WeatherInfo[]
>({
  api: wsdotWeatherInformationApiMeta,
  endpoint: searchWeatherInformationMeta,
  getEndpointGroup: () =>
    require("./shared/weatherInfo.endpoints").weatherInfoGroup,
});

/**
 * Fetch function and React Query hook for retrieving historical weather information for a station within a time range
 */
export const {
  fetch: searchWeatherInformation,
  hook: useSearchWeatherInformation,
} = searchWeatherInformationFactory;
