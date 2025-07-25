import { describe, expect, it } from "vitest";
import { getWeatherStations } from "@/api/wsdot-weather-stations";
import { validators } from "./validator";

describe("WSDOT Weather Stations API - Zod Validation", () => {
  it("should validate weather stations data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Weather Stations API validation...");
    const weatherStations = await getWeatherStations();
    const validatedData = validators.weatherStationsArray.validateSafe(weatherStations);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      throw new Error(`Weather stations validation failed: ${JSON.stringify(validatedData.error.errors, null, 2)}`);
    }
    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    expect(validatedData.data.length).toBeGreaterThan(0);
    console.log(`✅ Successfully validated ${validatedData.data.length} weather stations`);
  });

  it("should validate individual weather station data", async () => {
    const weatherStations = await getWeatherStations();
    if (weatherStations.length > 0) {
      const firstStation = weatherStations[0];
      const validatedStation = validators.weatherStationData.validateSafe(firstStation);
      if (!validatedStation.success) {
        console.error("Individual validation failed:", validatedStation.error.errors);
        throw new Error(`Individual station validation failed: ${JSON.stringify(validatedStation.error.errors, null, 2)}`);
      }
      expect(validatedStation.data.StationCode).toBeDefined();
      expect(typeof validatedStation.data.StationCode).toBe("number");
      expect(validatedStation.data.StationName).toBeDefined();
      expect(typeof validatedStation.data.StationName).toBe("string");
      expect(typeof validatedStation.data.Latitude).toBe("number");
      expect(typeof validatedStation.data.Longitude).toBe("number");
    }
  });

  it("should provide detailed error information when validation fails", () => {
    const malformedData = [
      {
        Latitude: "not a number",
        Longitude: "not a number",
        StationCode: "not a number",
        StationName: 123,
      },
    ];
    const result = validators.weatherStationsArray.validateSafe(malformedData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors).toBeDefined();
      expect(result.error.errors.length).toBeGreaterThan(0);
      console.log("Validation Error Details:", {
        context: "malformed weather stations",
        errors: result.error.errors,
        received: malformedData,
      });
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const weatherStations = await getWeatherStations();
    const validatedData = validators.weatherStationsArray.validateSafe(weatherStations);
    if (!validatedData.success) {
      throw new Error("Single-line validation failed");
    }
    const firstStation = validatedData.data[0];
    expect(firstStation.StationCode).toBeDefined();
    expect(firstStation.StationName).toBeDefined();
    expect(typeof firstStation.Latitude).toBe("number");
    expect(typeof firstStation.Longitude).toBe("number");
    console.log("✅ Single-line validation successful - all data is type-safe!");
  });

  console.log("✅ WSDOT Weather Stations API validation tests completed");
}); 