// WSDOT Toll Rates API - Basic E2E Tests
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html
// API Help: https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/Help

import { describe, expect, it } from "vitest";

import {
  getTollRates,
  getTollTripInfo,
  getTollTripRates,
} from "@/api/wsdot-toll-rates";
import { WsdotApiError } from "@/shared/fetching/errors";

import { validateApiError } from "../utils";

describe("WSDOT Toll Rates API - Basic Functionality", () => {
  describe("API Function Availability", () => {
    it("should have getTollRates function", () => {
      expect(typeof getTollRates).toBe("function");
    });

    it("should have getTollTripInfo function", () => {
      expect(typeof getTollTripInfo).toBe("function");
    });

    it("should have getTollTripRates function", () => {
      expect(typeof getTollTripRates).toBe("function");
    });
  });

  describe("getTollRates", () => {
    it("should be callable and return a promise", async () => {
      const result = getTollRates();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should handle API errors gracefully", async () => {
      try {
        await getTollRates();
        // If successful, that's fine
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });
  });

  describe("getTollTripInfo", () => {
    it("should be callable and return a promise", async () => {
      const result = getTollTripInfo();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should handle API errors gracefully", async () => {
      try {
        await getTollTripInfo();
        // If successful, that's fine
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });
  });

  describe("getTollTripRates", () => {
    it("should be callable and return a promise", async () => {
      const result = getTollTripRates();
      expect(result).toBeInstanceOf(Promise);
    });

    it("should handle API errors gracefully", async () => {
      try {
        await getTollTripRates();
        // If successful, that's fine
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });
  });

  describe("Performance Benchmarks", () => {
    it("should complete getTollRates within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getTollRates();
      } catch (error) {
        // API errors are expected and acceptable
        expect(error).toBeInstanceOf(WsdotApiError);
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(2000);
    }, 3000);

    it("should complete getTollTripInfo within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getTollTripInfo();
      } catch (error) {
        // API errors are expected and acceptable
        expect(error).toBeInstanceOf(WsdotApiError);
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(2000);
    }, 3000);

    it("should complete getTollTripRates within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getTollTripRates();
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
