/**
 * @fileoverview Native Fetch Tool with Zod Validation
 *
 * This module provides type-safe API access using native fetch with both
 * input and output validation using Zod schemas, plus automatic conversion
 * of .NET datetime strings to JavaScript Date objects.
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchCore } from "@/shared/fetching/shared/core";
import { createApiError } from "@/shared/fetching/shared/handleError";
import type { FetchOptions, FetchTool } from "@/shared/types";
import { convertDotNetDates } from "@/shared/utils/dateUtils";

/**
 * Native fetch with full Zod validation and .NET date conversion
 *
 * This tool provides type-safe API access using native fetch with both
 * input and output validation using Zod schemas, plus automatic conversion
 * of .NET datetime strings to JavaScript Date objects.
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param endpoint - Complete endpoint object containing schemas and configuration
 * @param params - Optional input parameters to validate
 * @param options - Optional fetch options including logging mode
 * @returns Promise resolving to validated and transformed response data
 */
export const fetchNativeZod: FetchTool = async <
  TInput = never,
  TOutput = unknown,
>(
  endpoint: Endpoint<TInput, TOutput>,
  params?: TInput,
  options?: FetchOptions
): Promise<TOutput> => {
  try {
    // Validate input parameters if provided
    if (params) {
      endpoint.inputSchema.parse(params);
    }

    // Get raw data using native fetch
    const rawData = await fetchCore(endpoint, params, options, "native");

    // Apply .NET date conversion
    const convertedData = convertDotNetDates(rawData);

    // Validate and return output
    return endpoint.outputSchema.parse(convertedData);
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
