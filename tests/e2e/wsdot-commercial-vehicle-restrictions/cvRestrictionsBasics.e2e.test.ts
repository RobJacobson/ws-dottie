import { describe, expect, it } from "vitest";

import { getCommercialVehicleRestrictions } from "@/api/wsdot-commercial-vehicle-restrictions";

import { measureApiCall, trackPerformance } from "../utils";

describe("Commercial Vehicle Restrictions Basics E2E Tests", () => {
  describe("getCommercialVehicleRestrictions", () => {
    it("should fetch commercial vehicle restrictions data successfully", async () => {
      const { data, duration } = await measureApiCall(() =>
        getCommercialVehicleRestrictions()
      );

      // Performance tracking
      trackPerformance("getCommercialVehicleRestrictions", duration);

      // Validate response
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data && data.length > 0) {
        const firstRestriction = data[0];

        // Validate required fields
        expect(firstRestriction.BridgeName).toBeDefined();
        expect(firstRestriction.BridgeNumber).toBeDefined();
        expect(firstRestriction.DateEffective).toBeInstanceOf(Date);
        expect(firstRestriction.DateExpires).toBeInstanceOf(Date);
        expect(firstRestriction.DatePosted).toBeInstanceOf(Date);
        expect(firstRestriction.IsDetourAvailable).toBeTypeOf("boolean");
        expect(firstRestriction.IsExceptionsAllowed).toBeTypeOf("boolean");
        expect(firstRestriction.IsPermanentRestriction).toBeTypeOf("boolean");
        expect(firstRestriction.IsWarning).toBeTypeOf("boolean");
        expect(firstRestriction.Latitude).toBeTypeOf("number");
        expect(firstRestriction.LocationDescription).toBeTypeOf("string");
        expect(firstRestriction.LocationName).toBeTypeOf("string");
        expect(firstRestriction.Longitude).toBeTypeOf("number");
        expect(firstRestriction.RestrictionComment).toBeTypeOf("string");
        expect(firstRestriction.RestrictionType).toBeTypeOf("number");
        expect(firstRestriction.State).toBeTypeOf("string");
        expect(firstRestriction.StateRouteID).toBeTypeOf("string");
        expect(firstRestriction.VehicleType).toBeDefined();

        // Validate location data
        expect(firstRestriction.StartRoadwayLocation).toBeDefined();
        expect(firstRestriction.StartRoadwayLocation.Description).toBeDefined();
        expect(firstRestriction.StartRoadwayLocation.Direction).toBeDefined();
        expect(firstRestriction.StartRoadwayLocation.Latitude).toBeTypeOf(
          "number"
        );
        expect(firstRestriction.StartRoadwayLocation.Longitude).toBeTypeOf(
          "number"
        );
        expect(firstRestriction.StartRoadwayLocation.MilePost).toBeTypeOf(
          "number"
        );
        expect(firstRestriction.StartRoadwayLocation.RoadName).toBeTypeOf(
          "string"
        );

        expect(firstRestriction.EndRoadwayLocation).toBeDefined();
        expect(firstRestriction.EndRoadwayLocation.Description).toBeDefined();
        expect(firstRestriction.EndRoadwayLocation.Direction).toBeDefined();
        expect(firstRestriction.EndRoadwayLocation.Latitude).toBeTypeOf(
          "number"
        );
        expect(firstRestriction.EndRoadwayLocation.Longitude).toBeTypeOf(
          "number"
        );
        expect(firstRestriction.EndRoadwayLocation.MilePost).toBeTypeOf(
          "number"
        );
        expect(firstRestriction.EndRoadwayLocation.RoadName).toBeTypeOf(
          "string"
        );

        // Validate optional fields
        expect(firstRestriction.BLMaxAxle).toBeDefined();
        expect(firstRestriction.CL8MaxAxle).toBeDefined();
        expect(
          firstRestriction.MaximumGrossVehicleWeightInPounds
        ).toBeDefined();
        expect(firstRestriction.RestrictionHeightInInches).toBeDefined();
        expect(firstRestriction.RestrictionLengthInInches).toBeDefined();
        expect(firstRestriction.RestrictionWeightInPounds).toBeDefined();
        expect(firstRestriction.RestrictionWidthInInches).toBeDefined();
        expect(firstRestriction.SAMaxAxle).toBeDefined();
        expect(firstRestriction.TDMaxAxle).toBeDefined();
      }

      // Performance validation
      expect(duration).toBeLessThan(2000); // 2-second LTE target
    });

    it("should handle multiple restrictions with different types", async () => {
      const { data } = await measureApiCall(() =>
        getCommercialVehicleRestrictions()
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data?.length).toBeGreaterThan(0);

      // Check for different restriction types
      const restrictionTypes = new Set(data?.map((r) => r.RestrictionType));
      expect(restrictionTypes.size).toBeGreaterThan(0);

      // Check for different state routes
      const stateRoutes = new Set(data?.map((r) => r.StateRouteID));
      expect(stateRoutes.size).toBeGreaterThan(0);

      // Check for different vehicle types
      const vehicleTypes = new Set(data?.map((r) => r.VehicleType));
      expect(vehicleTypes.size).toBeGreaterThan(0);
    });

    it("should have valid geographic coordinates", async () => {
      const { data } = await measureApiCall(() =>
        getCommercialVehicleRestrictions()
      );

      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);

      if (data && data.length > 0) {
        data.forEach((restriction) => {
          // Validate latitude range (Washington State is roughly 45-49 degrees N)
          expect(restriction.Latitude).toBeGreaterThanOrEqual(45);
          expect(restriction.Latitude).toBeLessThanOrEqual(50);

          // Validate longitude range (Washington State is roughly 117-125 degrees W)
          expect(restriction.Longitude).toBeGreaterThanOrEqual(-125);
          expect(restriction.Longitude).toBeLessThanOrEqual(-117);
        });
      }
    });
  });
});
