import { createApiError } from "../pipeline/errorHandling";

import type { FetchContext } from "./types";
import { buildCompleteUrl } from "./urlBuilder";

/**
 * Error handling utilities for Zod fetch operations
 */

/**
 * Handles fetch errors and creates consistent API errors
 */
export const handleFetchError = (
  error: unknown,
  context: FetchContext
): never => {
  // Log errors for debugging
  if (context.logMode === "debug" || context.logMode === "info") {
    console.error(`[${context.endpoint}] Request failed:`, error);
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
