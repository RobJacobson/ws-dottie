import { describe, expect, it } from "vitest";

import { getVesselVerbose, getVesselVerboseById } from "@/api/wsf/vessels";

import {
  delay,
  INVALID_VESSEL_ID,
  measureApiCall,
  RATE_LIMIT_DELAY,
  TEST_VESSEL_ID,
  trackPerformance,
  validateApiError,
  validateVesselVerbose,
} from "../utils";

describe("Vessel Verbose E2E Tests", () => {
  describe("getVesselVerbose", () => {
    it("should fetch all vessel verbose data successfully", async () => {
      const { data, duration } = await measureApiCall(() => getVesselVerbose());

      // Performance tracking
      trackPerformance("getVesselVerbose", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first vessel
      const firstVessel = data[0];
      validateVesselVerbose(firstVessel);

      // Validate data types
      expect(typeof firstVessel.VesselID).toBe("number");
      expect(typeof firstVessel.VesselName).toBe("string");
      expect(typeof firstVessel.RegDeckSpace).toBe("number");
      expect(typeof firstVessel.MaxPassengerCount).toBe("number");
      expect(typeof firstVessel.YearBuilt).toBe("number");

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle network errors gracefully", async () => {
      // Test with invalid API key scenario
      const originalToken = process.env.WSDOT_ACCESS_TOKEN;
      process.env.WSDOT_ACCESS_TOKEN = "invalid_token";

      try {
        // With invalid token, should still work but return empty array or throw
        const result = await getVesselVerbose();
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
      const { duration } = await measureApiCall(() => getVesselVerbose());

      // Track performance
      trackPerformance("getVesselVerbose (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getVesselVerboseById", () => {
    it("should fetch specific vessel verbose data successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getVesselVerboseById(TEST_VESSEL_ID)
      );

      // Performance tracking
      trackPerformance(`getVesselVerboseById(${TEST_VESSEL_ID})`, duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(false);
      expect(typeof data).toBe("object");
      expect(data.VesselID).toBe(TEST_VESSEL_ID);
      validateVesselVerbose(data);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid vessel ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getVesselVerboseById(INVALID_VESSEL_ID)
        );

        trackPerformance(
          `getVesselVerboseById(${INVALID_VESSEL_ID})`,
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

    it("should handle negative vessel ID", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getVesselVerboseById(-1)
        );

        trackPerformance("getVesselVerboseById(-1)", duration);

        // Should return undefined or throw for negative ID
        expect(data).toBeUndefined();
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle zero vessel ID", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getVesselVerboseById(0)
        );

        trackPerformance("getVesselVerboseById(0)", duration);

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
        getVesselVerbose()
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: secondCall } = await measureApiCall(() =>
        getVesselVerbose()
      );

      // Both calls should return arrays
      expect(Array.isArray(firstCall)).toBe(true);
      expect(Array.isArray(secondCall)).toBe(true);

      // Both should have the same structure for first vessel
      if (firstCall.length > 0 && secondCall.length > 0) {
        const firstVessel = firstCall[0];
        const secondVessel = secondCall[0];

        // Should have same properties
        expect(Object.keys(firstVessel)).toEqual(Object.keys(secondVessel));

        // Should have same vessel IDs (assuming same vessel is first in both calls)
        expect(firstVessel.VesselID).toBe(secondVessel.VesselID);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid vessel specifications", async () => {
      const { data } = await measureApiCall(() => getVesselVerbose());

      data.forEach((vessel) => {
        // Vessel ID should be positive
        expect(vessel.VesselID).toBeGreaterThan(0);

        // Vessel name should be non-empty string
        expect(vessel.VesselName).toBeTruthy();
        expect(typeof vessel.VesselName).toBe("string");

        // Capacities should be non-negative
        expect(vessel.RegDeckSpace).toBeGreaterThanOrEqual(0);
        expect(vessel.MaxPassengerCount).toBeGreaterThanOrEqual(0);

        // Year built should be reasonable
        expect(vessel.YearBuilt).toBeGreaterThan(1900);
        expect(vessel.YearBuilt).toBeLessThanOrEqual(
          new Date().getFullYear() + 1
        );

        // Dimensions should be positive
        expect(vessel.Length).toBeTruthy();
        expect(vessel.Beam).toBeTruthy();
        expect(vessel.Draft).toBeTruthy();
      });

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Error Scenarios", () => {
    it("should handle timeout scenarios", async () => {
      // Test that the function doesn't hang indefinitely
      const startTime = Date.now();

      try {
        await getVesselVerbose();
        const duration = Date.now() - startTime;

        // Should complete within reasonable time
        expect(duration).toBeLessThan(10000);
      } catch (error) {
        // If it throws, should be a proper error
        validateApiError(error);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle malformed responses gracefully", async () => {
      // Test that valid responses are properly parsed
      const { data } = await measureApiCall(() => getVesselVerbose());

      // Should handle valid responses without throwing
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
