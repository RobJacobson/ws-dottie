import { z } from "zod";
import { weatherStationsSchema } from "@/schemas/wsdot-weather-stations";
import type { WeatherStation } from "@/schemas/wsdot-weather-stations/weatherStation.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getWeatherStations */
const weatherStationsInput = z.object({});

/** Endpoint metadata for getWeatherStations */
export const getWeatherStationsMeta: Endpoint<
  WeatherStationsInput,
  WeatherStation[]
> = {
  api: "wsdot-weather-stations",
  function: "getWeatherStations",
  endpoint:
    "/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson",
  inputSchema: weatherStationsInput,
  outputSchema: weatherStationsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type WeatherStationsInput = z.infer<typeof weatherStationsInput>;
