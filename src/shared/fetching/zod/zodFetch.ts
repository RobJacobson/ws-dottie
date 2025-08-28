import type { LoggingMode } from "@/shared/utils";
import { isTestEnvironment } from "@/shared/utils/testEnvironment";
import {
  getEnvironmentType,
  selectFetchStrategy,
} from "../pipeline/strategies";
import { validateInputs, validateResponse } from "../validation/core";
import { handleFetchError } from "./errorHandler";
import type { FetchContext, FetchSchemas } from "./types";
import { prepareRequestUrl } from "./urlBuilder";

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
 * - Automatic logging suppression in test environments
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

/**
 * Creates fetch context for logging and error handling
 */
const createFetchContext = (
  fullUrlTemplate: string,
  logMode?: LoggingMode
): FetchContext => {
  // Simple endpoint extraction with fallback
  const endpoint = fullUrlTemplate.split("/").pop() || fullUrlTemplate;

  // Automatically disable logging in test environments
  const effectiveLogMode = isTestEnvironment() ? undefined : logMode;

  return {
    endpoint,
    logMode: effectiveLogMode,
    interpolatedUrl: fullUrlTemplate,
  };
};

/**
 * Executes the actual API request
 */
const executeRequest = async (
  completeUrl: string,
  context: FetchContext
): Promise<unknown> => {
  const fetchStrategy = selectFetchStrategy();
  const responseString = await fetchStrategy(completeUrl);

  const rawData = JSON.parse(responseString);

  // Debug logging (only if not in test environment and logMode is debug)
  if (context.logMode === "debug" && !isTestEnvironment()) {
    console.debug(`[${context.endpoint}] Raw response parsed:`, rawData);
    console.debug(
      `[${context.endpoint}] Using ${getEnvironmentType()} fetch strategy`
    );
    console.debug(`[${context.endpoint}] Requesting: ${completeUrl}`);
  }

  return rawData;
};

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
 * - Automatic logging suppression in test environments
 *
 * @param fullUrlTemplate - Complete URL template (e.g., "/ferries/api/vessels/rest/vesselbasics/{vesselId}")
 * @param schemas - Zod schemas for input and output validation
 * @param params - Parameters to interpolate into the URL template
 * @param logMode - Optional logging mode for debugging (automatically disabled in test environments)
 * @returns Promise resolving to validated response data
 */
export const zodFetch = async <TInput = never, TOutput = unknown>(
  fullUrlTemplate: string,
  schemas: FetchSchemas<TInput, TOutput>,
  params?: TInput,
  logMode?: LoggingMode
): Promise<TOutput> => {
  try {
    const context = createFetchContext(fullUrlTemplate, logMode);

    // Input validation and URL preparation
    const validatedParams = validateInputs(schemas.input, params, context);
    const completeUrl = prepareRequestUrl(
      fullUrlTemplate,
      validatedParams,
      context
    );

    // Execute request
    const responseData = await executeRequest(completeUrl, context);

    // Validate and return response
    return validateResponse(responseData, schemas.output, context);
  } catch (error: unknown) {
    // If context creation failed, we can't use it for error handling
    if (
      error instanceof Error &&
      error.message.includes("Failed to create fetch context")
    ) {
      throw error; // Re-throw context creation errors as-is
    }

    // For other errors, try to create a minimal context for error handling
    const fallbackContext: FetchContext = {
      endpoint: "unknown",
      logMode: isTestEnvironment() ? undefined : logMode,
      interpolatedUrl: fullUrlTemplate,
    };

    throw handleFetchError(error, fallbackContext);
  }
};
