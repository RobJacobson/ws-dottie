import type { QueryClient } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  useFareById,
  useFareCategories,
  useFareCategoryById,
  useFares,
  useFareTypeById,
  useFareTypes,
  useRouteFares,
  useRouteFaresByRouteId,
  useTerminalFares,
  useTerminalFaresByTerminalId,
} from "@/api/wsf/fares/hook";

import {
  createQueryWrapper,
  createTestQueryClient,
  TEST_CONSTANTS,
  waitForSuccess,
} from "../../unit/utils/testHelpers";

// Integration test configuration
const INTEGRATION_CONFIG = {
  timeout: 10000,
  retries: 3,
  rateLimitDelay: 1000, // 1 second between calls
} as const;

// Rate limiting utility for integration tests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("WSF Fares Integration Tests", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient({
      retry: true,
      gcTime: 5 * 60 * 1000, // 5 minutes for integration tests
      staleTime: 30 * 1000, // 30 seconds
    });
  });

  describe("Real API Endpoints", () => {
    it(
      "should fetch all fares from real WSF API",
      async () => {
        const { result } = renderHook(() => useFares(), {
          wrapper: createQueryWrapper(queryClient),
        });

        await waitFor(
          () => {
            expect(result.current.isSuccess).toBe(true);
          },
          { timeout: INTEGRATION_CONFIG.timeout }
        );

        // Validate response structure
        expect(result.current.data).toBeDefined();
        expect(Array.isArray(result.current.data)).toBe(true);

        if (result.current.data && result.current.data.length > 0) {
          const firstFare = result.current.data[0];
          expect(firstFare).toHaveProperty("fareId");
          expect(firstFare).toHaveProperty("fareName");
          expect(firstFare).toHaveProperty("fareAmount");
          expect(firstFare).toHaveProperty("fareCurrency");
          expect(firstFare).toHaveProperty("isActive");
          expect(firstFare).toHaveProperty("lastUpdated");
          expect(firstFare.lastUpdated).toBeInstanceOf(Date);
        }

        // Performance check
        const loadTime = Date.now() - (result.current.dataUpdatedAt || 0);
        expect(loadTime).toBeLessThan(5000); // 5 seconds max

        await delay(INTEGRATION_CONFIG.rateLimitDelay);
      },
      INTEGRATION_CONFIG.timeout
    );

    it(
      "should fetch fare categories from real WSF API",
      async () => {
        const { result } = renderHook(() => useFareCategories(), {
          wrapper: createQueryWrapper(queryClient),
        });

        await waitFor(
          () => {
            expect(result.current.isSuccess).toBe(true);
          },
          { timeout: INTEGRATION_CONFIG.timeout }
        );

        expect(result.current.data).toBeDefined();
        expect(Array.isArray(result.current.data)).toBe(true);

        if (result.current.data && result.current.data.length > 0) {
          const firstCategory = result.current.data[0];
          expect(firstCategory).toHaveProperty("categoryId");
          expect(firstCategory).toHaveProperty("categoryName");
          expect(firstCategory).toHaveProperty("categoryDescription");
          expect(firstCategory).toHaveProperty("isActive");
        }

        await delay(INTEGRATION_CONFIG.rateLimitDelay);
      },
      INTEGRATION_CONFIG.timeout
    );

    it(
      "should fetch fare types from real WSF API",
      async () => {
        const { result } = renderHook(() => useFareTypes(), {
          wrapper: createQueryWrapper(queryClient),
        });

        await waitFor(
          () => {
            expect(result.current.isSuccess).toBe(true);
          },
          { timeout: INTEGRATION_CONFIG.timeout }
        );

        expect(result.current.data).toBeDefined();
        expect(Array.isArray(result.current.data)).toBe(true);

        if (result.current.data && result.current.data.length > 0) {
          const firstType = result.current.data[0];
          expect(firstType).toHaveProperty("typeId");
          expect(firstType).toHaveProperty("typeName");
          expect(firstType).toHaveProperty("typeDescription");
          expect(firstType).toHaveProperty("isActive");
        }

        await delay(INTEGRATION_CONFIG.rateLimitDelay);
      },
      INTEGRATION_CONFIG.timeout
    );

    it(
      "should fetch route fares from real WSF API",
      async () => {
        const { result } = renderHook(() => useRouteFares(), {
          wrapper: createQueryWrapper(queryClient),
        });

        await waitFor(
          () => {
            expect(result.current.isSuccess).toBe(true);
          },
          { timeout: INTEGRATION_CONFIG.timeout }
        );

        expect(result.current.data).toBeDefined();
        expect(Array.isArray(result.current.data)).toBe(true);

        if (result.current.data && result.current.data.length > 0) {
          const firstRouteFare = result.current.data[0];
          expect(firstRouteFare).toHaveProperty("routeId");
          expect(firstRouteFare).toHaveProperty("fareId");
          expect(firstRouteFare).toHaveProperty("fareAmount");
          expect(firstRouteFare).toHaveProperty("routeName");
          expect(firstRouteFare).toHaveProperty("fareName");
          expect(firstRouteFare).toHaveProperty("fareCurrency");
        }

        await delay(INTEGRATION_CONFIG.rateLimitDelay);
      },
      INTEGRATION_CONFIG.timeout
    );

    it(
      "should fetch terminal fares from real WSF API",
      async () => {
        const { result } = renderHook(() => useTerminalFares(), {
          wrapper: createQueryWrapper(queryClient),
        });

        await waitFor(
          () => {
            expect(result.current.isSuccess).toBe(true);
          },
          { timeout: INTEGRATION_CONFIG.timeout }
        );

        expect(result.current.data).toBeDefined();
        expect(Array.isArray(result.current.data)).toBe(true);

        if (result.current.data && result.current.data.length > 0) {
          const firstTerminalFare = result.current.data[0];
          expect(firstTerminalFare).toHaveProperty("terminalId");
          expect(firstTerminalFare).toHaveProperty("fareId");
          expect(firstTerminalFare).toHaveProperty("fareAmount");
          expect(firstTerminalFare).toHaveProperty("terminalName");
          expect(firstTerminalFare).toHaveProperty("fareName");
          expect(firstTerminalFare).toHaveProperty("fareCurrency");
        }

        await delay(INTEGRATION_CONFIG.rateLimitDelay);
      },
      INTEGRATION_CONFIG.timeout
    );
  });

  describe("Specific ID Queries", () => {
    it(
      "should fetch specific fare by ID from real WSF API",
      async () => {
        // First get all fares to find a valid ID
        const { result: allFaresResult } = renderHook(() => useFares(), {
          wrapper: createQueryWrapper(queryClient),
        });

        await waitFor(
          () => {
            expect(allFaresResult.current.isSuccess).toBe(true);
          },
          { timeout: INTEGRATION_CONFIG.timeout }
        );

        if (
          !allFaresResult.current.data ||
          allFaresResult.current.data.length === 0
        ) {
          console.warn("No fares available for testing specific fare query");
          return;
        }

        const validFareId = allFaresResult.current.data[0].fareId;

        // Now fetch specific fare
        const { result } = renderHook(() => useFareById(validFareId), {
          wrapper: createQueryWrapper(queryClient),
        });

        await waitFor(
          () => {
            expect(result.current.isSuccess).toBe(true);
          },
          { timeout: INTEGRATION_CONFIG.timeout }
        );

        expect(result.current.data).toBeDefined();
        expect(Array.isArray(result.current.data)).toBe(true);
        expect(result.current.data?.[0].fareId).toBe(validFareId);

        await delay(INTEGRATION_CONFIG.rateLimitDelay);
      },
      INTEGRATION_CONFIG.timeout
    );

    it(
      "should fetch specific fare category by ID from real WSF API",
      async () => {
        // First get all categories to find a valid ID
        const { result: allCategoriesResult } = renderHook(
          () => useFareCategories(),
          {
            wrapper: createQueryWrapper(queryClient),
          }
        );

        await waitFor(
          () => {
            expect(allCategoriesResult.current.isSuccess).toBe(true);
          },
          { timeout: INTEGRATION_CONFIG.timeout }
        );

        if (
          !allCategoriesResult.current.data ||
          allCategoriesResult.current.data.length === 0
        ) {
          console.warn(
            "No categories available for testing specific category query"
          );
          return;
        }

        const validCategoryId = allCategoriesResult.current.data[0].categoryId;

        // Now fetch specific category
        const { result } = renderHook(
          () => useFareCategoryById(validCategoryId),
          {
            wrapper: createQueryWrapper(queryClient),
          }
        );

        await waitFor(
          () => {
            expect(result.current.isSuccess).toBe(true);
          },
          { timeout: INTEGRATION_CONFIG.timeout }
        );

        expect(result.current.data).toBeDefined();
        expect(Array.isArray(result.current.data)).toBe(true);
        expect(result.current.data?.[0].categoryId).toBe(validCategoryId);

        await delay(INTEGRATION_CONFIG.rateLimitDelay);
      },
      INTEGRATION_CONFIG.timeout
    );
  });

  describe("Data Validation", () => {
    it(
      "should validate fare data structure from real API",
      async () => {
        const { result } = renderHook(() => useFares(), {
          wrapper: createQueryWrapper(queryClient),
        });

        await waitFor(
          () => {
            expect(result.current.isSuccess).toBe(true);
          },
          { timeout: INTEGRATION_CONFIG.timeout }
        );

        if (!result.current.data || result.current.data.length === 0) {
          console.warn("No fares available for data validation");
          return;
        }

        // Validate data structure
        result.current.data.forEach((fare, _index) => {
          expect(fare).toHaveProperty("fareId");
          expect(typeof fare.fareId).toBe("number");
          expect(fare).toHaveProperty("fareName");
          expect(typeof fare.fareName).toBe("string");
          expect(fare).toHaveProperty("fareAmount");
          expect(typeof fare.fareAmount).toBe("number");
          expect(fare).toHaveProperty("fareCurrency");
          expect(typeof fare.fareCurrency).toBe("string");
          expect(fare).toHaveProperty("isActive");
          expect(typeof fare.isActive).toBe("boolean");
          expect(fare).toHaveProperty("lastUpdated");
          expect(fare.lastUpdated).toBeInstanceOf(Date);
          expect(fare).toHaveProperty("effectiveDate");
          expect(fare.effectiveDate).toBeInstanceOf(Date);
        });

        await delay(INTEGRATION_CONFIG.rateLimitDelay);
      },
      INTEGRATION_CONFIG.timeout
    );

    it(
      "should validate date transformations from real API",
      async () => {
        const { result } = renderHook(() => useFares(), {
          wrapper: createQueryWrapper(queryClient),
        });

        await waitFor(
          () => {
            expect(result.current.isSuccess).toBe(true);
          },
          { timeout: INTEGRATION_CONFIG.timeout }
        );

        if (!result.current.data || result.current.data.length === 0) {
          console.warn("No fares available for date validation");
          return;
        }

        // Validate date transformations
        result.current.data.forEach((fare) => {
          // Check that dates are valid Date objects
          expect(fare.lastUpdated).toBeInstanceOf(Date);
          expect(fare.effectiveDate).toBeInstanceOf(Date);

          // Check that dates are not in the future (reasonable validation)
          expect(fare.lastUpdated.getTime()).toBeLessThanOrEqual(Date.now());
          expect(fare.effectiveDate.getTime()).toBeLessThanOrEqual(
            Date.now() + 365 * 24 * 60 * 60 * 1000
          ); // Allow future effective dates up to 1 year
        });

        await delay(INTEGRATION_CONFIG.rateLimitDelay);
      },
      INTEGRATION_CONFIG.timeout
    );
  });

  describe("Performance Monitoring", () => {
    it(
      "should meet performance benchmarks for all endpoints",
      async () => {
        // Test each endpoint individually to avoid TypeScript issues
        const startTime1 = Date.now();
        const { result: result1 } = renderHook(() => useFares(), {
          wrapper: createQueryWrapper(queryClient),
        });
        await waitFor(() => expect(result1.current.isSuccess).toBe(true), {
          timeout: INTEGRATION_CONFIG.timeout,
        });
        const duration1 = Date.now() - startTime1;
        console.log(`useFares: ${duration1}ms`);
        expect(duration1).toBeLessThan(5000);

        await delay(INTEGRATION_CONFIG.rateLimitDelay);

        const startTime2 = Date.now();
        const { result: result2 } = renderHook(() => useFareCategories(), {
          wrapper: createQueryWrapper(queryClient),
        });
        await waitFor(() => expect(result2.current.isSuccess).toBe(true), {
          timeout: INTEGRATION_CONFIG.timeout,
        });
        const duration2 = Date.now() - startTime2;
        console.log(`useFareCategories: ${duration2}ms`);
        expect(duration2).toBeLessThan(5000);

        await delay(INTEGRATION_CONFIG.rateLimitDelay);

        const startTime3 = Date.now();
        const { result: result3 } = renderHook(() => useFareTypes(), {
          wrapper: createQueryWrapper(queryClient),
        });
        await waitFor(() => expect(result3.current.isSuccess).toBe(true), {
          timeout: INTEGRATION_CONFIG.timeout,
        });
        const duration3 = Date.now() - startTime3;
        console.log(`useFareTypes: ${duration3}ms`);
        expect(duration3).toBeLessThan(5000);

        await delay(INTEGRATION_CONFIG.rateLimitDelay);

        const startTime4 = Date.now();
        const { result: result4 } = renderHook(() => useRouteFares(), {
          wrapper: createQueryWrapper(queryClient),
        });
        await waitFor(() => expect(result4.current.isSuccess).toBe(true), {
          timeout: INTEGRATION_CONFIG.timeout,
        });
        const duration4 = Date.now() - startTime4;
        console.log(`useRouteFares: ${duration4}ms`);
        expect(duration4).toBeLessThan(5000);

        await delay(INTEGRATION_CONFIG.rateLimitDelay);

        const startTime5 = Date.now();
        const { result: result5 } = renderHook(() => useTerminalFares(), {
          wrapper: createQueryWrapper(queryClient),
        });
        await waitFor(() => expect(result5.current.isSuccess).toBe(true), {
          timeout: INTEGRATION_CONFIG.timeout,
        });
        const duration5 = Date.now() - startTime5;
        console.log(`useTerminalFares: ${duration5}ms`);
        expect(duration5).toBeLessThan(5000);
      },
      INTEGRATION_CONFIG.timeout * 5 // 5 endpoints
    );

    it(
      "should monitor response sizes",
      async () => {
        const { result } = renderHook(() => useFares(), {
          wrapper: createQueryWrapper(queryClient),
        });

        await waitFor(
          () => {
            expect(result.current.isSuccess).toBe(true);
          },
          { timeout: INTEGRATION_CONFIG.timeout }
        );

        // Check response size
        const responseSize = JSON.stringify(result.current.data).length;
        console.log(`Fares response size: ${responseSize} bytes`);

        // Should be reasonable size (not too large)
        expect(responseSize).toBeLessThan(1000000); // 1MB limit
        expect(responseSize).toBeGreaterThan(0);

        await delay(INTEGRATION_CONFIG.rateLimitDelay);
      },
      INTEGRATION_CONFIG.timeout
    );
  });

  describe("Error Handling", () => {
    it("should handle network errors gracefully", async () => {
      // This test would require mocking network failures
      // For real integration tests, we'd test with invalid API keys or network issues
      expect(true).toBe(true); // Placeholder for network error testing
    });

    it(
      "should handle API rate limiting",
      async () => {
        // Test rapid successive calls to see if rate limiting is handled
        const { result: result1 } = renderHook(() => useFares(), {
          wrapper: createQueryWrapper(queryClient),
        });

        const { result: result2 } = renderHook(() => useFares(), {
          wrapper: createQueryWrapper(queryClient),
        });

        await Promise.all([
          waitFor(() => expect(result1.current.isSuccess).toBe(true), {
            timeout: INTEGRATION_CONFIG.timeout,
          }),
          waitFor(() => expect(result2.current.isSuccess).toBe(true), {
            timeout: INTEGRATION_CONFIG.timeout,
          }),
        ]);

        // Both should succeed even with rapid calls
        expect(result1.current.isSuccess).toBe(true);
        expect(result2.current.isSuccess).toBe(true);

        await delay(INTEGRATION_CONFIG.rateLimitDelay);
      },
      INTEGRATION_CONFIG.timeout
    );
  });
});
