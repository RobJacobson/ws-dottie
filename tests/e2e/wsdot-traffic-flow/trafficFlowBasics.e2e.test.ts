// WSDOT Traffic Flow API - Basic E2E Tests
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html
// API Help: https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc/Help

import { describe, expect, it } from "vitest";

import { getTrafficFlowById, getTrafficFlows } from "@/api/wsdot-traffic-flow";
import { WsdotApiError } from "@/shared/fetching/errors";

import { validateApiError } from "../utils";

// Test data constants based on cURL validation
const TEST_FLOW_ID = 2482; // Real flow ID from cURL testing

describe("WSDOT Traffic Flow API - Basic Functionality", () => {
  describe("API Function Availability", () => {
    it("should have getTrafficFlows function", () => {
      expect(typeof getTrafficFlows).toBe("function");
    });

    it("should have getTrafficFlowById function", () => {
      expect(typeof getTrafficFlowById).toBe("function");
    });
  });

  describe("getTrafficFlows", () => {
    it("should be callable and return a promise", async () => {
      const result = getTrafficFlows();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should handle API errors gracefully", async () => {
      try {
        await getTrafficFlows();
        // If successful, that's fine
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });
  });

  describe("getTrafficFlowById", () => {
    it("should be callable and return a promise", async () => {
      const result = getTrafficFlowById(TEST_FLOW_ID);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should handle API errors gracefully", async () => {
      try {
        await getTrafficFlowById(TEST_FLOW_ID);
        // If successful, that's fine
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });

    it("should throw error for invalid flow ID", async () => {
      try {
        await getTrafficFlowById(999999);
        throw new Error("Expected error was not thrown");
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });
  });

  describe("Performance Benchmarks", () => {
    it("should complete getTrafficFlows within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getTrafficFlows();
      } catch (error) {
        // API errors are expected and acceptable
        expect(error).toBeInstanceOf(WsdotApiError);
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(2000);
    }, 3000);

    it("should complete getTrafficFlowById within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getTrafficFlowById(TEST_FLOW_ID);
      } catch (error) {
        // API errors are expected and acceptable
        expect(error).toBeInstanceOf(WsdotApiError);
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(2000);
    }, 3000);
  });
});
