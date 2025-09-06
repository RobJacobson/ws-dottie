import { z } from "zod";
import {
  type WeatherReading,
  weatherReadingSchema,
} from "@/schemas/wsdot-weather-information-extended";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getWeatherInformationExtendedParamsSchema = z.object({});

export type GetWeatherInformationExtendedParams = z.infer<
  typeof getWeatherInformationExtendedParamsSchema
>;

export const getWeatherInformationExtended = zodFetch<
  GetWeatherInformationExtendedParams,
  WeatherReading[]
>(
  "/traffic/api/api/Scanweb",
  getWeatherInformationExtendedParamsSchema,
  z.array(weatherReadingSchema)
);

export const weatherInformationExtendedOptions = createQueryOptions({
  apiFunction: getWeatherInformationExtended,
  queryKey: [
    "wsdot",
    "weather-information-extended",
    "getWeatherInformationExtended",
  ],
  cacheStrategy: "HOURLY_UPDATES",
});
