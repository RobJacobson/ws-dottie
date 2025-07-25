import { describe, expect, it } from "vitest";
import { getTollRates, getTollTripInfo, getTollTripRates } from "@/api/wsdot-toll-rates";
import { validators } from "./validator";

describe("WSDOT Toll Rates API - Zod Validation", () => {
  it("should validate toll rates data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Toll Rates API validation...");
    const tollRates = await getTollRates();
    const validatedData = validators.tollRatesArray.validateSafe(tollRates);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      throw new Error(`Toll rates validation failed: ${JSON.stringify(validatedData.error.errors, null, 2)}`);
    }
    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    expect(validatedData.data.length).toBeGreaterThan(0);
    console.log(`✅ Successfully validated ${validatedData.data.length} toll rates`);
  });

  it("should validate individual toll rate data", async () => {
    const tollRates = await getTollRates();
    if (tollRates.length > 0) {
      const firstTollRate = tollRates[0];
      const validatedTollRate = validators.tollRate.validateSafe(firstTollRate);
      if (!validatedTollRate.success) {
        console.error("Individual validation failed:", validatedTollRate.error.errors);
        throw new Error(`Individual toll rate validation failed: ${JSON.stringify(validatedTollRate.error.errors, null, 2)}`);
      }
      expect(validatedTollRate.data.TripName).toBeDefined();
      expect(typeof validatedTollRate.data.TripName).toBe("string");
      expect(typeof validatedTollRate.data.CurrentToll).toBe("number");
      expect(validatedTollRate.data.TimeUpdated).toBeInstanceOf(Date);
      expect(typeof validatedTollRate.data.StateRoute).toBe("string");
      expect(typeof validatedTollRate.data.TravelDirection).toBe("string");
      expect(typeof validatedTollRate.data.StartLocationName).toBe("string");
      expect(typeof validatedTollRate.data.EndLocationName).toBe("string");
      expect(typeof validatedTollRate.data.StartLatitude).toBe("number");
      expect(typeof validatedTollRate.data.StartLongitude).toBe("number");
      expect(typeof validatedTollRate.data.EndLatitude).toBe("number");
      expect(typeof validatedTollRate.data.EndLongitude).toBe("number");
      expect(typeof validatedTollRate.data.StartMilepost).toBe("number");
      expect(typeof validatedTollRate.data.EndMilepost).toBe("number");
    }
  });

  it("should validate toll trip info data", async () => {
    const tripInfo = await getTollTripInfo();
    const validatedData = validators.tollTripInfoArray.validateSafe(tripInfo);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      throw new Error(`Toll trip info validation failed: ${JSON.stringify(validatedData.error.errors, null, 2)}`);
    }
    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    expect(validatedData.data.length).toBeGreaterThan(0);
    console.log(`✅ Successfully validated ${validatedData.data.length} toll trip info records`);
  });

  it("should validate toll trip rates data", async () => {
    const tripRates = await getTollTripRates();
    const validatedData = validators.tollTripRates.validateSafe(tripRates);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      throw new Error(`Toll trip rates validation failed: ${JSON.stringify(validatedData.error.errors, null, 2)}`);
    }
    expect(validatedData.data.LastUpdated).toBeInstanceOf(Date);
    expect(Array.isArray(validatedData.data.Trips)).toBe(true);
    expect(validatedData.data.Trips.length).toBeGreaterThan(0);
    console.log(`✅ Successfully validated toll trip rates with ${validatedData.data.Trips.length} trips`);
  });

  it("should handle nullable fields correctly", async () => {
    const tollRates = await getTollRates();
    for (const tollRate of tollRates) {
      const validatedTollRate = validators.tollRate.validateSafe(tollRate);
      if (!validatedTollRate.success) {
        console.error("Nullable validation failed:", validatedTollRate.error.errors);
        throw new Error(`Nullable field validation failed: ${JSON.stringify(validatedTollRate.error.errors, null, 2)}`);
      }
      if (validatedTollRate.data.CurrentMessage !== null) {
        expect(typeof validatedTollRate.data.CurrentMessage).toBe("string");
      }
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
    const result = validators.tollRatesArray.validateSafe(malformedData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors).toBeDefined();
      expect(result.error.errors.length).toBeGreaterThan(0);
      console.log("Validation Error Details:", {
        context: "malformed toll rates",
        errors: result.error.errors,
        received: malformedData,
      });
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const tollRates = await getTollRates();
    const validatedData = validators.tollRatesArray.validateSafe(tollRates);
    if (!validatedData.success) {
      throw new Error("Single-line validation failed");
    }
    const firstTollRate = validatedData.data[0];
    expect(firstTollRate.TripName).toBeDefined();
    expect(typeof firstTollRate.CurrentToll).toBe("number");
    expect(firstTollRate.TimeUpdated).toBeInstanceOf(Date);
    expect(typeof firstTollRate.StateRoute).toBe("string");
    expect(typeof firstTollRate.TravelDirection).toBe("string");
    expect(typeof firstTollRate.StartLocationName).toBe("string");
    expect(typeof firstTollRate.EndLocationName).toBe("string");
    expect(typeof firstTollRate.StartLatitude).toBe("number");
    expect(typeof firstTollRate.StartLongitude).toBe("number");
    expect(typeof firstTollRate.EndLatitude).toBe("number");
    expect(typeof firstTollRate.EndLongitude).toBe("number");
    expect(typeof firstTollRate.StartMilepost).toBe("number");
    expect(typeof firstTollRate.EndMilepost).toBe("number");
    console.log("✅ Single-line validation successful - all data is type-safe!");
  });

  console.log("✅ WSDOT Toll Rates API validation tests completed");
}); 