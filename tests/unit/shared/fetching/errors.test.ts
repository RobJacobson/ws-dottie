import { describe, expect, it } from "vitest";

import {
  ApiError,
  CorsError,
  createApiError,
  InvalidResponseError,
  NetworkError,
  RateLimitError,
  TimeoutError,
  TransformError,
  WsdApiError,
} from "@/shared/fetching/errors";

describe("Error Handling", () => {
  describe("WsdApiError", () => {
    it("should create a base error with context", () => {
      const error = new WsdApiError("Test error", "NETWORK_ERROR", {
        url: "https://api.example.com",
        status: 500,
      });

      expect(error.message).toBe("Test error");
      expect(error.code).toBe("NETWORK_ERROR");
      expect(error.name).toBe("WsdApiError");
      expect(error.context.url).toBe("https://api.example.com");
      expect(error.context.status).toBe(500);
      expect(error.context.timestamp).toBeInstanceOf(Date);
    });

    it("should identify retryable errors", () => {
      const retryableErrors = [
        new WsdApiError("Network error", "NETWORK_ERROR"),
        new WsdApiError("Timeout error", "TIMEOUT_ERROR"),
        new WsdApiError("Rate limit error", "RATE_LIMIT_ERROR"),
      ];

      const nonRetryableErrors = [
        new WsdApiError("API error", "API_ERROR"),
        new WsdApiError("Transform error", "TRANSFORM_ERROR"),
        new WsdApiError("CORS error", "CORS_ERROR"),
        new WsdApiError("Invalid response", "INVALID_RESPONSE"),
      ];

      retryableErrors.forEach((error) => {
        expect(error.isRetryable()).toBe(true);
      });

      nonRetryableErrors.forEach((error) => {
        expect(error.isRetryable()).toBe(false);
      });
    });

    it("should provide user-friendly messages", () => {
      const error = new WsdApiError("Technical error", "NETWORK_ERROR");
      const userMessage = error.getUserMessage();

      expect(userMessage).toBe(
        "Network connection failed. Please check your internet connection."
      );
      expect(userMessage).not.toContain("Technical error");
    });
  });

  describe("Specific Error Classes", () => {
    it("should create NetworkError", () => {
      const error = new NetworkError("Connection failed");
      expect(error.name).toBe("NetworkError");
      expect(error.code).toBe("NETWORK_ERROR");
      expect(error.isRetryable()).toBe(true);
    });

    it("should create ApiError with status", () => {
      const error = new ApiError("Server error", 500);
      expect(error.name).toBe("ApiError");
      expect(error.code).toBe("API_ERROR");
      expect(error.context.status).toBe(500);
      expect(error.isRetryable()).toBe(false);
    });

    it("should create TransformError", () => {
      const error = new TransformError("Invalid JSON");
      expect(error.name).toBe("TransformError");
      expect(error.code).toBe("TRANSFORM_ERROR");
      expect(error.isRetryable()).toBe(false);
    });

    it("should create TimeoutError", () => {
      const error = new TimeoutError("Request timed out");
      expect(error.name).toBe("TimeoutError");
      expect(error.code).toBe("TIMEOUT_ERROR");
      expect(error.isRetryable()).toBe(true);
    });

    it("should create CorsError", () => {
      const error = new CorsError("CORS policy violation");
      expect(error.name).toBe("CorsError");
      expect(error.code).toBe("CORS_ERROR");
      expect(error.isRetryable()).toBe(false);
    });

    it("should create RateLimitError", () => {
      const error = new RateLimitError("Too many requests");
      expect(error.name).toBe("RateLimitError");
      expect(error.code).toBe("RATE_LIMIT_ERROR");
      expect(error.isRetryable()).toBe(true);
    });

    it("should create InvalidResponseError", () => {
      const error = new InvalidResponseError("Malformed response");
      expect(error.name).toBe("InvalidResponseError");
      expect(error.code).toBe("INVALID_RESPONSE");
      expect(error.isRetryable()).toBe(false);
    });
  });

  describe("createApiError", () => {
    it("should return existing WsdApiError unchanged", () => {
      const originalError = new NetworkError("Original error");
      const result = createApiError(originalError, "test-endpoint");

      expect(result).toBe(originalError);
    });

    it("should create TimeoutError from timeout message", () => {
      const error = new Error("Request timeout after 5000ms");
      const result = createApiError(error, "test-endpoint");

      expect(result).toBeInstanceOf(TimeoutError);
      expect(result.code).toBe("TIMEOUT_ERROR");
    });

    it("should create CorsError from CORS message", () => {
      const error = new Error("CORS policy violation");
      const result = createApiError(error, "test-endpoint");

      expect(result).toBeInstanceOf(CorsError);
      expect(result.code).toBe("CORS_ERROR");
    });

    it("should create NetworkError from network message", () => {
      const error = new Error("Network request failed");
      const result = createApiError(error, "test-endpoint");

      expect(result).toBeInstanceOf(NetworkError);
      expect(result.code).toBe("NETWORK_ERROR");
    });

    it("should create ApiError from HTTP status", () => {
      const error = new Error("HTTP 404 Not Found");
      const result = createApiError(
        error,
        "test-endpoint",
        "https://api.example.com",
        404
      );

      expect(result).toBeInstanceOf(ApiError);
      expect(result.code).toBe("API_ERROR");
      expect(result.context.status).toBe(404);
    });

    it("should create NetworkError for unknown errors", () => {
      const error = new Error("Unknown error");
      const result = createApiError(error, "test-endpoint");

      expect(result).toBeInstanceOf(WsdApiError);
      expect(result.code).toBe("NETWORK_ERROR");
    });

    it("should handle string errors", () => {
      const result = createApiError("String error", "test-endpoint");

      expect(result).toBeInstanceOf(WsdApiError);
      expect(result.message).toBe("String error");
      expect(result.code).toBe("NETWORK_ERROR");
    });

    it("should handle unknown error types", () => {
      const result = createApiError(123, "test-endpoint");

      expect(result).toBeInstanceOf(WsdApiError);
      expect(result.message).toBe("Unknown error occurred");
      expect(result.code).toBe("NETWORK_ERROR");
    });
  });
});
