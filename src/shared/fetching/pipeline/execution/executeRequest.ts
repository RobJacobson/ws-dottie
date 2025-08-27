import { getEnvironmentType, selectFetchStrategy } from "./fetchOrchestrator";
import type { FetchContext } from "../types";

/**
 * Request execution utilities for the data pipeline
 */

/**
 * Executes the actual API request using the appropriate fetch strategy
 */
export const executeRequest = async (
  completeUrl: string,
  context: FetchContext
): Promise<unknown> => {
  const fetchStrategy = selectFetchStrategy();
  const responseString = await fetchStrategy(completeUrl);

  const rawData = JSON.parse(responseString);

  // Debug logging
  if (context.logMode === "debug") {
    console.debug(`[${context.endpoint}] Raw response parsed:`, rawData);
    console.debug(
      `[${context.endpoint}] Using ${getEnvironmentType()} fetch strategy`
    );
    console.debug(`[${context.endpoint}] Requesting: ${completeUrl}`);
  }

  return rawData;
};
