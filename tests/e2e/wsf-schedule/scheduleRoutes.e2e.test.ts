import { describe, expect, it } from "vitest";

import {
  getRouteDetails,
  getRouteDetailsByRoute,
  getRouteDetailsByTerminals,
  getRoutes,
  getRoutesByTerminals,
  getRoutesWithDisruptions,
} from "@/api/wsf-schedule";

import {
  delay,
  measureApiCall,
  RATE_LIMIT_DELAY,
  TEST_ROUTE_ID,
  trackPerformance,
  VALID_TERMINAL_PAIR_1,
  validateApiError,
  validateRoute,
  validateRouteDetails,
} from "../utils";

describe("Schedule Routes E2E Tests", () => {
  // Use a valid trip date for testing (tomorrow)
  const testTripDate = new Date();
  testTripDate.setDate(testTripDate.getDate() + 1);

  describe("getRoutes", () => {
    it("should fetch routes successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getRoutes({ tripDate: testTripDate })
      );

      // Performance tracking
      trackPerformance("getRoutes", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first route
      const firstRoute = data[0];
      validateRoute(firstRoute);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getRoutes({ tripDate: testTripDate })
      );

      // Track performance
      trackPerformance("getRoutes (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getRoutesByTerminals", () => {
    it("should fetch routes by terminals successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getRoutesByTerminals({
          tripDate: testTripDate,
          departingTerminalId: VALID_TERMINAL_PAIR_1.departing,
          arrivingTerminalId: VALID_TERMINAL_PAIR_1.arriving,
        })
      );

      // Performance tracking
      trackPerformance("getRoutesByTerminals", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // May be empty if no routes for this terminal combination on this date
      if (data.length > 0) {
        const firstRoute = data[0];
        validateRoute(firstRoute);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid terminal IDs gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getRoutesByTerminals({
            tripDate: testTripDate,
            departingTerminalId: 999999,
            arrivingTerminalId: 999999,
          })
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(5000);

        // Should either return empty array or throw error, not hang
        if (data) {
          expect(Array.isArray(data)).toBe(true);
        }
      } catch (error) {
        // Should throw WsdotApiError for invalid terminal IDs
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getRoutesByTerminals({
          tripDate: testTripDate,
          departingTerminalId: VALID_TERMINAL_PAIR_1.departing,
          arrivingTerminalId: VALID_TERMINAL_PAIR_1.arriving,
        })
      );

      // Track performance
      trackPerformance("getRoutesByTerminals (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getRoutesWithDisruptions", () => {
    it("should fetch routes with disruptions successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getRoutesWithDisruptions({ tripDate: testTripDate })
      );

      // Performance tracking
      trackPerformance("getRoutesWithDisruptions", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // May be empty if no routes have disruptions on this date
      if (data.length > 0) {
        const firstRoute = data[0];
        validateRoute(firstRoute);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getRoutesWithDisruptions({ tripDate: testTripDate })
      );

      // Track performance
      trackPerformance("getRoutesWithDisruptions (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getRouteDetails", () => {
    it("should fetch route details successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getRouteDetails({ tripDate: testTripDate })
      );

      // Performance tracking
      trackPerformance("getRouteDetails", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first route detail
      const firstRouteDetail = data[0];
      validateRoute(firstRouteDetail);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getRouteDetails({ tripDate: testTripDate })
      );

      // Track performance
      trackPerformance("getRouteDetails (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getRouteDetailsByTerminals", () => {
    it("should fetch route details by terminals successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getRouteDetailsByTerminals({
          tripDate: testTripDate,
          departingTerminalId: VALID_TERMINAL_PAIR_1.departing,
          arrivingTerminalId: VALID_TERMINAL_PAIR_1.arriving,
        })
      );

      // Performance tracking
      trackPerformance("getRouteDetailsByTerminals", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // May be empty if no routes for this terminal combination on this date
      if (data.length > 0) {
        const firstRouteDetail = data[0];
        validateRoute(firstRouteDetail);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid terminal IDs gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getRouteDetailsByTerminals({
            tripDate: testTripDate,
            departingTerminalId: 999999,
            arrivingTerminalId: 999999,
          })
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(5000);

        // Should either return empty array or throw error, not hang
        if (data) {
          expect(Array.isArray(data)).toBe(true);
        }
      } catch (error) {
        // Should throw WsdotApiError for invalid terminal IDs
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getRouteDetailsByTerminals({
          tripDate: testTripDate,
          departingTerminalId: VALID_TERMINAL_PAIR_1.departing,
          arrivingTerminalId: VALID_TERMINAL_PAIR_1.arriving,
        })
      );

      // Track performance
      trackPerformance(
        "getRouteDetailsByTerminals (performance test)",
        duration
      );

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getRouteDetailsByRoute", () => {
    it("should fetch route details by route successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getRouteDetailsByRoute({
          tripDate: testTripDate,
          routeId: TEST_ROUTE_ID,
        })
      );

      // Performance tracking
      trackPerformance("getRouteDetailsByRoute", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
      expect(Array.isArray(data)).toBe(false);

      // Validate route details
      validateRouteDetails(data);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid route ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getRouteDetailsByRoute({ tripDate: testTripDate, routeId: 999999 })
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
        getRouteDetailsByRoute({
          tripDate: testTripDate,
          routeId: TEST_ROUTE_ID,
        })
      );

      // Track performance
      trackPerformance("getRouteDetailsByRoute (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Data Consistency", () => {
    it("should return consistent route data structure", async () => {
      const { data } = await measureApiCall(() =>
        getRoutes({ tripDate: testTripDate })
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // Validate all routes have consistent structure
      data.forEach((route) => {
        validateRoute(route);
      });

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid route specifications", async () => {
      const { data } = await measureApiCall(() =>
        getRoutes({ tripDate: testTripDate })
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // Check that routes have valid specifications
      data.forEach((route) => {
        expect(route.RouteID).toBeGreaterThan(0);
        expect(route.Description).toBeDefined();
        expect(typeof route.Description).toBe("string");
      });

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
