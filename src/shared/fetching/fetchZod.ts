import type { LoggingMode } from "@/shared/utils/logger";
import { logApiCall, logApiResults } from "@/shared/utils/logger";

import { executeRequest } from "./execution";
import { handlePipelineError } from "./handleErrors";
import { buildFetchUrl } from "./pipeline/prepareRequest";
import { validateResponse } from "./pipeline/processResponse";

/**
 * @fileoverview Main data fetching API with Zod validation
 *
 * This is the main API that provides better self-documentation
 * by inlining endpoint strings and using a single object parameter.
 * It handles the complete data pipeline execution:
 * 1. Request preparation: Input validation and URL building
 * 2. Request execution: Platform-appropriate fetch strategy (JSONP vs fetch)
 * 3. Response processing: Output validation and transformation
 * 4. Error handling: Consistent error reporting and handling
 */

/**
 * Fetches data from WSDOT/WSF APIs with comprehensive validation and error handling
 *
 * This function provides a complete data fetching pipeline with automatic strategy
 * selection, input/output validation, and consistent error handling across all
 * environments. It automatically chooses between JSONP (browsers) and native fetch
 * (servers) based on the current environment.
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param config - Configuration object containing all parameters
 * @param config.endpoint - The API endpoint URL template (inline for self-documentation)
 * @param config.inputSchema - Optional Zod schema for input validation
 * @param config.outputSchema - Zod schema for output validation
 * @param config.params - Optional parameters to interpolate into the URL template
 * @param config.logMode - Optional logging mode for debugging
 * @returns Promise resolving to validated response data
 *
 * @example
 * ```typescript
 * const data = await fetchZod({
 *   endpoint: "/ferries/api/schedule/rest/sailings",
 *   inputSchema: sailingParamsSchema,
 *   outputSchema: sailingResponseSchema,
 *   params: { route: "SEA-BI", date: new Date() },
 *   logMode: "debug"
 * });
 * ```
 */
export const fetchZod = async <TInput = never, TOutput = unknown>({
  endpoint,
  inputSchema,
  outputSchema,
  params,
  logMode,
}: {
  endpoint: string;
  inputSchema?: import("zod").ZodType<TInput>;
  outputSchema: import("zod").ZodType<TOutput>;
  params?: TInput;
  logMode?: LoggingMode;
}): Promise<TOutput> => {
  const startTime = Date.now();

  // Create context for request preparation
  const context = {
    endpoint: endpoint.split("/").pop() || endpoint,
    logMode,
    interpolatedUrl: endpoint,
  };

  // Log the API call
  if (logMode !== "none") {
    logApiCall(context.endpoint, params);
  }

  // Stage 1: Prepare request (outside try-catch for fail-fast behavior)
  const url = buildFetchUrl(endpoint, inputSchema, params, context);

  try {
    // Stage 2: Request Execution
    const responseData = await executeRequest(url, context);

    // Stage 3: Response Processing
    const result = validateResponse(responseData, outputSchema, context);

    // Log the results
    if (logMode !== "none") {
      const duration = Date.now() - startTime;
      const responseSize = JSON.stringify(responseData).length;
      const objectCount = Array.isArray(result) ? result.length : 1;
      logApiResults(objectCount, duration, responseSize);
    }

    return result;
  } catch (error: unknown) {
    // Handle execution and response errors through the pipeline error handler
    throw handlePipelineError(error, url, logMode);
  }
};
