import { describe, expect, it } from "vitest";

import { getMountainPassConditions } from "@/api/wsdot-mountain-pass-conditions";

import { validateAndReturn } from "../../utils-zod";
import { validators } from "./validator";

describe("WSDOT Mountain Pass Conditions API - Zod Validation", () => {
  it("should validate mountain pass conditions data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Mountain Pass Conditions API validation...");
    const conditions = await getMountainPassConditions();

    // Use utility for validation
    const validatedData = validateAndReturn(
      validators.mountainPassConditionsArray,
      conditions,
      "mountain pass conditions array"
    );

    expect(validatedData).toBeDefined();
    expect(Array.isArray(validatedData)).toBe(true);
    expect(validatedData.length).toBeGreaterThan(0);
    console.log(
      `✅ Successfully validated ${validatedData.length} mountain pass conditions`
    );
  });

  it("should validate individual mountain pass condition data", async () => {
    const conditions = await getMountainPassConditions();
    if (conditions.length > 0) {
      const firstCondition = conditions[0];

      // Use utility for individual validation
      const validatedCondition = validateAndReturn(
        validators.mountainPassCondition,
        firstCondition,
        "individual mountain pass condition"
      );

      expect(validatedCondition.MountainPassId).toBeDefined();
      expect(typeof validatedCondition.MountainPassId).toBe("number");
      expect(validatedCondition.MountainPassName).toBeDefined();
      expect(typeof validatedCondition.MountainPassName).toBe("string");
      expect(typeof validatedCondition.RoadCondition).toBe("string");
      expect(typeof validatedCondition.RestrictionOne.TravelDirection).toBe(
        "string"
      );
      expect(typeof validatedCondition.RestrictionOne.RestrictionText).toBe(
        "string"
      );
      expect(typeof validatedCondition.RestrictionTwo.TravelDirection).toBe(
        "string"
      );
      expect(typeof validatedCondition.RestrictionTwo.RestrictionText).toBe(
        "string"
      );
      expect(validatedCondition.DateUpdated).toBeInstanceOf(Date);
    }
  });

  it("should validate travel restriction data correctly", async () => {
    const conditions = await getMountainPassConditions();
    if (conditions.length > 0) {
      const firstCondition = conditions[0];

      // Use utility for validation
      const validatedCondition = validateAndReturn(
        validators.mountainPassCondition,
        firstCondition,
        "travel restriction data"
      );

      expect(typeof validatedCondition.RestrictionOne.TravelDirection).toBe(
        "string"
      );
      expect(typeof validatedCondition.RestrictionOne.RestrictionText).toBe(
        "string"
      );
      expect(typeof validatedCondition.RestrictionTwo.TravelDirection).toBe(
        "string"
      );
      expect(typeof validatedCondition.RestrictionTwo.RestrictionText).toBe(
        "string"
      );
      expect(typeof validatedCondition.RoadCondition).toBe("string");
      expect(typeof validatedCondition.WeatherCondition).toBe("string");
    }
  });

  it("should handle nullable temperature field correctly", async () => {
    const conditions = await getMountainPassConditions();
    for (const condition of conditions) {
      // Use utility for validation
      const validatedCondition = validateAndReturn(
        validators.mountainPassCondition,
        condition,
        "nullable temperature field"
      );

      if (validatedCondition.TemperatureInFahrenheit !== null) {
        expect(typeof validatedCondition.TemperatureInFahrenheit).toBe(
          "number"
        );
      }
    }
  });

  it("should provide detailed error information when validation fails", () => {
    const malformedData = [
      {
        DateUpdated: "not a date",
        ElevationInFeet: "not a number",
        Latitude: "not a number",
        Longitude: "not a number",
        MountainPassId: "not a number",
        MountainPassName: 123,
        RestrictionOne: 456,
        RestrictionTwo: 789,
        RoadCondition: 101,
        TemperatureInFahrenheit: "not a number",
        WeatherCondition: 112,
      },
    ];

    // Use utility for validation with error details
    const result =
      validators.mountainPassConditionsArray.validateSafe(malformedData);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.errors).toBeDefined();
      expect(Array.isArray(result.error.errors)).toBe(true);
      expect(result.error.errors.length).toBeGreaterThan(0);
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const conditions = await getMountainPassConditions();

    // Single-line validation using utility
    const validatedConditions = validateAndReturn(
      validators.mountainPassConditionsArray,
      conditions,
      "mountain pass conditions"
    );

    expect(validatedConditions.length).toBeGreaterThan(0);
    console.log(
      "✅ Single-line validation successful - all data is type-safe!"
    );
  });

  console.log("✅ E2E tests completed");
});
