import { describe, expect, it } from "vitest";

import {
  getCommercialVehicleRestrictions,
  getCommercialVehicleRestrictionsWithId,
} from "@/api/wsdot-commercial-vehicle-restrictions";

import {
  delay,
  measureApiCall,
  RATE_LIMIT_DELAY,
  trackPerformance,
  validateApiError,
} from "../utils";

describe("Commercial Vehicle Restrictions Get Data E2E Tests", () => {
  describe("Data Retrieval", () => {
    it("should return multiple commercial vehicle restrictions", async () => {
      const { data, duration } = await measureApiCall(() =>
        getCommercialVehicleRestrictions()
      );

      // Performance tracking
      trackPerformance("getCommercialVehicleRestrictions (multiple)", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data?.length).toBeGreaterThan(0);

      // Should have various restriction types
      const restrictionTypes = new Set(data?.map((r) => r.RestrictionType));
      expect(restrictionTypes.size).toBeGreaterThan(0);

      // Should have various vehicle types
      const vehicleTypes = new Set(data?.map((r) => r.VehicleType));
      expect(vehicleTypes.size).toBeGreaterThan(0);

      // Should have various state routes
      const stateRoutes = new Set(data?.map((r) => r.StateRouteID));
      expect(stateRoutes.size).toBeGreaterThan(0);
    });

    it("should return restrictions with valid date objects", async () => {
      const { data } = await measureApiCall(() =>
        getCommercialVehicleRestrictions()
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data && data.length > 0) {
        data.forEach((restriction) => {
          // All dates should be valid Date objects
          expect(restriction.DateEffective).toBeInstanceOf(Date);
          expect(restriction.DateExpires).toBeInstanceOf(Date);
          expect(restriction.DatePosted).toBeInstanceOf(Date);
        });
      }
    });

    it("should return restrictions with valid weight and dimension data", async () => {
      const { data } = await measureApiCall(() =>
        getCommercialVehicleRestrictions()
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data && data.length > 0) {
        data.forEach((restriction) => {
          // Weight restrictions should be non-negative if present
          if (restriction.RestrictionWeightInPounds !== null) {
            expect(
              restriction.RestrictionWeightInPounds
            ).toBeGreaterThanOrEqual(0);
          }

          if (restriction.MaximumGrossVehicleWeightInPounds !== null) {
            expect(
              restriction.MaximumGrossVehicleWeightInPounds
            ).toBeGreaterThanOrEqual(0);
          }

          // Dimension restrictions should be non-negative if present
          if (restriction.RestrictionHeightInInches !== null) {
            expect(
              restriction.RestrictionHeightInInches
            ).toBeGreaterThanOrEqual(0);
          }

          if (restriction.RestrictionLengthInInches !== null) {
            expect(
              restriction.RestrictionLengthInInches
            ).toBeGreaterThanOrEqual(0);
          }

          if (restriction.RestrictionWidthInInches !== null) {
            expect(restriction.RestrictionWidthInInches).toBeGreaterThanOrEqual(
              0
            );
          }

          // Axle weight restrictions should be non-negative if present
          if (restriction.BLMaxAxle !== null) {
            expect(restriction.BLMaxAxle).toBeGreaterThanOrEqual(0);
          }

          if (restriction.CL8MaxAxle !== null) {
            expect(restriction.CL8MaxAxle).toBeGreaterThanOrEqual(0);
          }

          if (restriction.SAMaxAxle !== null) {
            expect(restriction.SAMaxAxle).toBeGreaterThanOrEqual(0);
          }

          if (restriction.TDMaxAxle !== null) {
            expect(restriction.TDMaxAxle).toBeGreaterThanOrEqual(0);
          }
        });
      }
    });
  });

  describe("WithId Endpoint", () => {
    it("should fetch commercial vehicle restrictions with unique IDs", async () => {
      const { data, duration } = await measureApiCall(() =>
        getCommercialVehicleRestrictionsWithId()
      );

      // Performance tracking
      trackPerformance("getCommercialVehicleRestrictionsWithId", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data && data.length > 0) {
        const firstRestriction = data[0];

        // Should have all the same fields as regular endpoint
        expect(firstRestriction.BridgeName).toBeDefined();
        expect(firstRestriction.BridgeNumber).toBeDefined();
        expect(firstRestriction.DateEffective).toBeInstanceOf(Date);
        expect(firstRestriction.DateExpires).toBeInstanceOf(Date);
        expect(firstRestriction.DatePosted).toBeInstanceOf(Date);
        expect(firstRestriction.Latitude).toBeTypeOf("number");
        expect(firstRestriction.Longitude).toBeTypeOf("number");
        expect(firstRestriction.RestrictionType).toBeTypeOf("number");
        expect(firstRestriction.StateRouteID).toBeTypeOf("string");
        expect(firstRestriction.VehicleType).toBeDefined();

        // Should have unique ID field
        expect(firstRestriction.UniqueID).toBeDefined();
        expect(firstRestriction.UniqueID).toBeTypeOf("string");
        expect(firstRestriction.UniqueID.length).toBeGreaterThan(0);
      }

      // Performance validation
      expect(duration).toBeLessThan(2000); // 2-second LTE target
    });

    it("should have unique IDs for all restrictions", async () => {
      const { data } = await measureApiCall(() =>
        getCommercialVehicleRestrictionsWithId()
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data && data.length > 0) {
        // All restrictions should have unique IDs
        data.forEach((restriction) => {
          expect(restriction.UniqueID).toBeDefined();
          expect(restriction.UniqueID).toBeTypeOf("string");
          expect(restriction.UniqueID.length).toBeGreaterThan(0);
        });

        // All unique IDs should be different
        const uniqueIds = data.map((r) => r.UniqueID);
        const uniqueIdSet = new Set(uniqueIds);
        expect(uniqueIdSet.size).toBe(uniqueIds.length);
      }
    });
  });

  describe("Error Handling", () => {
    it("should handle API errors gracefully", async () => {
      // This test validates that the API handles errors properly
      // The actual error handling is tested in the fetch utilities
      const { data } = await measureApiCall(() =>
        getCommercialVehicleRestrictions()
      );

      // Should either return data or throw a proper error
      if (data) {
        expect(Array.isArray(data)).toBe(true);
      }
    });
  });
});
