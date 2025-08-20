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
 * - Configurable base URL support via WSDOT_BASE_URL environment variable
 *
 * Usage:
 * ```typescript
 * // Create a factory for a specific API path (base URL is configurable)
 * const createFetch = createFetchFactory("/api/endpoint");
 *
 * // Create a simple fetch function
 * const getData = createFetch("/endpoint");
 * const data = await getData(); // unknown -> validate with Zod schema
 *
 * // Create a fetch function with parameters
 * const getItem = createFetch<{id: string}>("/item/{id}");
 * const item = await getItem({ id: "123" }); // unknown -> validate with Zod schema
 *
 * // With logging
 * const item = await getItem({ id: "123" }, "debug");
 * ```
 */

import { z } from "zod";
import { configManager } from "@/shared/config";
import type { LoggingMode } from "@/shared/logger";

import type { JsonWithDates } from "../parsing";
import { jsDateToYyyyMmDd } from "../parsing";
import { createApiClient } from "./createApiClient";

/**
 * Creates a factory function that returns fetch functions pre-configured with a specific API path
 * The base URL is automatically determined from configManager.getBaseUrl()
 *
 * @param apiPath - The API path to append to the base URL (e.g., "/ferries/api/vessels/rest")
 * @returns A function that creates fetch functions for the specified API path
 */
export const createFetchFactory = (apiPath: string) => {
  const fetchFn = createApiClient();
  const shouldValidateInputs = configManager.shouldValidateInputs();

  // Function overloads for cleaner API with optional schema support
  function createFetch(
    endpointTemplate: string,
    schemas?: { input?: z.ZodSchema; output?: z.ZodSchema }
  ): (logMode?: LoggingMode) => Promise<unknown>;
  function createFetch<P extends Record<string, JsonWithDates>>(
    endpointTemplate: string,
    schemas?: { input?: z.ZodSchema; output?: z.ZodSchema }
  ): (params: P, logMode?: LoggingMode) => Promise<unknown>;

  // Implementation with integrated validation
  function createFetch<P extends Record<string, JsonWithDates> = never>(
    endpointTemplate: string,
    schemas?: { input?: z.ZodSchema; output?: z.ZodSchema }
  ) {
    return async (params?: P, logMode?: LoggingMode): Promise<unknown> => {
      // Optional input validation based on global config
      let validatedParams = params;
      if (shouldValidateInputs && schemas?.input && params) {
        try {
          validatedParams = schemas.input.parse(params) as P;
        } catch (error) {
          if (error instanceof z.ZodError) {
            const fieldErrors = error.issues
              .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
              .join(", ");
            throw new Error(`Parameter validation failed: ${fieldErrors}`);
          }
          throw error;
        }
      }

      // Interpolate parameters into the endpoint template
      const endpoint = interpolateParams(endpointTemplate, validatedParams);

      // Build the complete URL with API key parameter
      const url = buildUrl(apiPath, endpoint);

      // Use the API client to make the request
      const data = await fetchFn<unknown>(url, logMode);

      // Always validate outputs if schema provided
      if (schemas?.output) {
        try {
          return schemas.output.parse(data);
        } catch (error) {
          if (error instanceof z.ZodError) {
            const fieldErrors = error.issues
              .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
              .join(", ");
            throw new Error(`Response validation failed: ${fieldErrors}`);
          }
          throw error;
        }
      }

      return data;
    };
  }

  return createFetch;
};

/**
 * Determines the API key parameter name based on the API path
 * WSF APIs use "apiaccesscode", WSDOT APIs use "AccessCode"
 */
const getApiKeyParam = (apiPath: string): string => {
  const isWsf = apiPath.includes("/ferries/");
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
 * Constructs a complete URL with configurable base URL and API key parameter
 */
const buildUrl = (apiPath: string, endpoint: string): string => {
  const baseUrl = configManager.getBaseUrl();
  const apiKeyParam = getApiKeyParam(apiPath);
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${baseUrl}${apiPath}${endpoint}${separator}${apiKeyParam}=${configManager.getApiKey()}`;
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
