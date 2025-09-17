/**
 * @fileoverview URL Builder for WS-Dottie API Requests
 *
 * This module provides URL building functionality for WS-Dottie API requests,
 * handling parameter encoding, API key injection, and proper URL construction
 * for both WSDOT and WSF APIs.
 */

import { configManager } from "@/shared/utils/configManager";

/**
 * Builds a complete API URL with parameters and API key
 *
 * This function constructs a complete URL for API requests by combining
 * the base domain, endpoint path, API key, and any additional parameters.
 * It properly encodes all parameters and handles undefined/null values.
 *
 * @param endpoint - The API endpoint path (relative to base domain)
 * @param params - Optional parameters to include in the URL
 * @returns Complete URL string ready for API requests
 * @example
 * ```typescript
 * buildApiUrl("/traffic/api/ferries/schedule/rest/scheduledeparture", {
 *   terminalId: 1,
 *   date: "2024-01-01"
 * });
 * // Returns: "http://www.wsdot.wa.gov/traffic/api/ferries/schedule/rest/scheduledeparture?apiaccesscode=YOUR_KEY&terminalId=1&date=2024-01-01"
 * ```
 */
export const buildApiUrl = (
  endpoint: string,
  params?: Record<string, unknown>
): string => {
  const baseUrl = configManager.getDomain();
  const apiKey = configManager.getApiKey();

  // Build URL with API key
  const url = new URL(endpoint, baseUrl);

  // Determine the correct parameter name based on endpoint type
  const isWSDOT = endpoint.toLowerCase().startsWith("/traffic/");
  const isWSF = endpoint.toLowerCase().startsWith("/ferries/");

  if (isWSDOT) {
    url.searchParams.set("accesscode", apiKey);
  } else if (isWSF) {
    url.searchParams.set("apiaccesscode", apiKey);
  }

  // Add parameters, filtering out undefined and null values
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
};
