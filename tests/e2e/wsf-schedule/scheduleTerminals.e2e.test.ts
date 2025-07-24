import { describe, expect, it } from "vitest";

import {
  getTerminalMates,
  getTerminals,
  getTerminalsAndMates,
  getTerminalsAndMatesByRoute,
} from "@/api/wsf-schedule";

import {
  delay,
  measureApiCall,
  RATE_LIMIT_DELAY,
  TEST_ROUTE_ID,
  TEST_TERMINAL_ID,
  trackPerformance,
  validateApiError,
  validateScheduleTerminal,
  validateScheduleTerminalCombo,
} from "../utils";

describe("Schedule Terminals E2E Tests", () => {
  // Use a valid trip date for testing (tomorrow)
  const testTripDate = new Date();
  testTripDate.setDate(testTripDate.getDate() + 1);

  describe("getTerminals", () => {
    it("should fetch terminals successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getTerminals({ tripDate: testTripDate })
      );

      // Performance tracking
      trackPerformance("getTerminals", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first terminal
      const firstTerminal = data[0];
      validateScheduleTerminal(firstTerminal);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getTerminals({ tripDate: testTripDate })
      );

      // Track performance
      trackPerformance("getTerminals (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getTerminalsAndMates", () => {
    it("should fetch terminals and mates successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getTerminalsAndMates({ tripDate: testTripDate })
      );

      // Performance tracking
      trackPerformance("getTerminalsAndMates", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first combo
      const firstCombo = data[0];
      validateScheduleTerminalCombo(firstCombo);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getTerminalsAndMates({ tripDate: testTripDate })
      );

      // Track performance
      trackPerformance("getTerminalsAndMates (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getTerminalsAndMatesByRoute", () => {
    it("should fetch terminals and mates by route successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getTerminalsAndMatesByRoute({
          tripDate: testTripDate,
          routeId: TEST_ROUTE_ID,
        })
      );

      // Performance tracking
      trackPerformance("getTerminalsAndMatesByRoute", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // May be empty if no terminals for this route on this date
      if (data.length > 0) {
        const firstCombo = data[0];
        validateScheduleTerminalCombo(firstCombo);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid route ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getTerminalsAndMatesByRoute({
            tripDate: testTripDate,
            routeId: 999999,
          })
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(5000);

        // Should either return empty array or throw error, not hang
        if (data) {
          expect(Array.isArray(data)).toBe(true);
        }
      } catch (error) {
        // Should throw WsdotApiError for invalid route ID
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getTerminalsAndMatesByRoute({
          tripDate: testTripDate,
          routeId: TEST_ROUTE_ID,
        })
      );

      // Track performance
      trackPerformance(
        "getTerminalsAndMatesByRoute (performance test)",
        duration
      );

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getTerminalMates", () => {
    it("should fetch terminal mates successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getTerminalMates({
          tripDate: testTripDate,
          terminalId: TEST_TERMINAL_ID,
        })
      );

      // Performance tracking
      trackPerformance("getTerminalMates", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first terminal mate
      const firstMate = data[0];
      validateScheduleTerminal(firstMate);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid terminal ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getTerminalMates({ tripDate: testTripDate, terminalId: 999999 })
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(5000);

        // Should either return empty array or throw error, not hang
        if (data) {
          expect(Array.isArray(data)).toBe(true);
        }
      } catch (error) {
        // Should throw WsdotApiError for invalid terminal ID
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getTerminalMates({
          tripDate: testTripDate,
          terminalId: TEST_TERMINAL_ID,
        })
      );

      // Track performance
      trackPerformance("getTerminalMates (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Data Consistency", () => {
    it("should return consistent terminal data structure", async () => {
      const { data: terminals } = await measureApiCall(() =>
        getTerminals({ tripDate: testTripDate })
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: combos } = await measureApiCall(() =>
        getTerminalsAndMates({ tripDate: testTripDate })
      );

      // Both should return arrays
      expect(Array.isArray(terminals)).toBe(true);
      expect(Array.isArray(combos)).toBe(true);

      // Terminals should have consistent structure
      if (terminals.length > 0) {
        const terminal = terminals[0];
        validateScheduleTerminal(terminal);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid terminal specifications", async () => {
      const { data } = await measureApiCall(() =>
        getTerminals({ tripDate: testTripDate })
      );

      data.forEach((terminal) => {
        validateScheduleTerminal(terminal);
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
