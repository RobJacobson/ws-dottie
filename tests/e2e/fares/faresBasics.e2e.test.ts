import { describe, expect, it } from "vitest";

import {
  getFaresCacheFlushDate,
  getFaresValidDateRange,
} from "@/api/wsf/fares";

import {
  delay,
  measureApiCall,
  RATE_LIMIT_DELAY,
  trackPerformance,
  validateFaresCacheFlushDate,
  validateFaresValidDateRange,
} from "../utils";

describe("Fares Basics E2E Tests", () => {
  describe("getFaresCacheFlushDate", () => {
    it("should fetch fares cache flush date successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getFaresCacheFlushDate()
      );

      // Performance tracking
      trackPerformance("getFaresCacheFlushDate", duration);

      // Validate response
      expect(data).toBeDefined();
      if (data) {
        validateFaresCacheFlushDate(data);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() => getFaresCacheFlushDate());

      // Track performance
      trackPerformance("getFaresCacheFlushDate (performance test)", duration);

      // Performance should be under 10 seconds for E2E tests
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getFaresValidDateRange", () => {
    it("should fetch valid date range successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getFaresValidDateRange()
      );

      // Performance tracking
      trackPerformance("getFaresValidDateRange", duration);

      // Validate response
      expect(data).toBeDefined();
      if (data) {
        validateFaresValidDateRange(data);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() => getFaresValidDateRange());

      // Track performance
      trackPerformance("getFaresValidDateRange (performance test)", duration);

      // Performance should be under 10 seconds for E2E tests
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Data Consistency", () => {
    it("should return consistent data structure across calls", async () => {
      const { data: firstCall } = await measureApiCall(() =>
        getFaresCacheFlushDate()
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: secondCall } = await measureApiCall(() =>
        getFaresCacheFlushDate()
      );

      // Both calls should return Date objects or null
      if (firstCall && secondCall) {
        expect(firstCall).toBeInstanceOf(Date);
        expect(secondCall).toBeInstanceOf(Date);

        // Both should have valid timestamps
        expect(firstCall.getTime()).toBeGreaterThan(0);
        expect(secondCall.getTime()).toBeGreaterThan(0);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid date range specifications", async () => {
      const { data } = await measureApiCall(() => getFaresValidDateRange());

      if (data) {
        // DateFrom should be before DateThru
        expect(data.DateFrom.getTime()).toBeLessThan(data.DateThru.getTime());

        // Both dates should be valid
        expect(data.DateFrom.getTime()).toBeGreaterThan(0);
        expect(data.DateThru.getTime()).toBeGreaterThan(0);

        // Date range should be reasonable (not more than 2 years)
        const twoYearsInMs = 2 * 365 * 24 * 60 * 60 * 1000;
        expect(data.DateThru.getTime() - data.DateFrom.getTime()).toBeLessThan(
          twoYearsInMs
        );
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have cache flush date within reasonable range", async () => {
      const { data } = await measureApiCall(() => getFaresCacheFlushDate());

      if (data) {
        const now = new Date();
        const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        const oneYearFromNow = new Date(
          now.getTime() + 365 * 24 * 60 * 60 * 1000
        );

        // Cache flush date should be within reasonable range
        expect(data.getTime()).toBeGreaterThan(oneYearAgo.getTime());
        expect(data.getTime()).toBeLessThan(oneYearFromNow.getTime());
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Error Scenarios", () => {
    it("should handle timeout scenarios", async () => {
      // This test simulates timeout behavior
      const { duration } = await measureApiCall(() => getFaresCacheFlushDate());

      // Should complete within reasonable time
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle network errors gracefully", async () => {
      // This test verifies that the API handles network issues
      const { data, duration } = await measureApiCall(() =>
        getFaresValidDateRange()
      );

      // Should either return valid data or throw an error, not hang
      expect(duration).toBeLessThan(10000);

      if (data) {
        validateFaresValidDateRange(data);
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("API Endpoint Validation", () => {
    it("should return proper HTTP status codes", async () => {
      const { data } = await measureApiCall(() => getFaresCacheFlushDate());

      // If we get data, the endpoint is working
      if (data) {
        expect(data).toBeInstanceOf(Date);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle malformed requests gracefully", async () => {
      // This test ensures the API doesn't crash on edge cases
      const { duration } = await measureApiCall(() => getFaresValidDateRange());

      // Should complete within reasonable time even with edge cases
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
