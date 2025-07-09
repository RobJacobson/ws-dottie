import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  useTerminalVerbose,
  useTerminalVerboseByTerminalId,
} from "@/api/wsf/terminals/terminalverbose/hook";

// Mock the API functions
vi.mock("@/api/wsf/terminals/terminalverbose/api", () => ({
  getTerminalVerbose: vi.fn(),
  getTerminalVerboseByTerminalId: vi.fn(),
}));

// Mock the caching config
vi.mock("@/shared/caching/config", () => ({
  createInfrequentUpdateOptions: vi.fn(() => ({
    staleTime: 300000,
    refetchInterval: 600000,
  })),
}));

describe("TerminalVerbose Hooks", () => {
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

  describe("useTerminalVerbose", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useTerminalVerbose).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getTerminalVerbose } = await import(
        "@/api/wsf/terminals/terminalverbose/api"
      );
      const mockGetTerminalVerbose = vi.mocked(getTerminalVerbose);
      mockGetTerminalVerbose.mockResolvedValue([]);

      const { result } = renderHook(() => useTerminalVerbose(), { wrapper });

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getTerminalVerbose API function", async () => {
      const { getTerminalVerbose } = await import(
        "@/api/wsf/terminals/terminalverbose/api"
      );
      const mockGetTerminalVerbose = vi.mocked(getTerminalVerbose);
      mockGetTerminalVerbose.mockResolvedValue([]);

      renderHook(() => useTerminalVerbose(), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalVerbose).toHaveBeenCalled();
      });
    });

    it("should return terminal verbose data", async () => {
      const { getTerminalVerbose } = await import(
        "@/api/wsf/terminals/terminalverbose/api"
      );
      const mockGetTerminalVerbose = vi.mocked(getTerminalVerbose);

      const mockTerminalData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          terminalAbbrev: "ANA",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "2100 Ferry Terminal Rd, Anacortes, WA 98221",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          county: "Skagit",
          phone: "(360) 293-8155",
          hasWaitTime: true,
          hasSpaceAvailable: true,
          gisZoomLocation: {
            latitude: 48.5123,
            longitude: -122.6123,
            zoomLevel: 15,
          },
          transitLinks: [],
          waitTimes: [],
          bulletins: [],
          sailingSpaces: [],
          isActive: true,
        },
      ];

      mockGetTerminalVerbose.mockResolvedValue(mockTerminalData);

      const { result } = renderHook(() => useTerminalVerbose(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockTerminalData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].terminalId).toBe(7);
      expect(result.current.data?.[0].terminalName).toBe("Anacortes");
      expect(result.current.data?.[0].terminalAbbrev).toBe("ANA");
    });

    it("should handle empty responses", async () => {
      const { getTerminalVerbose } = await import(
        "@/api/wsf/terminals/terminalverbose/api"
      );
      const mockGetTerminalVerbose = vi.mocked(getTerminalVerbose);
      mockGetTerminalVerbose.mockResolvedValue([]);

      const { result } = renderHook(() => useTerminalVerbose(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual([]);
    });

    it("should handle API errors", async () => {
      const { getTerminalVerbose } = await import(
        "@/api/wsf/terminals/terminalverbose/api"
      );
      const mockGetTerminalVerbose = vi.mocked(getTerminalVerbose);
      mockGetTerminalVerbose.mockRejectedValue(new Error("API Error"));

      const { result } = renderHook(() => useTerminalVerbose(), { wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("API Error");
    });

    it("should handle terminal location data correctly", async () => {
      const { getTerminalVerbose } = await import(
        "@/api/wsf/terminals/terminalverbose/api"
      );
      const mockGetTerminalVerbose = vi.mocked(getTerminalVerbose);

      const mockTerminalData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          terminalAbbrev: "ANA",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "2100 Ferry Terminal Rd, Anacortes, WA 98221",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          county: "Skagit",
          phone: "(360) 293-8155",
          hasWaitTime: true,
          hasSpaceAvailable: true,
          gisZoomLocation: {
            latitude: 48.5123,
            longitude: -122.6123,
            zoomLevel: 15,
          },
          transitLinks: [],
          waitTimes: [],
          bulletins: [],
          sailingSpaces: [],
          isActive: true,
        },
      ];

      mockGetTerminalVerbose.mockResolvedValue(mockTerminalData);

      const { result } = renderHook(() => useTerminalVerbose(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const terminal = result.current.data?.[0];

      // Test location data
      expect(terminal?.latitude).toBe(48.5123);
      expect(terminal?.longitude).toBe(-122.6123);
      expect(terminal?.gisZoomLocation.latitude).toBe(48.5123);
      expect(terminal?.gisZoomLocation.longitude).toBe(-122.6123);
      expect(terminal?.gisZoomLocation.zoomLevel).toBe(15);
    });

    it("should handle terminal contact information correctly", async () => {
      const { getTerminalVerbose } = await import(
        "@/api/wsf/terminals/terminalverbose/api"
      );
      const mockGetTerminalVerbose = vi.mocked(getTerminalVerbose);

      const mockTerminalData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          terminalAbbrev: "ANA",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "2100 Ferry Terminal Rd, Anacortes, WA 98221",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          county: "Skagit",
          phone: "(360) 293-8155",
          hasWaitTime: true,
          hasSpaceAvailable: true,
          gisZoomLocation: {
            latitude: 48.5123,
            longitude: -122.6123,
            zoomLevel: 15,
          },
          transitLinks: [],
          waitTimes: [],
          bulletins: [],
          sailingSpaces: [],
          isActive: true,
        },
      ];

      mockGetTerminalVerbose.mockResolvedValue(mockTerminalData);

      const { result } = renderHook(() => useTerminalVerbose(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const terminal = result.current.data?.[0];

      // Test contact information
      expect(terminal?.address).toBe(
        "2100 Ferry Terminal Rd, Anacortes, WA 98221"
      );
      expect(terminal?.city).toBe("Anacortes");
      expect(terminal?.state).toBe("WA");
      expect(terminal?.zipCode).toBe("98221");
      expect(terminal?.county).toBe("Skagit");
      expect(terminal?.phone).toBe("(360) 293-8155");
    });

    it("should handle terminal operational features correctly", async () => {
      const { getTerminalVerbose } = await import(
        "@/api/wsf/terminals/terminalverbose/api"
      );
      const mockGetTerminalVerbose = vi.mocked(getTerminalVerbose);

      const mockTerminalData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          hasWaitTime: true,
          hasSpaceAvailable: true,
          isActive: true,
          transitLinks: [],
          waitTimes: [],
          bulletins: [],
          sailingSpaces: [],
        },
      ];

      mockGetTerminalVerbose.mockResolvedValue(mockTerminalData);

      const { result } = renderHook(() => useTerminalVerbose(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const terminal = result.current.data?.[0];

      // Test operational features
      expect(terminal?.hasWaitTime).toBe(true);
      expect(terminal?.hasSpaceAvailable).toBe(true);
      expect(terminal?.isActive).toBe(true);
      expect(terminal?.transitLinks).toEqual([]);
      expect(terminal?.waitTimes).toEqual([]);
      expect(terminal?.bulletins).toEqual([]);
      expect(terminal?.sailingSpaces).toEqual([]);
    });
  });

  describe("useTerminalVerboseByTerminalId", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useTerminalVerboseByTerminalId).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getTerminalVerboseByTerminalId } = await import(
        "@/api/wsf/terminals/terminalverbose/api"
      );
      const mockGetTerminalVerboseByTerminalId = vi.mocked(
        getTerminalVerboseByTerminalId
      );
      mockGetTerminalVerboseByTerminalId.mockResolvedValue([]);

      const { result } = renderHook(() => useTerminalVerboseByTerminalId(7), {
        wrapper,
      });

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getTerminalVerboseByTerminalId API function with correct terminal ID", async () => {
      const { getTerminalVerboseByTerminalId } = await import(
        "@/api/wsf/terminals/terminalverbose/api"
      );
      const mockGetTerminalVerboseByTerminalId = vi.mocked(
        getTerminalVerboseByTerminalId
      );
      mockGetTerminalVerboseByTerminalId.mockResolvedValue([]);

      renderHook(() => useTerminalVerboseByTerminalId(7), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalVerboseByTerminalId).toHaveBeenCalledWith(7);
      });
    });

    it("should handle different terminal IDs", async () => {
      const { getTerminalVerboseByTerminalId } = await import(
        "@/api/wsf/terminals/terminalverbose/api"
      );
      const mockGetTerminalVerboseByTerminalId = vi.mocked(
        getTerminalVerboseByTerminalId
      );
      mockGetTerminalVerboseByTerminalId.mockResolvedValue([]);

      renderHook(() => useTerminalVerboseByTerminalId(8), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalVerboseByTerminalId).toHaveBeenCalledWith(8);
      });
    });

    it("should return terminal verbose data for specific terminal", async () => {
      const { getTerminalVerboseByTerminalId } = await import(
        "@/api/wsf/terminals/terminalverbose/api"
      );
      const mockGetTerminalVerboseByTerminalId = vi.mocked(
        getTerminalVerboseByTerminalId
      );

      const mockTerminalData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          terminalAbbrev: "ANA",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "2100 Ferry Terminal Rd, Anacortes, WA 98221",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          county: "Skagit",
          phone: "(360) 293-8155",
          hasWaitTime: true,
          hasSpaceAvailable: true,
          isActive: true,
        },
      ];

      mockGetTerminalVerboseByTerminalId.mockResolvedValue(mockTerminalData);

      const { result } = renderHook(() => useTerminalVerboseByTerminalId(7), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockTerminalData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].terminalId).toBe(7);
      expect(result.current.data?.[0].terminalName).toBe("Anacortes");
      expect(result.current.data?.[0].terminalAbbrev).toBe("ANA");
    });

    it("should be disabled when terminal ID is falsy", () => {
      const { result } = renderHook(() => useTerminalVerboseByTerminalId(0), {
        wrapper,
      });

      expect(result.current.isFetching).toBe(false);
      expect(result.current.data).toBeUndefined();
    });

    it("should handle API errors", async () => {
      const { getTerminalVerboseByTerminalId } = await import(
        "@/api/wsf/terminals/terminalverbose/api"
      );
      const mockGetTerminalVerboseByTerminalId = vi.mocked(
        getTerminalVerboseByTerminalId
      );
      mockGetTerminalVerboseByTerminalId.mockRejectedValue(
        new Error("API Error")
      );

      const { result } = renderHook(() => useTerminalVerboseByTerminalId(7), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("API Error");
    });
  });
});
