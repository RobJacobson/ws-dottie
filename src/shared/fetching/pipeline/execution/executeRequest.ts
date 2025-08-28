import { isTestEnvironment } from "@/shared/utils/testEnvironment";
import type { FetchContext } from "../types";
import { getEnvironmentType, selectFetchStrategy } from "./fetchOrchestrator";

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
