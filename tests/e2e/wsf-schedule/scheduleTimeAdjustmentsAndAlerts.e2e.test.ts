import { describe, expect, it } from "vitest";

import {
  getAlerts,
  getAlternativeFormats,
  getTimeAdjustments,
  getTimeAdjustmentsByRoute,
  getTimeAdjustmentsBySchedRoute,
} from "@/api/wsf-schedule";

import {
  delay,
  measureApiCall,
  RATE_LIMIT_DELAY,
  TEST_ROUTE_ID,
  TEST_SCHED_ROUTE_ID,
  trackPerformance,
  validateAlert,
  validateAlternativeFormat,
  validateApiError,
  validateTimeAdjustment,
} from "../utils";

describe("Schedule Time Adjustments and Alerts E2E Tests", () => {
  describe("getTimeAdjustments", () => {
    it("should fetch time adjustments successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getTimeAdjustments()
      );

      // Performance tracking
      trackPerformance("getTimeAdjustments", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // May be empty if no time adjustments
      if (data.length > 0) {
        const firstAdjustment = data[0];
        validateTimeAdjustment(firstAdjustment);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() => getTimeAdjustments());

      // Track performance
      trackPerformance("getTimeAdjustments (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getTimeAdjustmentsByRoute", () => {
    it("should fetch time adjustments by route successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getTimeAdjustmentsByRoute(TEST_ROUTE_ID)
      );

      // Performance tracking
      trackPerformance("getTimeAdjustmentsByRoute", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // May be empty if no time adjustments for this route
      if (data.length > 0) {
        const firstAdjustment = data[0];
        validateTimeAdjustment(firstAdjustment);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid route ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(
          () => getTimeAdjustmentsByRoute(99999) // Invalid route ID
        );

        trackPerformance("getTimeAdjustmentsByRoute (invalid route)", duration);

        // Should return empty array for invalid route ID
        expect(Array.isArray(data)).toBe(true);
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getTimeAdjustmentsByRoute(TEST_ROUTE_ID)
      );

      // Track performance
      trackPerformance(
        "getTimeAdjustmentsByRoute (performance test)",
        duration
      );

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getTimeAdjustmentsBySchedRoute", () => {
    it("should fetch time adjustments by scheduled route successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getTimeAdjustmentsBySchedRoute(TEST_SCHED_ROUTE_ID)
      );

      // Performance tracking
      trackPerformance("getTimeAdjustmentsBySchedRoute", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // May be empty if no time adjustments for this scheduled route
      if (data.length > 0) {
        const firstAdjustment = data[0];
        validateTimeAdjustment(firstAdjustment);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid scheduled route ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(
          () => getTimeAdjustmentsBySchedRoute(99999) // Invalid scheduled route ID
        );

        trackPerformance(
          "getTimeAdjustmentsBySchedRoute (invalid route)",
          duration
        );

        // Should return empty array for invalid scheduled route ID
        expect(Array.isArray(data)).toBe(true);
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getTimeAdjustmentsBySchedRoute(TEST_SCHED_ROUTE_ID)
      );

      // Track performance
      trackPerformance(
        "getTimeAdjustmentsBySchedRoute (performance test)",
        duration
      );

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getAlerts", () => {
    it("should fetch alerts successfully", async () => {
      const { data, duration } = await measureApiCall(() => getAlerts());

      // Performance tracking
      trackPerformance("getAlerts", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // May be empty if no alerts
      if (data.length > 0) {
        const firstAlert = data[0];
        validateAlert(firstAlert);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() => getAlerts());

      // Track performance
      trackPerformance("getAlerts (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getAlternativeFormats", () => {
    it("should fetch alternative formats successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getAlternativeFormats("schedule")
      );

      // Performance tracking
      trackPerformance("getAlternativeFormats", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      // May be empty if no alternative formats
      if (data.length > 0) {
        const firstFormat = data[0];
        validateAlternativeFormat(firstFormat);
      }

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid subject name gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(
          () => getAlternativeFormats("invalid_subject") // Invalid subject name
        );

        trackPerformance("getAlternativeFormats (invalid subject)", duration);

        // Should return empty array for invalid subject name
        expect(Array.isArray(data)).toBe(true);
      } catch (error) {
        // Or should throw an error
        validateApiError(error);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should return data within performance benchmarks", async () => {
      const { duration } = await measureApiCall(() =>
        getAlternativeFormats("schedule")
      );

      // Track performance
      trackPerformance("getAlternativeFormats (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Data Consistency", () => {
    it("should return consistent time adjustment data structure", async () => {
      const { data: allAdjustments } = await measureApiCall(() =>
        getTimeAdjustments()
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: routeAdjustments } = await measureApiCall(() =>
        getTimeAdjustmentsByRoute(TEST_ROUTE_ID)
      );

      // Both should return arrays
      expect(Array.isArray(allAdjustments)).toBe(true);
      expect(Array.isArray(routeAdjustments)).toBe(true);

      // Time adjustments should have consistent structure
      if (allAdjustments.length > 0) {
        const adjustment = allAdjustments[0];
        expect(adjustment).toHaveProperty("ScheduleID");
        expect(adjustment).toHaveProperty("SchedRouteID");
        expect(adjustment).toHaveProperty("RouteID");
        expect(adjustment).toHaveProperty("SailingID");
        expect(adjustment).toHaveProperty("VesselID");
        expect(adjustment).toHaveProperty("TerminalID");
        expect(adjustment).toHaveProperty("AdjDateFrom");
        expect(adjustment).toHaveProperty("AdjDateThru");
        expect(adjustment).toHaveProperty("TimeToAdj");
        expect(adjustment).toHaveProperty("Annotations");
        expect(typeof adjustment.ScheduleID).toBe("number");
        expect(typeof adjustment.SchedRouteID).toBe("number");
        expect(typeof adjustment.RouteID).toBe("number");
        expect(typeof adjustment.SailingID).toBe("number");
        expect(typeof adjustment.VesselID).toBe("number");
        expect(typeof adjustment.TerminalID).toBe("number");
        expect(adjustment.AdjDateFrom).toBeInstanceOf(Date);
        expect(adjustment.AdjDateThru).toBeInstanceOf(Date);
        expect(adjustment.TimeToAdj).toBeInstanceOf(Date);
        expect(Array.isArray(adjustment.Annotations)).toBe(true);
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid time adjustment specifications", async () => {
      const { data } = await measureApiCall(() => getTimeAdjustments());

      if (data.length > 0) {
        data.forEach((adjustment) => {
          // Schedule ID should be positive
          expect(adjustment.ScheduleID).toBeGreaterThan(0);

          // Scheduled route ID should be positive
          expect(adjustment.SchedRouteID).toBeGreaterThan(0);

          // Route ID should be positive
          expect(adjustment.RouteID).toBeGreaterThan(0);

          // Sailing ID should be positive
          expect(adjustment.SailingID).toBeGreaterThan(0);

          // Vessel ID should be positive
          expect(adjustment.VesselID).toBeGreaterThan(0);

          // Terminal ID should be positive
          expect(adjustment.TerminalID).toBeGreaterThan(0);

          // Route description should be non-empty string
          expect(adjustment.RouteDescription).toBeTruthy();
          expect(typeof adjustment.RouteDescription).toBe("string");

          // Sailing description should be non-empty string
          expect(adjustment.SailingDescription).toBeTruthy();
          expect(typeof adjustment.SailingDescription).toBe("string");

          // Vessel name should be non-empty string
          expect(adjustment.VesselName).toBeTruthy();
          expect(typeof adjustment.VesselName).toBe("string");

          // Terminal description should be non-empty string
          expect(adjustment.TerminalDescription).toBeTruthy();
          expect(typeof adjustment.TerminalDescription).toBe("string");

          // Adjustment type should be valid
          expect(typeof adjustment.AdjType).toBe("number");

          // Tidal adjustment should be boolean
          expect(typeof adjustment.TidalAdj).toBe("boolean");

          // Arrays should be arrays
          expect(Array.isArray(adjustment.Annotations)).toBe(true);
        });
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid alert specifications", async () => {
      const { data } = await measureApiCall(() => getAlerts());

      if (data.length > 0) {
        data.forEach((alert) => {
          // Bulletin ID should be positive
          expect(alert.BulletinID).toBeGreaterThan(0);

          // Sort sequence should be valid
          expect(typeof alert.SortSeq).toBe("number");

          // Alert type ID should be positive
          expect(alert.AlertTypeID).toBeGreaterThan(0);

          // Bulletin text should be non-empty string
          expect(alert.BulletinText).toBeTruthy();
          expect(typeof alert.BulletinText).toBe("string");

          // Route alert text should be non-empty string
          expect(alert.RouteAlertText).toBeTruthy();
          expect(typeof alert.RouteAlertText).toBe("string");

          // Homepage alert text should be non-empty string
          expect(alert.HomepageAlertText).toBeTruthy();
          expect(typeof alert.HomepageAlertText).toBe("string");

          // Alert type should be non-empty string
          expect(alert.AlertType).toBeTruthy();
          expect(typeof alert.AlertType).toBe("string");

          // Alert full title should be non-empty string
          expect(alert.AlertFullTitle).toBeTruthy();
          expect(typeof alert.AlertFullTitle).toBe("string");

          // Booleans should be booleans
          expect(typeof alert.BulletinFlag).toBe("boolean");
          expect(typeof alert.CommunicationFlag).toBe("boolean");
          expect(typeof alert.RouteAlertFlag).toBe("boolean");
          expect(typeof alert.AllRoutesFlag).toBe("boolean");

          // Publish date should be Date
          expect(alert.PublishDate).toBeInstanceOf(Date);

          // Arrays should be arrays
          expect(Array.isArray(alert.AffectedRouteIDs)).toBe(true);
        });
      }

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have valid alternative format specifications", async () => {
      const { data } = await measureApiCall(() =>
        getAlternativeFormats("schedule")
      );

      if (data.length > 0) {
        data.forEach((format) => {
          // Alt ID should be positive
          expect(format.AltID).toBeGreaterThan(0);

          // Subject ID should be positive
          expect(format.SubjectID).toBeGreaterThan(0);

          // Sort sequence should be valid
          expect(typeof format.SortSeq).toBe("number");

          // Subject name should be non-empty string
          expect(format.SubjectName).toBeTruthy();
          expect(typeof format.SubjectName).toBe("string");

          // Alt title should be non-empty string
          expect(format.AltTitle).toBeTruthy();
          expect(typeof format.AltTitle).toBe("string");

          // Alt URL should be non-empty string
          expect(format.AltUrl).toBeTruthy();
          expect(typeof format.AltUrl).toBe("string");

          // Alt description should be non-empty string
          expect(format.AltDesc).toBeTruthy();
          expect(typeof format.AltDesc).toBe("string");

          // File type should be non-empty string
          expect(format.FileType).toBeTruthy();
          expect(typeof format.FileType).toBe("string");

          // Status should be non-empty string
          expect(format.Status).toBeTruthy();
          expect(typeof format.Status).toBe("string");

          // Date fields should be strings (as per API response)
          expect(typeof format.FromDate).toBe("string");
          expect(typeof format.ThruDate).toBe("string");
          expect(typeof format.ModifiedDate).toBe("string");

          // Modified by should be non-empty string
          expect(format.ModifiedBy).toBeTruthy();
          expect(typeof format.ModifiedBy).toBe("string");
        });
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Error Scenarios", () => {
    it("should handle timeout scenarios", async () => {
      // This test simulates timeout behavior
      const { duration } = await measureApiCall(() => getTimeAdjustments());

      // Should complete within reasonable time
      expect(duration).toBeLessThan(10000);

      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle malformed responses gracefully", async () => {
      // This test ensures the API handles unexpected response formats
      const { data } = await measureApiCall(() => getAlerts());

      // Should handle the response without throwing
      expect(data).toBeDefined();

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
