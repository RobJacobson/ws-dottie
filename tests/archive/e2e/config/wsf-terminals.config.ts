import { expect } from "vitest";

import {
  getTerminalBasics,
  getTerminalBasicsByTerminalId,
  getTerminalBulletins,
  getTerminalBulletinsByTerminalId,
  getTerminalLocations,
  getTerminalLocationsByTerminalId,
  getTerminalSailingSpace,
  getTerminalSailingSpaceByTerminalId,
  getTerminalTransports,
  getTerminalTransportsByTerminalId,
  getTerminalVerbose,
  getTerminalVerboseByTerminalId,
  getTerminalWaitTimes,
  getTerminalWaitTimesByTerminalId,
  terminalBasicsArraySchema,
  terminalBasicsSchema,
  terminalBulletinSchema,
  terminalBulletinsArraySchema,
  terminalLocationSchema,
  terminalLocationsArraySchema,
  terminalSailingSpaceArraySchema,
  terminalSailingSpaceSchema,
  terminalTransportArraySchema,
  terminalTransportSchema,
  terminalVerboseArraySchema,
  terminalVerboseSchema,
  terminalWaitTimesArraySchema,
  terminalWaitTimesSchema,
} from "@/clients/wsf-terminals";
import {
  getCacheFlushDateTerminals,
  getCacheFlushDateTerminalsResponseSchema,
} from "@/clients/wsf-terminals/getCacheFlushDateTerminals";

import { wsfTestData } from "../utils/test-data";
import type { ApiModuleConfig } from "../utils/types";

