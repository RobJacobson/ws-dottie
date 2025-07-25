import { describe, expect, it } from "vitest";
import { getBorderCrossings } from "@/api/wsdot-border-crossings";
import { validators } from "./validator";

describe("WSDOT Border Crossings API - Zod Validation", () => {
  it("should validate border crossings data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Border Crossings API validation...");
    
    // Fetch real data from the API
    const borderCrossings = await getBorderCrossings();
    
    // Validate the entire array structure
    const validatedData = validators.borderCrossingsArray.validateSafe(borderCrossings);
    
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      throw new Error(`Border crossings validation failed: ${JSON.stringify(validatedData.error.errors, null, 2)}`);
    }
    
    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    expect(validatedData.data.length).toBeGreaterThan(0);
    
    console.log(`✅ Successfully validated ${validatedData.data.length} border crossings`);
  });

  it("should validate individual border crossing data", async () => {
    const borderCrossings = await getBorderCrossings();
    
    if (borderCrossings.length > 0) {
      const firstCrossing = borderCrossings[0];
      
      // Validate individual item
      const validatedCrossing = validators.borderCrossingData.validateSafe(firstCrossing);
      
      if (!validatedCrossing.success) {
        console.error("Individual validation failed:", validatedCrossing.error.errors);
        throw new Error(`Individual border crossing validation failed: ${JSON.stringify(validatedCrossing.error.errors, null, 2)}`);
      }
      
      expect(validatedCrossing.data.CrossingName).toBeDefined();
      expect(typeof validatedCrossing.data.CrossingName).toBe("string");
      expect(validatedCrossing.data.WaitTime).toBeGreaterThanOrEqual(0);
      expect(validatedCrossing.data.Time).toBeInstanceOf(Date);
      
      // Test location data if present
      if (validatedCrossing.data.BorderCrossingLocation) {
        expect(validatedCrossing.data.BorderCrossingLocation.Latitude).toBeGreaterThan(0);
        expect(validatedCrossing.data.BorderCrossingLocation.Longitude).toBeLessThan(0); // Washington state has negative longitude
        expect(typeof validatedCrossing.data.BorderCrossingLocation.RoadName).toBe("string");
      }
    }
  });

  it("should handle nullable location data correctly", async () => {
    const borderCrossings = await getBorderCrossings();
    
    // Test that nullable location is handled properly
    for (const crossing of borderCrossings) {
      const validatedCrossing = validators.borderCrossingData.validateSafe(crossing);
      
      if (!validatedCrossing.success) {
        console.error("Nullable validation failed:", validatedCrossing.error.errors);
        throw new Error(`Nullable location validation failed: ${JSON.stringify(validatedCrossing.error.errors, null, 2)}`);
      }
      
      // Location can be null or an object
      if (validatedCrossing.data.BorderCrossingLocation !== null) {
        expect(typeof validatedCrossing.data.BorderCrossingLocation.Description).toBe("string");
        expect(typeof validatedCrossing.data.BorderCrossingLocation.Latitude).toBe("number");
        expect(typeof validatedCrossing.data.BorderCrossingLocation.Longitude).toBe("number");
      }
    }
  });

  it("should provide detailed error information when validation fails", () => {
    // Test with malformed data
    const malformedData = [
      {
        BorderCrossingLocation: "not an object",
        CrossingName: 123, // should be string
        Time: "invalid date",
        WaitTime: "not a number",
      },
    ];
    
    const result = validators.borderCrossingsArray.validateSafe(malformedData);
    
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors).toBeDefined();
      expect(result.error.errors.length).toBeGreaterThan(0);
      
      console.log("Validation Error Details:", {
        context: "malformed border crossings",
        errors: result.error.errors,
        received: malformedData,
      });
    }
  });

  it("should validate data transformations automatically", async () => {
    const borderCrossings = await getBorderCrossings();
    
    if (borderCrossings.length > 0) {
      const firstCrossing = borderCrossings[0];
      
      // Test that date strings are automatically converted to Date objects
      const validatedCrossing = validators.borderCrossingData.validateSafe(firstCrossing);
      
      if (validatedCrossing.success) {
        expect(validatedCrossing.data.Time).toBeInstanceOf(Date);
        
        // Test that the date is reasonable (not too far in past/future)
        const now = new Date();
        const crossingTime = validatedCrossing.data.Time instanceof Date ? validatedCrossing.data.Time : new Date(validatedCrossing.data.Time);
        const timeDiff = Math.abs(now.getTime() - crossingTime.getTime());
        expect(timeDiff).toBeLessThan(24 * 60 * 60 * 1000); // Within 24 hours
      }
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const borderCrossings = await getBorderCrossings();
    
    // Single line validation replaces dozens of manual checks
    const validatedData = validators.borderCrossingsArray.validateSafe(borderCrossings);
    
    if (!validatedData.success) {
      throw new Error("Single-line validation failed");
    }
    
    // All data is now type-safe and validated
    const firstCrossing = validatedData.data[0];
    expect(firstCrossing.CrossingName).toBeDefined();
    expect(firstCrossing.WaitTime).toBeGreaterThanOrEqual(0);
    expect(firstCrossing.Time).toBeInstanceOf(Date);
    
    console.log("✅ Single-line validation successful - all data is type-safe!");
  });

  console.log("✅ WSDOT Border Crossings API validation tests completed");
}); 