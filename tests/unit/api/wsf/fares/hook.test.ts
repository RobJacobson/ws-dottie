import type { QueryClient } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import * as faresApi from "@/api/wsf/fares/api";
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
  createMockData,
  createQueryWrapper,
  createTestQueryClient,
  expectMockCalledWith,
  findQueryByKey,
  resetTestState,
  TEST_CONSTANTS,
  waitForError,
  waitForSuccess,
} from "../../../utils/testHelpers";

// Mock the API functions
vi.mock("@/api/wsf/fares/api");

const mockFaresApi = vi.mocked(faresApi);

describe("WSF Fares Hooks", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    resetTestState();
    queryClient = createTestQueryClient();
  });

  describe("Fares Hooks", () => {
    it("should call useFares successfully", async () => {
      const mockFares = [createMockData.fare()];
      mockFaresApi.getFares.mockResolvedValue(mockFares);

      const { result } = renderHook(() => useFares(), {
        wrapper: createQueryWrapper(queryClient),
      });

      await waitForSuccess(result);

      expectMockCalledWith(mockFaresApi.getFares, []);
      expect(result.current.data).toEqual(mockFares);
    });

    it("should call useFareById with correct parameters", async () => {
      const mockFares = [createMockData.fare()];
      mockFaresApi.getFareById.mockResolvedValue(mockFares);

      const { result } = renderHook(() => useFareById(TEST_CONSTANTS.FARE_ID), {
        wrapper: createQueryWrapper(queryClient),
      });

      await waitForSuccess(result);

      expectMockCalledWith(mockFaresApi.getFareById, [TEST_CONSTANTS.FARE_ID]);
      expect(result.current.data).toEqual(mockFares);
    });

    it("should handle error states gracefully", async () => {
      mockFaresApi.getFares.mockRejectedValue(new Error("API Error"));

      const { result } = renderHook(() => useFares(), {
        wrapper: createQueryWrapper(queryClient),
      });

      // Wait for the query to settle (either success or error)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // The query should not be in a success state when API rejects
      expect(result.current.isSuccess).toBe(false);
      // Data should be undefined when there's an error
      expect(result.current.data).toBeUndefined();
    });
  });

  describe("Fare Categories Hooks", () => {
    it("should call useFareCategories successfully", async () => {
      const mockCategories = [
        {
          categoryId: TEST_CONSTANTS.CATEGORY_ID,
          categoryName: "Test Category",
          categoryDescription: "Test category description",
          categoryType: "Vehicle",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockFaresApi.getFareCategories.mockResolvedValue(mockCategories);

      const { result } = renderHook(() => useFareCategories(), {
        wrapper: createQueryWrapper(queryClient),
      });

      await waitForSuccess(result);

      expectMockCalledWith(mockFaresApi.getFareCategories, []);
      expect(result.current.data).toEqual(mockCategories);
    });

    it("should call useFareCategoryById with correct parameters", async () => {
      const mockCategories = [
        {
          categoryId: TEST_CONSTANTS.CATEGORY_ID,
          categoryName: "Test Category",
          categoryDescription: "Test category description",
          categoryType: "Vehicle",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockFaresApi.getFareCategoryById.mockResolvedValue(mockCategories);

      const { result } = renderHook(
        () => useFareCategoryById(TEST_CONSTANTS.CATEGORY_ID),
        {
          wrapper: createQueryWrapper(queryClient),
        }
      );

      await waitForSuccess(result);

      expectMockCalledWith(mockFaresApi.getFareCategoryById, [
        TEST_CONSTANTS.CATEGORY_ID,
      ]);
      expect(result.current.data).toEqual(mockCategories);
    });
  });

  describe("Fare Types Hooks", () => {
    it("should call useFareTypes successfully", async () => {
      const mockTypes = [
        {
          typeId: TEST_CONSTANTS.TYPE_ID,
          typeName: "Test Type",
          typeDescription: "Test type description",
          typeCategory: "Vehicle",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockFaresApi.getFareTypes.mockResolvedValue(mockTypes);

      const { result } = renderHook(() => useFareTypes(), {
        wrapper: createQueryWrapper(queryClient),
      });

      await waitForSuccess(result);

      expectMockCalledWith(mockFaresApi.getFareTypes, []);
      expect(result.current.data).toEqual(mockTypes);
    });

    it("should call useFareTypeById with correct parameters", async () => {
      const mockTypes = [
        {
          typeId: TEST_CONSTANTS.TYPE_ID,
          typeName: "Test Type",
          typeDescription: "Test type description",
          typeCategory: "Vehicle",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockFaresApi.getFareTypeById.mockResolvedValue(mockTypes);

      const { result } = renderHook(
        () => useFareTypeById(TEST_CONSTANTS.TYPE_ID),
        {
          wrapper: createQueryWrapper(queryClient),
        }
      );

      await waitForSuccess(result);

      expectMockCalledWith(mockFaresApi.getFareTypeById, [
        TEST_CONSTANTS.TYPE_ID,
      ]);
      expect(result.current.data).toEqual(mockTypes);
    });
  });

  describe("Route Fares Hooks", () => {
    it("should call useRouteFares successfully", async () => {
      const mockRouteFares = [
        {
          routeId: TEST_CONSTANTS.ROUTE_ID,
          fareId: TEST_CONSTANTS.FARE_ID,
          fareAmount: 10.5,
          routeName: "Test Route",
          fareName: "Test Fare",
          fareCurrency: "USD",
          isActive: true,
          lastUpdated: new Date(),
          effectiveDate: new Date(),
        },
      ];
      mockFaresApi.getRouteFares.mockResolvedValue(mockRouteFares);

      const { result } = renderHook(() => useRouteFares(), {
        wrapper: createQueryWrapper(queryClient),
      });

      await waitForSuccess(result);

      expectMockCalledWith(mockFaresApi.getRouteFares, []);
      expect(result.current.data).toEqual(mockRouteFares);
    });

    it("should call useRouteFaresByRouteId with correct parameters", async () => {
      const mockRouteFares = [
        {
          routeId: TEST_CONSTANTS.ROUTE_ID,
          fareId: TEST_CONSTANTS.FARE_ID,
          fareAmount: 10.5,
          routeName: "Test Route",
          fareName: "Test Fare",
          fareCurrency: "USD",
          isActive: true,
          lastUpdated: new Date(),
          effectiveDate: new Date(),
        },
      ];
      mockFaresApi.getRouteFaresByRouteId.mockResolvedValue(mockRouteFares);

      const { result } = renderHook(
        () => useRouteFaresByRouteId(TEST_CONSTANTS.ROUTE_ID),
        {
          wrapper: createQueryWrapper(queryClient),
        }
      );

      await waitForSuccess(result);

      expectMockCalledWith(mockFaresApi.getRouteFaresByRouteId, [
        TEST_CONSTANTS.ROUTE_ID,
      ]);
      expect(result.current.data).toEqual(mockRouteFares);
    });

    it("should validate query key structure for route fares", async () => {
      const mockRouteFares = [
        {
          routeId: TEST_CONSTANTS.ROUTE_ID,
          fareId: TEST_CONSTANTS.FARE_ID,
          fareAmount: 10.5,
          routeName: "Test Route",
          fareName: "Test Fare",
          fareCurrency: "USD",
          isActive: true,
          lastUpdated: new Date(),
          effectiveDate: new Date(),
        },
      ];
      mockFaresApi.getRouteFaresByRouteId.mockResolvedValue(mockRouteFares);

      const { result } = renderHook(
        () => useRouteFaresByRouteId(TEST_CONSTANTS.ROUTE_ID),
        {
          wrapper: createQueryWrapper(queryClient),
        }
      );

      await waitForSuccess(result);

      // Verify the query key structure
      const routeFaresQuery = findQueryByKey(
        queryClient,
        (key) =>
          key[0] === "fares" && key[1] === "routes" && key[2] === "byRouteId"
      );
      expect(routeFaresQuery).toBeDefined();
      expect(routeFaresQuery?.queryKey).toEqual([
        "fares",
        "routes",
        "byRouteId",
        TEST_CONSTANTS.ROUTE_ID,
      ]);
    });
  });

  describe("Terminal Fares Hooks", () => {
    it("should call useTerminalFares successfully", async () => {
      const mockTerminalFares = [
        {
          terminalId: TEST_CONSTANTS.TERMINAL_ID,
          fareId: TEST_CONSTANTS.FARE_ID,
          fareAmount: 10.5,
          terminalName: "Test Terminal",
          fareName: "Test Fare",
          fareCurrency: "USD",
          isActive: true,
          lastUpdated: new Date(),
          effectiveDate: new Date(),
        },
      ];
      mockFaresApi.getTerminalFares.mockResolvedValue(mockTerminalFares);

      const { result } = renderHook(() => useTerminalFares(), {
        wrapper: createQueryWrapper(queryClient),
      });

      await waitForSuccess(result);

      expectMockCalledWith(mockFaresApi.getTerminalFares, []);
      expect(result.current.data).toEqual(mockTerminalFares);
    });

    it("should call useTerminalFaresByTerminalId with correct parameters", async () => {
      const mockTerminalFares = [
        {
          terminalId: TEST_CONSTANTS.TERMINAL_ID,
          fareId: TEST_CONSTANTS.FARE_ID,
          fareAmount: 10.5,
          terminalName: "Test Terminal",
          fareName: "Test Fare",
          fareCurrency: "USD",
          isActive: true,
          lastUpdated: new Date(),
          effectiveDate: new Date(),
        },
      ];
      mockFaresApi.getTerminalFaresByTerminalId.mockResolvedValue(
        mockTerminalFares
      );

      const { result } = renderHook(
        () => useTerminalFaresByTerminalId(TEST_CONSTANTS.TERMINAL_ID),
        {
          wrapper: createQueryWrapper(queryClient),
        }
      );

      await waitForSuccess(result);

      expectMockCalledWith(mockFaresApi.getTerminalFaresByTerminalId, [
        TEST_CONSTANTS.TERMINAL_ID,
      ]);
      expect(result.current.data).toEqual(mockTerminalFares);
    });

    it("should validate query key structure for terminal fares", async () => {
      const mockTerminalFares = [
        {
          terminalId: TEST_CONSTANTS.TERMINAL_ID,
          fareId: TEST_CONSTANTS.FARE_ID,
          fareAmount: 10.5,
          terminalName: "Test Terminal",
          fareName: "Test Fare",
          fareCurrency: "USD",
          isActive: true,
          lastUpdated: new Date(),
          effectiveDate: new Date(),
        },
      ];
      mockFaresApi.getTerminalFaresByTerminalId.mockResolvedValue(
        mockTerminalFares
      );

      const { result } = renderHook(
        () => useTerminalFaresByTerminalId(TEST_CONSTANTS.TERMINAL_ID),
        {
          wrapper: createQueryWrapper(queryClient),
        }
      );

      await waitForSuccess(result);

      // Verify the query key structure
      const terminalFaresQuery = findQueryByKey(
        queryClient,
        (key) =>
          key[0] === "fares" &&
          key[1] === "terminals" &&
          key[2] === "byTerminalId"
      );
      expect(terminalFaresQuery).toBeDefined();
      expect(terminalFaresQuery?.queryKey).toEqual([
        "fares",
        "terminals",
        "byTerminalId",
        TEST_CONSTANTS.TERMINAL_ID,
      ]);
    });
  });

  describe("Advanced Hook Behavior", () => {
    it("should handle conditional queries with valid IDs", async () => {
      const mockFares = [createMockData.fare()];
      mockFaresApi.getFareById.mockResolvedValue(mockFares);

      // Test with valid ID
      const { result: validResult } = renderHook(
        () => useFareById(TEST_CONSTANTS.FARE_ID),
        {
          wrapper: createQueryWrapper(queryClient),
        }
      );
      expect(validResult.current.isLoading).toBe(true);

      await waitForSuccess(validResult);

      // Test with invalid ID (0)
      const { result: invalidResult } = renderHook(() => useFareById(0), {
        wrapper: createQueryWrapper(queryClient),
      });
      expect(invalidResult.current.isLoading).toBe(false);
    });

    it("should handle conditional queries with null/undefined IDs", async () => {
      // Test with null ID
      const { result: nullResult } = renderHook(
        () => useFareById(null as any),
        {
          wrapper: createQueryWrapper(queryClient),
        }
      );
      expect(nullResult.current.isLoading).toBe(false);

      // Test with undefined ID
      const { result: undefinedResult } = renderHook(
        () => useFareById(undefined as any),
        {
          wrapper: createQueryWrapper(queryClient),
        }
      );
      expect(undefinedResult.current.isLoading).toBe(false);
    });

    it("should handle disabled queries", async () => {
      const { result } = renderHook(() => useFares(), {
        wrapper: createQueryWrapper(queryClient),
      });

      // Query should be enabled by default
      expect(result.current.isLoading).toBe(true);
    });

    it("should validate caching behavior", async () => {
      const mockFares = [createMockData.fare()];
      mockFaresApi.getFares.mockResolvedValue(mockFares);

      // First call
      const { result: result1 } = renderHook(() => useFares(), {
        wrapper: createQueryWrapper(queryClient),
      });

      await waitForSuccess(result1);
      const firstCallTime = result1.current.dataUpdatedAt;

      // Second call (should use cache)
      const { result: result2 } = renderHook(() => useFares(), {
        wrapper: createQueryWrapper(queryClient),
      });

      await waitForSuccess(result2);

      // Should use cached data
      expect(result2.current.dataUpdatedAt).toBe(firstCallTime);
      expect(result2.current.data).toEqual(result1.current.data);
    });

    it("should handle empty responses gracefully", async () => {
      mockFaresApi.getFares.mockResolvedValue([]);

      const { result } = renderHook(() => useFares(), {
        wrapper: createQueryWrapper(queryClient),
      });

      await waitForSuccess(result);

      expect(result.current.data).toEqual([]);
      expect(result.current.isError).toBe(false);
    });

    it("should handle large datasets", async () => {
      const largeDataset = Array.from({ length: 100 }, (_, i) =>
        createMockData.fare({ fareId: i + 1, fareName: `Fare ${i + 1}` })
      );
      mockFaresApi.getFares.mockResolvedValue(largeDataset);

      const { result } = renderHook(() => useFares(), {
        wrapper: createQueryWrapper(queryClient),
      });

      await waitForSuccess(result);

      expect(result.current.data).toHaveLength(100);
      expect(result.current.data?.[0].fareId).toBe(1);
      expect(result.current.data?.[99].fareId).toBe(100);
    });
  });

  describe("Query Key Validation", () => {
    it("should generate correct query keys for useFares", async () => {
      const mockFares = [createMockData.fare()];
      mockFaresApi.getFares.mockResolvedValue(mockFares);

      const { result } = renderHook(() => useFares(), {
        wrapper: createQueryWrapper(queryClient),
      });

      await waitForSuccess(result);

      // Verify the query key structure
      const faresQuery = findQueryByKey(
        queryClient,
        (key) => key[0] === "fares"
      );
      expect(faresQuery).toBeDefined();
      expect(faresQuery?.queryKey).toEqual(["fares"]);
    });

    it("should generate correct query keys for useFareById", async () => {
      const mockFares = [createMockData.fare()];
      mockFaresApi.getFareById.mockResolvedValue(mockFares);

      const { result } = renderHook(() => useFareById(TEST_CONSTANTS.FARE_ID), {
        wrapper: createQueryWrapper(queryClient),
      });

      await waitForSuccess(result);

      // Verify the query key structure
      const fareByIdQuery = findQueryByKey(
        queryClient,
        (key) => key[0] === "fares" && key[1] === "byId"
      );
      expect(fareByIdQuery).toBeDefined();
      expect(fareByIdQuery?.queryKey).toEqual([
        "fares",
        "byId",
        TEST_CONSTANTS.FARE_ID,
      ]);
    });

    it("should generate correct query keys for useFareCategories", async () => {
      const mockCategories = [
        {
          categoryId: TEST_CONSTANTS.CATEGORY_ID,
          categoryName: "Test Category",
          categoryDescription: "Test category description",
          categoryType: "Vehicle",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockFaresApi.getFareCategories.mockResolvedValue(mockCategories);

      const { result } = renderHook(() => useFareCategories(), {
        wrapper: createQueryWrapper(queryClient),
      });

      await waitForSuccess(result);

      // Verify the query key structure
      const categoriesQuery = findQueryByKey(
        queryClient,
        (key) => key[0] === "fares" && key[1] === "categories"
      );
      expect(categoriesQuery).toBeDefined();
      expect(categoriesQuery?.queryKey).toEqual(["fares", "categories"]);
    });

    it("should generate correct query keys for useFareTypes", async () => {
      const mockTypes = [
        {
          typeId: TEST_CONSTANTS.TYPE_ID,
          typeName: "Test Type",
          typeDescription: "Test type description",
          typeCategory: "Vehicle",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockFaresApi.getFareTypes.mockResolvedValue(mockTypes);

      const { result } = renderHook(() => useFareTypes(), {
        wrapper: createQueryWrapper(queryClient),
      });

      await waitForSuccess(result);

      // Verify the query key structure
      const typesQuery = findQueryByKey(
        queryClient,
        (key) => key[0] === "fares" && key[1] === "types"
      );
      expect(typesQuery).toBeDefined();
      expect(typesQuery?.queryKey).toEqual(["fares", "types"]);
    });
  });

  describe("Performance and Edge Cases", () => {
    it("should handle rapid successive calls", async () => {
      const mockFares = [createMockData.fare()];
      mockFaresApi.getFares.mockResolvedValue(mockFares);

      // Make multiple rapid calls
      const results = await Promise.all(
        Array.from({ length: 5 }, () =>
          renderHook(() => useFares(), {
            wrapper: createQueryWrapper(queryClient),
          })
        )
      );

      // Wait for all to complete
      await Promise.all(results.map(({ result }) => waitForSuccess(result)));

      // Should only call API once due to React Query deduplication
      expect(mockFaresApi.getFares).toHaveBeenCalledTimes(1);
    });

    it("should handle concurrent queries with different parameters", async () => {
      const mockFare1 = [createMockData.fare({ fareId: 1 })];
      const mockFare2 = [createMockData.fare({ fareId: 2 })];

      mockFaresApi.getFareById
        .mockResolvedValueOnce(mockFare1)
        .mockResolvedValueOnce(mockFare2);

      const { result: result1 } = renderHook(() => useFareById(1), {
        wrapper: createQueryWrapper(queryClient),
      });

      const { result: result2 } = renderHook(() => useFareById(2), {
        wrapper: createQueryWrapper(queryClient),
      });

      await Promise.all([waitForSuccess(result1), waitForSuccess(result2)]);

      expect(mockFaresApi.getFareById).toHaveBeenCalledTimes(2);
      expect(result1.current.data).toEqual(mockFare1);
      expect(result2.current.data).toEqual(mockFare2);
    });

    it("should handle malformed data gracefully", async () => {
      // Mock API returning malformed data
      const malformedData = [
        {
          fareId: "invalid", // Should be number
          fareName: null, // Should be string
          fareAmount: "not a number", // Should be number
        },
      ] as any;

      mockFaresApi.getFares.mockResolvedValue(malformedData);

      const { result } = renderHook(() => useFares(), {
        wrapper: createQueryWrapper(queryClient),
      });

      await waitForSuccess(result);

      // Should still return the data as-is (transformation happens in API layer)
      expect(result.current.data).toEqual(malformedData);
      expect(result.current.isError).toBe(false);
    });
  });
});
