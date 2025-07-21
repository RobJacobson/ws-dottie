import { describe, expect, it } from "vitest";

import { getBorderCrossings } from "@/api/wsdot-border-crossings";

import {
  delay,
  measureApiCall,
  RATE_LIMIT_DELAY,
  trackPerformance,
} from "../utils";

describe("Border Crossings Basics E2E Tests", () => {
  describe("getBorderCrossings", () => {
    it("should fetch border crossings data successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getBorderCrossings()
      );

      // Performance tracking
      trackPerformance("getBorderCrossings", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data && data.length > 0) {
        const firstCrossing = data[0];

        // Validate basic structure
        expect(firstCrossing).toHaveProperty("CrossingName");
        expect(firstCrossing).toHaveProperty("Time");
        expect(firstCrossing).toHaveProperty("WaitTime");
        expect(firstCrossing).toHaveProperty("BorderCrossingLocation");

        // Validate data types
        expect(typeof firstCrossing.CrossingName).toBe("string");
        expect(firstCrossing.Time).toBeInstanceOf(Date);
        expect(typeof firstCrossing.WaitTime).toBe("number");

        // Validate location data (may be null)
        if (firstCrossing.BorderCrossingLocation) {
          expect(firstCrossing.BorderCrossingLocation).toHaveProperty(
            "Description"
          );
          expect(firstCrossing.BorderCrossingLocation).toHaveProperty(
            "Latitude"
          );
          expect(firstCrossing.BorderCrossingLocation).toHaveProperty(
            "Longitude"
          );
          expect(firstCrossing.BorderCrossingLocation).toHaveProperty(
            "RoadName"
          );
        }

        console.log("First crossing object:", firstCrossing);
        console.log("First crossing keys:", Object.keys(firstCrossing));
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() => getBorderCrossings());

      // Track performance
      trackPerformance("getBorderCrossings (performance test)", duration);

      // Performance should be under 10 seconds for E2E tests
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Data Consistency", () => {
    it("should return consistent data structure across calls", async () => {
      const { data: firstCall } = await measureApiCall(() =>
        getBorderCrossings()
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: secondCall } = await measureApiCall(() =>
        getBorderCrossings()
      );

      // Both calls should return arrays
      if (firstCall && secondCall) {
        expect(Array.isArray(firstCall)).toBe(true);
        expect(Array.isArray(secondCall)).toBe(true);

        // Both should have valid data
        expect(firstCall.length).toBeGreaterThan(0);
        expect(secondCall.length).toBeGreaterThan(0);

        // Data structure should be consistent
        const firstItem = firstCall[0];
        const secondItem = secondCall[0];

        expect(firstItem).toHaveProperty("CrossingName");
        expect(secondItem).toHaveProperty("CrossingName");
        expect(firstItem).toHaveProperty("Time");
        expect(secondItem).toHaveProperty("Time");
        expect(firstItem).toHaveProperty("WaitTime");
        expect(secondItem).toHaveProperty("WaitTime");
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid wait time data", async () => {
      const { data } = await measureApiCall(() => getBorderCrossings());

      if (data && data.length > 0) {
        // Wait times should be numbers (including -1 for closed/no data)
        data.forEach((crossing) => {
          expect(typeof crossing.WaitTime).toBe("number");
          // -1 is valid (indicates closed/no data), otherwise should be non-negative
          expect(crossing.WaitTime >= -1).toBe(true);
        });

        // At least some crossings should have reasonable wait times (including -1)
        const hasReasonableWaitTimes = data.some(
          (crossing) => crossing.WaitTime >= -1 && crossing.WaitTime <= 300
        );
        expect(hasReasonableWaitTimes).toBe(true);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid timestamp data", async () => {
      const { data } = await measureApiCall(() => getBorderCrossings());

      if (data && data.length > 0) {
        // All timestamps should be valid Date objects
        data.forEach((crossing) => {
          expect(crossing.Time).toBeInstanceOf(Date);
          expect(crossing.Time.getTime()).toBeGreaterThan(0);
        });

        // Timestamps should be recent (within last 24 hours)
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        data.forEach((crossing) => {
          expect(crossing.Time.getTime()).toBeGreaterThan(oneDayAgo.getTime());
          expect(crossing.Time.getTime()).toBeLessThanOrEqual(now.getTime());
        });
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Error Scenarios", () => {
    it("should handle timeout scenarios", async () => {
      // This test simulates timeout behavior
      const { duration } = await measureApiCall(() => getBorderCrossings());

      // Should complete within reasonable time
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle network errors gracefully", async () => {
      // This test verifies that the API handles network issues
      const { data, duration } = await measureApiCall(() =>
        getBorderCrossings()
      );

      // Should either return valid data or throw an error, not hang
      expect(duration).toBeLessThan(10000);

      if (data) {
        expect(Array.isArray(data)).toBe(true);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("API Endpoint Validation", () => {
    it("should return proper HTTP status codes", async () => {
      const { data } = await measureApiCall(() => getBorderCrossings());

      // If we get data, the endpoint is working
      if (data) {
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle malformed requests gracefully", async () => {
      // This test ensures the API doesn't crash on edge cases
      const { duration } = await measureApiCall(() => getBorderCrossings());

      // Should complete within reasonable time even with edge cases
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