export const wsfTerminalsTestConfig: ApiModuleConfig = {
  moduleName: "WSF Terminals",
  endpoints: [
    {
      apiFunction: getCacheFlushDateTerminals,
      outputSchema: getCacheFlushDateTerminalsResponseSchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getCacheFlushDateTerminals",
      category: "cache-info" as any, // Special category for cache info endpoints
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return a valid date object",
          test: async () => {
            const result = await getCacheFlushDateTerminals();
            expect(result).toBeInstanceOf(Date);
            expect(result.getTime()).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getTerminalBasics,
      outputSchema: terminalBasicsArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getTerminalBasics",
      category: "parameterless",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return terminals with valid IDs",
          test: async () => {
            const result = await getTerminalBasics();
            const terminalsWithValidIds = result.filter(
              (terminal) => terminal.TerminalID && terminal.TerminalID > 0
            );
            expect(terminalsWithValidIds.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return terminals with valid names",
          test: async () => {
            const result = await getTerminalBasics();
            const terminalsWithNames = result.filter(
              (terminal) =>
                terminal.TerminalName && terminal.TerminalName.length > 0
            );
            expect(terminalsWithNames.length).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getTerminalLocations,
      outputSchema: terminalLocationsArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getTerminalLocations",
      category: "parameterless",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return terminals with valid coordinates",
          test: async () => {
            const result = await getTerminalLocations();
            const terminalsWithCoordinates = result.filter(
              (terminal) => terminal.Latitude && terminal.Longitude
            );
            expect(terminalsWithCoordinates.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return terminals with valid addresses",
          test: async () => {
            const result = await getTerminalLocations();
            const terminalsWithAddresses = result.filter(
              (terminal) =>
                terminal.AddressLineOne && terminal.City && terminal.State
            );
            expect(terminalsWithAddresses.length).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getTerminalBasicsByTerminalId,
      outputSchema: terminalBasicsSchema,
      validParams: { terminalId: 1 }, // Anacortes terminal
      invalidParams: [
        { params: { terminalId: -1 }, expectedError: "Invalid terminal ID" },
        { params: { terminalId: 0 }, expectedError: "Invalid terminal ID" },
        { params: { terminalId: 999999 }, expectedError: "Terminal not found" },
      ],
      endpointName: "getTerminalBasicsByTerminalId",
      category: "id-based",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return terminal with matching ID",
          test: async () => {
            const validId = 1;
            const result = await getTerminalBasicsByTerminalId({
              terminalId: validId,
            });
            expect(result.TerminalID).toBe(validId);
          },
        },
        {
          name: "should return terminal with complete basic information",
          test: async () => {
            const result = await getTerminalBasicsByTerminalId({
              terminalId: 1,
            });
            expect(result.TerminalName).toBeDefined();
            expect(result.TerminalAbbrev).toBeDefined();
            expect(result.RegionID).toBeDefined();
          },
        },
      ],
    },
    {
      apiFunction: getTerminalLocationsByTerminalId,
      outputSchema: terminalLocationSchema,
      validParams: { terminalId: 1 }, // Anacortes terminal
      invalidParams: [
        { params: { terminalId: -1 }, expectedError: "Invalid terminal ID" },
        { params: { terminalId: 0 }, expectedError: "Invalid terminal ID" },
        { params: { terminalId: 999999 }, expectedError: "Terminal not found" },
      ],
      endpointName: "getTerminalLocationsByTerminalId",
      category: "id-based",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return terminal location with matching ID",
          test: async () => {
            const validId = 1;
            const result = await getTerminalLocationsByTerminalId({
              terminalId: validId,
            });
            expect(result.TerminalID).toBe(validId);
          },
        },
        {
          name: "should return terminal with complete location information",
          test: async () => {
            const result = await getTerminalLocationsByTerminalId({
              terminalId: 1,
            });
            expect(result.Latitude).toBeDefined();
            expect(result.Longitude).toBeDefined();
            expect(result.AddressLineOne).toBeDefined();
            expect(result.City).toBeDefined();
            expect(result.State).toBeDefined();
          },
        },
      ],
    },
    {
      apiFunction: getTerminalBulletins,
      outputSchema: terminalBulletinsArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getTerminalBulletins",
      category: "parameterless",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return terminals with bulletins",
          test: async () => {
            const result = await getTerminalBulletins();
            const terminalsWithBulletins = result.filter(
              (terminal) => terminal.Bulletins && terminal.Bulletins.length > 0
            );
            expect(terminalsWithBulletins.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return bulletins with valid content",
          test: async () => {
            const result = await getTerminalBulletins();
            const bulletinsWithContent = result.flatMap(
              (terminal) =>
                terminal.Bulletins?.filter(
                  (bulletin) => bulletin.BulletinTitle && bulletin.BulletinText
                ) || []
            );
            expect(bulletinsWithContent.length).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getTerminalBulletinsByTerminalId,
      outputSchema: terminalBulletinSchema,
      validParams: { terminalId: 1 }, // Anacortes terminal
      invalidParams: [
        { params: { terminalId: -1 }, expectedError: "Invalid terminal ID" },
        { params: { terminalId: 0 }, expectedError: "Invalid terminal ID" },
        { params: { terminalId: 999999 }, expectedError: "Terminal not found" },
      ],
      endpointName: "getTerminalBulletinsByTerminalId",
      category: "id-based",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return terminal with matching ID",
          test: async () => {
            const validId = 1;
            const result = await getTerminalBulletinsByTerminalId({
              terminalId: validId,
            });
            expect(result.TerminalID).toBe(validId);
          },
        },
        {
          name: "should return terminal with bulletins array",
          test: async () => {
            const result = await getTerminalBulletinsByTerminalId({
              terminalId: 1,
            });
            expect(Array.isArray(result.Bulletins)).toBe(true);
            expect(result.Bulletins.length).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getTerminalSailingSpace,
      outputSchema: terminalSailingSpaceArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getTerminalSailingSpace",
      category: "parameterless",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return terminals with sailing spaces",
          test: async () => {
            const result = await getTerminalSailingSpace();
            const terminalsWithSailingSpaces = result.filter(
              (terminal) =>
                terminal.DepartingSpaces && terminal.DepartingSpaces.length > 0
            );
            expect(terminalsWithSailingSpaces.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return sailing spaces with valid departure times",
          test: async () => {
            const result = await getTerminalSailingSpace();
            const sailingSpacesWithDepartures = result.flatMap(
              (terminal) =>
                terminal.DepartingSpaces?.filter(
                  (space) =>
                    space.Departure && space.VesselID && space.VesselName
                ) || []
            );
            expect(sailingSpacesWithDepartures.length).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getTerminalSailingSpaceByTerminalId,
      outputSchema: terminalSailingSpaceSchema,
      validParams: { terminalId: 1 }, // Anacortes terminal
      invalidParams: [
        { params: { terminalId: -1 }, expectedError: "Invalid terminal ID" },
        { params: { terminalId: 0 }, expectedError: "Invalid terminal ID" },
        { params: { terminalId: 999999 }, expectedError: "Terminal not found" },
      ],
      endpointName: "getTerminalSailingSpaceByTerminalId",
      category: "id-based",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return terminal with matching ID",
          test: async () => {
            const validId = 1;
            const result = await getTerminalSailingSpaceByTerminalId({
              terminalId: validId,
            });
            expect(result.TerminalID).toBe(validId);
          },
        },
        {
          name: "should return terminal with departing spaces array",
          test: async () => {
            const result = await getTerminalSailingSpaceByTerminalId({
              terminalId: 1,
            });
            expect(Array.isArray(result.DepartingSpaces)).toBe(true);
            expect(result.DepartingSpaces.length).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getTerminalTransports,
      outputSchema: terminalTransportArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getTerminalTransports",
      category: "parameterless",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return terminals with transport info",
          test: async () => {
            const result = await getTerminalTransports();
            const terminalsWithTransportInfo = result.filter(
              (terminal) =>
                terminal.ParkingInfo || terminal.TransitLinks.length > 0
            );
            expect(terminalsWithTransportInfo.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return terminals with transit links",
          test: async () => {
            const result = await getTerminalTransports();
            const terminalsWithTransitLinks = result.filter(
              (terminal) =>
                terminal.TransitLinks && terminal.TransitLinks.length > 0
            );
            expect(terminalsWithTransitLinks.length).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getTerminalTransportsByTerminalId,
      outputSchema: terminalTransportSchema,
      validParams: { terminalId: 1 },
      invalidParams: { terminalId: -1 },
      endpointName: "getTerminalTransportsByTerminalId",
      category: "parameterized",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return specific terminal transport info",
          test: async () => {
            const result = await getTerminalTransportsByTerminalId({
              terminalId: 1,
            });
            expect(result.TerminalID).toBe(1);
            expect(result.TerminalName).toBe("Anacortes");
          },
        },
        {
          name: "should return terminal with transport details",
          test: async () => {
            const result = await getTerminalTransportsByTerminalId({
              terminalId: 1,
            });
            expect(result.ParkingInfo).toBeTruthy();
            expect(result.MotorcycleInfo).toBeTruthy();
            expect(result.BikeInfo).toBeTruthy();
          },
        },
      ],
    },
    {
      apiFunction: getTerminalVerbose,
      outputSchema: terminalVerboseArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getTerminalVerbose",
      category: "parameterless",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return terminals with comprehensive info",
          test: async () => {
            const result = await getTerminalVerbose();
            const terminalsWithComprehensiveInfo = result.filter(
              (terminal) => terminal.Bulletins && terminal.Bulletins.length > 0
            );
            expect(terminalsWithComprehensiveInfo.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return terminals with wait times",
          test: async () => {
            const result = await getTerminalVerbose();
            const terminalsWithWaitTimes = result.filter(
              (terminal) => terminal.WaitTimes && terminal.WaitTimes.length > 0
            );
            expect(terminalsWithWaitTimes.length).toBeGreaterThan(0);
          },
        },
      ],
    },
    {
      apiFunction: getTerminalVerboseByTerminalId,
      outputSchema: terminalVerboseSchema,
      validParams: { terminalId: 1 },
      invalidParams: { terminalId: -1 },
      endpointName: "getTerminalVerboseByTerminalId",
      category: "parameterized",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return specific terminal verbose info",
          test: async () => {
            const result = await getTerminalVerboseByTerminalId({
              terminalId: 1,
            });
            expect(result.TerminalID).toBe(1);
            expect(result.TerminalName).toBe("Anacortes");
          },
        },
        {
          name: "should return terminal with comprehensive details",
          test: async () => {
            const result = await getTerminalVerboseByTerminalId({
              terminalId: 1,
            });
            expect(result.Bulletins).toBeTruthy();
            expect(result.TransitLinks).toBeTruthy();
            expect(result.WaitTimes).toBeTruthy();
          },
        },
      ],
    },
    {
      apiFunction: getTerminalWaitTimes,
      outputSchema: terminalWaitTimesArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getTerminalWaitTimes",
      category: "parameterless",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return terminals with wait times",
          test: async () => {
            const result = await getTerminalWaitTimes();
            const terminalsWithWaitTimes = result.filter(
              (terminal) => terminal.WaitTimes && terminal.WaitTimes.length > 0
            );
            expect(terminalsWithWaitTimes.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return wait times with proper structure",
          test: async () => {
            const result = await getTerminalWaitTimes();
            const firstTerminal = result[0];
            expect(firstTerminal.WaitTimes).toBeDefined();
            expect(Array.isArray(firstTerminal.WaitTimes)).toBe(true);
            if (firstTerminal.WaitTimes.length > 0) {
              const firstWaitTime = firstTerminal.WaitTimes[0];
              expect(firstWaitTime.WaitTimeNotes).toBeDefined();
              expect(firstWaitTime.WaitTimeLastUpdated).toBeDefined();
            }
          },
        },
      ],
    },
    {
      apiFunction: getTerminalWaitTimesByTerminalId,
      outputSchema: terminalWaitTimesSchema,
      validParams: { terminalId: 1 },
      invalidParams: { terminalId: -1 },
      endpointName: "getTerminalWaitTimesByTerminalId",
      category: "parameterized",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return specific terminal wait times",
          test: async () => {
            const result = await getTerminalWaitTimesByTerminalId({
              terminalId: 1,
            });
            expect(result.TerminalID).toBe(1);
            expect(result.WaitTimes).toBeDefined();
            expect(Array.isArray(result.WaitTimes)).toBe(true);
          },
        },
        {
          name: "should return wait time details",
          test: async () => {
            const result = await getTerminalWaitTimesByTerminalId({
              terminalId: 1,
            });
            if (result.WaitTimes.length > 0) {
              const waitTime = result.WaitTimes[0];
              expect(waitTime.WaitTimeNotes).toBeDefined();
              expect(waitTime.WaitTimeLastUpdated).toBeDefined();
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
