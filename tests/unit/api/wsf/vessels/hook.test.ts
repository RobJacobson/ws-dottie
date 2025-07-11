import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import * as React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  useCacheFlushDateVessels,
  useVesselAccommodations,
  useVesselAccommodationsById,
  useVesselBasics,
  useVesselBasicsById,
  useVesselHistory,
  useVesselHistoryByVesselAndDateRange,
  useVesselLocations,
  useVesselLocationsByVesselId,
  useVesselStats,
  useVesselStatsById,
  useVesselVerbose,
  useVesselVerboseById,
} from "@/api/wsf/vessels/hook";

// Mock the API functions
vi.mock("@/api/wsf/vessels/api", () => ({
  getVesselBasics: vi.fn(),
  getVesselBasicsById: vi.fn(),
  getVesselAccommodations: vi.fn(),
  getVesselAccommodationsById: vi.fn(),
  getVesselLocations: vi.fn(),
  getVesselLocationsByVesselId: vi.fn(),
  getVesselStats: vi.fn(),
  getVesselStatsById: vi.fn(),
  getVesselHistory: vi.fn(),
  getVesselHistoryByVesselAndDateRange: vi.fn(),
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
    gcTime: 1209600000, // 2 weeks instead of 1 month to avoid timeout overflow
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
          Mmsi: 366772750,
          DepartingTerminalID: 7,
          DepartingTerminalName: "Anacortes",
          DepartingTerminalAbbrev: "ANA",
          ArrivingTerminalID: 8,
          ArrivingTerminalName: "Friday Harbor",
          ArrivingTerminalAbbrev: "FRH",
          Latitude: 47.6062,
          Longitude: -122.3321,
          Speed: 12.5,
          Heading: 180,
          InService: true,
          AtDock: false,
          LeftDock: null,
          Eta: null,
          EtaBasis: null,
          ScheduledDeparture: "/Date(1752203400000-0700)/",
          OpRouteAbbrev: ["ana-frh"],
          VesselPositionNum: 1,
          SortSeq: 20,
          ManagedBy: 1,
          TimeStamp: "/Date(1752177066000-0700)/",
          VesselWatchShutID: 0,
          VesselWatchShutMsg: "",
          VesselWatchShutFlag: "0",
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
      // Fix: mock API to return minimal valid value
      const { getVesselLocations } = await import("@/api/wsf/vessels/api");
      vi.mocked(getVesselLocations).mockResolvedValue([]);

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

      const mockVesselData = {
        VesselID: 1,
        VesselName: "Walla Walla",
        Mmsi: 366772750,
        DepartingTerminalID: 7,
        DepartingTerminalName: "Anacortes",
        DepartingTerminalAbbrev: "ANA",
        ArrivingTerminalID: 8,
        ArrivingTerminalName: "Friday Harbor",
        ArrivingTerminalAbbrev: "FRH",
        Latitude: 47.6062,
        Longitude: -122.3321,
        Speed: 12.5,
        Heading: 180,
        InService: true,
        AtDock: false,
        LeftDock: null,
        Eta: null,
        EtaBasis: null,
        ScheduledDeparture: "/Date(1752203400000-0700)/",
        OpRouteAbbrev: ["ana-frh"],
        VesselPositionNum: 1,
        SortSeq: 20,
        ManagedBy: 1,
        TimeStamp: "/Date(1752177066000-0700)/",
        VesselWatchShutID: 0,
        VesselWatchShutMsg: "",
        VesselWatchShutFlag: "0",
      };

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
            ClassSubjectID: 100,
            ClassName: "Jumbo Mark II",
            SortSeq: 1,
            DrawingImg: "https://example.com/drawing.png",
            SilhouetteImg: "https://example.com/silhouette.png",
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
      // Fix: mock API to return minimal valid value
      const { getVesselVerbose } = await import("@/api/wsf/vessels/api");
      vi.mocked(getVesselVerbose).mockResolvedValue([]);

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

      const mockVesselData = {
        VesselID: 1,
        VesselName: "Walla Walla",
        VesselAbbrev: "WW",
        Class: {
          ClassID: 1,
          ClassSubjectID: 100,
          ClassName: "Jumbo Mark II",
          SortSeq: 1,
          DrawingImg: "https://example.com/drawing.png",
          SilhouetteImg: "https://example.com/silhouette.png",
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
      };

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

      const mockCacheFlushData = new Date("2024-01-01T12:00:00Z");

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
      // Fix: mock API to return minimal valid value
      const { getCacheFlushDateVessels } = await import(
        "@/api/wsf/vessels/api"
      );
      vi.mocked(getCacheFlushDateVessels).mockResolvedValue(new Date());

      const { result } = renderHook(() => useCacheFlushDateVessels(), {
        wrapper: createWrapper(),
      });

      expect(mockCreateCacheFlushOptions).toHaveBeenCalled();

      await waitFor(() => {
        expect(result.current.isSuccess || result.current.isError).toBe(true);
      });
    });
  });

  // ============================================================================
  // NEW HOOK TESTS
  // ============================================================================

  describe("useVesselBasics", () => {
    it("should fetch vessel basics successfully", async () => {
      const { getVesselBasics } = await import("@/api/wsf/vessels/api");
      const mockGetVesselBasics = vi.mocked(getVesselBasics);

      const mockVesselData = [
        {
          VesselID: 1,
          VesselSubjectID: 1,
          VesselName: "Cathlamet",
          VesselAbbrev: "CAT",
          Class: {
            ClassID: 10,
            ClassSubjectID: 310,
            ClassName: "Issaquah 130",
            SortSeq: 40,
            DrawingImg:
              "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130.gif",
            SilhouetteImg:
              "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130-sillouette_sml.gif",
            PublicDisplayName: "Issaquah",
          },
          Status: 1,
          OwnedByWSF: true,
        },
      ];

      mockGetVesselBasics.mockResolvedValue(mockVesselData);

      const { result } = renderHook(() => useVesselBasics(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockVesselData);
      expect(mockGetVesselBasics).toHaveBeenCalledTimes(1);
    });

    it("should use infrequent update options", async () => {
      const { createInfrequentUpdateOptions } = await import(
        "@/shared/caching/config"
      );
      const mockCreateInfrequentUpdateOptions = vi.mocked(
        createInfrequentUpdateOptions
      );
      // Fix: mock API to return minimal valid value
      const { getVesselBasics } = await import("@/api/wsf/vessels/api");
      vi.mocked(getVesselBasics).mockResolvedValue([]);

      const { result } = renderHook(() => useVesselBasics(), {
        wrapper: createWrapper(),
      });

      expect(mockCreateInfrequentUpdateOptions).toHaveBeenCalled();

      await waitFor(() => {
        expect(result.current.isSuccess || result.current.isError).toBe(true);
      });
    });
  });

  describe("useVesselBasicsById", () => {
    it("should fetch vessel basics for specific vessel", async () => {
      const { getVesselBasicsById } = await import("@/api/wsf/vessels/api");
      const mockGetVesselBasicsById = vi.mocked(getVesselBasicsById);

      const mockVesselData = {
        VesselID: 1,
        VesselSubjectID: 1,
        VesselName: "Cathlamet",
        VesselAbbrev: "CAT",
        Class: {
          ClassID: 10,
          ClassSubjectID: 310,
          ClassName: "Issaquah 130",
          SortSeq: 40,
          DrawingImg:
            "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130.gif",
          SilhouetteImg:
            "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130-sillouette_sml.gif",
          PublicDisplayName: "Issaquah",
        },
        Status: 1,
        OwnedByWSF: true,
      };

      mockGetVesselBasicsById.mockResolvedValue(mockVesselData);

      const { result } = renderHook(() => useVesselBasicsById(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockVesselData);
      expect(mockGetVesselBasicsById).toHaveBeenCalledWith(1);
    });

    it("should be disabled when vesselId is falsy", () => {
      const { result } = renderHook(() => useVesselBasicsById(0), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.isFetching).toBe(false);
    });
  });

  describe("useVesselAccommodations", () => {
    it("should fetch vessel accommodations successfully", async () => {
      const { getVesselAccommodations } = await import("@/api/wsf/vessels/api");
      const mockGetVesselAccommodations = vi.mocked(getVesselAccommodations);

      const mockAccommodationData = [
        {
          VesselID: 1,
          VesselSubjectID: 1,
          VesselName: "Cathlamet",
          VesselAbbrev: "CAT",
          Class: {
            ClassID: 10,
            ClassSubjectID: 310,
            ClassName: "Issaquah 130",
            SortSeq: 40,
            DrawingImg:
              "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130.gif",
            SilhouetteImg:
              "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130-sillouette_sml.gif",
            PublicDisplayName: "Issaquah",
          },
          CarDeckRestroom: true,
          CarDeckShelter: false,
          Elevator: true,
          ADAAccessible: true,
          MainCabinGalley: true,
          MainCabinRestroom: true,
          PublicWifi: false,
          ADAInfo:
            "The MV Cathlamet has elevator access from the auto deck to the passenger deck.",
          AdditionalInfo: " ",
        },
      ];

      mockGetVesselAccommodations.mockResolvedValue(mockAccommodationData);

      const { result } = renderHook(() => useVesselAccommodations(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockAccommodationData);
      expect(mockGetVesselAccommodations).toHaveBeenCalledTimes(1);
    });

    it("should use infrequent update options", async () => {
      const { createInfrequentUpdateOptions } = await import(
        "@/shared/caching/config"
      );
      const mockCreateInfrequentUpdateOptions = vi.mocked(
        createInfrequentUpdateOptions
      );
      // Fix: mock API to return minimal valid value
      const { getVesselAccommodations } = await import("@/api/wsf/vessels/api");
      vi.mocked(getVesselAccommodations).mockResolvedValue([]);

      const { result } = renderHook(() => useVesselAccommodations(), {
        wrapper: createWrapper(),
      });

      expect(mockCreateInfrequentUpdateOptions).toHaveBeenCalled();

      await waitFor(() => {
        expect(result.current.isSuccess || result.current.isError).toBe(true);
      });
    });
  });

  describe("useVesselAccommodationsById", () => {
    it("should fetch vessel accommodations for specific vessel", async () => {
      const { getVesselAccommodationsById } = await import(
        "@/api/wsf/vessels/api"
      );
      const mockGetVesselAccommodationsById = vi.mocked(
        getVesselAccommodationsById
      );

      const mockAccommodationData = {
        VesselID: 1,
        VesselSubjectID: 1,
        VesselName: "Cathlamet",
        VesselAbbrev: "CAT",
        Class: {
          ClassID: 10,
          ClassSubjectID: 310,
          ClassName: "Issaquah 130",
          SortSeq: 40,
          DrawingImg:
            "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130.gif",
          SilhouetteImg:
            "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130-sillouette_sml.gif",
          PublicDisplayName: "Issaquah",
        },
        CarDeckRestroom: true,
        CarDeckShelter: false,
        Elevator: true,
        ADAAccessible: true,
        MainCabinGalley: true,
        MainCabinRestroom: true,
        PublicWifi: false,
        ADAInfo:
          "The MV Cathlamet has elevator access from the auto deck to the passenger deck.",
        AdditionalInfo: " ",
      };

      mockGetVesselAccommodationsById.mockResolvedValue(mockAccommodationData);

      const { result } = renderHook(() => useVesselAccommodationsById(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockAccommodationData);
      expect(mockGetVesselAccommodationsById).toHaveBeenCalledWith(1);
    });

    it("should be disabled when vesselId is falsy", () => {
      const { result } = renderHook(() => useVesselAccommodationsById(0), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.isFetching).toBe(false);
    });
  });

  describe("useVesselStats", () => {
    it("should fetch vessel stats successfully", async () => {
      const { getVesselStats } = await import("@/api/wsf/vessels/api");
      const mockGetVesselStats = vi.mocked(getVesselStats);

      const mockStatsData = [
        {
          VesselID: 1,
          VesselSubjectID: 1,
          VesselName: "Cathlamet",
          VesselAbbrev: "CAT",
          Class: {
            ClassID: 10,
            ClassSubjectID: 310,
            ClassName: "Issaquah 130",
            SortSeq: 40,
            DrawingImg:
              "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130.gif",
            SilhouetteImg:
              "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130-sillouette_sml.gif",
            PublicDisplayName: "Issaquah",
          },
          VesselNameDesc: "The Cathlamet is a Jumbo Mark II class ferry",
          VesselHistory:
            "Built in 1979, the Cathlamet has served the WSF fleet for over 40 years",
          Beam: "78 feet",
          CityBuilt: "Seattle, WA",
          SpeedInKnots: 18,
          Draft: "16 feet",
          EngineCount: 4,
          Horsepower: 12000,
          Length: "328 feet",
          MaxPassengerCount: 1500,
          PassengerOnly: false,
          FastFerry: false,
          PropulsionInfo: "Four diesel engines driving four propellers",
          TallDeckClearance: 0,
          RegDeckSpace: 90,
          TallDeckSpace: 0,
          Tonnage: 2500,
          Displacement: 2500,
          YearBuilt: 1979,
          YearRebuilt: 2005,
          VesselDrawingImg:
            "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/cathlamet.gif",
          SolasCertified: true,
          MaxPassengerCountForInternational: 1500,
        },
      ];

      mockGetVesselStats.mockResolvedValue(mockStatsData);

      const { result } = renderHook(() => useVesselStats(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockStatsData);
      expect(mockGetVesselStats).toHaveBeenCalledTimes(1);
    });

    it("should use infrequent update options", async () => {
      const { createInfrequentUpdateOptions } = await import(
        "@/shared/caching/config"
      );
      const mockCreateInfrequentUpdateOptions = vi.mocked(
        createInfrequentUpdateOptions
      );
      // Fix: mock API to return minimal valid value
      const { getVesselStats } = await import("@/api/wsf/vessels/api");
      vi.mocked(getVesselStats).mockResolvedValue([]);

      const { result } = renderHook(() => useVesselStats(), {
        wrapper: createWrapper(),
      });

      expect(mockCreateInfrequentUpdateOptions).toHaveBeenCalled();

      await waitFor(() => {
        expect(result.current.isSuccess || result.current.isError).toBe(true);
      });
    });
  });

  describe("useVesselStatsById", () => {
    it("should fetch vessel stats for specific vessel", async () => {
      const { getVesselStatsById } = await import("@/api/wsf/vessels/api");
      const mockGetVesselStatsById = vi.mocked(getVesselStatsById);

      const mockStatsData = {
        VesselID: 1,
        VesselSubjectID: 1,
        VesselName: "Cathlamet",
        VesselAbbrev: "CAT",
        Class: {
          ClassID: 10,
          ClassSubjectID: 310,
          ClassName: "Issaquah 130",
          SortSeq: 40,
          DrawingImg:
            "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130.gif",
          SilhouetteImg:
            "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130-sillouette_sml.gif",
          PublicDisplayName: "Issaquah",
        },
        VesselNameDesc: "The Cathlamet is a Jumbo Mark II class ferry",
        VesselHistory:
          "Built in 1979, the Cathlamet has served the WSF fleet for over 40 years",
        Beam: "78 feet",
        CityBuilt: "Seattle, WA",
        SpeedInKnots: 18,
        Draft: "16 feet",
        EngineCount: 4,
        Horsepower: 12000,
        Length: "328 feet",
        MaxPassengerCount: 1500,
        PassengerOnly: false,
        FastFerry: false,
        PropulsionInfo: "Four diesel engines driving four propellers",
        TallDeckClearance: 0,
        RegDeckSpace: 90,
        TallDeckSpace: 0,
        Tonnage: 2500,
        Displacement: 2500,
        YearBuilt: 1979,
        YearRebuilt: 2005,
        VesselDrawingImg:
          "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/cathlamet.gif",
        SolasCertified: true,
        MaxPassengerCountForInternational: 1500,
      };

      mockGetVesselStatsById.mockResolvedValue(mockStatsData);

      const { result } = renderHook(() => useVesselStatsById(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockStatsData);
      expect(mockGetVesselStatsById).toHaveBeenCalledWith(1);
    });

    it("should be disabled when vesselId is falsy", () => {
      const { result } = renderHook(() => useVesselStatsById(0), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.isFetching).toBe(false);
    });
  });

  describe("useVesselHistory", () => {
    it("should fetch vessel history successfully", async () => {
      const { getVesselHistory } = await import("@/api/wsf/vessels/api");
      const mockGetVesselHistory = vi.mocked(getVesselHistory);

      const mockHistoryData = [
        {
          VesselId: 1,
          Vessel: "Cathlamet",
          Departing: "Anacortes",
          Arriving: "Friday Harbor",
          ScheduledDepart: new Date("2024-01-01T12:00:00Z"),
          ActualDepart: new Date("2024-01-01T12:05:00Z"),
          EstArrival: new Date("2024-01-01T13:00:00Z"),
          Date: new Date("2024-01-01T12:00:00Z"),
        },
      ];

      mockGetVesselHistory.mockResolvedValue(mockHistoryData);

      const { result } = renderHook(() => useVesselHistory(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockHistoryData);
      expect(mockGetVesselHistory).toHaveBeenCalledTimes(1);
    });

    it("should use infrequent update options", async () => {
      const { createInfrequentUpdateOptions } = await import(
        "@/shared/caching/config"
      );
      const mockCreateInfrequentUpdateOptions = vi.mocked(
        createInfrequentUpdateOptions
      );
      // Fix: mock API to return minimal valid value
      const { getVesselHistory } = await import("@/api/wsf/vessels/api");
      vi.mocked(getVesselHistory).mockResolvedValue([]);

      const { result } = renderHook(() => useVesselHistory(), {
        wrapper: createWrapper(),
      });

      expect(mockCreateInfrequentUpdateOptions).toHaveBeenCalled();

      await waitFor(() => {
        expect(result.current.isSuccess || result.current.isError).toBe(true);
      });
    });
  });

  describe("useVesselHistoryByVesselAndDateRange", () => {
    it("should fetch vessel history for specific vessel and date range", async () => {
      const { getVesselHistoryByVesselAndDateRange } = await import(
        "@/api/wsf/vessels/api"
      );
      const mockGetVesselHistoryByVesselAndDateRange = vi.mocked(
        getVesselHistoryByVesselAndDateRange
      );

      const mockHistoryData = [
        {
          VesselId: 1,
          Vessel: "Cathlamet",
          Departing: "Anacortes",
          Arriving: "Friday Harbor",
          ScheduledDepart: new Date("2024-01-01T12:00:00Z"),
          ActualDepart: new Date("2024-01-01T12:05:00Z"),
          EstArrival: new Date("2024-01-01T13:00:00Z"),
          Date: new Date("2024-01-01T12:00:00Z"),
        },
      ];

      const vesselName = "Cathlamet";
      const dateStart = "2024-01-01";
      const dateEnd = "2024-01-31";

      mockGetVesselHistoryByVesselAndDateRange.mockResolvedValue(
        mockHistoryData
      );

      const { result } = renderHook(
        () =>
          useVesselHistoryByVesselAndDateRange(vesselName, dateStart, dateEnd),
        {
          wrapper: createWrapper(),
        }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockHistoryData);
      expect(mockGetVesselHistoryByVesselAndDateRange).toHaveBeenCalledWith(
        vesselName,
        dateStart,
        dateEnd
      );
    });

    it("should be disabled when parameters are falsy", () => {
      const { result } = renderHook(
        () => useVesselHistoryByVesselAndDateRange("", "", ""),
        {
          wrapper: createWrapper(),
        }
      );

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.isFetching).toBe(false);
    });
  });
});
