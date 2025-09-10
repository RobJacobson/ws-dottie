import { z } from "zod";
import { weatherStationsSchema } from "@/schemas/wsdot-weather-stations";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getWeatherStations */
export const getWeatherStationsParamsSchema = z.object({});

/** GetWeatherStations params type */
export type GetWeatherStationsParams = z.infer<
  typeof getWeatherStationsParamsSchema
>;

/** Endpoint definition for getWeatherStations */
export const getWeatherStationsDef = defineEndpoint({
  moduleGroup: "wsdot-weather-stations",
  functionName: "getWeatherStations",
  endpoint:
    "/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson",
  inputSchema: getWeatherStationsParamsSchema,
  outputSchema: weatherStationsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
