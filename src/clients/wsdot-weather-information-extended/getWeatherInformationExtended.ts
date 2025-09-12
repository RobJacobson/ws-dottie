import { z } from "zod";
import { weatherReadingsSchema } from "@/schemas/wsdot-weather-information-extended";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getWeatherInformationExtended */
const getWeatherInformationExtendedParamsSchema = z.object({});

/** GetWeatherInformationExtended params type */

/** Endpoint definition for getWeatherInformationExtended */
export const getWeatherInformationExtendedDef = defineEndpoint({
  api: "wsdot-weather-information-extended",
  function: "getWeatherInformationExtended",
  endpoint: "/traffic/api/api/Scanweb",
  inputSchema: getWeatherInformationExtendedParamsSchema,
  outputSchema: weatherReadingsSchema,
  sampleParams: {},
  cacheStrategy: "HOURLY_UPDATES",
});
