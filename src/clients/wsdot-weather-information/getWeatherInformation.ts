import { z } from "zod";
import { weatherInformationSchema } from "@/schemas/wsdot-weather-information";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getWeatherInformation */
export const getWeatherInformationParamsSchema = z.object({});

/** GetWeatherInformation params type */
export type GetWeatherInformationParams = z.infer<
  typeof getWeatherInformationParamsSchema
>;

/** Endpoint definition for getWeatherInformation */
export const getWeatherInformationDef = defineEndpoint({
  moduleGroup: "wsdot-weather-information",
  functionName: "getWeatherInformation",
  endpoint:
    "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson",
  inputSchema: getWeatherInformationParamsSchema,
  outputSchema: weatherInformationSchema,
  sampleParams: {},
  cacheStrategy: "MINUTE_UPDATES",
});
