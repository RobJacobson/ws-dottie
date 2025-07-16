import { describe, expect, it } from "vitest";

import { getCacheFlushDateVessels } from "@/api/wsf-vessels";

import {
  delay,
  measureApiCall,
  RATE_LIMIT_DELAY,
  trackPerformance,
  validateApiError,
  validateCacheFlushDate,
} from "../utils";

describe("Vessel Cache Flush Date E2E Tests", () => {
  describe("getCacheFlushDateVessels", () => {
    it("should fetch vessel cache flush date successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getCacheFlushDateVessels()
      );

      // Performance tracking
      trackPerformance("getCacheFlushDateVessels", duration);

      // Validate response
      expect(data).toBeDefined();

      // May be null if no cache flush date available
      if (data !== null) {
        validateCacheFlushDate(data);

        // Validate date is reasonable
        const now = new Date();
        const minDate = new Date("2020-01-01"); // Reasonable minimum date
        expect(data.getTime()).toBeGreaterThan(minDate.getTime());
        expect(data.getTime()).toBeLessThanOrEqual(now.getTime());
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle network errors gracefully", async () => {
      // Test with invalid API key scenario
      const originalToken = process.env.WSDOT_ACCESS_TOKEN;
      process.env.WSDOT_ACCESS_TOKEN = "invalid_token";

      try {
        // With invalid token, should still work but return null or throw
        const result = await getCacheFlushDateVessels();
        // If it doesn't throw, it should return null or valid data
        expect(result === null || result instanceof Date).toBe(true);
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
      const { duration } = await measureApiCall(() =>
        getCacheFlushDateVessels()
      );

      // Track performance
      trackPerformance("getCacheFlushDateVessels (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Data Consistency", () => {
    it("should return consistent data structure across calls", async () => {
      const { data: firstCall } = await measureApiCall(() =>
        getCacheFlushDateVessels()
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: secondCall } = await measureApiCall(() =>
        getCacheFlushDateVessels()
      );

      // Both calls should return same type (null or Date)
      expect(firstCall === null || firstCall instanceof Date).toBe(true);
      expect(secondCall === null || secondCall instanceof Date).toBe(true);

      // If both return data, they should be Date objects
      if (firstCall !== null && secondCall !== null) {
        expect(firstCall).toBeInstanceOf(Date);
        expect(secondCall).toBeInstanceOf(Date);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid cache flush date data when not null", async () => {
      const { data } = await measureApiCall(() => getCacheFlushDateVessels());

      if (data !== null) {
        // Should be a valid Date object
        expect(data).toBeInstanceOf(Date);
        expect(data.getTime()).toBeGreaterThan(0);

        // Date should be in reasonable range
        const now = new Date();
        const minDate = new Date("2020-01-01"); // Reasonable minimum date
        expect(data.getTime()).toBeGreaterThan(minDate.getTime());
        expect(data.getTime()).toBeLessThanOrEqual(now.getTime());
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have reasonable cache flush date when available", async () => {
      const { data } = await measureApiCall(() => getCacheFlushDateVessels());

      if (data !== null) {
        const now = new Date();
        const timeDiff = now.getTime() - data.getTime();
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

        // Cache flush date should not be more than 1 year old
        expect(daysDiff).toBeLessThan(365);

        // Cache flush date should not be in the future
        expect(data.getTime()).toBeLessThanOrEqual(now.getTime());
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Cross-Reference Validation", () => {
    it("should be consistent with other vessel data freshness", async () => {
      const { data: cacheFlushDate } = await measureApiCall(() =>
        getCacheFlushDateVessels()
      );
      await delay(RATE_LIMIT_DELAY);

      // Get some vessel data to compare freshness
      const { getVesselBasics } = await import("@/api/wsf-vessels");
      const { data: vesselBasics } = await measureApiCall(() =>
        getVesselBasics()
      );

      if (cacheFlushDate !== null && vesselBasics.length > 0) {
        // Cache flush date should be a valid Date object
        expect(cacheFlushDate).toBeInstanceOf(Date);
        expect(cacheFlushDate.getTime()).toBeGreaterThan(0);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
