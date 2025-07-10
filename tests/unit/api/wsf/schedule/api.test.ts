import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  getActiveSeasons,
  getAlerts,
  getAllSailings,
  getCacheFlushDateSchedule,
  getRouteDetails,
  getRouteDetailsByRoute,
  getRouteDetailsByTerminals,
  getRoutes,
  getRoutesByTerminals,
  getRoutesWithDisruptions,
  getSailings,
  getScheduleByRoute,
  getScheduleByTerminals,
  getScheduledRoutes,
  getScheduledRoutesBySeason,
  getScheduleTodayByRoute,
  getScheduleTodayByTerminals,
  getTerminalMates,
  getTerminals,
  getTerminalsAndMates,
  getTerminalsByRoute,
  getTimeAdjustments,
  getTimeAdjustmentsByRoute,
  getTimeAdjustmentsBySchedRoute,
  getValidDateRange,
  getVessels,
  getVesselsByRoute,
} from "@/api/wsf/schedule/api";
import { buildWsfUrl } from "@/shared/fetching/dateUtils";
import { fetchWsf, fetchWsfArray } from "@/shared/fetching/fetch";

// Mock the fetch functions
vi.mock("@/shared/fetching/fetch");
vi.mock("@/shared/fetching/dateUtils");

const mockFetchWsfArray = vi.mocked(fetchWsfArray);
const mockFetchWsf = vi.mocked(fetchWsf);
const mockBuildWsfUrl = vi.mocked(buildWsfUrl);

