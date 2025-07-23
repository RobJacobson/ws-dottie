// API client factory for WSF and WSDOT APIs

import log from "@/shared/logger";

import { API_KEY, type LoggingMode } from "./config";
import {
  createCrossPlatformFetch,
  getEnvironmentType,
} from "./crossPlatformFetch";
import { createApiError } from "./errors";
import { parseWsdotJson } from "./parseJson";

type ApiType = "wsdot" | "wsf";

/**
 * Infers the API type from the base URL
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
 * Creates a specialized API client for a specific API endpoint
 *
 * This function combines URL construction, API key injection, platform-specific fetching,
 * error handling, and data transformation into a single, clean interface.
 *
 * @param baseUrl - The base URL for the API endpoint (e.g., "wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc")
 * @returns An API client function that handles the complete request lifecycle
 */
export const createApiClient = (baseUrl: string) => {
  const apiType = inferApiType(baseUrl);
  const apiKeyParam = apiType === "wsdot" ? "AccessCode" : "apiaccesscode";

  // Get the appropriate fetch strategy for the current environment
  const fetchStrategy = createCrossPlatformFetch();
  const environmentType = getEnvironmentType();

  return async <T>(endpoint: string, logMode?: LoggingMode): Promise<T> => {
    try {
      // Construct the full URL with API key
      const separator = endpoint.includes("?") ? "&" : "?";
      const url = `${baseUrl}${endpoint}${separator}${apiKeyParam}=${API_KEY}`;

      if (logMode === "debug") {
        log.debug(
          `[${apiType.toUpperCase()} ${endpoint}] Using ${environmentType} fetch strategy`
        );
      }

      // Execute the fetch strategy to get raw response string
      let responseString: string;
      try {
        responseString = await fetchStrategy(url);
      } catch (err) {
        // Always wrap as WsdotApiError for consistent error handling
        throw createApiError(err, endpoint, url);
      }

      // Apply data transformation using JSON reviver
      const transformedResponse = parseWsdotJson<T>(responseString);

      if (logMode === "debug") {
        log.debug(
          `[${apiType.toUpperCase()} ${endpoint}] Response transformed:`,
          transformedResponse
        );
      }

      return transformedResponse;
    } catch (error) {
      if (logMode === "debug" || logMode === "info") {
        log.error(
          `[${apiType.toUpperCase()} ${endpoint}] Request failed:`,
          error
        );
      }

      // Always wrap as WsdotApiError for consistent error handling
      throw createApiError(error, endpoint);
    }
  };
};
