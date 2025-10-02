/**
 * @fileoverview Core Fetching Logic
 *
 * This module provides the core fetching orchestration logic that coordinates
 * URL building, transport selection, and logging. It eliminates duplication
 * between the four main fetch functions.
 */

import type { Endpoint } from "@/shared/endpoints";
import type { FetchStrategy, LoggingMode } from "@/shared/types";
import { logApiCall, logApiResults } from "@/shared/utils/logger";
import { buildCompleteUrl } from "./buildUrl";
import { createApiError } from "./handleError";
import { handleFetchJsonp, handleFetchNative } from "./handleFetch";

/**
 * Core fetch routine that handles URL building, transport selection, and logging
 *
 * This function provides the shared orchestration logic used by all four
 * fetch functions. It handles URL building, request execution, response
 * parsing, and logging.
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param endpoint - The API endpoint to call
 * @param params - Optional input parameters
 * @param logMode - Logging verbosity level
 * @param strategy - Fetch strategy to use
 * @returns Promise resolving to the response data
 */
export const fetchCore = async <TInput = never, TOutput = unknown>(
  endpoint: Endpoint<TInput, TOutput>,
  params?: TInput,
  logMode: LoggingMode = "none",
  strategy: FetchStrategy = "native"
): Promise<unknown> => {
  const startTime = Date.now();

  // Log the API call if needed
  if (logMode !== "none") {
    logApiCall(endpoint.endpoint, params);
  }

  try {
    // 1. Build complete URL with parameters and API key
    const completeUrl = buildCompleteUrl(endpoint.endpoint, params);

    // Log the fetching URL if needed
    if (logMode !== "none") {
      console.log(`Fetching: ${completeUrl}`);
    }

    // 2. Execute request using specified fetch handler
    const handleFetch =
      strategy === "jsonp" ? handleFetchJsonp : handleFetchNative;
    const responseData = await handleFetch(completeUrl);

    // 3. Parse response JSON
    const jsonData = JSON.parse(responseData);

    // 4. Log results with performance metrics
    if (logMode !== "none") {
      logApiResults(jsonData, startTime, responseData.length);
    }

    return jsonData;
  } catch (error) {
    throw createApiError(error, endpoint.endpoint);
  }
};
