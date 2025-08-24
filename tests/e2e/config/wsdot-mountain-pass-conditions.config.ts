import { expect } from "vitest";

import {
  getMountainPassConditionById,
  getMountainPassConditionByIdParamsSchema,
  getMountainPassConditions,
  getMountainPassConditionsParamsSchema,
  mountainPassConditionArraySchema,
  mountainPassConditionSchema,
} from "../../../src/api/wsdot-mountain-pass-conditions";
import { wsdotTestData } from "../utils/test-data";
import type { ApiModuleConfig } from "../utils/types";

/**
 * Test configuration for WSDOT Mountain Pass Conditions API
 *
 * This configuration defines all the test requirements for the mountain pass conditions endpoints.
 * The test generators will use this configuration to create comprehensive test suites.
 *
 * IMPORTANT: This configuration focuses on structural validation and business logic rather than
 * brittle content validation that can fail when external APIs evolve.
 */
export const mountainPassConditionsTestConfig: ApiModuleConfig = {
  moduleName: "WSDOT Mountain Pass Conditions",

  settings: {
    defaultMaxResponseTime: 5000, // 5 seconds for mountain pass endpoints
    requiresAuth: false,
    rateLimitDelay: 200, // 200ms between requests to avoid overwhelming the API
  },

  sharedTestData: {
    validPassIds: wsdotTestData.mountainPassConditions.validPassIds,
    invalidPassIds: wsdotTestData.mountainPassConditions.invalidPassIds,
  },

  endpoints: [
    // Parameterless endpoint - get all mountain pass conditions
    {
      apiFunction: getMountainPassConditions,
      inputSchema: getMountainPassConditionsParamsSchema,
      outputSchema: mountainPassConditionArraySchema,
      validParams: {}, // No parameters required
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getMountainPassConditions",
      category: "parameterless",
      maxResponseTime: 5000,

      customTests: [
        {
          name: "should return mountain pass conditions with valid structure",
          test: async () => {
            const result = await getMountainPassConditions({});

            // Data is already validated by zodFetch, so we can use result directly
            // Check that conditions have valid structure
            for (const condition of result) {
              expect(condition.MountainPassId).toBeDefined();
              expect(condition.MountainPassName).toBeDefined();
              expect(condition.RoadCondition).toBeDefined();
              expect(condition.WeatherCondition).toBeDefined();
              expect(condition.TravelAdvisoryActive).toBeDefined();
              expect(condition.DateUpdated).toBeDefined();

              // Check that required fields have reasonable values
              expect(condition.MountainPassId).toBeGreaterThan(0);
              expect(Number.isInteger(condition.MountainPassId)).toBe(true);
              expect(condition.MountainPassName.length).toBeGreaterThan(0);
              expect(condition.RoadCondition.length).toBeGreaterThanOrEqual(0);
              expect(condition.WeatherCondition.length).toBeGreaterThanOrEqual(
                0
              );
              expect(typeof condition.TravelAdvisoryActive).toBe("boolean");
              expect(condition.DateUpdated).toBeInstanceOf(Date);
            }
          },
        },
        {
          name: "should return mountain pass conditions with valid location data",
          test: async () => {
            const result = await getMountainPassConditions({});

            // Data is already validated by zodFetch, so we can use result directly
            // Check that conditions have valid location data
            for (const condition of result) {
              expect(condition.Latitude).toBeDefined();
              expect(condition.Longitude).toBeDefined();
              expect(condition.ElevationInFeet).toBeDefined();

              // Check that coordinates are within Washington State bounds
              // Some coordinates may be 0 if not available
              if (condition.Latitude !== 0) {
                expect(condition.Latitude).toBeGreaterThan(45); // Southern border
                expect(condition.Latitude).toBeLessThan(50); // Northern border
              }
              if (condition.Longitude !== 0) {
                expect(condition.Longitude).toBeGreaterThan(-125); // Western border
                expect(condition.Longitude).toBeLessThan(-116); // Eastern border
              }

              // Check that elevation is reasonable (Washington's highest point is ~14,400 ft)
              expect(condition.ElevationInFeet).toBeGreaterThan(0);
              expect(condition.ElevationInFeet).toBeLessThan(15000);
            }
          },
        },
        {
          name: "should return mountain pass conditions with valid weather data",
          test: async () => {
            const result = await getMountainPassConditions({});

            // Data is already validated by zodFetch, so we can use result directly
            // Check that conditions have valid weather data
            for (const condition of result) {
              expect(condition.TemperatureInFahrenheit).toBeDefined();
              expect(condition.WeatherCondition).toBeDefined();

              // Temperature can be null, but if present should be reasonable
              if (condition.TemperatureInFahrenheit !== null) {
                expect(condition.TemperatureInFahrenheit).toBeGreaterThan(-50); // Extreme cold
                expect(condition.TemperatureInFahrenheit).toBeLessThan(120); // Extreme heat
              }

              // Weather condition should be a reasonable string
              expect(typeof condition.WeatherCondition).toBe("string");
              expect(condition.WeatherCondition.length).toBeGreaterThanOrEqual(
                0
              );
              // Don't set arbitrary length limits - API can return detailed descriptions
            }
          },
        },
        {
          name: "should return mountain pass conditions with valid restriction data",
          test: async () => {
            const result = await getMountainPassConditions({});

            // Data is already validated by zodFetch, so we can use result directly
            // Check that conditions have valid restriction data
            for (const condition of result) {
              expect(condition.RestrictionOne).toBeDefined();
              expect(condition.RestrictionTwo).toBeDefined();

              // Check primary restriction structure
              if (condition.RestrictionOne) {
                expect(condition.RestrictionOne.TravelDirection).toBeDefined();
                expect(condition.RestrictionOne.RestrictionText).toBeDefined();

                expect(typeof condition.RestrictionOne.TravelDirection).toBe(
                  "string"
                );
                expect(typeof condition.RestrictionOne.RestrictionText).toBe(
                  "string"
                );
                expect(
                  condition.RestrictionOne.TravelDirection.length
                ).toBeGreaterThanOrEqual(0);
                expect(
                  condition.RestrictionOne.RestrictionText.length
                ).toBeGreaterThanOrEqual(0);
              }

              // Check secondary restriction structure
              if (condition.RestrictionTwo) {
                expect(condition.RestrictionTwo.TravelDirection).toBeDefined();
                expect(condition.RestrictionTwo.RestrictionText).toBeDefined();

                expect(typeof condition.RestrictionTwo.TravelDirection).toBe(
                  "string"
                );
                expect(typeof condition.RestrictionTwo.RestrictionText).toBe(
                  "string"
                );
                expect(
                  condition.RestrictionTwo.TravelDirection.length
                ).toBeGreaterThanOrEqual(0);
                expect(
                  condition.RestrictionTwo.RestrictionText.length
                ).toBeGreaterThanOrEqual(0);
              }
            }
          },
        },
      ],
    },
  ],
};
