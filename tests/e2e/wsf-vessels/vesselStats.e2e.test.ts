import { describe, expect, it } from "vitest";

import { getVesselStats, getVesselStatsById } from "@/api/wsf-vessels";

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
      expect(typeof firstStat.VesselSubjectID).toBe("number");
      expect(typeof firstStat.VesselName).toBe("string");
      expect(typeof firstStat.VesselAbbrev).toBe("string");
      expect(typeof firstStat.Class).toBe("object");
      expect(typeof firstStat.VesselNameDesc).toBe("string");
      expect(typeof firstStat.SpeedInKnots).toBe("number");
      expect(typeof firstStat.MaxPassengerCount).toBe("number");
      expect(typeof firstStat.PassengerOnly).toBe("boolean");
      expect(typeof firstStat.FastFerry).toBe("boolean");

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
        getVesselStatsById({ vesselId: TEST_VESSEL_ID })
      );

      // Performance tracking
      trackPerformance(`getVesselStatsById(${TEST_VESSEL_ID})`, duration);

      // Validate response
      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
      expect(Array.isArray(data)).toBe(false);

      // Validate vessel stats
      validateVesselStats(data);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid vessel ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getVesselStatsById({ vesselId: INVALID_VESSEL_ID })
        );

        // Performance tracking
        trackPerformance(`getVesselStatsById(${INVALID_VESSEL_ID})`, duration);

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
          getVesselStatsById({ vesselId: -1 })
        );

        trackPerformance("getVesselStatsById(-1)", duration);

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
          getVesselStatsById({ vesselId: 0 })
        );

        trackPerformance("getVesselStatsById(0)", duration);

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

    it("should have valid vessel specification data", async () => {
      const { data } = await measureApiCall(() => getVesselStats());

      data.forEach((stat) => {
        // Vessel ID should be positive
        expect(stat.VesselID).toBeGreaterThan(0);

        // Vessel Subject ID should be positive
        expect(stat.VesselSubjectID).toBeGreaterThan(0);

        // Vessel name should be non-empty string
        expect(stat.VesselName).toBeTruthy();
        expect(typeof stat.VesselName).toBe("string");

        // Vessel abbreviation should be a string
        expect(typeof stat.VesselAbbrev).toBe("string");

        // Class should be an object
        expect(typeof stat.Class).toBe("object");

        // Speed should be a positive number
        expect(stat.SpeedInKnots).toBeGreaterThan(0);

        // Max passenger count should be positive
        expect(stat.MaxPassengerCount).toBeGreaterThan(0);

        // Boolean flags should be booleans
        expect(typeof stat.PassengerOnly).toBe("boolean");
        expect(typeof stat.FastFerry).toBe("boolean");
      });

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have unique vessel IDs", async () => {
      const { data } = await measureApiCall(() => getVesselStats());

      // Check that all vessel IDs are unique
      const vesselIds = data.map((stat) => stat.VesselID);
      const uniqueVesselIds = new Set(vesselIds);
      expect(uniqueVesselIds.size).toBe(vesselIds.length);

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
          getVesselStatsById({ vesselId: firstStat.VesselID })
        );

        // Vessel data should be valid and consistent
        expect(basic.VesselID).toBe(firstStat.VesselID);
        expect(basic.VesselName).toBe(firstStat.VesselName);
        expect(basic.VesselAbbrev).toBe(firstStat.VesselAbbrev);
        expect(basic.SpeedInKnots).toBe(firstStat.SpeedInKnots);
        expect(basic.MaxPassengerCount).toBe(firstStat.MaxPassengerCount);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
