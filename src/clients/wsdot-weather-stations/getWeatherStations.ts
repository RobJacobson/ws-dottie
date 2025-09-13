import { z } from "zod";
import { weatherStationsSchema } from "@/schemas/wsdot-weather-stations";

/** Input schema for getWeatherStations */
const weatherStationsInput = z.object({});

/** Endpoint metadata for getWeatherStations */
export const getWeatherStationsMeta = {
  api: "wsdot-weather-stations",
  function: "getWeatherStations",
  endpoint:
    "/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson",
  inputSchema: weatherStationsInput,
  outputSchema: weatherStationsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type WeatherStationsInput = z.infer<typeof weatherStationsInput>;
