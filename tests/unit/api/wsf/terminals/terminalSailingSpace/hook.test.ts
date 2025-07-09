import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  useTerminalSailingSpace,
  useTerminalSailingSpaceByRoute,
  useTerminalSailingSpaceByTerminalAndRoute,
  useTerminalSailingSpaceByTerminalId,
} from "@/api/wsf/terminals/terminalSailingSpace/hook";

// Mock the API functions
vi.mock("@/api/wsf/terminals/terminalSailingSpace/api", () => ({
  getTerminalSailingSpace: vi.fn(),
  getTerminalSailingSpaceByTerminalId: vi.fn(),
  getTerminalSailingSpaceByRoute: vi.fn(),
  getTerminalSailingSpaceByTerminalAndRoute: vi.fn(),
}));

// Mock the caching config
vi.mock("@/shared/caching/config", () => ({
  createFrequentUpdateOptions: vi.fn(() => ({
    staleTime: 30000,
    refetchInterval: 60000,
  })),
}));

describe("TerminalSailingSpace Hooks", () => {
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

  describe("useTerminalSailingSpace", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useTerminalSailingSpace).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getTerminalSailingSpace } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpace = vi.mocked(getTerminalSailingSpace);
      mockGetTerminalSailingSpace.mockResolvedValue([]);

      const { result } = renderHook(() => useTerminalSailingSpace(), {
        wrapper,
      });

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getTerminalSailingSpace API function", async () => {
      const { getTerminalSailingSpace } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpace = vi.mocked(getTerminalSailingSpace);
      mockGetTerminalSailingSpace.mockResolvedValue([]);

      renderHook(() => useTerminalSailingSpace(), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalSailingSpace).toHaveBeenCalled();
      });
    });

    it("should return terminal sailing space data", async () => {
      const { getTerminalSailingSpace } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpace = vi.mocked(getTerminalSailingSpace);

      const mockSpaceData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          sailingId: 1,
          departureTime: new Date("2023-12-21T14:30:00.000Z"),
          driveUpSpaces: 100,
          reservationSpaces: 50,
          totalSpaces: 150,
          isActive: true,
        },
      ];

      mockGetTerminalSailingSpace.mockResolvedValue(mockSpaceData);

      const { result } = renderHook(() => useTerminalSailingSpace(), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockSpaceData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].terminalId).toBe(7);
      expect(result.current.data?.[0].terminalName).toBe("Anacortes");
      expect(result.current.data?.[0].sailingId).toBe(1);
    });

    it("should handle empty responses", async () => {
      const { getTerminalSailingSpace } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpace = vi.mocked(getTerminalSailingSpace);
      mockGetTerminalSailingSpace.mockResolvedValue([]);

      const { result } = renderHook(() => useTerminalSailingSpace(), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual([]);
    });

    it("should handle API errors", async () => {
      const { getTerminalSailingSpace } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpace = vi.mocked(getTerminalSailingSpace);
      mockGetTerminalSailingSpace.mockRejectedValue(new Error("API Error"));

      const { result } = renderHook(() => useTerminalSailingSpace(), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("API Error");
    });
  });

  describe("useTerminalSailingSpaceByTerminalId", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useTerminalSailingSpaceByTerminalId).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getTerminalSailingSpaceByTerminalId } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpaceByTerminalId = vi.mocked(
        getTerminalSailingSpaceByTerminalId
      );
      mockGetTerminalSailingSpaceByTerminalId.mockResolvedValue([]);

      const { result } = renderHook(
        () => useTerminalSailingSpaceByTerminalId(7),
        { wrapper }
      );

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getTerminalSailingSpaceByTerminalId API function with correct terminal ID", async () => {
      const { getTerminalSailingSpaceByTerminalId } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpaceByTerminalId = vi.mocked(
        getTerminalSailingSpaceByTerminalId
      );
      mockGetTerminalSailingSpaceByTerminalId.mockResolvedValue([]);

      renderHook(() => useTerminalSailingSpaceByTerminalId(7), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalSailingSpaceByTerminalId).toHaveBeenCalledWith(7);
      });
    });

    it("should handle different terminal IDs", async () => {
      const { getTerminalSailingSpaceByTerminalId } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpaceByTerminalId = vi.mocked(
        getTerminalSailingSpaceByTerminalId
      );
      mockGetTerminalSailingSpaceByTerminalId.mockResolvedValue([]);

      renderHook(() => useTerminalSailingSpaceByTerminalId(8), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalSailingSpaceByTerminalId).toHaveBeenCalledWith(8);
      });
    });

    it("should return terminal sailing space data for specific terminal", async () => {
      const { getTerminalSailingSpaceByTerminalId } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpaceByTerminalId = vi.mocked(
        getTerminalSailingSpaceByTerminalId
      );

      const mockSpaceData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          sailingId: 1,
          departureTime: new Date("2023-12-21T14:30:00.000Z"),
          driveUpSpaces: 100,
          reservationSpaces: 50,
          totalSpaces: 150,
          isActive: true,
        },
      ];

      mockGetTerminalSailingSpaceByTerminalId.mockResolvedValue(mockSpaceData);

      const { result } = renderHook(
        () => useTerminalSailingSpaceByTerminalId(7),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockSpaceData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].terminalId).toBe(7);
      expect(result.current.data?.[0].terminalName).toBe("Anacortes");
    });

    it("should be disabled when terminal ID is falsy", () => {
      const { result } = renderHook(
        () => useTerminalSailingSpaceByTerminalId(0),
        { wrapper }
      );

      expect(result.current.isFetching).toBe(false);
      expect(result.current.data).toBeUndefined();
    });

    it("should handle API errors", async () => {
      const { getTerminalSailingSpaceByTerminalId } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpaceByTerminalId = vi.mocked(
        getTerminalSailingSpaceByTerminalId
      );
      mockGetTerminalSailingSpaceByTerminalId.mockRejectedValue(
        new Error("API Error")
      );

      const { result } = renderHook(
        () => useTerminalSailingSpaceByTerminalId(7),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("API Error");
    });
  });

  describe("useTerminalSailingSpaceByRoute", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useTerminalSailingSpaceByRoute).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getTerminalSailingSpaceByRoute } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpaceByRoute = vi.mocked(
        getTerminalSailingSpaceByRoute
      );
      mockGetTerminalSailingSpaceByRoute.mockResolvedValue([]);

      const { result } = renderHook(() => useTerminalSailingSpaceByRoute(1), {
        wrapper,
      });

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getTerminalSailingSpaceByRoute API function with correct route ID", async () => {
      const { getTerminalSailingSpaceByRoute } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpaceByRoute = vi.mocked(
        getTerminalSailingSpaceByRoute
      );
      mockGetTerminalSailingSpaceByRoute.mockResolvedValue([]);

      renderHook(() => useTerminalSailingSpaceByRoute(1), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalSailingSpaceByRoute).toHaveBeenCalledWith(1);
      });
    });

    it("should handle different route IDs", async () => {
      const { getTerminalSailingSpaceByRoute } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpaceByRoute = vi.mocked(
        getTerminalSailingSpaceByRoute
      );
      mockGetTerminalSailingSpaceByRoute.mockResolvedValue([]);

      renderHook(() => useTerminalSailingSpaceByRoute(2), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalSailingSpaceByRoute).toHaveBeenCalledWith(2);
      });
    });

    it("should return terminal sailing space data for specific route", async () => {
      const { getTerminalSailingSpaceByRoute } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpaceByRoute = vi.mocked(
        getTerminalSailingSpaceByRoute
      );

      const mockSpaceData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          sailingId: 1,
          departureTime: new Date("2023-12-21T14:30:00.000Z"),
          driveUpSpaces: 100,
          reservationSpaces: 50,
          totalSpaces: 150,
          isActive: true,
        },
      ];

      mockGetTerminalSailingSpaceByRoute.mockResolvedValue(mockSpaceData);

      const { result } = renderHook(() => useTerminalSailingSpaceByRoute(1), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockSpaceData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].terminalId).toBe(7);
      expect(result.current.data?.[0].terminalName).toBe("Anacortes");
    });

    it("should be disabled when route ID is falsy", () => {
      const { result } = renderHook(() => useTerminalSailingSpaceByRoute(0), {
        wrapper,
      });

      expect(result.current.isFetching).toBe(false);
      expect(result.current.data).toBeUndefined();
    });

    it("should handle API errors", async () => {
      const { getTerminalSailingSpaceByRoute } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpaceByRoute = vi.mocked(
        getTerminalSailingSpaceByRoute
      );
      mockGetTerminalSailingSpaceByRoute.mockRejectedValue(
        new Error("API Error")
      );

      const { result } = renderHook(() => useTerminalSailingSpaceByRoute(1), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("API Error");
    });
  });

  describe("useTerminalSailingSpaceByTerminalAndRoute", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useTerminalSailingSpaceByTerminalAndRoute).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getTerminalSailingSpaceByTerminalAndRoute } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpaceByTerminalAndRoute = vi.mocked(
        getTerminalSailingSpaceByTerminalAndRoute
      );
      mockGetTerminalSailingSpaceByTerminalAndRoute.mockResolvedValue([]);

      const { result } = renderHook(
        () =>
          useTerminalSailingSpaceByTerminalAndRoute({
            terminalId: 7,
            routeId: 1,
          }),
        { wrapper }
      );

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getTerminalSailingSpaceByTerminalAndRoute API function with correct parameters", async () => {
      const { getTerminalSailingSpaceByTerminalAndRoute } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpaceByTerminalAndRoute = vi.mocked(
        getTerminalSailingSpaceByTerminalAndRoute
      );
      mockGetTerminalSailingSpaceByTerminalAndRoute.mockResolvedValue([]);

      renderHook(
        () =>
          useTerminalSailingSpaceByTerminalAndRoute({
            terminalId: 7,
            routeId: 1,
          }),
        { wrapper }
      );

      await waitFor(() => {
        expect(
          mockGetTerminalSailingSpaceByTerminalAndRoute
        ).toHaveBeenCalledWith({
          terminalId: 7,
          routeId: 1,
        });
      });
    });

    it("should handle different terminal and route combinations", async () => {
      const { getTerminalSailingSpaceByTerminalAndRoute } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpaceByTerminalAndRoute = vi.mocked(
        getTerminalSailingSpaceByTerminalAndRoute
      );
      mockGetTerminalSailingSpaceByTerminalAndRoute.mockResolvedValue([]);

      renderHook(
        () =>
          useTerminalSailingSpaceByTerminalAndRoute({
            terminalId: 8,
            routeId: 2,
          }),
        { wrapper }
      );

      await waitFor(() => {
        expect(
          mockGetTerminalSailingSpaceByTerminalAndRoute
        ).toHaveBeenCalledWith({
          terminalId: 8,
          routeId: 2,
        });
      });
    });

    it("should return terminal sailing space data for specific terminal and route", async () => {
      const { getTerminalSailingSpaceByTerminalAndRoute } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpaceByTerminalAndRoute = vi.mocked(
        getTerminalSailingSpaceByTerminalAndRoute
      );

      const mockSpaceData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          sailingId: 1,
          departureTime: new Date("2023-12-21T14:30:00.000Z"),
          driveUpSpaces: 100,
          reservationSpaces: 50,
          totalSpaces: 150,
          isActive: true,
        },
      ];

      mockGetTerminalSailingSpaceByTerminalAndRoute.mockResolvedValue(
        mockSpaceData
      );

      const { result } = renderHook(
        () =>
          useTerminalSailingSpaceByTerminalAndRoute({
            terminalId: 7,
            routeId: 1,
          }),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockSpaceData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].terminalId).toBe(7);
      expect(result.current.data?.[0].terminalName).toBe("Anacortes");
    });

    it("should be disabled when terminal ID or route ID is falsy", () => {
      const { result } = renderHook(
        () =>
          useTerminalSailingSpaceByTerminalAndRoute({
            terminalId: 0,
            routeId: 1,
          }),
        { wrapper }
      );

      expect(result.current.isFetching).toBe(false);
      expect(result.current.data).toBeUndefined();
    });

    it("should handle API errors", async () => {
      const { getTerminalSailingSpaceByTerminalAndRoute } = await import(
        "@/api/wsf/terminals/terminalSailingSpace/api"
      );
      const mockGetTerminalSailingSpaceByTerminalAndRoute = vi.mocked(
        getTerminalSailingSpaceByTerminalAndRoute
      );
      mockGetTerminalSailingSpaceByTerminalAndRoute.mockRejectedValue(
        new Error("API Error")
      );

      const { result } = renderHook(
        () =>
          useTerminalSailingSpaceByTerminalAndRoute({
            terminalId: 7,
            routeId: 1,
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
