import { expect } from "vitest";

import { WsdotApiError } from "@/shared/fetching/errors";

// Rate limiting utility - be respectful to WSF API
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Performance monitoring
export const measureApiCall = async <T>(
  apiCall: () => Promise<T>
): Promise<{ data: T; duration: number }> => {
  const start = Date.now();
  const data = await apiCall();
  const duration = Date.now() - start;

  return { data, duration };
};

// Performance tracking
export const trackPerformance = (endpoint: string, duration: number) => {
  console.log(`📊 ${endpoint}: ${duration}ms`);

  if (duration > 2000) {
    console.warn(`⚠️  ${endpoint} exceeded 2-second benchmark: ${duration}ms`);
  }

  return duration;
};

// Error validation utility
export const validateApiError = (
  error: unknown,
  expectedCode?: string | string[]
) => {
  expect(error).toBeInstanceOf(WsdotApiError);
  if (error instanceof WsdotApiError) {
    if (expectedCode) {
      if (Array.isArray(expectedCode)) {
        expect(expectedCode).toContain(error.code);
      } else {
        expect(error.code).toBe(expectedCode);
      }
    }
    expect(error.message).toBeDefined();
    expect(typeof error.message).toBe("string");
  }
};

// Test constants
export const RATE_LIMIT_DELAY = 1000; // 1 second between API calls
export const TEST_VESSEL_ID = 1; // Test vessel ID for vessel-specific tests
export const INVALID_VESSEL_ID = 999999; // Invalid vessel ID for error testing
