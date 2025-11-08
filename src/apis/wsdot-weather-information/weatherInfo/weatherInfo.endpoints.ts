import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod-openapi-init";
import {
  type CurrentWeatherForStationsInput,
  currentWeatherForStationsInputSchema,
  type SearchWeatherInformationInput,
  searchWeatherInformationInputSchema,
  type WeatherInformationByStationIdInput,
  type WeatherInformationInput,
  weatherInformationByStationIdInputSchema,
  weatherInformationInputSchema,
} from "./weatherInfo.input";
import { type WeatherInfo, weatherInfoSchema } from "./weatherInfo.output";

export const weatherInfoResource = {
  name: "weather-info",
  documentation: {
    resourceDescription:
      "Each WeatherInfo item represents current atmospheric conditions from a WSDOT Road Weather Information System station. These stations measure temperature, humidity, wind speed and direction, barometric pressure, precipitation, visibility, and sky coverage to support transportation operations.",
    businessContext:
      "Use to assess road weather conditions by providing real-time atmospheric data for transportation management and traveler safety decisions.",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    fetchWeatherInformation: {
      endpoint: "/GetCurrentWeatherInformationAsJson",
      inputSchema: weatherInformationInputSchema,
      outputSchema: z.array(weatherInfoSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple WeatherInfo items for all stations.",
    } satisfies EndpointDefinition<WeatherInformationInput, WeatherInfo[]>,
    fetchWeatherInformationByStationId: {
      endpoint:
        "/GetCurrentWeatherInformationByStationIDAsJson?StationID={StationID}",
      inputSchema: weatherInformationByStationIdInputSchema,
      outputSchema: weatherInfoSchema,
      sampleParams: { StationID: 1909 },
      endpointDescription: "Returns single WeatherInfo for specific station.",
    } satisfies EndpointDefinition<
      WeatherInformationByStationIdInput,
      WeatherInfo
    >,
    fetchCurrentWeatherForStations: {
      endpoint: "/GetCurrentWeatherForStationsAsJson?StationList={StationList}",
      inputSchema: currentWeatherForStationsInputSchema,
      outputSchema: z.array(weatherInfoSchema),
      sampleParams: { StationList: "1909,1966,1970" },
      endpointDescription:
        "Returns multiple WeatherInfo for specified stations.",
    } satisfies EndpointDefinition<
      CurrentWeatherForStationsInput,
      WeatherInfo[]
    >,
    searchWeatherInformation: {
      endpoint:
        "/SearchWeatherInformationAsJson?StationID={StationID}&SearchStartTime={SearchStartTime}&SearchEndTime={SearchEndTime}",
      inputSchema: searchWeatherInformationInputSchema,
      outputSchema: z.array(weatherInfoSchema),
      sampleParams: {
        StationID: 1980,
        SearchStartTime: new Date(
          `${datesHelper.yesterday()}T00:00:00Z`
        ).toISOString(),
        SearchEndTime: new Date(
          `${datesHelper.today()}T23:59:59Z`
        ).toISOString(),
      },
      endpointDescription:
        "Returns multiple WeatherInfo for historical time range.",
    } satisfies EndpointDefinition<
      SearchWeatherInformationInput,
      WeatherInfo[]
    >,
  },
} satisfies EndpointGroup;
