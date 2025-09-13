/**
 * @fileoverview Error handling utilities for the data pipeline
 *
 * This module provides comprehensive error handling for the WS-Dottie data pipeline,
 * including standardized error types, context information, and user-friendly error
 * messages. It handles various error scenarios from network failures to validation
 * errors and provides consistent error reporting across all environments.
 */

import type { ZodError } from "zod";
import { isTestEnvironment } from "@/shared/fetching/testEnvironment";
import log from "@/shared/utils/logger";
import { buildCompleteUrl } from "./pipeline/prepareRequest";
import type { FetchContext } from "./types";

/**
 * Creates a standardized error from Zod validation failures
 *
 * Converts Zod validation errors into human-readable error messages with
 * detailed field information for better debugging and user feedback.
 *
 * @param error - The ZodError to convert
 * @param context - Context for the error (e.g., "Parameter validation", "Response validation")
 * @returns Standardized Error with detailed field messages
 */
export function createValidationError(error: ZodError, context: string): Error {
  const fieldErrors = error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(", ");
  return new Error(`${context} failed: ${fieldErrors}`);
}

/**
 * Error codes for different types of API failures
 *
 * Used to categorize errors and provide appropriate user feedback.
 * These codes help distinguish between different failure modes and
 * enable appropriate error handling strategies.
 */
export type ErrorCode =
  | "NETWORK_ERROR" // Network connectivity issues
  | "API_ERROR" // Server-side API errors (4xx, 5xx)
  | "TRANSFORM_ERROR" // Data transformation/validation failures
  | "TIMEOUT_ERROR" // Request timeout
  | "CORS_ERROR" // Cross-origin request failures
  | "INVALID_RESPONSE" // Malformed server responses
  | "RATE_LIMIT_ERROR"; // Rate limiting exceeded

/**
 * Context information for API errors
 *
 * Provides additional details to help with debugging and user feedback.
 * This information is included with all API errors to provide better
 * error reporting and debugging capabilities.
 */
export interface ErrorContext {
  /** The URL that was being accessed when the error occurred */
  url?: string;
  /** HTTP status code if available */
  status?: number;
  /** Number of retry attempts made */
  retryCount?: number;
  /** Name of the API endpoint being called */
  endpoint?: string;
  /** Timestamp when the error occurred */
  timestamp: Date;
}

/**
 * Custom error class for WSDOT API-specific errors
 *
 * Extends the standard Error class with additional context and error codes.
 * This provides a consistent error interface across the entire WS-Dottie
 * library with rich context information for debugging and user feedback.
 */
export class WsdotApiError extends Error {
  /** The specific error code for this error */
  public readonly code: ErrorCode;
  /** Additional context information about the error */
  public readonly context: ErrorContext;
  /** User-friendly error message */
  public readonly userMessage: string;

  /**
   * Creates a new WSDOT API error
   *
   * @param message - Human-readable error message for debugging
   * @param code - Error code for categorization and handling
   * @param userMessage - User-friendly error message for display
   * @param context - Additional context information for debugging
   */
  constructor(
    message: string,
    code: ErrorCode,
    userMessage: string,
    context: Partial<ErrorContext> = {}
  ) {
    super(message);
    this.name = "WsdotApiError";
    this.code = code;
    this.userMessage = userMessage;
    this.context = {
      timestamp: new Date(),
      ...context,
    };
  }
}

/**
 * Determines the appropriate error code and user message for a given error
 *
 * Analyzes various error types and maps them to appropriate error codes
 * and user-friendly messages. This function handles network errors, API errors,
 * timeout errors, CORS issues, and other common failure scenarios.
 *
 * @param error - The error to analyze
 * @param status - HTTP status code if available
 * @returns Object containing the error code and user-friendly message
 */
function determineErrorInfo(
  error: Error,
  status?: number
): { code: ErrorCode; userMessage: string } {
  const message = error.message.toLowerCase();
  const errorWithProps = error as Error & {
    status?: number;
    apiError?: boolean;
  };

  // Check for API errors (from utils.ts)
  if (errorWithProps.apiError) {
    return {
      code: "API_ERROR",
      userMessage: "The API is currently unavailable. Please try again later.",
    };
  }

  // Check for HTTP error status codes
  if (status && status >= 400) {
    return {
      code: "API_ERROR",
      userMessage: "The API is currently unavailable. Please try again later.",
    };
  }

  // Check for timeout-related errors
  if (message.includes("timeout") || message.includes("timed out")) {
    return {
      code: "TIMEOUT_ERROR",
      userMessage: "Request timed out. Please try again.",
    };
  }

  // Check for script load failures (JSONP specific)
  if (message.includes("script load failed")) {
    return {
      code: "NETWORK_ERROR",
      userMessage:
        "Network connection failed. Please check your internet connection.",
    };
  }

  // Check for CORS-related errors
  if (message.includes("cors") || message.includes("cross-origin")) {
    return {
      code: "CORS_ERROR",
      userMessage:
        "Cross-origin request failed. This may be a browser security issue.",
    };
  }

  // Check for network-related errors
  if (message.includes("network") || message.includes("fetch")) {
    return {
      code: "NETWORK_ERROR",
      userMessage:
        "Network connection failed. Please check your internet connection.",
    };
  }

  // Check for invalid response errors
  if (message.includes("invalid response") || message.includes("empty body")) {
    return {
      code: "INVALID_RESPONSE",
      userMessage: "Received an invalid response from the server.",
    };
  }

  // Default to network error for other cases
  return {
    code: "NETWORK_ERROR",
    userMessage:
      "Network connection failed. Please check your internet connection.",
  };
}

/**
 * Creates a standardized WSDOT API error from various error types
 *
 * Analyzes the input error and creates an appropriate WsdotApiError
 * with the correct error code and context information. This function
 * handles all error types and ensures consistent error reporting.
 *
 * @param error - The original error to convert
 * @param endpoint - Name of the API endpoint being called
 * @param url - URL that was being accessed
 * @param status - HTTP status code if available
 * @returns Standardized WsdotApiError instance
 */
export function createApiError(
  error: unknown,
  endpoint: string,
  url?: string,
  status?: number
): WsdotApiError {
  const context: Partial<ErrorContext> = { endpoint, url, status };

  // If it's already a WsdotApiError, return it as-is
  if (error instanceof WsdotApiError) {
    return error;
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    const { code, userMessage } = determineErrorInfo(error, status);
    return new WsdotApiError(error.message, code, userMessage, context);
  }

  // Handle non-Error types (strings, objects, etc.)
  return new WsdotApiError(
    typeof error === "string" ? error : "Unknown error occurred",
    "NETWORK_ERROR",
    "Network connection failed. Please check your internet connection.",
    context
  );
}

/**
 * Handles fetch errors and creates consistent API errors for the data pipeline
 *
 * This function provides pipeline-specific error handling that:
 * - Creates appropriate context for error reporting
 * - Logs errors for debugging (when not in test environment)
 * - Builds complete URLs for error reporting
 * - Converts all errors to standardized WsdotApiError instances
 *
 * @param error - The error that occurred
 * @param fullUrlTemplate - The URL template that was being accessed
 * @param logMode - Optional logging mode for debugging
 * @throws WsdotApiError - Always throws a standardized error
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

  // Build complete URL for error reporting
  const completeUrl = buildCompleteUrl(context.interpolatedUrl);

  // Create consistent API error
  throw createApiError(error, context.endpoint, completeUrl, status);
};
