import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  useTerminalLocations,
  useTerminalLocationsByTerminalId,
} from "@/api/wsf/terminals/terminalLocations/hook";

// Mock the API functions
vi.mock("@/api/wsf/terminals/terminalLocations/api", () => ({
  getTerminalLocations: vi.fn(),
  getTerminalLocationsByTerminalId: vi.fn(),
}));

// Mock the caching config
vi.mock("@/shared/caching/config", () => ({
  createInfrequentUpdateOptions: vi.fn(() => ({
    staleTime: 300000,
    refetchInterval: 600000,
  })),
}));

describe("TerminalLocations Hooks", () => {
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

  describe("useTerminalLocations", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useTerminalLocations).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getTerminalLocations } = await import(
        "@/api/wsf/terminals/terminalLocations/api"
      );
      const mockGetTerminalLocations = vi.mocked(getTerminalLocations);
      mockGetTerminalLocations.mockResolvedValue([]);

      const { result } = renderHook(() => useTerminalLocations(), { wrapper });

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getTerminalLocations API function", async () => {
      const { getTerminalLocations } = await import(
        "@/api/wsf/terminals/terminalLocations/api"
      );
      const mockGetTerminalLocations = vi.mocked(getTerminalLocations);
      mockGetTerminalLocations.mockResolvedValue([]);

      renderHook(() => useTerminalLocations(), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalLocations).toHaveBeenCalled();
      });
    });

    it("should return terminal location data", async () => {
      const { getTerminalLocations } = await import(
        "@/api/wsf/terminals/terminalLocations/api"
      );
      const mockGetTerminalLocations = vi.mocked(getTerminalLocations);

      const mockLocationData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "2100 Ferry Terminal Rd, Anacortes, WA 98221",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          county: "Skagit",
          gisZoomLocation: {
            latitude: 48.5123,
            longitude: -122.6123,
            zoomLevel: 15,
          },
          isActive: true,
        },
      ];

      mockGetTerminalLocations.mockResolvedValue(mockLocationData);

      const { result } = renderHook(() => useTerminalLocations(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockLocationData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].terminalId).toBe(7);
      expect(result.current.data?.[0].terminalName).toBe("Anacortes");
      expect(result.current.data?.[0].latitude).toBe(48.5123);
      expect(result.current.data?.[0].longitude).toBe(-122.6123);
    });

    it("should handle empty responses", async () => {
      const { getTerminalLocations } = await import(
        "@/api/wsf/terminals/terminalLocations/api"
      );
      const mockGetTerminalLocations = vi.mocked(getTerminalLocations);
      mockGetTerminalLocations.mockResolvedValue([]);

      const { result } = renderHook(() => useTerminalLocations(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual([]);
    });

    it("should handle API errors", async () => {
      const { getTerminalLocations } = await import(
        "@/api/wsf/terminals/terminalLocations/api"
      );
      const mockGetTerminalLocations = vi.mocked(getTerminalLocations);
      mockGetTerminalLocations.mockRejectedValue(new Error("API Error"));

      const { result } = renderHook(() => useTerminalLocations(), { wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("API Error");
    });

    it("should handle terminal location data correctly", async () => {
      const { getTerminalLocations } = await import(
        "@/api/wsf/terminals/terminalLocations/api"
      );
      const mockGetTerminalLocations = vi.mocked(getTerminalLocations);

      const mockLocationData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "2100 Ferry Terminal Rd, Anacortes, WA 98221",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          county: "Skagit",
          gisZoomLocation: {
            latitude: 48.5123,
            longitude: -122.6123,
            zoomLevel: 15,
          },
          isActive: true,
        },
      ];

      mockGetTerminalLocations.mockResolvedValue(mockLocationData);

      const { result } = renderHook(() => useTerminalLocations(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const location = result.current.data?.[0];

      // Test location data
      expect(location?.latitude).toBe(48.5123);
      expect(location?.longitude).toBe(-122.6123);
      expect(location?.gisZoomLocation.latitude).toBe(48.5123);
      expect(location?.gisZoomLocation.longitude).toBe(-122.6123);
      expect(location?.gisZoomLocation.zoomLevel).toBe(15);
    });

    it("should handle terminal address information correctly", async () => {
      const { getTerminalLocations } = await import(
        "@/api/wsf/terminals/terminalLocations/api"
      );
      const mockGetTerminalLocations = vi.mocked(getTerminalLocations);

      const mockLocationData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "2100 Ferry Terminal Rd, Anacortes, WA 98221",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          county: "Skagit",
          gisZoomLocation: {
            latitude: 48.5123,
            longitude: -122.6123,
            zoomLevel: 15,
          },
          isActive: true,
        },
      ];

      mockGetTerminalLocations.mockResolvedValue(mockLocationData);

      const { result } = renderHook(() => useTerminalLocations(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const location = result.current.data?.[0];

      // Test address information
      expect(location?.address).toBe(
        "2100 Ferry Terminal Rd, Anacortes, WA 98221"
      );
      expect(location?.city).toBe("Anacortes");
      expect(location?.state).toBe("WA");
      expect(location?.zipCode).toBe("98221");
      expect(location?.county).toBe("Skagit");
    });
  });

  describe("useTerminalLocationsByTerminalId", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useTerminalLocationsByTerminalId).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getTerminalLocationsByTerminalId } = await import(
        "@/api/wsf/terminals/terminalLocations/api"
      );
      const mockGetTerminalLocationsByTerminalId = vi.mocked(
        getTerminalLocationsByTerminalId
      );
      mockGetTerminalLocationsByTerminalId.mockResolvedValue([]);

      const { result } = renderHook(() => useTerminalLocationsByTerminalId(7), {
        wrapper,
      });

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getTerminalLocationsByTerminalId API function with correct terminal ID", async () => {
      const { getTerminalLocationsByTerminalId } = await import(
        "@/api/wsf/terminals/terminalLocations/api"
      );
      const mockGetTerminalLocationsByTerminalId = vi.mocked(
        getTerminalLocationsByTerminalId
      );
      mockGetTerminalLocationsByTerminalId.mockResolvedValue([]);

      renderHook(() => useTerminalLocationsByTerminalId(7), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalLocationsByTerminalId).toHaveBeenCalledWith(7);
      });
    });

    it("should handle different terminal IDs", async () => {
      const { getTerminalLocationsByTerminalId } = await import(
        "@/api/wsf/terminals/terminalLocations/api"
      );
      const mockGetTerminalLocationsByTerminalId = vi.mocked(
        getTerminalLocationsByTerminalId
      );
      mockGetTerminalLocationsByTerminalId.mockResolvedValue([]);

      renderHook(() => useTerminalLocationsByTerminalId(8), { wrapper });

      await waitFor(() => {
        expect(mockGetTerminalLocationsByTerminalId).toHaveBeenCalledWith(8);
      });
    });

    it("should return terminal location data for specific terminal", async () => {
      const { getTerminalLocationsByTerminalId } = await import(
        "@/api/wsf/terminals/terminalLocations/api"
      );
      const mockGetTerminalLocationsByTerminalId = vi.mocked(
        getTerminalLocationsByTerminalId
      );

      const mockLocationData = [
        {
          terminalId: 7,
          terminalName: "Anacortes",
          latitude: 48.5123,
          longitude: -122.6123,
          address: "2100 Ferry Terminal Rd, Anacortes, WA 98221",
          city: "Anacortes",
          state: "WA",
          zipCode: "98221",
          county: "Skagit",
          gisZoomLocation: {
            latitude: 48.5123,
            longitude: -122.6123,
            zoomLevel: 15,
          },
          isActive: true,
        },
      ];

      mockGetTerminalLocationsByTerminalId.mockResolvedValue(mockLocationData);

      const { result } = renderHook(() => useTerminalLocationsByTerminalId(7), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockLocationData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].terminalId).toBe(7);
      expect(result.current.data?.[0].terminalName).toBe("Anacortes");
      expect(result.current.data?.[0].latitude).toBe(48.5123);
      expect(result.current.data?.[0].longitude).toBe(-122.6123);
    });

    it("should be disabled when terminal ID is falsy", () => {
      const { result } = renderHook(() => useTerminalLocationsByTerminalId(0), {
        wrapper,
      });

      expect(result.current.isFetching).toBe(false);
      expect(result.current.data).toBeUndefined();
    });

    it("should handle API errors", async () => {
      const { getTerminalLocationsByTerminalId } = await import(
        "@/api/wsf/terminals/terminalLocations/api"
      );
      const mockGetTerminalLocationsByTerminalId = vi.mocked(
        getTerminalLocationsByTerminalId
      );
      mockGetTerminalLocationsByTerminalId.mockRejectedValue(
        new Error("API Error")
      );

      const { result } = renderHook(() => useTerminalLocationsByTerminalId(7), {
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
