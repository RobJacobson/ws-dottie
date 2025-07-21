// WSDOT Weather Information Extended API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_traveler_a_p_i_1_1_controller_1_1_scanweb_controller.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/api/Scanweb

import { fetchWsdot } from "@/shared/fetching/fetchWsdot";

import type {
  WeatherInformationExtendedResponse,
  WeatherReading,
} from "./types";

/**
 * Retrieves extended weather information from WSDOT API
 * This endpoint provides additional weather readings including surface and subsurface measurements
 *
 * @returns Promise resolving to an array of extended weather readings
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const weatherReadings = await getWeatherInformationExtended();
 * console.log(weatherReadings[0].AirTemperature); // 14.7
 * ```
 */
export const getWeatherInformationExtended =
  async (): Promise<WeatherInformationExtendedResponse> => {
    return await fetchWsdot<WeatherInformationExtendedResponse>(
      "weatherInformationExtended",
      ""
    );
  };
