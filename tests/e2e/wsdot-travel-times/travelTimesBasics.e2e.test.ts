// WSDOT Travel Times API - Basic E2E Tests
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___travel_times.html
// API Help: https://wsdot.wa.gov/traffic/api/TravelTimes/TravelTimesREST.svc/Help

import { describe, expect, it } from "vitest";

import { getTravelTimeById, getTravelTimes } from "@/api/wsdot-travel-times";
import { WsdotApiError } from "@/shared/fetching/errors";

import { validateApiError } from "../utils";

// Test data constants based on cURL validation
const TEST_TRAVEL_TIME_ID = 2; // Real travel time ID from cURL testing

describe("WSDOT Travel Times API - Basic Functionality", () => {
  describe("API Function Availability", () => {
    it("should have getTravelTimes function", () => {
      expect(typeof getTravelTimes).toBe("function");
    });

    it("should have getTravelTimeById function", () => {
      expect(typeof getTravelTimeById).toBe("function");
    });
  });

  describe("getTravelTimes", () => {
    it("should be callable and return a promise", async () => {
      const result = getTravelTimes();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should handle API errors gracefully", async () => {
      try {
        await getTravelTimes();
        // If successful, that's fine
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });
  });

  describe("getTravelTimeById", () => {
    it("should be callable and return a promise", async () => {
      const result = getTravelTimeById(TEST_TRAVEL_TIME_ID);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should handle API errors gracefully", async () => {
      try {
        await getTravelTimeById(TEST_TRAVEL_TIME_ID);
        // If successful, that's fine
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });

    it("should throw error for invalid travel time ID", async () => {
      try {
        await getTravelTimeById(999999);
        throw new Error("Expected error was not thrown");
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });
  });

  describe("Performance Benchmarks", () => {
    it("should complete getTravelTimes within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getTravelTimes();
      } catch (error) {
        // API errors are expected and acceptable
        expect(error).toBeInstanceOf(WsdotApiError);
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(2000);
    }, 3000);

    it("should complete getTravelTimeById within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getTravelTimeById(TEST_TRAVEL_TIME_ID);
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
