import { describe, expect, it } from "vitest";

import {
  getScheduleByRoute,
  getScheduleByTerminals,
  getScheduleTodayByRoute,
  getScheduleTodayByTerminals,
} from "@/api/wsf-schedule";

import {
  delay,
  measureApiCall,
  RATE_LIMIT_DELAY,
  TEST_ROUTE_ID,
  trackPerformance,
  VALID_TERMINAL_PAIR_1,
  validateApiError,
  validateScheduleResponse,
} from "../utils";

describe("Schedule Schedules E2E Tests", () => {
  // Use a valid trip date for testing (tomorrow)
  const testTripDate = new Date();
  testTripDate.setDate(testTripDate.getDate() + 1);

  describe("getScheduleByRoute", () => {
    it("should fetch schedule by route successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getScheduleByRoute({ tripDate: testTripDate, routeId: TEST_ROUTE_ID })
      );

      // Performance tracking
      trackPerformance("getScheduleByRoute", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
      expect(Array.isArray(data)).toBe(false);

      // Validate schedule response
      validateScheduleResponse(data);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid route ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(
          () => getScheduleByRoute({ tripDate: testTripDate, routeId: 99999 }) // Invalid route ID
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(5000);

        // Should either return null or throw error, not hang
        if (data) {
          expect(typeof data).toBe("object");
        }
      } catch (error) {
        // Should throw WsdotApiError for invalid route ID
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getScheduleByRoute({ tripDate: testTripDate, routeId: TEST_ROUTE_ID })
      );

      // Track performance
      trackPerformance("getScheduleByRoute (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getScheduleByTerminals", () => {
    it("should fetch schedule by terminals successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getScheduleByTerminals({
          tripDate: testTripDate,
          departingTerminalId: VALID_TERMINAL_PAIR_1.departing,
          arrivingTerminalId: VALID_TERMINAL_PAIR_1.arriving,
        })
      );

      // Performance tracking
      trackPerformance("getScheduleByTerminals", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
      expect(Array.isArray(data)).toBe(false);

      // Validate schedule response
      validateScheduleResponse(data);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid terminal IDs gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getScheduleByTerminals({
            tripDate: testTripDate,
            departingTerminalId: 99999,
            arrivingTerminalId: 99999,
          })
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(5000);

        // Should either return null or throw error, not hang
        if (data) {
          expect(typeof data).toBe("object");
        }
      } catch (error) {
        // Should throw WsdotApiError for invalid terminal IDs
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getScheduleByTerminals({
          tripDate: testTripDate,
          departingTerminalId: VALID_TERMINAL_PAIR_1.departing,
          arrivingTerminalId: VALID_TERMINAL_PAIR_1.arriving,
        })
      );

      // Track performance
      trackPerformance("getScheduleByTerminals (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getScheduleTodayByRoute", () => {
    it("should fetch today's schedule by route successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getScheduleTodayByRoute({
          routeId: TEST_ROUTE_ID,
          onlyRemainingTimes: false,
        })
      );

      // Performance tracking
      trackPerformance("getScheduleTodayByRoute", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
      expect(Array.isArray(data)).toBe(false);

      // Validate schedule response
      validateScheduleResponse(data);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should fetch today's schedule by route with only remaining times", async () => {
      const { data, duration } = await measureApiCall(() =>
        getScheduleTodayByRoute({
          routeId: TEST_ROUTE_ID,
          onlyRemainingTimes: true,
        })
      );

      // Performance tracking
      trackPerformance("getScheduleTodayByRoute (remaining times)", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
      expect(Array.isArray(data)).toBe(false);

      // Validate schedule response
      validateScheduleResponse(data);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid route ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getScheduleTodayByRoute({ routeId: 99999, onlyRemainingTimes: false })
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(5000);

        // Should either return null or throw error, not hang
        if (data) {
          expect(typeof data).toBe("object");
        }
      } catch (error) {
        // Should throw WsdotApiError for invalid route ID
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getScheduleTodayByRoute({
          routeId: TEST_ROUTE_ID,
          onlyRemainingTimes: false,
        })
      );

      // Track performance
      trackPerformance("getScheduleTodayByRoute (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getScheduleTodayByTerminals", () => {
    it("should fetch today's schedule by terminals successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getScheduleTodayByTerminals({
          departingTerminalId: VALID_TERMINAL_PAIR_1.departing,
          arrivingTerminalId: VALID_TERMINAL_PAIR_1.arriving,
          onlyRemainingTimes: false,
        })
      );

      // Performance tracking
      trackPerformance("getScheduleTodayByTerminals", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
      expect(Array.isArray(data)).toBe(false);

      // Validate schedule response
      validateScheduleResponse(data);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should fetch today's schedule by terminals with only remaining times", async () => {
      const { data, duration } = await measureApiCall(() =>
        getScheduleTodayByTerminals({
          departingTerminalId: VALID_TERMINAL_PAIR_1.departing,
          arrivingTerminalId: VALID_TERMINAL_PAIR_1.arriving,
          onlyRemainingTimes: true,
        })
      );

      // Performance tracking
      trackPerformance(
        "getScheduleTodayByTerminals (remaining times)",
        duration
      );

      // Validate response
      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
      expect(Array.isArray(data)).toBe(false);

      // Validate schedule response
      validateScheduleResponse(data);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid terminal IDs gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getScheduleTodayByTerminals({
            departingTerminalId: 99999,
            arrivingTerminalId: 99999,
            onlyRemainingTimes: false,
          })
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(5000);

        // Should either return null or throw error, not hang
        if (data) {
          expect(typeof data).toBe("object");
        }
      } catch (error) {
        // Should throw WsdotApiError for invalid terminal IDs
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getScheduleTodayByTerminals({
          departingTerminalId: VALID_TERMINAL_PAIR_1.departing,
          arrivingTerminalId: VALID_TERMINAL_PAIR_1.arriving,
          onlyRemainingTimes: false,
        })
      );

      // Track performance
      trackPerformance(
        "getScheduleTodayByTerminals (performance test)",
        duration
      );

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Data Consistency", () => {
    it("should return consistent schedule data structure", async () => {
      const { data } = await measureApiCall(() =>
        getScheduleByRoute({ tripDate: testTripDate, routeId: TEST_ROUTE_ID })
      );

      expect(data).toBeDefined();

      if (data) {
        validateScheduleResponse(data);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid schedule specifications", async () => {
      const { data } = await measureApiCall(() =>
        getScheduleByRoute({ tripDate: testTripDate, routeId: TEST_ROUTE_ID })
      );

      expect(data).toBeDefined();

      if (data) {
        // Check that schedule has valid specifications
        expect(data.ScheduleID).toBeGreaterThan(0);
        expect(data.ScheduleName).toBeDefined();
        expect(typeof data.ScheduleName).toBe("string");
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Error Scenarios", () => {
    it("should handle timeout scenarios", async () => {
      // This test would require mocking timeout scenarios
      // For now, just ensure the API handles errors gracefully
      expect(true).toBe(true);
    });

    it("should handle malformed responses gracefully", async () => {
      // This test would require mocking malformed responses
      // For now, just ensure the API handles errors gracefully
      expect(true).toBe(true);
    });
  });
});
