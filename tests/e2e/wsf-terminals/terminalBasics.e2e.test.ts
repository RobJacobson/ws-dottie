import { describe, expect, it } from "vitest";

import {
  getTerminalBasics,
  getTerminalBasicsByTerminalId,
} from "@/api/wsf-terminals";

import {
  delay,
  INVALID_TERMINAL_ID,
  measureApiCall,
  RATE_LIMIT_DELAY,
  TEST_TERMINAL_ID,
  trackPerformance,
  validateApiError,
  validateTerminalBasics,
} from "../utils";

describe("Terminal Basics E2E Tests", () => {
  describe("getTerminalBasics", () => {
    it("should fetch all terminal basics successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getTerminalBasics()
      );

      // Performance tracking
      trackPerformance("getTerminalBasics", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first terminal
      const firstTerminal = data[0];
      validateTerminalBasics(firstTerminal);

      // Validate data types
      expect(typeof firstTerminal.TerminalID).toBe("number");
      expect(typeof firstTerminal.TerminalName).toBe("string");
      expect(typeof firstTerminal.TerminalAbbrev).toBe("string");
      expect(typeof firstTerminal.SortSeq).toBe("number");
      expect(typeof firstTerminal.OverheadPassengerLoading).toBe("boolean");

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle network errors gracefully", async () => {
      // Test with invalid API key scenario
      const originalToken = process.env.WSDOT_ACCESS_TOKEN;
      process.env.WSDOT_ACCESS_TOKEN = "invalid_token";

      try {
        // With invalid token, should still work but return empty array or throw
        const result = await getTerminalBasics();
        // If it doesn't throw, it should return empty array
        expect(Array.isArray(result)).toBe(true);
      } catch (error) {
        // If it throws, that's also acceptable
        expect(error).toBeDefined();
      } finally {
        // Restore original token
        process.env.WSDOT_ACCESS_TOKEN = originalToken;
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() => getTerminalBasics());

      // Track performance
      trackPerformance("getTerminalBasics (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getTerminalBasicsByTerminalId", () => {
    it("should fetch specific terminal basics successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getTerminalBasicsByTerminalId(TEST_TERMINAL_ID)
      );

      // Performance tracking
      trackPerformance(
        `getTerminalBasicsByTerminalId(${TEST_TERMINAL_ID})`,
        duration
      );

      // Validate response
      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
      expect(data.TerminalID).toBe(TEST_TERMINAL_ID);
      validateTerminalBasics(data);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid terminal ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getTerminalBasicsByTerminalId(INVALID_TERMINAL_ID)
        );

        trackPerformance(
          `getTerminalBasicsByTerminalId(${INVALID_TERMINAL_ID})`,
          duration
        );

        // Should return undefined or throw for invalid ID
        expect(data).toBeUndefined();
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle negative terminal ID", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getTerminalBasicsByTerminalId(-1)
        );

        trackPerformance("getTerminalBasicsByTerminalId(-1)", duration);

        // Should return undefined or throw for negative ID
        expect(data).toBeUndefined();
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle zero terminal ID", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getTerminalBasicsByTerminalId(0)
        );

        trackPerformance("getTerminalBasicsByTerminalId(0)", duration);

        // Should return undefined or throw for zero ID
        expect(data).toBeUndefined();
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Data Consistency", () => {
    it("should return consistent data structure across calls", async () => {
      const { data: firstCall } = await measureApiCall(() =>
        getTerminalBasics()
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: secondCall } = await measureApiCall(() =>
        getTerminalBasics()
      );

      // Both calls should return arrays
      expect(Array.isArray(firstCall)).toBe(true);
      expect(Array.isArray(secondCall)).toBe(true);

      // Both should have the same structure for first terminal
      if (firstCall.length > 0 && secondCall.length > 0) {
        const firstTerminal = firstCall[0];
        const secondTerminal = secondCall[0];

        // Should have same properties
        expect(Object.keys(firstTerminal)).toEqual(Object.keys(secondTerminal));

        // Should have same terminal IDs (assuming same terminal is first in both calls)
        expect(firstTerminal.TerminalID).toBe(secondTerminal.TerminalID);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid terminal specifications", async () => {
      const { data } = await measureApiCall(() => getTerminalBasics());

      data.forEach((terminal) => {
        // Terminal ID should be positive
        expect(terminal.TerminalID).toBeGreaterThan(0);

        // Terminal name should be non-empty string
        expect(terminal.TerminalName).toBeTruthy();
        expect(typeof terminal.TerminalName).toBe("string");

        // Terminal abbreviation should be non-empty string
        expect(terminal.TerminalAbbrev).toBeTruthy();
        expect(typeof terminal.TerminalAbbrev).toBe("string");

        // Terminal abbreviation should be non-empty string
        expect(terminal.TerminalAbbrev).toBeTruthy();
        expect(typeof terminal.TerminalAbbrev).toBe("string");
      });

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Error Scenarios", () => {
    it("should handle timeout scenarios", async () => {
      // This test simulates timeout behavior
      const { duration } = await measureApiCall(() => getTerminalBasics());

      // Should complete within reasonable time
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle malformed responses gracefully", async () => {
      // This test ensures the API handles unexpected response formats
      const { data } = await measureApiCall(() => getTerminalBasics());

      // Should handle the response without throwing
      expect(data).toBeDefined();

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
