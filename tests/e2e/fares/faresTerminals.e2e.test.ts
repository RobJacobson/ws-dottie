import { beforeAll, describe, expect, it } from "vitest";

import {
  getFaresTerminalMates,
  getFaresTerminals,
  getFaresValidDateRange,
  getTerminalCombo,
  getTerminalComboVerbose,
} from "@/api/wsf/fares";

import {
  delay,
  INVALID_TERMINAL_ID,
  measureApiCall,
  RATE_LIMIT_DELAY,
  trackPerformance,
  VALID_TERMINAL_PAIR_1,
  VALID_TERMINAL_PAIR_2,
  validateApiError,
  validateFaresTerminal,
  validateFaresTerminalCombo,
  validateFaresTerminalComboVerbose,
  validateFaresTerminalMate,
} from "../utils";

describe("Fares Terminals E2E Tests", () => {
  // Use a valid trip date for testing - will be set dynamically
  let testTripDate: Date;

  beforeAll(async () => {
    // Get a valid date from the API
    const validDateRange = await getFaresValidDateRange();
    testTripDate = new Date(validDateRange.DateFrom);
  });

  describe("getFaresTerminals", () => {
    it("should fetch terminals for a valid trip date successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getFaresTerminals(testTripDate)
      );

      // Performance tracking
      trackPerformance("getFaresTerminals", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first terminal
      if (data.length > 0) {
        validateFaresTerminal(data[0]);
        console.log("First terminal object:", data[0]);
        console.log("First terminal keys:", Object.keys(data[0]));
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getFaresTerminals(testTripDate)
      );

      // Track performance
      trackPerformance("getFaresTerminals (performance test)", duration);

      // Performance should be under 10 seconds for E2E tests
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle different trip dates", async () => {
      // Use a different valid date from the range
      const validDateRange = await getFaresValidDateRange();
      const futureDate = new Date(validDateRange.DateThru);
      const { data, duration } = await measureApiCall(() =>
        getFaresTerminals(futureDate)
      );

      trackPerformance("getFaresTerminals (future date)", duration);

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data.length > 0) {
        validateFaresTerminal(data[0]);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getFaresTerminalMates", () => {
    it("should fetch terminal mates for a valid terminal successfully", async () => {
      // Use a known valid terminal ID from the valid terminal pairs
      const testTerminalID = VALID_TERMINAL_PAIR_1.departing;

      const { data, duration } = await measureApiCall(() =>
        getFaresTerminalMates(testTripDate, testTerminalID)
      );

      // Performance tracking
      trackPerformance("getFaresTerminalMates", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // Validate first terminal mate if available
      if (data.length > 0) {
        validateFaresTerminalMate(data[0]);
        console.log("First terminal mate object:", data[0]);
        console.log("First terminal mate keys:", Object.keys(data[0]));
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      // Use a known valid terminal ID
      const testTerminalID = VALID_TERMINAL_PAIR_1.departing;

      const { duration } = await measureApiCall(() =>
        getFaresTerminalMates(testTripDate, testTerminalID)
      );

      // Track performance
      trackPerformance("getFaresTerminalMates (performance test)", duration);

      // Performance should be under 10 seconds for E2E tests
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getTerminalCombo", () => {
    it("should fetch terminal combo for valid terminals successfully", async () => {
      // Use known valid terminal pair
      const departingTerminalID = VALID_TERMINAL_PAIR_1.departing;
      const arrivingTerminalID = VALID_TERMINAL_PAIR_1.arriving;

      const { data, duration } = await measureApiCall(() =>
        getTerminalCombo(testTripDate, departingTerminalID, arrivingTerminalID)
      );

      // Performance tracking
      trackPerformance("getTerminalCombo", duration);

      // Validate response
      expect(data).toBeDefined();
      console.log("getTerminalCombo response type:", typeof data);
      console.log("getTerminalCombo response:", data);
      expect(typeof data).toBe("object");
      expect(Array.isArray(data)).toBe(false);

      // Validate terminal combo object
      validateFaresTerminalCombo(data);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      // Use known valid terminal pair
      const departingTerminalID = VALID_TERMINAL_PAIR_1.departing;
      const arrivingTerminalID = VALID_TERMINAL_PAIR_1.arriving;

      const { duration } = await measureApiCall(() =>
        getTerminalCombo(testTripDate, departingTerminalID, arrivingTerminalID)
      );

      // Track performance
      trackPerformance("getTerminalCombo (performance test)", duration);

      // Performance should be under 10 seconds for E2E tests
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getTerminalComboVerbose", () => {
    it("should fetch terminal combo verbose successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getTerminalComboVerbose(testTripDate)
      );

      // Performance tracking
      trackPerformance("getTerminalComboVerbose", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // Validate first terminal combo verbose if available
      if (data.length > 0) {
        validateFaresTerminalComboVerbose(data[0]);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getTerminalComboVerbose(testTripDate)
      );

      // Track performance
      trackPerformance("getTerminalComboVerbose (performance test)", duration);

      // Performance should be under 10 seconds for E2E tests
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle different trip dates", async () => {
      // Use a different valid date from the range
      const validDateRange = await getFaresValidDateRange();
      const futureDate = new Date(validDateRange.DateThru);
      const { data, duration } = await measureApiCall(() =>
        getTerminalComboVerbose(futureDate)
      );

      trackPerformance("getTerminalComboVerbose (future date)", duration);

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data.length > 0) {
        validateFaresTerminalComboVerbose(data[0]);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Data Consistency", () => {
    it("should return consistent terminal data across calls", async () => {
      const { data: firstCall } = await measureApiCall(() =>
        getFaresTerminals(testTripDate)
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: secondCall } = await measureApiCall(() =>
        getFaresTerminals(testTripDate)
      );

      // Both calls should return arrays
      if (firstCall && secondCall) {
        expect(Array.isArray(firstCall)).toBe(true);
        expect(Array.isArray(secondCall)).toBe(true);

        // Should have same number of terminals
        expect(firstCall.length).toBe(secondCall.length);

        // First terminal should be the same
        if (firstCall.length > 0 && secondCall.length > 0) {
          expect(firstCall[0].TerminalID).toBe(secondCall[0].TerminalID);
          expect(firstCall[0].Description).toBe(secondCall[0].Description);
        }
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid terminal IDs", async () => {
      const { data } = await measureApiCall(() =>
        getFaresTerminals(testTripDate)
      );

      if (data && data.length > 0) {
        // All terminals should have valid IDs
        data.forEach((terminal) => {
          expect(terminal.TerminalID).toBeGreaterThan(0);
          expect(typeof terminal.TerminalID).toBe("number");
        });
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have unique terminal IDs", async () => {
      const { data } = await measureApiCall(() =>
        getFaresTerminals(testTripDate)
      );

      if (data && data.length > 0) {
        const terminalIDs = data.map((terminal) => terminal.TerminalID);
        const uniqueIDs = new Set(terminalIDs);

        // All terminal IDs should be unique
        expect(uniqueIDs.size).toBe(terminalIDs.length);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Error Scenarios", () => {
    it("should handle invalid terminal IDs gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getFaresTerminalMates(testTripDate, INVALID_TERMINAL_ID)
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(10000);

        // Should either return empty array or throw error, not hang
        if (data) {
          expect(Array.isArray(data)).toBe(true);
        }
      } catch (error) {
        // Should throw WsdApiError for invalid terminal ID
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid terminal combinations gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getTerminalCombo(
            testTripDate,
            INVALID_TERMINAL_ID,
            INVALID_TERMINAL_ID
          )
        );

        // Should complete within reasonable time
        expect(duration).toBeLessThan(10000);

        // Should either return empty array or throw error, not hang
        if (data) {
          expect(Array.isArray(data)).toBe(true);
        }
      } catch (error) {
        // Should throw WsdApiError for invalid terminal combination
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
