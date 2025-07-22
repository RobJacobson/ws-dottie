// WSDOT Weather Stations API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc

import { createFetchFunction } from "@/shared/fetching/fetchApi";

import type { WeatherStationsResponse } from "./types";

// Module-scoped fetch function for weather stations API
const fetchWeatherStations = createFetchFunction(
  "https://wsdot.wa.gov/Traffic/api/WeatherStations/WeatherStationsREST.svc"
);

/**
 * Retrieves a list of WSDOT weather stations
 * This endpoint provides information about all weather stations maintained by WSDOT
 *
 * @returns Promise resolving to an array of weather station data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const weatherStations = await getWeatherStations();
 * console.log(weatherStations[0].StationName); // "S 144th St on SB I-5 at mp 155.32"
 * ```
 */
export const getWeatherStations = (): Promise<WeatherStationsResponse> =>
  fetchWeatherStations<WeatherStationsResponse>("/GetCurrentStationsAsJson");
