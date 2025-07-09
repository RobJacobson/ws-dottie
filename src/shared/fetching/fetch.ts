// WSF fetch utilities

import { API_BASES, API_KEY, type LoggingMode, type WsfSource } from "./config";
import { fetchInternal } from "./fetchInternal";

/**
 * Fetches data from WSF API with a complete URL
 *
 * @param source - The API source: "vessels", "terminals", or "schedule"
 * @param endpoint - The complete API endpoint path (e.g., "/vessellocations/123")
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to the API response or null if fetch fails
 */
export const fetchWsf = async <T>(
  source: WsfSource,
  endpoint: string,
  logMode?: LoggingMode
): Promise<T | null> => {
  const baseUrl = API_BASES[source];
  const url = `${baseUrl}${endpoint}?api_key=${API_KEY}`;
  return await fetchInternal<T>(url, endpoint, logMode);
};

/**
 * Fetches array data from WSF API with a complete URL
 *
 * @param source - The API source: "vessels", "terminals", or "schedule"
 * @param endpoint - The complete API endpoint path (e.g., "/vessellocations")
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to an array of API responses or empty array if fetch fails
 */
export const fetchWsfArray = async <T>(
  source: WsfSource,
  endpoint: string,
  logMode?: LoggingMode
): Promise<T[]> => (await fetchWsf<T[]>(source, endpoint, logMode)) || [];
