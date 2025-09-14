import { z } from "zod";
import {
  type WeatherInfo,
  weatherInformationSchema,
} from "@/schemas/wsdot-weather-information/weatherInfo.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getWeatherInformation */
const weatherInformationInput = z.object({});

/** Endpoint metadata for getWeatherInformation */
export const getWeatherInformationMeta: EndpointMeta<
  WeatherInformationInput,
  WeatherInfo[]
> = {
  id: "wsdot-weather-information/getWeatherInformation",
  endpoint:
    "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson",
  inputSchema: weatherInformationInput,
  outputSchema: weatherInformationSchema,
  sampleParams: {},
  cacheStrategy: "MINUTE_UPDATES",
};

// Type exports
export type WeatherInformationInput = z.infer<typeof weatherInformationInput>;
