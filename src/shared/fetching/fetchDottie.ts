/**
 * @fileoverview Unified Fetch Tool for WS-Dottie
 *
 * This module provides a single, unified fetch function that combines
 * transport strategy (native vs JSONP) and validation strategy (with/without Zod)
 * into one easy-to-use interface.
 */

import type { Endpoint, FetchStrategy, LoggingMode } from "@/shared/types";
import { convertDotNetDates } from "@/shared/utils/dateUtils";
import { fetchCore } from "./internal/fetchCore";
import { createApiError } from "./internal/handleError";

// ============================================================================
// FETCH PARAMETERS INTERFACE
// ============================================================================

/**
 * Parameters for the fetchDottie function
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 */
export interface FetchDottieParams<TInput = never, TOutput = unknown> {
  /** Complete endpoint object containing configuration and schemas */
  endpoint: Endpoint<TInput, TOutput>;
  /** Optional input parameters */
  params?: TInput;
  /** Fetch strategy - how to fetch the data (default: "native") */
  fetchMode?: FetchStrategy;
  /** Logging verbosity level (default: "none") */
  logMode?: LoggingMode;
  /** Whether to validate input/output with Zod schemas (default: false) */
  validate?: boolean;
}

// ============================================================================
// MAIN FETCH FUNCTION
// ============================================================================

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
      endpoint.inputSchema.parse(params);
    }

    // Get raw data using specified fetch strategy
    const rawData = await fetchCore(endpoint, params, logMode, fetchMode);

    // Handle validation and transformation based on strategy
    if (validate) {
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
