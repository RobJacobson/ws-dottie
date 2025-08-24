import { expect } from "vitest";

import {
  getWeatherStations,
  weatherStationDataArraySchema,
} from "../../../src/api/wsdot-weather-stations";
import type { ApiModuleConfig } from "../utils/types";

export const wsdotWeatherStationsTestConfig: ApiModuleConfig = {
  moduleName: "WSDOT Weather Stations",
  endpoints: [
    {
      apiFunction: getWeatherStations,
      outputSchema: weatherStationDataArraySchema,
      validParams: {},
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getWeatherStations",
      category: "parameterless",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return non-empty weather station data",
          test: async () => {
            const result = await getWeatherStations();
            expect(result.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return valid weather station structure",
          test: async () => {
            const result = await getWeatherStations();
            const firstStation = result[0];

            // Validate required fields exist
            expect(firstStation).toHaveProperty("StationCode");
            expect(firstStation).toHaveProperty("StationName");

            // Validate data types
            expect(typeof firstStation.StationCode).toBe("number");
            expect(typeof firstStation.StationName).toBe("string");
          },
        },
        {
          name: "should return valid coordinate ranges for Washington State",
          test: async () => {
            const result = await getWeatherStations();

            result.forEach((station) => {
              if (station.Latitude !== undefined) {
                // Washington State coordinate ranges
                expect(station.Latitude).toBeGreaterThanOrEqual(45.5);
                expect(station.Latitude).toBeLessThanOrEqual(49.0);
              }
              if (station.Longitude !== undefined) {
                expect(station.Longitude).toBeGreaterThanOrEqual(-125.0);
                expect(station.Longitude).toBeLessThanOrEqual(-116.5);
              }
            });
          },
        },
        {
          name: "should return valid station codes",
          test: async () => {
            const result = await getWeatherStations();

            result.forEach((station) => {
              if (station.StationCode !== undefined) {
                // Station codes should be positive integers
                expect(station.StationCode).toBeGreaterThan(0);
                expect(Number.isInteger(station.StationCode)).toBe(true);
              }
            });
          },
        },
        {
          name: "should return valid station names",
          test: async () => {
            const result = await getWeatherStations();

            result.forEach((station) => {
              if (station.StationName) {
                // Station names should be non-empty strings
                expect(station.StationName).toBeTruthy();
                expect(station.StationName.trim().length).toBeGreaterThan(0);

                // Should not have excessive whitespace
                expect(station.StationName).not.toMatch(/^\s+$/);
                expect(station.StationName).not.toMatch(/\s{2,}/);
              }
            });
          },
        },
        {
          name: "should return unique station codes",
          test: async () => {
            const result = await getWeatherStations();
            const stationCodes = result
              .map((station) => station.StationCode)
              .filter((code) => code !== undefined);

            // All station codes should be unique
            const uniqueCodes = new Set(stationCodes);
            expect(uniqueCodes.size).toBe(stationCodes.length);
          },
        },
      ],
    },
  ],
  settings: {
    defaultMaxResponseTime: 3000,
    requiresAuth: false,
    rateLimitDelay: 100,
  },
};
