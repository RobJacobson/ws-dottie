// WSDOT Weather Stations API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc

import { createZodFetchFactory } from "@/shared/fetching/api";

import {
  type GetWeatherStationsParams,
  getWeatherStationsParamsSchema,
} from "./inputs";
import type { WeatherStationData } from "./outputs";
import { weatherStationDataArraySchema } from "./outputs";

// Create a factory function for WSDOT Weather Stations API
const createFetch = createZodFetchFactory(
  "/Traffic/api/WeatherStations/WeatherStationsREST.svc"
);

/**
 * Get weather stations from WSDOT Weather Stations API
 *
 * Retrieves information about all weather stations maintained by WSDOT.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing weather stations data
 * @throws {Error} When the API request fails or validation fails
 */
export const getWeatherStations = async (
  params: GetWeatherStationsParams = {}
) => {
  const fetcher = createFetch<GetWeatherStationsParams>(
    "/GetCurrentStationsAsJson",
    {
      input: getWeatherStationsParamsSchema,
      output: weatherStationDataArraySchema,
    }
  );
  return fetcher(params) as Promise<WeatherStationData[]>;
};
