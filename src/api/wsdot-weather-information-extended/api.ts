// WSDOT Weather Information Extended API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_traveler_a_p_i_1_1_controller_1_1_scanweb_controller.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/api/Scanweb

import { createFetchFactory } from "@/shared/fetching/api";

import type { WeatherReading } from "./types";

// Create a factory function for WSDOT Weather Information Extended API
const createWsdotWeatherInformationExtendedFetch = createFetchFactory(
  "https://wsdot.wa.gov/traffic/api/api/Scanweb"
);

/**
 * Get extended weather information from WSDOT Weather Information Extended API
 *
 * Retrieves additional weather readings including surface and subsurface
 * measurements from WSDOT weather stations.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise containing extended weather readings data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const weatherReadings = await getWeatherInformationExtended();
 * console.log(weatherReadings[0].AirTemperature); // 14.7
 * ```
 */
export const getWeatherInformationExtended =
  createWsdotWeatherInformationExtendedFetch<WeatherReading[]>("");
