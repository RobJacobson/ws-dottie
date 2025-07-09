import { describe, expect, it, vi } from "vitest";

import {
  getVesselLocations,
  getVesselLocationsByVesselId,
} from "@/api/wsf/vessels/vesselLocations/api";

// Mock the fetch function
vi.mock("@/shared/fetching/fetch", () => ({
  fetchWsfArray: vi.fn(),
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

describe("VesselLocations API", () => {
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

      mockFetchWsfArray.mockResolvedValue(mockVesselData);

      const result = await getVesselLocations();

      expect(result).toEqual(mockVesselData);
      expect(result).toHaveLength(1);
      expect(result[0].vesselID).toBe(1);
      expect(result[0].vesselName).toBe("M/V Cathlamet");
    });

    it("should handle empty responses", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      const result = await getVesselLocations();

      expect(result).toEqual([]);
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

    it("should return vessel location data for specific vessel", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

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

      mockFetchWsfArray.mockResolvedValue(mockVesselData);

      const result = await getVesselLocationsByVesselId(1);

      expect(result).toEqual(mockVesselData);
      expect(result).toHaveLength(1);
      expect(result[0].vesselID).toBe(1);
      expect(result[0].vesselName).toBe("M/V Cathlamet");
    });
  });
});
