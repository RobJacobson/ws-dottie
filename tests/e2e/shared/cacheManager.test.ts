/**
 * @fileoverview Cache Manager Tests
 *
 * This module contains tests for the cache manager functionality that handles
 * cache flush date polling and invalidation for WSF APIs.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  shouldUseCacheFlushDate,
  useCacheFlushDateQuery,
  useCacheInvalidation,
} from "@/shared/cache/cacheManager";

// Mock fetchDottie to avoid actual API calls
vi.mock("@/shared/fetching", () => ({
  fetchDottie: vi.fn(),
}));

// Mock apis to avoid circular dependencies
vi.mock("@/apis/shared/apis", () => ({
  apis: {
    "wsf-vessels": {
      name: "wsf-vessels",
      baseUrl: "https://www.wsdot.wa.gov/ferries/api/vessels/rest",
    },
    "wsf-fares": {
      name: "wsf-fares",
      baseUrl: "https://www.wsdot.wa.gov/ferries/api/fares/rest",
    },
    "wsf-schedule": {
      name: "wsf-schedule",
      baseUrl: "https://www.wsdot.wa.gov/ferries/api/schedule/rest",
    },
    "wsf-terminals": {
      name: "wsf-terminals",
      baseUrl: "https://www.wsdot.wa.gov/ferries/api/terminals/rest",
    },
  },
}));

describe("Cache Manager", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  describe("shouldUseCacheFlushDate", () => {
    it("should return true for WSF APIs with STATIC cache strategy", () => {
      const apiName = "wsf-vessels";
      const cacheStrategy = "STATIC";
      expect(shouldUseCacheFlushDate(apiName, cacheStrategy)).toBe(true);
    });

    it("should return false for WSF APIs with non-STATIC cache strategy", () => {
      const apiName = "wsf-vessels";
      const cacheStrategy = "REALTIME";
      expect(shouldUseCacheFlushDate(apiName, cacheStrategy)).toBe(false);
    });

    it("should return false for non-WSF APIs", () => {
      const apiName = "wsdot-weather-stations";
      const cacheStrategy = "STATIC";
      expect(shouldUseCacheFlushDate(apiName, cacheStrategy)).toBe(false);
    });
  });

  describe("useCacheFlushDateQuery", () => {
    it("should return query result for valid WSF API", async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockFetchDottie = vi.mocked(
        await import("@/shared/fetching")
      ).fetchDottie;
      mockFetchDottie.mockResolvedValue("2023-01-01T00:00:00.000Z");

      const wrapper = ({ children }: { children: React.ReactNode }) => {
        return React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children
        );
      };

      const { result } = renderHook(
        () => useCacheFlushDateQuery("wsf-vessels"),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBeDefined();
    });

    it("should return empty result for invalid API", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => {
        return React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children
        );
      };

      const { result } = renderHook(
        () => useCacheFlushDateQuery("invalid-api"),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toBe("");
    });
  });

  describe("useCacheInvalidation", () => {
    it("should invalidate queries when flush date changes", async () => {
      const invalidateQueries = vi.spyOn(queryClient, "invalidateQueries");

      const flushDateQuery = {
        data: "2023-01-01T00:00:00.000Z",
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => {
        return React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children
        );
      };

      const { rerender } = renderHook(
        () =>
          useCacheInvalidation(
            "test-endpoint",
            flushDateQuery as UseQueryResult<string, Error>
          ),
        { wrapper }
      );

      // Initial render shouldn't invalidate
      expect(invalidateQueries).not.toHaveBeenCalled();

      // Update flush date
      const updatedFlushDateQuery = {
        data: "2023-01-02T00:00:00.000Z",
      };

      rerender(() =>
        useCacheInvalidation(
          "test-endpoint",
          updatedFlushDateQuery as UseQueryResult<string, Error>
        )
      );

      // Should invalidate on flush date change
      expect(invalidateQueries).toHaveBeenCalledWith({
        queryKey: ["test-endpoint"],
      });
    });
  });
});
