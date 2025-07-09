import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  useTerminalWaitTimes,
  useTerminalWaitTimesByRoute,
  useTerminalWaitTimesByRouteAndTerminal,
  useTerminalWaitTimesByTerminal,
} from "@/api/wsf/terminals/terminalWaitTimes/hook";

// Mock the API functions
vi.mock("@/api/wsf/terminals/terminalWaitTimes/api", () => ({
  getTerminalWaitTimes: vi.fn(),
  getTerminalWaitTimesByRoute: vi.fn(),
  getTerminalWaitTimesByTerminal: vi.fn(),
  getTerminalWaitTimesByRouteAndTerminal: vi.fn(),
}));

// Mock the caching config
vi.mock("@/shared/caching/config", () => ({
  createInfrequentUpdateOptions: vi.fn(() => ({
    staleTime: 300000,
    refetchInterval: 600000,
  })),
}));

describe("TerminalWaitTimes Hooks", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
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
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);

  describe("useTerminalWaitTimes", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useTerminalWaitTimes).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getTerminalWaitTimes } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimes = vi.mocked(getTerminalWaitTimes);
      mockGetTerminalWaitTimes.mockResolvedValue([]);

      const { result } = renderHook(() => useTerminalWaitTimes(), { wrapper });

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getTerminalWaitTimes API function", async () => {
      const { getTerminalWaitTimes } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimes = vi.mocked(getTerminalWaitTimes);
      mockGetTerminalWaitTimes.mockResolvedValue([]);

      renderHook(() => useTerminalWaitTimes(), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalWaitTimes).toHaveBeenCalled();
      });
    });

    it("should return terminal wait time data", async () => {
      const { getTerminalWaitTimes } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimes = vi.mocked(getTerminalWaitTimes);

      const mockWaitTimeData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          waitTimeId: 1,
          waitTimeType: "vehicle" as const,
          waitTimeMinutes: 45,
          waitTimeDescription: "45 minute wait for vehicles",
          lastUpdated: new Date("2020-08-20T10:00:00Z"),
          isActive: true,
        },
      ];

      mockGetTerminalWaitTimes.mockResolvedValue(mockWaitTimeData);

      const { result } = renderHook(() => useTerminalWaitTimes(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockWaitTimeData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].terminalId).toBe(7);
      expect(result.current.data?.[0].terminalName).toBe("Anacortes");
      expect(result.current.data?.[0].waitTimeType).toBe("vehicle");
      expect(result.current.data?.[0].waitTimeMinutes).toBe(45);
    });

    it("should handle empty responses", async () => {
      const { getTerminalWaitTimes } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimes = vi.mocked(getTerminalWaitTimes);
      mockGetTerminalWaitTimes.mockResolvedValue([]);

      const { result } = renderHook(() => useTerminalWaitTimes(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual([]);
    });

    it("should handle API errors", async () => {
      const { getTerminalWaitTimes } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimes = vi.mocked(getTerminalWaitTimes);
      mockGetTerminalWaitTimes.mockRejectedValue(new Error("API Error"));

      const { result } = renderHook(() => useTerminalWaitTimes(), { wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("API Error");
    });

    it("should handle wait time data correctly", async () => {
      const { getTerminalWaitTimes } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimes = vi.mocked(getTerminalWaitTimes);

      const mockWaitTimeData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          waitTimeId: 1,
          waitTimeType: "vehicle" as const,
          waitTimeMinutes: 45,
          waitTimeDescription: "45 minute wait for vehicles",
          lastUpdated: new Date("2020-08-20T10:00:00Z"),
          isActive: true,
        },
        {
          terminalId: 7,
          terminalName: "Anacortes",
          waitTimeId: 2,
          waitTimeType: "passenger" as const,
          waitTimeMinutes: 15,
          waitTimeDescription: "15 minute wait for passengers",
          lastUpdated: new Date("2020-08-20T10:00:00Z"),
          isActive: true,
        },
      ];

      mockGetTerminalWaitTimes.mockResolvedValue(mockWaitTimeData);

      const { result } = renderHook(() => useTerminalWaitTimes(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toHaveLength(2);
      expect(result.current.data?.[0].waitTimeType).toBe("vehicle");
      expect(result.current.data?.[0].waitTimeMinutes).toBe(45);
      expect(result.current.data?.[1].waitTimeType).toBe("passenger");
      expect(result.current.data?.[1].waitTimeMinutes).toBe(15);
    });
  });

  describe("useTerminalWaitTimesByRoute", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useTerminalWaitTimesByRoute).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getTerminalWaitTimesByRoute } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimesByRoute = vi.mocked(
        getTerminalWaitTimesByRoute
      );
      mockGetTerminalWaitTimesByRoute.mockResolvedValue([]);

      const { result } = renderHook(() => useTerminalWaitTimesByRoute(1), {
        wrapper,
      });

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getTerminalWaitTimesByRoute API function with correct route ID", async () => {
      const { getTerminalWaitTimesByRoute } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimesByRoute = vi.mocked(
        getTerminalWaitTimesByRoute
      );
      mockGetTerminalWaitTimesByRoute.mockResolvedValue([]);

      renderHook(() => useTerminalWaitTimesByRoute(1), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalWaitTimesByRoute).toHaveBeenCalledWith(1);
      });
    });

    it("should handle different route IDs", async () => {
      const { getTerminalWaitTimesByRoute } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimesByRoute = vi.mocked(
        getTerminalWaitTimesByRoute
      );
      mockGetTerminalWaitTimesByRoute.mockResolvedValue([]);

      renderHook(() => useTerminalWaitTimesByRoute(2), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalWaitTimesByRoute).toHaveBeenCalledWith(2);
      });
    });

    it("should return terminal wait time data for specific route", async () => {
      const { getTerminalWaitTimesByRoute } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimesByRoute = vi.mocked(
        getTerminalWaitTimesByRoute
      );

      const mockWaitTimeData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          waitTimeId: 1,
          waitTimeType: "vehicle" as const,
          waitTimeMinutes: 45,
          waitTimeDescription: "45 minute wait for vehicles",
          lastUpdated: new Date("2020-08-20T10:00:00Z"),
          isActive: true,
        },
      ];

      mockGetTerminalWaitTimesByRoute.mockResolvedValue(mockWaitTimeData);

      const { result } = renderHook(() => useTerminalWaitTimesByRoute(1), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockWaitTimeData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].terminalId).toBe(7);
      expect(result.current.data?.[0].waitTimeType).toBe("vehicle");
      expect(result.current.data?.[0].waitTimeMinutes).toBe(45);
    });

    it("should be disabled when route ID is falsy", () => {
      const { result } = renderHook(() => useTerminalWaitTimesByRoute(0), {
        wrapper,
      });

      expect(result.current.isFetching).toBe(false);
      expect(result.current.data).toBeUndefined();
    });

    it("should handle API errors", async () => {
      const { getTerminalWaitTimesByRoute } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimesByRoute = vi.mocked(
        getTerminalWaitTimesByRoute
      );
      mockGetTerminalWaitTimesByRoute.mockRejectedValue(new Error("API Error"));

      const { result } = renderHook(() => useTerminalWaitTimesByRoute(1), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("API Error");
    });
  });

  describe("useTerminalWaitTimesByTerminal", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useTerminalWaitTimesByTerminal).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getTerminalWaitTimesByTerminal } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimesByTerminal = vi.mocked(
        getTerminalWaitTimesByTerminal
      );
      mockGetTerminalWaitTimesByTerminal.mockResolvedValue([]);

      const { result } = renderHook(() => useTerminalWaitTimesByTerminal(7), {
        wrapper,
      });

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getTerminalWaitTimesByTerminal API function with correct terminal ID", async () => {
      const { getTerminalWaitTimesByTerminal } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimesByTerminal = vi.mocked(
        getTerminalWaitTimesByTerminal
      );
      mockGetTerminalWaitTimesByTerminal.mockResolvedValue([]);

      renderHook(() => useTerminalWaitTimesByTerminal(7), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalWaitTimesByTerminal).toHaveBeenCalledWith(7);
      });
    });

    it("should handle different terminal IDs", async () => {
      const { getTerminalWaitTimesByTerminal } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimesByTerminal = vi.mocked(
        getTerminalWaitTimesByTerminal
      );
      mockGetTerminalWaitTimesByTerminal.mockResolvedValue([]);

      renderHook(() => useTerminalWaitTimesByTerminal(8), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalWaitTimesByTerminal).toHaveBeenCalledWith(8);
      });
    });

    it("should return terminal wait time data for specific terminal", async () => {
      const { getTerminalWaitTimesByTerminal } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimesByTerminal = vi.mocked(
        getTerminalWaitTimesByTerminal
      );

      const mockWaitTimeData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          waitTimeId: 1,
          waitTimeType: "vehicle" as const,
          waitTimeMinutes: 45,
          waitTimeDescription: "45 minute wait for vehicles",
          lastUpdated: new Date("2020-08-20T10:00:00Z"),
          isActive: true,
        },
      ];

      mockGetTerminalWaitTimesByTerminal.mockResolvedValue(mockWaitTimeData);

      const { result } = renderHook(() => useTerminalWaitTimesByTerminal(7), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockWaitTimeData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].terminalId).toBe(7);
      expect(result.current.data?.[0].terminalName).toBe("Anacortes");
      expect(result.current.data?.[0].waitTimeType).toBe("vehicle");
      expect(result.current.data?.[0].waitTimeMinutes).toBe(45);
    });

    it("should be disabled when terminal ID is falsy", () => {
      const { result } = renderHook(() => useTerminalWaitTimesByTerminal(0), {
        wrapper,
      });

      expect(result.current.isFetching).toBe(false);
      expect(result.current.data).toBeUndefined();
    });

    it("should handle API errors", async () => {
      const { getTerminalWaitTimesByTerminal } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimesByTerminal = vi.mocked(
        getTerminalWaitTimesByTerminal
      );
      mockGetTerminalWaitTimesByTerminal.mockRejectedValue(
        new Error("API Error")
      );

      const { result } = renderHook(() => useTerminalWaitTimesByTerminal(7), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("API Error");
    });
  });

  describe("useTerminalWaitTimesByRouteAndTerminal", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useTerminalWaitTimesByRouteAndTerminal).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getTerminalWaitTimesByRouteAndTerminal } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimesByRouteAndTerminal = vi.mocked(
        getTerminalWaitTimesByRouteAndTerminal
      );
      mockGetTerminalWaitTimesByRouteAndTerminal.mockResolvedValue([]);

      const { result } = renderHook(
        () =>
          useTerminalWaitTimesByRouteAndTerminal({
            routeId: 1,
            terminalId: 7,
          }),
        { wrapper }
      );

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getTerminalWaitTimesByRouteAndTerminal API function with correct parameters", async () => {
      const { getTerminalWaitTimesByRouteAndTerminal } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimesByRouteAndTerminal = vi.mocked(
        getTerminalWaitTimesByRouteAndTerminal
      );
      mockGetTerminalWaitTimesByRouteAndTerminal.mockResolvedValue([]);

      renderHook(
        () =>
          useTerminalWaitTimesByRouteAndTerminal({
            routeId: 1,
            terminalId: 7,
          }),
        { wrapper }
      );

      await waitFor(() => {
        expect(mockGetTerminalWaitTimesByRouteAndTerminal).toHaveBeenCalledWith(
          {
            routeId: 1,
            terminalId: 7,
          }
        );
      });
    });

    it("should handle different route and terminal IDs", async () => {
      const { getTerminalWaitTimesByRouteAndTerminal } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimesByRouteAndTerminal = vi.mocked(
        getTerminalWaitTimesByRouteAndTerminal
      );
      mockGetTerminalWaitTimesByRouteAndTerminal.mockResolvedValue([]);

      renderHook(
        () =>
          useTerminalWaitTimesByRouteAndTerminal({
            routeId: 2,
            terminalId: 8,
          }),
        { wrapper }
      );

      await waitFor(() => {
        expect(mockGetTerminalWaitTimesByRouteAndTerminal).toHaveBeenCalledWith(
          {
            routeId: 2,
            terminalId: 8,
          }
        );
      });
    });

    it("should return terminal wait time data for specific route and terminal", async () => {
      const { getTerminalWaitTimesByRouteAndTerminal } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimesByRouteAndTerminal = vi.mocked(
        getTerminalWaitTimesByRouteAndTerminal
      );

      const mockWaitTimeData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          waitTimeId: 1,
          waitTimeType: "vehicle" as const,
          waitTimeMinutes: 45,
          waitTimeDescription: "45 minute wait for vehicles",
          lastUpdated: new Date("2020-08-20T10:00:00Z"),
          isActive: true,
        },
      ];

      mockGetTerminalWaitTimesByRouteAndTerminal.mockResolvedValue(
        mockWaitTimeData
      );

      const { result } = renderHook(
        () =>
          useTerminalWaitTimesByRouteAndTerminal({
            routeId: 1,
            terminalId: 7,
          }),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockWaitTimeData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].terminalId).toBe(7);
      expect(result.current.data?.[0].waitTimeType).toBe("vehicle");
      expect(result.current.data?.[0].waitTimeMinutes).toBe(45);
    });

    it("should be disabled when route ID or terminal ID is falsy", () => {
      const { result } = renderHook(
        () =>
          useTerminalWaitTimesByRouteAndTerminal({
            routeId: 0,
            terminalId: 7,
          }),
        { wrapper }
      );

      expect(result.current.isFetching).toBe(false);
      expect(result.current.data).toBeUndefined();
    });

    it("should handle API errors", async () => {
      const { getTerminalWaitTimesByRouteAndTerminal } = await import(
        "@/api/wsf/terminals/terminalWaitTimes/api"
      );
      const mockGetTerminalWaitTimesByRouteAndTerminal = vi.mocked(
        getTerminalWaitTimesByRouteAndTerminal
      );
      mockGetTerminalWaitTimesByRouteAndTerminal.mockRejectedValue(
        new Error("API Error")
      );

      const { result } = renderHook(
        () =>
          useTerminalWaitTimesByRouteAndTerminal({
            routeId: 1,
            terminalId: 7,
          }),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("API Error");
    });
  });
});
