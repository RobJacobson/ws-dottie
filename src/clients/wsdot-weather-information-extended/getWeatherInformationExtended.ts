import { z } from "zod";
import { weatherReadingsSchema } from "@/schemas/wsdot-weather-information-extended";

/** Input schema for getWeatherInformationExtended */
const weatherInformationExtendedInput = z.object({});

/** Endpoint metadata for getWeatherInformationExtended */
export const getWeatherInformationExtendedMeta = {
  api: "wsdot-weather-information-extended",
  function: "getWeatherInformationExtended",
  endpoint: "/traffic/api/api/Scanweb",
  inputSchema: weatherInformationExtendedInput,
  outputSchema: weatherReadingsSchema,
  sampleParams: {},
  cacheStrategy: "HOURLY_UPDATES",
} as const;

// Type exports
export type WeatherInformationExtendedInput = z.infer<
  typeof weatherInformationExtendedInput
>;
