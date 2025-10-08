/**
 * @fileoverview Simplified Error Handling for WS-Dottie
 *
 * This module provides streamlined error handling for WS-Dottie API operations,
 * focusing on preserving actual error information while providing useful context.
 * It includes a simple ApiError class that passes through real error messages
 * while adding relevant context for debugging and logging.
 */

import type { ZodError } from "zod";
import { z } from "zod";

/**
 * Context information for error reporting
 *
 * Contains additional context about errors that occurred during
 * API operations, useful for debugging and error reporting.
 */
export interface ErrorContext {
  /** The URL that was being accessed when the error occurred */
  url?: string;
  /** HTTP status code if available */
  status?: number;
  /** The API endpoint that was being called */
  endpoint?: string;
  /** Timestamp when the error occurred */
  timestamp: Date;
}

/**
 * API error type for strongly-typed error handling
 *
 * A POJO (Plain Old JavaScript Object) that represents API errors with
 * context information. This approach is more functional and aligns with
 * modern TypeScript patterns while preserving the original error messages
 * for better debugging.
 */
export interface ApiError {
  /** Error name for type identification */
  readonly name: "ApiError";
  /** Human-readable error message (preserves original error) */
  readonly message: string;
  /** HTTP status code if available */
  readonly status?: number;
  /** Additional context information about the error */
  readonly context: ErrorContext;
}

/**
 * Creates a standardized API error from various error types
 *
 * This function preserves the original error messages while adding useful
 * context information. It handles Zod validation errors, network errors,
 * and other common error scenarios by passing through the actual error
 * information rather than trying to categorize or rewrite it.
 *
 * @param error - The original error to convert
 * @param endpoint - The API endpoint where the error occurred
 * @returns Standardized ApiError POJO
 */
export const createApiError = (error: unknown, endpoint: string): ApiError => {
  const { message, status } = extractErrorInfo(error);

  return {
    name: "ApiError",
    message,
    status,
    context: {
      timestamp: new Date(),
      endpoint,
      url: endpoint,
    },
  };
};

/**
 * Type guard to check if an error is an ApiError
 *
 * @param error - The error to check
 * @returns True if the error is an ApiError, false otherwise
 */
export const isApiError = (error: unknown): error is ApiError => {
  return (
    error !== null &&
    typeof error === "object" &&
    "name" in error &&
    error.name === "ApiError"
  );
};

/**
 * Extracts message and status code from various error types
 *
 * @param error - The error to analyze
 * @returns Object containing the message and optional status code
 */
const extractErrorInfo = (
  error: unknown
): { message: string; status?: number } => {
  if (error instanceof Error && error.name === "ZodError") {
    const zodError = error as ZodError;
    const prettyError = z.prettifyError(zodError);
    return { message: `Validation failed:\n${prettyError}` };
  }

  if (error instanceof Error) {
    // Extract HTTP status if available from error message
    const statusMatch = error.message.match(/HTTP (\d+)/);
    const status = statusMatch ? parseInt(statusMatch[1], 10) : undefined;
    return { message: error.message, status };
  }

  return { message: "An unexpected error occurred" };
};
