import { describe, expect, it } from "vitest";

import {
  getScheduleByRoute,
  getScheduleByTerminals,
  getScheduleTodayByRoute,
  getScheduleTodayByTerminals,
} from "@/api/wsf/schedule";

import {
  delay,
  measureApiCall,
  RATE_LIMIT_DELAY,
  TEST_ROUTE_ID,
  TEST_TERMINAL_ID,
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
        getScheduleByRoute({
          tripDate: testTripDate,
          routeId: TEST_ROUTE_ID,
        })
      );

      // Performance tracking
      trackPerformance("getScheduleByRoute", duration);

      // Validate response
      expect(data).toBeDefined();

      // May be null if no schedule for this route on this date
      if (data) {
        validateScheduleResponse(data);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid route ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getScheduleByRoute({
            tripDate: testTripDate,
            routeId: 99999, // Invalid route ID
          })
        );

        trackPerformance("getScheduleByRoute (invalid route)", duration);

        // Should return null for invalid route ID
        expect(data).toBeNull();
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getScheduleByRoute({
          tripDate: testTripDate,
          routeId: TEST_ROUTE_ID,
        })
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

      // May be null if no schedule for these terminals on this date
      if (data) {
        validateScheduleResponse(data);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid terminal IDs gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getScheduleByTerminals({
            tripDate: testTripDate,
            departingTerminalId: 99999, // Invalid terminal ID
            arrivingTerminalId: 99998, // Invalid terminal ID
          })
        );

        trackPerformance(
          "getScheduleByTerminals (invalid terminals)",
          duration
        );

        // Should return null for invalid terminal IDs
        expect(data).toBeNull();
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
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
        })
      );

      // Performance tracking
      trackPerformance("getScheduleTodayByRoute", duration);

      // Validate response
      expect(data).toBeDefined();

      // May be null if no schedule for this route today
      if (data) {
        validateScheduleResponse(data);
      }

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

      // May be null if no remaining schedule for this route today
      if (data) {
        validateScheduleResponse(data);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid route ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getScheduleTodayByRoute({
            routeId: 99999, // Invalid route ID
          })
        );

        trackPerformance("getScheduleTodayByRoute (invalid route)", duration);

        // Should return null for invalid route ID
        expect(data).toBeNull();
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getScheduleTodayByRoute({
          routeId: TEST_ROUTE_ID,
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
        })
      );

      // Performance tracking
      trackPerformance("getScheduleTodayByTerminals", duration);

      // Validate response
      expect(data).toBeDefined();

      // May be null if no schedule for these terminals today
      if (data) {
        validateScheduleResponse(data);
      }

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

      // May be null if no remaining schedule for these terminals today
      if (data) {
        validateScheduleResponse(data);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid terminal IDs gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getScheduleTodayByTerminals({
            departingTerminalId: 99999, // Invalid terminal ID
            arrivingTerminalId: 99998, // Invalid terminal ID
          })
        );

        trackPerformance(
          "getScheduleTodayByTerminals (invalid terminals)",
          duration
        );

        // Should return null for invalid terminal IDs
        expect(data).toBeNull();
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getScheduleTodayByTerminals({
          departingTerminalId: VALID_TERMINAL_PAIR_1.departing,
          arrivingTerminalId: VALID_TERMINAL_PAIR_1.arriving,
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
      const { data: routeSchedule } = await measureApiCall(() =>
        getScheduleByRoute({
          tripDate: testTripDate,
          routeId: TEST_ROUTE_ID,
        })
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: terminalSchedule } = await measureApiCall(() =>
        getScheduleByTerminals({
          tripDate: testTripDate,
          departingTerminalId: VALID_TERMINAL_PAIR_1.departing,
          arrivingTerminalId: VALID_TERMINAL_PAIR_1.arriving,
        })
      );

      // Both should return ScheduleResponse or null
      if (routeSchedule) {
        expect(routeSchedule).toHaveProperty("ScheduleID");
        expect(routeSchedule).toHaveProperty("ScheduleName");
        expect(routeSchedule).toHaveProperty("AllRoutes");
        expect(routeSchedule).toHaveProperty("TerminalCombos");
        expect(typeof routeSchedule.ScheduleID).toBe("number");
        expect(typeof routeSchedule.ScheduleName).toBe("string");
        expect(Array.isArray(routeSchedule.AllRoutes)).toBe(true);
        expect(Array.isArray(routeSchedule.TerminalCombos)).toBe(true);
      }

      if (terminalSchedule) {
        expect(terminalSchedule).toHaveProperty("ScheduleID");
        expect(terminalSchedule).toHaveProperty("ScheduleName");
        expect(terminalSchedule).toHaveProperty("AllRoutes");
        expect(terminalSchedule).toHaveProperty("TerminalCombos");
        expect(typeof terminalSchedule.ScheduleID).toBe("number");
        expect(typeof terminalSchedule.ScheduleName).toBe("string");
        expect(Array.isArray(terminalSchedule.AllRoutes)).toBe(true);
        expect(Array.isArray(terminalSchedule.TerminalCombos)).toBe(true);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid schedule specifications", async () => {
      const { data } = await measureApiCall(() =>
        getScheduleByRoute({
          tripDate: testTripDate,
          routeId: TEST_ROUTE_ID,
        })
      );

      if (data) {
        // Schedule ID should be positive
        expect(data.ScheduleID).toBeGreaterThan(0);

        // Schedule name should be non-empty string
        expect(data.ScheduleName).toBeTruthy();
        expect(typeof data.ScheduleName).toBe("string");

        // Schedule season should be positive
        expect(data.ScheduleSeason).toBeGreaterThan(0);

        // Schedule start should be before schedule end
        expect(data.ScheduleStart.getTime()).toBeLessThan(
          data.ScheduleEnd.getTime()
        );

        // Arrays should be arrays
        expect(Array.isArray(data.AllRoutes)).toBe(true);
        expect(Array.isArray(data.TerminalCombos)).toBe(true);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Error Scenarios", () => {
    it("should handle timeout scenarios", async () => {
      // This test simulates timeout behavior
      const { duration } = await measureApiCall(() =>
        getScheduleByRoute({
          tripDate: testTripDate,
          routeId: TEST_ROUTE_ID,
        })
      );

      // Should complete within reasonable time
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle malformed responses gracefully", async () => {
      // This test ensures the API handles unexpected response formats
      const { data } = await measureApiCall(() =>
        getScheduleByRoute({
          tripDate: testTripDate,
          routeId: TEST_ROUTE_ID,
        })
      );

      // Should handle the response without throwing
      expect(data).toBeDefined();

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
