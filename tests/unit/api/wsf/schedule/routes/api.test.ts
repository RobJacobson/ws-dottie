import { describe, expect, it, vi } from "vitest";

import {
  getActiveSeasons,
  getAlerts,
  getRouteDetails,
  getRouteDetailsByRoute,
  getRouteDetailsByTerminals,
  getRoutes,
  getRoutesByTerminals,
  getRoutesWithDisruptions,
  getScheduledRoutes,
  getScheduledRoutesBySeason,
} from "@/api/wsf/schedule/routes/api";

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
        // Format dates as YYYY-MM-DD
        if (value instanceof Date) {
          const year = value.getFullYear();
          const month = String(value.getMonth() + 1).padStart(2, "0");
          const day = String(value.getDate()).padStart(2, "0");
          url = url.replace(placeholder, `${year}-${month}-${day}`);
        } else {
          url = url.replace(placeholder, String(value));
        }
      }
    }
    return url;
  }),
}));

describe("Schedule Routes API", () => {
  const testDate = new Date(2024, 3, 1); // April 1, 2024 (month is 0-indexed)

  describe("getRoutes", () => {
    it("should have the correct function signature", () => {
      expect(typeof getRoutes).toBe("function");
      expect(getRoutes).toHaveLength(1);
    });

    it("should return a Promise", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);
      mockFetchWsfArray.mockResolvedValue([]);

      const result = getRoutes(testDate);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getRoutes(testDate);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        "/routes/2024-04-01"
      );
    });

    it("should return route data", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockRouteData = [
        {
          routeId: 1,
          routeName: "Anacortes / Friday Harbor",
          departingTerminalId: 7,
          arrivingTerminalId: 8,
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockRouteData);

      const result = await getRoutes(testDate);

      expect(result).toEqual(mockRouteData);
      expect(result).toHaveLength(1);
      expect(result[0].routeId).toBe(1);
      expect(result[0].routeName).toBe("Anacortes / Friday Harbor");
    });
  });

  describe("getRoutesByTerminals", () => {
    it("should have the correct function signature", () => {
      expect(typeof getRoutesByTerminals).toBe("function");
      expect(getRoutesByTerminals).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getRoutesByTerminals({
        tripDate: testDate,
        departingTerminalId: 7,
        arrivingTerminalId: 8,
      });
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getRoutesByTerminals({
        tripDate: testDate,
        departingTerminalId: 7,
        arrivingTerminalId: 8,
      });

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        "/routes/2024-04-01/7/8"
      );
    });

    it("should return route data for specific terminals", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockRouteData = [
        {
          routeId: 1,
          routeName: "Anacortes / Friday Harbor",
          departingTerminalId: 7,
          arrivingTerminalId: 8,
          isActive: true,
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockRouteData);

      const result = await getRoutesByTerminals({
        tripDate: testDate,
        departingTerminalId: 7,
        arrivingTerminalId: 8,
      });

      expect(result).toEqual(mockRouteData);
      expect(result).toHaveLength(1);
      expect(result[0].routeId).toBe(1);
      expect(result[0].departingTerminalId).toBe(7);
      expect(result[0].arrivingTerminalId).toBe(8);
    });
  });

  describe("getRoutesWithDisruptions", () => {
    it("should have the correct function signature", () => {
      expect(typeof getRoutesWithDisruptions).toBe("function");
      expect(getRoutesWithDisruptions).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getRoutesWithDisruptions(testDate);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getRoutesWithDisruptions(testDate);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        "/routeshavingservicedisruptions/2024-04-01"
      );
    });

    it("should return routes with disruptions", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockRouteData = [
        {
          routeId: 1,
          routeName: "Anacortes / Friday Harbor",
          hasDisruption: true,
          disruptionReason: "Weather",
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockRouteData);

      const result = await getRoutesWithDisruptions(testDate);

      expect(result).toEqual(mockRouteData);
      expect(result).toHaveLength(1);
      expect(result[0].hasDisruption).toBe(true);
    });
  });

  describe("getRouteDetails", () => {
    it("should have the correct function signature", () => {
      expect(typeof getRouteDetails).toBe("function");
      expect(getRouteDetails).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getRouteDetails(testDate);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getRouteDetails(testDate);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        "/routedetails/2024-04-01"
      );
    });

    it("should return detailed route data", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      const mockRouteData = [
        {
          routeId: 1,
          routeName: "Anacortes / Friday Harbor",
          vesselId: 1,
          vesselName: "Walla Walla",
          departureTime: new Date("2024-04-01T10:00:00Z"),
          arrivalTime: new Date("2024-04-01T11:30:00Z"),
        },
      ];

      mockFetchWsfArray.mockResolvedValue(mockRouteData);

      const result = await getRouteDetails(testDate);

      expect(result).toEqual(mockRouteData);
      expect(result).toHaveLength(1);
      expect(result[0].routeId).toBe(1);
      expect(result[0].vesselName).toBe("Walla Walla");
    });
  });

  describe("getRouteDetailsByTerminals", () => {
    it("should have the correct function signature", () => {
      expect(typeof getRouteDetailsByTerminals).toBe("function");
      expect(getRouteDetailsByTerminals).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getRouteDetailsByTerminals({
        tripDate: testDate,
        departingTerminalId: 7,
        arrivingTerminalId: 8,
      });
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getRouteDetailsByTerminals({
        tripDate: testDate,
        departingTerminalId: 7,
        arrivingTerminalId: 8,
      });

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        "/routedetails/2024-04-01/7/8"
      );
    });
  });

  describe("getRouteDetailsByRoute", () => {
    it("should have the correct function signature", () => {
      expect(typeof getRouteDetailsByRoute).toBe("function");
      expect(getRouteDetailsByRoute).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getRouteDetailsByRoute({
        tripDate: testDate,
        routeId: 1,
      });
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getRouteDetailsByRoute({
        tripDate: testDate,
        routeId: 1,
      });

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        "/routedetails/2024-04-01/1"
      );
    });
  });

  describe("getScheduledRoutes", () => {
    it("should have the correct function signature", () => {
      expect(typeof getScheduledRoutes).toBe("function");
      expect(getScheduledRoutes).toHaveLength(0);
    });

    it("should return a Promise", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);
      mockFetchWsfArray.mockResolvedValue([]);

      const result = getScheduledRoutes();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getScheduledRoutes();

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        "/schedroutes"
      );
    });
  });

  describe("getScheduledRoutesBySeason", () => {
    it("should have the correct function signature", () => {
      expect(typeof getScheduledRoutesBySeason).toBe("function");
      expect(getScheduledRoutesBySeason).toHaveLength(1);
    });

    it("should return a Promise", () => {
      const result = getScheduledRoutesBySeason(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getScheduledRoutesBySeason(1);

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        "/schedroutes/1"
      );
    });
  });

  describe("getActiveSeasons", () => {
    it("should have the correct function signature", () => {
      expect(typeof getActiveSeasons).toBe("function");
      expect(getActiveSeasons).toHaveLength(0);
    });

    it("should return a Promise", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);
      mockFetchWsfArray.mockResolvedValue([]);

      const result = getActiveSeasons();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getActiveSeasons();

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        "/activeseasons"
      );
    });
  });

  describe("getAlerts", () => {
    it("should have the correct function signature", () => {
      expect(typeof getAlerts).toBe("function");
      expect(getAlerts).toHaveLength(0);
    });

    it("should return a Promise", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);
      mockFetchWsfArray.mockResolvedValue([]);

      const result = getAlerts();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should call fetchWsfArray with correct parameters", async () => {
      const { fetchWsfArray } = await import("@/shared/fetching/fetch");
      const mockFetchWsfArray = vi.mocked(fetchWsfArray);

      mockFetchWsfArray.mockResolvedValue([]);

      await getAlerts();

      expect(mockFetchWsfArray).toHaveBeenCalledWith("schedule", "/alerts");
    });
  });
});
