// Custom error types for WSDOT API client

export type ErrorCode =
  | "NETWORK_ERROR"
  | "API_ERROR"
  | "TRANSFORM_ERROR"
  | "TIMEOUT_ERROR"
  | "CORS_ERROR"
  | "INVALID_RESPONSE"
  | "RATE_LIMIT_ERROR";

export interface ErrorContext {
  url?: string;
  status?: number;
  retryCount?: number;
  endpoint?: string;
  timestamp: Date;
}

/**
 * Base error class for WSDOT API client errors
 */
export class WsdotApiError extends Error {
  public readonly code: ErrorCode;
  public readonly context: ErrorContext;

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
   * Check if this error is retryable
   */
  isRetryable(): boolean {
    return ["NETWORK_ERROR", "TIMEOUT_ERROR", "RATE_LIMIT_ERROR"].includes(
      this.code
    );
  }

  /**
   * Get a user-friendly error message
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
 * Network-related errors (connection failures, timeouts)
 */
export class NetworkError extends WsdotApiError {
  constructor(message: string, context?: Partial<ErrorContext>) {
    super(message, "NETWORK_ERROR", context);
    this.name = "NetworkError";
  }
}

/**
 * API server errors (HTTP 4xx/5xx responses)
 */
export class ApiError extends WsdotApiError {
  constructor(
    message: string,
    status?: number,
    context?: Partial<ErrorContext>
  ) {
    super(message, "API_ERROR", { ...context, status });
    this.name = "ApiError";
  }
}

/**
 * Data transformation errors (parsing, validation)
 */
export class TransformError extends WsdotApiError {
  constructor(message: string, context?: Partial<ErrorContext>) {
    super(message, "TRANSFORM_ERROR", context);
    this.name = "TransformError";
  }
}

/**
 * Timeout errors
 */
export class TimeoutError extends WsdotApiError {
  constructor(message: string, context?: Partial<ErrorContext>) {
    super(message, "TIMEOUT_ERROR", context);
    this.name = "TimeoutError";
  }
}

/**
 * CORS-related errors
 */
export class CorsError extends WsdotApiError {
  constructor(message: string, context?: Partial<ErrorContext>) {
    super(message, "CORS_ERROR", context);
    this.name = "CorsError";
  }
}

/**
 * Rate limiting errors
 */
export class RateLimitError extends WsdotApiError {
  constructor(message: string, context?: Partial<ErrorContext>) {
    super(message, "RATE_LIMIT_ERROR", context);
    this.name = "RateLimitError";
  }
}

/**
 * Invalid response errors
 */
export class InvalidResponseError extends WsdotApiError {
  constructor(message: string, context?: Partial<ErrorContext>) {
    super(message, "INVALID_RESPONSE", context);
    this.name = "InvalidResponseError";
  }
}

/**
 * Create appropriate error type based on the error context
 */
export function createApiError(
  error: unknown,
  endpoint: string,
  url?: string,
  status?: number
): WsdotApiError {
  const context: Partial<ErrorContext> = { endpoint, url, status };

  if (error instanceof WsdotApiError) {
    return error;
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes("timeout") || message.includes("timed out")) {
      return new TimeoutError(error.message, context);
    }

    if (message.includes("cors") || message.includes("cross-origin")) {
      return new CorsError(error.message, context);
    }

    if (message.includes("network") || message.includes("fetch")) {
      return new NetworkError(error.message, context);
    }

    if (status && status >= 400) {
      return new ApiError(error.message, status, context);
    }

    return new WsdotApiError(error.message, "NETWORK_ERROR", context);
  }

  return new WsdotApiError(
    typeof error === "string" ? error : "Unknown error occurred",
    "NETWORK_ERROR",
    context
  );
}
