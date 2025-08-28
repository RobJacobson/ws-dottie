import log from "@/shared/utils/logger";
import { isTestEnvironment } from "@/shared/utils/testEnvironment";
import { createApiError } from "../errorHandling";
import { buildCompleteUrl } from "../request/prepareRequestUrl";

import type { FetchContext } from "../types";

/**
 * Error handling utilities for the data pipeline
 */

/**
 * Handles fetch errors and creates consistent API errors
 */
export const handlePipelineError = (
  error: unknown,
  fullUrlTemplate: string,
  logMode?: "debug" | "info" | "none"
): never => {
  // Create a minimal context for error handling
  const context: FetchContext = {
    endpoint: fullUrlTemplate.split("/").pop() || fullUrlTemplate,
    logMode: isTestEnvironment() ? undefined : logMode,
    interpolatedUrl: fullUrlTemplate,
  };

  // Log errors for debugging (only if not in test environment)
  if (
    (context.logMode === "debug" || context.logMode === "info") &&
    !isTestEnvironment()
  ) {
    log.error(`[${context.endpoint}] Request failed:`, error);
  }

  // Extract HTTP status if available
  const status =
    error instanceof Error
      ? (error as Error & { status?: number }).status
      : undefined;

  // Create consistent API error
  throw createApiError(
    error,
    context.endpoint,
    buildCompleteUrl(context.interpolatedUrl),
    status
  );
};
