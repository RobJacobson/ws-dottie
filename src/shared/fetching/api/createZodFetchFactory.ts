/**
 * Zod-First API Fetch Factory for WSDOT and WSF APIs
 *
 * This module provides a clean-room implementation of the fetch factory that is
 * designed specifically for Zod validation. Unlike the original createFetchFactory,
 * this version bypasses the legacy parseWsdotJson system and lets Zod handle ALL
 * validation and transformation.
 *
 * Key Features:
 * - Raw JSON parsing (no legacy date transformation)
 * - Zod handles all validation and date conversion
 * - Clean separation from legacy parsing system
 * - Identical API to createFetchFactory for easy migration
 * - Full backward compatibility with existing code
 *
 * Usage:
 * ```typescript
 * // Drop-in replacement for createFetchFactory
 * const createFetch = createZodFetchFactory("/api/endpoint");
 *
 * // Same API as before, but with Zod validation
 * const getData = createFetch("/endpoint", {
 *   output: myZodSchema
 * });
 * const data = await getData(); // Validated by Zod
 * ```
 */

import { z } from "zod";

import { configManager } from "@/shared/config";
import type { LoggingMode } from "@/shared/logger";
import log from "@/shared/logger";

import { createApiError } from "../errors";
import type { JsonWithDates } from "../parsing";
import { jsDateToYyyyMmDd } from "../parsing";
import { getEnvironmentType, selectFetchStrategy } from "../utils";

/**
 * Creates a factory function that returns fetch functions pre-configured with a specific API path
 * This is a clean-room implementation that bypasses legacy parsing and uses pure Zod validation
 *
 * @param apiPath - The API path to append to the base URL (e.g., "/ferries/api/vessels/rest")
 * @returns A function that creates fetch functions for the specified API path
 */
export const createZodFetchFactory = (apiPath: string) => {
  const shouldValidateInputs = configManager.shouldValidateInputs();
  const fetchStrategy = selectFetchStrategy();

  // Function overloads for cleaner API with optional schema support
  function createFetch(
    endpointTemplate: string,
    schemas?: { input?: z.ZodSchema; output?: z.ZodSchema }
  ): (logMode?: LoggingMode) => Promise<unknown>;
  function createFetch<P extends Record<string, JsonWithDates>>(
    endpointTemplate: string,
    schemas?: { input?: z.ZodSchema; output?: z.ZodSchema }
  ): (params: P, logMode?: LoggingMode) => Promise<unknown>;

  // Implementation with integrated Zod validation
  function createFetch<P extends Record<string, JsonWithDates> = never>(
    endpointTemplate: string,
    schemas?: { input?: z.ZodSchema; output?: z.ZodSchema }
  ) {
    return async (params?: P, logMode?: LoggingMode): Promise<unknown> => {
      // Extract endpoint from URL for logging purposes
      const endpoint = endpointTemplate;
      let interpolatedEndpoint = endpointTemplate; // Initialize for error handling

      try {
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
        interpolatedEndpoint = interpolateParams(
          endpointTemplate,
          validatedParams
        );

        // Build the complete URL with API key parameter
        const url = buildUrl(apiPath, interpolatedEndpoint);

        // Log the fetch strategy being used (useful for debugging CORS/JSONP issues)
        logDebug(
          logMode,
          endpoint,
          `Using ${getEnvironmentType()} fetch strategy`
        );

        // Execute the platform-appropriate fetch strategy
        // This is the key difference: we get RAW response without parseWsdotJson()
        const responseString = await fetchStrategy(url);

        // Parse as plain JSON - no legacy date transformation!
        const rawData = JSON.parse(responseString);

        // Log the raw response for debugging
        logDebug(logMode, endpoint, "Raw response parsed", rawData);

        // Zod handles ALL validation and transformation
        if (schemas?.output) {
          try {
            const validatedData = schemas.output.parse(rawData);
            logDebug(
              logMode,
              endpoint,
              "Response validated by Zod",
              validatedData
            );
            return validatedData;
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

        return rawData;
      } catch (error: unknown) {
        // Log errors for debugging and monitoring
        if (logMode === "debug" || logMode === "info") {
          log.error(`[${endpoint}] Request failed:`, error);
        }

        // Extract HTTP status code if available
        const status =
          error instanceof Error
            ? (error as Error & { status?: number }).status
            : undefined;

        // Wrap all errors in a consistent WsdotApiError format
        throw createApiError(
          error,
          endpoint,
          buildUrl(apiPath, interpolatedEndpoint),
          status
        );
      }
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

/**
 * Debug logging helper to reduce noise in the main function
 */
const logDebug = (
  logMode: LoggingMode | undefined,
  endpoint: string,
  message: string,
  data?: unknown
) => {
  if (logMode !== "debug") return;

  const prefix = `[${endpoint}]`;
  if (data !== undefined) {
    log.debug(`${prefix} ${message}:`, data);
  } else {
    log.debug(`${prefix} ${message}`);
  }
};
