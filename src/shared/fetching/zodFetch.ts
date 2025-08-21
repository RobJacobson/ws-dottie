/**
 * Zod-First API Fetch Utility for WSDOT and WSF APIs
 *
 * This module provides a simplified, direct approach to API fetching with Zod validation.
 * Unlike factory-based approaches, this is a single utility function that handles all
 * the complexity while maintaining a simple, understandable API.
 *
 * Key Features:
 * - Direct function call (no factories or abstractions)
 * - Full URL visibility for debugging and clarity
 * - Zod-based input/output validation with global config support
 * - Automatic platform detection (JSONP vs fetch)
 * - Parameter interpolation with date formatting
 * - Comprehensive error handling
 * - TypeScript inference from Zod schemas
 *
 * Usage:
 * ```typescript
 * // Simple endpoint with no parameters
 * const vessels = await zodFetch(
 *   "/ferries/api/vessels/rest/vessellocations",
 *   { output: vesselLocationArraySchema }
 * );
 *
 * // Endpoint with parameters and validation
 * const vessel = await zodFetch(
 *   "/ferries/api/vessels/rest/vesselbasics/{vesselId}",
 *   { input: getVesselBasicsByIdParamsSchema, output: vesselBasicSchema },
 *   { vesselId: 1 }
 * );
 * ```
 */

import { z } from "zod";

import { configManager } from "@/shared/config";
import type { LoggingMode } from "@/shared/logger";
import log from "@/shared/logger";

import { createApiError } from "./errors";
import type { JsonWithDates } from "./parsing";
import { jsDateToMmDdYyyy, jsDateToYyyyMmDd } from "./parsing";
import { getEnvironmentType, selectFetchStrategy } from "./utils";

/**
 * Direct Zod-validated API fetch function
 *
 * This function handles all the complexity of API requests in a single, easy-to-understand
 * function call. It automatically handles:
 * - Input validation (based on global config)
 * - URL composition and parameter interpolation
 * - Platform-appropriate fetch strategy (JSONP vs fetch)
 * - Response validation and transformation
 * - Comprehensive error handling
 *
 * @param fullUrlTemplate - Complete URL template (e.g., "/ferries/api/vessels/rest/vesselbasics/{vesselId}")
 * @param schemas - Zod schemas for input and output validation
 * @param params - Parameters to interpolate into the URL template
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to validated response data
 */
export const zodFetch = async <TInput = never, TOutput = unknown>(
  fullUrlTemplate: string,
  schemas: {
    input?: z.ZodSchema<TInput>;
    output?: z.ZodSchema<TOutput>;
  },
  params?: TInput,
  logMode?: LoggingMode
): Promise<TOutput> => {
  // Extract endpoint name for logging (last part of URL)
  const endpoint = fullUrlTemplate.split("/").pop() || fullUrlTemplate;
  let interpolatedUrl = fullUrlTemplate;

  try {
    // Input validation (respects global configuration)
    const shouldValidateInputs = configManager.shouldValidateInputs();
    let validatedParams = params;

    if (shouldValidateInputs && schemas.input && params) {
      try {
        validatedParams = schemas.input.parse(params);
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

    // URL composition and parameter interpolation
    interpolatedUrl = interpolateUrlParams(
      fullUrlTemplate,
      validatedParams as Record<string, JsonWithDates>
    );
    const completeUrl = buildCompleteUrl(interpolatedUrl);

    // Debug logging
    logDebug(logMode, endpoint, `Using ${getEnvironmentType()} fetch strategy`);
    logDebug(logMode, endpoint, `Requesting: ${completeUrl}`);

    // Execute platform-appropriate fetch strategy
    const fetchStrategy = selectFetchStrategy();
    const responseString = await fetchStrategy(completeUrl);

    // Parse raw JSON (no legacy date transformation)
    const rawData = JSON.parse(responseString);
    logDebug(logMode, endpoint, "Raw response parsed", rawData);

    // Output validation and transformation (always applied if schema provided)
    if (schemas.output) {
      try {
        const validatedData = schemas.output.parse(rawData);
        logDebug(logMode, endpoint, "Response validated by Zod", validatedData);
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

    return rawData as TOutput;
  } catch (error: unknown) {
    // Log errors for debugging
    if (logMode === "debug" || logMode === "info") {
      log.error(`[${endpoint}] Request failed:`, error);
    }

    // Extract HTTP status if available
    const status =
      error instanceof Error
        ? (error as Error & { status?: number }).status
        : undefined;

    // Create consistent API error
    throw createApiError(
      error,
      endpoint,
      buildCompleteUrl(interpolatedUrl),
      status
    );
  }
};

/**
 * Interpolates parameters into URL template
 * Handles Date objects by formatting them appropriately for WSF vs WSDOT APIs
 */
const interpolateUrlParams = (
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
      throw new Error(
        `Parameter "${key}" was provided but placeholder "{${key}}" not found in URL template. ` +
          `Available placeholders: ${url.match(/\{[^}]+\}/g)?.join(", ") || "none"}`
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
const buildCompleteUrl = (urlPath: string): string => {
  const baseUrl = configManager.getBaseUrl();
  const apiKeyParam = getApiKeyParam(urlPath);
  const separator = urlPath.includes("?") ? "&" : "?";
  const apiKey = configManager.getApiKey();

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
 * Debug logging helper
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
