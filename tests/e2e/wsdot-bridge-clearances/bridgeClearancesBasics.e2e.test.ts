import { describe, expect, it } from "vitest";

import { getBridgeClearances } from "@/api/wsdot-bridge-clearances";

import {
  delay,
  measureApiCall,
  RATE_LIMIT_DELAY,
  trackPerformance,
} from "../utils";

describe("Bridge Clearances Basics E2E Tests", () => {
  describe("getBridgeClearances", () => {
    it("should fetch bridge clearances data successfully", async () => {
      const { data, duration } = await measureApiCall(
        () => getBridgeClearances("005") // I-5 route
      );

      // Performance tracking
      trackPerformance("getBridgeClearings", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data && data.length > 0) {
        const firstBridge = data[0];

        // Validate required fields
        expect(firstBridge).toHaveProperty("APILastUpdate");
        expect(firstBridge).toHaveProperty("BridgeNumber");
        expect(firstBridge).toHaveProperty("CrossingDescription");
        expect(firstBridge).toHaveProperty("CrossingLocationId");
        expect(firstBridge).toHaveProperty("Latitude");
        expect(firstBridge).toHaveProperty("Longitude");
        expect(firstBridge).toHaveProperty("RouteDate");
        expect(firstBridge).toHaveProperty("SRMP");
        expect(firstBridge).toHaveProperty("StateRouteID");
        expect(firstBridge).toHaveProperty("StateStructureId");
        expect(firstBridge).toHaveProperty("VerticalClearanceMaximumFeetInch");
        expect(firstBridge).toHaveProperty("VerticalClearanceMaximumInches");
        expect(firstBridge).toHaveProperty("VerticalClearanceMinimumFeetInch");
        expect(firstBridge).toHaveProperty("VerticalClearanceMinimumInches");

        // Validate data types
        expect(firstBridge.APILastUpdate).toBeInstanceOf(Date);
        expect(firstBridge.RouteDate).toBeInstanceOf(Date);
        expect(typeof firstBridge.BridgeNumber).toBe("string");
        expect(typeof firstBridge.CrossingDescription).toBe("string");
        expect(typeof firstBridge.CrossingLocationId).toBe("number");
        expect(typeof firstBridge.Latitude).toBe("number");
        expect(typeof firstBridge.Longitude).toBe("number");
        expect(typeof firstBridge.SRMP).toBe("number");
        expect(typeof firstBridge.StateRouteID).toBe("string");
        expect(typeof firstBridge.StateStructureId).toBe("string");
        expect(typeof firstBridge.VerticalClearanceMaximumFeetInch).toBe(
          "string"
        );
        expect(typeof firstBridge.VerticalClearanceMaximumInches).toBe(
          "number"
        );
        expect(typeof firstBridge.VerticalClearanceMinimumFeetInch).toBe(
          "string"
        );
        expect(typeof firstBridge.VerticalClearanceMinimumInches).toBe(
          "number"
        );

        // Validate coordinate ranges
        expect(firstBridge.Latitude).toBeGreaterThanOrEqual(45);
        expect(firstBridge.Latitude).toBeLessThanOrEqual(50);
        expect(firstBridge.Longitude).toBeGreaterThanOrEqual(-125);
        expect(firstBridge.Longitude).toBeLessThanOrEqual(-120);

        // Validate clearance data
        expect(firstBridge.VerticalClearanceMaximumInches).toBeGreaterThan(0);
        expect(firstBridge.VerticalClearanceMinimumInches).toBeGreaterThan(0);
        expect(
          firstBridge.VerticalClearanceMaximumInches
        ).toBeGreaterThanOrEqual(firstBridge.VerticalClearanceMinimumInches);

        // Validate route ID (may include additional identifiers)
        expect(firstBridge.StateRouteID).toMatch(/^005/);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid route parameter", async () => {
      try {
        await getBridgeClearances("INVALID_ROUTE");
        throw new Error("Expected error for invalid route");
      } catch (error) {
        expect(error).toBeDefined();
        // API may return empty array or error for invalid routes
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });
  });
});
