/**
 * @fileoverview Core Fetching Logic
 *
 * This module provides the core fetching orchestration logic that coordinates
 * URL building, transport selection, and logging. It eliminates duplication
 * between the four main fetch functions.
 */

import type { FetchEndpoint } from "@/apis/types";
import type { FetchStrategy, LoggingMode } from "@/shared/types";
import { parseJsonWithFallback } from "@/shared/utils/jsonParser";
import { logApiCall, logApiResults } from "@/shared/utils/logger";
import { buildCompleteUrl } from "./buildUrl";
import { createApiError } from "./handleError";
import { handleFetchJsonp, handleFetchNative } from "./handleFetch";

/**
 * Core fetch routine that handles URL building, transport selection, and logging
 *
 * This function provides the shared orchestration logic used by all fetch
 * functions. It handles URL building, request execution, response parsing,
 * and logging.
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param endpoint - The API endpoint to call
 * @param params - Optional input parameters for the endpoint
 * @param logMode - Logging verbosity level (default: "none")
 * @param strategy - Fetch strategy to use (default: "native")
 * @returns Promise resolving to the parsed response data as unknown
 */
export const fetchCore = async <TInput = never, TOutput = unknown>(
  endpoint: FetchEndpoint<TInput, TOutput>,
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
    const completeUrl = buildCompleteUrl(endpoint.urlTemplate, params);

    // Log the fetching URL if needed
    if (logMode !== "none") {
      console.log(`Fetching: ${completeUrl}`);
    }

    // 2. Execute request using specified fetch handler
    const handleFetch =
      strategy === "jsonp" ? handleFetchJsonp : handleFetchNative;
    const responseData = await handleFetch(completeUrl);

    // 3. Parse response JSON
    const jsonData = parseJsonWithFallback(responseData);

    // 4. Log results with performance metrics
    if (logMode !== "none") {
      logApiResults(jsonData, startTime, responseData.length);
    }

    return jsonData;
  } catch (error) {
    throw createApiError(error, endpoint.endpoint);
  }
};
