import { describe, expect, it } from "vitest";

import {
  getTerminalSailingSpace,
  getTerminalSailingSpaceByTerminalId,
} from "@/api/wsf-terminals";

import {
  delay,
  INVALID_TERMINAL_ID,
  measureApiCall,
  RATE_LIMIT_DELAY,
  TEST_TERMINAL_ID,
  trackPerformance,
  validateApiError,
  validateTerminalSailingSpace,
} from "../utils";

describe("Terminal Sailing Space E2E Tests", () => {
  it("should fetch all terminal sailing space successfully", async () => {
    const { data, duration } = await measureApiCall(() =>
      getTerminalSailingSpace()
    );
    trackPerformance("getTerminalSailingSpace", duration);
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    validateTerminalSailingSpace(data[0]);
    await delay(RATE_LIMIT_DELAY);
  });

  it("should fetch sailing space by terminalId", async () => {
    const { data, duration } = await measureApiCall(() =>
      getTerminalSailingSpaceByTerminalId(TEST_TERMINAL_ID)
    );
    trackPerformance(
      `getTerminalSailingSpaceByTerminalId(${TEST_TERMINAL_ID})`,
      duration
    );
    expect(data).toBeDefined();
    expect(typeof data).toBe("object");
    expect(data.TerminalID).toBe(TEST_TERMINAL_ID);
    validateTerminalSailingSpace(data);
    await delay(RATE_LIMIT_DELAY);
  });

  it("should handle invalid terminalId gracefully", async () => {
    try {
      const { data, duration } = await measureApiCall(() =>
        getTerminalSailingSpaceByTerminalId(INVALID_TERMINAL_ID)
      );
      trackPerformance(
        `getTerminalSailingSpaceByTerminalId(${INVALID_TERMINAL_ID})`,
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
        getTerminalSailingSpaceByTerminalId(-1)
      );
      trackPerformance("getTerminalSailingSpaceByTerminalId(-1)", duration);
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
        getTerminalSailingSpaceByTerminalId(0)
      );
      trackPerformance("getTerminalSailingSpaceByTerminalId(0)", duration);
      // Should return undefined or throw for zero ID
      expect(data).toBeUndefined();
    } catch (error) {
      // Or should throw an error
      validateApiError(error);
    }
    await delay(RATE_LIMIT_DELAY);
  });
});
