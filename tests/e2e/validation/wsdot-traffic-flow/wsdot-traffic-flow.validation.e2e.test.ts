import { describe, expect, it } from "vitest";

import { wsdotTrafficFlowTestConfig } from "../../config/wsdot-traffic-flow.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

/**
 * WSDOT Traffic Flow API - End-to-End Validation Tests
 *
 * This test suite validates all endpoints in the WSDOT Traffic Flow API module
 * using the Zod schemas as the single source of truth.
 *
 * Endpoints tested:
 * - getTrafficFlows: Get all current traffic flow readings
 * - getTrafficFlowById: Get specific traffic flow station by ID
 */

describe("WSDOT Traffic Flow API - Zod Validation", () => {
  // Generate test suites for all endpoints using the configuration
  wsdotTrafficFlowTestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });

  // Additional integration tests specific to the traffic flow module
  describe("Module Integration Tests", () => {
    it("should have consistent data structure across endpoints", async () => {
      // This test verifies that data returned from different endpoints
      // maintains consistency in structure and relationships
      const { getTrafficFlows, getTrafficFlowById } = await import(
        "@/api/wsdot-traffic-flow"
      );

      // Get data from all flows endpoint
      const allFlows = await getTrafficFlows({});

      // Verify we have data to work with
      expect(Array.isArray(allFlows)).toBe(true);

      if (allFlows.length > 0) {
        // Get individual flow data for comparison
        const firstFlow = allFlows[0];
        const individualFlow = await getTrafficFlowById({
          flowDataID: firstFlow.FlowDataID,
        });

        // Verify consistency between endpoints
        expect(individualFlow.FlowDataID).toBe(firstFlow.FlowDataID);
        expect(individualFlow.FlowReadingValue).toBe(
          firstFlow.FlowReadingValue
        );
        expect(individualFlow.Time).toEqual(firstFlow.Time);

        console.log(`📊 All Flows: ${allFlows.length} stations`);
        console.log(`📊 Sample Flow ID: ${firstFlow.FlowDataID}`);
        console.log(`📊 Sample Flow Reading: ${firstFlow.FlowReadingValue}`);
      }
    });

    it("should return valid flow reading values", async () => {
      // This test verifies that all flow readings are within valid numeric range
      const { getTrafficFlows } = await import("@/api/wsdot-traffic-flow");

      const allFlows = await getTrafficFlows({});

      if (allFlows.length > 0) {
        // Check that all flow readings are valid numeric values (0-4)
        const flowReadings = allFlows.map((flow) => flow.FlowReadingValue);
        const validReadings = flowReadings.filter(
          (reading) =>
            typeof reading === "number" && reading >= 0 && reading <= 4
        );

        expect(validReadings.length).toBe(flowReadings.length);

        // Count distribution of flow readings
        const distribution = flowReadings.reduce(
          (acc, reading) => {
            acc[reading] = (acc[reading] || 0) + 1;
            return acc;
          },
          {} as Record<number, number>
        );

        console.log("🚦 Flow Reading Distribution:");
        Object.entries(distribution)
          .sort(([a], [b]) => Number(a) - Number(b))
          .forEach(([reading, count]) => {
            const meanings = {
              "0": "Unknown/NoData",
              "1": "WideOpen",
              "2": "Moderate",
              "3": "Heavy",
              "4": "StopAndGo",
            };
            console.log(
              `   • ${reading} (${meanings[reading as keyof typeof meanings]}): ${count} stations`
            );
          });
      }
    });

    it("should handle rate limiting gracefully", async () => {
      // This test verifies that the API can handle multiple rapid requests
      // without overwhelming the service
      const { getTrafficFlows } = await import("@/api/wsdot-traffic-flow");

      const startTime = Date.now();

      // Make multiple requests in quick succession
      const promises = Array.from({ length: 3 }, () => getTrafficFlows({}));
      const results = await Promise.all(promises);

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // All requests should succeed
      results.forEach((result) => {
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThanOrEqual(0);
      });

      // Total time should be reasonable (not too fast to indicate rate limiting)
      expect(totalTime).toBeGreaterThan(10); // At least 10ms total

      console.log(`⏱️  Rate limiting test completed in ${totalTime}ms`);
    });

    it("should provide consistent traffic flow station locations", async () => {
      // This test verifies that traffic flow station locations are consistent
      // and contain valid geographic information
      const { getTrafficFlows } = await import("@/api/wsdot-traffic-flow");

      const allFlows = await getTrafficFlows({});

      if (allFlows.length > 0) {
        // Check that stations have location information
        const stationsWithLocations = allFlows.filter(
          (flow) =>
            flow.FlowStationLocation &&
            typeof flow.FlowStationLocation === "object"
        );

        expect(stationsWithLocations.length).toBeGreaterThan(0);

        // Sample a few stations for detailed location validation
        const sampleStations = stationsWithLocations.slice(0, 3);

        sampleStations.forEach((station, index) => {
          expect(station.FlowStationLocation).toBeDefined();
          expect(typeof station.FlowStationLocation).toBe("object");

          console.log(`📍 Station ${index + 1} (ID: ${station.FlowDataID}):`);
          if (station.FlowStationLocation?.Description) {
            console.log(
              `   • Description: ${station.FlowStationLocation.Description}`
            );
          }
        });
      }
    });
  });
});
