// WSDOT Highway Alerts API - Basic E2E Tests
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
// API Help: https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help

import { describe, expect, it } from "vitest";

import {
  getHighwayAlertById,
  getHighwayAlerts,
  getHighwayAlertsByMapArea,
  useHighwayAlertById,
  useHighwayAlerts,
  useHighwayAlertsByMapArea,
} from "@/api/wsdot-highway-alerts";
import { WsdotApiError } from "@/shared/fetching/errors";

import { validateApiError } from "../utils";

describe("WSDOT Highway Alerts API - Basic Functionality", () => {
  describe("API Functions", () => {
    it("should have correct function signatures", () => {
      expect(typeof getHighwayAlerts).toBe("function");
      expect(typeof getHighwayAlertById).toBe("function");
      expect(typeof getHighwayAlertsByMapArea).toBe("function");

      expect(getHighwayAlerts).toHaveLength(0);
      expect(getHighwayAlertById).toHaveLength(1);
      expect(getHighwayAlertsByMapArea).toHaveLength(1);
    });

    it("should have correct function names", () => {
      expect(getHighwayAlerts.name).toBe("getHighwayAlerts");
      expect(getHighwayAlertById.name).toBe("getHighwayAlertById");
      expect(getHighwayAlertsByMapArea.name).toBe("getHighwayAlertsByMapArea");
    });
  });

  describe("React Query Hooks", () => {
    it("should have correct hook signatures", () => {
      expect(typeof useHighwayAlerts).toBe("function");
      expect(typeof useHighwayAlertById).toBe("function");
      expect(typeof useHighwayAlertsByMapArea).toBe("function");
    });

    it("should have correct hook names", () => {
      expect(useHighwayAlerts.name).toBe("useHighwayAlerts");
      expect(useHighwayAlertById.name).toBe("useHighwayAlertById");
      expect(useHighwayAlertsByMapArea.name).toBe("useHighwayAlertsByMapArea");
    });
  });

  describe("Error Handling", () => {
    it("should throw WsdotApiError for invalid alert ID", async () => {
      try {
        await getHighwayAlertById(999999);
        throw new Error("Expected error was not thrown");
      } catch (error) {
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });

    it("should handle invalid map area gracefully", async () => {
      try {
        const result = await getHighwayAlertsByMapArea("INVALID_AREA");
        // API may return empty array instead of throwing error
        expect(Array.isArray(result)).toBe(true);
      } catch (error) {
        // Or it may throw an error
        validateApiError(error, ["API_ERROR", "NETWORK_ERROR"]);
      }
    });
  });

  describe("Performance", () => {
    it("should fetch all highway alerts within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getHighwayAlerts();
        const endTime = Date.now();
        const duration = endTime - startTime;

        expect(duration).toBeLessThan(2000);
      } catch (error) {
        // If API is unavailable, test should still pass
        expect(error).toBeInstanceOf(WsdotApiError);
      }
    });

    it("should fetch specific alert by ID within 2 seconds", async () => {
      const startTime = Date.now();

      try {
        await getHighwayAlertById(655472); // Use a real alert ID from cURL testing
        const endTime = Date.now();
        const duration = endTime - startTime;

        expect(duration).toBeLessThan(2000);
      } catch (error) {
        // If API is unavailable, test should still pass
        expect(error).toBeInstanceOf(WsdotApiError);
      }
    });
  });
});
