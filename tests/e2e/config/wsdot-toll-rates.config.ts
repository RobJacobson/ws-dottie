import { expect } from "vitest";

import {
  getTollRates,
  getTollRatesParamsSchema,
  getTollTripInfo,
  getTollTripInfoParamsSchema,
  getTollTripRates,
  getTollTripRatesParamsSchema,
  getTollTripVersion,
  getTollTripVersionParamsSchema,
  getTripRatesByDate,
  getTripRatesByDateParamsSchema,
  tollRateArraySchema,
  tollTripInfoArraySchema,
  tollTripRatesSchema,
  tollTripVersionSchema,
} from "@/api/wsdot-toll-rates";

import type { ApiModuleConfig } from "../utils/types";

/**
 * Test configuration for WSDOT Toll Rates API module
 *
 * This module provides access to Washington State Department of Transportation
 * toll rate data including trip rates, toll information, and pricing schedules.
 */
export const wsdotTollRatesTestConfig: ApiModuleConfig = {
  moduleName: "WSDOT Toll Rates",
  endpoints: [
    {
      apiFunction: getTollRates,
      inputSchema: getTollRatesParamsSchema,
      outputSchema: tollRateArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getTollRates",
      category: "parameterless",
      maxResponseTime: 10000,
      customTests: [
        {
          name: "should return toll rates with valid structure",
          test: async () => {
            const result = await getTollRates();
            expect(Array.isArray(result)).toBe(true);
            if (result.length > 0) {
              const firstRate = result[0];
              expect(firstRate).toHaveProperty("CurrentToll");
              expect(firstRate).toHaveProperty("TripName");
              expect(firstRate).toHaveProperty("StateRoute");
              expect(firstRate).toHaveProperty("TimeUpdated");
            }
          },
        },
      ],
    },
    {
      apiFunction: getTollTripInfo,
      inputSchema: getTollTripInfoParamsSchema,
      outputSchema: tollTripInfoArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getTollTripInfo",
      category: "parameterless",
      maxResponseTime: 10000,
      customTests: [
        {
          name: "should return trip info with geometry data",
          test: async () => {
            const result = await getTollTripInfo();
            expect(Array.isArray(result)).toBe(true);
            if (result.length > 0) {
              const firstTrip = result[0];
              expect(firstTrip).toHaveProperty("Geometry");
              expect(firstTrip).toHaveProperty("TripName");
              expect(firstTrip).toHaveProperty("StartLocationName");
              expect(firstTrip).toHaveProperty("EndLocationName");
            }
          },
        },
      ],
    },
    {
      apiFunction: getTollTripRates,
      inputSchema: getTollTripRatesParamsSchema,
      outputSchema: tollTripRatesSchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getTollTripRates",
      category: "parameterless",
      maxResponseTime: 10000,
      isSingleValue: true, // Returns an object, not an array
      customTests: [
        {
          name: "should return trip rates with system info",
          test: async () => {
            const result = await getTollTripRates();
            expect(result).toHaveProperty("LastUpdated");
            expect(result).toHaveProperty("Trips");
            expect(result).toHaveProperty("Version");
            expect(Array.isArray(result.Trips)).toBe(true);
            if (result.Trips.length > 0) {
              const firstTrip = result.Trips[0];
              expect(firstTrip).toHaveProperty("Toll");
              expect(firstTrip).toHaveProperty("TripName");
              expect(firstTrip).toHaveProperty("Message");
            }
          },
        },
      ],
    },
    {
      apiFunction: getTollTripVersion,
      inputSchema: getTollTripVersionParamsSchema,
      outputSchema: tollTripVersionSchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getTollTripVersion",
      category: "parameterless",
      maxResponseTime: 10000,
      isSingleValue: true, // Returns an object, not an array
      customTests: [
        {
          name: "should return version info with timestamp",
          test: async () => {
            const result = await getTollTripVersion();
            expect(result).toHaveProperty("Version");
            expect(result).toHaveProperty("TimeStamp");
            expect(typeof result.Version).toBe("number");
            expect(result.TimeStamp).toBeInstanceOf(Date);
          },
        },
      ],
    },
    {
      apiFunction: getTripRatesByDate,
      inputSchema: getTripRatesByDateParamsSchema,
      outputSchema: tollRateArraySchema,
      validParams: {
        fromDate: new Date("2024-01-01"),
        toDate: new Date("2024-01-31"),
      },
      invalidParams: [
        {
          params: {
            fromDate: new Date("invalid"),
            toDate: new Date("2024-01-31"),
          },
          expectedError: "Invalid date",
        },
        {
          params: {
            fromDate: new Date("2024-01-31"),
            toDate: new Date("2024-01-01"), // fromDate after toDate
          },
          expectedError: "Invalid date range",
        },
        {
          params: {
            fromDate: new Date("2024-01-01"),
            // Missing toDate
          },
          expectedError: "Missing required parameter",
        },
      ],
      endpointName: "getTripRatesByDate",
      category: "date-based",
      maxResponseTime: 15000, // Historical data might take longer
      customTests: [
        {
          name: "should return historical toll rates for valid date range",
          test: async () => {
            const result = await getTripRatesByDate({
              fromDate: new Date("2024-01-01"),
              toDate: new Date("2024-01-31"),
            });
            expect(Array.isArray(result)).toBe(true);
            // Historical data might be empty for some date ranges
            if (result.length > 0) {
              const firstRate = result[0];
              expect(firstRate).toHaveProperty("CurrentToll");
              expect(firstRate).toHaveProperty("TripName");
            }
          },
        },
        {
          name: "should handle current date range",
          test: async () => {
            const today = new Date();
            const fromDate = new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            );
            const toDate = new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            );

            const result = await getTripRatesByDate({
              fromDate,
              toDate,
            });
            expect(Array.isArray(result)).toBe(true);
          },
        },
      ],
    },
  ],
  sharedTestData: {
    validDateRanges: [
      { fromDate: new Date("2024-01-01"), toDate: new Date("2024-01-31") },
      { fromDate: new Date("2024-06-01"), toDate: new Date("2024-06-30") },
      { fromDate: new Date("2024-12-01"), toDate: new Date("2024-12-31") },
    ],
    invalidDateFormats: [
      new Date("invalid"),
      new Date("2024/01/01"),
      new Date("01-01-2024"),
    ],
  },
  settings: {
    defaultMaxResponseTime: 10000,
    requiresAuth: false,
    rateLimitDelay: 100, // Small delay between tests to be respectful
  },
};
