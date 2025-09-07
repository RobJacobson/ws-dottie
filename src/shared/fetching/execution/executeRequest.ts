import { isTestEnvironment } from "@/shared/fetching/testEnvironment";
import type { FetchContext } from "../types";
import { getEnvironmentType, selectFetchStrategy } from "./fetchOrchestrator";

/**
 * @fileoverview Request execution utilities for the data pipeline
 *
 * This module provides the main request execution function that coordinates
 * between the fetch strategy selection and response processing.
 */

/**
 * Executes the actual API request using the appropriate fetch strategy
 *
 * This function coordinates the request execution by selecting the appropriate
 * fetch strategy based on the current environment and processing the response.
 *
 * @param completeUrl - The complete URL with base URL and API key
 * @param context - Request context for logging and debugging
 * @returns Promise resolving to parsed response data
 */
export const executeRequest = async (
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
