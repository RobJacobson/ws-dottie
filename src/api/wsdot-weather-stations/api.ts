// WSDOT Weather Stations API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc

import { createFetchFactory } from "@/shared/fetching/api";

import type { WeatherStationData } from "./types";

// Create a factory function for WSDOT Weather Stations API
const createFetch = createFetchFactory(
  "/Traffic/api/WeatherStations/WeatherStationsREST.svc"
);

/**
 * Get weather stations from WSDOT Weather Stations API
 *
 * Retrieves information about all weather stations maintained by WSDOT.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise containing weather stations data
 * @throws {WsdotApiError} When the API request fails
 */
export const getWeatherStations = createFetch<WeatherStationData[]>(
  "/GetCurrentStationsAsJson"
);
