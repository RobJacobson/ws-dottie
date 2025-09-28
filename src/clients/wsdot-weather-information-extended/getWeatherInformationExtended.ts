import { z } from "zod";

import {
  type WeatherReadings,
  weatherReadingsSchema,
} from "@/schemas/wsdot-weather-information-extended/weatherReadings.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getWeatherInformationExtended */
const weatherInformationExtendedInput = z.object({}).strict();

/** Endpoint metadata for getWeatherInformationExtended */
export const getWeatherInformationExtendedMeta: EndpointDefinition<
  WeatherInformationExtendedInput,
  WeatherReadings
> = {
  api: "wsdot-weather-information-extended",
  function: "getWeatherInformationExtended",
  endpoint: "/traffic/api/api/Scanweb",
  inputSchema: weatherInformationExtendedInput,
  outputSchema: weatherReadingsSchema,
  sampleParams: {},
  cacheStrategy: "MODERATE",
};

// Type exports
export type WeatherInformationExtendedInput = z.infer<
  typeof weatherInformationExtendedInput
>;
