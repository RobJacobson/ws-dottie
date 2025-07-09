/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> For testing purposes */
import { describe, expect, it, vi } from "vitest";

import {
  type TransformedJson,
  type TransformedJsonArray,
  transformWsfData,
} from "@/shared/fetching/utils";

import {
  mockRawTerminalResponse,
  mockRawVesselLocationResponse,
} from "../../../tests/utils";

describe("WSF Data Transformation", () => {
  describe("transformWsfData", () => {
    it("should transform WSF date format to JavaScript Date objects", () => {
      const input = {
        LastUpdate: "/Date(1703123456789)/",
        DepartureTime: "2023-12-21T14:30:00",
        ArrivalDate: "12/21/2023",
      };

      const result = transformWsfData(input) as Record<string, any>;

      expect(result.lastUpdate).toBeInstanceOf(Date);
      expect(result.lastUpdate?.getTime()).toBe(1703123456789);
      expect(result.departureTime).toBeInstanceOf(Date);
      expect(result.departureTime?.toISOString()).toBe(
        "2023-12-21T14:30:00.000Z"
      );
      expect(result.arrivalDate).toBeInstanceOf(Date);
      expect(result.arrivalDate?.toISOString()).toBe(
        "2023-12-21T00:00:00.000Z"
      );
    });

    it("should convert PascalCase keys to camelCase", () => {
      const input = {
        VesselId: 1,
        VesselName: "Test Vessel",
        LastUpdate: "/Date(1703123456789)/",
      };

      const result = transformWsfData(input) as Record<string, any>;

      expect(result.vesselId).toBe(1);
      expect(result.vesselName).toBe("Test Vessel");
      expect(result.lastUpdate).toBeInstanceOf(Date);
    });

    it("should handle nested objects", () => {
      const input = {
        Vessel: {
          VesselId: 1,
          VesselName: "Test Vessel",
          LastUpdate: "/Date(1703123456789)/",
        },
        Route: {
          RouteId: 1,
          RouteName: "Test Route",
        },
      };

      const result = transformWsfData(input) as Record<string, any>;

      expect(result.vessel.vesselId).toBe(1);
      expect(result.vessel.vesselName).toBe("Test Vessel");
      expect(result.vessel.lastUpdate).toBeInstanceOf(Date);
      expect(result.route.routeId).toBe(1);
      expect(result.route.routeName).toBe("Test Route");
    });

    it("should handle arrays", () => {
      const input = [
        {
          VesselId: 1,
          VesselName: "Vessel 1",
          LastUpdate: "/Date(1703123456789)/",
        },
        {
          VesselId: 2,
          VesselName: "Vessel 2",
          LastUpdate: "/Date(1703123456790)/",
        },
      ];

      const result = transformWsfData(input) as Record<string, any>[];

      expect(Array.isArray(result)).toBe(true);
      expect(result[0].vesselId).toBe(1);
      expect(result[0].vesselName).toBe("Vessel 1");
      expect(result[0].lastUpdate).toBeInstanceOf(Date);
      expect(result[1].vesselId).toBe(2);
      expect(result[1].vesselName).toBe("Vessel 2");
      expect(result[1].lastUpdate).toBeInstanceOf(Date);
    });

    it("should handle mixed date formats", () => {
      const input = {
        WsfDate: "/Date(1703123456789)/",
        IsoDate: "2023-12-21",
        UsDate: "12/21/2023",
        IsoDateTime: "2023-12-21T14:30:00",
        InvalidDate: "not-a-date",
        RegularString: "just a string",
        Number: 42,
        Boolean: true,
      };

      const result = transformWsfData(input) as Record<string, any>;

      expect(result.wsfDate).toBeInstanceOf(Date);
      expect(result.wsfDate?.getTime()).toBe(1703123456789);
      expect(result.isoDate).toBeInstanceOf(Date);
      expect(result.isoDate?.toISOString()).toBe("2023-12-21T00:00:00.000Z");
      expect(result.usDate).toBeInstanceOf(Date);
      expect(result.usDate?.toISOString()).toBe("2023-12-21T00:00:00.000Z");
      expect(result.isoDateTime).toBeInstanceOf(Date);
      expect(result.isoDateTime?.toISOString()).toBe(
        "2023-12-21T14:30:00.000Z"
      );
      expect(result.invalidDate).toBe("not-a-date"); // Should remain unchanged
      expect(result.regularString).toBe("just a string");
      expect(result.number).toBe(42);
      expect(result.boolean).toBe(true);
    });

    it("should handle null and undefined values", () => {
      const input = {
        NullValue: null,
        EmptyString: "",
        Zero: 0,
        False: false,
      };

      const result = transformWsfData(input) as Record<string, any>;

      expect(result.nullValue).toBeNull();
      expect(result.emptyString).toBe("");
      expect(result.zero).toBe(0);
      expect(result.false).toBe(false);
    });

    it("should handle complex nested structures", () => {
      const input = {
        Vessels: [
          {
            VesselId: 1,
            VesselName: "Vessel 1",
            Location: {
              Latitude: 47.6062,
              Longitude: -122.3321,
              LastUpdate: "/Date(1703123456789)/",
            },
            Schedules: [
              {
                ScheduleId: 1,
                DepartureTime: "2023-12-21T14:30:00",
                ArrivalTime: "2023-12-21T15:00:00",
              },
            ],
          },
        ],
        Metadata: {
          LastUpdated: "/Date(1703123456789)/",
          Version: "1.0",
        },
      };

      const result = transformWsfData(input) as Record<string, any>;

      expect(result.vessels[0].vesselId).toBe(1);
      expect(result.vessels[0].vesselName).toBe("Vessel 1");
      expect(result.vessels[0].location.latitude).toBe(47.6062);
      expect(result.vessels[0].location.longitude).toBe(-122.3321);
      expect(result.vessels[0].location.lastUpdate).toBeInstanceOf(Date);
      expect(result.vessels[0].schedules[0].scheduleId).toBe(1);
      expect(result.vessels[0].schedules[0].departureTime).toBeInstanceOf(Date);
      expect(result.vessels[0].schedules[0].arrivalTime).toBeInstanceOf(Date);
      expect(result.metadata.lastUpdated).toBeInstanceOf(Date);
      expect(result.metadata.version).toBe("1.0");
    });

    it("should handle real WSF API response format", () => {
      const result = transformWsfData(
        mockRawVesselLocationResponse[0]
      ) as Record<string, any>;

      expect(result.vesselID).toBe(1);
      expect(result.vesselName).toBe("M/V Cathlamet");
      expect(result.longitude).toBe(-122.3321);
      expect(result.latitude).toBe(47.6062);
      expect(result.heading).toBe(180);
      expect(result.speed).toBe(12.5);
      expect(result.inService).toBe(true);
      expect(result.atDock).toBe(false);
      expect(result.departingTerminalId).toBe(1);
      expect(result.departingTerminalName).toBe("Seattle");
      expect(result.arrivingTerminalId).toBe(2);
      expect(result.arrivingTerminalName).toBe("Bainbridge Island");
      expect(result.scheduledDeparture).toBeInstanceOf(Date);
      expect(result.estimatedArrival).toBeInstanceOf(Date);
      expect(result.lastUpdated).toBeInstanceOf(Date);
    });
  });
});
