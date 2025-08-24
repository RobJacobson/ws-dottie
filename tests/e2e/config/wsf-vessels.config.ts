import { expect } from "vitest";

import {
  getCacheFlushDateVessels,
  getVesselAccommodations,
  getVesselAccommodationsById,
  getVesselAccommodationsByIdParamsSchema,
  getVesselBasics,
  getVesselBasicsById,
  getVesselBasicsByIdParamsSchema,
  getVesselHistoryByVesselAndDateRange,
  getVesselHistoryByVesselAndDateRangeParamsSchema,
  getVesselLocations,
  getVesselLocationsByVesselId,
  getVesselLocationsByVesselIdParamsSchema,
  getVesselStats,
  getVesselStatsById,
  getVesselStatsByIdParamsSchema,
  getVesselVerbose,
  getVesselVerboseById,
  getVesselVerboseByIdParamsSchema,
  vesselAccommodationArraySchema,
  vesselAccommodationSchema,
  vesselBasicArraySchema,
  vesselBasicSchema,
  vesselHistoryArraySchema,
  vesselHistorySchema,
  vesselLocationArraySchema,
  vesselLocationSchema,
  vesselStatsArraySchema,
  vesselStatsSchema,
  vesselsCacheFlushDateSchema,
  vesselVerboseArraySchema,
  vesselVerboseSchema,
} from "@/api/wsf-vessels";

import { ApiModuleConfig } from "../utils/types";

