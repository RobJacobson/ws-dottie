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
} from "../../utils";

describe("WSF Data Transformation", () => {
  describe("transformWsfData", () => {
    it("should transform WSF date format to JavaScript Date objects", () => {
      const input = {
        LastUpdate: "/Date(1703123456789)/",
        DepartureTime: "2023-12-21T14:30:00",
        ArrivalDate: "12/21/2023",
      };

      const result = transformWsfData(input) as Record<string, any>;

      expect(result.LastUpdate).toBeInstanceOf(Date);
      expect(result.LastUpdate?.getTime()).toBe(1703123456789);
      expect(result.DepartureTime).toBeInstanceOf(Date);
      expect(result.DepartureTime?.toISOString()).toBe(
        "2023-12-21T22:30:00.000Z"
      );
      expect(result.ArrivalDate).toBeInstanceOf(Date);
      expect(result.ArrivalDate?.toISOString()).toBe(
        "2023-12-21T08:00:00.000Z"
      );
    });

    it("should preserve PascalCase keys", () => {
      const input = {
        VesselID: 1,
        VesselName: "Test Vessel",
        LastUpdate: "/Date(1703123456789)/",
      };

      const result = transformWsfData(input) as Record<string, any>;

      expect(result.VesselID).toBe(1);
      expect(result.VesselName).toBe("Test Vessel");
      expect(result.LastUpdate).toBeInstanceOf(Date);
    });

    it("should handle nested objects", () => {
      const input = {
        Vessel: {
          VesselID: 1,
          VesselName: "Test Vessel",
          LastUpdate: "/Date(1703123456789)/",
        },
        Route: {
          RouteID: 1,
          RouteName: "Test Route",
        },
      };

      const result = transformWsfData(input) as Record<string, any>;

      expect(result.Vessel.VesselID).toBe(1);
      expect(result.Vessel.VesselName).toBe("Test Vessel");
      expect(result.Vessel.LastUpdate).toBeInstanceOf(Date);
      expect(result.Route.RouteID).toBe(1);
      expect(result.Route.RouteName).toBe("Test Route");
    });

    it("should handle arrays", () => {
      const input = [
        {
          VesselID: 1,
          VesselName: "Vessel 1",
          LastUpdate: "/Date(1703123456789)/",
        },
        {
          VesselID: 2,
          VesselName: "Vessel 2",
          LastUpdate: "/Date(1703123456790)/",
        },
      ];

      const result = transformWsfData(input) as Record<string, any>[];

      expect(Array.isArray(result)).toBe(true);
      expect(result[0].VesselID).toBe(1);
      expect(result[0].VesselName).toBe("Vessel 1");
      expect(result[0].LastUpdate).toBeInstanceOf(Date);
      expect(result[1].VesselID).toBe(2);
      expect(result[1].VesselName).toBe("Vessel 2");
      expect(result[1].LastUpdate).toBeInstanceOf(Date);
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

      expect(result.WsfDate).toBeInstanceOf(Date);
      expect(result.WsfDate?.getTime()).toBe(1703123456789);
      expect(result.IsoDate).toBeInstanceOf(Date);
      expect(result.IsoDate?.toISOString()).toBe("2023-12-21T00:00:00.000Z");
      expect(result.UsDate).toBeInstanceOf(Date);
      expect(result.UsDate?.toISOString()).toBe("2023-12-21T08:00:00.000Z");
      expect(result.IsoDateTime).toBeInstanceOf(Date);
      expect(result.IsoDateTime?.toISOString()).toBe(
        "2023-12-21T22:30:00.000Z"
      );
      expect(result.InvalidDate).toBe("not-a-date"); // Should remain unchanged
      expect(result.RegularString).toBe("just a string");
      expect(result.Number).toBe(42);
      expect(result.Boolean).toBe(true);
    });

    it("should handle null and undefined values", () => {
      const input = {
        NullValue: null,
        EmptyString: "",
        Zero: 0,
        False: false,
      };

      const result = transformWsfData(input) as Record<string, any>;

      expect(result.NullValue).toBeNull();
      expect(result.EmptyString).toBeNull(); // Empty strings are converted to null
      expect(result.Zero).toBe(0);
      expect(result.False).toBe(false);
    });

    it("should handle complex nested structures", () => {
      const input = {
        Vessels: [
          {
            VesselID: 1,
            VesselName: "Vessel 1",
            Location: {
              Latitude: 47.6062,
              Longitude: -122.3321,
              LastUpdate: "/Date(1703123456789)/",
            },
            Schedules: [
              {
                ScheduleID: 1,
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

      expect(result.Vessels[0].VesselID).toBe(1);
      expect(result.Vessels[0].VesselName).toBe("Vessel 1");
      expect(result.Vessels[0].Location.Latitude).toBe(47.6062);
      expect(result.Vessels[0].Location.Longitude).toBe(-122.3321);
      expect(result.Vessels[0].Location.LastUpdate).toBeInstanceOf(Date);
      expect(result.Vessels[0].Schedules[0].ScheduleID).toBe(1);
      expect(result.Vessels[0].Schedules[0].DepartureTime).toBeInstanceOf(Date);
      expect(result.Vessels[0].Schedules[0].ArrivalTime).toBeInstanceOf(Date);
      expect(result.Metadata.LastUpdated).toBeInstanceOf(Date);
      expect(result.Metadata.Version).toBe("1.0");
    });

    it("should handle real WSF API response format", () => {
      const result = transformWsfData(
        mockRawVesselLocationResponse[0]
      ) as Record<string, any>;

      expect(result.VesselID).toBe(1);
      expect(result.VesselName).toBe("M/V Cathlamet");
      expect(result.Longitude).toBe(-122.3321);
      expect(result.Latitude).toBe(47.6062);
      expect(result.Heading).toBe(180);
      expect(result.Speed).toBe(12.5);
      expect(result.InService).toBe(true);
      expect(result.AtDock).toBe(false);
      expect(result.DepartingTerminalID).toBe(1);
      expect(result.DepartingTerminalName).toBe("Seattle");
      expect(result.ArrivingTerminalID).toBe(2);
      expect(result.ArrivingTerminalName).toBe("Bainbridge Island");
      expect(result.TimeStamp).toBeInstanceOf(Date);
      expect(result.ScheduledDeparture).toBeInstanceOf(Date);
      expect(result.EstimatedArrival).toBeInstanceOf(Date);
    });
  });
});
