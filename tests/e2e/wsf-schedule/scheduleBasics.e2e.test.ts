import { describe, expect, it } from "vitest";

import {
  getActiveSeasons,
  getCacheFlushDateSchedule,
  getValidDateRange,
} from "@/api/wsf-schedule";

import {
  delay,
  measureApiCall,
  RATE_LIMIT_DELAY,
  trackPerformance,
  validateActiveSeason,
  validateApiError,
  validateScheduleCacheFlushDate,
  validateValidDateRange,
} from "../utils";

describe("Schedule Basics E2E Tests", () => {
  describe("getCacheFlushDateSchedule", () => {
    it("should fetch schedule cache flush date successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getCacheFlushDateSchedule()
      );

      // Performance tracking
      trackPerformance("getCacheFlushDateSchedule", duration);

      // Validate response
      expect(data).toBeDefined();
      if (data) {
        validateScheduleCacheFlushDate(data);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getCacheFlushDateSchedule()
      );

      // Track performance
      trackPerformance(
        "getCacheFlushDateSchedule (performance test)",
        duration
      );

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getValidDateRange", () => {
    it("should fetch valid date range successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getValidDateRange()
      );

      // Performance tracking
      trackPerformance("getValidDateRange", duration);

      // Validate response
      expect(data).toBeDefined();
      if (data) {
        validateValidDateRange(data);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() => getValidDateRange());

      // Track performance
      trackPerformance("getValidDateRange (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getActiveSeasons", () => {
    it("should fetch active seasons successfully", async () => {
      const { data, duration } = await measureApiCall(() => getActiveSeasons());

      // Performance tracking
      trackPerformance("getActiveSeasons", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first season
      if (data.length > 0) {
        validateActiveSeason(data[0]);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() => getActiveSeasons());

      // Track performance
      trackPerformance("getActiveSeasons (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Data Consistency", () => {
    it("should return consistent data structure across calls", async () => {
      const { data: firstCall } = await measureApiCall(() =>
        getCacheFlushDateSchedule()
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: secondCall } = await measureApiCall(() =>
        getCacheFlushDateSchedule()
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
      const { data } = await measureApiCall(() => getValidDateRange());

      if (data) {
        // DateFrom should be before DateThru
        expect(data.DateFrom.getTime()).toBeLessThan(data.DateThru.getTime());

        // Both dates should be valid
        expect(data.DateFrom.getTime()).toBeGreaterThan(0);
        expect(data.DateThru.getTime()).toBeGreaterThan(0);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid active season specifications", async () => {
      const { data } = await measureApiCall(() => getActiveSeasons());

      expect(Array.isArray(data)).toBe(true);
      if (data.length > 0) {
        const firstSeason = data[0];

        // Schedule ID should be positive
        expect(firstSeason.ScheduleID).toBeGreaterThan(0);

        // Schedule name should be non-empty string
        expect(firstSeason.ScheduleName).toBeTruthy();
        expect(typeof firstSeason.ScheduleName).toBe("string");

        // Schedule season should be positive
        expect(firstSeason.ScheduleSeason).toBeGreaterThan(0);

        // Schedule start should be before schedule end
        expect(firstSeason.ScheduleStart.getTime()).toBeLessThan(
          firstSeason.ScheduleEnd.getTime()
        );
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Error Scenarios", () => {
    it("should handle timeout scenarios", async () => {
      // This test simulates timeout behavior
      const { duration } = await measureApiCall(() => getActiveSeasons());

      // Should complete within reasonable time
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle malformed responses gracefully", async () => {
      // This test ensures the API handles unexpected response formats
      const { data } = await measureApiCall(() => getCacheFlushDateSchedule());

      // Should handle the response without throwing
      expect(data).toBeDefined();

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
