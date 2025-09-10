import { z } from "zod";
import { weatherReadingsSchema } from "@/schemas/wsdot-weather-information-extended";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getWeatherInformationExtended */
export const getWeatherInformationExtendedParamsSchema = z.object({});

/** GetWeatherInformationExtended params type */
export type GetWeatherInformationExtendedParams = z.infer<
  typeof getWeatherInformationExtendedParamsSchema
>;

/** Endpoint definition for getWeatherInformationExtended */
export const getWeatherInformationExtendedDef = defineEndpoint({
  moduleGroup: "wsdot-weather-information-extended",
  functionName: "getWeatherInformationExtended",
  endpoint: "/traffic/api/api/Scanweb",
  inputSchema: getWeatherInformationExtendedParamsSchema,
  outputSchema: weatherReadingsSchema,
  sampleParams: {},
  cacheStrategy: "HOURLY_UPDATES",
});
