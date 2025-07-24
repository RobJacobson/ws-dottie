// API utility functions to reduce boilerplate in API modules

import type { LoggingMode } from "@/shared/logger";

import { configManager } from "./configManager";
import { createApiClient } from "./createApiClient";
import { jsDateToYyyyMmDd } from "./dateUtils";
import type { JsonWithDates } from "./parseJson";

/**
 * Determines the API key parameter name based on the base URL
 * WSF APIs use "apiaccesscode", WSDOT APIs use "AccessCode"
 */
const getApiKeyParam = (baseUrl: string): string => {
  const isWsf = baseUrl.includes("wsdot.wa.gov/ferries");
  return isWsf ? "apiaccesscode" : "AccessCode";
};

/**
 * Interpolates parameters into an endpoint template
 * Automatically formats Date objects as YYYY-MM-DD strings
 */
const interpolateParams = (
  endpointTemplate: string,
  params?: Record<string, JsonWithDates>
): string => {
  if (!params || Object.keys(params).length === 0) {
    return endpointTemplate;
  }

  return Object.entries(params).reduce(
    (endpoint, entry) => substituteParam(endpoint, entry),
    endpointTemplate
  );
};

/**
 * Constructs a complete URL with API key parameter
 */
const buildUrl = (baseUrl: string, endpoint: string): string => {
  const apiKeyParam = getApiKeyParam(baseUrl);
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${baseUrl}${endpoint}${separator}${apiKeyParam}=${configManager.getApiKey()}`;
};

const substituteParam = (
  endpoint: string,
  [key, value]: [string, JsonWithDates]
): string => {
  const placeholder = `{${key}}`;
  if (!endpoint.includes(placeholder)) {
    // Parameter was passed but placeholder doesn't exist in endpoint
    throw new Error(
      `Parameter "${key}" was provided but placeholder "{${key}}" not found in endpoint template. ` +
        `Available placeholders: ${endpoint.match(/\{[^}]+\}/g)?.join(", ") || "none"}`
    );
  }
  // Automatically format dates as YYYY-MM-DD, convert others to string
  const stringValue =
    value instanceof Date ? jsDateToYyyyMmDd(value) : String(value);
  return endpoint.replace(placeholder, stringValue);
};

/**
 * Creates a factory function that returns fetch functions pre-configured with a specific base URL
 *
 * @param baseUrl - The base URL for the API
 * @returns A function that creates fetch functions for the specified base URL
 */
export const createFetchFactory = (baseUrl: string) => {
  const fetchFn = createApiClient();

  // Function overloads for cleaner API
  function createFetch<T = JsonWithDates>(
    endpointTemplate: string
  ): (logMode?: LoggingMode) => Promise<T>;
  function createFetch<
    P extends Record<string, JsonWithDates>,
    T = JsonWithDates,
  >(endpointTemplate: string): (params: P, logMode?: LoggingMode) => Promise<T>;

  // Implementation
  function createFetch<
    P extends Record<string, JsonWithDates> = never,
    T = JsonWithDates,
  >(endpointTemplate: string) {
    return (params?: P, logMode?: LoggingMode): Promise<T> => {
      // Interpolate parameters into the endpoint template
      const endpoint = interpolateParams(endpointTemplate, params);

      // Build the complete URL with API key parameter
      const url = buildUrl(baseUrl, endpoint);

      // Use the API client to make the request
      return fetchFn<T>(url, logMode);
    };
  }

  return createFetch;
};
