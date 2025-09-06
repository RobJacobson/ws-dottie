/**
 * Main entry point for the data pipeline
 *
 * This modue orchestrates the entire data pipeline:
 * 1. Request preparation (validation, URL building)
 * 2. Request execution (fetch strategy selection and execution)
 * 3. Response processing (validation, transformation)
 * 4. Error handling and return
 */

import type { z } from "zod";
import type { LoggingMode } from "@/shared/utils";
import { logApiCall, logApiResults } from "@/shared/utils/logger";

import { validateInputs, validateResponse } from "../validation";
import { executeRequest } from "./execution";
import { prepareRequestUrl } from "./request";
import { handlePipelineError } from "./response";
import type { FetchContext, FetchSchemas } from "./types";

/**
 * Simple curried function for standard API calls
 *
 * Creates a function that fetches and validates API data with a clean, simple interface.
 * This is the primary function for 99% of API calls in the codebase.
 *
 * @param endpoint - The API endpoint URL template
 * @param input - Optional Zod schema for input validation
 * @param output - Zod schema for output validation
 * @returns A function that accepts parameters and returns validated data
 */
export const zodFetch = <TInput = never, TOutput = unknown>(
  endpoint: string,
  input: z.ZodSchema<TInput> | undefined,
  output: z.ZodSchema<TOutput>
) => {
  return async (params: TInput): Promise<TOutput> => {
    return executeZodFetch(endpoint, { input, output }, params);
  };
};

/**
 * Explicit function for custom URLs and complex logic
 *
 * Use this for cases that need custom URL handling, conditional endpoints,
 * or other complex logic that doesn't fit the simple zodFetch pattern.
 *
 * @param fullUrlTemplate - Complete URL template
 * @param schemas - Zod schemas for input and output validation
 * @param params - Parameters to interpolate into the URL template
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to validated response data
 */
export const zodFetchCustom = async <TInput = never, TOutput = unknown>(
  fullUrlTemplate: string,
  schemas: FetchSchemas<TInput, TOutput>,
  params: TInput,
  logMode?: LoggingMode
): Promise<TOutput> => {
  return executeZodFetch(fullUrlTemplate, schemas, params, logMode);
};

/**
 * Core data pipeline function with validation
 *
 * This internal function handles the actual data pipeline execution:
 * 1. Request preparation: Input validation and URL building
 * 2. Request execution: Platform-appropriate fetch strategy (JSONP vs fetch)
 * 3. Response processing: Output validation and transformation
 * 4. Error handling: Consistent error reporting and handling
 */
const executeZodFetch = async <TInput = never, TOutput = unknown>(
  fullUrlTemplate: string,
  schemas: FetchSchemas<TInput, TOutput>,
  params: TInput,
  logMode?: LoggingMode
): Promise<TOutput> => {
  const startTime = Date.now();

  try {
    const context = createFetchContext(fullUrlTemplate, logMode);

    // Log the API call
    if (logMode !== "none") {
      logApiCall(context.endpoint, params);
    }

    // Stage 1: Request Preparation
    const validatedParams = validateInputs(schemas.input, params, context);
    const completeUrl = prepareRequestUrl(
      fullUrlTemplate,
      validatedParams,
      context
    );

    // Stage 2: Request Execution
    const responseData = await executeRequest(completeUrl, context);

    // Stage 3: Response Processing
    const result = validateResponse(responseData, schemas.output, context);

    // Log the results
    if (logMode !== "none") {
      const duration = Date.now() - startTime;
      const responseSize = JSON.stringify(responseData).length;
      const objectCount = Array.isArray(result) ? result.length : 1;
      logApiResults(objectCount, duration, responseSize);
    }

    return result;
  } catch (error: unknown) {
    // If context creation failed, we can't use it for error handling
    if (
      error instanceof Error &&
      error.message.includes("Failed to create fetch context")
    ) {
      throw error; // Re-throw context creation errors as-is
    }

    // For other errors, handle them through the pipeline error handler
    throw handlePipelineError(error, fullUrlTemplate, logMode);
  }
};

/**
 * Creates fetch context for logging and error handling
 */
const createFetchContext = (
  fullUrlTemplate: string,
  logMode?: LoggingMode
): FetchContext => {
  // Simple endpoint extraction with fallback
  const endpoint = fullUrlTemplate.split("/").pop() || fullUrlTemplate;

  return { endpoint, logMode, interpolatedUrl: fullUrlTemplate };
};
