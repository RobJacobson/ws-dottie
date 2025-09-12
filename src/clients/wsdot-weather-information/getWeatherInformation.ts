import { z } from "zod";
import { weatherInformationSchema } from "@/schemas/wsdot-weather-information";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getWeatherInformation */
const getWeatherInformationParamsSchema = z.object({});

/** GetWeatherInformation params type */

/** Endpoint definition for getWeatherInformation */
export const getWeatherInformationDef = defineEndpoint({
  api: "wsdot-weather-information",
  function: "getWeatherInformation",
  endpoint:
    "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson",
  inputSchema: getWeatherInformationParamsSchema,
  outputSchema: weatherInformationSchema,
  sampleParams: {},
  cacheStrategy: "MINUTE_UPDATES",
});