export const wsfVesselsTestConfig: ApiModuleConfig = {
  moduleName: "WSF Vessels",
  endpoints: [
    {
      apiFunction: getCacheFlushDateVessels,
      outputSchema: vesselsCacheFlushDateSchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getCacheFlushDateVessels",
      category: "parameterless", // Parameterless endpoint that returns a single Date object
      isSingleValue: true, // Returns a Date object, not an array
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return a valid Date object",
          test: async () => {
            const result = await getCacheFlushDateVessels();
            expect(result).toBeInstanceOf(Date);
            expect(result.getTime()).toBeGreaterThan(0);
          },
        },
        {
          name: "should return a recent date",
          test: async () => {
            const result = await getCacheFlushDateVessels();
            const now = new Date();
            const oneYearAgo = new Date(
              now.getTime() - 365 * 24 * 60 * 60 * 1000
            );
            expect(result.getTime()).toBeGreaterThan(oneYearAgo.getTime());
          },
        },
      ],
    },
    {
      apiFunction: getVesselBasics,
      outputSchema: vesselBasicArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getVesselBasics",
      category: "parameterless",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return vessels with valid vessel IDs",
          test: async () => {
            const result = await getVesselBasics();
            const vesselsWithValidIds = result.filter(
              (vessel) => vessel.VesselID && vessel.VesselID > 0
            );
            expect(vesselsWithValidIds.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return vessels with valid class information",
          test: async () => {
            const result = await getVesselBasics();
            const vesselsWithClassInfo = result.filter(
              (vessel) =>
                vessel.Class &&
                vessel.Class.ClassName &&
                vessel.Class.ClassName.length > 0
            );
            expect(vesselsWithClassInfo.length).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getVesselBasicsById,
      inputSchema: getVesselBasicsByIdParamsSchema,
      outputSchema: vesselBasicSchema,
      validParams: { vesselId: 1 }, // Cathlamet vessel
      invalidParams: [
        { params: { vesselId: -1 }, expectedError: "Invalid vessel ID" },
        { params: { vesselId: 0 }, expectedError: "Invalid vessel ID" },
        { params: { vesselId: 999999 }, expectedError: "Vessel not found" },
      ],
      endpointName: "getVesselBasicsById",
      category: "id-based",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return vessel with matching ID",
          test: async () => {
            const result = await getVesselBasicsById({ vesselId: 1 });
            expect(result.VesselID).toBe(1);
            expect(result.VesselName).toBe("Cathlamet");
          },
        },
        {
          name: "should return vessel with complete class information",
          test: async () => {
            const result = await getVesselBasicsById({ vesselId: 1 });
            expect(result.Class).toBeDefined();
            expect(result.Class.ClassName).toBe("Issaquah 130");
            expect(result.Class.PublicDisplayName).toBe("Issaquah");
          },
        },
      ],
    },
    {
      apiFunction: getVesselLocations,
      outputSchema: vesselLocationArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getVesselLocations",
      category: "parameterless",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return vessels with valid location data",
          test: async () => {
            const result = await getVesselLocations();
            const vesselsWithLocation = result.filter(
              (vessel) =>
                vessel.Latitude &&
                vessel.Longitude &&
                vessel.Latitude !== 0 &&
                vessel.Longitude !== 0
            );
            expect(vesselsWithLocation.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return vessels with valid speed and heading",
          test: async () => {
            const result = await getVesselLocations();
            const vesselsWithSpeedHeading = result.filter(
              (vessel) =>
                typeof vessel.Speed === "number" &&
                typeof vessel.Heading === "number"
            );
            expect(vesselsWithSpeedHeading.length).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getVesselAccommodations,
      outputSchema: vesselAccommodationArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getVesselAccommodations",
      category: "parameterless",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return vessels with valid accommodation data",
          test: async () => {
            const result = await getVesselAccommodations();
            const vesselsWithAccommodations = result.filter(
              (vessel) =>
                vessel.VesselID &&
                vessel.VesselID > 0 &&
                vessel.VesselName &&
                vessel.VesselName.length > 0
            );
            expect(vesselsWithAccommodations.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return vessels with valid ADA information",
          test: async () => {
            const result = await getVesselAccommodations();
            const vesselsWithADAInfo = result.filter(
              (vessel) =>
                vessel.ADAAccessible !== undefined &&
                vessel.ADAInfo &&
                vessel.ADAInfo.length > 0
            );
            expect(vesselsWithADAInfo.length).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getVesselAccommodationsById,
      inputSchema: getVesselAccommodationsByIdParamsSchema,
      outputSchema: vesselAccommodationSchema,
      validParams: { vesselId: 1 }, // Cathlamet vessel
      invalidParams: [
        { params: { vesselId: -1 }, expectedError: "Invalid vessel ID" },
        { params: { vesselId: 0 }, expectedError: "Invalid vessel ID" },
        { params: { vesselId: 999999 }, expectedError: "Vessel not found" },
      ],
      endpointName: "getVesselAccommodationsById",
      category: "id-based",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return vessel with matching ID",
          test: async () => {
            const result = await getVesselAccommodationsById({ vesselId: 1 });
            expect(result.VesselID).toBe(1);
            expect(result.VesselName).toBe("Cathlamet");
          },
        },
        {
          name: "should return vessel with complete accommodation information",
          test: async () => {
            const result = await getVesselAccommodationsById({ vesselId: 1 });
            expect(result.ADAAccessible).toBe(true);
            expect(result.Elevator).toBe(true);
            expect(result.ADAInfo).toBeDefined();
            expect(result.ADAInfo.length).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getVesselLocationsByVesselId,
      inputSchema: getVesselLocationsByVesselIdParamsSchema,
      outputSchema: vesselLocationSchema,
      validParams: { vesselId: 1 }, // Cathlamet vessel
      invalidParams: [
        { params: { vesselId: -1 }, expectedError: "Invalid vessel ID" },
        { params: { vesselId: 0 }, expectedError: "Invalid vessel ID" },
        { params: { vesselId: 999999 }, expectedError: "Vessel not found" },
      ],
      endpointName: "getVesselLocationsByVesselId",
      category: "id-based",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return vessel with matching ID",
          test: async () => {
            const result = await getVesselLocationsByVesselId({ vesselId: 1 });
            expect(result.VesselID).toBe(1);
            expect(result.VesselName).toBe("Cathlamet");
          },
        },
        {
          name: "should return vessel with valid location data",
          test: async () => {
            const result = await getVesselLocationsByVesselId({ vesselId: 1 });
            expect(result.Latitude).toBeGreaterThan(0);
            expect(result.Longitude).toBeLessThan(0); // Seattle area is negative longitude
            expect(result.Speed).toBeGreaterThanOrEqual(0);
          },
        },
      ],
    },
    {
      apiFunction: getVesselStats,
      outputSchema: vesselStatsArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getVesselStats",
      category: "parameterless",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return vessels with valid statistics data",
          test: async () => {
            const result = await getVesselStats();
            const vesselsWithStats = result.filter(
              (vessel) =>
                vessel.VesselID &&
                vessel.VesselID > 0 &&
                vessel.VesselName &&
                vessel.VesselName.length > 0
            );
            expect(vesselsWithStats.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return vessels with valid capacity information",
          test: async () => {
            const result = await getVesselStats();
            const vesselsWithCapacity = result.filter(
              (vessel) =>
                vessel.MaxPassengerCount &&
                vessel.MaxPassengerCount > 0 &&
                vessel.RegDeckSpace &&
                vessel.RegDeckSpace > 0
            );
            expect(vesselsWithCapacity.length).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getVesselStatsById,
      inputSchema: getVesselStatsByIdParamsSchema,
      outputSchema: vesselStatsSchema,
      validParams: { vesselId: 1 }, // Cathlamet vessel
      invalidParams: [
        { params: { vesselId: -1 }, expectedError: "Invalid vessel ID" },
        { params: { vesselId: 0 }, expectedError: "Invalid vessel ID" },
        { params: { vesselId: 999999 }, expectedError: "Vessel not found" },
      ],
      endpointName: "getVesselStatsById",
      category: "id-based",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return vessel with matching ID",
          test: async () => {
            const result = await getVesselStatsById({ vesselId: 1 });
            expect(result.VesselID).toBe(1);
            expect(result.VesselName).toBe("Cathlamet");
          },
        },
        {
          name: "should return vessel with complete statistics information",
          test: async () => {
            const result = await getVesselStatsById({ vesselId: 1 });
            expect(result.MaxPassengerCount).toBeGreaterThan(0);
            expect(result.RegDeckSpace).toBeGreaterThan(0);
            expect(result.EngineCount).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getVesselVerbose,
      outputSchema: vesselVerboseArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getVesselVerbose",
      category: "parameterless",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return vessels with verbose information",
          test: async () => {
            const result = await getVesselVerbose();
            const vesselsWithVerboseInfo = result.filter(
              (vessel) =>
                vessel.VesselID &&
                vessel.VesselID > 0 &&
                vessel.VesselName &&
                vessel.VesselName.length > 0
            );
            expect(vesselsWithVerboseInfo.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return vessels with detailed class information",
          test: async () => {
            const result = await getVesselVerbose();
            const vesselsWithClassInfo = result.filter(
              (vessel) =>
                vessel.Class &&
                vessel.Class.ClassName &&
                vessel.Class.ClassName.length > 0
            );
            expect(vesselsWithClassInfo.length).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getVesselVerboseById,
      inputSchema: getVesselVerboseByIdParamsSchema,
      outputSchema: vesselVerboseSchema,
      validParams: { vesselId: 1 }, // Cathlamet vessel
      invalidParams: [
        { params: { vesselId: -1 }, expectedError: "Invalid vessel ID" },
        { params: { vesselId: 0 }, expectedError: "Invalid vessel ID" },
        { params: { vesselId: 999999 }, expectedError: "Vessel not found" },
      ],
      endpointName: "getVesselVerboseById",
      category: "id-based",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return vessel with matching ID",
          test: async () => {
            const result = await getVesselVerboseById({ vesselId: 1 });
            expect(result.VesselID).toBe(1);
            expect(result.VesselName).toBe("Cathlamet");
          },
        },
        {
          name: "should return vessel with complete verbose information",
          test: async () => {
            const result = await getVesselVerboseById({ vesselId: 1 });
            expect(result.Class).toBeDefined();
            expect(result.Class.ClassName).toBe("Issaquah 130");
            expect(result.Class.PublicDisplayName).toBe("Issaquah");
            expect(result.MaxPassengerCount).toBeGreaterThan(0);
            expect(result.RegDeckSpace).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getVesselHistoryByVesselAndDateRange,
      inputSchema: getVesselHistoryByVesselAndDateRangeParamsSchema,
      outputSchema: vesselHistoryArraySchema,
      validParams: {
        vesselName: "Cathlamet",
        dateStart: new Date("2024-01-01"),
        dateEnd: new Date("2024-01-31"),
      }, // Cathlamet vessel, January 2024
      invalidParams: [
        {
          params: {
            vesselName: "InvalidVessel",
            dateStart: new Date("2024-01-01"),
            dateEnd: new Date("2024-01-31"),
          },
          expectedError: "Invalid vessel name",
        },
        {
          params: {
            vesselName: "Cathlamet",
            dateStart: new Date("2024-12-31"),
            dateEnd: new Date("2024-01-01"),
          },
          expectedError: "Start date must be before end date",
        },
      ],
      endpointName: "getVesselHistoryByVesselAndDateRange",
      category: "date-based",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return history for specified vessel and date range",
          test: async () => {
            const result = await getVesselHistoryByVesselAndDateRange({
              vesselName: "Cathlamet",
              dateStart: new Date("2024-01-01"),
              dateEnd: new Date("2024-01-31"),
            });
            expect(result.length).toBeGreaterThan(0);
            const vessel = result.find((v) => v.Vessel === "Cathlamet");
            expect(vessel).toBeDefined();
            expect(vessel!.Vessel).toBe("Cathlamet");
          },
        },
        {
          name: "should return history data within specified date range",
          test: async () => {
            const result = await getVesselHistoryByVesselAndDateRange({
              vesselName: "Cathlamet",
              dateStart: new Date("2024-01-01"),
              dateEnd: new Date("2024-01-31"),
            });
            const vessel = result.find((v) => v.Vessel === "Cathlamet");
            if (vessel && vessel.Date) {
              const historyDate = new Date(vessel.Date);
              const startDate = new Date("2024-01-01");
              const endDate = new Date("2024-01-31");

              expect(historyDate.getTime()).toBeGreaterThanOrEqual(
                startDate.getTime()
              );
              expect(historyDate.getTime()).toBeLessThanOrEqual(
                endDate.getTime()
              );
            }
          },
        },
      ],
    },
  ],
  settings: {
    defaultMaxResponseTime: 5000,
    requiresAuth: false,
    rateLimitDelay: 100,
  },
};
