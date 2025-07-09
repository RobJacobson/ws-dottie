import { describe, expect, it, vi } from "vitest";

import {
  getVesselVerbose,
  getVesselVerboseById,
} from "@/api/wsf/vessels/vesselVerbose/api";

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

describe("VesselVerbose API", () => {
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

      mockFetchWsfArray.mockResolvedValue(mockVesselData);

      const result = await getVesselVerbose();

      expect(result).toEqual(mockVesselData);
      expect(result).toHaveLength(1);
      expect(result[0].vesselId).toBe(1);
      expect(result[0].vesselName).toBe("M/V Cathlamet");
      expect(result[0].abbrev).toBe("CATH");
      expect(result[0].vesselClass).toBe("Jumbo Mark II");
    });

    it("should handle empty responses", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      const result = await getVesselVerbose();

      expect(result).toEqual([]);
    });

    it("should handle vessel specifications correctly", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockVesselData = [
        {
          vesselId: 1,
          vesselName: "M/V Cathlamet",
          length: 460,
          breadth: 89,
          draft: 18.5,
          carCapacity: 218,
          passengerCapacity: 2500,
          maxSpeed: 18,
          horsepower: 12000,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockVesselData);

      const result = await getVesselVerbose();
      const vessel = result[0];

      // Test vessel specifications
      expect(vessel.length).toBe(460); // feet
      expect(vessel.breadth).toBe(89); // feet
      expect(vessel.draft).toBe(18.5); // feet
      expect(vessel.carCapacity).toBe(218);
      expect(vessel.passengerCapacity).toBe(2500);
      expect(vessel.maxSpeed).toBe(18); // knots
      expect(vessel.horsepower).toBe(12000);
    });

    it("should handle vessel operational status correctly", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockVesselData = [
        {
          vesselId: 1,
          vesselName: "M/V Cathlamet",
          inService: true,
          active: true,
          homeTerminalId: 1,
          homeTerminalName: "Seattle",
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockVesselData);

      const result = await getVesselVerbose();
      const vessel = result[0];

      // Test operational status
      expect(vessel.inService).toBe(true);
      expect(vessel.active).toBe(true);
      expect(vessel.homeTerminalId).toBe(1);
      expect(vessel.homeTerminalName).toBe("Seattle");
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

    it("should return vessel verbose data for specific vessel", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

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

      mockFetchWsfArray.mockResolvedValue(mockVesselData);

      const result = await getVesselVerboseById(1);

      expect(result).toEqual(mockVesselData);
      expect(result).toHaveLength(1);
      expect(result[0].vesselId).toBe(1);
      expect(result[0].vesselName).toBe("M/V Cathlamet");
      expect(result[0].abbrev).toBe("CATH");
      expect(result[0].vesselClass).toBe("Jumbo Mark II");
    });
  });
});
