import { describe, expect, it } from "vitest";

import { getVesselStats, getVesselStatsById } from "@/api/wsf/vessels";

import {
  delay,
  INVALID_VESSEL_ID,
  measureApiCall,
  RATE_LIMIT_DELAY,
  TEST_VESSEL_ID,
  trackPerformance,
  validateApiError,
  validateVesselStats,
} from "../utils";

describe("Vessel Stats E2E Tests", () => {
  describe("getVesselStats", () => {
    it("should fetch all vessel stats successfully", async () => {
      const { data, duration } = await measureApiCall(() => getVesselStats());

      // Performance tracking
      trackPerformance("getVesselStats", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first vessel stat
      const firstStat = data[0];
      validateVesselStats(firstStat);

      // Validate data types
      expect(typeof firstStat.VesselID).toBe("number");
      expect(typeof firstStat.StatID).toBe("number");
      expect(typeof firstStat.StatName).toBe("string");
      expect(typeof firstStat.StatValue).toBe("string");
      expect(typeof firstStat.StatUnit).toBe("string");
      expect(typeof firstStat.IsActive).toBe("boolean");

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle network errors gracefully", async () => {
      // Test with invalid API key scenario
      const originalToken = process.env.WSDOT_ACCESS_TOKEN;
      process.env.WSDOT_ACCESS_TOKEN = "invalid_token";

      try {
        // With invalid token, should still work but return empty array or throw
        const result = await getVesselStats();
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
      const { duration } = await measureApiCall(() => getVesselStats());

      // Track performance
      trackPerformance("getVesselStats (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getVesselStatsById", () => {
    it("should fetch specific vessel stats successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getVesselStatsById(TEST_VESSEL_ID)
      );

      // Performance tracking
      trackPerformance(`getVesselStatsById(${TEST_VESSEL_ID})`, duration);

      // Validate response
      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
      expect(data.VesselID).toBe(TEST_VESSEL_ID);
      validateVesselStats(data);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid vessel ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getVesselStatsById(INVALID_VESSEL_ID)
        );

        trackPerformance(`getVesselStatsById(${INVALID_VESSEL_ID})`, duration);

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
          getVesselStatsById(-1)
        );

        trackPerformance("getVesselStatsById(-1)", duration);

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
          getVesselStatsById(0)
        );

        trackPerformance("getVesselStatsById(0)", duration);

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
      const { data: firstCall } = await measureApiCall(() => getVesselStats());
      await delay(RATE_LIMIT_DELAY);

      const { data: secondCall } = await measureApiCall(() => getVesselStats());

      // Both calls should return arrays
      expect(Array.isArray(firstCall)).toBe(true);
      expect(Array.isArray(secondCall)).toBe(true);

      // Both should have the same structure for first stat
      if (firstCall.length > 0 && secondCall.length > 0) {
        const firstStat = firstCall[0];
        const secondStat = secondCall[0];

        // Should have same properties
        expect(Object.keys(firstStat)).toEqual(Object.keys(secondStat));

        // Should have same vessel IDs (assuming same vessel is first in both calls)
        expect(firstStat.VesselID).toBe(secondStat.VesselID);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid stat data", async () => {
      const { data } = await measureApiCall(() => getVesselStats());

      data.forEach((stat) => {
        // Vessel ID should be positive
        expect(stat.VesselID).toBeGreaterThan(0);

        // Stat ID should be positive
        expect(stat.StatID).toBeGreaterThan(0);

        // Stat name should be non-empty string
        expect(stat.StatName).toBeTruthy();
        expect(typeof stat.StatName).toBe("string");

        // Stat value should be a string
        expect(typeof stat.StatValue).toBe("string");

        // Stat unit should be a string
        expect(typeof stat.StatUnit).toBe("string");

        // IsActive should be a boolean
        expect(typeof stat.IsActive).toBe("boolean");
      });

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have unique stat IDs per vessel", async () => {
      const { data } = await measureApiCall(() => getVesselStats());

      // Group stats by vessel ID
      const statsByVessel = new Map<number, number[]>();
      data.forEach((stat) => {
        if (!statsByVessel.has(stat.VesselID)) {
          statsByVessel.set(stat.VesselID, []);
        }
        statsByVessel.get(stat.VesselID)?.push(stat.StatID);
      });

      // Each vessel should have unique stat IDs
      statsByVessel.forEach((statIds, _vesselId) => {
        const uniqueStatIds = new Set(statIds);
        expect(uniqueStatIds.size).toBe(statIds.length);
      });

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Cross-Reference Validation", () => {
    it("should have consistent vessel data between stats and basics", async () => {
      const { data: stats } = await measureApiCall(() => getVesselStats());
      await delay(RATE_LIMIT_DELAY);

      // Get the first vessel's basic data
      if (stats.length > 0) {
        const firstStat = stats[0];
        const { data: basic } = await measureApiCall(() =>
          getVesselStatsById(firstStat.VesselID)
        );

        // Stat data should be valid
        expect(basic.VesselID).toBe(firstStat.VesselID);
        expect(basic.StatID).toBeGreaterThan(0);
        expect(basic.StatName).toBeTruthy();
        expect(basic.StatValue).toBeTruthy();
        expect(basic.StatUnit).toBeTruthy();
        expect(typeof basic.IsActive).toBe("boolean");
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
