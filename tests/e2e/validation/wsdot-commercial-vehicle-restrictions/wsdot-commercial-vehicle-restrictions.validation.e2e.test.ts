import { describe, expect, it } from "vitest";

import {
  getCommercialVehicleRestrictions,
  getCommercialVehicleRestrictionsWithId,
} from "@/api/wsdot-commercial-vehicle-restrictions";

import { validators } from "./validator";

describe("WSDOT Commercial Vehicle Restrictions API - Zod Validation", () => {
  describe("getCommercialVehicleRestrictions", () => {
    it("should validate data structure", async () => {
      const restrictions = await getCommercialVehicleRestrictions();

      // Validate the entire array
      const validatedRestrictions =
        validators.commercialVehicleRestrictionsArray.validateSafe(
          restrictions
        );

      expect(validatedRestrictions.success).toBe(true);
      if (validatedRestrictions.success) {
        expect(Array.isArray(validatedRestrictions.data)).toBe(true);
        expect(validatedRestrictions.data.length).toBeGreaterThan(0);
      }
    });

    it("should validate individual commercial vehicle restriction data", async () => {
      const restrictions = await getCommercialVehicleRestrictions();

      if (restrictions.length > 0) {
        const firstRestriction = restrictions[0];

        // Validate individual item
        const validatedRestriction =
          validators.commercialVehicleRestriction.validateSafe(
            firstRestriction
          );

        expect(validatedRestriction.success).toBe(true);
        if (validatedRestriction.success) {
          expect(validatedRestriction.data.BridgeName).toBeDefined();
          expect(typeof validatedRestriction.data.BridgeName).toBe("string");
          expect(validatedRestriction.data.BridgeNumber).toBeDefined();
          expect(typeof validatedRestriction.data.BridgeNumber).toBe("string");
          expect(validatedRestriction.data.Latitude).toBeGreaterThanOrEqual(0);
          expect(validatedRestriction.data.Longitude).toBeLessThanOrEqual(0); // Washington state has negative longitude
          expect(
            validatedRestriction.data.RestrictionType
          ).toBeGreaterThanOrEqual(0);
          expect(typeof validatedRestriction.data.VehicleType).toBe("string");
          expect(validatedRestriction.data.DateEffective).toBeInstanceOf(Date);
          expect(validatedRestriction.data.DateExpires).toBeInstanceOf(Date);
          expect(validatedRestriction.data.DatePosted).toBeInstanceOf(Date);
          expect(typeof validatedRestriction.data.IsDetourAvailable).toBe(
            "boolean"
          );
          expect(typeof validatedRestriction.data.IsExceptionsAllowed).toBe(
            "boolean"
          );
          expect(typeof validatedRestriction.data.IsPermanentRestriction).toBe(
            "boolean"
          );
          expect(typeof validatedRestriction.data.IsWarning).toBe("boolean");
        }
      }
    });

    it("should validate roadway location data", async () => {
      const restrictions = await getCommercialVehicleRestrictions();

      if (restrictions.length > 0) {
        const firstRestriction = restrictions[0];

        // Validate start roadway location
        const validatedStartLocation = validators.roadwayLocation.validateSafe(
          firstRestriction.StartRoadwayLocation
        );

        expect(validatedStartLocation.success).toBe(true);
        if (validatedStartLocation.success) {
          expect(validatedStartLocation.data.Latitude).toBeGreaterThanOrEqual(
            0
          );
          expect(validatedStartLocation.data.Longitude).toBeLessThanOrEqual(0); // Washington state has negative longitude
          expect(validatedStartLocation.data.MilePost).toBeGreaterThanOrEqual(
            0
          );
          expect(typeof validatedStartLocation.data.RoadName).toBe("string");
          // Description and Direction can be null
          if (validatedStartLocation.data.Description !== null) {
            expect(typeof validatedStartLocation.data.Description).toBe(
              "string"
            );
          }
          if (validatedStartLocation.data.Direction !== null) {
            expect(typeof validatedStartLocation.data.Direction).toBe("string");
          }
        }

        // Validate end roadway location
        const validatedEndLocation = validators.roadwayLocation.validateSafe(
          firstRestriction.EndRoadwayLocation
        );

        expect(validatedEndLocation.success).toBe(true);
        if (validatedEndLocation.success) {
          expect(validatedEndLocation.data.Latitude).toBeGreaterThanOrEqual(0);
          expect(validatedEndLocation.data.Longitude).toBeLessThanOrEqual(0); // Washington state has negative longitude
          expect(validatedEndLocation.data.MilePost).toBeGreaterThanOrEqual(0);
          expect(typeof validatedEndLocation.data.RoadName).toBe("string");
        }
      }
    });

    it("should handle nullable fields correctly", async () => {
      const restrictions = await getCommercialVehicleRestrictions();

      if (restrictions.length > 0) {
        const firstRestriction = restrictions[0];

        const validatedRestriction =
          validators.commercialVehicleRestriction.validateSafe(
            firstRestriction
          );

        expect(validatedRestriction.success).toBe(true);
        if (validatedRestriction.success) {
          // Test nullable weight and dimension fields
          const nullableFields = [
            "BLMaxAxle",
            "CL8MaxAxle",
            "MaximumGrossVehicleWeightInPounds",
            "RestrictionHeightInInches",
            "RestrictionLengthInInches",
            "RestrictionWeightInPounds",
            "RestrictionWidthInInches",
            "SAMaxAxle",
            "TDMaxAxle",
          ];

          nullableFields.forEach((field) => {
            const value =
              validatedRestriction.data[
                field as keyof typeof validatedRestriction.data
              ];
            if (value !== null) {
              expect(typeof value).toBe("number");
              expect(value).toBeGreaterThanOrEqual(0);
            }
          });
        }
      }
    });

    it("should validate data transformations automatically", async () => {
      const restrictions = await getCommercialVehicleRestrictions();

      if (restrictions.length > 0) {
        const firstRestriction = restrictions[0];

        const validatedRestriction =
          validators.commercialVehicleRestriction.validateSafe(
            firstRestriction
          );

        expect(validatedRestriction.success).toBe(true);
        if (validatedRestriction.success) {
          // Test that dates are properly transformed
          const now = new Date();
          const effectiveTime =
            validatedRestriction.data.DateEffective instanceof Date
              ? validatedRestriction.data.DateEffective.getTime()
              : new Date(validatedRestriction.data.DateEffective).getTime();
          const expiresTime =
            validatedRestriction.data.DateExpires instanceof Date
              ? validatedRestriction.data.DateExpires.getTime()
              : new Date(validatedRestriction.data.DateExpires).getTime();
          const postedTime =
            validatedRestriction.data.DatePosted instanceof Date
              ? validatedRestriction.data.DatePosted.getTime()
              : new Date(validatedRestriction.data.DatePosted).getTime();

          // Allow for dates up to 20 years in the past (historical data)
          expect(now.getTime() - effectiveTime).toBeLessThan(
            20 * 365 * 24 * 60 * 60 * 1000
          );
          expect(now.getTime() - expiresTime).toBeLessThan(
            20 * 365 * 24 * 60 * 60 * 1000
          );
          expect(now.getTime() - postedTime).toBeLessThan(
            20 * 365 * 24 * 60 * 60 * 1000
          );
        }
      }
    });

    it("should provide detailed error information when validation fails", async () => {
      const invalidData = {
        BridgeName: 123, // Should be string
        BridgeNumber: null, // Should be string
        Latitude: "invalid", // Should be number
        Longitude: "invalid", // Should be number
        // Missing required fields
      };

      const result =
        validators.commercialVehicleRestriction.validateSafe(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        expect(
          result.error.issues.some((issue) => issue.path.includes("BridgeName"))
        ).toBe(true);
        expect(
          result.error.issues.some((issue) =>
            issue.path.includes("BridgeNumber")
          )
        ).toBe(true);
        expect(
          result.error.issues.some((issue) => issue.path.includes("Latitude"))
        ).toBe(true);
        expect(
          result.error.issues.some((issue) => issue.path.includes("Longitude"))
        ).toBe(true);
      }
    });
  });

  describe("getCommercialVehicleRestrictionsWithId", () => {
    it("should validate data structure with unique IDs", async () => {
      const restrictionsWithId = await getCommercialVehicleRestrictionsWithId();

      // Validate the entire array
      const validatedRestrictions =
        validators.commercialVehicleRestrictionsWithIdArray.validateSafe(
          restrictionsWithId
        );

      expect(validatedRestrictions.success).toBe(true);
      if (validatedRestrictions.success) {
        expect(Array.isArray(validatedRestrictions.data)).toBe(true);
        expect(validatedRestrictions.data.length).toBeGreaterThan(0);
      }
    });

    it("should validate individual restriction with unique ID", async () => {
      const restrictionsWithId = await getCommercialVehicleRestrictionsWithId();

      if (restrictionsWithId.length > 0) {
        const firstRestriction = restrictionsWithId[0];

        // Validate individual item
        const validatedRestriction =
          validators.commercialVehicleRestrictionWithId.validateSafe(
            firstRestriction
          );

        expect(validatedRestriction.success).toBe(true);
        if (validatedRestriction.success) {
          // Test all base fields
          expect(validatedRestriction.data.BridgeName).toBeDefined();
          expect(typeof validatedRestriction.data.BridgeName).toBe("string");
          expect(validatedRestriction.data.BridgeNumber).toBeDefined();
          expect(typeof validatedRestriction.data.BridgeNumber).toBe("string");
          expect(validatedRestriction.data.Latitude).toBeGreaterThanOrEqual(0);
          expect(validatedRestriction.data.Longitude).toBeLessThanOrEqual(0); // Washington state has negative longitude

          // Test unique ID field
          expect(validatedRestriction.data.UniqueID).toBeDefined();
          expect(typeof validatedRestriction.data.UniqueID).toBe("string");
          expect(validatedRestriction.data.UniqueID.length).toBeGreaterThan(0);
        }
      }
    });

    it("should validate that all restrictions have unique IDs", async () => {
      const restrictionsWithId = await getCommercialVehicleRestrictionsWithId();

      if (restrictionsWithId.length > 0) {
        const validatedRestrictions =
          validators.commercialVehicleRestrictionsWithIdArray.validateSafe(
            restrictionsWithId
          );

        expect(validatedRestrictions.success).toBe(true);
        if (validatedRestrictions.success) {
          // Check that all items have unique IDs
          const uniqueIds = new Set();
          validatedRestrictions.data.forEach((restriction) => {
            expect(restriction.UniqueID).toBeDefined();
            expect(typeof restriction.UniqueID).toBe("string");
            expect(restriction.UniqueID.length).toBeGreaterThan(0);
            uniqueIds.add(restriction.UniqueID);
          });

          // Verify uniqueness (should be true for real data)
          expect(uniqueIds.size).toBe(validatedRestrictions.data.length);
        }
      }
    });
  });
});
