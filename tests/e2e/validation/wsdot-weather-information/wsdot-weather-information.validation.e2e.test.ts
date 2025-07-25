import { describe, expect, it } from "vitest";
import { getWeatherInformation } from "@/api/wsdot-weather-information";
import { validators } from "./validator";

describe("WSDOT Weather Information API - Zod Validation", () => {
  it("should validate weather information data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Weather Information API validation...");
    const weatherInfo = await getWeatherInformation();
    const validatedData = validators.weatherInformationArray.validateSafe(weatherInfo);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      throw new Error(`Weather information validation failed: ${JSON.stringify(validatedData.error.errors, null, 2)}`);
    }
    expect(validatedData.data).toBeDefined();
    expect(Array.isArray(validatedData.data)).toBe(true);
    expect(validatedData.data.length).toBeGreaterThan(0);
    console.log(`✅ Successfully validated ${validatedData.data.length} weather information records`);
  });

  it("should validate individual weather information data", async () => {
    const weatherInfo = await getWeatherInformation();
    if (weatherInfo.length > 0) {
      const firstWeather = weatherInfo[0];
      const validatedWeather = validators.weatherInfo.validateSafe(firstWeather);
      if (!validatedWeather.success) {
        console.error("Individual validation failed:", validatedWeather.error.errors);
        throw new Error(`Individual weather validation failed: ${JSON.stringify(validatedWeather.error.errors, null, 2)}`);
      }
      expect(validatedWeather.data.StationID).toBeDefined();
      expect(typeof validatedWeather.data.StationID).toBe("number");
      expect(validatedWeather.data.StationName).toBeDefined();
      expect(typeof validatedWeather.data.StationName).toBe("string");
      expect(validatedWeather.data.ReadingTime).toBeInstanceOf(Date);
      expect(typeof validatedWeather.data.Latitude).toBe("number");
      expect(typeof validatedWeather.data.Longitude).toBe("number");
    }
  });

  it("should handle nullable weather fields correctly", async () => {
    const weatherInfo = await getWeatherInformation();
    for (const weather of weatherInfo) {
      const validatedWeather = validators.weatherInfo.validateSafe(weather);
      if (!validatedWeather.success) {
        console.error("Nullable validation failed:", validatedWeather.error.errors);
        throw new Error(`Nullable field validation failed: ${JSON.stringify(validatedWeather.error.errors, null, 2)}`);
      }
      if (validatedWeather.data.BarometricPressure !== null) {
        expect(typeof validatedWeather.data.BarometricPressure).toBe("number");
      }
      if (validatedWeather.data.PrecipitationInInches !== null) {
        expect(typeof validatedWeather.data.PrecipitationInInches).toBe("number");
      }
      if (validatedWeather.data.RelativeHumidity !== null) {
        expect(typeof validatedWeather.data.RelativeHumidity).toBe("number");
      }
      if (validatedWeather.data.SkyCoverage !== null) {
        expect(typeof validatedWeather.data.SkyCoverage).toBe("string");
      }
      if (validatedWeather.data.TemperatureInFahrenheit !== null) {
        expect(typeof validatedWeather.data.TemperatureInFahrenheit).toBe("number");
      }
      if (validatedWeather.data.Visibility !== null) {
        expect(typeof validatedWeather.data.Visibility).toBe("number");
      }
      if (validatedWeather.data.WindDirection !== null) {
        expect(typeof validatedWeather.data.WindDirection).toBe("number");
      }
      if (validatedWeather.data.WindDirectionCardinal !== null) {
        expect(typeof validatedWeather.data.WindDirectionCardinal).toBe("string");
      }
      if (validatedWeather.data.WindGustSpeedInMPH !== null) {
        expect(typeof validatedWeather.data.WindGustSpeedInMPH).toBe("number");
      }
      if (validatedWeather.data.WindSpeedInMPH !== null) {
        expect(typeof validatedWeather.data.WindSpeedInMPH).toBe("number");
      }
    }
  });

  it("should provide detailed error information when validation fails", () => {
    const malformedData = [
      {
        BarometricPressure: "not a number",
        Latitude: "not a number",
        Longitude: "not a number",
        PrecipitationInInches: "not a number",
        ReadingTime: "not a date",
        RelativeHumidity: "not a number",
        SkyCoverage: 123,
        StationID: "not a number",
        StationName: 456,
        TemperatureInFahrenheit: "not a number",
        Visibility: "not a number",
        WindDirection: "not a number",
        WindDirectionCardinal: 789,
        WindGustSpeedInMPH: "not a number",
        WindSpeedInMPH: "not a number",
      },
    ];
    const result = validators.weatherInformationArray.validateSafe(malformedData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors).toBeDefined();
      expect(result.error.errors.length).toBeGreaterThan(0);
      console.log("Validation Error Details:", {
        context: "malformed weather information",
        errors: result.error.errors,
        received: malformedData,
      });
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const weatherInfo = await getWeatherInformation();
    const validatedData = validators.weatherInformationArray.validateSafe(weatherInfo);
    if (!validatedData.success) {
      throw new Error("Single-line validation failed");
    }
    const firstWeather = validatedData.data[0];
    expect(firstWeather.StationID).toBeDefined();
    expect(firstWeather.StationName).toBeDefined();
    expect(firstWeather.ReadingTime).toBeInstanceOf(Date);
    expect(typeof firstWeather.Latitude).toBe("number");
    expect(typeof firstWeather.Longitude).toBe("number");
    console.log("✅ Single-line validation successful - all data is type-safe!");
  });

  console.log("✅ WSDOT Weather Information API validation tests completed");
}); 