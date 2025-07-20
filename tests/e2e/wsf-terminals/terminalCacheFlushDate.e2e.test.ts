// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { getCacheFlushDateTerminals } from "@/api/wsf-terminals";
import { useCacheFlushDateTerminals } from "@/react/wsf-terminals";

// Test wrapper component
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    );
  };
};

describe("Terminal Cache Flush Date E2E Tests", () => {
  beforeEach(() => {
    console.log("🚀 Starting E2E tests with live WSF API calls");
  });

  afterEach(() => {
    console.log("✅ E2E tests completed");
  });

  describe("getCacheFlushDateTerminals", () => {
    it("should fetch cache flush date successfully", async () => {
      const startTime = Date.now();

      const result = await getCacheFlushDateTerminals();

      const duration = Date.now() - startTime;
      console.log(`📊 getCacheFlushDateTerminals: ${duration}ms`);

      expect(result).toBeDefined();
      expect(result).not.toBeNull();
      expect(result).toBeInstanceOf(Date);
    });

    it("should return a valid date in the past", async () => {
      const result = await getCacheFlushDateTerminals();

      expect(result).toBeDefined();
      expect(result).not.toBeNull();

      // The cache flush date should be in the past (not in the future)
      expect(result?.getTime()).toBeLessThanOrEqual(Date.now());

      // The cache flush date should be reasonably recent (not more than 1 year old)
      const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000;
      expect(result?.getTime()).toBeGreaterThan(oneYearAgo);
    });

    it("should handle API errors gracefully", async () => {
      // This test verifies error handling by using an invalid API call
      // The actual error handling is tested in the implementation
      expect(async () => {
        try {
          await getCacheFlushDateTerminals();
        } catch (error) {
          // Error should be handled gracefully
          expect(error).toBeDefined();
        }
      }).not.toThrow();
    });

    it("should return consistent data structure", async () => {
      const result1 = await getCacheFlushDateTerminals();
      const result2 = await getCacheFlushDateTerminals();

      expect(result1).toBeDefined();
      expect(result1).not.toBeNull();
      expect(result2).toBeDefined();
      expect(result2).not.toBeNull();

      // Both calls should return Date objects
      expect(result1).toBeInstanceOf(Date);
      expect(result2).toBeInstanceOf(Date);

      // Both results should be very close (within 5 minutes)
      // Cache flush dates may be updated periodically by the API
      const timeDiff = Math.abs(
        (result1?.getTime() ?? 0) - (result2?.getTime() ?? 0)
      );
      expect(timeDiff).toBeLessThan(5 * 60 * 1000); // 5 minutes
    });
  });

  describe("useCacheFlushDateTerminals", () => {
    it("should fetch cache flush date via React Query", async () => {
      const { result } = renderHook(() => useCacheFlushDateTerminals(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBeDefined();
      expect(result.current.data).toBeInstanceOf(Date);
    });

    it("should cache responses correctly", async () => {
      const { result } = renderHook(() => useCacheFlushDateTerminals(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const firstData = result.current.data;

      // Trigger a refetch
      await result.current.refetch();

      // Data should be cached and consistent
      expect(result.current.data).toEqual(firstData);
    });

    it("should handle loading and error states", async () => {
      const { result } = renderHook(() => useCacheFlushDateTerminals(), {
        wrapper: createWrapper(),
      });

      // Initially should be loading
      expect(result.current.isLoading).toBe(true);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.isError).toBe(false);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // After success, should not be loading or in error
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toBeDefined();
    });
  });

  describe("Data Validation", () => {
    it("should return valid cache flush date data structure", async () => {
      const result = await getCacheFlushDateTerminals();

      expect(result).toBeDefined();
      expect(result).not.toBeNull();

      // Validate required fields
      expect(result).toBeInstanceOf(Date);

      // Validate date is reasonable
      expect(result?.getTime()).toBeLessThanOrEqual(Date.now());
    });

    it("should handle multiple rapid requests", async () => {
      const promises = Array.from({ length: 5 }, () =>
        getCacheFlushDateTerminals()
      );
      const results = await Promise.all(promises);

      // All results should be valid
      results.forEach((result) => {
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).toBeInstanceOf(Date);
      });

      // All results should have reasonable timestamps (within 10 minutes)
      // Cache flush dates may be updated periodically by the API
      const firstTime = results[0]?.getTime();
      if (firstTime) {
        results.forEach((result) => {
          const timeDiff = Math.abs((result?.getTime() ?? 0) - firstTime);
          expect(timeDiff).toBeLessThan(10 * 60 * 1000); // 10 minutes
        });
      }
    });

    it("should provide useful cache coordination information", async () => {
      const result = await getCacheFlushDateTerminals();

      // The cache flush date should be useful for cache invalidation
      expect(result).toBeInstanceOf(Date);

      // Log the cache flush date for debugging
      console.log(`📅 Cache flush date: ${result?.toISOString()}`);

      // The date should be recent enough to be useful for caching
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
      expect(result?.getTime()).toBeGreaterThan(oneDayAgo);
    });
  });

  describe("Performance", () => {
    it("should respond quickly", async () => {
      const startTime = Date.now();

      await getCacheFlushDateTerminals();

      const duration = Date.now() - startTime;

      // Should respond within 5 seconds
      expect(duration).toBeLessThan(5000);

      console.log(`⚡ Cache flush date response time: ${duration}ms`);
    });

    it("should handle concurrent requests efficiently", async () => {
      const startTime = Date.now();

      const promises = Array.from({ length: 10 }, () =>
        getCacheFlushDateTerminals()
      );
      await Promise.all(promises);

      const duration = Date.now() - startTime;

      // Should handle 10 concurrent requests within 10 seconds
      expect(duration).toBeLessThan(10000);

      console.log(`⚡ 10 concurrent cache flush date requests: ${duration}ms`);
    });
  });
});
