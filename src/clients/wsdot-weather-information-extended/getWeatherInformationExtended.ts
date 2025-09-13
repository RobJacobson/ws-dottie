import { z } from "zod";
import { weatherReadingsSchema } from "@/schemas/wsdot-weather-information-extended";
import type { WeatherReading } from "@/schemas/wsdot-weather-information-extended/weatherReading.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getWeatherInformationExtended */
const weatherInformationExtendedInput = z.object({});

/** Endpoint metadata for getWeatherInformationExtended */
export const getWeatherInformationExtendedMeta: Endpoint<
  WeatherInformationExtendedInput,
  WeatherReading[]
> = {
  api: "wsdot-weather-information-extended",
  function: "getWeatherInformationExtended",
  endpoint: "/traffic/api/api/Scanweb",
  inputSchema: weatherInformationExtendedInput,
  outputSchema: weatherReadingsSchema,
  sampleParams: {},
  cacheStrategy: "HOURLY_UPDATES",
};

// Type exports
export type WeatherInformationExtendedInput = z.infer<
  typeof weatherInformationExtendedInput
>;
