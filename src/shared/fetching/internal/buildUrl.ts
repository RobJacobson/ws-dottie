/**
 * @fileoverview URL Builder for WS-Dottie API Requests
 *
 * This module provides comprehensive URL building functionality for WS-Dottie API requests,
 * including parameter encoding, template parameter replacement, API key injection,
 * and proper URL construction for both WSDOT and WSF APIs.
 *
 * Key features:
 * - Template parameter replacement (e.g., {terminalId} -> actual value)
 * - Automatic date conversion to .NET format for WSDOT APIs
 * - API key injection with correct parameter names per service
 * - URL cleanup to remove empty parameters
 * - Support for both WSDOT (/traffic/) and WSF (/ferries/) endpoints
 */

import { configManager } from "@/shared/utils/configManager";

// Regular expression patterns for URL processing
const TEMPLATE_PARAM_REGEX = /\{([^}]+)\}/g;
const UNREPLACED_PARAM_REGEX = /&[^&]*\{[^}]+\}/g;
const MALFORMED_QUERY_REGEX = /([?&])[^=&]+=&/g;

/**
 * Builds a complete API URL with template parameter replacement and API key injection
 *
 * This function constructs a complete URL for API requests by combining
 * the base domain, endpoint path, replacing template parameters, and injecting
 * the appropriate API key based on the service type.
 *
 * @param endpoint - The API endpoint path with optional template parameters (e.g., "/ferries/schedule/{terminalId}")
 * @param params - Optional parameters for template replacement and query string construction
 * @returns Complete URL string ready for API requests
 * @example
 * ```typescript
 * buildCompleteUrl("/ferries/api/schedule/rest/schedule/{tripDate}/{routeId}", {
 *   tripDate: "2024-01-01",
 *   routeId: 1,
 * });
 * // Returns: "https://www.wsdot.wa.gov/ferries/api/schedule/rest/schedule/2024-01-01/1?apiaccesscode=YOUR_API_KEY"
 * ```
 */
export const buildCompleteUrl = <TInput = never>(
  endpoint: string,
  params?: TInput
): string => {
  // Check if endpoint is already a complete URL (contains protocol)
  const isCompleteUrl =
    endpoint.startsWith("http://") || endpoint.startsWith("https://");

  let baseUrl: string;
  if (isCompleteUrl) {
    // If it's already a complete URL, use it as-is
    baseUrl = "";
  } else {
    // Otherwise, use the configured domain
    baseUrl = configManager.getDomain();
  }

  // Replace template parameters in the endpoint string
  let processedEndpoint = endpoint;
  if (params) {
    // Cast to Record<string, unknown> for URL building operations
    const paramsRecord = params as Record<string, unknown>;

    // Validate that all provided parameters have corresponding templates
    validateUrlParams(endpoint, paramsRecord);

    // Replace template parameters with actual values
    Object.entries(paramsRecord).forEach(([key, value]) => {
      const replaceParam = `{${key}}`;
      // Convert values to string format for URL replacement
      const replaceValue = String(value);
      processedEndpoint = processedEndpoint.replace(replaceParam, replaceValue);
    });
  }

  // Remove entire query parameters for unreplaced template parameters
  // This handles optional parameters by removing "&param={param}" entirely
  processedEndpoint = processedEndpoint.replace(UNREPLACED_PARAM_REGEX, "");

  // Clean up any remaining malformed query strings
  // Remove patterns like "&param=&" or "&param=" to prevent invalid URLs
  processedEndpoint = processedEndpoint.replace(MALFORMED_QUERY_REGEX, "$1");

  // Construct the URL and inject API key
  const url = baseUrl
    ? new URL(processedEndpoint, baseUrl)
    : new URL(processedEndpoint);
  const serviceType = getServiceType(url.toString());
  const apiKey = configManager.getApiKey();

  // Inject the correct API key parameter based on service type
  if (serviceType === "wsdot") {
    // WSDOT expects 'AccessCode' with this exact casing
    url.searchParams.set("AccessCode", apiKey);
  } else if (serviceType === "wsf") {
    url.searchParams.set("apiaccesscode", apiKey);
  }

  return url.toString();
};

/**
 * Extracts template parameter names from an endpoint URL string
 *
 * This function finds all {paramName} placeholders in an endpoint URL and returns
 * them as a Set of parameter names. Used for validating that user-provided parameters
 * have corresponding template placeholders.
 *
 * @param endpoint - The endpoint URL string with template parameters (e.g., "/ferries/api/vessels/{VesselID}")
 * @returns Set of parameter names found in the endpoint
 * @example
 * ```typescript
 * getUrlParams("/ferries/api/vessels/{VesselID}/history/{Date}");
 * // Returns: Set(["VesselID", "Date"])
 * ```
 */
const getUrlParams = (endpoint: string): Set<string> => {
  const matches = endpoint.matchAll(TEMPLATE_PARAM_REGEX);
  return new Set(Array.from(matches, (match) => match[1]));
};

/**
 * Validates that all provided parameters have corresponding template placeholders in the endpoint URL
 *
 * This function ensures that every parameter provided by the user has a corresponding
 * {paramName} placeholder in the endpoint URL template. This prevents silent parameter
 * mismatches that could lead to incorrect API calls in a public library.
 *
 * @param endpoint - The endpoint URL string with template parameters (e.g., "/ferries/api/vessels/{VesselID}")
 * @param params - The parameters object provided by the user
 * @throws Error if any provided parameters don't have corresponding template placeholders
 * @example
 * ```typescript
 * validateUrlParams("/ferries/api/vessels/{VesselID}", { VesselID: 1 }); // ✅ Valid
 * validateUrlParams("/ferries/api/vessels/{VesselID}", { VesselID: 1, unexpected: "test" }); // ❌ Throws error
 * ```
 */
const validateUrlParams = (
  endpoint: string,
  params: Record<string, unknown>
): void => {
  // Extract all template parameters from the endpoint
  const templateParams = getUrlParams(endpoint);

  // Validate that all provided parameters have corresponding templates
  const providedParams = Object.keys(params);
  const unusedParams = providedParams.filter(
    (param) => !templateParams.has(param)
  );

  if (unusedParams.length > 0) {
    throw new Error(
      `Unexpected parameters provided: ${unusedParams.join(", ")}. ` +
        `This endpoint only accepts: ${Array.from(templateParams).join(", ")}. ` +
        `Check the endpoint definition for valid parameter names.`
    );
  }
};

/**
 * Determines the service type based on URL path patterns
 *
 * @param url - The URL string to analyze
 * @returns The detected service type
 */
const getServiceType = (url: string): "wsdot" | "wsf" | "unknown" => {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("/traffic/")) return "wsdot";
  if (lowerUrl.includes("/ferries/")) return "wsf";
  return "unknown";
};
