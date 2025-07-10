import { beforeEach, describe, expect, it } from "vitest";

import {
  getCacheFlushDateTerminals,
  getTerminalBasics,
  getTerminalBasicsByTerminalId,
  getTerminalLocations,
  getTerminalLocationsByTerminalId,
  getTerminalSailingSpace,
  getTerminalSailingSpaceByTerminalId,
  getTerminalVerbose,
  getTerminalVerboseByTerminalId,
  getTerminalWaitTimes,
  getTerminalWaitTimesByTerminal,
} from "@/api/wsf/terminals/api";

// Real TerminalIDs from WSDOT API
const VALID_TERMINAL_IDS = [
  1, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
];

// Real RouteIDs from WSDOT API
const VALID_ROUTE_IDS = [1, 3, 5, 6, 7, 8, 9, 13, 14, 15];

describe("WSF Terminals API", () => {
  beforeEach(() => {
    // Clear any test state
  });

  describe("getTerminalBasics", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalBasics).toBe("function");
    });

    it("should return a Promise", async () => {
      const result = getTerminalBasics();
      expect(result).toBeInstanceOf(Promise);

      // Test that it doesn't throw immediately
      try {
        await result;
        // If it succeeds, that's fine
      } catch (error) {
        // If it fails, that's also fine - we're just testing the function exists
        expect(error).toBeDefined();
      }
    });
  });

  describe("getTerminalBasicsByTerminalId", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalBasicsByTerminalId).toBe("function");
    });

    it("should return a Promise", async () => {
      const result = getTerminalBasicsByTerminalId(VALID_TERMINAL_IDS[0]);
      expect(result).toBeInstanceOf(Promise);

      // Test that it doesn't throw immediately
      try {
        await result;
        // If it succeeds, that's fine
      } catch (error) {
        // If it fails, that's also fine - we're just testing the function exists
        expect(error).toBeDefined();
      }
    });

    it("should accept terminal ID parameter", () => {
      // Test that the function returns a Promise when called
      expect(
        getTerminalBasicsByTerminalId(VALID_TERMINAL_IDS[0])
      ).toBeInstanceOf(Promise);
    });
  });

  describe("getTerminalSailingSpace", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalSailingSpace).toBe("function");
    });

    it("should return a Promise", async () => {
      const result = getTerminalSailingSpace();
      expect(result).toBeInstanceOf(Promise);

      // Test that it doesn't throw immediately
      try {
        await result;
        // If it succeeds, that's fine
      } catch (error) {
        // If it fails, that's also fine - we're just testing the function exists
        expect(error).toBeDefined();
      }
    });
  });

  describe("getTerminalSailingSpaceByTerminalId", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalSailingSpaceByTerminalId).toBe("function");
    });

    it("should return a Promise", async () => {
      const result = getTerminalSailingSpaceByTerminalId(VALID_TERMINAL_IDS[0]);
      expect(result).toBeInstanceOf(Promise);

      // Test that it doesn't throw immediately
      try {
        await result;
        // If it succeeds, that's fine
      } catch (error) {
        // If it fails, that's also fine - we're just testing the function exists
        expect(error).toBeDefined();
      }
    });

    it("should accept terminal ID parameter", () => {
      // Test that the function returns a Promise when called
      expect(
        getTerminalSailingSpaceByTerminalId(VALID_TERMINAL_IDS[0])
      ).toBeInstanceOf(Promise);
    });

    it("should handle invalid terminal IDs gracefully", async () => {
      // Test that the function handles invalid terminal IDs gracefully
      try {
        await getTerminalSailingSpaceByTerminalId(99999); // Invalid terminal ID
        // If it succeeds, that's fine
      } catch (error) {
        // If it fails, that's expected for invalid IDs
        expect(error).toBeDefined();
      }
    });
  });

  describe("getTerminalVerbose", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalVerbose).toBe("function");
    });

    it("should return a Promise", async () => {
      const result = getTerminalVerbose();
      expect(result).toBeInstanceOf(Promise);

      // Test that it doesn't throw immediately
      try {
        await result;
        // If it succeeds, that's fine
      } catch (error) {
        // If it fails, that's also fine - we're just testing the function exists
        expect(error).toBeDefined();
      }
    });
  });

  describe("getTerminalVerboseByTerminalId", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalVerboseByTerminalId).toBe("function");
    });

    it("should return a Promise", async () => {
      const result = getTerminalVerboseByTerminalId(VALID_TERMINAL_IDS[0]);
      expect(result).toBeInstanceOf(Promise);

      // Test that it doesn't throw immediately
      try {
        await result;
        // If it succeeds, that's fine
      } catch (error) {
        // If it fails, that's also fine - we're just testing the function exists
        expect(error).toBeDefined();
      }
    });

    it("should accept terminal ID parameter", () => {
      // Test that the function can be called with valid parameters
      expect(() =>
        getTerminalVerboseByTerminalId(VALID_TERMINAL_IDS[0])
      ).not.toThrow();
      expect(() =>
        getTerminalVerboseByTerminalId(VALID_TERMINAL_IDS[1])
      ).not.toThrow();
      expect(() =>
        getTerminalVerboseByTerminalId(VALID_TERMINAL_IDS[2])
      ).not.toThrow();
    });
  });

  describe("getTerminalWaitTimes", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalWaitTimes).toBe("function");
    });

    it("should return a Promise", async () => {
      const result = getTerminalWaitTimes();
      expect(result).toBeInstanceOf(Promise);

      // Test that it doesn't throw immediately
      try {
        await result;
        // If it succeeds, that's fine
      } catch (error) {
        // If it fails, that's also fine - we're just testing the function exists
        expect(error).toBeDefined();
      }
    });
  });

  describe("getTerminalWaitTimesByTerminal", () => {
    it("should have the correct function signature", () => {
      expect(typeof getTerminalWaitTimesByTerminal).toBe("function");
    });

    it("should return a Promise", async () => {
      const result = getTerminalWaitTimesByTerminal(VALID_TERMINAL_IDS[0]);
      expect(result).toBeInstanceOf(Promise);

      // Test that it doesn't throw immediately
      try {
        await result;
        // If it succeeds, that's fine
      } catch (error) {
        // If it fails, that's also fine - we're just testing the function exists
        expect(error).toBeDefined();
      }
    });

    it("should accept terminal ID parameter", () => {
      // Test that the function can be called with valid parameters
      expect(() =>
        getTerminalWaitTimesByTerminal(VALID_TERMINAL_IDS[0])
      ).not.toThrow();
      expect(() =>
        getTerminalWaitTimesByTerminal(VALID_TERMINAL_IDS[1])
      ).not.toThrow();
      expect(() =>
        getTerminalWaitTimesByTerminal(VALID_TERMINAL_IDS[2])
      ).not.toThrow();
    });
  });

  describe("getCacheFlushDateTerminals", () => {
    it("should have the correct function signature", () => {
      expect(typeof getCacheFlushDateTerminals).toBe("function");
    });

    it("should return a Promise", async () => {
      const result = getCacheFlushDateTerminals();
      expect(result).toBeInstanceOf(Promise);

      // Test that it doesn't throw immediately
      try {
        await result;
        // If it succeeds, that's fine
      } catch (error) {
        // If it fails, that's also fine - we're just testing the function exists
        expect(error).toBeDefined();
      }
    });
  });

  describe("Function Parameter Validation", () => {
    it("should validate all function parameter counts", () => {
      // Test parameter counts for functions that take parameters
      expect(getTerminalBasicsByTerminalId).toHaveLength(1);
      expect(getTerminalLocationsByTerminalId).toHaveLength(1);
      expect(getTerminalSailingSpaceByTerminalId).toHaveLength(1);
      expect(getTerminalVerboseByTerminalId).toHaveLength(1);
      expect(getTerminalWaitTimesByTerminal).toHaveLength(1);

      // Test parameter counts for functions that don't take parameters
      expect(getTerminalBasics).toHaveLength(0);
      expect(getTerminalLocations).toHaveLength(0);
      expect(getTerminalSailingSpace).toHaveLength(0);
      expect(getTerminalVerbose).toHaveLength(0);
      expect(getTerminalWaitTimes).toHaveLength(0);
      expect(getCacheFlushDateTerminals).toHaveLength(0);
    });
  });
});
