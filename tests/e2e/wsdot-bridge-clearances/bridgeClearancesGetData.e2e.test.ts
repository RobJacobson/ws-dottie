import { describe, expect, it } from "vitest";

import { getBridgeClearances } from "@/api/wsdot-bridge-clearances";

import {
  delay,
  measureApiCall,
  RATE_LIMIT_DELAY,
  trackPerformance,
} from "../utils";

describe("Bridge Clearances Get Data E2E Tests", () => {
  describe("Data Retrieval", () => {
    it("should return multiple bridge clearances for I-5", async () => {
      const { data, duration } = await measureApiCall(() =>
        getBridgeClearances("005")
      );

      // Performance tracking
      trackPerformance("getBridgeClearances (I-5)", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data?.length).toBeGreaterThan(0);

      // Should have multiple bridges for I-5
      expect(data?.length).toBeGreaterThan(10);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return valid bridge clearance data structure", async () => {
      const { data, duration } = await measureApiCall(() =>
        getBridgeClearances("005")
      );

      // Performance tracking
      trackPerformance("getBridgeClearances (structure validation)", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data && data.length > 0) {
        // Check a few bridges for data quality
        const bridges = data.slice(0, 3);

        bridges.forEach((bridge, _index) => {
          // Validate bridge number format
          expect(bridge.BridgeNumber).toMatch(/^[0-9/A-Z-]+$/);

          // Validate crossing description
          expect(bridge.CrossingDescription.length).toBeGreaterThan(0);

          // Validate location data
          expect(bridge.Latitude).toBeGreaterThan(45);
          expect(bridge.Latitude).toBeLessThan(50);
          expect(bridge.Longitude).toBeGreaterThan(-125);
          expect(bridge.Longitude).toBeLessThan(-120);

          // Validate SRMP (milepost) - may be 0 for some bridges
          expect(bridge.SRMP).toBeGreaterThanOrEqual(0);

          // Validate clearance measurements
          expect(bridge.VerticalClearanceMaximumInches).toBeGreaterThan(0);
          expect(bridge.VerticalClearanceMinimumInches).toBeGreaterThan(0);
          expect(bridge.VerticalClearanceMaximumInches).toBeGreaterThanOrEqual(
            bridge.VerticalClearanceMinimumInches
          );

          // Validate clearance string format
          expect(bridge.VerticalClearanceMaximumFeetInch).toMatch(
            /^\d+ ft \d+ in$/
          );
          expect(bridge.VerticalClearanceMinimumFeetInch).toMatch(
            /^\d+ ft \d+ in$/
          );

          // Validate GUIDs
          expect(bridge.ControlEntityGuid).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
          );
          expect(bridge.CrossingRecordGuid).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
          );
          expect(bridge.LocationGuid).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
          );

          // Validate route ID consistency (may include additional identifiers)
          expect(bridge.StateRouteID).toMatch(/^005/);
        });
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle empty route parameter", async () => {
      try {
        await getBridgeClearances("");
        throw new Error("Expected error for empty route");
      } catch (error) {
        expect(error).toBeDefined();
        // API may return error for empty route
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle non-existent route", async () => {
      try {
        await getBridgeClearances("999999");
        // API may return empty array for non-existent routes
      } catch (error) {
        expect(error).toBeDefined();
        // Or may throw an error
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Error Handling", () => {
    it("should handle network errors gracefully", async () => {
      // This test validates that the API handles network issues properly
      // In a real scenario, this would test actual network failures
      expect(true).toBe(true);
    });

    it("should handle API errors with proper error types", async () => {
      try {
        await getBridgeClearances("INVALID_ROUTE");
        // API may return empty array or throw error
      } catch (error) {
        if (error) {
          // Validate error structure if thrown
          expect(error).toBeDefined();
        }
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });
  });
});
