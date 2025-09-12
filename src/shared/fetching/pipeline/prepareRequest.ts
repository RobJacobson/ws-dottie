/**
 * @fileoverview Request preparation utilities
 *
 * This module handles all input processing for the data pipeline:
 * - Input validation using Zod schemas
 * - URL building with parameter interpolation
 * - Date formatting for different API types
 */

import { ZodError } from "zod";

import { configManager } from "@/shared/utils/configManager";
import type { FetchContext, JsonWithDates } from "../types";
import { jsDateToYyyyMmDd } from "../../utils/dateUtils";
import { createValidationError } from "../handleErrors";

/**
 * Interpolates parameters into URL template
 *
 * Handles Date objects by formatting them appropriately for WSF vs WSDOT APIs.
 * All APIs use YYYY-MM-DD format for date parameters.
 * For optional parameters not provided, removes the entire query parameter from the URL.
 *
 * @param urlTemplate - The URL template with parameter placeholders
 * @param params - Parameters to interpolate into the template
 * @returns Interpolated URL string
 * @throws Error if required parameters are missing or invalid
 */
const interpolateUrlParams = (
  urlTemplate: string,
  params?: Record<string, JsonWithDates>
): string => {
  if (!params || Object.keys(params).length === 0) {
    // Check for unreplaced placeholders when no params provided
    const unreplacedPlaceholders = urlTemplate.match(/\{[^}]+\}/g);
    if (unreplacedPlaceholders && unreplacedPlaceholders.length > 0) {
      throw new Error(
        `URL template contains unreplaced placeholders: ${unreplacedPlaceholders.join(", ")}. ` +
          `All placeholders must be replaced with actual parameter values.`
      );
    }
    return urlTemplate;
  }

  // Interpolate parameters into URL template
  let interpolatedUrl = urlTemplate;
  
  // First, replace all provided parameters
  Object.entries(params).forEach(([key, value]) => {
    const placeholder = `{${key}}`;

    if (!interpolatedUrl.includes(placeholder)) {
      // Parameter provided but no placeholder found
      const availablePlaceholders =
        interpolatedUrl.match(/\{[^}]+\}/g)?.join(", ") || "none";
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

    interpolatedUrl = interpolatedUrl.replace(placeholder, stringValue);
  });

  // Remove any remaining unreplaced placeholders and their query parameters
  // This handles optional parameters that weren't provided
  const unreplacedPlaceholders = interpolatedUrl.match(/\{[^}]+\}/g);
  if (unreplacedPlaceholders) {
    unreplacedPlaceholders.forEach(placeholder => {
      const paramName = placeholder.slice(1, -1); // Remove { and }
      
      // Remove the entire query parameter (param=value& or &param=value)
      const paramPattern = new RegExp(`[?&]${paramName}=[^&]*`, 'g');
      interpolatedUrl = interpolatedUrl.replace(paramPattern, '');
      
      // Clean up any double ampersands or trailing/leading separators
      interpolatedUrl = interpolatedUrl.replace(/[?&]{2,}/g, '&');
      interpolatedUrl = interpolatedUrl.replace(/\?&/, '?');
      interpolatedUrl = interpolatedUrl.replace(/&$/, '');
    });
  }

  return interpolatedUrl;
};

/**
 * Validates input parameters if schema is provided
 *
 * Always performs validation when a schema is provided, as the performance
 * overhead is negligible compared to network latency and the benefits of
 * fail-fast error handling are significant.
 *
 * @template TInput - The input parameters type
 * @param inputSchema - Zod schema for input validation
 * @param params - Parameters to validate
 * @param _context - Request context (unused but kept for interface compatibility)
 * @returns Validated parameters or undefined if no schema provided
 * @throws {Error} When validation fails with detailed field error messages
 */
export const validateInputs = <TInput>(
  inputSchema: import("zod").ZodType<TInput> | undefined,
  params: TInput | undefined,
  _context: FetchContext
): TInput | undefined => {
  // Always validate if schema and params are provided
  if (!inputSchema || !params) {
    return params;
  }

  try {
    return inputSchema.parse(params);
  } catch (error) {
    if (error instanceof ZodError) {
      throw createValidationError(error, "Parameter validation");
    }
    throw error;
  }
};

/**
 * Builds a complete URL with base URL, API key, and proper separators
 *
 * Automatically determines the correct API key parameter name based on the URL path:
 * - WSF APIs use "apiaccesscode"
 * - WSDOT APIs use "AccessCode"
 *
 * @param urlPath - The URL path (with or without query parameters)
 * @returns Complete URL with base URL and API key appended
 */
export const buildCompleteUrl = (urlPath: string): string => {
  const baseUrl = configManager.getBaseUrl();
  const apiKey = configManager.getApiKey();
  const apiKeyParam = urlPath.includes("/ferries/")
    ? "apiaccesscode"
    : "AccessCode";
  const separator = urlPath.includes("?") ? "&" : "?";
  return `${baseUrl}${urlPath}${separator}${apiKeyParam}=${apiKey}`;
};

/**
 * Builds the complete fetch URL with validation and parameter interpolation
 *
 * This is the main function that coordinates URL building by validating inputs,
 * interpolating parameters, and building the complete URL with API key.
 *
 * @template TInput - The input parameters type
 * @param endpoint - The endpoint URL template
 * @param inputSchema - Optional Zod schema for input validation
 * @param params - Parameters to interpolate and validate
 * @param context - Request context for error handling
 * @returns Complete URL ready for API request
 */
export const buildFetchUrl = (
  endpoint: string,
  inputSchema: import("zod").ZodType | undefined,
  params: unknown,
  context: FetchContext
): string => {
  // Validate inputs if schema provided
  const validatedParams = validateInputs(inputSchema, params, context);

  // Interpolate parameters into URL template
  const interpolatedUrl = interpolateUrlParams(
    endpoint,
    validatedParams as Record<string, JsonWithDates>
  );

  // Build complete URL with base URL and API key
  return buildCompleteUrl(interpolatedUrl);
};
