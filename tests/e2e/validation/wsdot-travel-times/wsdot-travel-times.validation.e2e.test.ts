import { describe, expect, it } from "vitest";
import { getTravelTimes } from "@/api/wsdot-travel-times";
import { validators } from "./validator";

describe("WSDOT Travel Times API - Zod Validation", () => {
  it("should validate travel times data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Travel Times API validation...");
    const travelTimes = await getTravelTimes();
    const validatedData = validators.travelTimesArray.validateSafe(travelTimes);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.issues);
      throw new Error(`Travel times validation failed: ${JSON.stringify(validatedData.error.issues, null, 2)}`);
    }
    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    expect(validatedData.data.length).toBeGreaterThan(0);
    console.log(`✅ Successfully validated ${validatedData.data.length} travel times`);
  });

  it("should validate individual travel time route data", async () => {
    const travelTimes = await getTravelTimes();
    if (travelTimes.length > 0) {
      const firstRoute = travelTimes[0];
      const validatedRoute = validators.travelTimeRoute.validateSafe(firstRoute);
      if (!validatedRoute.success) {
        console.error("Individual validation failed:", validatedRoute.error.issues);
        throw new Error(`Individual route validation failed: ${JSON.stringify(validatedRoute.error.issues, null, 2)}`);
      }
      expect(validatedRoute.data.TravelTimeID).toBeDefined();
      expect(typeof validatedRoute.data.TravelTimeID).toBe("number");
      expect(typeof validatedRoute.data.AverageTime).toBe("number");
      expect(typeof validatedRoute.data.CurrentTime).toBe("number");
      expect(typeof validatedRoute.data.Distance).toBe("number");
      expect(validatedRoute.data.TimeUpdated).toBeInstanceOf(Date);
      expect(typeof validatedRoute.data.Name).toBe("string");
      expect(typeof validatedRoute.data.Description).toBe("string");
    }
  });

  it("should validate travel time endpoint data correctly", async () => {
    const travelTimes = await getTravelTimes();
    if (travelTimes.length > 0) {
      const firstRoute = travelTimes[0];
      const validatedRoute = validators.travelTimeRoute.validateSafe(firstRoute);
      if (validatedRoute.success) {
        // Test start point
        expect(typeof validatedRoute.data.StartPoint.Description).toBe("string");
        expect(typeof validatedRoute.data.StartPoint.Direction).toBe("string");
        expect(typeof validatedRoute.data.StartPoint.Latitude).toBe("number");
        expect(typeof validatedRoute.data.StartPoint.Longitude).toBe("number");
        expect(typeof validatedRoute.data.StartPoint.MilePost).toBe("number");
        expect(typeof validatedRoute.data.StartPoint.RoadName).toBe("string");

        // Test end point
        expect(typeof validatedRoute.data.EndPoint.Description).toBe("string");
        expect(typeof validatedRoute.data.EndPoint.Direction).toBe("string");
        expect(typeof validatedRoute.data.EndPoint.Latitude).toBe("number");
        expect(typeof validatedRoute.data.EndPoint.Longitude).toBe("number");
        expect(typeof validatedRoute.data.EndPoint.MilePost).toBe("number");
        expect(typeof validatedRoute.data.EndPoint.RoadName).toBe("string");
      }
    }
  });

  it("should provide detailed error information when validation fails", () => {
    const malformedData = [
      {
        AverageTime: "not a number",
        CurrentTime: "not a number",
        Description: 123,
        Distance: "not a number",
        EndPoint: "not an object",
        Name: 456,
        StartPoint: "not an object",
        TimeUpdated: "not a date",
        TravelTimeID: "not a number",
      },
    ];
    const result = validators.travelTimesArray.validateSafe(malformedData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toBeDefined();
      expect(result.error.issues.length).toBeGreaterThan(0);
      console.log("Validation Error Details:", {
        context: "malformed travel times",
        errors: result.error.issues,
        received: malformedData,
      });
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const travelTimes = await getTravelTimes();
    const validatedData = validators.travelTimesArray.validateSafe(travelTimes);
    if (!validatedData.success) {
      throw new Error("Single-line validation failed");
    }
    const firstRoute = validatedData.data[0];
    expect(firstRoute.TravelTimeID).toBeDefined();
    expect(typeof firstRoute.AverageTime).toBe("number");
    expect(typeof firstRoute.CurrentTime).toBe("number");
    expect(typeof firstRoute.Distance).toBe("number");
    expect(firstRoute.TimeUpdated).toBeInstanceOf(Date);
    expect(typeof firstRoute.Name).toBe("string");
    expect(typeof firstRoute.Description).toBe("string");
    expect(typeof firstRoute.StartPoint.Description).toBe("string");
    expect(typeof firstRoute.StartPoint.Direction).toBe("string");
    expect(typeof firstRoute.StartPoint.Latitude).toBe("number");
    expect(typeof firstRoute.StartPoint.Longitude).toBe("number");
    expect(typeof firstRoute.StartPoint.MilePost).toBe("number");
    expect(typeof firstRoute.StartPoint.RoadName).toBe("string");
    expect(typeof firstRoute.EndPoint.Description).toBe("string");
    expect(typeof firstRoute.EndPoint.Direction).toBe("string");
    expect(typeof firstRoute.EndPoint.Latitude).toBe("number");
    expect(typeof firstRoute.EndPoint.Longitude).toBe("number");
    expect(typeof firstRoute.EndPoint.MilePost).toBe("number");
    expect(typeof firstRoute.EndPoint.RoadName).toBe("string");
    console.log("✅ Single-line validation successful - all data is type-safe!");
  });

  console.log("✅ WSDOT Travel Times API validation tests completed");
}); 