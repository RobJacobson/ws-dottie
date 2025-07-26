import { describe, expect, it } from "vitest";

import { getBorderCrossings } from "@/api/wsdot-border-crossings";

import { validateAndReturn } from "../../utils-zod";
import { validators } from "./validator";

describe("WSDOT Border Crossings API - Zod Validation", () => {
  it("should validate border crossings data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Border Crossings API validation...");
    const crossings = await getBorderCrossings();

    // Use utility for validation
    const validatedData = validateAndReturn(
      validators.borderCrossingsArray,
      crossings,
      "border crossings array"
    );

    expect(validatedData).toBeDefined();
    expect(Array.isArray(validatedData)).toBe(true);
    expect(validatedData.length).toBeGreaterThan(0);
    console.log(
      `✅ Successfully validated ${validatedData.length} border crossings`
    );
  });

  it("should validate individual border crossing data", async () => {
    const crossings = await getBorderCrossings();
    if (crossings.length > 0) {
      const firstCrossing = crossings[0];

      // Use utility for individual validation
      const validatedCrossing = validateAndReturn(
        validators.borderCrossingData,
        firstCrossing,
        "individual border crossing"
      );

      expect(validatedCrossing.CrossingName).toBeDefined();
      expect(typeof validatedCrossing.CrossingName).toBe("string");
      expect(validatedCrossing.WaitTime).toBeDefined();
      expect(typeof validatedCrossing.WaitTime).toBe("number");
      expect(validatedCrossing.Time).toBeInstanceOf(Date);
    }
  });

  it("should handle nullable location data correctly", async () => {
    const crossings = await getBorderCrossings();
    for (const crossing of crossings) {
      // Use utility for validation
      const validatedCrossing = validateAndReturn(
        validators.borderCrossingData,
        crossing,
        "nullable location data"
      );

      if (validatedCrossing.BorderCrossingLocation !== null) {
        expect(typeof validatedCrossing.BorderCrossingLocation.RoadName).toBe(
          "string"
        );
        expect(typeof validatedCrossing.BorderCrossingLocation.Latitude).toBe(
          "number"
        );
        expect(typeof validatedCrossing.BorderCrossingLocation.Longitude).toBe(
          "number"
        );
      }
    }
  });

  it("should provide detailed error information when validation fails", () => {
    const malformedData = [
      {
        BorderCrossingLocation: "not an object",
        CrossingName: 123,
        Time: "invalid date",
        WaitTime: "not a number",
      },
    ];

    // Use utility for validation with error details
    const result = validators.borderCrossingsArray.validateSafe(malformedData);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.errors).toBeDefined();
      expect(Array.isArray(result.error.errors)).toBe(true);
      expect(result.error.errors.length).toBeGreaterThan(0);
    }
  });

  it("should validate data transformations automatically", async () => {
    const crossings = await getBorderCrossings();
    if (crossings.length > 0) {
      const firstCrossing = crossings[0];

      // Use utility for validation
      const validatedCrossing = validateAndReturn(
        validators.borderCrossingData,
        firstCrossing,
        "data transformations"
      );

      // Verify that date fields are automatically converted
      expect(validatedCrossing.Time).toBeInstanceOf(Date);

      // Verify that location data is properly structured
      if (validatedCrossing.BorderCrossingLocation !== null) {
        expect(validatedCrossing.BorderCrossingLocation).toBeInstanceOf(Object);
        expect(typeof validatedCrossing.BorderCrossingLocation.RoadName).toBe(
          "string"
        );
      }
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const crossings = await getBorderCrossings();

    // Single-line validation using utility
    const validatedCrossings = validateAndReturn(
      validators.borderCrossingsArray,
      crossings,
      "border crossings"
    );

    expect(validatedCrossings.length).toBeGreaterThan(0);
    console.log(
      "✅ Single-line validation successful - all data is type-safe!"
    );
  });

  console.log("✅ E2E tests completed");
});
