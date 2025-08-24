/**
 * Error handling utilities for the data pipeline
 */

/**
 * Error codes for different types of API failures
 * Used to categorize errors and provide appropriate user feedback
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
 * Provides additional details to help with debugging and user feedback
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
 * Extends the standard Error class with additional context and error codes
 */
export class WsdotApiError extends Error {
  /** The specific error code for this error */
  public readonly code: ErrorCode;
  /** Additional context information about the error */
  public readonly context: ErrorContext;

  /**
   * Creates a new WSDOT API error
   *
   * @param message - Human-readable error message
   * @param code - Error code for categorization
   * @param context - Additional context information
   */
  constructor(
    message: string,
    code: ErrorCode,
    context: Partial<ErrorContext> = {}
  ) {
    super(message);
    this.name = "WsdotApiError";
    this.code = code;
    this.context = {
      timestamp: new Date(),
      ...context,
    };
  }

  /**
   * Get a user-friendly error message suitable for end users
   *
   * @returns User-friendly error message
   */
  getUserMessage(): string {
    switch (this.code) {
      case "NETWORK_ERROR":
        return "Network connection failed. Please check your internet connection.";
      case "API_ERROR":
        return "The API is currently unavailable. Please try again later.";
      case "TRANSFORM_ERROR":
        return "Received invalid data from the server.";
      case "TIMEOUT_ERROR":
        return "Request timed out. Please try again.";
      case "CORS_ERROR":
        return "Cross-origin request failed. This may be a browser security issue.";
      case "INVALID_RESPONSE":
        return "Received an invalid response from the server.";
      case "RATE_LIMIT_ERROR":
        return "Too many requests. Please wait before trying again.";
      default:
        return this.message;
    }
  }
}

/**
 * Creates a standardized WSDOT API error from various error types
 *
 * Analyzes the input error and creates an appropriate WsdotApiError
 * with the correct error code and context information.
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
    const message = error.message.toLowerCase();

    // Check for timeout-related errors
    if (message.includes("timeout") || message.includes("timed out")) {
      return new WsdotApiError(error.message, "TIMEOUT_ERROR", context);
    }

    // Check for CORS-related errors
    if (message.includes("cors") || message.includes("cross-origin")) {
      return new WsdotApiError(error.message, "CORS_ERROR", context);
    }

    // Check for network-related errors
    if (message.includes("network") || message.includes("fetch")) {
      return new WsdotApiError(error.message, "NETWORK_ERROR", context);
    }

    // Check for HTTP error status codes
    if (status && status >= 400) {
      return new WsdotApiError(error.message, "API_ERROR", context);
    }

    // Default to network error for other cases
    return new WsdotApiError(error.message, "NETWORK_ERROR", context);
  }

  // Handle non-Error types (strings, objects, etc.)
  return new WsdotApiError(
    typeof error === "string" ? error : "Unknown error occurred",
    "NETWORK_ERROR",
    context
  );
}
