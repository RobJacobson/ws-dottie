// WSDOT Weather Information Extended API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_traveler_a_p_i_1_1_controller_1_1_scanweb_controller.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/api/Scanweb

import { zodFetch } from "@/shared/fetching";

import {
  type GetWeatherInformationExtendedParams,
  getWeatherInformationExtendedParamsSchema,
} from "./inputs";
import { weatherReadingArraySchema } from "./outputs";

// Base URL path for WSDOT Weather Information Extended API
const WSDOT_WEATHER_INFORMATION_EXTENDED_BASE = "/traffic/api/api/Scanweb";

/**
 * Get extended weather information from WSDOT Weather Information Extended API
 *
 * Retrieves additional weather readings including surface and subsurface
 * measurements from WSDOT weather stations.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing extended weather readings data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const weatherReadings = await getWeatherInformationExtended({});
 * console.log(weatherReadings[0].AirTemperature); // 14.7
 * ```
 */
export const getWeatherInformationExtended = async (
  params: GetWeatherInformationExtendedParams = {}
) => {
  return zodFetch(
    `${WSDOT_WEATHER_INFORMATION_EXTENDED_BASE}`,
    {
      input: getWeatherInformationExtendedParamsSchema,
      output: weatherReadingArraySchema,
    },
    params
  );
};
