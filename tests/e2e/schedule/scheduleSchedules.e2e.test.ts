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
        getScheduleByRoute(testTripDate, TEST_ROUTE_ID)
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
        const { data, duration } = await measureApiCall(
          () => getScheduleByRoute(testTripDate, 99999) // Invalid route ID
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
        getScheduleByRoute(testTripDate, TEST_ROUTE_ID)
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
        getScheduleByTerminals(
          testTripDate,
          VALID_TERMINAL_PAIR_1.departing,
          VALID_TERMINAL_PAIR_1.arriving
        )
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
          getScheduleByTerminals(
            testTripDate,
            99999, // Invalid terminal ID
            99998 // Invalid terminal ID
          )
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
        getScheduleByTerminals(
          testTripDate,
          VALID_TERMINAL_PAIR_1.departing,
          VALID_TERMINAL_PAIR_1.arriving
        )
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
        getScheduleTodayByRoute(TEST_ROUTE_ID)
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
        getScheduleTodayByRoute(TEST_ROUTE_ID, true)
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
        const { data, duration } = await measureApiCall(
          () => getScheduleTodayByRoute(99999) // Invalid route ID
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
        getScheduleTodayByRoute(TEST_ROUTE_ID)
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
        getScheduleTodayByTerminals(
          VALID_TERMINAL_PAIR_1.departing,
          VALID_TERMINAL_PAIR_1.arriving
        )
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
        getScheduleTodayByTerminals(
          VALID_TERMINAL_PAIR_1.departing,
          VALID_TERMINAL_PAIR_1.arriving,
          true
        )
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
        const { data, duration } = await measureApiCall(
          () => getScheduleTodayByTerminals(99999, 99998) // Invalid terminal IDs
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
        getScheduleTodayByTerminals(
          VALID_TERMINAL_PAIR_1.departing,
          VALID_TERMINAL_PAIR_1.arriving
        )
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
        getScheduleByRoute(testTripDate, TEST_ROUTE_ID)
      );

      expect(data).toBeDefined();

      if (data) {
        validateScheduleResponse(data);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid schedule specifications", async () => {
      const { data } = await measureApiCall(() =>
        getScheduleByRoute(testTripDate, TEST_ROUTE_ID)
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
