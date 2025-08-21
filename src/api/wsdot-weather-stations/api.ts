// WSDOT Weather Stations API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc

import { zodFetch } from "@/shared/fetching";

import {
  type GetWeatherStationsParams,
  getWeatherStationsParamsSchema,
} from "./inputs";
import { weatherStationDataArraySchema } from "./outputs";

// Base URL path for WSDOT Weather Stations API
const WSDOT_WEATHER_STATIONS_BASE =
  "/Traffic/api/WeatherStations/WeatherStationsREST.svc";

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
  return zodFetch(
    `${WSDOT_WEATHER_STATIONS_BASE}/GetCurrentStationsAsJson`,
    {
      input: getWeatherStationsParamsSchema,
      output: weatherStationDataArraySchema,
    },
    params
  );
};
