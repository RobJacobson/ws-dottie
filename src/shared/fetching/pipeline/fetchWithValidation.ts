import type { LoggingMode } from "@/shared/utils";

import { validateInputs, validateResponse } from "../validation/core";
import { prepareRequestUrl } from "./request";
import { executeRequest } from "./execution";
import { handlePipelineError } from "./response";
import type { FetchContext, FetchSchemas } from "./types";

/**
 * Main entry point for the data pipeline
 *
 * This function orchestrates the entire data pipeline:
 * 1. Request preparation (validation, URL building)
 * 2. Request execution (fetch strategy selection and execution)
 * 3. Response processing (validation, transformation)
 * 4. Error handling and return
 */

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

/**
 * Main data pipeline function with validation
 *
 * This function provides a simplified, direct approach to API fetching with Zod validation.
 * It automatically handles all the complexity of API requests while maintaining a simple,
 * understandable API surface.
 *
 * The pipeline stages:
 * 1. Request preparation: Input validation and URL building
 * 2. Request execution: Platform-appropriate fetch strategy (JSONP vs fetch)
 * 3. Response processing: Output validation and transformation
 * 4. Error handling: Consistent error reporting and handling
 *
 * @param fullUrlTemplate - Complete URL template (e.g., "/ferries/api/vessels/rest/vesselbasics/{vesselId}")
 * @param schemas - Zod schemas for input and output validation
 * @param params - Parameters to interpolate into the URL template
 * @param logMode - Optional logging mode for debugging
 * @returns Promise resolving to validated response data
 */
export const fetchWithValidation = async <TInput = never, TOutput = unknown>(
  fullUrlTemplate: string,
  schemas: FetchSchemas<TInput, TOutput>,
  params?: TInput,
  logMode?: LoggingMode
): Promise<TOutput> => {
  try {
    const context = createFetchContext(fullUrlTemplate, logMode);

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
    return validateResponse(responseData, schemas.output, context);
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
