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
  if (!params) {
    // Check if the URL template has unfilled parameters in the PATH portion only (not query string)
    const [pathOnly] = urlTemplate.split("?");
    const templateParams = pathOnly.match(/\{[^}]+\}/g);
    if (templateParams && templateParams.length > 0) {
      throw new Error(
        `Missing required URL parameters: ${templateParams.join(", ")} in URL template: ${urlTemplate}`
      );
    }
    return urlTemplate;
  }

  const paramRecord = params as Record<string, unknown>;
  const { path, query } = splitUrlIntoParts(urlTemplate);

  // Process path template replacement
  const processedPath = replacePathTemplates(path, paramRecord);

  // Build query string
  const queryString = buildQueryString(query, paramRecord);

  // Combine path and query
  const baseUrl = queryString
    ? `${processedPath}?${queryString}`
    : processedPath;

  // Check for any remaining unfilled template parameters in the PATH portion only (not query string)
  const [pathOnly] = baseUrl.split("?");
  const remainingPathParams = pathOnly.match(/\{[^}]+\}/g);
  if (remainingPathParams && remainingPathParams.length > 0) {
    throw new Error(
      `Missing required URL parameters: ${remainingPathParams.join(", ")} in URL: ${baseUrl}`
    );
  }

  // Inject API key
  const url = new URL(baseUrl);
  injectApiKey(url);

  return url.toString();
};

/**
 * Splits URL template into base path and query string parts
 *
 * @param urlTemplate - Complete URL template
 * @returns Object with path and query string parts
 */
const splitUrlIntoParts = (
  urlTemplate: string
): { path: string; query: string } => {
  const [path, query = ""] = urlTemplate.split("?");
  return { path, query };
};

/**
 * Replaces template parameters in the path portion of URL
 *
 * @param pathTemplate - Path template with {param} placeholders
 * @param params - Parameters to substitute into the path
 * @returns Path string with all template parameters replaced
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
 * Builds query string from parameters
 *
 * Handles template parameter replacement in existing query strings and adds
 * new parameters. Removes unfilled optional template parameters.
 *
 * @param existingQuery - Existing query string from template (may contain placeholders)
 * @param params - Parameters to add as query parameters
 * @returns Complete query string with all parameters encoded
 */
const buildQueryString = (
  existingQuery: string,
  params: Record<string, unknown>
): string => {
  // First replace template placeholders in the existing query string
  let processedQuery = existingQuery;
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      const formattedValue = formatParamValue(value);
      processedQuery = processedQuery.replace(
        new RegExp(`\\{${key}\\}`, "g"),
        formattedValue
      );
    }
  }

  // For query parameters, remove any remaining unfilled template parameters (for optional parameters)
  const remainingTemplateParams = processedQuery.match(/\{[^}]+\}/g);
  if (remainingTemplateParams && remainingTemplateParams.length > 0) {
    // Remove template placeholders and their associated key-value pairs if the value is missing
    for (const templateParam of remainingTemplateParams) {
      const paramName = templateParam.slice(1, -1); // Extract parameter name from {paramName}

      // Remove the entire parameter assignment (paramName={paramName}& or &paramName={paramName} or ?paramName={paramName})
      processedQuery = processedQuery.replace(
        new RegExp(`[&?]${paramName}=${templateParam}`, "g"),
        ""
      );
      processedQuery = processedQuery.replace(
        new RegExp(`${templateParam}=[^&]*&?`, "g"),
        ""
      );
      processedQuery = processedQuery.replace(
        new RegExp(`&${templateParam}=[^&]*`, "g"),
        ""
      );
    }

    // Clean up any remaining template placeholders
    processedQuery = processedQuery.replace(/\{[^}]+\}/g, "");

    // Clean up any double ampersands or trailing characters
    processedQuery = processedQuery.replace(/&&/g, "&");
    processedQuery = processedQuery.replace(/[&?]$/, "");
    processedQuery = processedQuery.replace(/\?&/, "?");
  }

  const searchParams = new URLSearchParams(processedQuery);

  // Add new parameters that aren't already in the template
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && !searchParams.has(key)) {
      searchParams.set(key, formatParamValue(value));
    }
  }

  return searchParams.toString();
};

/**
 * Injects appropriate API key based on service type
 *
 * Uses "AccessCode" parameter for WSDOT services and "apiaccesscode" for WSF services.
 *
 * @param url - URL object to modify (mutated in place)
 * @returns void
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
 * Formats parameter value for API requests
 *
 * Handles Date objects by converting to ISO strings, otherwise converts to string.
 *
 * @param value - Value to format (can be any type)
 * @returns Formatted parameter value as string
 */
const formatParamValue = (value: unknown): string =>
  value instanceof Date ? value.toISOString() : String(value);
