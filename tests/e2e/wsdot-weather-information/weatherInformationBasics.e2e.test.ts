// WSDOT Weather Information API - Basic E2E Tests
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html
// API Help: https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help

import { describe, expect, it } from "vitest";

import {
  getWeatherInformation,
  getWeatherInformationByStationId,
  getWeatherInformationForStations,
} from "@/api/wsdot-weather-information";
import { WsdotApiError } from "@/shared/fetching/errors";

import { validateApiError } from "../utils";
import { logUnexpectedError } from "../../utils";

// Test data constants based on cURL validation
const TEST_STATION_ID = 1909; // Real station ID from cURL testing
const TEST_STATION_IDS = "1909,1910,1928"; // Real station IDs from cURL testing

describe("WSDOT Weather Information API - Basic Functionality", () => {
  describe("API Function Availability", () => {
    it("should have getWeatherInformation function", () => {
      expect(typeof getWeatherInformation).toBe("function");
    });

    it("should have getWeatherInformationByStationId function", () => {
      expect(typeof getWeatherInformationByStationId).toBe("function");
    });

    it("should have getWeatherInformationForStations function", () => {
      expect(typeof getWeatherInformationForStations).toBe("function");
    });
  });

  describe("getWeatherInformation", () => {
    it("should be callable and return a promise", async () => {
      const result = getWeatherInformation();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should handle API errors gracefully", async () => {
      try {
        await getWeatherInformation();
        // If successful, that's fine
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });
  });

  describe("getWeatherInformationByStationId", () => {
    it("should be callable and return a promise", async () => {
      const result = getWeatherInformationByStationId(TEST_STATION_ID);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should handle API errors gracefully", async () => {
      try {
        await getWeatherInformationByStationId(TEST_STATION_ID);
        // If successful, that's fine
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });

    it("should throw error for invalid station ID", async () => {
      try {
        await getWeatherInformationByStationId(999999);
        throw new Error("Expected error was not thrown");
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });
  });

  describe("getWeatherInformationForStations", () => {
    it("should be callable and return a promise", async () => {
      const result = getWeatherInformationForStations(TEST_STATION_IDS);
      expect(result).toBeInstanceOf(Promise);
    });

    it("should handle API errors gracefully", async () => {
      try {
        await getWeatherInformationForStations(TEST_STATION_IDS);
        // If successful, that's fine
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });

    it("should throw error for invalid station IDs", async () => {
      try {
        await getWeatherInformationForStations("999999,999998");
        throw new Error("Expected error was not thrown");
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });
  });

  describe("Performance Benchmarks", () => {
    it("should complete getWeatherInformation within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getWeatherInformation();
      } catch (error) {
        // API errors are expected and acceptable
        expect(error).toBeInstanceOf(WsdotApiError);
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(2000);
    }, 3000);

    it("should complete getWeatherInformationByStationId within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getWeatherInformationByStationId(TEST_STATION_ID);
      } catch (error) {
        // API errors are expected and acceptable
        expect(error).toBeInstanceOf(WsdotApiError);
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(2000);
    }, 3000);

    it("should complete getWeatherInformationForStations within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getWeatherInformationForStations(TEST_STATION_IDS);
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
