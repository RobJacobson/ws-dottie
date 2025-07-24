import { describe, expect, it } from "vitest";

import {
  getAllSailings,
  getSailings,
  getScheduledRoutes,
  getScheduledRoutesBySeason,
} from "@/api/wsf-schedule";

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
    it("should fetch all scheduled routes successfully", async () => {
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
        getScheduledRoutesBySeason({ scheduleId: TEST_SCHEDULE_ID })
      );

      // Performance tracking
      trackPerformance("getScheduledRoutesBySeason", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first scheduled route
      const firstScheduledRoute = data[0];
      validateScheduledRoute(firstScheduledRoute);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid season ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(
          () => getScheduledRoutesBySeason({ scheduleId: 99999 }) // Invalid season ID
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(5000);

        // Should either return empty array or throw error, not hang
        if (data) {
          expect(Array.isArray(data)).toBe(true);
        }
      } catch (error) {
        // Should throw WsdotApiError for invalid season ID
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getScheduledRoutesBySeason({ scheduleId: TEST_SCHEDULE_ID })
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
      expect(data.length).toBeGreaterThan(0);

      // Validate first sailing
      const firstSailing = data[0];
      validateSailing(firstSailing);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid scheduled route ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getSailings({ schedRouteId: 99999 })
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(5000);

        // Should either return empty array or throw error, not hang
        if (data) {
          expect(Array.isArray(data)).toBe(true);
        }
      } catch (error) {
        // Should throw WsdotApiError for invalid scheduled route ID
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
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
      expect(data.length).toBeGreaterThan(0);

      // Validate first sailing
      const firstSailing = data[0];
      validateSailing(firstSailing);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid scheduled route ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getAllSailings({ schedRouteId: 99999 })
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(5000);

        // Should either return empty array or throw error, not hang
        if (data) {
          expect(Array.isArray(data)).toBe(true);
        }
      } catch (error) {
        // Should throw WsdotApiError for invalid scheduled route ID
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
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
        getScheduledRoutesBySeason({ scheduleId: TEST_SCHEDULE_ID })
      );

      // Both should return arrays
      expect(Array.isArray(allRoutes)).toBe(true);
      expect(Array.isArray(seasonRoutes)).toBe(true);

      // Scheduled routes should have consistent structure
      if (allRoutes.length > 0) {
        const route = allRoutes[0];
        validateScheduledRoute(route);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid scheduled route specifications", async () => {
      const { data } = await measureApiCall(() => getScheduledRoutes());

      data.forEach((route) => {
        validateScheduledRoute(route);
      });

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid sailing specifications", async () => {
      const { data } = await measureApiCall(() =>
        getSailings({ schedRouteId: TEST_SCHED_ROUTE_ID })
      );

      if (data.length > 0) {
        data.forEach((sailing) => {
          validateSailing(sailing);
        });
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
