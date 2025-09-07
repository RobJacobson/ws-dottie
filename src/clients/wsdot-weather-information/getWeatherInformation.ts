import { z } from "zod";
import {
  type WeatherInformation,
  weatherInformationSchema,
} from "@/schemas/wsdot-weather-information";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export { weatherInformationSchema };
export type { WeatherInformation };

export const getWeatherInformationParamsSchema = z.object({});

export type GetWeatherInformationParams = z.infer<
  typeof getWeatherInformationParamsSchema
>;

export const getWeatherInformation = async (
  params: GetWeatherInformationParams
): Promise<WeatherInformation> =>
  zodFetch({
    endpoint:
      "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson",
    inputSchema: getWeatherInformationParamsSchema,
    outputSchema: weatherInformationSchema,
    params,
  });

export const weatherInformationOptions = createQueryOptions({
  apiFunction: getWeatherInformation,
  queryKey: ["wsdot", "weather-information", "getWeatherInformation"],
  cacheStrategy: "MINUTE_UPDATES",
});
