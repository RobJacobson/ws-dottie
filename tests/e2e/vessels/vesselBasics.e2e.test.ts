import { describe, expect, it } from "vitest";

import { getVesselBasics, getVesselBasicsById } from "@/api/wsf/vessels";

import {
  delay,
  INVALID_VESSEL_ID,
  measureApiCall,
  RATE_LIMIT_DELAY,
  TEST_VESSEL_ID,
  trackPerformance,
  validateApiError,
  validateVesselBasic,
} from "../utils";

describe("Vessel Basics E2E Tests", () => {
  describe("getVesselBasics", () => {
    it("should fetch all vessel basics successfully", async () => {
      const { data, duration } = await measureApiCall(() => getVesselBasics());

      // Performance tracking
      trackPerformance("getVesselBasics", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first vessel
      const firstVessel = data[0];
      validateVesselBasic(firstVessel);

      // Validate data types
      expect(typeof firstVessel.VesselID).toBe("number");
      expect(typeof firstVessel.VesselName).toBe("string");
      expect(typeof firstVessel.VesselAbbrev).toBe("string");
      expect(typeof firstVessel.Status).toBe("number");
      expect(typeof firstVessel.OwnedByWSF).toBe("boolean");
      expect(typeof firstVessel.Class.ClassID).toBe("number");
      expect(typeof firstVessel.Class.ClassName).toBe("string");
      expect(typeof firstVessel.Class.PublicDisplayName).toBe("string");
      expect(typeof firstVessel.Class.SortSeq).toBe("number");

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle network errors gracefully", async () => {
      // Test with invalid API key scenario
      const originalToken = process.env.WSDOT_ACCESS_TOKEN;
      process.env.WSDOT_ACCESS_TOKEN = "invalid_token";

      try {
        // With invalid token, should still work but return empty array or throw
        const result = await getVesselBasics();
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
      const { duration } = await measureApiCall(() => getVesselBasics());

      // Track performance
      trackPerformance("getVesselBasics (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getVesselBasicsById", () => {
    it("should fetch specific vessel basics successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getVesselBasicsById(TEST_VESSEL_ID)
      );

      // Performance tracking
      trackPerformance(`getVesselBasicsById(${TEST_VESSEL_ID})`, duration);

      // Validate response
      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
      expect(data.VesselID).toBe(TEST_VESSEL_ID);
      validateVesselBasic(data);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid vessel ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getVesselBasicsById(INVALID_VESSEL_ID)
        );

        trackPerformance(`getVesselBasicsById(${INVALID_VESSEL_ID})`, duration);

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
          getVesselBasicsById(-1)
        );

        trackPerformance("getVesselBasicsById(-1)", duration);

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
          getVesselBasicsById(0)
        );

        trackPerformance("getVesselBasicsById(0)", duration);

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
      const { data: firstCall } = await measureApiCall(() => getVesselBasics());
      await delay(RATE_LIMIT_DELAY);

      const { data: secondCall } = await measureApiCall(() =>
        getVesselBasics()
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
      const { data } = await measureApiCall(() => getVesselBasics());

      data.forEach((vessel) => {
        // Vessel ID should be positive
        expect(vessel.VesselID).toBeGreaterThan(0);

        // Vessel name should be non-empty string
        expect(vessel.VesselName).toBeTruthy();
        expect(typeof vessel.VesselName).toBe("string");

        // Vessel abbreviation should be non-empty string
        expect(vessel.VesselAbbrev).toBeTruthy();
        expect(typeof vessel.VesselAbbrev).toBe("string");

        // Class information should be valid
        expect(vessel.Class.ClassID).toBeGreaterThan(0);
        expect(vessel.Class.ClassName).toBeTruthy();
        expect(vessel.Class.PublicDisplayName).toBeTruthy();

        // Status should be a number
        expect(typeof vessel.Status).toBe("number");

        // Owned by WSF should be a boolean
        expect(typeof vessel.OwnedByWSF).toBe("boolean");
      });

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have unique vessel IDs", async () => {
      const { data } = await measureApiCall(() => getVesselBasics());

      const vesselIds = data.map((vessel) => vessel.VesselID);
      const uniqueIds = new Set(vesselIds);

      // All vessel IDs should be unique
      expect(uniqueIds.size).toBe(vesselIds.length);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Cross-Reference Validation", () => {
    it("should have consistent vessel data between basics and verbose", async () => {
      const { data: basics } = await measureApiCall(() => getVesselBasics());
      await delay(RATE_LIMIT_DELAY);

      // Get the first vessel's verbose data
      if (basics.length > 0) {
        const firstVessel = basics[0];
        const { data: verbose } = await measureApiCall(() =>
          getVesselBasicsById(firstVessel.VesselID)
        );

        // Basic vessel data should match verbose data
        expect(verbose.VesselID).toBe(firstVessel.VesselID);
        expect(verbose.VesselName).toBe(firstVessel.VesselName);
        expect(verbose.VesselAbbrev).toBe(firstVessel.VesselAbbrev);
        expect(verbose.Class.ClassID).toBe(firstVessel.Class.ClassID);
        expect(verbose.Class.ClassName).toBe(firstVessel.Class.ClassName);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