describe("WSF Schedule API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockBuildWsfUrl.mockImplementation((path, params) => {
      if (params) {
        return `https://www.wsdot.wa.gov/ferries/api/schedule/rest${path}`;
      }
      return `https://www.wsdot.wa.gov/ferries/api/schedule/rest${path}`;
    });
  });

  describe("Routes API", () => {
    it("should call getRoutes with correct parameters", async () => {
      const tripDate = new Date("2024-04-01");
      const mockRoutes = [{ routeId: 1, routeName: "Test Route" }];
      mockFetchWsfArray.mockResolvedValue(mockRoutes);

      const result = await getRoutes(tripDate);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith("/routes/{tripDate}", {
        tripDate,
      });
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockRoutes);
    });

    it("should call getRoutesByTerminals with correct parameters", async () => {
      const params = {
        tripDate: new Date("2024-04-01"),
        departingTerminalId: 7,
        arrivingTerminalId: 8,
      };
      const mockRoutes = [{ routeId: 1, routeName: "Test Route" }];
      mockFetchWsfArray.mockResolvedValue(mockRoutes);

      const result = await getRoutesByTerminals(params);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith(
        "/routes/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
        params
      );
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockRoutes);
    });

    it("should call getRoutesWithDisruptions with correct parameters", async () => {
      const tripDate = new Date("2024-04-01");
      const mockRoutes = [{ routeId: 1, routeName: "Test Route" }];
      mockFetchWsfArray.mockResolvedValue(mockRoutes);

      const result = await getRoutesWithDisruptions(tripDate);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith(
        "/routeshavingservicedisruptions/{tripDate}",
        { tripDate }
      );
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockRoutes);
    });

    it("should call getRouteDetails with correct parameters", async () => {
      const tripDate = new Date("2024-04-01");
      const mockRoutes = [{ routeId: 1, routeName: "Test Route" }];
      mockFetchWsfArray.mockResolvedValue(mockRoutes);

      const result = await getRouteDetails(tripDate);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith("/routedetails/{tripDate}", {
        tripDate,
      });
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockRoutes);
    });

    it("should call getRouteDetailsByTerminals with correct parameters", async () => {
      const params = {
        tripDate: new Date("2024-04-01"),
        departingTerminalId: 7,
        arrivingTerminalId: 8,
      };
      const mockRoutes = [{ routeId: 1, routeName: "Test Route" }];
      mockFetchWsfArray.mockResolvedValue(mockRoutes);

      const result = await getRouteDetailsByTerminals(params);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith(
        "/routedetails/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
        params
      );
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockRoutes);
    });

    it("should call getRouteDetailsByRoute with correct parameters", async () => {
      const params = {
        tripDate: new Date("2024-04-01"),
        routeId: 1,
      };
      const mockRoutes = [{ routeId: 1, routeName: "Test Route" }];
      mockFetchWsfArray.mockResolvedValue(mockRoutes);

      const result = await getRouteDetailsByRoute(params);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith(
        "/routedetails/{tripDate}/{routeId}",
        params
      );
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockRoutes);
    });

    it("should call getScheduledRoutes", async () => {
      const mockRoutes = [{ routeId: 1, routeName: "Test Route" }];
      mockFetchWsfArray.mockResolvedValue(mockRoutes);

      const result = await getScheduledRoutes();

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        "/schedroutes"
      );
      expect(result).toEqual(mockRoutes);
    });

    it("should call getScheduledRoutesBySeason with correct parameters", async () => {
      const seasonId = 1;
      const mockRoutes = [{ routeId: 1, routeName: "Test Route" }];
      mockFetchWsfArray.mockResolvedValue(mockRoutes);

      const result = await getScheduledRoutesBySeason(seasonId);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith("/schedroutes/{seasonId}", {
        seasonId,
      });
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockRoutes);
    });

    it("should call getActiveSeasons", async () => {
      const mockSeasons = [{ seasonId: 1, seasonName: "Test Season" }];
      mockFetchWsfArray.mockResolvedValue(mockSeasons);

      const result = await getActiveSeasons();

      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        "/activeseasons"
      );
      expect(result).toEqual(mockSeasons);
    });

    it("should call getAlerts", async () => {
      const mockAlerts = [{ alertId: 1, alertMessage: "Test Alert" }];
      mockFetchWsfArray.mockResolvedValue(mockAlerts);

      const result = await getAlerts();

      expect(mockFetchWsfArray).toHaveBeenCalledWith("schedule", "/alerts");
      expect(result).toEqual(mockAlerts);
    });
  });

  describe("Schedule API", () => {
    it("should call getScheduleByRoute with correct parameters", async () => {
      const params = {
        tripDate: new Date("2024-04-01"),
        routeID: 1,
      };
      const mockSchedules = [{ scheduleId: 1, departureTime: new Date() }];
      mockFetchWsfArray.mockResolvedValue(mockSchedules);

      const result = await getScheduleByRoute(params);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith(
        "/schedule/{tripDate}/{routeID}",
        params
      );
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockSchedules);
    });

    it("should call getScheduleByTerminals with correct parameters", async () => {
      const params = {
        tripDate: new Date("2024-04-01"),
        departingTerminalID: 7,
        arrivingTerminalID: 8,
      };
      const mockSchedules = [{ scheduleId: 1, departureTime: new Date() }];
      mockFetchWsfArray.mockResolvedValue(mockSchedules);

      const result = await getScheduleByTerminals(params);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith(
        "/schedule/{tripDate}/{departingTerminalID}/{arrivingTerminalID}",
        params
      );
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockSchedules);
    });

    it("should call getScheduleTodayByRoute with correct parameters", async () => {
      const params = {
        routeID: 1,
        onlyRemainingTimes: true,
      };
      const mockSchedules = [{ scheduleId: 1, departureTime: new Date() }];
      mockFetchWsfArray.mockResolvedValue(mockSchedules);

      const result = await getScheduleTodayByRoute(params);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith(
        "/scheduletoday/{routeID}",
        params
      );
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockSchedules);
    });

    it("should call getScheduleTodayByTerminals with correct parameters", async () => {
      const params = {
        departingTerminalID: 7,
        arrivingTerminalID: 8,
        onlyRemainingTimes: true,
      };
      const mockSchedules = [{ scheduleId: 1, departureTime: new Date() }];
      mockFetchWsfArray.mockResolvedValue(mockSchedules);

      const result = await getScheduleTodayByTerminals(params);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith(
        "/scheduletoday/{departingTerminalID}/{arrivingTerminalID}",
        params
      );
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockSchedules);
    });

    it("should call getSailings with correct parameters", async () => {
      const params = {
        schedRouteID: 1,
      };
      const mockSailings = [{ sailingId: 1, departureTime: new Date() }];
      mockFetchWsfArray.mockResolvedValue(mockSailings);

      const result = await getSailings(params);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith(
        "/sailings/{schedRouteID}",
        params
      );
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockSailings);
    });

    it("should call getAllSailings with correct parameters", async () => {
      const params = {
        schedRouteID: 1,
        year: 2024,
      };
      const mockSailings = [{ sailingId: 1, departureTime: new Date() }];
      mockFetchWsfArray.mockResolvedValue(mockSailings);

      const result = await getAllSailings(params);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith(
        "/allsailings/{schedRouteID}/{year}",
        params
      );
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockSailings);
    });
  });

  describe("Terminals API", () => {
    it("should call getTerminals with correct parameters", async () => {
      const tripDate = new Date("2024-04-01");
      const mockTerminals = [{ terminalId: 1, terminalName: "Test Terminal" }];
      mockFetchWsfArray.mockResolvedValue(mockTerminals);

      const result = await getTerminals(tripDate);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith("/terminals/{tripDate}", {
        tripDate,
      });
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockTerminals);
    });

    it("should call getTerminalsByRoute with correct parameters", async () => {
      const routeId = 1;
      const mockTerminals = [{ terminalId: 1, terminalName: "Test Terminal" }];
      mockFetchWsfArray.mockResolvedValue(mockTerminals);

      const result = await getTerminalsByRoute(routeId);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith(
        "/terminalsandmatesbyroute/{routeId}",
        {
          routeId,
        }
      );
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockTerminals);
    });

    it("should call getTerminalsAndMates with correct parameters", async () => {
      const tripDate = new Date("2024-04-01");
      const mockTerminals = [{ terminalId: 1, terminalName: "Test Terminal" }];
      mockFetchWsfArray.mockResolvedValue(mockTerminals);

      const result = await getTerminalsAndMates(tripDate);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith(
        "/terminalsandmates/{tripDate}",
        { tripDate }
      );
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockTerminals);
    });

    it("should call getTerminalMates with correct parameters", async () => {
      const tripDate = new Date("2024-04-01");
      const terminalId = 7;
      const mockTerminals = [{ terminalId: 1, terminalName: "Test Terminal" }];
      mockFetchWsfArray.mockResolvedValue(mockTerminals);

      const result = await getTerminalMates(tripDate, terminalId);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith(
        "/terminalmates/{tripDate}/{terminalId}",
        {
          tripDate,
          terminalId,
        }
      );
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockTerminals);
    });
  });

  describe("Vessels API", () => {
    it("should call getVessels", async () => {
      const mockVessels = [{ vesselId: 1, vesselName: "Test Vessel" }];
      mockFetchWsfArray.mockResolvedValue(mockVessels);

      const result = await getVessels();

      expect(mockFetchWsfArray).toHaveBeenCalledWith("schedule", "/vessels");
      expect(result).toEqual(mockVessels);
    });

    it("should call getVesselsByRoute with correct parameters", async () => {
      const routeID = 1;
      const mockVessels = [{ vesselId: 1, vesselName: "Test Vessel" }];
      mockFetchWsfArray.mockResolvedValue(mockVessels);

      const result = await getVesselsByRoute(routeID);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith("/vessels/{routeID}", {
        routeID,
      });
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockVessels);
    });
  });

  describe("Time Adjustments API", () => {
    it("should call getTimeAdjustments", async () => {
      const mockAdjustments = [{ adjustmentId: 1, adjustmentType: "Test" }];
      mockFetchWsfArray.mockResolvedValue(mockAdjustments);

      const result = await getTimeAdjustments();

      expect(mockFetchWsfArray).toHaveBeenCalledWith("schedule", "/timeadj");
      expect(result).toEqual(mockAdjustments);
    });

    it("should call getTimeAdjustmentsByRoute with correct parameters", async () => {
      const routeID = 1;
      const mockAdjustments = [{ adjustmentId: 1, adjustmentType: "Test" }];
      mockFetchWsfArray.mockResolvedValue(mockAdjustments);

      const result = await getTimeAdjustmentsByRoute(routeID);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith(
        "/timeadjbyroute/{routeID}",
        {
          routeID,
        }
      );
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockAdjustments);
    });

    it("should call getTimeAdjustmentsBySchedRoute with correct parameters", async () => {
      const schedRouteID = 1;
      const mockAdjustments = [{ adjustmentId: 1, adjustmentType: "Test" }];
      mockFetchWsfArray.mockResolvedValue(mockAdjustments);

      const result = await getTimeAdjustmentsBySchedRoute(schedRouteID);

      expect(mockBuildWsfUrl).toHaveBeenCalledWith(
        "/timeadjbyschedroute/{schedRouteID}",
        {
          schedRouteID,
        }
      );
      expect(mockFetchWsfArray).toHaveBeenCalledWith(
        "schedule",
        expect.any(String)
      );
      expect(result).toEqual(mockAdjustments);
    });
  });

  describe("Utility API", () => {
    it("should call getValidDateRange", async () => {
      const mockDateRange = { startDate: new Date(), endDate: new Date() };
      mockFetchWsf.mockResolvedValue(mockDateRange);

      const result = await getValidDateRange();

      expect(mockFetchWsf).toHaveBeenCalledWith("schedule", "/validdaterange");
      expect(result).toEqual(mockDateRange);
    });

    it("should call getCacheFlushDateSchedule", async () => {
      const mockCacheFlushDate = { cacheFlushDate: new Date() };
      mockFetchWsf.mockResolvedValue(mockCacheFlushDate);

      const result = await getCacheFlushDateSchedule();

      expect(mockFetchWsf).toHaveBeenCalledWith("schedule", "/cacheflushdate");
      expect(result).toEqual(mockCacheFlushDate);
    });
  });

  describe("Error Handling", () => {
    it("should handle API errors gracefully", async () => {
      mockFetchWsfArray.mockResolvedValue([]);

      const result = await getRoutes(new Date("2024-04-01"));

      expect(result).toEqual([]);
    });

    it("should handle network errors gracefully", async () => {
      mockFetchWsfArray.mockResolvedValue([]);

      const result = await getScheduledRoutes();

      expect(result).toEqual([]);
    });
  });
});
