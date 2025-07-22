// WSDOT Weather Information Extended API - Basic E2E Tests
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_traveler_a_p_i_1_1_controller_1_1_scanweb_controller.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/api/Scanweb

import { describe, expect, it } from "vitest";

import { getWeatherInformationExtended } from "@/api/wsdot-weather-information-extended";
import { WsdotApiError } from "@/shared/fetching/errors";

import { validateApiError } from "../utils";

describe("WSDOT Weather Information Extended API - Basic Functionality", () => {
  describe("API Function Availability", () => {
    it("should have getWeatherInformationExtended function", () => {
      expect(typeof getWeatherInformationExtended).toBe("function");
    });
  });

  describe("getWeatherInformationExtended", () => {
    it("should be callable and return a promise", async () => {
      const result = getWeatherInformationExtended();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should handle API errors gracefully", async () => {
      try {
        await getWeatherInformationExtended();
        // If successful, that's fine
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });
  });

  describe("Performance Benchmarks", () => {
    it("should complete getWeatherInformationExtended within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getWeatherInformationExtended();
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
