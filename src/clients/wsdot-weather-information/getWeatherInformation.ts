import { z } from "zod";
import {
  type WeatherInformation,
  weatherInformationSchema,
} from "@/schemas/wsdot-weather-information";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export { weatherInformationSchema };
export type { WeatherInformation };

export const getWeatherInformationParamsSchema = z.object({});

export type GetWeatherInformationParams = z.infer<
  typeof getWeatherInformationParamsSchema
>;

export const getWeatherInformation = zodFetch<
  GetWeatherInformationParams,
  WeatherInformation
>(
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson",
  getWeatherInformationParamsSchema,
  weatherInformationSchema
);

export const weatherInformationOptions = createQueryOptions({
  apiFunction: getWeatherInformation,
  queryKey: ["wsdot", "weather-information", "getWeatherInformation"],
  cacheStrategy: "MINUTE_UPDATES",
});
