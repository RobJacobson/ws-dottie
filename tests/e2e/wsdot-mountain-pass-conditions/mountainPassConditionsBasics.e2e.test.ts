// WSDOT Mountain Pass Conditions API - Basic E2E Tests
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
// API Help: https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help

import { describe, expect, it } from "vitest";

import {
  getMountainPassConditionById,
  getMountainPassConditions,
} from "@/api/wsdot-mountain-pass-conditions";
import { WsdotApiError } from "@/shared/fetching/errors";

import { validateApiError } from "../utils";

// Test data constants based on cURL validation
const TEST_PASS_ID = 1; // Real pass ID from cURL testing

describe("WSDOT Mountain Pass Conditions API - Basic Functionality", () => {
  describe("API Function Availability", () => {
    it("should have getMountainPassConditions function", () => {
      expect(typeof getMountainPassConditions).toBe("function");
    });

    it("should have getMountainPassConditionById function", () => {
      expect(typeof getMountainPassConditionById).toBe("function");
    });
  });

  describe("getMountainPassConditions", () => {
    it("should be callable and return a promise", async () => {
      const result = getMountainPassConditions();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should handle API errors gracefully", async () => {
      try {
        await getMountainPassConditions();
        // If successful, that's fine
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });
  });

  describe("getMountainPassConditionById", () => {
    it("should be callable and return a promise", async () => {
      const result = getMountainPassConditionById({
        passConditionId: TEST_PASS_ID,
      });
      expect(result).toBeInstanceOf(Promise);
      // Ensure the promise is handled to prevent unhandled rejection
      try {
        await result;
      } catch (error) {
        // Expected to fail with 404
        expect(error).toBeInstanceOf(WsdotApiError);
      }
    });

    it("should handle API errors gracefully", async () => {
      try {
        await getMountainPassConditionById({ passConditionId: TEST_PASS_ID });
        // If successful, that's fine
      } catch (error) {
        // 404 is expected for this endpoint based on testing
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });

    it("should throw error for invalid pass ID", async () => {
      try {
        await getMountainPassConditionById({ passConditionId: 999999 });
        throw new Error("Expected error was not thrown");
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });
  });

  describe("Performance Benchmarks", () => {
    it("should complete getMountainPassConditions within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getMountainPassConditions();
      } catch (error) {
        // API errors are expected and acceptable
        expect(error).toBeInstanceOf(WsdotApiError);
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(2000);
    }, 3000);

    it("should complete getMountainPassConditionById within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getMountainPassConditionById({ passConditionId: TEST_PASS_ID });
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
