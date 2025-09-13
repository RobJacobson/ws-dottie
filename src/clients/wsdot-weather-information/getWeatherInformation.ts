import { z } from "zod";
import { weatherInformationSchema } from "@/schemas/wsdot-weather-information";
import type { WeatherInfo } from "@/schemas/wsdot-weather-information/weatherInfo.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getWeatherInformation */
const weatherInformationInput = z.object({});

/** Endpoint metadata for getWeatherInformation */
export const getWeatherInformationMeta: Endpoint<
  WeatherInformationInput,
  WeatherInfo[]
> = {
  api: "wsdot-weather-information",
  function: "getWeatherInformation",
  endpoint:
    "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson",
  inputSchema: weatherInformationInput,
  outputSchema: weatherInformationSchema,
  sampleParams: {},
  cacheStrategy: "MINUTE_UPDATES",
};

// Type exports
export type WeatherInformationInput = z.infer<typeof weatherInformationInput>;
