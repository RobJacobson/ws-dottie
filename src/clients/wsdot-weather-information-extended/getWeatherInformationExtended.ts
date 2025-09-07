import { z } from "zod";
import {
  type WeatherReading,
  weatherReadingSchema,
} from "@/schemas/wsdot-weather-information-extended";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getWeatherInformationExtendedParamsSchema = z.object({});

export type GetWeatherInformationExtendedParams = z.infer<
  typeof getWeatherInformationExtendedParamsSchema
>;

export const getWeatherInformationExtended = async (
  params: GetWeatherInformationExtendedParams
): Promise<WeatherReading[]> =>
  zodFetch({
    endpoint: "/traffic/api/api/Scanweb",
    inputSchema: getWeatherInformationExtendedParamsSchema,
    outputSchema: z.array(weatherReadingSchema),
    params,
  });

export const weatherInformationExtendedOptions = createQueryOptions({
  apiFunction: getWeatherInformationExtended,
  queryKey: [
    "wsdot",
    "weather-information-extended",
    "getWeatherInformationExtended",
  ],
  cacheStrategy: "HOURLY_UPDATES",
});
