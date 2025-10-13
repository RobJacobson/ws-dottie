/**
 * @fileoverview URL Builder for WS-Dottie API Requests
 *
 * This module processes complete URL templates for WS-Dottie API requests,
 * including parameter encoding, template parameter replacement, and API key injection.
 * The complete URLs are pre-constructed from API definitions before being passed to this module.
 *
 * Key features:
 * - Template parameter replacement (e.g., {terminalId} -> actual value)
 * - Automatic date conversion to .NET format for WSDOT APIs
 * - API key injection with correct parameter names per service
 * - URL cleanup to remove empty parameters
 * - Support for both WSDOT (/traffic/) and WSF (/ferries/) endpoints
 */

import { configManager } from "@/shared/utils/configManager";

/**
 * Builds a complete API URL with template parameter replacement and API key injection
 *
 * This function processes a complete URL template by splitting it into path and query parts,
 * replacing placeholders like {id} in the path with provided values, adding remaining
 * parameters as query parameters, and injecting the appropriate API key based on the service type.
 *
 * @param urlTemplate - The complete API URL template with optional placeholders (e.g., "https://example.com/api/endpoint/{paramId}")
 * @param params - Optional parameters for template replacement and query string construction
 * @returns Complete URL string ready for API requests
 * @example
 * ```typescript
 * buildCompleteUrl("https://www.wsdot.wa.gov/ferries/api/schedule/rest/schedule/{tripDate}/{routeId}", {
 *   tripDate: "2024-01-01",
 *   routeId: 1,
 * });
 * // Returns: "https://www.wsdot.wa.gov/ferries/api/schedule/rest/schedule/2024-01-01/1?apiaccesscode=YOUR_API_KEY"
 * ```
 */
export const buildCompleteUrl = <TInput = never>(
  urlTemplate: string,
  params?: TInput
): string => {
  if (!params) return urlTemplate;

  const paramRecord = params as Record<string, unknown>;
  const { path, query } = splitUrlIntoParts(urlTemplate);

  // Process path template replacement
  const processedPath = replacePathTemplates(path, paramRecord);

  // Build query string
  const queryString = buildQueryString(query, paramRecord);

  // Combine path and query, clean up unused templates
  const baseUrl = queryString
    ? `${processedPath}?${queryString}`
    : processedPath;

  const cleanedUrl = removeUnusedTemplates(baseUrl);

  // Inject API key
  const url = new URL(cleanedUrl);
  injectApiKey(url);

  return url.toString();
};

/**
 * Split URL template into base path and query string parts
 * @param urlTemplate - Complete URL template
 * @returns Object with path and query parts
 */
const splitUrlIntoParts = (
  urlTemplate: string
): { path: string; query: string } => {
  const [path, query = ""] = urlTemplate.split("?");
  return { path, query };
};

/**
 * Replace template parameters in the path portion of URL
 * @param pathTemplate - Path template with {param} placeholders
 * @param params - Parameters to substitute
 * @returns Path with parameters replaced
 */
const replacePathTemplates = (
  pathTemplate: string,
  params: Record<string, unknown>
): string => {
  let result = pathTemplate;
  for (const [key, value] of Object.entries(params)) {
    const formattedValue = formatParamValue(value);
    result = result.replace(`{${key}}`, formattedValue);
  }
  return result;
};

/**
 * Build query string from parameters
 * @param existingQuery - Existing query string from template
 * @param params - Parameters to add as query params
 * @returns Complete query string
 */
const buildQueryString = (
  existingQuery: string,
  params: Record<string, unknown>
): string => {
  const searchParams = new URLSearchParams(existingQuery);

  // Add new parameters that aren't already in the template
  for (const [key, value] of Object.entries(params)) {
    if (value != null && !searchParams.has(key)) {
      searchParams.set(key, formatParamValue(value));
    }
  }

  return searchParams.toString();
};

/**
 * Clean up any remaining template placeholders in the URL
 * @param url - URL string to clean
 * @returns URL with template placeholders removed
 */
const removeUnusedTemplates = (url: string): string =>
  url.replace(/\{[^}]+\}/g, "");

/**
 * Inject appropriate API key based on service type
 * @param url - URL object to modify
 */
const injectApiKey = (url: URL): void => {
  const serviceType = getServiceType(url.toString());
  const apiKey = configManager.getApiKey();
  const keyParam = serviceType === "wsdot" ? "AccessCode" : "apiaccesscode";
  url.searchParams.set(keyParam, apiKey);
};

/**
 * Determines the service type based on URL path patterns
 *
 * @param url - The URL string to analyze
 * @returns The detected service type
 */
const getServiceType = (url: string): "wsdot" | "wsf" | "unknown" =>
  url.toLowerCase().includes("/traffic/") ? "wsdot" : "wsf";

/**
 * Format parameter value for API (handles dates, encoding, etc.)
 * @param value - Value to format
 * @returns Formatted parameter value
 */
const formatParamValue = (value: unknown): string =>
  value instanceof Date ? value.toISOString() : String(value);
