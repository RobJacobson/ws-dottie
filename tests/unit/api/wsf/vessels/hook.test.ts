import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import * as React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  useCacheFlushDateVessels,
  useVesselLocations,
  useVesselLocationsByVesselId,
  useVesselVerbose,
  useVesselVerboseById,
} from "@/api/wsf/vessels/hook";

// Mock the API functions
vi.mock("@/api/wsf/vessels/api", () => ({
  getVesselLocations: vi.fn(),
  getVesselLocationsByVesselId: vi.fn(),
  getVesselVerbose: vi.fn(),
  getVesselVerboseById: vi.fn(),
  getCacheFlushDateVessels: vi.fn(),
}));

// Mock the caching config
vi.mock("@/shared/caching/config", () => ({
  createFrequentUpdateOptions: vi.fn(() => ({
    staleTime: 30000,
    gcTime: 120000,
    refetchInterval: 5000,
  })),
  createInfrequentUpdateOptions: vi.fn(() => ({
    staleTime: 604800000,
    gcTime: 2592000000,
    refetchInterval: false,
  })),
  createCacheFlushOptions: vi.fn(() => ({
    staleTime: 300000,
    gcTime: 600000,
    refetchInterval: 120000,
  })),
}));

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

describe("WSF Vessels Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useVesselLocations", () => {
    it("should fetch vessel locations successfully", async () => {
      const { getVesselLocations } = await import("@/api/wsf/vessels/api");
      const mockGetVesselLocations = vi.mocked(getVesselLocations);

      const mockVesselData = [
        {
          VesselID: 1,
          VesselName: "Walla Walla",
          Latitude: 47.6062,
          Longitude: -122.3321,
          Speed: 12.5,
          Heading: 180,
          TimeStamp: new Date("2024-01-01T12:00:00Z"),
          InService: true,
          AtDock: false,
          DepartingTerminalID: 7,
          DepartingTerminalName: "Anacortes",
          ArrivingTerminalID: 8,
          ArrivingTerminalName: "Friday Harbor",
          ScheduledDeparture: new Date("2024-01-01T12:30:00Z"),
          EstimatedArrival: new Date("2024-01-01T13:30:00Z"),
        },
      ];

      mockGetVesselLocations.mockResolvedValue(mockVesselData);

      const { result } = renderHook(() => useVesselLocations(), {
        wrapper: createWrapper(),
      });

      // Initially loading
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();

      // Wait for data to load
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockVesselData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(mockGetVesselLocations).toHaveBeenCalledTimes(1);
    });

    it("should handle error states", async () => {
      const { getVesselLocations } = await import("@/api/wsf/vessels/api");
      const mockGetVesselLocations = vi.mocked(getVesselLocations);

      const mockError = new Error("Network error");
      mockGetVesselLocations.mockRejectedValue(mockError);

      const { result } = renderHook(() => useVesselLocations(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.data).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
    });

    it("should use frequent update options", async () => {
      const { createFrequentUpdateOptions } = await import(
        "@/shared/caching/config"
      );
      const mockCreateFrequentUpdateOptions = vi.mocked(
        createFrequentUpdateOptions
      );

      const { result } = renderHook(() => useVesselLocations(), {
        wrapper: createWrapper(),
      });

      expect(mockCreateFrequentUpdateOptions).toHaveBeenCalled();

      // Wait for the query to complete
      await waitFor(() => {
        expect(result.current.isSuccess || result.current.isError).toBe(true);
      });
    });
  });

  describe("useVesselLocationsByVesselId", () => {
    it("should fetch vessel location for specific vessel", async () => {
      const { getVesselLocationsByVesselId } = await import(
        "@/api/wsf/vessels/api"
      );
      const mockGetVesselLocationsByVesselId = vi.mocked(
        getVesselLocationsByVesselId
      );

      const mockVesselData = [
        {
          VesselID: 1,
          VesselName: "Walla Walla",
          Latitude: 47.6062,
          Longitude: -122.3321,
          Speed: 12.5,
          Heading: 180,
          TimeStamp: new Date("2024-01-01T12:00:00Z"),
          InService: true,
          AtDock: false,
          DepartingTerminalID: 7,
          DepartingTerminalName: "Anacortes",
          ArrivingTerminalID: 8,
          ArrivingTerminalName: "Friday Harbor",
          ScheduledDeparture: new Date("2024-01-01T12:30:00Z"),
          EstimatedArrival: new Date("2024-01-01T13:30:00Z"),
        },
      ];

      mockGetVesselLocationsByVesselId.mockResolvedValue(mockVesselData);

      const { result } = renderHook(() => useVesselLocationsByVesselId(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockVesselData);
      expect(mockGetVesselLocationsByVesselId).toHaveBeenCalledWith(1);
    });

    it("should be disabled when vesselId is falsy", () => {
      const { result } = renderHook(() => useVesselLocationsByVesselId(0), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.isFetching).toBe(false);
    });
  });

  describe("useVesselVerbose", () => {
    it("should fetch vessel verbose data successfully", async () => {
      const { getVesselVerbose } = await import("@/api/wsf/vessels/api");
      const mockGetVesselVerbose = vi.mocked(getVesselVerbose);

      const mockVesselData = [
        {
          VesselID: 1,
          VesselName: "Walla Walla",
          VesselAbbrev: "WW",
          Class: {
            ClassID: 1,
            ClassName: "Jumbo Mark II",
            PublicDisplayName: "Jumbo Mark II Class",
          },
          Status: 1,
          OwnedByWSF: true,
          YearBuilt: 1973,
          Displacement: 6000,
          Length: "460",
          Beam: "89",
          Draft: "18",
          SpeedInKnots: 18,
          EngineCount: 4,
          Horsepower: 12000,
          MaxPassengerCount: 2000,
          RegDeckSpace: 200,
          TallDeckSpace: 0,
          Tonnage: 6000,
          PropulsionInfo: "Diesel Electric",
          ADAAccessible: true,
          Elevator: true,
          CarDeckRestroom: true,
          MainCabinGalley: true,
          MainCabinRestroom: true,
          PublicWifi: true,
          ADAInfo: "ADA accessible",
          VesselNameDesc: "M/V Walla Walla",
          VesselHistory: "Built in 1973",
          CityBuilt: "Seattle",
        },
      ];

      mockGetVesselVerbose.mockResolvedValue(mockVesselData);

      const { result } = renderHook(() => useVesselVerbose(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockVesselData);
      expect(mockGetVesselVerbose).toHaveBeenCalledTimes(1);
    });

    it("should use infrequent update options", async () => {
      const { createInfrequentUpdateOptions } = await import(
        "@/shared/caching/config"
      );
      const mockCreateInfrequentUpdateOptions = vi.mocked(
        createInfrequentUpdateOptions
      );

      const { result } = renderHook(() => useVesselVerbose(), {
        wrapper: createWrapper(),
      });

      expect(mockCreateInfrequentUpdateOptions).toHaveBeenCalled();

      await waitFor(() => {
        expect(result.current.isSuccess || result.current.isError).toBe(true);
      });
    });
  });

  describe("useVesselVerboseById", () => {
    it("should fetch vessel verbose data for specific vessel", async () => {
      const { getVesselVerboseById } = await import("@/api/wsf/vessels/api");
      const mockGetVesselVerboseById = vi.mocked(getVesselVerboseById);

      const mockVesselData = [
        {
          VesselID: 1,
          VesselName: "Walla Walla",
          VesselAbbrev: "WW",
          Class: {
            ClassID: 1,
            ClassName: "Jumbo Mark II",
            PublicDisplayName: "Jumbo Mark II Class",
          },
          Status: 1,
          OwnedByWSF: true,
          YearBuilt: 1973,
          Displacement: 6000,
          Length: "460",
          Beam: "89",
          Draft: "18",
          SpeedInKnots: 18,
          EngineCount: 4,
          Horsepower: 12000,
          MaxPassengerCount: 2000,
          RegDeckSpace: 200,
          TallDeckSpace: 0,
          Tonnage: 6000,
          PropulsionInfo: "Diesel Electric",
          ADAAccessible: true,
          Elevator: true,
          CarDeckRestroom: true,
          MainCabinGalley: true,
          MainCabinRestroom: true,
          PublicWifi: true,
          ADAInfo: "ADA accessible",
          VesselNameDesc: "M/V Walla Walla",
          VesselHistory: "Built in 1973",
          CityBuilt: "Seattle",
        },
      ];

      mockGetVesselVerboseById.mockResolvedValue(mockVesselData);

      const { result } = renderHook(() => useVesselVerboseById(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockVesselData);
      expect(mockGetVesselVerboseById).toHaveBeenCalledWith(1);
    });

    it("should be disabled when vesselId is falsy", () => {
      const { result } = renderHook(() => useVesselVerboseById(0), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.isFetching).toBe(false);
    });
  });

  describe("useCacheFlushDateVessels", () => {
    it("should fetch cache flush date successfully", async () => {
      const { getCacheFlushDateVessels } = await import(
        "@/api/wsf/vessels/api"
      );
      const mockGetCacheFlushDateVessels = vi.mocked(getCacheFlushDateVessels);

      const mockCacheFlushData = {
        lastUpdated: new Date("2024-01-01T12:00:00Z"),
        source: "vessels",
      };

      mockGetCacheFlushDateVessels.mockResolvedValue(mockCacheFlushData);

      const { result } = renderHook(() => useCacheFlushDateVessels(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockCacheFlushData);
      expect(mockGetCacheFlushDateVessels).toHaveBeenCalledTimes(1);
    });

    it("should use cache flush options", async () => {
      const { createCacheFlushOptions } = await import(
        "@/shared/caching/config"
      );
      const mockCreateCacheFlushOptions = vi.mocked(createCacheFlushOptions);

      const { result } = renderHook(() => useCacheFlushDateVessels(), {
        wrapper: createWrapper(),
      });

      expect(mockCreateCacheFlushOptions).toHaveBeenCalled();

      await waitFor(() => {
        expect(result.current.isSuccess || result.current.isError).toBe(true);
      });
    });
  });
});
