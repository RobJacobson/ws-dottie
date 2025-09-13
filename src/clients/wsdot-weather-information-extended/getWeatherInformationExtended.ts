import { z } from "zod";
import {
  type WeatherReadings,
  weatherReadingsSchema,
} from "@/schemas/wsdot-weather-information-extended/weatherReadings.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getWeatherInformationExtended */
const weatherInformationExtendedInput = z.object({});

/** Endpoint metadata for getWeatherInformationExtended */
export const getWeatherInformationExtendedMeta: Endpoint<
  WeatherInformationExtendedInput,
  WeatherReadings
> = {
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
