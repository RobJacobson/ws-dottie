import { z } from "zod";
import {
  type WeatherInfo,
  weatherInfoSchema,
} from "@/schemas/wsdot-weather-information";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export { weatherInfoSchema };
export type { WeatherInfo };

export const getWeatherInformationByStationIdParamsSchema = z
  .object({
    stationId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific weather station to retrieve. This ID corresponds to specific monitoring stations like 1909 (S 144th St on SB I-5), 1928 (EB I-90 Echo Lake), 1966 (NE 130th Street on I-5), or 1983 (Satus Pass on US 97). The ID is assigned by the WSDOT system and can be obtained from the getWeatherInformation endpoint response."
      ),
  })
  .describe(
    "Parameters for retrieving weather information for a specific weather station by its unique identifier"
  );

export type GetWeatherInformationByStationIdParams = z.infer<
  typeof getWeatherInformationByStationIdParamsSchema
>;

export const getWeatherInformationByStationId = zodFetch<
  GetWeatherInformationByStationIdParams,
  WeatherInfo
>(
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationByStationIDAsJson?StationID={stationId}",
  getWeatherInformationByStationIdParamsSchema,
  weatherInfoSchema
);

export const weatherInformationByStationIdOptions = createQueryOptions({
  apiFunction: getWeatherInformationByStationId,
  queryKey: [
    "wsdot",
    "weather-information",
    "getWeatherInformationByStationId",
  ],
  cacheStrategy: "MINUTE_UPDATES",
});
