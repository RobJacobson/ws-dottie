/**
 * Error handling utilities for API requests
 *
 * This module provides error types and utilities for handling API errors,
 * including:
 * - Custom error classes for different error types
 * - Error context and user-friendly error messages
 * - Error creation utilities
 */

export {
  createApiError,
  type ErrorCode,
  type ErrorContext,
  WsdotApiError,
} from "./errors";
