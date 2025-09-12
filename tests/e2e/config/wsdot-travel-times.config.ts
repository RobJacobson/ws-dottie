import { expect } from "vitest";

import {
  getTravelTimeById,
  getTravelTimeByIdParamsSchema,
  getTravelTimes,
  getTravelTimesParamsSchema,
  travelTimeRouteSchema,
  travelTimesArraySchema,
} from "@/clients/wsdot-travel-times";

import { wsdotTestData } from "../utils/test-data";
import type { ApiModuleConfig } from "../utils/types";

/**
 * Test configuration for WSDOT Travel Times API
 *
 * This configuration defines all the test requirements for the travel times endpoints.
 * The test generators will use this configuration to create comprehensive test suites.
 */
export const travelTimesTestConfig: ApiModuleConfig = {
  moduleName: "WSDOT Travel Times",

  settings: {
    defaultMaxResponseTime: 5000, // 5 seconds for travel time endpoints
    requiresAuth: false,
    rateLimitDelay: 200, // 200ms between requests to avoid overwhelming the API
  },

  sharedTestData: {
    validTravelTimeIds: wsdotTestData.travelTimes.validTravelTimeIds,
    invalidTravelTimeIds: wsdotTestData.travelTimes.invalidTravelTimeIds,
  },

  endpoints: [
    // Parameterless endpoint - get all travel times
    {
      apiFunction: getTravelTimes,
      inputSchema: getTravelTimesParamsSchema,
      outputSchema: travelTimesArraySchema,
      validParams: {}, // No parameters required
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getTravelTimes",
      category: "parameterless",
      maxResponseTime: 5000,

      customTests: [
        {
          name: "should return travel times with valid route data",
          test: async () => {
            const result = await getTravelTimes({});

            // Data is already validated by zodFetch, so we can use result directly
            // Check that travel times have valid route data
            for (const travelTime of result) {
              expect(travelTime.TravelTimeID).toBeDefined();
              expect(travelTime.Name).toBeDefined();
              expect(travelTime.Description).toBeDefined();
              expect(travelTime.Distance).toBeDefined();
              expect(travelTime.CurrentTime).toBeDefined();
              expect(travelTime.AverageTime).toBeDefined();

              // Check that required fields are not empty
              expect(travelTime.Name.length).toBeGreaterThan(0);
              expect(travelTime.Description.length).toBeGreaterThan(0);

              // Check that numeric fields are reasonable
              expect(travelTime.Distance).toBeGreaterThan(0);
              // CurrentTime and AverageTime may be 0 for routes without current data
              expect(travelTime.CurrentTime).toBeGreaterThanOrEqual(0);
              expect(travelTime.AverageTime).toBeGreaterThanOrEqual(0);

              // Check that TravelTimeID is a positive integer
              expect(travelTime.TravelTimeID).toBeGreaterThan(0);
              expect(Number.isInteger(travelTime.TravelTimeID)).toBe(true);
            }
          },
        },
        {
          name: "should return travel times with valid endpoint data",
          test: async () => {
            const result = await getTravelTimes({});

            // Data is already validated by zodFetch, so we can use result directly
            // Check that travel times have valid endpoint data
            for (const travelTime of result) {
              expect(travelTime.StartPoint).toBeDefined();
              expect(travelTime.EndPoint).toBeDefined();

              // Check start point
              const startPoint = travelTime.StartPoint;
              expect(startPoint.Description).toBeDefined();
              expect(startPoint.Direction).toBeDefined();
              expect(startPoint.Latitude).toBeDefined();
              expect(startPoint.Longitude).toBeDefined();
              expect(startPoint.MilePost).toBeDefined();
              expect(startPoint.RoadName).toBeDefined();

              // Check end point
              const endPoint = travelTime.EndPoint;
              expect(endPoint.Description).toBeDefined();
              expect(endPoint.Direction).toBeDefined();
              expect(endPoint.Latitude).toBeDefined();
              expect(endPoint.Longitude).toBeDefined();
              expect(endPoint.MilePost).toBeDefined();
              expect(endPoint.RoadName).toBeDefined();

              // Check that required fields are not empty
              expect(startPoint.Description.length).toBeGreaterThan(0);
              expect(startPoint.Direction.length).toBeGreaterThan(0);
              expect(startPoint.RoadName.length).toBeGreaterThan(0);
              expect(endPoint.Description.length).toBeGreaterThan(0);
              expect(endPoint.Direction.length).toBeGreaterThan(0);
              expect(endPoint.RoadName.length).toBeGreaterThan(0);

              // Check that milepost values are reasonable (non-negative)
              expect(startPoint.MilePost).toBeGreaterThanOrEqual(0);
              expect(endPoint.MilePost).toBeGreaterThanOrEqual(0);

              // Check that coordinates are within Washington State bounds
              expect(startPoint.Latitude).toBeGreaterThan(45); // Southern border
              expect(startPoint.Latitude).toBeLessThan(50); // Northern border
              expect(startPoint.Longitude).toBeGreaterThan(-125); // Western border
              expect(startPoint.Longitude).toBeLessThan(-116); // Eastern border
              expect(endPoint.Latitude).toBeGreaterThan(45);
              expect(endPoint.Latitude).toBeLessThan(50);
              expect(endPoint.Longitude).toBeGreaterThan(-125);
              expect(endPoint.Longitude).toBeLessThan(-116);
            }
          },
        },
        {
          name: "should return travel times with valid time data",
          test: async () => {
            const result = await getTravelTimes({});

            // Data is already validated by zodFetch, so we can use result directly
            // Check that travel times have valid time data
            for (const travelTime of result) {
              expect(travelTime.TimeUpdated).toBeDefined();

              // Check that TimeUpdated is a valid Date object
              expect(travelTime.TimeUpdated).toBeInstanceOf(Date);

              // Check that the time is not in the future
              expect(travelTime.TimeUpdated.getTime()).toBeLessThanOrEqual(
                Date.now() + 60000 // Allow 1 minute for API processing
              );

              // Check that the time is not too far in the past (within last 24 hours)
              const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
              expect(travelTime.TimeUpdated.getTime()).toBeGreaterThan(
                oneDayAgo
              );
            }
          },
        },
        {
          name: "should return travel times with consistent data relationships",
          test: async () => {
            const result = await getTravelTimes({});

            // Data is already validated by zodFetch, so we can use result directly
            // Check that travel times have consistent data relationships
            for (const travelTime of result) {
              // Check that current time is reasonable compared to average time
              // Allow for significant variance due to traffic conditions
              // Skip ratio check if either time is 0 (no current data)
              if (travelTime.CurrentTime > 0 && travelTime.AverageTime > 0) {
                const timeRatio =
                  travelTime.CurrentTime / travelTime.AverageTime;
                expect(timeRatio).toBeGreaterThan(0.1); // Current time should not be less than 10% of average
                expect(timeRatio).toBeLessThan(10); // Current time should not be more than 10x average
              }

              // Check that distance is reasonable for travel times
              // Assuming average speed of 30-70 mph, travel time should be reasonable
              // Skip speed check if CurrentTime is 0 (no current data)
              if (travelTime.CurrentTime > 0) {
                const estimatedSpeed =
                  travelTime.Distance / (travelTime.CurrentTime / 60); // mph
                expect(estimatedSpeed).toBeGreaterThan(5); // Minimum 5 mph (very slow traffic)
                expect(estimatedSpeed).toBeLessThan(100); // Maximum 100 mph (unrealistic)
              }

              // Check that start and end points are different
              expect(travelTime.StartPoint.MilePost).not.toBe(
                travelTime.EndPoint.MilePost
              );
              expect(travelTime.StartPoint.Latitude).not.toBe(
                travelTime.EndPoint.Latitude
              );
              expect(travelTime.StartPoint.Longitude).not.toBe(
                travelTime.EndPoint.Longitude
              );
            }
          },
        },
      ],
    },

    // ID-based endpoint - get specific travel time by ID
    {
      apiFunction: getTravelTimeById,
      inputSchema: getTravelTimeByIdParamsSchema,
      outputSchema: travelTimeRouteSchema,
      validParams: { travelTimeId: 1 }, // Use first valid ID from test data
      invalidParams: [
        {
          params: { travelTimeId: -1 },
          expectedError: "Invalid travel time ID",
        },
        {
          params: { travelTimeId: 0 },
          expectedError: "Invalid travel time ID",
        },
        {
          params: { travelTimeId: 999999 },
          expectedError: "Travel time not found",
        },
      ],
      endpointName: "getTravelTimeById",
      category: "id-based",
      maxResponseTime: 3000,

      customTests: [
        {
          name: "should return travel time with matching ID",
          test: async () => {
            const result = await getTravelTimeById({ travelTimeId: 1 });

            // Data is already validated by zodFetch, so we can use result directly
            // Check that the returned travel time has the requested ID
            expect(result.TravelTimeID).toBe(1);

            // Check that all required fields are present
            expect(result.Name).toBeDefined();
            expect(result.Description).toBeDefined();
            expect(result.Distance).toBeDefined();
            expect(result.CurrentTime).toBeDefined();
            expect(result.AverageTime).toBeDefined();
            expect(result.StartPoint).toBeDefined();
            expect(result.EndPoint).toBeDefined();
            expect(result.TimeUpdated).toBeDefined();
          },
        },
        {
          name: "should return travel time with valid endpoint coordinates",
          test: async () => {
            const result = await getTravelTimeById({ travelTimeId: 1 });

            // Data is already validated by zodFetch, so we can use result directly
            // Check that start and end points have valid coordinates
            const startPoint = result.StartPoint;
            const endPoint = result.EndPoint;

            // Check start point coordinates
            expect(startPoint.Latitude).toBeGreaterThan(45);
            expect(startPoint.Latitude).toBeLessThan(50);
            expect(startPoint.Longitude).toBeGreaterThan(-125);
            expect(startPoint.Longitude).toBeLessThan(-116);

            // Check end point coordinates
            expect(endPoint.Latitude).toBeGreaterThan(45);
            expect(endPoint.Latitude).toBeLessThan(50);
            expect(endPoint.Longitude).toBeGreaterThan(-125);
            expect(endPoint.Longitude).toBeLessThan(-116);

            // Check that coordinates are different (different locations)
            expect(startPoint.Latitude).not.toBe(endPoint.Latitude);
            expect(startPoint.Longitude).not.toBe(endPoint.Longitude);
          },
        },
        {
          name: "should return travel time with realistic travel time values",
          test: async () => {
            const result = await getTravelTimeById({ travelTimeId: 1 });

            // Data is already validated by zodFetch, so we can use result directly
            // Check that travel times are realistic
            expect(result.CurrentTime).toBeGreaterThan(0);
            expect(result.AverageTime).toBeGreaterThan(0);
            expect(result.Distance).toBeGreaterThan(0);

            // Check that current time is not extremely long (more than 4 hours)
            expect(result.CurrentTime).toBeLessThan(240);

            // Check that average time is not extremely long (more than 4 hours)
            expect(result.AverageTime).toBeLessThan(240);

            // Check that distance is reasonable (not more than 200 miles)
            expect(result.Distance).toBeLessThan(200);

            // Check that travel times make sense for the distance
            // Assuming minimum 10 mph and maximum 80 mph average speeds
            const minSpeed = result.Distance / (result.AverageTime / 60);
            const maxSpeed = result.Distance / (result.AverageTime / 60);
            expect(minSpeed).toBeGreaterThan(10);
            expect(maxSpeed).toBeLessThan(80);
          },
        },
      ],
    },
  ],
};
