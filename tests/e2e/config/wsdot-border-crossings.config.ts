import { expect } from "vitest";

import {
  borderCrossingDataArraySchema,
  getBorderCrossings,
} from "../../../src/api/wsdot-border-crossings";

import type { ApiModuleConfig } from "../utils/types";

export const wsdotBorderCrossingsTestConfig: ApiModuleConfig = {
  moduleName: "WSDOT Border Crossings",
  endpoints: [
    {
      apiFunction: getBorderCrossings,
      outputSchema: borderCrossingDataArraySchema,
      validParams: {},
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getBorderCrossings",
      category: "parameterless",
      maxResponseTime: 3000,
      customTests: [
        {
          name: "should return non-empty border crossing data",
          test: async () => {
            const result = await getBorderCrossings();
            expect(result.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return valid border crossing structure",
          test: async () => {
            const result = await getBorderCrossings();
            const firstCrossing = result[0];

            // Validate required fields exist
            expect(firstCrossing).toHaveProperty("CrossingName");
            expect(firstCrossing).toHaveProperty("WaitTime");
            expect(firstCrossing).toHaveProperty("Time");
            expect(firstCrossing).toHaveProperty("BorderCrossingLocation");

            // Validate data types
            expect(typeof firstCrossing.CrossingName).toBe("string");
            expect(typeof firstCrossing.WaitTime).toBe("number");
            expect(firstCrossing.Time).toBeInstanceOf(Date);
            expect(firstCrossing.BorderCrossingLocation).toBeDefined();
          },
        },
        {
          name: "should return valid location data for each crossing",
          test: async () => {
            const result = await getBorderCrossings();

            result.forEach((crossing) => {
              if (crossing.BorderCrossingLocation) {
                const location = crossing.BorderCrossingLocation;

                // Validate location fields exist
                expect(location).toHaveProperty("Description");
                expect(location).toHaveProperty("RoadName");
                expect(location).toHaveProperty("Latitude");
                expect(location).toHaveProperty("Longitude");
                expect(location).toHaveProperty("MilePost");

                // Validate coordinate ranges (Washington-British Columbia border area)
                expect(location.Latitude).toBeGreaterThanOrEqual(48.0);
                expect(location.Latitude).toBeLessThanOrEqual(49.5);
                expect(location.Longitude).toBeGreaterThanOrEqual(-123.5);
                expect(location.Longitude).toBeLessThanOrEqual(-122.0);

                // Validate milepost is reasonable
                expect(location.MilePost).toBeGreaterThanOrEqual(0);
                expect(location.MilePost).toBeLessThanOrEqual(1000);
              }
            });
          },
        },
        {
          name: "should return reasonable wait time values",
          test: async () => {
            const result = await getBorderCrossings();

            result.forEach((crossing) => {
              // Wait times should be reasonable (not negative unless -1 for unavailable)
              expect(crossing.WaitTime).toBeGreaterThanOrEqual(-1);
              expect(crossing.WaitTime).toBeLessThanOrEqual(480); // 8 hours max

              // Most wait times should be positive or -1 (unavailable)
              if (crossing.WaitTime !== -1) {
                expect(crossing.WaitTime).toBeGreaterThanOrEqual(0);
              }
            });
          },
        },
        {
          name: "should return valid crossing names",
          test: async () => {
            const result = await getBorderCrossings();

            result.forEach((crossing) => {
              // Crossing names should be non-empty strings
              expect(crossing.CrossingName).toBeTruthy();
              expect(crossing.CrossingName?.trim().length).toBeGreaterThan(0);

              // Should not have excessive whitespace
              expect(crossing.CrossingName).not.toMatch(/^\s+$/);
              expect(crossing.CrossingName).not.toMatch(/\s{2,}/);
            });
          },
        },
        {
          name: "should return recent timestamp data",
          test: async () => {
            const result = await getBorderCrossings();
            const now = new Date();

            result.forEach((crossing) => {
              // Timestamps should be recent (within last 24 hours)
              const timeDiff = Math.abs(
                now.getTime() - crossing.Time.getTime()
              );
              const hoursDiff = timeDiff / (1000 * 60 * 60);

              expect(hoursDiff).toBeLessThanOrEqual(24);

              // Timestamps should not be in the future
              expect(crossing.Time.getTime()).toBeLessThanOrEqual(
                now.getTime() + 1000 * 60 * 60
              ); // Allow 1 hour future for timezone differences
            });
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
