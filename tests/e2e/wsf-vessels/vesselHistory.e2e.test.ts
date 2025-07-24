import { describe, expect, it } from "vitest";

import {
  getVesselHistory,
  getVesselHistoryByVesselAndDateRange,
} from "@/api/wsf-vessels";
import type { VesselHistory } from "@/api/wsf-vessels/types";

import {
  delay,
  measureApiCall,
  RATE_LIMIT_DELAY,
  trackPerformance,
  validateApiError,
  validateVesselHistory,
} from "../utils";

describe("Vessel History E2E Tests", () => {
  describe("getVesselHistory", () => {
    it("should fetch all vessel history successfully", async () => {
      const { data, duration } = await measureApiCall(() => getVesselHistory());

      // Performance tracking
      trackPerformance("getVesselHistory", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first vessel history
      const firstHistory = data[0];
      validateVesselHistory(firstHistory);

      // Validate data types
      expect(typeof firstHistory.VesselId).toBe("number");
      expect(typeof firstHistory.Vessel).toBe("string");
      // Date fields may be null
      expect(
        firstHistory.Date === null || firstHistory.Date instanceof Date
      ).toBe(true);
      expect(
        firstHistory.ScheduledDepart === null ||
          firstHistory.ScheduledDepart instanceof Date
      ).toBe(true);
      expect(
        firstHistory.ActualDepart === null ||
          firstHistory.ActualDepart instanceof Date
      ).toBe(true);
      expect(
        firstHistory.EstArrival === null ||
          firstHistory.EstArrival instanceof Date
      ).toBe(true);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle network errors gracefully", async () => {
      // Test with invalid API key scenario
      const originalToken = process.env.WSDOT_ACCESS_TOKEN;
      process.env.WSDOT_ACCESS_TOKEN = "invalid_token";

      try {
        // With invalid token, should still work but return empty array or throw
        const result = await getVesselHistory();
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
      const { duration } = await measureApiCall(() => getVesselHistory());

      // Track performance
      trackPerformance("getVesselHistory (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getVesselHistoryByVesselAndDateRange", () => {
    it("should fetch vessel history for specific vessel and date range successfully", async () => {
      const vesselName = "Cathlamet";
      const dateStart = new Date("2024-01-01");
      const dateEnd = new Date("2024-01-31");

      const { data, duration } = await measureApiCall(() =>
        getVesselHistoryByVesselAndDateRange({
          vesselName,
          dateStart,
          dateEnd,
        })
      );

      // Performance tracking
      trackPerformance(
        `getVesselHistoryByVesselAndDateRange(${vesselName}, ${dateStart}, ${dateEnd})`,
        duration
      );

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data.length > 0) {
        validateVesselHistory(data[0]);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid vessel name gracefully", async () => {
      const invalidVesselName = "Invalid Vessel Name";
      const dateStart = new Date("2024-01-01");
      const dateEnd = new Date("2024-01-31");

      try {
        const { data, duration } = await measureApiCall(() =>
          getVesselHistoryByVesselAndDateRange({
            vesselName: invalidVesselName,
            dateStart,
            dateEnd,
          })
        );

        // Performance tracking
        trackPerformance(
          `getVesselHistoryByVesselAndDateRange(${invalidVesselName}, ${dateStart}, ${dateEnd})`,
          duration
        );

        // Should either return empty array or throw error, not hang
        if (data) {
          expect(Array.isArray(data)).toBe(true);
        }
      } catch (error) {
        // Should throw WsdotApiError for invalid vessel name
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid date format gracefully", async () => {
      const vesselName = "Cathlamet";
      const invalidDateStart = new Date("invalid-date");
      const invalidDateEnd = new Date("invalid-date");

      try {
        const { data, duration } = await measureApiCall(() =>
          getVesselHistoryByVesselAndDateRange({
            vesselName,
            dateStart: invalidDateStart,
            dateEnd: invalidDateEnd,
          })
        );

        // Performance tracking
        trackPerformance(
          `getVesselHistoryByVesselAndDateRange(${vesselName}, ${invalidDateStart}, ${invalidDateEnd})`,
          duration
        );

        // Should return empty array or throw for invalid date format
        expect(Array.isArray(data)).toBe(true);
      } catch (error) {
        // Should throw an error for invalid dates
        expect(error).toBeInstanceOf(RangeError);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle future date range", async () => {
      const vesselName = "Cathlamet";
      const futureDateStart = new Date("2030-01-01");
      const futureDateEnd = new Date("2030-01-31");

      try {
        const { data, duration } = await measureApiCall(() =>
          getVesselHistoryByVesselAndDateRange({
            vesselName,
            dateStart: futureDateStart,
            dateEnd: futureDateEnd,
          })
        );

        // Performance tracking
        trackPerformance(
          `getVesselHistoryByVesselAndDateRange(${vesselName}, ${futureDateStart}, ${futureDateEnd})`,
          duration
        );

        // Should either return empty array or throw error, not hang
        if (data) {
          expect(Array.isArray(data)).toBe(true);
        }
      } catch (error) {
        // Should throw WsdotApiError for future date range
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle reversed date range", async () => {
      const vesselName = "Cathlamet";
      const dateStart = new Date("2024-01-31");
      const dateEnd = new Date("2024-01-01");

      const { data, duration } = await measureApiCall(() =>
        getVesselHistoryByVesselAndDateRange({
          vesselName,
          dateStart,
          dateEnd,
        })
      );

      // Performance tracking
      trackPerformance(
        `getVesselHistoryByVesselAndDateRange(${vesselName}, ${dateStart}, ${dateEnd})`,
        duration
      );

      // Should handle reversed dates gracefully
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Data Consistency", () => {
    it("should return consistent data structure across calls", async () => {
      const { data: firstCall } = await measureApiCall(() =>
        getVesselHistory()
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: secondCall } = await measureApiCall(() =>
        getVesselHistory()
      );

      // Both calls should return arrays
      expect(Array.isArray(firstCall)).toBe(true);
      expect(Array.isArray(secondCall)).toBe(true);

      // Both should have the same structure for first history entry
      if (firstCall.length > 0 && secondCall.length > 0) {
        const firstHistory = firstCall[0];
        const secondHistory = secondCall[0];

        // Should have same properties
        expect(Object.keys(firstHistory)).toEqual(Object.keys(secondHistory));
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid history data", async () => {
      const { data } = await measureApiCall(() => getVesselHistory());

      data.forEach((history: VesselHistory) => {
        // Vessel ID should be positive
        expect(history.VesselId).toBeGreaterThan(0);

        // Vessel name should be non-empty string
        expect(history.Vessel).toBeTruthy();
        expect(typeof history.Vessel).toBe("string");

        // Date fields may be null or valid dates
        if (history.Date !== null) {
          expect(history.Date).toBeInstanceOf(Date);
        }
        if (history.ScheduledDepart !== null) {
          expect(history.ScheduledDepart).toBeInstanceOf(Date);
        }
        if (history.ActualDepart !== null) {
          expect(history.ActualDepart).toBeInstanceOf(Date);
        }
        if (history.EstArrival !== null) {
          expect(history.EstArrival).toBeInstanceOf(Date);
        }
      });

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have reasonable date ranges", async () => {
      const { data } = await measureApiCall(() => getVesselHistory());

      const now = new Date();
      const minDate = new Date("1900-01-01"); // Reasonable minimum date

      data.forEach((history: VesselHistory) => {
        // History date should be in reasonable range if not null
        if (history.Date !== null) {
          expect(history.Date.getTime()).toBeGreaterThan(minDate.getTime());
          expect(history.Date.getTime()).toBeLessThanOrEqual(now.getTime());
        }
      });

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Cross-Reference Validation", () => {
    it("should have consistent vessel data between history and basics", async () => {
      const { data: history } = await measureApiCall(() => getVesselHistory());
      await delay(RATE_LIMIT_DELAY);

      // Get history for a specific vessel if available
      if (history.length > 0) {
        const firstHistory = history[0];
        const vesselName = firstHistory.Vessel;
        const dateStart = new Date("2024-01-01");
        const dateEnd = new Date("2024-12-31");

        const { data: specificHistory } = await measureApiCall(() =>
          getVesselHistoryByVesselAndDateRange({
            vesselName,
            dateStart,
            dateEnd,
          })
        );

        // Should return array of history entries
        expect(Array.isArray(specificHistory)).toBe(true);

        // All entries should have the same vessel name
        specificHistory.forEach((entry) => {
          expect(entry.Vessel).toBe(vesselName);
          validateVesselHistory(entry);
        });
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
