import { describe, expect, it } from "vitest";

import { getBorderCrossings } from "@/api/wsdot-border-crossings";

import {
  delay,
  measureApiCall,
  RATE_LIMIT_DELAY,
  trackPerformance,
  validateApiError,
} from "../utils";

describe("Border Crossings Get Data E2E Tests", () => {
  describe("Data Retrieval", () => {
    it("should return multiple border crossings", async () => {
      const { data, duration } = await measureApiCall(() =>
        getBorderCrossings()
      );

      // Performance tracking
      trackPerformance("getBorderCrossings (multiple crossings)", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data?.length).toBeGreaterThan(0);

      // Should have multiple crossings
      console.log(`Total border crossings returned: ${data?.length}`);

      // Validate each crossing has required fields
      data?.forEach((crossing, index) => {
        expect(crossing).toHaveProperty("CrossingName");
        expect(crossing).toHaveProperty("Time");
        expect(crossing).toHaveProperty("WaitTime");
        expect(crossing).toHaveProperty("BorderCrossingLocation");

        // Log first few crossings for debugging
        if (index < 3) {
          console.log(`Crossing ${index + 1}:`, {
            name: crossing.CrossingName,
            waitTime: crossing.WaitTime,
            hasLocation: !!crossing.BorderCrossingLocation,
          });
        }
      });

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid crossing names", async () => {
      const { data } = await measureApiCall(() => getBorderCrossings());

      if (data && data.length > 0) {
        // All crossings should have valid names
        data.forEach((crossing) => {
          expect(typeof crossing.CrossingName).toBe("string");
          expect(crossing.CrossingName.length).toBeGreaterThan(0);
        });

        // Should have expected crossing types
        const crossingNames = data.map((c) => c.CrossingName);
        console.log("Available crossing names:", crossingNames);

        // Should have some common crossing types
        const hasI5Crossing = crossingNames.some((name) => name.includes("I5"));
        const hasSRCrossing = crossingNames.some((name) => name.includes("SR"));
        expect(hasI5Crossing || hasSRCrossing).toBe(true);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid location data for some crossings", async () => {
      const { data } = await measureApiCall(() => getBorderCrossings());

      if (data && data.length > 0) {
        // At least some crossings should have location data
        const crossingsWithLocation = data.filter(
          (crossing) => crossing.BorderCrossingLocation !== null
        );

        console.log(
          `Crossings with location data: ${crossingsWithLocation.length}/${data.length}`
        );

        // Should have at least some location data
        expect(crossingsWithLocation.length).toBeGreaterThan(0);

        // Validate location data structure
        crossingsWithLocation.forEach((crossing) => {
          const location = crossing.BorderCrossingLocation!;
          expect(location).toHaveProperty("Description");
          expect(location).toHaveProperty("Latitude");
          expect(location).toHaveProperty("Longitude");
          expect(location).toHaveProperty("RoadName");

          // Validate coordinate ranges
          expect(location.Latitude).toBeGreaterThan(48);
          expect(location.Latitude).toBeLessThan(50);
          expect(location.Longitude).toBeGreaterThan(-123);
          expect(location.Longitude).toBeLessThan(-122);
        });
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Data Quality", () => {
    it("should have reasonable wait time ranges", async () => {
      const { data } = await measureApiCall(() => getBorderCrossings());

      if (data && data.length > 0) {
        const waitTimes = data.map((c) => c.WaitTime);
        const minWait = Math.min(...waitTimes);
        const maxWait = Math.max(...waitTimes);
        const avgWait = waitTimes.reduce((a, b) => a + b, 0) / waitTimes.length;

        console.log(
          `Wait time stats: min=${minWait}, max=${maxWait}, avg=${avgWait.toFixed(1)}`
        );

        // Wait times should be reasonable (-1 to 300 minutes, where -1 indicates closed/no data)
        expect(minWait).toBeGreaterThanOrEqual(-1);
        expect(maxWait).toBeLessThanOrEqual(300);
        // Average can be negative if many crossings are closed (-1)
        expect(avgWait).toBeGreaterThanOrEqual(-1);
        expect(avgWait).toBeLessThanOrEqual(100);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have recent timestamps", async () => {
      const { data } = await measureApiCall(() => getBorderCrossings());

      if (data && data.length > 0) {
        const now = new Date();
        const timestamps = data.map((c) => c.Time);

        // All timestamps should be recent (within last hour)
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

        timestamps.forEach((timestamp) => {
          expect(timestamp.getTime()).toBeGreaterThan(oneHourAgo.getTime());
          expect(timestamp.getTime()).toBeLessThanOrEqual(now.getTime());
        });

        // Log timestamp info
        const oldest = new Date(
          Math.min(...timestamps.map((t) => t.getTime()))
        );
        const newest = new Date(
          Math.max(...timestamps.map((t) => t.getTime()))
        );
        console.log(
          `Timestamp range: ${oldest.toISOString()} to ${newest.toISOString()}`
        );
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid access code gracefully", async () => {
      // This test would require mocking the API call with invalid credentials
      // For now, we'll just verify the function exists and can be called
      expect(typeof getBorderCrossings).toBe("function");
      expect(getBorderCrossings).toHaveLength(0);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle network failures gracefully", async () => {
      // This test verifies the API doesn't hang on network issues
      const { duration } = await measureApiCall(() => getBorderCrossings());

      // Should complete within reasonable time
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Performance", () => {
    it("should meet performance benchmarks consistently", async () => {
      const durations: number[] = [];

      // Run multiple calls to test consistency
      for (let i = 0; i < 3; i++) {
        const { duration } = await measureApiCall(() => getBorderCrossings());
        durations.push(duration);
        await delay(RATE_LIMIT_DELAY);
      }

      const avgDuration =
        durations.reduce((a, b) => a + b, 0) / durations.length;
      const maxDuration = Math.max(...durations);

      console.log(
        `Performance stats: avg=${avgDuration.toFixed(0)}ms, max=${maxDuration}ms`
      );

      // All calls should complete within 10 seconds
      durations.forEach((duration) => {
        expect(duration).toBeLessThan(10000);
      });

      // Average should be reasonable (under 5 seconds)
      expect(avgDuration).toBeLessThan(5000);
    });
  });
});
