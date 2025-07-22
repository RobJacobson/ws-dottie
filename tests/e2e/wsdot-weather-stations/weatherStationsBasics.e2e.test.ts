// WSDOT Weather Stations API - Basic E2E Tests
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc

import { describe, expect, it } from "vitest";

import { getWeatherStations } from "@/api/wsdot-weather-stations";
import { WsdotApiError } from "@/shared/fetching/errors";

import { validateApiError } from "../utils";
import { logUnexpectedError } from "../../utils";

describe("WSDOT Weather Stations API - Basic Functionality", () => {
  describe("API Function Availability", () => {
    it("should have getWeatherStations function", () => {
      expect(typeof getWeatherStations).toBe("function");
    });
  });

  describe("getWeatherStations", () => {
    it("should be callable and return a promise", async () => {
      const result = getWeatherStations();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should handle API errors gracefully", async () => {
      try {
        await getWeatherStations();
        // If successful, that's fine
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });
  });

  describe("Performance Benchmarks", () => {
    it("should complete getWeatherStations within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getWeatherStations();
      } catch (error) {
        // API errors are expected and acceptable
        expect(error).toBeInstanceOf(WsdotApiError);
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(2000);
    }, 3000);
  });
});
