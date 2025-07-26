import { describe, expect, it } from "vitest";

import { getTollRates } from "@/api/wsdot-toll-rates";

import { validateAndReturn } from "../../utils-zod";
import { validators } from "./validator";

describe("WSDOT Toll Rates API - Zod Validation", () => {
  it("should validate toll rates data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Toll Rates API validation...");
    const tollRates = await getTollRates();

    // Use utility for validation
    const validatedData = validateAndReturn(
      validators.tollRatesArray,
      tollRates,
      "toll rates array"
    );

    expect(validatedData).toBeDefined();
    expect(Array.isArray(validatedData)).toBe(true);
    expect(validatedData.length).toBeGreaterThan(0);
    console.log(`✅ Successfully validated ${validatedData.length} toll rates`);
  });

  it("should validate individual toll rate data", async () => {
    const tollRates = await getTollRates();
    if (tollRates.length > 0) {
      const firstTollRate = tollRates[0];

      // Use utility for individual validation
      const validatedTollRate = validateAndReturn(
        validators.tollRate,
        firstTollRate,
        "individual toll rate"
      );

      expect(validatedTollRate.TripName).toBeDefined();
      expect(typeof validatedTollRate.TripName).toBe("string");
      expect(typeof validatedTollRate.CurrentToll).toBe("number");
      expect(validatedTollRate.TimeUpdated).toBeInstanceOf(Date);
      expect(typeof validatedTollRate.StateRoute).toBe("string");
      expect(typeof validatedTollRate.TravelDirection).toBe("string");
    }
  });

  it("should validate toll trip info data", async () => {
    const tollRates = await getTollRates();
    if (tollRates.length > 0) {
      const firstTollRate = tollRates[0];

      // Use utility for validation
      const validatedTollRate = validateAndReturn(
        validators.tollRate,
        firstTollRate,
        "toll trip info data"
      );

      expect(typeof validatedTollRate.StartLocationName).toBe("string");
      expect(typeof validatedTollRate.EndLocationName).toBe("string");
      expect(typeof validatedTollRate.StartLatitude).toBe("number");
      expect(typeof validatedTollRate.StartLongitude).toBe("number");
      expect(typeof validatedTollRate.EndLatitude).toBe("number");
      expect(typeof validatedTollRate.EndLongitude).toBe("number");
    }
  });

  it("should validate toll trip rates data", async () => {
    const tollRates = await getTollRates();
    if (tollRates.length > 0) {
      const firstTollRate = tollRates[0];

      // Use utility for validation
      const validatedTollRate = validateAndReturn(
        validators.tollRate,
        firstTollRate,
        "toll trip rates data"
      );

      expect(typeof validatedTollRate.CurrentToll).toBe("number");
      expect(typeof validatedTollRate.TripName).toBe("string");
      expect(typeof validatedTollRate.StateRoute).toBe("string");
      expect(typeof validatedTollRate.TravelDirection).toBe("string");
    }
  });

  it("should handle nullable fields correctly", async () => {
    const tollRates = await getTollRates();
    for (const tollRate of tollRates) {
      // Use utility for validation
      const validatedTollRate = validateAndReturn(
        validators.tollRate,
        tollRate,
        "nullable fields"
      );

      if (validatedTollRate.CurrentMessage !== null) {
        expect(typeof validatedTollRate.CurrentMessage).toBe("string");
      }
      expect(typeof validatedTollRate.CurrentToll).toBe("number");
      expect(typeof validatedTollRate.TripName).toBe("string");
    }
  });

  it("should provide detailed error information when validation fails", () => {
    const malformedData = [
      {
        CurrentMessage: 123,
        CurrentToll: "not a number",
        EndLatitude: "not a number",
        EndLocationName: 456,
        EndLongitude: "not a number",
        EndMilepost: "not a number",
        StartLatitude: "not a number",
        StartLocationName: 789,
        StartLongitude: "not a number",
        StartMilepost: "not a number",
        StateRoute: 101,
        TimeUpdated: "not a date",
        TravelDirection: 112,
        TripName: 131,
      },
    ];

    // Use utility for validation with error details
    const result = validators.tollRatesArray.validateSafe(malformedData);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.errors).toBeDefined();
      expect(Array.isArray(result.error.errors)).toBe(true);
      expect(result.error.errors.length).toBeGreaterThan(0);
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const tollRates = await getTollRates();

    // Single-line validation using utility
    const validatedTollRates = validateAndReturn(
      validators.tollRatesArray,
      tollRates,
      "toll rates"
    );

    expect(validatedTollRates.length).toBeGreaterThan(0);
    console.log(
      "✅ Single-line validation successful - all data is type-safe!"
    );
  });

  console.log("✅ E2E tests completed");
});
