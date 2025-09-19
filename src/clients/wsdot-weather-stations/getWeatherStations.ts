import { z } from "zod";

import {
  type WeatherStations,
  weatherStationsSchema,
} from "@/schemas/wsdot-weather-stations/weatherStations.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getWeatherStations */
const weatherStationsInput = z.object({});

/** Endpoint metadata for getWeatherStations */
export const getWeatherStationsMeta: EndpointDefinition<
  WeatherStationsInput,
  WeatherStations
> = {
  id: "wsdot-weather-stations/getWeatherStations",
  endpoint:
    "/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson",
  inputSchema: weatherStationsInput,
  outputSchema: weatherStationsSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type WeatherStationsInput = z.infer<typeof weatherStationsInput>;
