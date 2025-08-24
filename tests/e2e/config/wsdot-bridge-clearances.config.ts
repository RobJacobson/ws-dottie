import { expect } from "vitest";

import {
  bridgeDataGisArraySchema,
  getBridgeClearances,
  getBridgeClearancesParamsSchema,
} from "@/api/wsdot-bridge-clearances";

import { wsdotTestData } from "../utils/test-data";
import type { ApiModuleConfig } from "../utils/types";

/**
 * Test configuration for WSDOT Bridge Clearances API
 *
 * This configuration defines all the test requirements for the bridge clearances endpoints.
 * The test generators will use this configuration to create comprehensive test suites.
 */
export const bridgeClearancesTestConfig: ApiModuleConfig = {
  moduleName: "WSDOT Bridge Clearances",

  settings: {
    defaultMaxResponseTime: 5000, // 5 seconds for bridge clearance endpoints
    requiresAuth: false,
    rateLimitDelay: 200, // 200ms between requests to avoid overwhelming the API
  },

  sharedTestData: {
    validRouteIds: wsdotTestData.bridgeClearances.validRouteIds,
    invalidRouteIds: wsdotTestData.bridgeClearances.invalidRouteIds,
  },

  endpoints: [
    // Parameterized endpoint - get bridge clearances for a specific route
    {
      apiFunction: getBridgeClearances,
      inputSchema: getBridgeClearancesParamsSchema,
      outputSchema: bridgeDataGisArraySchema,
      validParams: { route: "005" }, // Use I-5 as a valid route
      invalidParams: [
        { params: { route: "" }, expectedError: "Route cannot be empty" },
        // Note: The API doesn't throw errors for invalid routes, it returns empty arrays
        // So we only test the empty route case which should trigger validation
      ],
      endpointName: "getBridgeClearances",
      category: "parameterized",
      maxResponseTime: 5000,
      // Custom test cases specific to this endpoint
      customTests: [
        {
          name: "should return bridges for specific route",
          test: async () => {
            console.log("🧪 [TEST] About to call getBridgeClearances");
            const result = await getBridgeClearances({ route: "005" });
            console.log(
              "🧪 [TEST] getBridgeClearances returned:",
              typeof result
            );
            console.log("🧪 [TEST] Result is array:", Array.isArray(result));
            if (Array.isArray(result) && result.length > 0) {
              console.log("🧪 [TEST] First item keys:", Object.keys(result[0]));
              console.log(
                "🧪 [TEST] First item APILastUpdate type:",
                typeof result[0].APILastUpdate
              );
              console.log(
                "🧪 [TEST] First item RouteDate type:",
                typeof result[0].RouteDate
              );
            }
            const validated = bridgeDataGisArraySchema.parse(result);

            // Test that we get bridges for the requested route
            expect(validated.length).toBeGreaterThan(0);

            // Check that all bridges belong to the requested route
            validated.forEach((bridge) => {
              expect(bridge.StateRouteID).toMatch(/^005/); // Route ID should start with "005"
            });
          },
        },
        {
          name: "should return bridges with valid clearance data",
          test: async () => {
            const result = await getBridgeClearances({ route: "005" });
            const validated = bridgeDataGisArraySchema.parse(result);

            // Check that bridges have valid clearance data
            for (const bridge of validated) {
              expect(bridge.VerticalClearanceMinimumInches).toBeDefined();
              expect(bridge.VerticalClearanceMaximumInches).toBeDefined();
              expect(bridge.VerticalClearanceMinimumFeetInch).toBeDefined();
              expect(bridge.VerticalClearanceMaximumFeetInch).toBeDefined();

              // Check that clearance values are reasonable (greater than 0)
              expect(bridge.VerticalClearanceMinimumInches).toBeGreaterThan(0);
              expect(bridge.VerticalClearanceMaximumInches).toBeGreaterThan(0);

              // Check that maximum is greater than or equal to minimum
              expect(
                bridge.VerticalClearanceMaximumInches
              ).toBeGreaterThanOrEqual(bridge.VerticalClearanceMinimumInches);
            }
          },
        },
        {
          name: "should return bridges with valid location data",
          test: async () => {
            const result = await getBridgeClearances({ route: "005" });
            const validated = bridgeDataGisArraySchema.parse(result);

            // Check that bridges have valid location data
            for (const bridge of validated) {
              expect(bridge.Latitude).toBeDefined();
              expect(bridge.Longitude).toBeDefined();
              expect(bridge.StateRouteID).toBeDefined();
              expect(bridge.BridgeNumber).toBeDefined();

              // Check reasonable latitude/longitude ranges for Washington State
              expect(bridge.Latitude).toBeGreaterThan(45); // Southern border
              expect(bridge.Latitude).toBeLessThan(50); // Northern border
              expect(bridge.Longitude).toBeGreaterThan(-125); // Western border
              expect(bridge.Longitude).toBeLessThan(-116); // Eastern border

              // Check that route ID starts with the requested route
              expect(bridge.StateRouteID).toMatch(/^005/);
            }
          },
        },
        {
          name: "should return bridges with valid identification data",
          test: async () => {
            const result = await getBridgeClearances({ route: "005" });
            const validated = bridgeDataGisArraySchema.parse(result);

            // Check that bridges have valid identification data
            for (const bridge of validated) {
              expect(bridge.BridgeNumber).toBeDefined();
              expect(bridge.StateStructureId).toBeDefined();
              expect(bridge.CrossingDescription).toBeDefined();
              expect(bridge.SRMP).toBeDefined();

              // Check that IDs are not empty (with null safety)
              if (bridge.BridgeNumber) {
                expect(bridge.BridgeNumber.length).toBeGreaterThan(0);
              }
              if (bridge.StateStructureId) {
                expect(bridge.StateStructureId.length).toBeGreaterThan(0);
              }
              if (bridge.CrossingDescription) {
                expect(bridge.CrossingDescription.length).toBeGreaterThan(0);
              }

              // Check that SRMP is a reasonable value (non-negative number)
              expect(bridge.SRMP).toBeGreaterThanOrEqual(0);
            }
          },
        },
      ],
    },
  ],
};
