// WSF fetch utilities

import { API_KEY, type LoggingMode } from "./config";
import { fetchInternal } from "./fetchInternal";

/**
 * Fetches data from WSF API with a complete URL
 *
 * @param source - The API source: "vessels", "terminals", "schedule", or "fares"
 * @param endpoint - The complete API endpoint path (e.g., "/vessellocations/123")
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to the API response or throws WsdotApiError if fetch fails
 */
export const fetchWsf = async <T>(
  source: string,
  endpoint: string,
  logMode?: LoggingMode
): Promise<T> => {
  const url = `https://www.wsdot.wa.gov/ferries/api/${source}/rest${endpoint}?apiaccesscode=${API_KEY}`;
  return await fetchInternal<T>(url, endpoint, logMode);
};
