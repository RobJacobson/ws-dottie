/**
 * @fileoverview Unified Fetch Tool for WS-Dottie
 *
 * This module provides a single, unified fetch function that combines
 * transport strategy (native vs JSONP) and validation strategy (with/without Zod)
 * into one easy-to-use interface.
 */

import { convertDotNetDates } from "@/shared/utils/dateUtils";
import { fetchCore } from "./internal/fetchCore";
import { createApiError } from "./internal/handleError";
import type { FetchDottieParams } from "./types";

/**
 * Unified fetch function for WS-Dottie APIs
 *
 * This function provides a single entry point for all API calls with clear
 * control over fetch strategy and validation approach. It replaces the four
 * separate fetch functions with a more flexible and maintainable interface.
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param options - Configuration object with endpoint, params, and options
 * @returns Promise resolving to response data (validated and transformed as configured)
 *
 * @example
 * ```typescript
 * // Fetch without validation
 * const data = await fetchDottie({
 *   endpoint: myEndpoint,
 *   params: { route: "SEA-BI" },
 *   fetchMode: "native",
 *   logMode: "info"
 * });
 *
 * // Fetch with validation
 * const validatedData = await fetchDottie({
 *   endpoint: myEndpoint,
 *   params: { route: "SEA-BI" },
 *   validate: true
 * });
 * ```
 */
export const fetchDottie = async <TInput = never, TOutput = unknown>({
  endpoint,
  params,
  fetchMode = "native",
  logMode = "none",
  validate = false,
}: FetchDottieParams<TInput, TOutput>): Promise<TOutput> => {
  try {
    // Validate input parameters if validation is enabled
    if (validate && params) {
      if (!endpoint.inputSchema) {
        throw new Error(
          `Validation requires schemas. This endpoint was built without schemas. ` +
            `Use the full build or import schemas from the /schemas subpath.`
        );
      }
      endpoint.inputSchema.parse(params);
    }

    // Get raw data using specified fetch strategy
    const rawData = await fetchCore(endpoint, params, logMode, fetchMode);

    // Handle validation and transformation based on strategy
    if (validate) {
      if (!endpoint.outputSchema) {
        throw new Error(
          `Validation requires schemas. This endpoint was built without schemas. ` +
            `Use the full build or import schemas from the /schemas subpath.`
        );
      }
      // Zod validation handles .NET date conversion internally
      // Skip convertDotNetDates to prevent double conversion
      return endpoint.outputSchema.parse(rawData);
    } else {
      // No validation - apply .NET date conversion manually and return raw data
      return convertDotNetDates(rawData) as TOutput;
    }
  } catch (error) {
    // Re-throw ApiErrors as-is, wrap other errors (including ZodErrors) in ApiError
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "ApiError"
    ) {
      throw error;
    }
    throw createApiError(error, endpoint.endpoint);
  }
};
