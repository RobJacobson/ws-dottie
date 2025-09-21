import { z } from "zod";

import {
  type WeatherInfo,
  weatherInformationSchema,
} from "@/schemas/wsdot-weather-information/weatherInfo.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getWeatherInformation */
const weatherInformationInput = z.object({}).strict();

/** Endpoint metadata for getWeatherInformation */
export const getWeatherInformationMeta: EndpointDefinition<
  WeatherInformationInput,
  WeatherInfo[]
> = {
  id: "wsdot-weather-information/getWeatherInformation",
  endpoint:
    "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson",
  inputSchema: weatherInformationInput,
  outputSchema: weatherInformationSchema,
  sampleParams: {},
  cacheStrategy: "FREQUENT",
};

// Type exports
export type WeatherInformationInput = z.infer<typeof weatherInformationInput>;
