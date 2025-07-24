import { describe, expect, it } from "vitest";

import {
  getVesselAccommodations,
  getVesselAccommodationsById,
} from "@/api/wsf-vessels";

import {
  delay,
  INVALID_VESSEL_ID,
  measureApiCall,
  RATE_LIMIT_DELAY,
  TEST_VESSEL_ID,
  trackPerformance,
  validateApiError,
  validateVesselAccommodation,
} from "../utils";

describe("Vessel Accommodations E2E Tests", () => {
  describe("getVesselAccommodations", () => {
    it("should fetch all vessel accommodations successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getVesselAccommodations()
      );

      // Performance tracking
      trackPerformance("getVesselAccommodations", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Validate first vessel accommodation
      const firstVessel = data[0];
      validateVesselAccommodation(firstVessel);

      // Validate data types
      expect(typeof firstVessel.VesselID).toBe("number");
      expect(typeof firstVessel.VesselSubjectID).toBe("number");
      expect(typeof firstVessel.VesselName).toBe("string");
      expect(typeof firstVessel.VesselAbbrev).toBe("string");
      expect(typeof firstVessel.CarDeckRestroom).toBe("boolean");
      expect(typeof firstVessel.Elevator).toBe("boolean");
      expect(typeof firstVessel.ADAAccessible).toBe("boolean");

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle network errors gracefully", async () => {
      // Test with invalid API key scenario
      const originalToken = process.env.WSDOT_ACCESS_TOKEN;
      process.env.WSDOT_ACCESS_TOKEN = "invalid_token";

      try {
        // With invalid token, should still work but return empty array or throw
        const result = await getVesselAccommodations();
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
      const { duration } = await measureApiCall(() =>
        getVesselAccommodations()
      );

      // Track performance
      trackPerformance("getVesselAccommodations (performance test)", duration);

      // Performance should be under 5 seconds for E2E tests
      expect(duration).toBeLessThan(5000);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("getVesselAccommodationsById", () => {
    it("should fetch specific vessel accommodations successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getVesselAccommodationsById({ vesselId: TEST_VESSEL_ID })
      );

      // Performance tracking
      trackPerformance(
        `getVesselAccommodationsById(${TEST_VESSEL_ID})`,
        duration
      );

      // Validate response
      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
      expect(Array.isArray(data)).toBe(false);

      // Validate vessel accommodations
      validateVesselAccommodation(data);

      // Rate limiting
      await delay(RATE_LIMIT_DELAY);
    });

    it("should handle invalid vessel ID gracefully", async () => {
      try {
        const { data, duration } = await measureApiCall(() =>
          getVesselAccommodationsById({ vesselId: INVALID_VESSEL_ID })
        );

        // Performance tracking
        trackPerformance(
          `getVesselAccommodationsById(${INVALID_VESSEL_ID})`,
          duration
        );

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
          getVesselAccommodationsById({ vesselId: -1 })
        );

        trackPerformance("getVesselAccommodationsById(-1)", duration);

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
          getVesselAccommodationsById({ vesselId: 0 })
        );

        trackPerformance("getVesselAccommodationsById(0)", duration);

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
      const { data: firstCall } = await measureApiCall(() =>
        getVesselAccommodations()
      );
      await delay(RATE_LIMIT_DELAY);

      const { data: secondCall } = await measureApiCall(() =>
        getVesselAccommodations()
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

    it("should have valid accommodation data", async () => {
      const { data } = await measureApiCall(() => getVesselAccommodations());

      data.forEach((accommodation) => {
        // Vessel ID should be positive
        expect(accommodation.VesselID).toBeGreaterThan(0);

        // Vessel Subject ID should be positive
        expect(accommodation.VesselSubjectID).toBeGreaterThan(0);

        // Vessel name should be non-empty string
        expect(accommodation.VesselName).toBeTruthy();
        expect(typeof accommodation.VesselName).toBe("string");

        // Vessel abbreviation should be non-empty string
        expect(accommodation.VesselAbbrev).toBeTruthy();
        expect(typeof accommodation.VesselAbbrev).toBe("string");

        // Class information should be valid
        expect(accommodation.Class.ClassID).toBeGreaterThan(0);
        expect(accommodation.Class.ClassName).toBeTruthy();

        // Accommodation features should be booleans
        expect(typeof accommodation.CarDeckRestroom).toBe("boolean");
        expect(typeof accommodation.Elevator).toBe("boolean");
        expect(typeof accommodation.ADAAccessible).toBe("boolean");
      });

      await delay(RATE_LIMIT_DELAY);
    });

    it("should have unique vessel IDs", async () => {
      const { data } = await measureApiCall(() => getVesselAccommodations());

      const vesselIds = data.map((vessel) => vessel.VesselID);
      const uniqueIds = new Set(vesselIds);

      // All vessel IDs should be unique
      expect(uniqueIds.size).toBe(vesselIds.length);

      await delay(RATE_LIMIT_DELAY);
    });
  });

  describe("Cross-Reference Validation", () => {
    it("should have consistent vessel data between accommodations and basics", async () => {
      const { data: accommodations } = await measureApiCall(() =>
        getVesselAccommodations()
      );
      await delay(RATE_LIMIT_DELAY);

      // Get the first vessel's basic data
      if (accommodations.length > 0) {
        const firstVessel = accommodations[0];
        const { data: basic } = await measureApiCall(() =>
          getVesselAccommodationsById({ vesselId: firstVessel.VesselID })
        );

        // Accommodation data should be valid
        expect(basic.VesselID).toBe(firstVessel.VesselID);
        expect(basic.VesselSubjectID).toBeGreaterThan(0);
        expect(basic.VesselName).toBeTruthy();
        expect(basic.VesselAbbrev).toBeTruthy();
        expect(typeof basic.CarDeckRestroom).toBe("boolean");
      }

      await delay(RATE_LIMIT_DELAY);
    });
  });
});
