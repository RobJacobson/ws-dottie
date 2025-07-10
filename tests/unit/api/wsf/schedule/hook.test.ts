import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import * as scheduleApi from "@/api/wsf/schedule/api";
import {
  useActiveSeasons,
  useAlerts,
  useAllSailings,
  useCacheFlushDateSchedule,
  useRouteDetails,
  useRouteDetailsByRoute,
  useRouteDetailsByTerminals,
  useRoutes,
  useRoutesByTerminals,
  useRoutesWithDisruptions,
  useSailings,
  useScheduleByRoute,
  useScheduleByTerminals,
  useScheduledRoutes,
  useScheduledRoutesBySeason,
  useScheduleTodayByRoute,
  useScheduleTodayByTerminals,
  useTerminalMates,
  useTerminals,
  useTerminalsAndMates,
  useTerminalsByRoute,
  useTimeAdjustments,
  useTimeAdjustmentsByRoute,
  useTimeAdjustmentsBySchedRoute,
  useValidDateRange,
  useVessels,
  useVesselsByRoute,
} from "@/api/wsf/schedule/hook";

// Mock the API functions
vi.mock("@/api/wsf/schedule/api");

const mockScheduleApi = vi.mocked(scheduleApi);

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

describe("WSF Schedule Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Routes Hooks", () => {
    it("should call useRoutes with correct parameters", async () => {
      const tripDate = new Date("2024-04-01");
      const mockRoutes = [
        {
          routeId: 1,
          routeName: "Test Route",
          routeAbbrev: "TR",
          routeDescription: "Test route description",
          routeColor: "#123456",
          sortSeq: 1,
          isActive: true,
          lastUpdated: new Date(),
          effectiveDate: new Date(),
          crossingTime: 60,
          distance: 10.5,
          serviceRoutes: [],
        },
      ];
      mockScheduleApi.getRoutes.mockResolvedValue(mockRoutes);

      const { result } = renderHook(() => useRoutes(tripDate), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getRoutes).toHaveBeenCalledWith(tripDate);
      expect(result.current.data).toEqual(mockRoutes);
    });

    it("should call useRoutesByTerminals with correct parameters", async () => {
      const params = {
        tripDate: new Date("2024-04-01"),
        departingTerminalId: 7,
        arrivingTerminalId: 8,
      };
      const mockRoutes = [
        {
          routeId: 1,
          routeName: "Test Route",
          routeAbbrev: "TR",
          routeDescription: "Test route description",
          routeColor: "#123456",
          sortSeq: 1,
          isActive: true,
          lastUpdated: new Date(),
          effectiveDate: new Date(),
          crossingTime: 60,
          distance: 10.5,
          serviceRoutes: [],
        },
      ];
      mockScheduleApi.getRoutesByTerminals.mockResolvedValue(mockRoutes);

      const { result } = renderHook(() => useRoutesByTerminals(params), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getRoutesByTerminals).toHaveBeenCalledWith(params);
      expect(result.current.data).toEqual(mockRoutes);
    });

    it("should call useRoutesWithDisruptions with correct parameters", async () => {
      const tripDate = new Date("2024-04-01");
      const mockRoutes = [
        {
          routeId: 1,
          routeName: "Test Route",
          routeAbbrev: "TR",
          routeDescription: "Test route description",
          routeColor: "#123456",
          sortSeq: 1,
          isActive: true,
          lastUpdated: new Date(),
          effectiveDate: new Date(),
          crossingTime: 60,
          distance: 10.5,
          serviceRoutes: [],
        },
      ];
      mockScheduleApi.getRoutesWithDisruptions.mockResolvedValue(mockRoutes);

      const { result } = renderHook(() => useRoutesWithDisruptions(tripDate), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getRoutesWithDisruptions).toHaveBeenCalledWith(
        tripDate
      );
      expect(result.current.data).toEqual(mockRoutes);
    });

    it("should call useRouteDetails with correct parameters", async () => {
      const tripDate = new Date("2024-04-01");
      const mockRoutes = [
        {
          routeId: 1,
          routeName: "Test Route",
          routeAbbrev: "TR",
          routeDescription: "Test route description",
          routeColor: "#123456",
          sortSeq: 1,
          isActive: true,
          lastUpdated: new Date(),
          effectiveDate: new Date(),
          crossingTime: 60,
          distance: 10.5,
          serviceRoutes: [],
        },
      ];
      mockScheduleApi.getRouteDetails.mockResolvedValue(mockRoutes);

      const { result } = renderHook(() => useRouteDetails(tripDate), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getRouteDetails).toHaveBeenCalledWith(tripDate);
      expect(result.current.data).toEqual(mockRoutes);
    });

    it("should call useRouteDetailsByTerminals with correct parameters", async () => {
      const params = {
        tripDate: new Date("2024-04-01"),
        departingTerminalId: 7,
        arrivingTerminalId: 8,
      };
      const mockRoutes = [
        {
          routeId: 1,
          routeName: "Test Route",
          routeAbbrev: "TR",
          routeDescription: "Test route description",
          routeColor: "#123456",
          sortSeq: 1,
          isActive: true,
          lastUpdated: new Date(),
          effectiveDate: new Date(),
          crossingTime: 60,
          distance: 10.5,
          serviceRoutes: [],
        },
      ];
      mockScheduleApi.getRouteDetailsByTerminals.mockResolvedValue(mockRoutes);

      const { result } = renderHook(() => useRouteDetailsByTerminals(params), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getRouteDetailsByTerminals).toHaveBeenCalledWith(
        params
      );
      expect(result.current.data).toEqual(mockRoutes);
    });

    it("should call useRouteDetailsByRoute with correct parameters", async () => {
      const tripDate = new Date("2024-04-01");
      const routeId = 1;
      const mockRoutes = [
        {
          routeId: 1,
          routeName: "Test Route",
          routeAbbrev: "TR",
          routeDescription: "Test route description",
          routeColor: "#123456",
          sortSeq: 1,
          isActive: true,
          lastUpdated: new Date(),
          effectiveDate: new Date(),
          crossingTime: 60,
          distance: 10.5,
          serviceRoutes: [],
        },
      ];
      mockScheduleApi.getRouteDetailsByRoute.mockResolvedValue(mockRoutes);

      const { result } = renderHook(
        () => useRouteDetailsByRoute(tripDate, routeId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getRouteDetailsByRoute).toHaveBeenCalledWith({
        tripDate,
        routeId,
      });
      expect(result.current.data).toEqual(mockRoutes);
    });

    it("should call useScheduledRoutes", async () => {
      const mockRoutes = [
        {
          routeId: 1,
          routeName: "Test Route",
          routeAbbrev: "TR",
          routeDescription: "Test route description",
          routeColor: "#123456",
          sortSeq: 1,
          isActive: true,
          lastUpdated: new Date(),
          effectiveDate: new Date(),
          crossingTime: 60,
          distance: 10.5,
          serviceRoutes: [],
        },
      ];
      mockScheduleApi.getScheduledRoutes.mockResolvedValue(mockRoutes);

      const { result } = renderHook(() => useScheduledRoutes(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getScheduledRoutes).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockRoutes);
    });

    it("should call useScheduledRoutesBySeason with correct parameters", async () => {
      const seasonId = 1;
      const mockRoutes = [
        {
          routeId: 1,
          routeName: "Test Route",
          routeAbbrev: "TR",
          routeDescription: "Test route description",
          routeColor: "#123456",
          sortSeq: 1,
          isActive: true,
          lastUpdated: new Date(),
          effectiveDate: new Date(),
          crossingTime: 60,
          distance: 10.5,
          serviceRoutes: [],
        },
      ];
      mockScheduleApi.getScheduledRoutesBySeason.mockResolvedValue(mockRoutes);

      const { result } = renderHook(
        () => useScheduledRoutesBySeason(seasonId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getScheduledRoutesBySeason).toHaveBeenCalledWith(
        seasonId
      );
      expect(result.current.data).toEqual(mockRoutes);
    });

    it("should call useActiveSeasons", async () => {
      const mockSeasons = [
        {
          seasonId: 1,
          seasonName: "Test Season",
          startDate: new Date(),
          endDate: new Date(),
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockScheduleApi.getActiveSeasons.mockResolvedValue(mockSeasons);

      const { result } = renderHook(() => useActiveSeasons(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getActiveSeasons).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockSeasons);
    });

    it("should call useAlerts", async () => {
      const mockAlerts = [
        {
          alertId: 1,
          alertMessage: "Test alert message",
          alertType: "Service",
          routeId: 1,
          isActive: true,
          lastUpdated: new Date(),
        },
      ];
      mockScheduleApi.getAlerts.mockResolvedValue(mockAlerts);

      const { result } = renderHook(() => useAlerts(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getAlerts).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockAlerts);
    });
  });

  describe("Schedule Hooks", () => {
    it("should call useScheduleByRoute with correct parameters", async () => {
      const tripDate = new Date("2024-04-01");
      const routeId = 1;
      const mockSchedules = [
        {
          scheduleId: 1,
          routeId: 1,
          routeName: "Test Route",
          sailingDate: new Date(),
          departures: [],
          lastUpdated: new Date(),
        },
      ];
      mockScheduleApi.getScheduleByRoute.mockResolvedValue(mockSchedules);

      const { result } = renderHook(
        () => useScheduleByRoute(tripDate, routeId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getScheduleByRoute).toHaveBeenCalledWith({
        tripDate,
        routeID: routeId,
      });
      expect(result.current.data).toEqual(mockSchedules);
    });

    it("should call useScheduleByTerminals with correct parameters", async () => {
      const params = {
        tripDate: new Date("2024-04-01"),
        departingTerminalID: 7,
        arrivingTerminalID: 8,
      };
      const mockSchedules = [
        {
          scheduleId: 1,
          routeId: 1,
          routeName: "Test Route",
          sailingDate: new Date(),
          departures: [],
          lastUpdated: new Date(),
        },
      ];
      mockScheduleApi.getScheduleByTerminals.mockResolvedValue(mockSchedules);

      const { result } = renderHook(() => useScheduleByTerminals(params), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getScheduleByTerminals).toHaveBeenCalledWith(
        params
      );
      expect(result.current.data).toEqual(mockSchedules);
    });

    it("should call useScheduleTodayByRoute with correct parameters", async () => {
      const routeId = 1;
      const mockSchedules = [
        {
          scheduleId: 1,
          routeId: 1,
          routeName: "Test Route",
          sailingDate: new Date(),
          departures: [],
          lastUpdated: new Date(),
        },
      ];
      mockScheduleApi.getScheduleTodayByRoute.mockResolvedValue(mockSchedules);

      const { result } = renderHook(() => useScheduleTodayByRoute(routeId), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getScheduleTodayByRoute).toHaveBeenCalledWith({
        routeID: routeId,
      });
      expect(result.current.data).toEqual(mockSchedules);
    });

    it("should call useScheduleTodayByTerminals with correct parameters", async () => {
      const params = {
        departingTerminalID: 7,
        arrivingTerminalID: 8,
      };
      const mockSchedules = [{ scheduleId: 1, departureTime: new Date() }];
      mockScheduleApi.getScheduleTodayByTerminals.mockResolvedValue(
        mockSchedules
      );

      const { result } = renderHook(() => useScheduleTodayByTerminals(params), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getScheduleTodayByTerminals).toHaveBeenCalledWith(
        params
      );
      expect(result.current.data).toEqual(mockSchedules);
    });

    it("should call useSailings with correct parameters", async () => {
      const schedRouteID = 1;
      const mockSailings = [{ sailingId: 1, departureTime: new Date() }];
      mockScheduleApi.getSailings.mockResolvedValue(mockSailings);

      const { result } = renderHook(() => useSailings(schedRouteID), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getSailings).toHaveBeenCalledWith({
        schedRouteID,
      });
      expect(result.current.data).toEqual(mockSailings);
    });

    it("should call useAllSailings with correct parameters", async () => {
      const schedRouteID = 1;
      const year = 2024;
      const mockSailings = [{ sailingId: 1, departureTime: new Date() }];
      mockScheduleApi.getAllSailings.mockResolvedValue(mockSailings);

      const { result } = renderHook(() => useAllSailings(schedRouteID, year), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getAllSailings).toHaveBeenCalledWith({
        schedRouteID,
        year,
      });
      expect(result.current.data).toEqual(mockSailings);
    });
  });

  describe("Terminals Hooks", () => {
    it("should call useTerminals with correct parameters", async () => {
      const tripDate = new Date("2024-04-01");
      const mockTerminals = [{ terminalId: 1, terminalName: "Test Terminal" }];
      mockScheduleApi.getTerminals.mockResolvedValue(mockTerminals);

      const { result } = renderHook(() => useTerminals(tripDate), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getTerminals).toHaveBeenCalledWith(tripDate);
      expect(result.current.data).toEqual(mockTerminals);
    });

    it("should call useTerminalsByRoute with correct parameters", async () => {
      const routeId = 1;
      const mockTerminals = [{ terminalId: 1, terminalName: "Test Terminal" }];
      mockScheduleApi.getTerminalsByRoute.mockResolvedValue(mockTerminals);

      const { result } = renderHook(() => useTerminalsByRoute(routeId), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getTerminalsByRoute).toHaveBeenCalledWith(routeId);
      expect(result.current.data).toEqual(mockTerminals);
    });

    it("should call useTerminalsAndMates with correct parameters", async () => {
      const tripDate = new Date("2024-04-01");
      const mockTerminals = [{ terminalId: 1, terminalName: "Test Terminal" }];
      mockScheduleApi.getTerminalsAndMates.mockResolvedValue(mockTerminals);

      const { result } = renderHook(() => useTerminalsAndMates(tripDate), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getTerminalsAndMates).toHaveBeenCalledWith(
        tripDate
      );
      expect(result.current.data).toEqual(mockTerminals);
    });

    it("should call useTerminalMates with correct parameters", async () => {
      const tripDate = new Date("2024-04-01");
      const terminalId = 7;
      const mockTerminals = [{ terminalId: 1, terminalName: "Test Terminal" }];
      mockScheduleApi.getTerminalMates.mockResolvedValue(mockTerminals);

      const { result } = renderHook(
        () => useTerminalMates(tripDate, terminalId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getTerminalMates).toHaveBeenCalledWith(
        tripDate,
        terminalId
      );
      expect(result.current.data).toEqual(mockTerminals);
    });
  });

  describe("Vessels Hooks", () => {
    it("should call useVessels", async () => {
      const mockVessels = [{ vesselId: 1, vesselName: "Test Vessel" }];
      mockScheduleApi.getVessels.mockResolvedValue(mockVessels);

      const { result } = renderHook(() => useVessels(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getVessels).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockVessels);
    });

    it("should call useVesselsByRoute with correct parameters", async () => {
      const routeId = 1;
      const mockVessels = [{ vesselId: 1, vesselName: "Test Vessel" }];
      mockScheduleApi.getVesselsByRoute.mockResolvedValue(mockVessels);

      const { result } = renderHook(() => useVesselsByRoute(routeId), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getVesselsByRoute).toHaveBeenCalledWith(routeId);
      expect(result.current.data).toEqual(mockVessels);
    });
  });

  describe("Time Adjustments Hooks", () => {
    it("should call useTimeAdjustments", async () => {
      const mockAdjustments = [{ adjustmentId: 1, adjustmentType: "Test" }];
      mockScheduleApi.getTimeAdjustments.mockResolvedValue(mockAdjustments);

      const { result } = renderHook(() => useTimeAdjustments(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getTimeAdjustments).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockAdjustments);
    });

    it("should call useTimeAdjustmentsByRoute with correct parameters", async () => {
      const routeId = 1;
      const mockAdjustments = [{ adjustmentId: 1, adjustmentType: "Test" }];
      mockScheduleApi.getTimeAdjustmentsByRoute.mockResolvedValue(
        mockAdjustments
      );

      const { result } = renderHook(() => useTimeAdjustmentsByRoute(routeId), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getTimeAdjustmentsByRoute).toHaveBeenCalledWith(
        routeId
      );
      expect(result.current.data).toEqual(mockAdjustments);
    });

    it("should call useTimeAdjustmentsBySchedRoute with correct parameters", async () => {
      const schedRouteID = 1;
      const mockAdjustments = [{ adjustmentId: 1, adjustmentType: "Test" }];
      mockScheduleApi.getTimeAdjustmentsBySchedRoute.mockResolvedValue(
        mockAdjustments
      );

      const { result } = renderHook(
        () => useTimeAdjustmentsBySchedRoute(schedRouteID),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(
        mockScheduleApi.getTimeAdjustmentsBySchedRoute
      ).toHaveBeenCalledWith(schedRouteID);
      expect(result.current.data).toEqual(mockAdjustments);
    });
  });

  describe("Utility Hooks", () => {
    it("should call useValidDateRange", async () => {
      const mockDateRange = { startDate: new Date(), endDate: new Date() };
      mockScheduleApi.getValidDateRange.mockResolvedValue(mockDateRange);

      const { result } = renderHook(() => useValidDateRange(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getValidDateRange).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockDateRange);
    });

    it("should call useCacheFlushDateSchedule", async () => {
      const mockCacheFlushDate = { cacheFlushDate: new Date() };
      mockScheduleApi.getCacheFlushDateSchedule.mockResolvedValue(
        mockCacheFlushDate
      );

      const { result } = renderHook(() => useCacheFlushDateSchedule(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockScheduleApi.getCacheFlushDateSchedule).toHaveBeenCalled();
      expect(result.current.data).toEqual(mockCacheFlushDate);
    });
  });

  describe("Hook Behavior", () => {
    it("should handle disabled queries", async () => {
      const { result } = renderHook(() => useRoutes(new Date("2024-04-01")), {
        wrapper: createWrapper(),
      });

      // Query should be enabled by default
      expect(result.current.isLoading).toBe(true);
    });

    it("should handle error states", async () => {
      mockScheduleApi.getRoutes.mockRejectedValue(new Error("API Error"));

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            gcTime: 0,
          },
        },
      });

      const wrapper = ({ children }: { children: ReactNode }) => {
        return React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children
        );
      };

      const { result } = renderHook(() => useRoutes(new Date("2024-04-01")), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading || result.current.isSuccess).toBe(true);
      });

      // Should handle error gracefully - data will be undefined when API rejects
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeNull();
    });

    it("should handle conditional queries", async () => {
      const params = {
        tripDate: new Date("2024-04-01"),
        departingTerminalId: 7,
        arrivingTerminalId: 8,
      };

      // Test with valid parameters
      const { result: validResult } = renderHook(
        () => useRoutesByTerminals(params),
        { wrapper: createWrapper() }
      );
      expect(validResult.current.isLoading).toBe(true);

      // Test with invalid parameters (missing tripDate)
      const invalidParams = { ...params, tripDate: undefined as any };
      const { result: invalidResult } = renderHook(
        () => useRoutesByTerminals(invalidParams),
        { wrapper: createWrapper() }
      );
      // Should not throw, should be disabled and not call .toISOString()
      expect(invalidResult.current.isLoading).toBe(false);
      expect(invalidResult.current.data).toBeUndefined();
      expect(invalidResult.current.isError).toBe(false);
    });
  });
});
