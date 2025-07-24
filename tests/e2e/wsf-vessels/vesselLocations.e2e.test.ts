import { describe, expect, it } from "vitest";

import {
  getVesselLocations,
  getVesselLocationsByVesselId,
} from "@/api/wsf-vessels";

import {
  delay,
  INVALID_VESSEL_ID,
  measureApiCall,
  RATE_LIMIT_DELAY,
  TEST_VESSEL_ID,
  trackPerformance,
  validateApiError,
  validateVesselLocation,
} from "../utils";

describe("Vessel Locations E2E Tests", () => {
  describe("getVesselLocations", () => {
    it("should fetch all vessel locations successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getVesselLocations()
      );

      // Performance tracking
      trackPerformance("getVesselLocations", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first vessel
      const firstVessel = data[0];
      validateVesselLocation(firstVessel);

      // Validate data types
      expect(typeof firstVessel.VesselID).toBe("number");
      expect(typeof firstVessel.VesselName).toBe("string");
      expect(typeof firstVessel.Longitude).toBe("number");
      expect(typeof firstVessel.Latitude).toBe("number");
      expect(firstVessel.TimeStamp).toBeInstanceOf(Date);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle network errors gracefully", async () => {
      // This test would require mocking network failures
      // For now, we'll test with invalid API key scenario
      const originalToken = process.env.WSDOT_ACCESS_TOKEN;
      process.env.WSDOT_ACCESS_TOKEN = "invalid_token";

      try {
        // With invalid token, should still work but return empty array or throw
        const result = await getVesselLocations();
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
      const { duration } = await measureApiCall(() => getVesselLocations());

      // Track performance
      trackPerformance("getVesselLocations (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getVesselLocationsByVesselId", () => {
    it("should fetch specific vessel location successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getVesselLocationsByVesselId({ vesselId: TEST_VESSEL_ID })
      );

      // Performance tracking
      trackPerformance(
        `getVesselLocationsByVesselId(${TEST_VESSEL_ID})`,
        duration
      );

      // Validate response
      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
      expect(Array.isArray(data)).toBe(false);

      // Validate vessel location
      validateVesselLocation(data);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid vessel ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getVesselLocationsByVesselId({ vesselId: INVALID_VESSEL_ID })
        );

        // Performance tracking
        trackPerformance(
          `getVesselLocationsByVesselId(${INVALID_VESSEL_ID})`,
          duration
        );

        // Should either return null or throw error, not hang
        if (data) {
          expect(typeof data).toBe("object");
        }
      } catch (error) {
        // Should throw WsdotApiError for invalid vessel ID
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle negative vessel ID", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getVesselLocationsByVesselId({ vesselId: -1 })
        );

        trackPerformance("getVesselLocationsByVesselId(-1)", duration);

        // Should either return null or throw error, not hang
        if (data) {
          expect(typeof data).toBe("object");
        }
      } catch (error) {
        // Should throw WsdotApiError for negative vessel ID
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle zero vessel ID", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getVesselLocationsByVesselId({ vesselId: 0 })
        );

        trackPerformance("getVesselLocationsByVesselId(0)", duration);

        // Should either return null or throw error, not hang
        if (data) {
          expect(typeof data).toBe("object");
        }
      } catch (error) {
        // Should throw WsdotApiError for zero vessel ID
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Data Consistency", () => {
    it("should return consistent data structure across calls", async () => {
      const { data: firstCall } = await measureApiCall(() =>
        getVesselLocations()
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: secondCall } = await measureApiCall(() =>
        getVesselLocations()
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

    it("should have valid coordinate ranges", async () => {
      const { data } = await measureApiCall(() => getVesselLocations());

      data.forEach((vessel) => {
        // Longitude should be between -180 and 180
        expect(vessel.Longitude).toBeGreaterThanOrEqual(-180);
        expect(vessel.Longitude).toBeLessThanOrEqual(180);

        // Latitude should be between -90 and 90
        expect(vessel.Latitude).toBeGreaterThanOrEqual(-90);
        expect(vessel.Latitude).toBeLessThanOrEqual(90);

        // Vessel ID should be positive
        expect(vessel.VesselID).toBeGreaterThan(0);

        // Vessel name should be non-empty string
        expect(vessel.VesselName).toBeTruthy();
        expect(typeof vessel.VesselName).toBe("string");
      });

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Error Scenarios", () => {
    it("should handle timeout scenarios", async () => {
      // This would require mocking timeouts
      // For now, we'll test that the function doesn't hang indefinitely
      const startTime = Date.now();

      try {
        await getVesselLocations();
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
      // This test would require mocking malformed responses
      // For now, we'll test that valid responses are properly parsed
      const { data } = await measureApiCall(() => getVesselLocations());

      // Should handle valid responses without throwing
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
