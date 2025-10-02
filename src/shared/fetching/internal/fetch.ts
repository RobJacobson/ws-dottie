/**
 * @fileoverview Unified Fetch Tool
 *
 * This module provides a single, unified fetch function that separates
 * transport strategy (native vs JSONP) from validation strategy (with/without Zod).
 * This eliminates the need for four separate fetch modules.
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchCore } from "./core";
import { createApiError } from "./handleError";
import type {
  FetchStrategy,
  LoggingMode,
  ValidationStrategy,
} from "@/shared/types";
import { convertDotNetDates } from "@/shared/utils/dateUtils";

/**
 * Private unified fetch function with explicit parameters
 *
 * This function provides the core logic for all API calls with clear
 * separation between fetch strategy (how to fetch) and validation strategy
 * (how to validate data).
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param endpoint - Complete endpoint object containing configuration and schemas
 * @param params - Optional input parameters
 * @param fetchStrategy - Explicit fetch strategy (native or jsonp)
 * @param validationStrategy - Explicit validation strategy (none or zod)
 * @param logMode - Logging verbosity level
 * @returns Promise resolving to response data (validated and transformed as configured)
 */
export const fetch = async <TInput = never, TOutput = unknown>(
  endpoint: Endpoint<TInput, TOutput>,
  params: TInput | undefined,
  fetchStrategy: FetchStrategy,
  validationStrategy: ValidationStrategy,
  logMode: LoggingMode = "none"
): Promise<TOutput> => {
  try {
    // Validate input parameters if using Zod validation
    if (validationStrategy === "zod" && params) {
      endpoint.inputSchema.parse(params);
    }

    // Get raw data using specified fetch strategy
    const rawData = await fetchCore(endpoint, params, logMode, fetchStrategy);

    // Handle validation and transformation based on strategy
    if (validationStrategy === "zod") {
      // Zod validation handles .NET date conversion internally
      // Skip convertDotNetDates to prevent double conversion
      return endpoint.outputSchema.parse(rawData);
    } else {
      // No validation - apply .NET date conversion manually
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
