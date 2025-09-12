import { expect } from "vitest";

import {
  getTrafficFlowById,
  getTrafficFlowByIdParamsSchema,
  getTrafficFlows,
  getTrafficFlowsParamsSchema,
  trafficFlowArraySchema,
  trafficFlowSchema,
} from "@/clients/wsdot-traffic-flow";

import type { ApiModuleConfig } from "../utils/types";

/**
 * Test configuration for WSDOT Traffic Flow API module
 *
 * This module provides access to Washington State Department of Transportation
 * traffic flow data including real-time flow readings and station information.
 */
export const wsdotTrafficFlowTestConfig: ApiModuleConfig = {
  moduleName: "WSDOT Traffic Flow",
  endpoints: [
    {
      apiFunction: getTrafficFlows,
      inputSchema: getTrafficFlowsParamsSchema,
      outputSchema: trafficFlowArraySchema,
      validParams: {},
      invalidParams: [], // Parameterless endpoint
      endpointName: "getTrafficFlows",
      category: "parameterless",
      maxResponseTime: 10000,
      customTests: [
        {
          name: "should return traffic flow data with valid structure",
          test: async () => {
            const result = await getTrafficFlows({});
            expect(Array.isArray(result)).toBe(true);
            if (result.length > 0) {
              const firstFlow = result[0];
              expect(firstFlow).toHaveProperty("FlowDataID");
              expect(firstFlow).toHaveProperty("FlowReadingValue");
              expect(firstFlow).toHaveProperty("FlowStationLocation");
              expect(firstFlow).toHaveProperty("Time");

              // Verify FlowReadingValue is numeric (0-4) as noted in API comments
              expect(typeof firstFlow.FlowReadingValue).toBe("number");
              expect(firstFlow.FlowReadingValue).toBeGreaterThanOrEqual(0);
              expect(firstFlow.FlowReadingValue).toBeLessThanOrEqual(4);
            }
          },
        },
      ],
    },
    {
      apiFunction: getTrafficFlowById,
      inputSchema: getTrafficFlowByIdParamsSchema,
      outputSchema: trafficFlowSchema,
      validParams: {
        flowDataID: 2482, // Known valid ID from API testing
      },
      invalidParams: [
        {
          params: {
            flowDataID: -1,
          },
          expectedError: "Invalid flow data ID",
        },
        {
          params: {
            flowDataID: "invalid",
          },
          expectedError: "Invalid parameter type",
        },
        {
          params: {
            // Missing flowDataID
          },
          expectedError: "Missing required parameter",
        },
      ],
      endpointName: "getTrafficFlowById",
      category: "id-based",
      maxResponseTime: 10000,
      customTests: [
        {
          name: "should return single traffic flow with valid structure",
          test: async () => {
            // First get all flows to find a valid ID
            const allFlows = await getTrafficFlows({});
            if (allFlows.length > 0) {
              const validId = allFlows[0].FlowDataID;
              const result = await getTrafficFlowById({ flowDataID: validId });

              expect(typeof result).toBe("object");
              expect(result).toHaveProperty("FlowDataID");
              expect(result).toHaveProperty("FlowReadingValue");
              expect(result).toHaveProperty("FlowStationLocation");
              expect(result).toHaveProperty("Time");
              expect(result.FlowDataID).toBe(validId);

              // Verify FlowReadingValue is numeric (0-4)
              expect(typeof result.FlowReadingValue).toBe("number");
              expect(result.FlowReadingValue).toBeGreaterThanOrEqual(0);
              expect(result.FlowReadingValue).toBeLessThanOrEqual(4);
            }
          },
        },
        {
          name: "should match data structure between endpoints",
          test: async () => {
            // Get all flows and compare with individual flow
            const allFlows = await getTrafficFlows({});
            if (allFlows.length > 0) {
              const firstFlow = allFlows[0];
              const individualFlow = await getTrafficFlowById({
                flowDataID: firstFlow.FlowDataID,
              });

              // Should have the same structure
              expect(individualFlow.FlowDataID).toBe(firstFlow.FlowDataID);
              expect(individualFlow.FlowReadingValue).toBe(
                firstFlow.FlowReadingValue
              );
              expect(typeof individualFlow.FlowStationLocation).toBe(
                typeof firstFlow.FlowStationLocation
              );
            }
          },
        },
      ],
    },
  ],
  sharedTestData: {
    validFlowDataIDs: [], // Will be populated dynamically from API
    flowReadingValues: [0, 1, 2, 3, 4], // Valid numeric flow values
    flowReadingMeanings: {
      0: "Unknown/NoData",
      1: "WideOpen (free-flowing)",
      2: "Moderate",
      3: "Heavy",
      4: "StopAndGo (congested)",
    },
  },
  settings: {
    defaultMaxResponseTime: 10000,
    requiresAuth: false,
    rateLimitDelay: 100, // Small delay between tests to be respectful
  },
};
