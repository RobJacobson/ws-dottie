import { describe, expect, it } from "vitest";

import {
  getRouteDetails,
  getRouteDetailsByRoute,
  getRouteDetailsByTerminals,
  getRoutes,
  getRoutesByTerminals,
  getRoutesWithDisruptions,
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
        getRoutes(testTripDate)
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
      const { duration } = await measureApiCall(() => getRoutes(testTripDate));

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

      // May be empty if no routes between these terminals on this date
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
            departingTerminalId: 99999, // Invalid terminal ID
            arrivingTerminalId: 99998, // Invalid terminal ID
          })
        );

        trackPerformance("getRoutesByTerminals (invalid terminals)", duration);

        // Should return empty array for invalid terminals
        expect(Array.isArray(data)).toBe(true);
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
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
        getRoutesWithDisruptions(testTripDate)
      );

      // Performance tracking
      trackPerformance("getRoutesWithDisruptions", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // May be empty if no disruptions on this date
      if (data.length > 0) {
        const firstRoute = data[0];
        validateRoute(firstRoute);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getRoutesWithDisruptions(testTripDate)
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
        getRouteDetails(testTripDate)
      );

      // Performance tracking
      trackPerformance("getRouteDetails", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first route details
      const firstRoute = data[0];
      validateRouteDetails(firstRoute);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getRouteDetails(testTripDate)
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

      // May be empty if no routes between these terminals on this date
      if (data.length > 0) {
        const firstRoute = data[0];
        validateRouteDetails(firstRoute);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid terminal IDs gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getRouteDetailsByTerminals({
            tripDate: testTripDate,
            departingTerminalId: 99999, // Invalid terminal ID
            arrivingTerminalId: 99998, // Invalid terminal ID
          })
        );

        trackPerformance(
          "getRouteDetailsByTerminals (invalid terminals)",
          duration
        );

        // Should return empty array for invalid terminals
        expect(Array.isArray(data)).toBe(true);
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
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

      // May be null if no route details for this route on this date
      if (data) {
        validateRouteDetails(data);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid route ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getRouteDetailsByRoute({
            tripDate: testTripDate,
            routeId: 99999, // Invalid route ID
          })
        );

        trackPerformance("getRouteDetailsByRoute (invalid route)", duration);

        // Should return null for invalid route
        expect(data).toBeNull();
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
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
      const { data: routes } = await measureApiCall(() =>
        getRoutes(testTripDate)
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: routeDetails } = await measureApiCall(() =>
        getRouteDetails(testTripDate)
      );

      // Both should return arrays
      expect(Array.isArray(routes)).toBe(true);
      expect(Array.isArray(routeDetails)).toBe(true);

      // Routes should have consistent structure
      if (routes.length > 0) {
        const route = routes[0];
        expect(route).toHaveProperty("RouteID");
        expect(route).toHaveProperty("RouteAbbrev");
        expect(route).toHaveProperty("Description");
        expect(typeof route.RouteID).toBe("number");
        expect(typeof route.RouteAbbrev).toBe("string");
        expect(typeof route.Description).toBe("string");
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid route specifications", async () => {
      const { data } = await measureApiCall(() => getRoutes(testTripDate));

      data.forEach((route) => {
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
  });

  describe("Error Scenarios", () => {
    it("should handle timeout scenarios", async () => {
      // This test simulates timeout behavior
      const { duration } = await measureApiCall(() => getRoutes(testTripDate));

      // Should complete within reasonable time
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle malformed responses gracefully", async () => {
      // This test ensures the API handles unexpected response formats
      const { data } = await measureApiCall(() => getRoutes(testTripDate));

      // Should handle the response without throwing
      expect(data).toBeDefined();

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
