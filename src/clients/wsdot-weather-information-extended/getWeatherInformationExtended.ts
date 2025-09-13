import { z } from "zod";
import { weatherReadingsSchema } from "@/schemas/wsdot-weather-information-extended";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getWeatherInformationExtended */
const weatherInformationExtendedInput = z.object({});

/** Endpoint metadata for getWeatherInformationExtended */
export const getWeatherInformationExtendedMeta = defineEndpoint({
  api: "wsdot-weather-information-extended",
  function: "getWeatherInformationExtended",
  endpoint: "/traffic/api/api/Scanweb",
  inputSchema: weatherInformationExtendedInput,
  outputSchema: weatherReadingsSchema,
  sampleParams: {},
  cacheStrategy: "HOURLY_UPDATES",
});

// Type exports
export type WeatherInformationExtendedInput = z.infer<
  typeof weatherInformationExtendedInput
>;
