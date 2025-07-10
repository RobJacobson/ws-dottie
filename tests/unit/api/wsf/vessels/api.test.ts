import { describe, expect, it, vi } from "vitest";

import {
  getCacheFlushDateVessels,
  getVesselLocations,
  getVesselLocationsByVesselId,
  getVesselVerbose,
  getVesselVerboseById,
} from "@/api/wsf/vessels/api";

// Mock the fetch functions
vi.mock("@/shared/fetching/fetch", () => ({
  fetchWsfArray: vi.fn(),
  fetchWsf: vi.fn(),
}));

// Mock the URL builder
vi.mock("@/shared/fetching/dateUtils", () => ({
  buildWsfUrl: vi.fn((template: string, params: Record<string, any>) => {
    let url = template;
    for (const [key, value] of Object.entries(params)) {
      const placeholder = `{${key}}`;
      if (url.includes(placeholder)) {
        url = url.replace(placeholder, String(value));
      }
    }
    return url;
  }),
}));

describe("WSF Vessels API", () => {
  describe("getVesselLocations", () => {
    it("should have the correct function signature", () => {
      expect(typeof getVesselLocations).toBe("function");
      expect(getVesselLocations).toHaveLength(0);
    });

    it("should return a Promise", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);
      mockFetchWsfArray.mockResolvedValue([]);

      const result = getVesselLocations();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getVesselLocations();

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "vessels",
        "/vessellocations"
      );
    });

    it("should return vessel location data", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockVesselData = [
        {
          vesselId: 1,
          vesselName: "Walla Walla",
          latitude: 47.6062,
          longitude: -122.3321,
          speed: 12.5,
          heading: 180,
          lastUpdated: new Date("2024-01-01T12:00:00Z"),
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockVesselData);

      const result = await getVesselLocations();

      expect(result).toEqual(mockVesselData);
      expect(result).toHaveLength(1);
      expect(result[0].vesselId).toBe(1);
      expect(result[0].vesselName).toBe("Walla Walla");
      expect(result[0].latitude).toBe(47.6062);
    });

    it("should handle empty response", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      const result = await getVesselLocations();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe("getVesselLocationsByVesselId", () => {
    it("should have the correct function signature", () => {
      expect(typeof getVesselLocationsByVesselId).toBe("function");
      expect(getVesselLocationsByVesselId).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getVesselLocationsByVesselId(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getVesselLocationsByVesselId(1);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "vessels",
        "/vessellocations/1"
      );
    });

    it("should handle different vessel IDs", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getVesselLocationsByVesselId(2);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "vessels",
        "/vessellocations/2"
      );
    });

    it("should return vessel location data for specific ID", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockVesselData = [
        {
          vesselId: 1,
          vesselName: "Walla Walla",
          latitude: 47.6062,
          longitude: -122.3321,
          speed: 12.5,
          heading: 180,
          lastUpdated: new Date("2024-01-01T12:00:00Z"),
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockVesselData);

      const result = await getVesselLocationsByVesselId(1);

      expect(result).toEqual(mockVesselData);
      expect(result).toHaveLength(1);
      expect(result[0].vesselId).toBe(1);
      expect(result[0].vesselName).toBe("Walla Walla");
    });
  });

  describe("getVesselVerbose", () => {
    it("should have the correct function signature", () => {
      expect(typeof getVesselVerbose).toBe("function");
      expect(getVesselVerbose).toHaveLength(0);
    });

    it("should return a Promise", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);
      mockFetchWsfArray.mockResolvedValue([]);

      const result = getVesselVerbose();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getVesselVerbose();

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "vessels",
        "/vesselverbose"
      );
    });

    it("should return vessel verbose data", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockVesselData = [
        {
          vesselId: 1,
          vesselName: "Walla Walla",
          capacity: 2000,
          length: 460,
          beam: 89,
          draft: 18,
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockVesselData);

      const result = await getVesselVerbose();

      expect(result).toEqual(mockVesselData);
      expect(result).toHaveLength(1);
      expect(result[0].vesselId).toBe(1);
      expect(result[0].vesselName).toBe("Walla Walla");
      expect(result[0].capacity).toBe(2000);
    });
  });

  describe("getVesselVerboseById", () => {
    it("should have the correct function signature", () => {
      expect(typeof getVesselVerboseById).toBe("function");
      expect(getVesselVerboseById).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getVesselVerboseById(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getVesselVerboseById(1);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "vessels",
        "/vesselverbose/1"
      );
    });

    it("should handle different vessel IDs", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getVesselVerboseById(2);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "vessels",
        "/vesselverbose/2"
      );
    });

    it("should return vessel verbose data for specific ID", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockVesselData = [
        {
          vesselId: 1,
          vesselName: "Walla Walla",
          capacity: 2000,
          length: 460,
          beam: 89,
          draft: 18,
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockVesselData);

      const result = await getVesselVerboseById(1);

      expect(result).toEqual(mockVesselData);
      expect(result).toHaveLength(1);
      expect(result[0].vesselId).toBe(1);
      expect(result[0].vesselName).toBe("Walla Walla");
    });
  });

  describe("getCacheFlushDateVessels", () => {
    it("should have the correct function signature", () => {
      expect(typeof getCacheFlushDateVessels).toBe("function");
      expect(getCacheFlushDateVessels).toHaveLength(0);
    });

    it("should return a Promise", async () => {
      const { fetchWsf } = await import("@/shared/fetching/fetch");
      const mockFetchWsf = vi.mocked(fetchWsf);
      mockFetchWsf.mockResolvedValue({} as any);

      const result = getCacheFlushDateVessels();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsf with correct parameters", async () => {
      const { fetchWsf } = await import("@/shared/fetching/fetch");
      const mockFetchWsf = vi.mocked(fetchWsf);

      mockFetchWsf.mockResolvedValue({} as any);

      await getCacheFlushDateVessels();

      expect(mockFetchWsf).toHaveBeenCalledWith("vessels", "/cacheflushdate");
    });

    it("should return cache flush date data", async () => {
      const { fetchWsf } = await import("@/shared/fetching/fetch");
      const mockFetchWsf = vi.mocked(fetchWsf);

      const mockCacheFlushData = {
        lastUpdated: new Date("2024-01-01T12:00:00Z"),
        source: "vessels",
      };

      mockFetchWsf.mockResolvedValue(mockCacheFlushData);

      const result = await getCacheFlushDateVessels();

      expect(result).toEqual(mockCacheFlushData);
      expect(result.lastUpdated).toBeInstanceOf(Date);
      expect(result.source).toBe("vessels");
    });
  });
});
