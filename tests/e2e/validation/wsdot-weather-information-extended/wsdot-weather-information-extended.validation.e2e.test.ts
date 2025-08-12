import { describe, expect, it } from "vitest";
import { getWeatherInformationExtended } from "@/api/wsdot-weather-information-extended";
import { validators } from "./validator";

describe("WSDOT Weather Information Extended API - Zod Validation", () => {
  it("should validate weather information extended data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Weather Information Extended API validation...");
    const weatherReadings = await getWeatherInformationExtended();
    const validatedData = validators.weatherReadingsArray.validateSafe(weatherReadings);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.issues);
      throw new Error(`Weather information extended validation failed: ${JSON.stringify(validatedData.error.issues, null, 2)}`);
    }
    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    expect(validatedData.data.length).toBeGreaterThan(0);
    console.log(`✅ Successfully validated ${validatedData.data.length} weather readings`);
  });

  it("should validate individual weather reading data", async () => {
    const weatherReadings = await getWeatherInformationExtended();
    if (weatherReadings.length > 0) {
      const firstReading = weatherReadings[0];
      const validatedReading = validators.weatherReading.validateSafe(firstReading);
      if (!validatedReading.success) {
        console.error("Individual validation failed:", validatedReading.error.issues);
        throw new Error(`Individual reading validation failed: ${JSON.stringify(validatedReading.error.issues, null, 2)}`);
      }
      expect(validatedReading.data.StationId).toBeDefined();
      expect(typeof validatedReading.data.StationId).toBe("string");
      expect(validatedReading.data.StationName).toBeDefined();
      expect(typeof validatedReading.data.StationName).toBe("string");
      if (validatedReading.data.ReadingTime !== null) {
        expect(validatedReading.data.ReadingTime).toBeInstanceOf(Date);
      }
      expect(typeof validatedReading.data.Latitude).toBe("number");
      expect(typeof validatedReading.data.Longitude).toBe("number");
      expect(typeof validatedReading.data.Elevation).toBe("number");
    }
  });

  it("should handle nullable weather fields correctly", async () => {
    const weatherReadings = await getWeatherInformationExtended();
    for (const reading of weatherReadings) {
      const validatedReading = validators.weatherReading.validateSafe(reading);
      if (!validatedReading.success) {
        console.error("Nullable validation failed:", validatedReading.error.issues);
        throw new Error(`Nullable field validation failed: ${JSON.stringify(validatedReading.error.issues, null, 2)}`);
      }
      if (validatedReading.data.ReadingTime !== null) {
        expect(validatedReading.data.ReadingTime).toBeInstanceOf(Date);
      }
      if (validatedReading.data.AirTemperature !== null) {
        expect(typeof validatedReading.data.AirTemperature).toBe("number");
      }
      if (validatedReading.data.RelativeHumidty !== null) {
        expect(typeof validatedReading.data.RelativeHumidty).toBe("number");
      }
      if (validatedReading.data.AverageWindSpeed !== null) {
        expect(typeof validatedReading.data.AverageWindSpeed).toBe("number");
      }
      if (validatedReading.data.AverageWindDirection !== null) {
        expect(typeof validatedReading.data.AverageWindDirection).toBe("number");
      }
      if (validatedReading.data.WindGust !== null) {
        expect(typeof validatedReading.data.WindGust).toBe("number");
      }
      if (validatedReading.data.Visibility !== null) {
        expect(typeof validatedReading.data.Visibility).toBe("number");
      }
      if (validatedReading.data.PrecipitationIntensity !== null) {
        expect(typeof validatedReading.data.PrecipitationIntensity).toBe("number");
      }
      if (validatedReading.data.PrecipitationType !== null) {
        expect(typeof validatedReading.data.PrecipitationType).toBe("number");
      }
      if (validatedReading.data.BarometricPressure !== null) {
        expect(typeof validatedReading.data.BarometricPressure).toBe("number");
      }
      if (validatedReading.data.SnowDepth !== null) {
        expect(typeof validatedReading.data.SnowDepth).toBe("number");
      }
    }
  });

  it("should validate surface and subsurface measurements when present", async () => {
    const weatherReadings = await getWeatherInformationExtended();
    for (const reading of weatherReadings) {
      const validatedReading = validators.weatherReading.validateSafe(reading);
      if (validatedReading.success) {
        if (validatedReading.data.SurfaceMeasurements !== null) {
          expect(Array.isArray(validatedReading.data.SurfaceMeasurements)).toBe(true);
          for (const measurement of validatedReading.data.SurfaceMeasurements) {
            expect(typeof measurement.SensorId).toBe("number");
            if (measurement.SurfaceTemperature !== null) {
              expect(typeof measurement.SurfaceTemperature).toBe("number");
            }
            if (measurement.RoadFreezingTemperature !== null) {
              expect(typeof measurement.RoadFreezingTemperature).toBe("number");
            }
            if (measurement.RoadSurfaceCondition !== null) {
              expect(typeof measurement.RoadSurfaceCondition).toBe("number");
            }
          }
        }
        if (validatedReading.data.SubSurfaceMeasurements !== null) {
          expect(Array.isArray(validatedReading.data.SubSurfaceMeasurements)).toBe(true);
          for (const measurement of validatedReading.data.SubSurfaceMeasurements) {
            expect(typeof measurement.SensorId).toBe("number");
            if (measurement.SubSurfaceTemperature !== null) {
              expect(typeof measurement.SubSurfaceTemperature).toBe("number");
            }
          }
        }
      }
    }
  });

  it("should provide detailed error information when validation fails", () => {
    const malformedData = [
      {
        StationId: 123,
        StationName: 456,
        Latitude: "not a number",
        Longitude: "not a number",
        Elevation: "not a number",
        ReadingTime: "not a date",
        AirTemperature: "not a number",
        RelativeHumidty: "not a number",
        AverageWindSpeed: "not a number",
        AverageWindDirection: "not a number",
        WindGust: "not a number",
        Visibility: "not a number",
        PrecipitationIntensity: "not a number",
        PrecipitationType: "not a number",
        PrecipitationPast1Hour: "not a number",
        PrecipitationPast3Hours: "not a number",
        PrecipitationPast6Hours: "not a number",
        PrecipitationPast12Hours: "not a number",
        PrecipitationPast24Hours: "not a number",
        PrecipitationAccumulation: "not a number",
        BarometricPressure: "not a number",
        SnowDepth: "not a number",
        SurfaceMeasurements: "not an array",
        SubSurfaceMeasurements: "not an array",
      },
    ];
    const result = validators.weatherReadingsArray.validateSafe(malformedData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toBeDefined();
      expect(result.error.issues.length).toBeGreaterThan(0);
      console.log("Validation Error Details:", {
        context: "malformed weather information extended",
        errors: result.error.issues,
        received: malformedData,
      });
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const weatherReadings = await getWeatherInformationExtended();
    const validatedData = validators.weatherReadingsArray.validateSafe(weatherReadings);
    if (!validatedData.success) {
      throw new Error("Single-line validation failed");
    }
    const firstReading = validatedData.data[0];
    expect(firstReading.StationId).toBeDefined();
    expect(firstReading.StationName).toBeDefined();
    if (firstReading.ReadingTime !== null) {
      expect(firstReading.ReadingTime).toBeInstanceOf(Date);
    }
    expect(typeof firstReading.Latitude).toBe("number");
    expect(typeof firstReading.Longitude).toBe("number");
    expect(typeof firstReading.Elevation).toBe("number");
    console.log("✅ Single-line validation successful - all data is type-safe!");
  });

  console.log("✅ WSDOT Weather Information Extended API validation tests completed");
}); 