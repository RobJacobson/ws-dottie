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

/**
 * Builds a complete API URL with template parameter replacement
 *
 * This function constructs a complete URL for API requests by combining
 * the base domain, endpoint path, and replacing template parameters in the URL.
 * It handles template parameter replacement (e.g., {terminalId} -> actual value)
 * and URL cleanup.
 *
 * @param endpoint - The API endpoint path with optional template parameters (e.g., "/ferries/schedule/{terminalId}")
 * @param params - Optional parameters for template replacement and query string construction
 * @returns Complete URL object ready for further processing (API key injection)
 * @example
 * ```typescript
 * buildUrlWithParams("/ferries/api/schedule/rest/schedule/{tripDate}/{routeId}", {
 *   tripDate: "2024-01-01"
 *   routeId: 1,
 * });
 * // Returns: URL object with processed endpoint and parameters
 * ```
 */

export const buildUrlWithParams = (
  endpoint: string,
  params?: Record<string, unknown>
): string => {
  const baseUrl = configManager.getDomain();

  // Replace template parameters in the endpoint string
  let processedEndpoint = endpoint;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      const replaceParam = `{${key}}`;
      // Convert values to string format for URL replacement
      const replaceValue = String(value);
      processedEndpoint = processedEndpoint.replace(replaceParam, replaceValue);
    });
  }

  // Step 2: Remove entire query parameters for unreplaced template parameters
  // This handles optional parameters by removing "&param={param}" entirely
  processedEndpoint = processedEndpoint.replace(/&[^&]*\{[^}]+\}/g, "");

  // Step 3: Clean up any remaining malformed query strings
  // Remove patterns like "&param=&" or "&param=" to prevent invalid URLs
  processedEndpoint = processedEndpoint.replace(/([?&])[^=&]+=&/g, "$1");

  // Step 4: Construct the final URL object (API key injection handled separately)
  return new URL(processedEndpoint, baseUrl).toString();
};

/**
 * Injects the appropriate API key into a URL based on the service type
 *
 * This function determines whether the URL is for WSDOT or WSF API and injects
 * the correct API key parameter name. WSDOT uses "accesscode" while WSF uses
 * "apiaccesscode" as the parameter name.
 *
 * @param url - The URL object to inject the API key into
 * @returns The same URL object with the API key parameter added
 * @example
 * ```typescript
 * const url = new URL("/traffic/api/ferries/schedule", "http://www.wsdot.wa.gov");
 * const urlWithKey = buildUrlWithApiKey(url);
 * // URL now includes: ?accesscode=YOUR_API_KEY
 * ```
 */
export const buildUrlWithApiKey = (url: string): string => {
  const serviceType = getServiceType(url);
  const apiKey = configManager.getApiKey();
  const urlWithKey = new URL(url);

  // Inject the correct API key parameter based on service type
  if (serviceType === "wsdot") {
    urlWithKey.searchParams.set("accesscode", apiKey);
  } else if (serviceType === "wsf") {
    urlWithKey.searchParams.set("apiaccesscode", apiKey);
  }

  return urlWithKey.toString();
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
