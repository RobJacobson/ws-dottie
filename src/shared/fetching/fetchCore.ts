/**
 * @fileoverview Core Fetching Logic for WS-Dottie
 *
 * This module provides the core data fetching functionality for WS-Dottie,
 * including both validated (fetchZod) and unvalidated (fetchNative) APIs.
 * It handles URL building, request execution, response parsing, and logging
 * with automatic .NET date conversion for native fetch operations.
 */

import type { Endpoint } from "@/shared/endpoints";
import {
  buildUrlWithApiKey,
  buildUrlWithParams,
} from "@/shared/fetching/buildUrl";
import { selectFetchStrategy } from "@/shared/fetching/fetchStrategies";
import { createApiError } from "@/shared/fetching/handleError";
import type { LoggingMode } from "@/shared/types";
import { convertDotNetDates } from "@/shared/utils/dateUtils";
import { logApiCall, logApiResults } from "@/shared/utils/logger";

/**
 * Core fetching logic shared between fetchZod and fetchNative
 *
 * This function provides the basic HTTP request functionality without any
 * validation or transformation. It handles URL building, request execution,
 * response parsing, and logging. Each wrapper function handles its specific
 * logic (validation, date conversion, etc.).
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param params - Fetch parameters
 * @param params.endpoint - The API endpoint to call
 * @param params.params - Optional input parameters
 * @param params.logMode - Optional logging mode
 * @returns Promise resolving to the response data
 */
export const fetchCore = async <TInput = never, TOutput = unknown>({
  endpoint,
  params,
  logMode,
}: {
  endpoint: string;
  params?: TInput;
  logMode?: LoggingMode;
}): Promise<TOutput> => {
  const startTime = Date.now();

  // Log the API call if needed
  if (logMode !== "none") {
    logApiCall(endpoint, params);
  }

  try {
    // 1. Build URL with parameters
    const urlWithParams = buildUrlWithParams(
      endpoint,
      params as Record<string, unknown>
    );
    console.log(`Fetching: ${urlWithParams}`);

    // 2. Append API key
    const urlWithApiKey = buildUrlWithApiKey(urlWithParams);

    // 3. Execute request using appropriate strategy
    const fetchStrategy = selectFetchStrategy();
    const responseData = await fetchStrategy(urlWithApiKey);

    // 4. Parse response JSON
    const jsonData = JSON.parse(responseData);

    // 5. Log results with performance metrics
    if (logMode !== "none") {
      logApiResults(jsonData, startTime, responseData.length);
    }

    return jsonData as TOutput;
  } catch (error) {
    throw createApiError(error, endpoint);
  }
};

/**
 * Main data fetching API with Zod validation
 *
 * This function provides type-safe data fetching with both input and output
 * validation using Zod schemas. It validates input parameters before making
 * the request and validates the response data before returning it.
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param endpoint - Complete endpoint object containing schemas and configuration
 * @param params - Optional input parameters to validate
 * @param logMode - Optional logging mode
 * @returns Promise resolving to validated response data
 */
export const fetchZod = async <TInput = never, TOutput = unknown>(
  endpoint: Endpoint<TInput, TOutput>,
  params?: TInput,
  logMode?: LoggingMode
): Promise<TOutput> => {
  // Validate input parameters if provided
  if (params) {
    endpoint.inputSchema.parse(params);
  }

  // Get raw data from fetchCore
  const rawData = await fetchCore({
    endpoint: endpoint.endpoint,
    params,
    logMode,
  });

  // Validate and return output
  return endpoint.outputSchema.parse(rawData);
};

/**
 * Native fetch API with automatic .NET date conversion
 *
 * This function provides unvalidated access to Washington State transportation
 * APIs with automatic conversion of .NET datetime strings to JavaScript Date
 * objects. No Zod validation is performed on input or output, making it
 * suitable for quick prototyping or when you need raw API access.
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param endpoint - Complete endpoint object containing configuration
 * @param params - Optional input parameters
 * @param logMode - Optional logging mode
 * @returns Promise resolving to response data with .NET dates converted
 */
export const fetchNative = async <TInput = never, TOutput = unknown>(
  endpoint: Endpoint<TInput, TOutput>,
  params?: TInput,
  logMode?: LoggingMode
): Promise<TOutput> => {
  // Get raw data from fetchCore
  const rawData = await fetchCore({
    endpoint: endpoint.endpoint,
    params,
    logMode,
  });

  // Apply automatic .NET date conversion
  return convertDotNetDates(rawData) as TOutput;
};
