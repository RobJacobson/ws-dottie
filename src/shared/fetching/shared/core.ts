/**
 * @fileoverview Core Fetching Logic
 *
 * This module provides the core fetching orchestration logic that coordinates
 * URL building, transport selection, and logging. It eliminates duplication
 * between the four main fetch functions.
 */

import type { Endpoint } from "@/shared/endpoints";
import type { FetchOptions } from "@/shared/types";
import { logApiCall, logApiResults } from "@/shared/utils/logger";
import { buildUrlWithApiKey, buildUrlWithParams } from "./buildUrl";
import { createApiError } from "./handleError";
import { handleJsonpFetch, handleNativeFetch } from "./handleFetch";

/**
 * Transport strategy type
 */
type TransportStrategy = "native" | "jsonp";

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
 * @param options - Optional fetch options including logging mode
 * @param strategy - Transport strategy to use
 * @returns Promise resolving to the response data
 */
export const fetchCore = async <TInput = never, TOutput = unknown>(
  endpoint: Endpoint<TInput, TOutput>,
  params?: TInput,
  options?: FetchOptions,
  strategy: TransportStrategy = "native"
): Promise<unknown> => {
  const startTime = Date.now();
  const logMode = options?.logMode ?? "none";

  // Log the API call if needed
  if (logMode !== "none") {
    logApiCall(endpoint.endpoint, params);
  }

  try {
    // 1. Build URL with parameters
    const urlWithParams = buildUrlWithParams(
      endpoint.endpoint,
      params as Record<string, unknown>
    );

    // Log the fetching URL if needed
    if (logMode !== "none") {
      console.log(`Fetching: ${urlWithParams}`);
    }

    // 2. Append API key
    const urlWithApiKey = buildUrlWithApiKey(urlWithParams);

    // 3. Execute request using specified transport
    const transport =
      strategy === "jsonp" ? handleJsonpFetch : handleNativeFetch;
    const responseData = await transport(urlWithApiKey);

    // 4. Parse response JSON
    const jsonData = JSON.parse(responseData);

    // 5. Log results with performance metrics
    if (logMode !== "none") {
      logApiResults(jsonData, startTime, responseData.length);
    }

    return jsonData;
  } catch (error) {
    throw createApiError(error, endpoint.endpoint);
  }
};
