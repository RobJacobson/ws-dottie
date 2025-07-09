import { describe, expect, it, vi } from "vitest";

import {
  getTerminalLocations,
  getTerminalLocationsByTerminalId,
} from "@/api/wsf/terminals/terminalLocations/api";

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

describe("TerminalLocations API", () => {
  describe("getTerminalLocations", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalLocations).toBe("function");
      expect(getTerminalLocations).toHaveLength(0);
    });

    it("should return a Promise", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);
      mockFetchWsfArray.mockResolvedValue([]);

      const result = getTerminalLocations();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalLocations();

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminallocations"
      );
    });

    it("should return terminal location data", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

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

      mockFetchWsfArray.mockResolvedValue(mockLocationData);

      const result = await getTerminalLocations();

      expect(result).toEqual(mockLocationData);
      expect(result).toHaveLength(1);
      expect(result[0].terminalId).toBe(7);
      expect(result[0].terminalName).toBe("Anacortes");
      expect(result[0].latitude).toBe(48.5123);
      expect(result[0].longitude).toBe(-122.6123);
    });

    it("should handle empty responses", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      const result = await getTerminalLocations();

      expect(result).toEqual([]);
    });

    it("should handle terminal location data correctly", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

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

      mockFetchWsfArray.mockResolvedValue(mockLocationData);

      const result = await getTerminalLocations();
      const location = result[0];

      // Test location data
      expect(location.latitude).toBe(48.5123);
      expect(location.longitude).toBe(-122.6123);
      expect(location.gisZoomLocation.latitude).toBe(48.5123);
      expect(location.gisZoomLocation.longitude).toBe(-122.6123);
      expect(location.gisZoomLocation.zoomLevel).toBe(15);
    });

    it("should handle terminal address information correctly", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

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

      mockFetchWsfArray.mockResolvedValue(mockLocationData);

      const result = await getTerminalLocations();
      const location = result[0];

      // Test address information
      expect(location.address).toBe(
        "2100 Ferry Terminal Rd, Anacortes, WA 98221"
      );
      expect(location.city).toBe("Anacortes");
      expect(location.state).toBe("WA");
      expect(location.zipCode).toBe("98221");
      expect(location.county).toBe("Skagit");
    });

    it("should handle multiple terminals correctly", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

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
        {
          terminalId: 8,
          terminalName: "Friday Harbor",
          latitude: 48.5342,
          longitude: -123.0171,
          address: "1 Front St, Friday Harbor, WA 98250",
          city: "Friday Harbor",
          state: "WA",
          zipCode: "98250",
          county: "San Juan",
          gisZoomLocation: {
            latitude: 48.5342,
            longitude: -123.0171,
            zoomLevel: 15,
          },
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockLocationData);

      const result = await getTerminalLocations();

      expect(result).toHaveLength(2);
      expect(result[0].terminalId).toBe(7);
      expect(result[1].terminalId).toBe(8);
      expect(result[0].terminalName).toBe("Anacortes");
      expect(result[1].terminalName).toBe("Friday Harbor");
    });
  });

  describe("getTerminalLocationsByTerminalId", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalLocationsByTerminalId).toBe("function");
      expect(getTerminalLocationsByTerminalId).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getTerminalLocationsByTerminalId(7);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalLocationsByTerminalId(7);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminallocations/7"
      );
    });

    it("should handle different terminal IDs", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getTerminalLocationsByTerminalId(8);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "terminals",
        "/terminallocations/8"
      );
    });

    it("should return terminal location data for specific terminal", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

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

      mockFetchWsfArray.mockResolvedValue(mockLocationData);

      const result = await getTerminalLocationsByTerminalId(7);

      expect(result).toEqual(mockLocationData);
      expect(result).toHaveLength(1);
      expect(result[0].terminalId).toBe(7);
      expect(result[0].terminalName).toBe("Anacortes");
      expect(result[0].latitude).toBe(48.5123);
      expect(result[0].longitude).toBe(-122.6123);
    });
  });
});
