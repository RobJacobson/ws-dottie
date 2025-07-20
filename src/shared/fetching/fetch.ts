// WSF and WSDOT fetch utilities

import {
  API_BASES,
  API_KEY,
  type LoggingMode,
  WSDOT_BASE_URLS,
  type WsdotSource,
  type WsfSource,
} from "./config";
import { fetchInternal } from "./fetchInternal";

/**
 * Fetches data from WSF API with a complete URL
 *
 * @param source - The API source: "vessels", "terminals", or "schedule"
 * @param endpoint - The complete API endpoint path (e.g., "/vessellocations/123")
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to the API response or throws WsdotApiError if fetch fails
 */
export const fetchWsf = async <T>(
  source: WsfSource,
  endpoint: string,
  logMode?: LoggingMode
): Promise<T> => {
  const baseUrl = API_BASES[source];
  const url = `${baseUrl}${endpoint}?apiaccesscode=${API_KEY}`;
  return await fetchInternal<T>(url, endpoint, logMode);
};

/**
 * Fetches data from WSDOT Traveler Information API with a complete URL
 *
 * @param source - The WSDOT API source (e.g., "highwayCameras", "trafficFlow")
 * @param endpoint - The complete API endpoint path (e.g., "/GetCamerasAsJson")
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to the API response or throws WsdotApiError if fetch fails
 */
export const fetchWsdot = async <T>(
  source: WsdotSource,
  endpoint: string,
  logMode?: LoggingMode
): Promise<T> => {
  const baseUrl = WSDOT_BASE_URLS[source];
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${baseUrl}${endpoint}${separator}AccessCode=${API_KEY}`;
  return await fetchInternal<T>(url, endpoint, logMode);
};
