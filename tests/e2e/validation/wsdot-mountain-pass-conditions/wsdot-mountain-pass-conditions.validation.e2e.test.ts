import { describe, expect, it } from "vitest";
import { getMountainPassConditions } from "@/api/wsdot-mountain-pass-conditions";
import { validators } from "./validator";

describe("WSDOT Mountain Pass Conditions API - Zod Validation", () => {
  it("should validate mountain pass conditions data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Mountain Pass Conditions API validation...");
    const conditions = await getMountainPassConditions();
    const validatedData = validators.mountainPassConditionsArray.validateSafe(conditions);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      throw new Error(`Mountain pass conditions validation failed: ${JSON.stringify(validatedData.error.errors, null, 2)}`);
    }
    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    expect(validatedData.data.length).toBeGreaterThan(0);
    console.log(`✅ Successfully validated ${validatedData.data.length} mountain pass conditions`);
  });

  it("should validate individual mountain pass condition data", async () => {
    const conditions = await getMountainPassConditions();
    if (conditions.length > 0) {
      const firstCondition = conditions[0];
      const validatedCondition = validators.mountainPassCondition.validateSafe(firstCondition);
      if (!validatedCondition.success) {
        console.error("Individual validation failed:", validatedCondition.error.errors);
        throw new Error(`Individual condition validation failed: ${JSON.stringify(validatedCondition.error.errors, null, 2)}`);
      }
      expect(validatedCondition.data.MountainPassId).toBeDefined();
      expect(typeof validatedCondition.data.MountainPassId).toBe("number");
      expect(validatedCondition.data.MountainPassName).toBeDefined();
      expect(typeof validatedCondition.data.MountainPassName).toBe("string");
      expect(validatedCondition.data.DateUpdated).toBeInstanceOf(Date);
      expect(typeof validatedCondition.data.ElevationInFeet).toBe("number");
      expect(typeof validatedCondition.data.Latitude).toBe("number");
      expect(typeof validatedCondition.data.Longitude).toBe("number");
      expect(typeof validatedCondition.data.RoadCondition).toBe("string");
      expect(typeof validatedCondition.data.WeatherCondition).toBe("string");
      expect(typeof validatedCondition.data.TravelAdvisoryActive).toBe("boolean");
    }
  });

  it("should validate travel restriction data correctly", async () => {
    const conditions = await getMountainPassConditions();
    if (conditions.length > 0) {
      const firstCondition = conditions[0];
      const validatedCondition = validators.mountainPassCondition.validateSafe(firstCondition);
      if (validatedCondition.success) {
        expect(typeof validatedCondition.data.RestrictionOne.TravelDirection).toBe("string");
        expect(typeof validatedCondition.data.RestrictionOne.RestrictionText).toBe("string");
        expect(typeof validatedCondition.data.RestrictionTwo.TravelDirection).toBe("string");
        expect(typeof validatedCondition.data.RestrictionTwo.RestrictionText).toBe("string");
      }
    }
  });

  it("should handle nullable temperature field correctly", async () => {
    const conditions = await getMountainPassConditions();
    for (const condition of conditions) {
      const validatedCondition = validators.mountainPassCondition.validateSafe(condition);
      if (!validatedCondition.success) {
        console.error("Nullable validation failed:", validatedCondition.error.errors);
        throw new Error(`Nullable field validation failed: ${JSON.stringify(validatedCondition.error.errors, null, 2)}`);
      }
      if (validatedCondition.data.TemperatureInFahrenheit !== null) {
        expect(typeof validatedCondition.data.TemperatureInFahrenheit).toBe("number");
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
        RestrictionOne: "not an object",
        RestrictionTwo: "not an object",
        RoadCondition: 456,
        TemperatureInFahrenheit: "not a number",
        TravelAdvisoryActive: "not a boolean",
        WeatherCondition: 789,
      },
    ];
    const result = validators.mountainPassConditionsArray.validateSafe(malformedData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors).toBeDefined();
      expect(result.error.errors.length).toBeGreaterThan(0);
      console.log("Validation Error Details:", {
        context: "malformed mountain pass conditions",
        errors: result.error.errors,
        received: malformedData,
      });
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const conditions = await getMountainPassConditions();
    const validatedData = validators.mountainPassConditionsArray.validateSafe(conditions);
    if (!validatedData.success) {
      throw new Error("Single-line validation failed");
    }
    const firstCondition = validatedData.data[0];
    expect(firstCondition.MountainPassId).toBeDefined();
    expect(firstCondition.MountainPassName).toBeDefined();
    expect(firstCondition.DateUpdated).toBeInstanceOf(Date);
    expect(typeof firstCondition.ElevationInFeet).toBe("number");
    expect(typeof firstCondition.Latitude).toBe("number");
    expect(typeof firstCondition.Longitude).toBe("number");
    expect(typeof firstCondition.RoadCondition).toBe("string");
    expect(typeof firstCondition.WeatherCondition).toBe("string");
    expect(typeof firstCondition.TravelAdvisoryActive).toBe("boolean");
    console.log("✅ Single-line validation successful - all data is type-safe!");
  });

  console.log("✅ WSDOT Mountain Pass Conditions API validation tests completed");
}); 