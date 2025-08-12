import { describe, expect, it } from "vitest";

import { getWeatherInformation } from "@/api/wsdot-weather-information";

import { validateAndReturn } from "../../utils-zod";
import { validators } from "./validator";

describe("WSDOT Weather Information API - Zod Validation", () => {
  it("should validate weather information data structure using Zod", async () => {
    console.log("🚀 Testing WSDOT Weather Information API validation...");
    const weatherData = await getWeatherInformation();

    // Use utility for validation
    const validatedData = validateAndReturn(
      validators.weatherInformationArray,
      weatherData,
      "weather information array"
    );

    expect(validatedData).toBeDefined();
    expect(Array.isArray(validatedData)).toBe(true);
    expect(validatedData.length).toBeGreaterThan(0);
    console.log(
      `✅ Successfully validated ${validatedData.length} weather information records`
    );
  });

  it("should validate individual weather information data", async () => {
    const weatherData = await getWeatherInformation();
    if (weatherData.length > 0) {
      const firstWeather = weatherData[0];

      // Use utility for individual validation
      const validatedWeather = validateAndReturn(
        validators.weatherInfo,
        firstWeather,
        "individual weather information"
      );

      expect(validatedWeather.StationID).toBeDefined();
      expect(typeof validatedWeather.StationID).toBe("number");
      expect(validatedWeather.StationName).toBeDefined();
      expect(typeof validatedWeather.StationName).toBe("string");
      expect(typeof validatedWeather.TemperatureInFahrenheit).toBe("number");
      expect(typeof validatedWeather.RelativeHumidity).toBe("number");
      expect(typeof validatedWeather.WindSpeedInMPH).toBe("number");
      expect(typeof validatedWeather.WindDirectionCardinal).toBe("string");
      expect(validatedWeather.ReadingTime).toBeInstanceOf(Date);
    }
  });

  it("should handle nullable weather fields correctly", async () => {
    const weatherData = await getWeatherInformation();
    for (const weather of weatherData) {
      // Use utility for validation
      const validatedWeather = validateAndReturn(
        validators.weatherInfo,
        weather,
        "nullable weather fields"
      );

      if (validatedWeather.BarometricPressure !== null) {
        expect(typeof validatedWeather.BarometricPressure).toBe("number");
      }
      if (validatedWeather.PrecipitationInInches !== null) {
        expect(typeof validatedWeather.PrecipitationInInches).toBe("number");
      }
      if (validatedWeather.Visibility !== null) {
        expect(typeof validatedWeather.Visibility).toBe("number");
      }
      if (validatedWeather.WindGustSpeedInMPH !== null) {
        expect(typeof validatedWeather.WindGustSpeedInMPH).toBe("number");
      }
      if (validatedWeather.SkyCoverage !== null) {
        expect(typeof validatedWeather.SkyCoverage).toBe("string");
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

    // Use utility for validation with error details
    const result =
      validators.weatherInformationArray.validateSafe(malformedData);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues).toBeDefined();
      expect(Array.isArray(result.error.issues)).toBe(true);
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });

  it("should demonstrate the power of single-line validation", async () => {
    const weatherData = await getWeatherInformation();

    // Single-line validation using utility
    const validatedWeather = validateAndReturn(
      validators.weatherInformationArray,
      weatherData,
      "weather information"
    );

    expect(validatedWeather.length).toBeGreaterThan(0);
    console.log(
      "✅ Single-line validation successful - all data is type-safe!"
    );
  });

  console.log("✅ WSDOT Weather Information API validation tests completed");
});
