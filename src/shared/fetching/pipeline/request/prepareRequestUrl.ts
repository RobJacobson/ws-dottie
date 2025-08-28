import { configManager } from "@/shared/config";
import { jsDateToYyyyMmDd } from "../../zod";
import type { FetchContext, JsonWithDates } from "../types";

/**
 * URL building utilities for request preparation
 */

/**
 * Interpolates parameters into URL template
 * Handles Date objects by formatting them appropriately for WSF vs WSDOT APIs
 */
export const interpolateUrlParams = (
  urlTemplate: string,
  params?: Record<string, JsonWithDates>
): string => {
  if (!params || Object.keys(params).length === 0) {
    return urlTemplate;
  }

  return Object.entries(params).reduce((url, [key, value]) => {
    const placeholder = `{${key}}`;

    if (!url.includes(placeholder)) {
      // Parameter provided but no placeholder found
      const availablePlaceholders =
        url.match(/\{[^}]+\}/g)?.join(", ") || "none";
      throw new Error(
        `Parameter "${key}" was provided but placeholder "{${key}}" not found in URL template. ` +
          `Available placeholders: ${availablePlaceholders}`
      );
    }

    // Format dates based on API type
    // WSF APIs (both Fares and Schedule) expect YYYY-MM-DD, WSDOT APIs expect YYYY-MM-DD
    const stringValue =
      value instanceof Date
        ? jsDateToYyyyMmDd(value) // All APIs use YYYY-MM-DD format
        : String(value);

    return url.replace(placeholder, stringValue);
  }, urlTemplate);
};

/**
 * Builds complete URL with base URL and API key
 */
export const buildCompleteUrl = (urlPath: string): string => {
  const baseUrl = configManager.getBaseUrl();
  const apiKey = configManager.getApiKey();
  const apiKeyParam = getApiKeyParam(urlPath);
  const separator = urlPath.includes("?") ? "&" : "?";

  return `${baseUrl}${urlPath}${separator}${apiKeyParam}=${apiKey}`;
};

/**
 * Determines API key parameter name based on URL path
 * WSF APIs use "apiaccesscode", WSDOT APIs use "AccessCode"
 */
const getApiKeyParam = (urlPath: string): string => {
  return urlPath.includes("/ferries/") ? "apiaccesscode" : "AccessCode";
};

/**
 * Prepares the complete request URL with parameters and API key
 */
export const prepareRequestUrl = (
  urlTemplate: string,
  params: unknown,
  context: FetchContext
): string => {
  const interpolatedUrl = interpolateUrlParams(
    urlTemplate,
    params as Record<string, JsonWithDates>
  );
  context.interpolatedUrl = interpolatedUrl;

  const completeUrl = buildCompleteUrl(interpolatedUrl);

  return completeUrl;
};
