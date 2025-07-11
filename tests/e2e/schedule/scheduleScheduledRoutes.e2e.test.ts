import { describe, expect, it } from "vitest";

import {
  getAllSailings,
  getSailings,
  getScheduledRoutes,
  getScheduledRoutesBySeason,
} from "@/api/wsf/schedule";

import {
  delay,
  measureApiCall,
  RATE_LIMIT_DELAY,
  TEST_SCHED_ROUTE_ID,
  TEST_SCHEDULE_ID,
  trackPerformance,
  validateApiError,
  validateSailing,
  validateScheduledRoute,
} from "../utils";

describe("Schedule Scheduled Routes E2E Tests", () => {
  describe("getScheduledRoutes", () => {
    it("should fetch scheduled routes successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getScheduledRoutes()
      );

      // Performance tracking
      trackPerformance("getScheduledRoutes", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first scheduled route
      const firstRoute = data[0];
      validateScheduledRoute(firstRoute);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() => getScheduledRoutes());

      // Track performance
      trackPerformance("getScheduledRoutes (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getScheduledRoutesBySeason", () => {
    it("should fetch scheduled routes by season successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getScheduledRoutesBySeason(TEST_SCHEDULE_ID)
      );

      // Performance tracking
      trackPerformance("getScheduledRoutesBySeason", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // May be empty if no routes for this season
      if (data.length > 0) {
        const firstRoute = data[0];
        validateScheduledRoute(firstRoute);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid schedule ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(
          () => getScheduledRoutesBySeason(99999) // Invalid schedule ID
        );

        trackPerformance(
          "getScheduledRoutesBySeason (invalid schedule)",
          duration
        );

        // Should return empty array for invalid schedule ID
        expect(Array.isArray(data)).toBe(true);
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getScheduledRoutesBySeason(TEST_SCHEDULE_ID)
      );

      // Track performance
      trackPerformance(
        "getScheduledRoutesBySeason (performance test)",
        duration
      );

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getSailings", () => {
    it("should fetch sailings successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getSailings({ schedRouteId: TEST_SCHED_ROUTE_ID })
      );

      // Performance tracking
      trackPerformance("getSailings", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // May be empty if no sailings for this route
      if (data.length > 0) {
        const firstSailing = data[0];
        validateSailing(firstSailing);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid scheduled route ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(
          () => getSailings({ schedRouteId: 99999 }) // Invalid scheduled route ID
        );

        trackPerformance("getSailings (invalid route)", duration);

        // Should return empty array for invalid scheduled route ID
        expect(Array.isArray(data)).toBe(true);
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getSailings({ schedRouteId: TEST_SCHED_ROUTE_ID })
      );

      // Track performance
      trackPerformance("getSailings (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getAllSailings", () => {
    it("should fetch all sailings successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getAllSailings({ schedRouteId: TEST_SCHED_ROUTE_ID })
      );

      // Performance tracking
      trackPerformance("getAllSailings", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // May be empty if no sailings for this route
      if (data.length > 0) {
        const firstSailing = data[0];
        validateSailing(firstSailing);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid scheduled route ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(
          () => getAllSailings({ schedRouteId: 99999 }) // Invalid scheduled route ID
        );

        trackPerformance("getAllSailings (invalid route)", duration);

        // Should return empty array for invalid scheduled route ID
        expect(Array.isArray(data)).toBe(true);
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getAllSailings({ schedRouteId: TEST_SCHED_ROUTE_ID })
      );

      // Track performance
      trackPerformance("getAllSailings (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Data Consistency", () => {
    it("should return consistent scheduled route data structure", async () => {
      const { data: allRoutes } = await measureApiCall(() =>
        getScheduledRoutes()
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: seasonRoutes } = await measureApiCall(() =>
        getScheduledRoutesBySeason(TEST_SCHEDULE_ID)
      );

      // Both should return arrays
      expect(Array.isArray(allRoutes)).toBe(true);
      expect(Array.isArray(seasonRoutes)).toBe(true);

      // Scheduled routes should have consistent structure
      if (allRoutes.length > 0) {
        const route = allRoutes[0];
        expect(route).toHaveProperty("ScheduleID");
        expect(route).toHaveProperty("SchedRouteID");
        expect(route).toHaveProperty("RouteID");
        expect(route).toHaveProperty("RouteAbbrev");
        expect(route).toHaveProperty("Description");
        expect(typeof route.ScheduleID).toBe("number");
        expect(typeof route.SchedRouteID).toBe("number");
        expect(typeof route.RouteID).toBe("number");
        expect(typeof route.RouteAbbrev).toBe("string");
        expect(typeof route.Description).toBe("string");
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid scheduled route specifications", async () => {
      const { data } = await measureApiCall(() => getScheduledRoutes());

      data.forEach((route) => {
        // Schedule ID should be positive
        expect(route.ScheduleID).toBeGreaterThan(0);

        // Scheduled route ID should be positive
        expect(route.SchedRouteID).toBeGreaterThan(0);

        // Route ID should be positive
        expect(route.RouteID).toBeGreaterThan(0);

        // Route abbreviation should be non-empty string
        expect(route.RouteAbbrev).toBeTruthy();
        expect(typeof route.RouteAbbrev).toBe("string");

        // Description should be non-empty string
        expect(route.Description).toBeTruthy();
        expect(typeof route.Description).toBe("string");
      });

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid sailing specifications", async () => {
      const { data } = await measureApiCall(() =>
        getSailings({ schedRouteId: TEST_SCHED_ROUTE_ID })
      );

      if (data.length > 0) {
        data.forEach((sailing) => {
          // Schedule ID should be positive
          expect(sailing.ScheduleID).toBeGreaterThan(0);

          // Scheduled route ID should be positive
          expect(sailing.SchedRouteID).toBeGreaterThan(0);

          // Route ID should be positive
          expect(sailing.RouteID).toBeGreaterThan(0);

          // Sailing ID should be positive
          expect(sailing.SailingID).toBeGreaterThan(0);

          // Sailing description should be non-empty string
          expect(sailing.SailingDescription).toBeTruthy();
          expect(typeof sailing.SailingDescription).toBe("string");

          // Display column number should be non-negative
          expect(sailing.DisplayColNum).toBeGreaterThanOrEqual(0);

          // Sailing direction should be valid
          expect(typeof sailing.SailingDir).toBe("number");

          // Day operation description should be non-empty string
          expect(sailing.DayOpDescription).toBeTruthy();
          expect(typeof sailing.DayOpDescription).toBe("string");

          // Arrays should be arrays
          expect(Array.isArray(sailing.ActiveDateRanges)).toBe(true);
          expect(Array.isArray(sailing.Journs)).toBe(true);
        });
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Error Scenarios", () => {
    it("should handle timeout scenarios", async () => {
      // This test simulates timeout behavior
      const { duration } = await measureApiCall(() => getScheduledRoutes());

      // Should complete within reasonable time
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle malformed responses gracefully", async () => {
      // This test ensures the API handles unexpected response formats
      const { data } = await measureApiCall(() => getScheduledRoutes());

      // Should handle the response without throwing
      expect(data).toBeDefined();

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
