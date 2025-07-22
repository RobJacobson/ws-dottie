// Factory function to create specialized fetch functions for WSF and WSDOT APIs

import { API_KEY, type LoggingMode } from "./config";
import { fetchInternal } from "./fetchInternal";

type ApiType = "wsdot" | "wsf";

/**
 * Infers the API type from the base URL
 *
 * @param baseUrl - The base URL for the API endpoint
 * @returns The inferred API type ("wsdot" or "wsf")
 */
const inferApiType = (baseUrl: string): ApiType => {
  if (baseUrl.includes("wsdot.wa.gov/ferries")) {
    return "wsf";
  }
  if (baseUrl.includes("wsdot.wa.gov")) {
    return "wsdot";
  }
  throw new Error(`Unable to infer API type from base URL: ${baseUrl}`);
};

/**
 * Creates a specialized fetch function for a specific API endpoint
 *
 * @param baseUrl - The base URL for the API endpoint (e.g., "wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc")
 * @returns A fetch function that automatically uses the provided base URL and adds the API key
 */
export const createFetchFunction = (baseUrl: string) => {
  const apiType = inferApiType(baseUrl);
  const apiKeyParam = apiType === "wsdot" ? "AccessCode" : "apiaccesscode";

  return async <T>(endpoint: string, logMode?: LoggingMode): Promise<T> => {
    const separator = endpoint.includes("?") ? "&" : "?";
    const url = `${baseUrl}${endpoint}${separator}${apiKeyParam}=${API_KEY}`;
    return fetchInternal<T>(url, endpoint, logMode);
  };
};
