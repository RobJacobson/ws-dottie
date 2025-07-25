/**
 * API Fetch Factory for WSDOT and WSF APIs
 *
 * This module provides factory functions for creating pre-configured fetch functions
 * that handle URL construction, parameter interpolation, and API key injection.
 * It reduces boilerplate code in API modules by providing a consistent interface
 * for creating endpoint-specific fetch functions.
 *
 * Key Features:
 * - Automatic API key injection (WSDOT vs WSF parameter names)
 * - Parameter interpolation with type safety
 * - Automatic date formatting for Date objects
 * - URL construction with proper query parameter handling
 * - Function overloads for cleaner API
 *
 * Usage:
 * ```typescript
 * // Create a factory for a specific base URL
 * const createFetch = createFetchFactory("https://api.example.com");
 *
 * // Create a simple fetch function
 * const getData = createFetch<MyResponseType>("/endpoint");
 * const data = await getData();
 *
 * // Create a fetch function with parameters
 * const getItem = createFetch<{id: string}, MyResponseType>("/item/{id}");
 * const item = await getItem({ id: "123" });
 *
 * // With logging
 * const item = await getItem({ id: "123" }, "debug");
 * ```
 */

import { configManager } from "@/shared/config";
import type { LoggingMode } from "@/shared/logger";

import type { JsonWithDates } from "../parsing";
import { jsDateToYyyyMmDd } from "../parsing";
import { createApiClient } from "./createApiClient";

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
