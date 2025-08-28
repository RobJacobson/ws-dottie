import { expect } from "vitest";

import {
  activeSeasonsArraySchema,
  alertsArraySchema,
  getActiveSeasons,
  getAlerts,
  getAllSailings,
  getCacheFlushDateSchedule,
  getRoutes,
  getSailings,
  getScheduledRoutes,
  getTerminalMates,
  getTerminals,
  getTimeAdjustments,
  getValidDateRange,
  routeDetailsArraySchema,
  routesArraySchema,
  sailingsArraySchema,
  scheduleCacheFlushDateSchema,
  scheduledRoutesArraySchema,
  scheduleTerminalsArraySchema,
  timeAdjustmentsArraySchema,
  validDateRangeSchema,
} from "@/api/wsf-schedule";

import type { ApiModuleConfig } from "../utils/types";

export const wsfScheduleTestConfig: ApiModuleConfig = {
  moduleName: "WSF Schedule",
  endpoints: [
    {
      apiFunction: getActiveSeasons,
      outputSchema: activeSeasonsArraySchema,
      validParams: {},
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getActiveSeasons",
      category: "parameterless",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return active seasons with valid data",
          test: async () => {
            const result = await getActiveSeasons();
            expect(result.length).toBeGreaterThan(0);

            // Validate first season has required fields
            const firstSeason = result[0];
            expect(firstSeason.ScheduleID).toBeGreaterThan(0);
            expect(firstSeason.ScheduleName).toBeDefined();
            expect(firstSeason.ScheduleSeason).toBeGreaterThan(0);
            expect(firstSeason.SchedulePDFUrl).toMatch(/^http/);
            expect(firstSeason.ScheduleStart).toBeInstanceOf(Date);
            expect(firstSeason.ScheduleEnd).toBeInstanceOf(Date);
          },
        },
        {
          name: "should return seasons in chronological order",
          test: async () => {
            const result = await getActiveSeasons();
            expect(result.length).toBeGreaterThan(1);

            // Check that seasons are ordered by start date
            for (let i = 1; i < result.length; i++) {
              expect(result[i].ScheduleStart.getTime()).toBeGreaterThanOrEqual(
                result[i - 1].ScheduleStart.getTime()
              );
            }
          },
        },
      ],
    },
    {
      apiFunction: getCacheFlushDateSchedule,
      outputSchema: scheduleCacheFlushDateSchema,
      validParams: {},
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getCacheFlushDateSchedule",
      category: "parameterized", // Returns single object, not array
      maxResponseTime: 2000,
      customTests: [
        {
          name: "should return valid cache flush date",
          test: async () => {
            const result = await getCacheFlushDateSchedule();
            expect(result).toBeInstanceOf(Date);
            expect(result.getTime()).toBeGreaterThan(0);

            // Cache flush date should be recent (within last 30 days)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            expect(result.getTime()).toBeGreaterThan(thirtyDaysAgo.getTime());
          },
        },
        {
          name: "should return date in the future or recent past",
          test: async () => {
            const result = await getCacheFlushDateSchedule();
            const now = new Date();
            const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

            // Cache flush date should be recent (within last day) or in the future
            expect(result.getTime()).toBeGreaterThanOrEqual(
              oneDayAgo.getTime()
            );
          },
        },
      ],
    },
    {
      apiFunction: getValidDateRange,
      outputSchema: validDateRangeSchema,
      validParams: {},
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getValidDateRange",
      category: "parameterized", // Returns single object, not array
      maxResponseTime: 2000,
      customTests: [
        {
          name: "should return valid date range with proper structure",
          test: async () => {
            const result = await getValidDateRange();
            expect(result.DateFrom).toBeInstanceOf(Date);
            expect(result.DateThru).toBeInstanceOf(Date);
            expect(result.DateFrom.getTime()).toBeGreaterThan(0);
            expect(result.DateThru.getTime()).toBeGreaterThan(0);
          },
        },
        {
          name: "should return date range where DateFrom is before DateThru",
          test: async () => {
            const result = await getValidDateRange();
            expect(result.DateFrom.getTime()).toBeLessThan(
              result.DateThru.getTime()
            );
          },
        },
        {
          name: "should return future date range",
          test: async () => {
            const result = await getValidDateRange();
            const now = new Date();

            // DateFrom can be in the past (for published schedules) or recent
            const oneWeekAgo = new Date(
              now.getTime() - 7 * 24 * 60 * 60 * 1000
            );
            expect(result.DateFrom.getTime()).toBeGreaterThanOrEqual(
              oneWeekAgo.getTime()
            );

            // DateThru should be in the future (schedule extends into future)
            expect(result.DateThru.getTime()).toBeGreaterThan(now.getTime());
          },
        },
      ],
    },
    {
      apiFunction: getTerminals,
      outputSchema: scheduleTerminalsArraySchema,
      validParams: { tripDate: new Date("2025-08-23") },
      invalidParams: [
        {
          params: { tripDate: new Date("2020-01-01") },
          expectedError: "Invalid date",
        },
        {
          params: { tripDate: new Date("2030-01-01") },
          expectedError: "Invalid date",
        },
      ],
      endpointName: "getTerminals",
      category: "parameterized",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return terminals with valid structure",
          test: async () => {
            const result = await getTerminals({
              tripDate: new Date("2025-08-23"),
            });
            expect(result.length).toBeGreaterThan(0);

            // Validate first terminal has required fields
            const firstTerminal = result[0];
            expect(firstTerminal.TerminalID).toBeGreaterThan(0);
            expect(firstTerminal.Description).toBeDefined();
            expect(firstTerminal.Description.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return unique terminal IDs",
          test: async () => {
            const result = await getTerminals({
              tripDate: new Date("2025-08-23"),
            });
            const terminalIds = result.map((t) => t.TerminalID);
            const uniqueIds = new Set(terminalIds);
            expect(uniqueIds.size).toBe(terminalIds.length);
          },
        },
        {
          name: "should return terminals with reasonable descriptions",
          test: async () => {
            const result = await getTerminals({
              tripDate: new Date("2025-08-23"),
            });

            // Check that descriptions are reasonable (not empty, not too long)
            result.forEach((terminal) => {
              expect(terminal.Description.trim().length).toBeGreaterThan(0);
              expect(terminal.Description.length).toBeLessThan(100);
            });
          },
        },
      ],
    },
    {
      apiFunction: getRoutes,
      outputSchema: routesArraySchema,
      validParams: { tripDate: new Date("2025-08-23") },
      invalidParams: [
        {
          params: { tripDate: new Date("2020-01-01") },
          expectedError: "Invalid date",
        },
        {
          params: { tripDate: new Date("2030-01-01") },
          expectedError: "Invalid date",
        },
      ],
      endpointName: "getRoutes",
      category: "parameterized",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return routes with valid structure",
          test: async () => {
            const result = await getRoutes({
              tripDate: new Date("2025-08-23"),
            });
            expect(result.length).toBeGreaterThan(0);

            // Validate first route has required fields
            const firstRoute = result[0];
            expect(firstRoute.RouteID).toBeGreaterThan(0);
            expect(firstRoute.RouteAbbrev).toBeDefined();
            expect(firstRoute.RouteAbbrev.length).toBeGreaterThan(0);
            expect(firstRoute.Description).toBeDefined();
            expect(firstRoute.Description.length).toBeGreaterThan(0);
            expect(firstRoute.RegionID).toBeGreaterThan(0);
            expect(Array.isArray(firstRoute.ServiceDisruptions)).toBe(true);
          },
        },
        {
          name: "should return unique route IDs",
          test: async () => {
            const result = await getRoutes({
              tripDate: new Date("2025-08-23"),
            });
            const routeIds = result.map((r) => r.RouteID);
            const uniqueIds = new Set(routeIds);
            expect(uniqueIds.size).toBe(routeIds.length);
          },
        },
        {
          name: "should return routes with reasonable descriptions",
          test: async () => {
            const result = await getRoutes({
              tripDate: new Date("2025-08-23"),
            });

            // Check that descriptions are reasonable
            result.forEach((route) => {
              expect(route.Description.trim().length).toBeGreaterThan(0);
              expect(route.Description.length).toBeLessThan(200);
              expect(route.RouteAbbrev.trim().length).toBeGreaterThan(0);
              expect(route.RouteAbbrev.length).toBeLessThan(20);
            });
          },
        },
      ],
    },
    {
      apiFunction: getAlerts,
      outputSchema: alertsArraySchema,
      validParams: {},
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getAlerts",
      category: "parameterless",
      maxResponseTime: 4000,
      customTests: [
        {
          name: "should return alerts with valid structure",
          test: async () => {
            const result = await getAlerts();
            expect(result.length).toBeGreaterThan(0);

            // Validate first alert has required fields
            const firstAlert = result[0];
            expect(firstAlert.BulletinID).toBeGreaterThan(0);
            expect(firstAlert.BulletinFlag).toBeDefined();
            expect(firstAlert.BulletinText).toBeDefined();
            expect(firstAlert.BulletinText.length).toBeGreaterThan(0);
            expect(firstAlert.PublishDate).toBeInstanceOf(Date);
            expect(firstAlert.SortSeq).toBeGreaterThan(0);
            expect(firstAlert.AlertTypeID).toBeGreaterThan(0);
            expect(firstAlert.AlertType).toBeDefined();
            expect(firstAlert.AlertFullTitle).toBeDefined();
            expect(Array.isArray(firstAlert.AffectedRouteIDs)).toBe(true);
          },
        },
        {
          name: "should return alerts with reasonable content",
          test: async () => {
            const result = await getAlerts();

            // Check that alert content is reasonable
            result.forEach((alert) => {
              expect(alert.BulletinText.trim().length).toBeGreaterThan(0);
              expect(alert.BulletinText.length).toBeLessThan(10000);
              expect(alert.AlertType.trim().length).toBeGreaterThan(0);
              expect(alert.AlertFullTitle.trim().length).toBeGreaterThan(0);
              expect(alert.AlertFullTitle.length).toBeLessThan(500);
            });
          },
        },
        {
          name: "should return alerts with valid dates",
          test: async () => {
            const result = await getAlerts();
            const now = new Date();
            const oneYearAgo = new Date(
              now.getTime() - 365 * 24 * 60 * 60 * 1000
            );

            // Publish dates should be reasonable (within last year)
            result.forEach((alert) => {
              expect(alert.PublishDate.getTime()).toBeGreaterThan(
                oneYearAgo.getTime()
              );
              expect(alert.PublishDate.getTime()).toBeLessThanOrEqual(
                now.getTime() + 24 * 60 * 60 * 1000
              ); // Allow future dates
            });
          },
        },
      ],
    },
    {
      apiFunction: getTerminalMates,
      outputSchema: scheduleTerminalsArraySchema,
      validParams: { tripDate: new Date("2025-08-23"), terminalId: 1 },
      invalidParams: [
        {
          params: { tripDate: new Date("2020-01-01"), terminalId: 1 },
          expectedError: "Invalid date",
        },
        {
          params: { tripDate: new Date("2025-08-23"), terminalId: 999 },
          expectedError: "Invalid terminal ID",
        },
      ],
      endpointName: "getTerminalMates",
      category: "parameterized",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return terminal mates with valid structure",
          test: async () => {
            const result = await getTerminalMates({
              tripDate: new Date("2025-08-23"),
              terminalId: 1,
            });
            expect(result.length).toBeGreaterThan(0);

            // Validate first terminal mate has required fields
            const firstMate = result[0];
            expect(firstMate.TerminalID).toBeGreaterThan(0);
            expect(firstMate.Description).toBeDefined();
            expect(firstMate.Description.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return unique terminal mate IDs",
          test: async () => {
            const result = await getTerminalMates({
              tripDate: new Date("2025-08-23"),
              terminalId: 1,
            });
            const mateIds = result.map((m) => m.TerminalID);
            const uniqueIds = new Set(mateIds);
            expect(uniqueIds.size).toBe(mateIds.length);
          },
        },
        {
          name: "should return terminal mates different from source terminal",
          test: async () => {
            const result = await getTerminalMates({
              tripDate: new Date("2025-08-23"),
              terminalId: 1,
            });

            // All returned terminals should be different from the source terminal ID
            result.forEach((mate) => {
              expect(mate.TerminalID).not.toBe(1);
            });
          },
        },
      ],
    },
    {
      apiFunction: getAllSailings,
      outputSchema: sailingsArraySchema,
      validParams: { schedRouteId: 2327 },
      invalidParams: [
        {
          params: { schedRouteId: 999999 },
          expectedError: "Invalid scheduled route ID",
        },
        {
          params: { schedRouteId: -1 },
          expectedError: "Invalid scheduled route ID",
        },
      ],
      endpointName: "getAllSailings",
      category: "parameterized",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return sailings with valid structure",
          test: async () => {
            const result = await getAllSailings({ schedRouteId: 2327 });
            expect(result.length).toBeGreaterThan(0);

            // Validate first sailing has required fields
            const firstSailing = result[0];
            expect(firstSailing.ScheduleID).toBeGreaterThan(0);
            expect(firstSailing.SchedRouteID).toBe(2327);
            expect(firstSailing.RouteID).toBeGreaterThan(0);
            expect(firstSailing.SailingID).toBeGreaterThan(0);
            expect(firstSailing.SailingDescription).toBeDefined();
            expect(firstSailing.SailingDescription.length).toBeGreaterThan(0);
            expect(firstSailing.DisplayColNum).toBeGreaterThanOrEqual(0);
            expect(firstSailing.SailingDir).toBeGreaterThan(0);
            expect(firstSailing.DayOpDescription).toBeDefined();
            expect(firstSailing.DayOpUseForHoliday).toBeDefined();
            expect(Array.isArray(firstSailing.ActiveDateRanges)).toBe(true);
            expect(Array.isArray(firstSailing.Journs)).toBe(true);
          },
        },
        {
          name: "should return sailings with valid journeys",
          test: async () => {
            const result = await getAllSailings({ schedRouteId: 2327 });
            expect(result.length).toBeGreaterThan(0);

            // Check that each sailing has at least one journey
            result.forEach((sailing) => {
              expect(sailing.Journs.length).toBeGreaterThan(0);

              // Check first journey structure
              const firstJourney = sailing.Journs[0];
              expect(firstJourney.JourneyID).toBeGreaterThan(0);
              expect(firstJourney.VesselID).toBeGreaterThan(0);
              expect(firstJourney.VesselName).toBeDefined();
              expect(firstJourney.VesselName.length).toBeGreaterThan(0);
              expect(firstJourney.VesselHandicapAccessible).toBeDefined();
              expect(firstJourney.VesselPositionNum).toBeGreaterThan(0);
              expect(Array.isArray(firstJourney.TerminalTimes)).toBe(true);
            });
          },
        },
        {
          name: "should return sailings with valid date ranges",
          test: async () => {
            const result = await getAllSailings({ schedRouteId: 2327 });
            expect(result.length).toBeGreaterThan(0);

            // Check that each sailing has valid date ranges
            result.forEach((sailing) => {
              expect(sailing.ActiveDateRanges.length).toBeGreaterThan(0);

              sailing.ActiveDateRanges.forEach((dateRange) => {
                expect(dateRange.DateFrom).toBeDefined();
                expect(dateRange.DateThru).toBeDefined();
                expect(dateRange.EventID).toBeDefined();
                expect(dateRange.EventDescription).toBeDefined();
              });
            });
          },
        },
      ],
    },
    {
      apiFunction: getScheduledRoutes,
      outputSchema: scheduledRoutesArraySchema,
      validParams: {},
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getScheduledRoutes",
      category: "parameterless",
      maxResponseTime: 4000,
      customTests: [
        {
          name: "should return scheduled routes with valid structure",
          test: async () => {
            const result = await getScheduledRoutes();
            expect(result.length).toBeGreaterThan(0);

            // Validate first scheduled route has required fields
            const firstRoute = result[0];
            expect(firstRoute.ScheduleID).toBeGreaterThan(0);
            expect(firstRoute.SchedRouteID).toBeGreaterThan(0);
            expect(firstRoute.RouteID).toBeGreaterThan(0);
            expect(firstRoute.RouteAbbrev).toBeDefined();
            expect(firstRoute.RouteAbbrev.length).toBeGreaterThan(0);
            expect(firstRoute.Description).toBeDefined();
            expect(firstRoute.Description.length).toBeGreaterThan(0);
            expect(firstRoute.RegionID).toBeGreaterThan(0);
            expect(typeof firstRoute.ContingencyOnly).toBe("boolean");
            expect(Array.isArray(firstRoute.ServiceDisruptions)).toBe(true);
            expect(Array.isArray(firstRoute.ContingencyAdj)).toBe(true);
          },
        },
        {
          name: "should return unique scheduled route IDs",
          test: async () => {
            const result = await getScheduledRoutes();
            const routeIds = result.map((r) => r.SchedRouteID);
            const uniqueIds = new Set(routeIds);
            expect(uniqueIds.size).toBe(routeIds.length);
          },
        },
        {
          name: "should return routes with reasonable descriptions",
          test: async () => {
            const result = await getScheduledRoutes();

            // Check that descriptions are reasonable
            result.forEach((route) => {
              expect(route.Description.trim().length).toBeGreaterThan(0);
              expect(route.Description.length).toBeLessThan(500);
              expect(route.RouteAbbrev.trim().length).toBeGreaterThan(0);
              expect(route.RouteAbbrev.length).toBeLessThan(20);
            });
          },
        },
      ],
    },
    {
      apiFunction: getRoutes,
      outputSchema: routesArraySchema,
      validParams: { tripDate: new Date("2025-08-23") },
      invalidParams: [
        {
          params: { tripDate: new Date("2020-01-01") },
          expectedError: "Invalid date",
        },
        {
          params: { tripDate: new Date("2030-01-01") },
          expectedError: "Invalid date",
        },
      ],
      endpointName: "getRoutes",
      category: "parameterized",
      maxResponseTime: 4000,
      customTests: [
        {
          name: "should return routes with valid structure",
          test: async () => {
            const result = await getRoutes({
              tripDate: new Date("2025-08-23"),
            });
            expect(result.length).toBeGreaterThan(0);

            // Validate first route has required fields
            const firstRoute = result[0];
            expect(firstRoute.RouteID).toBeGreaterThan(0);
            expect(firstRoute.RouteAbbrev).toBeDefined();
            expect(firstRoute.RouteAbbrev.length).toBeGreaterThan(0);
            expect(firstRoute.Description).toBeDefined();
            expect(firstRoute.Description.length).toBeGreaterThan(0);
            expect(firstRoute.RegionID).toBeGreaterThan(0);
            expect(typeof firstRoute.ReservationFlag).toBe("boolean");
            expect(typeof firstRoute.InternationalFlag).toBe("boolean");
            expect(typeof firstRoute.PassengerOnlyFlag).toBe("boolean");
            expect(Array.isArray(firstRoute.Alerts)).toBe(true);
          },
        },
        {
          name: "should return unique route IDs",
          test: async () => {
            const result = await getRoutes({
              tripDate: new Date("2025-08-23"),
            });
            const routeIds = result.map((r) => r.RouteID);
            const uniqueIds = new Set(routeIds);
            expect(uniqueIds.size).toBe(routeIds.length);
          },
        },
        {
          name: "should return routes with reasonable descriptions",
          test: async () => {
            const result = await getRoutes({
              tripDate: new Date("2025-08-23"),
            });

            // Check that descriptions are reasonable
            result.forEach((route) => {
              expect(route.Description.trim().length).toBeGreaterThan(0);
              expect(route.Description.length).toBeLessThan(1000);
              expect(route.RouteAbbrev.trim().length).toBeGreaterThan(0);
              expect(route.RouteAbbrev.length).toBeLessThan(20);
            });
          },
        },
      ],
    },
    {
      apiFunction: getSailings,
      outputSchema: sailingsArraySchema,
      validParams: { schedRouteId: 2327 },
      invalidParams: [
        {
          params: { schedRouteId: -1 },
          expectedError: "Invalid schedRouteId",
        },
        {
          params: { schedRouteId: 999999 },
          expectedError: "Invalid schedRouteId",
        },
      ],
      endpointName: "getSailings",
      category: "parameterized",
      maxResponseTime: 4000,
      customTests: [
        {
          name: "should return sailings with valid structure",
          test: async () => {
            const result = await getSailings({ schedRouteId: 2327 });
            expect(result.length).toBeGreaterThan(0);

            // Validate first sailing has required fields
            const firstSailing = result[0];
            expect(firstSailing.ScheduleID).toBeGreaterThan(0);
            expect(firstSailing.SchedRouteID).toBe(2327);
            expect(firstSailing.RouteID).toBeGreaterThan(0);
            expect(firstSailing.SailingID).toBeGreaterThan(0);
            expect(typeof firstSailing.SailingDescription).toBe("string");
            expect(typeof firstSailing.SailingNotes).toBe("string");
            expect(typeof firstSailing.DisplayColNum).toBe("number");
            expect(typeof firstSailing.SailingDir).toBe("number");
            expect(typeof firstSailing.DayOpDescription).toBe("string");
            expect(typeof firstSailing.DayOpUseForHoliday).toBe("boolean");
            expect(Array.isArray(firstSailing.ActiveDateRanges)).toBe(true);
            expect(Array.isArray(firstSailing.Journs)).toBe(true);

            // Validate first journey has required fields
            const firstJourney = firstSailing.Journs[0];
            expect(firstJourney.JourneyID).toBeGreaterThan(0);
            expect(typeof firstJourney.ReservationInd).toBe("boolean");
            expect(typeof firstJourney.InternationalInd).toBe("boolean");
            expect(typeof firstJourney.InterislandInd).toBe("boolean");
            expect(firstJourney.VesselID).toBeGreaterThan(0);
            expect(typeof firstJourney.VesselName).toBe("string");
            expect(typeof firstJourney.VesselHandicapAccessible).toBe(
              "boolean"
            );
            expect(typeof firstJourney.VesselPositionNum).toBe("number");
            expect(Array.isArray(firstJourney.TerminalTimes)).toBe(true);

            // Validate first terminal time has required fields
            const firstTerminalTime = firstJourney.TerminalTimes[0];
            expect(firstTerminalTime.JourneyTerminalID).toBeGreaterThan(0);
            expect(firstTerminalTime.TerminalID).toBeGreaterThan(0);
            expect(typeof firstTerminalTime.TerminalDescription).toBe("string");
            expect(typeof firstTerminalTime.TerminalBriefDescription).toBe(
              "string"
            );
            expect(typeof firstTerminalTime.Time).toBe("string");
            expect(typeof firstTerminalTime.DepArrIndicator).toBe("number");
            expect(typeof firstTerminalTime.IsNA).toBe("boolean");
            expect(Array.isArray(firstTerminalTime.Annotations)).toBe(true);
          },
        },
      ],
    },
    {
      apiFunction: getTimeAdjustments,
      outputSchema: timeAdjustmentsArraySchema,
      validParams: {},
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getTimeAdjustments",
      category: "parameterless",
      maxResponseTime: 4000,
      customTests: [
        {
          name: "should return time adjustments with valid structure",
          test: async () => {
            const result = await getTimeAdjustments();
            expect(result.length).toBeGreaterThan(0);

            // Validate first time adjustment has required fields
            const firstAdjustment = result[0];
            expect(firstAdjustment.ScheduleID).toBeGreaterThan(0);
            expect(firstAdjustment.SchedRouteID).toBeGreaterThan(0);
            expect(firstAdjustment.RouteID).toBeGreaterThan(0);
            expect(typeof firstAdjustment.RouteDescription).toBe("string");
            expect(typeof firstAdjustment.RouteSortSeq).toBe("number");
            expect(firstAdjustment.SailingID).toBeGreaterThan(0);
            expect(typeof firstAdjustment.SailingDescription).toBe("string");
            expect(typeof firstAdjustment.SailingDir).toBe("number");
            expect(firstAdjustment.JourneyID).toBeGreaterThan(0);
            expect(firstAdjustment.VesselID).toBeGreaterThan(0);
            expect(typeof firstAdjustment.VesselName).toBe("string");
            expect(typeof firstAdjustment.VesselHandicapAccessible).toBe(
              "boolean"
            );
            expect(typeof firstAdjustment.VesselPositionNum).toBe("number");
            expect(firstAdjustment.TerminalID).toBeGreaterThan(0);
            expect(typeof firstAdjustment.TerminalDescription).toBe("string");
            expect(typeof firstAdjustment.TerminalBriefDescription).toBe(
              "string"
            );
            expect(firstAdjustment.JourneyTerminalID).toBeGreaterThan(0);
            expect(typeof firstAdjustment.DepArrIndicator).toBe("number");
            expect(typeof firstAdjustment.AdjType).toBe("number");
            expect(typeof firstAdjustment.TidalAdj).toBe("boolean");
            expect(Array.isArray(firstAdjustment.Annotations)).toBe(true);

            // Validate ActiveSailingDateRange structure
            expect(firstAdjustment.ActiveSailingDateRange).toBeDefined();
            expect(
              firstAdjustment.ActiveSailingDateRange.DateFrom
            ).toBeDefined();
            expect(
              firstAdjustment.ActiveSailingDateRange.DateThru
            ).toBeDefined();
            expect(firstAdjustment.ActiveSailingDateRange.EventID).toBeNull();
            expect(
              firstAdjustment.ActiveSailingDateRange.EventDescription
            ).toBeNull();

            // Validate AdjDateFrom and AdjDateThru
            expect(firstAdjustment.AdjDateFrom).toBeDefined();
            expect(firstAdjustment.AdjDateThru).toBeDefined();
          },
        },
      ],
    },
  ],
  settings: {
    defaultMaxResponseTime: 5000,
    requiresAuth: true,
    rateLimitDelay: 100,
  },
};
