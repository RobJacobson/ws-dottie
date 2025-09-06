import { z } from "zod";
import {
  type WeatherStation,
  type WeatherStations,
  weatherStationSchema,
  weatherStationsSchema,
} from "@/schemas/wsdot-weather-stations";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export { weatherStationSchema, weatherStationsSchema };
export type { WeatherStation, WeatherStations };

export const getWeatherStationsParamsSchema = z.object({});

export type GetWeatherStationsParams = z.infer<
  typeof getWeatherStationsParamsSchema
>;

export const getWeatherStations = zodFetch<
  GetWeatherStationsParams,
  WeatherStations
>(
  "/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson",
  getWeatherStationsParamsSchema,
  weatherStationsSchema
);

export const weatherStationsOptions = createQueryOptions({
  apiFunction: getWeatherStations,
  queryKey: ["wsdot", "weather-stations", "getWeatherStations"],
  cacheStrategy: "DAILY_STATIC",
});
