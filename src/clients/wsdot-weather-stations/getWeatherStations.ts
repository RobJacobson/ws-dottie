import { z } from "zod";
import { weatherStationsSchema } from "@/schemas/wsdot-weather-stations";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getWeatherStations */
const getWeatherStationsParamsSchema = z.object({});

/** GetWeatherStations params type */

/** Endpoint definition for getWeatherStations */
export const getWeatherStationsDef = defineEndpoint({
  api: "wsdot-weather-stations",
  function: "getWeatherStations",
  endpoint:
    "/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson",
  inputSchema: getWeatherStationsParamsSchema,
  outputSchema: weatherStationsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
