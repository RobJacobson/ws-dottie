import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  useVesselLocations,
  useVesselLocationsByVesselId,
} from "@/api/wsf/vessels/vesselLocations/hook";

// Mock the API functions
vi.mock("@/api/wsf/vessels/vesselLocations/api", () => ({
  getVesselLocations: vi.fn(),
  getVesselLocationsByVesselId: vi.fn(),
}));

// Mock the caching config
vi.mock("@/shared/caching/config", () => ({
  createFrequentUpdateOptions: vi.fn(() => ({
    staleTime: 30000,
    refetchInterval: 60000,
  })),
}));

describe("VesselLocations Hooks", () => {
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

  describe("useVesselLocations", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useVesselLocations).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getVesselLocations } = await import(
        "@/api/wsf/vessels/vesselLocations/api"
      );
      const mockGetVesselLocations = vi.mocked(getVesselLocations);
      mockGetVesselLocations.mockResolvedValue([]);

      const { result } = renderHook(() => useVesselLocations(), { wrapper });

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getVesselLocations API function", async () => {
      const { getVesselLocations } = await import(
        "@/api/wsf/vessels/vesselLocations/api"
      );
      const mockGetVesselLocations = vi.mocked(getVesselLocations);
      mockGetVesselLocations.mockResolvedValue([]);

      renderHook(() => useVesselLocations(), { wrapper });

      await waitFor(() => {
        expect(mockGetVesselLocations).toHaveBeenCalled();
      });
    });

    it("should return vessel location data", async () => {
      const { getVesselLocations } = await import(
        "@/api/wsf/vessels/vesselLocations/api"
      );
      const mockGetVesselLocations = vi.mocked(getVesselLocations);

      const mockVesselData = [
        {
          vesselID: 1,
          vesselName: "M/V Cathlamet",
          longitude: -122.4194,
          latitude: 47.6062,
          heading: 90,
          speed: 10,
          inService: true,
          atDock: false,
          departingTerminalId: 1,
          departingTerminalName: "Seattle",
          arrivingTerminalId: 2,
          arrivingTerminalName: "Bainbridge",
          scheduledDeparture: new Date(),
          estimatedArrival: new Date(),
          lastUpdated: new Date(),
        },
      ];

      mockGetVesselLocations.mockResolvedValue(mockVesselData);

      const { result } = renderHook(() => useVesselLocations(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockVesselData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].vesselID).toBe(1);
      expect(result.current.data?.[0].vesselName).toBe("M/V Cathlamet");
    });

    it("should handle empty responses", async () => {
      const { getVesselLocations } = await import(
        "@/api/wsf/vessels/vesselLocations/api"
      );
      const mockGetVesselLocations = vi.mocked(getVesselLocations);
      mockGetVesselLocations.mockResolvedValue([]);

      const { result } = renderHook(() => useVesselLocations(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual([]);
    });

    it("should handle API errors", async () => {
      const { getVesselLocations } = await import(
        "@/api/wsf/vessels/vesselLocations/api"
      );
      const mockGetVesselLocations = vi.mocked(getVesselLocations);
      mockGetVesselLocations.mockRejectedValue(new Error("API Error"));

      const { result } = renderHook(() => useVesselLocations(), { wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("API Error");
    });
  });

  describe("useVesselLocationsByVesselId", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useVesselLocationsByVesselId).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getVesselLocationsByVesselId } = await import(
        "@/api/wsf/vessels/vesselLocations/api"
      );
      const mockGetVesselLocationsByVesselId = vi.mocked(
        getVesselLocationsByVesselId
      );
      mockGetVesselLocationsByVesselId.mockResolvedValue([]);

      const { result } = renderHook(() => useVesselLocationsByVesselId(1), {
        wrapper,
      });

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getVesselLocationsByVesselId API function with correct vessel ID", async () => {
      const { getVesselLocationsByVesselId } = await import(
        "@/api/wsf/vessels/vesselLocations/api"
      );
      const mockGetVesselLocationsByVesselId = vi.mocked(
        getVesselLocationsByVesselId
      );
      mockGetVesselLocationsByVesselId.mockResolvedValue([]);

      renderHook(() => useVesselLocationsByVesselId(1), { wrapper });

      await waitFor(() => {
        expect(mockGetVesselLocationsByVesselId).toHaveBeenCalledWith(1);
      });
    });

    it("should handle different vessel IDs", async () => {
      const { getVesselLocationsByVesselId } = await import(
        "@/api/wsf/vessels/vesselLocations/api"
      );
      const mockGetVesselLocationsByVesselId = vi.mocked(
        getVesselLocationsByVesselId
      );
      mockGetVesselLocationsByVesselId.mockResolvedValue([]);

      renderHook(() => useVesselLocationsByVesselId(2), { wrapper });

      await waitFor(() => {
        expect(mockGetVesselLocationsByVesselId).toHaveBeenCalledWith(2);
      });
    });

    it("should return vessel location data for specific vessel", async () => {
      const { getVesselLocationsByVesselId } = await import(
        "@/api/wsf/vessels/vesselLocations/api"
      );
      const mockGetVesselLocationsByVesselId = vi.mocked(
        getVesselLocationsByVesselId
      );

      const mockVesselData = [
        {
          vesselID: 1,
          vesselName: "M/V Cathlamet",
          longitude: -122.4194,
          latitude: 47.6062,
          heading: 90,
          speed: 10,
          inService: true,
          atDock: false,
          departingTerminalId: 1,
          departingTerminalName: "Seattle",
          arrivingTerminalId: 2,
          arrivingTerminalName: "Bainbridge",
          scheduledDeparture: new Date(),
          estimatedArrival: new Date(),
          lastUpdated: new Date(),
        },
      ];

      mockGetVesselLocationsByVesselId.mockResolvedValue(mockVesselData);

      const { result } = renderHook(() => useVesselLocationsByVesselId(1), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockVesselData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].vesselID).toBe(1);
      expect(result.current.data?.[0].vesselName).toBe("M/V Cathlamet");
    });

    it("should be disabled when vessel ID is falsy", () => {
      const { result } = renderHook(() => useVesselLocationsByVesselId(0), {
        wrapper,
      });

      expect(result.current.isFetching).toBe(false);
      expect(result.current.data).toBeUndefined();
    });

    it("should handle API errors", async () => {
      const { getVesselLocationsByVesselId } = await import(
        "@/api/wsf/vessels/vesselLocations/api"
      );
      const mockGetVesselLocationsByVesselId = vi.mocked(
        getVesselLocationsByVesselId
      );
      mockGetVesselLocationsByVesselId.mockRejectedValue(
        new Error("API Error")
      );

      const { result } = renderHook(() => useVesselLocationsByVesselId(1), {
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
