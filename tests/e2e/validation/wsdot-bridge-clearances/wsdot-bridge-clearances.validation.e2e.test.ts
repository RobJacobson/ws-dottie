import { describe, expect, it } from "vitest";

import { getBridgeClearances } from "@/api/wsdot-bridge-clearances";

import { validators } from "./validator";

describe("WSDOT Bridge Clearances API - Zod Validation", () => {
  it("should validate bridge clearances data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Bridge Clearances API validation...");

    // Fetch real data from the API (using I-5 as an example route)
    const bridgeClearances = await getBridgeClearances({ route: "005" });

    // Validate the entire array structure
    const validatedData =
      validators.bridgeClearancesArray.validateSafe(bridgeClearances);

    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.issues);
      throw new Error(
        `Bridge clearances validation failed: ${JSON.stringify(validatedData.error.issues, null, 2)}`
      );
    }

    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    expect(validatedData.data.length).toBeGreaterThan(0);

    console.log(
      `✅ Successfully validated ${validatedData.data.length} bridge clearances`
    );
  });

  it("should validate individual bridge clearance data", async () => {
    const bridgeClearances = await getBridgeClearances({ route: "005" });

    if (bridgeClearances.length > 0) {
      const firstBridge = bridgeClearances[0];

      // Validate individual item
      const validatedBridge =
        validators.bridgeDataGis.validateSafe(firstBridge);

      if (!validatedBridge.success) {
        console.error(
          "Individual validation failed:",
          validatedBridge.error.issues
        );
        throw new Error(
          `Individual bridge clearance validation failed: ${JSON.stringify(validatedBridge.error.issues, null, 2)}`
        );
      }

      expect(validatedBridge.data.BridgeNumber).toBeDefined();
      expect(typeof validatedBridge.data.BridgeNumber).toBe("string");
      expect(validatedBridge.data.CrossingLocationId).toBeGreaterThan(0);
      expect(validatedBridge.data.Latitude).toBeGreaterThan(0);
      expect(validatedBridge.data.Longitude).toBeLessThan(0); // Washington state has negative longitude
      expect(validatedBridge.data.APILastUpdate).toBeInstanceOf(Date);
      expect(validatedBridge.data.RouteDate).toBeInstanceOf(Date);

      // Test clearance data
      expect(
        validatedBridge.data.VerticalClearanceMaximumInches
      ).toBeGreaterThan(0);
      expect(
        validatedBridge.data.VerticalClearanceMinimumInches
      ).toBeGreaterThan(0);
      expect(typeof validatedBridge.data.VerticalClearanceMaximumFeetInch).toBe(
        "string"
      );
      expect(typeof validatedBridge.data.VerticalClearanceMinimumFeetInch).toBe(
        "string"
      );
    }
  });

  it("should handle nullable fields correctly", async () => {
    const bridgeClearances = await getBridgeClearances({ route: "005" });

    // Test that nullable fields are handled properly
    for (const bridge of bridgeClearances) {
      const validatedBridge = validators.bridgeDataGis.validateSafe(bridge);

      if (!validatedBridge.success) {
        console.error(
          "Nullable validation failed:",
          validatedBridge.error.issues
        );
        throw new Error(
          `Nullable field validation failed: ${JSON.stringify(validatedBridge.error.issues, null, 2)}`
        );
      }

      // InventoryDirection can be null or string
      if (validatedBridge.data.InventoryDirection !== null) {
        expect(typeof validatedBridge.data.InventoryDirection).toBe("string");
      }

      // SRMPAheadBackIndicator can be null or string
      if (validatedBridge.data.SRMPAheadBackIndicator !== null) {
        expect(typeof validatedBridge.data.SRMPAheadBackIndicator).toBe(
          "string"
        );
      }
    }
  });

  it("should validate coordinate data correctly", async () => {
    const bridgeClearances = await getBridgeClearances({ route: "005" });

    for (const bridge of bridgeClearances) {
      const validatedBridge = validators.bridgeDataGis.validateSafe(bridge);

      if (validatedBridge.success) {
        // Latitude should be positive (northern hemisphere)
        expect(validatedBridge.data.Latitude).toBeGreaterThan(0);
        expect(validatedBridge.data.Latitude).toBeLessThan(90);

        // Longitude should be negative (western hemisphere for Washington)
        expect(validatedBridge.data.Longitude).toBeLessThan(0);
        expect(validatedBridge.data.Longitude).toBeGreaterThan(-180);
      }
    }
  });

  it("should provide detailed error information when validation fails", () => {
    // Test with malformed data
    const malformedData = [
      {
        APILastUpdate: "not a date",
        BridgeNumber: 123, // should be string
        ControlEntityGuid: "valid-guid",
        CrossingDescription: "valid description",
        CrossingLocationId: "not a number", // should be number
        CrossingRecordGuid: "valid-guid",
        InventoryDirection: "valid direction",
        Latitude: "not a number", // should be number
        LocationGuid: "valid-guid",
        Longitude: "not a number", // should be number
        RouteDate: "not a date",
        SRMP: "not a number", // should be number
        SRMPAheadBackIndicator: "valid indicator",
        StateRouteID: "valid route",
        StateStructureId: "valid structure",
        VerticalClearanceMaximumFeetInch: 123, // should be string
        VerticalClearanceMaximumInches: "not a number", // should be number
        VerticalClearanceMinimumFeetInch: 456, // should be string
        VerticalClearanceMinimumInches: "not a number", // should be number
      },
    ];

    const result = validators.bridgeClearancesArray.validateSafe(malformedData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toBeDefined();
      expect(result.error.issues.length).toBeGreaterThan(0);

      console.log("Validation Error Details:", {
        context: "malformed bridge clearances",
        issues: result.error.issues,
        received: malformedData,
      });
    }
  });

  it("should validate data transformations automatically", async () => {
    const bridgeClearances = await getBridgeClearances({ route: "005" });

    if (bridgeClearances.length > 0) {
      const firstBridge = bridgeClearances[0];

      // Test that date strings are automatically converted to Date objects
      const validatedBridge =
        validators.bridgeDataGis.validateSafe(firstBridge);

      if (validatedBridge.success) {
        expect(validatedBridge.data.APILastUpdate).toBeInstanceOf(Date);
        expect(validatedBridge.data.RouteDate).toBeInstanceOf(Date);

        // Test that the dates are reasonable (not too far in past/future)
        const now = new Date();
        const apiLastUpdate =
          validatedBridge.data.APILastUpdate instanceof Date
            ? validatedBridge.data.APILastUpdate
            : new Date(validatedBridge.data.APILastUpdate);
        const routeDate =
          validatedBridge.data.RouteDate instanceof Date
            ? validatedBridge.data.RouteDate
            : new Date(validatedBridge.data.RouteDate);

        const apiTimeDiff = Math.abs(now.getTime() - apiLastUpdate.getTime());
        const routeTimeDiff = Math.abs(now.getTime() - routeDate.getTime());

        // Allow for dates up to 10 years in the past (historical data)
        expect(apiTimeDiff).toBeLessThan(10 * 365 * 24 * 60 * 60 * 1000); // Within 10 years
        expect(routeTimeDiff).toBeLessThan(10 * 365 * 24 * 60 * 60 * 1000); // Within 10 years
      }
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const bridgeClearances = await getBridgeClearances({ route: "005" });

    // Single line validation replaces dozens of manual checks
    const validatedData =
      validators.bridgeClearancesArray.validateSafe(bridgeClearances);

    if (!validatedData.success) {
      throw new Error("Single-line validation failed");
    }

    // All data is now type-safe and validated
    const firstBridge = validatedData.data[0];
    expect(firstBridge.BridgeNumber).toBeDefined();
    expect(firstBridge.CrossingLocationId).toBeGreaterThan(0);
    expect(firstBridge.Latitude).toBeGreaterThan(0);
    expect(firstBridge.Longitude).toBeLessThan(0);
    expect(firstBridge.APILastUpdate).toBeInstanceOf(Date);
    expect(firstBridge.RouteDate).toBeInstanceOf(Date);
    expect(firstBridge.VerticalClearanceMaximumInches).toBeGreaterThan(0);
    expect(firstBridge.VerticalClearanceMinimumInches).toBeGreaterThan(0);

    console.log(
      "✅ Single-line validation successful - all data is type-safe!"
    );
  });

  console.log("✅ WSDOT Bridge Clearances API validation tests completed");
});
