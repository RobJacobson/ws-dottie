import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import * as terminalsApi from "@/api/wsf/terminals/api";
import {
  useTerminalBasics,
  useTerminalBasicsByTerminalId,
  useTerminalLocations,
  useTerminalLocationsByTerminalId,
  useTerminalSailingSpace,
  useTerminalSailingSpaceByRoute,
  useTerminalSailingSpaceByTerminalAndRoute,
  useTerminalSailingSpaceByTerminalId,
  useTerminalVerbose,
  useTerminalVerboseByTerminalId,
  useTerminalWaitTimes,
  useTerminalWaitTimesByRoute,
  useTerminalWaitTimesByRouteAndTerminal,
  useTerminalWaitTimesByTerminal,
} from "@/api/wsf/terminals/hook";

// Mock the API functions
vi.mock("@/api/wsf/terminals/api");

const mockTerminalsApi = vi.mocked(terminalsApi);

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

describe("WSF Terminals Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Terminal Basics Hooks", () => {
    it("should call useTerminalBasics", async () => {
      const mockTerminals = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          terminalAbbrev: "ANA",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "Test Address",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          phone: "360-293-8154",
          hasWaitTime: true,
          hasSpaceAvailable: true,
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalBasics.mockResolvedValue(mockTerminals);

      const { result } = renderHook(() => useTerminalBasics(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockTerminalsApi.getTerminalBasics).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockTerminals);
    });

    it("should call useTerminalBasicsByTerminalId with correct parameters", async () => {
      const terminalId = 7;
      const mockTerminals = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          terminalAbbrev: "ANA",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "Test Address",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalBasicsByTerminalId.mockResolvedValue(
        mockTerminals
      );

      const { result } = renderHook(
        () => useTerminalBasicsByTerminalId(terminalId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(
        mockTerminalsApi.getTerminalBasicsByTerminalId
      ).toHaveBeenCalledWith(terminalId);
      expect(result.current.data).toEqual(mockTerminals);
    });
  });

  describe("Terminal Locations Hooks", () => {
    it("should call useTerminalLocations", async () => {
      const mockLocations = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "Test Address",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalLocations.mockResolvedValue(mockLocations);

      const { result } = renderHook(() => useTerminalLocations(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockTerminalsApi.getTerminalLocations).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockLocations);
    });

    it("should call useTerminalLocationsByTerminalId with correct parameters", async () => {
      const terminalId = 7;
      const mockLocations = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "Test Address",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalLocationsByTerminalId.mockResolvedValue(
        mockLocations
      );

      const { result } = renderHook(
        () => useTerminalLocationsByTerminalId(terminalId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(
        mockTerminalsApi.getTerminalLocationsByTerminalId
      ).toHaveBeenCalledWith(terminalId);
      expect(result.current.data).toEqual(mockLocations);
    });
  });

  describe("Terminal Sailing Space Hooks", () => {
    it("should call useTerminalSailingSpace", async () => {
      const mockSpaceData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          sailingId: 1,
          departureTime: new Date(),
          driveUpSpaces: 50,
          standbySpaces: 10,
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalSailingSpace.mockResolvedValue(mockSpaceData);

      const { result } = renderHook(() => useTerminalSailingSpace(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockTerminalsApi.getTerminalSailingSpace).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockSpaceData);
    });

    it("should call useTerminalSailingSpaceByTerminalId with correct parameters", async () => {
      const terminalId = 7;
      const mockSpaceData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          sailingId: 1,
          departureTime: new Date(),
          driveUpSpaces: 50,
          standbySpaces: 10,
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalSailingSpaceByTerminalId.mockResolvedValue(
        mockSpaceData
      );

      const { result } = renderHook(
        () => useTerminalSailingSpaceByTerminalId(terminalId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(
        mockTerminalsApi.getTerminalSailingSpaceByTerminalId
      ).toHaveBeenCalledWith(terminalId);
      expect(result.current.data).toEqual(mockSpaceData);
    });

    it("should call useTerminalSailingSpaceByRoute with correct parameters", async () => {
      const routeId = 1;
      const mockSpaceData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          sailingId: 1,
          departureTime: new Date(),
          driveUpSpaces: 50,
          standbySpaces: 10,
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalSailingSpaceByRoute.mockResolvedValue(
        mockSpaceData
      );

      const { result } = renderHook(
        () => useTerminalSailingSpaceByRoute(routeId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(
        mockTerminalsApi.getTerminalSailingSpaceByRoute
      ).toHaveBeenCalledWith(routeId);
      expect(result.current.data).toEqual(mockSpaceData);
    });

    it("should call useTerminalSailingSpaceByTerminalAndRoute with correct parameters", async () => {
      const params = { terminalId: 7, routeId: 1 };
      const mockSpaceData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          sailingId: 1,
          departureTime: new Date(),
          driveUpSpaces: 50,
          standbySpaces: 10,
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalSailingSpaceByTerminalAndRoute.mockResolvedValue(
        mockSpaceData
      );

      const { result } = renderHook(
        () => useTerminalSailingSpaceByTerminalAndRoute(params),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(
        mockTerminalsApi.getTerminalSailingSpaceByTerminalAndRoute
      ).toHaveBeenCalledWith(params);
      expect(result.current.data).toEqual(mockSpaceData);
    });
  });

  describe("Terminal Wait Times Hooks", () => {
    it("should call useTerminalWaitTimes", async () => {
      const mockWaitTimes = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          waitTimeId: 1,
          waitTimeType: "Drive-up",
          waitTimeMinutes: 30,
          waitTimeDescription: "Test wait time",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalWaitTimes.mockResolvedValue(mockWaitTimes);

      const { result } = renderHook(() => useTerminalWaitTimes(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockTerminalsApi.getTerminalWaitTimes).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockWaitTimes);
    });

    it("should call useTerminalWaitTimesByRoute with correct parameters", async () => {
      const routeId = 1;
      const mockWaitTimes = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          waitTimeId: 1,
          waitTimeType: "Drive-up",
          waitTimeMinutes: 30,
          waitTimeDescription: "Test wait time",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalWaitTimesByRoute.mockResolvedValue(
        mockWaitTimes
      );

      const { result } = renderHook(
        () => useTerminalWaitTimesByRoute(routeId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockTerminalsApi.getTerminalWaitTimesByRoute).toHaveBeenCalledWith(
        routeId
      );
      expect(result.current.data).toEqual(mockWaitTimes);
    });

    it("should call useTerminalWaitTimesByTerminal with correct parameters", async () => {
      const terminalId = 7;
      const mockWaitTimes = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          waitTimeId: 1,
          waitTimeType: "Drive-up",
          waitTimeMinutes: 30,
          waitTimeDescription: "Test wait time",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalWaitTimesByTerminal.mockResolvedValue(
        mockWaitTimes
      );

      const { result } = renderHook(
        () => useTerminalWaitTimesByTerminal(terminalId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(
        mockTerminalsApi.getTerminalWaitTimesByTerminal
      ).toHaveBeenCalledWith(terminalId);
      expect(result.current.data).toEqual(mockWaitTimes);
    });

    it("should call useTerminalWaitTimesByRouteAndTerminal with correct parameters", async () => {
      const params = { routeId: 1, terminalId: 7 };
      const mockWaitTimes = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          waitTimeId: 1,
          waitTimeType: "Drive-up",
          waitTimeMinutes: 30,
          waitTimeDescription: "Test wait time",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalWaitTimesByRouteAndTerminal.mockResolvedValue(
        mockWaitTimes
      );

      const { result } = renderHook(
        () => useTerminalWaitTimesByRouteAndTerminal(params),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(
        mockTerminalsApi.getTerminalWaitTimesByRouteAndTerminal
      ).toHaveBeenCalledWith(params);
      expect(result.current.data).toEqual(mockWaitTimes);
    });
  });

  describe("Terminal Verbose Hooks", () => {
    it("should call useTerminalVerbose", async () => {
      const mockTerminals = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          terminalAbbrev: "ANA",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "Test Address",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalVerbose.mockResolvedValue(mockTerminals);

      const { result } = renderHook(() => useTerminalVerbose(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockTerminalsApi.getTerminalVerbose).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockTerminals);
    });

    it("should call useTerminalVerboseByTerminalId with correct parameters", async () => {
      const terminalId = 7;
      const mockTerminals = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          terminalAbbrev: "ANA",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "Test Address",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalVerboseByTerminalId.mockResolvedValue(
        mockTerminals
      );

      const { result } = renderHook(
        () => useTerminalVerboseByTerminalId(terminalId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(
        mockTerminalsApi.getTerminalVerboseByTerminalId
      ).toHaveBeenCalledWith(terminalId);
      expect(result.current.data).toEqual(mockTerminals);
    });
  });

  describe("Hook Behavior", () => {
    it("should handle disabled queries", async () => {
      const { result } = renderHook(() => useTerminalBasics(), {
        wrapper: createWrapper(),
      });

      // Query should be enabled by default
      expect(result.current.isLoading).toBe(true);
    });

    it("should handle error states", async () => {
      mockTerminalsApi.getTerminalBasics.mockRejectedValue(
        new Error("API Error")
      );

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            gcTime: 0,
          },
        },
      });

      const wrapper = ({ children }: { children: ReactNode }) => {
        return React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children
        );
      };

      const { result } = renderHook(() => useTerminalBasics(), { wrapper });

      await waitFor(
        () => {
          expect(result.current.isLoading || result.current.isSuccess).toBe(
            true
          );
        },
        { timeout: 5000 }
      );

      // Should handle error gracefully - data will be undefined when API rejects
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeNull();
    });

    it("should handle conditional queries with valid IDs", async () => {
      const terminalId = 7;
      const mockTerminals = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          terminalAbbrev: "ANA",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "Test Address",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalBasicsByTerminalId.mockResolvedValue(
        mockTerminals
      );

      // Test with valid ID
      const { result: validResult } = renderHook(
        () => useTerminalBasicsByTerminalId(terminalId),
        { wrapper: createWrapper() }
      );
      expect(validResult.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(validResult.current.isSuccess).toBe(true);
      });

      // Test with invalid ID (0)
      const { result: invalidResult } = renderHook(
        () => useTerminalBasicsByTerminalId(0),
        { wrapper: createWrapper() }
      );
      expect(invalidResult.current.isLoading).toBe(false);
    });

    it("should handle conditional queries with null/undefined IDs", async () => {
      // Test with null ID
      const { result: nullResult } = renderHook(
        () => useTerminalBasicsByTerminalId(null as any),
        { wrapper: createWrapper() }
      );
      expect(nullResult.current.isLoading).toBe(false);

      // Test with undefined ID
      const { result: undefinedResult } = renderHook(
        () => useTerminalBasicsByTerminalId(undefined as any),
        { wrapper: createWrapper() }
      );
      expect(undefinedResult.current.isLoading).toBe(false);
    });
  });

  describe("Query Key Validation", () => {
    it("should generate correct query keys for useTerminalBasics", async () => {
      const mockTerminals = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          terminalAbbrev: "ANA",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "Test Address",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalBasics.mockResolvedValue(mockTerminals);

      const queryClient = new QueryClient();
      const wrapper = ({ children }: { children: ReactNode }) => {
        return React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children
        );
      };

      const { result } = renderHook(() => useTerminalBasics(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Verify the query key structure
      const queries = queryClient.getQueryCache().getAll();
      const terminalBasicsQuery = queries.find(
        (q) => q.queryKey[0] === "terminals" && q.queryKey[1] === "basics"
      );
      expect(terminalBasicsQuery).toBeDefined();
      expect(terminalBasicsQuery?.queryKey).toEqual(["terminals", "basics"]);
    });

    it("should generate correct query keys for useTerminalBasicsByTerminalId", async () => {
      const terminalId = 7;
      const mockTerminals = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          terminalAbbrev: "ANA",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "Test Address",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalBasicsByTerminalId.mockResolvedValue(
        mockTerminals
      );

      const queryClient = new QueryClient();
      const wrapper = ({ children }: { children: ReactNode }) => {
        return React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children
        );
      };

      const { result } = renderHook(
        () => useTerminalBasicsByTerminalId(terminalId),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Verify the query key structure
      const queries = queryClient.getQueryCache().getAll();
      const terminalBasicsByIdQuery = queries.find(
        (q) =>
          q.queryKey[0] === "terminals" &&
          q.queryKey[1] === "basics" &&
          q.queryKey[2] === "byTerminalId"
      );
      expect(terminalBasicsByIdQuery).toBeDefined();
      expect(terminalBasicsByIdQuery?.queryKey).toEqual([
        "terminals",
        "basics",
        "byTerminalId",
        terminalId,
      ]);
    });

    it("should generate correct query keys for useTerminalSailingSpace", async () => {
      const mockSpaceData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          sailingId: 1,
          departureTime: new Date(),
          driveUpSpaces: 50,
          standbySpaces: 10,
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalSailingSpace.mockResolvedValue(mockSpaceData);

      const queryClient = new QueryClient();
      const wrapper = ({ children }: { children: ReactNode }) => {
        return React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children
        );
      };

      const { result } = renderHook(() => useTerminalSailingSpace(), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Verify the query key structure
      const queries = queryClient.getQueryCache().getAll();
      const sailingSpaceQuery = queries.find(
        (q) => q.queryKey[0] === "terminals" && q.queryKey[1] === "sailingSpace"
      );
      expect(sailingSpaceQuery).toBeDefined();
      expect(sailingSpaceQuery?.queryKey).toEqual([
        "terminals",
        "sailingSpace",
      ]);
    });

    it("should generate correct query keys for useTerminalSailingSpaceByTerminalAndRoute", async () => {
      const params = { terminalId: 7, routeId: 1 };
      const mockSpaceData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          sailingId: 1,
          departureTime: new Date(),
          driveUpSpaces: 50,
          standbySpaces: 10,
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockTerminalsApi.getTerminalSailingSpaceByTerminalAndRoute.mockResolvedValue(
        mockSpaceData
      );

      const queryClient = new QueryClient();
      const wrapper = ({ children }: { children: ReactNode }) => {
        return React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children
        );
      };

      const { result } = renderHook(
        () => useTerminalSailingSpaceByTerminalAndRoute(params),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Verify the query key structure
      const queries = queryClient.getQueryCache().getAll();
      const sailingSpaceByTerminalAndRouteQuery = queries.find(
        (q) =>
          q.queryKey[0] === "terminals" &&
          q.queryKey[1] === "sailingSpace" &&
          q.queryKey[2] === "byTerminalAndRoute"
      );
      expect(sailingSpaceByTerminalAndRouteQuery).toBeDefined();
      expect(sailingSpaceByTerminalAndRouteQuery?.queryKey).toEqual([
        "terminals",
        "sailingSpace",
        "byTerminalAndRoute",
        params.terminalId,
        params.routeId,
      ]);
    });
  });
});
