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

  // Debug: Log the raw response string before parsing
  console.log(
    `[DEBUG] Response string before JSON.parse:`,
    responseString.substring(0, 200) + "..."
  );

  const rawData = JSON.parse(responseString);

  // Debug: Log the parsed data and check for Date objects
  console.log(`[DEBUG] Raw data after JSON.parse:`, typeof rawData);
  if (Array.isArray(rawData) && rawData.length > 0) {
    const firstItem = rawData[0];
    console.log(
      `[DEBUG] First item APILastUpdate:`,
      typeof firstItem.APILastUpdate,
      firstItem.APILastUpdate
    );
    console.log(
      `[DEBUG] First item RouteDate:`,
      typeof firstItem.RouteDate,
      firstItem.RouteDate
    );
  }

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
