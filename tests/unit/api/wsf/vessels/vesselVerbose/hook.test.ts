import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  useVesselVerbose,
  useVesselVerboseById,
} from "@/api/wsf/vessels/vesselVerbose/hook";

// Mock the API functions
vi.mock("@/api/wsf/vessels/vesselVerbose/api", () => ({
  getVesselVerbose: vi.fn(),
  getVesselVerboseById: vi.fn(),
}));

// Mock the caching config
vi.mock("@/shared/caching/config", () => ({
  createInfrequentUpdateOptions: vi.fn(() => ({
    staleTime: 300000,
    refetchInterval: 600000,
  })),
}));

describe("VesselVerbose Hooks", () => {
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

  describe("useVesselVerbose", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useVesselVerbose).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getVesselVerbose } = await import(
        "@/api/wsf/vessels/vesselVerbose/api"
      );
      const mockGetVesselVerbose = vi.mocked(getVesselVerbose);
      mockGetVesselVerbose.mockResolvedValue([]);

      const { result } = renderHook(() => useVesselVerbose(), { wrapper });

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getVesselVerbose API function", async () => {
      const { getVesselVerbose } = await import(
        "@/api/wsf/vessels/vesselVerbose/api"
      );
      const mockGetVesselVerbose = vi.mocked(getVesselVerbose);
      mockGetVesselVerbose.mockResolvedValue([]);

      renderHook(() => useVesselVerbose(), { wrapper });

      await waitFor(() => {
        expect(mockGetVesselVerbose).toHaveBeenCalled();
      });
    });

    it("should return vessel verbose data", async () => {
      const { getVesselVerbose } = await import(
        "@/api/wsf/vessels/vesselVerbose/api"
      );
      const mockGetVesselVerbose = vi.mocked(getVesselVerbose);

      const mockVesselData = [
        {
          vesselId: 1,
          vesselName: "M/V Cathlamet",
          abbrev: "CATH",
          vesselClass: "Jumbo Mark II",
          inService: true,
          active: true,
          yearBuilt: 1980,
          displacement: 5000,
          length: 460,
          breadth: 89,
          draft: 18.5,
          carCapacity: 218,
          passengerCapacity: 2500,
          maxPassengers: 2500,
          maxVehicles: 218,
          maxGrossTonnage: 5000,
          horsepower: 12000,
          maxSpeed: 18,
          homeTerminalId: 1,
          homeTerminalName: "Seattle",
          accommodations: [],
          stats: [],
          location: null,
        },
      ];

      mockGetVesselVerbose.mockResolvedValue(mockVesselData);

      const { result } = renderHook(() => useVesselVerbose(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockVesselData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].vesselId).toBe(1);
      expect(result.current.data?.[0].vesselName).toBe("M/V Cathlamet");
      expect(result.current.data?.[0].abbrev).toBe("CATH");
      expect(result.current.data?.[0].vesselClass).toBe("Jumbo Mark II");
    });

    it("should handle empty responses", async () => {
      const { getVesselVerbose } = await import(
        "@/api/wsf/vessels/vesselVerbose/api"
      );
      const mockGetVesselVerbose = vi.mocked(getVesselVerbose);
      mockGetVesselVerbose.mockResolvedValue([]);

      const { result } = renderHook(() => useVesselVerbose(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual([]);
    });

    it("should handle API errors", async () => {
      const { getVesselVerbose } = await import(
        "@/api/wsf/vessels/vesselVerbose/api"
      );
      const mockGetVesselVerbose = vi.mocked(getVesselVerbose);
      mockGetVesselVerbose.mockRejectedValue(new Error("API Error"));

      const { result } = renderHook(() => useVesselVerbose(), { wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("API Error");
    });
  });

  describe("useVesselVerboseById", () => {
    it("should have the correct hook signature", () => {
      expect(typeof useVesselVerboseById).toBe("function");
    });

    it("should return React Query result structure", async () => {
      const { getVesselVerboseById } = await import(
        "@/api/wsf/vessels/vesselVerbose/api"
      );
      const mockGetVesselVerboseById = vi.mocked(getVesselVerboseById);
      mockGetVesselVerboseById.mockResolvedValue([]);

      const { result } = renderHook(() => useVesselVerboseById(1), { wrapper });

      expect(result.current).toHaveProperty("data");
      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
    });

    it("should call getVesselVerboseById API function with correct vessel ID", async () => {
      const { getVesselVerboseById } = await import(
        "@/api/wsf/vessels/vesselVerbose/api"
      );
      const mockGetVesselVerboseById = vi.mocked(getVesselVerboseById);
      mockGetVesselVerboseById.mockResolvedValue([]);

      renderHook(() => useVesselVerboseById(1), { wrapper });

      await waitFor(() => {
        expect(mockGetVesselVerboseById).toHaveBeenCalledWith(1);
      });
    });

    it("should handle different vessel IDs", async () => {
      const { getVesselVerboseById } = await import(
        "@/api/wsf/vessels/vesselVerbose/api"
      );
      const mockGetVesselVerboseById = vi.mocked(getVesselVerboseById);
      mockGetVesselVerboseById.mockResolvedValue([]);

      renderHook(() => useVesselVerboseById(2), { wrapper });

      await waitFor(() => {
        expect(mockGetVesselVerboseById).toHaveBeenCalledWith(2);
      });
    });

    it("should return vessel verbose data for specific vessel", async () => {
      const { getVesselVerboseById } = await import(
        "@/api/wsf/vessels/vesselVerbose/api"
      );
      const mockGetVesselVerboseById = vi.mocked(getVesselVerboseById);

      const mockVesselData = [
        {
          vesselId: 1,
          vesselName: "M/V Cathlamet",
          abbrev: "CATH",
          vesselClass: "Jumbo Mark II",
          inService: true,
          active: true,
          yearBuilt: 1980,
          carCapacity: 218,
          passengerCapacity: 2500,
          maxSpeed: 18,
          homeTerminalId: 1,
          homeTerminalName: "Seattle",
        },
      ];

      mockGetVesselVerboseById.mockResolvedValue(mockVesselData);

      const { result } = renderHook(() => useVesselVerboseById(1), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockVesselData);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].vesselId).toBe(1);
      expect(result.current.data?.[0].vesselName).toBe("M/V Cathlamet");
      expect(result.current.data?.[0].abbrev).toBe("CATH");
      expect(result.current.data?.[0].vesselClass).toBe("Jumbo Mark II");
    });

    it("should be disabled when vessel ID is falsy", () => {
      const { result } = renderHook(() => useVesselVerboseById(0), { wrapper });

      expect(result.current.isFetching).toBe(false);
      expect(result.current.data).toBeUndefined();
    });

    it("should handle API errors", async () => {
      const { getVesselVerboseById } = await import(
        "@/api/wsf/vessels/vesselVerbose/api"
      );
      const mockGetVesselVerboseById = vi.mocked(getVesselVerboseById);
      mockGetVesselVerboseById.mockRejectedValue(new Error("API Error"));

      const { result } = renderHook(() => useVesselVerboseById(1), { wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("API Error");
    });
  });
});
