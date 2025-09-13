import { z } from "zod";
import { weatherInformationSchema } from "@/schemas/wsdot-weather-information";

/** Input schema for getWeatherInformation */
const weatherInformationInput = z.object({});

/** Endpoint metadata for getWeatherInformation */
export const getWeatherInformationMeta = {
  api: "wsdot-weather-information",
  function: "getWeatherInformation",
  endpoint:
    "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson",
  inputSchema: weatherInformationInput,
  outputSchema: weatherInformationSchema,
  sampleParams: {},
  cacheStrategy: "MINUTE_UPDATES",
} as const;

// Type exports
export type WeatherInformationInput = z.infer<typeof weatherInformationInput>;
