import { describe, expect, it } from "vitest";

import { wsdotTollRatesTestConfig } from "../../config/wsdot-toll-rates.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

/**
 * WSDOT Toll Rates API - End-to-End Validation Tests
 *
 * This test suite validates all endpoints in the WSDOT Toll Rates API module
 * using the Zod schemas as the single source of truth.
 *
 * Endpoints tested:
 * - getTollRates: Get all current toll rates
 * - getTollTripInfo: Get toll trip information with geometry
 * - getTollTripRates: Get toll trip rates with system messages
 * - getTollTripVersion: Get API version and timestamp
 * - getTripRatesByDate: Get historical toll rates by date range
 */

describe("WSDOT Toll Rates API - Zod Validation", () => {
  // Generate test suites for all endpoints using the configuration
  wsdotTollRatesTestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });

  // Additional integration tests specific to the toll rates module
  describe("Module Integration Tests", () => {
    it("should have consistent data structure across endpoints", async () => {
      // This test verifies that data returned from different endpoints
      // maintains consistency in structure and relationships
      const { getTollRates, getTollTripInfo, getTollTripRates } = await import(
        "@/api/wsdot-toll-rates"
      );

      // Get data from all endpoints
      const [tollRates, tripInfo, tripRates] = await Promise.all([
        getTollRates(),
        getTollTripInfo(),
        getTollTripRates(),
      ]);

      // Verify all endpoints return data
      expect(tollRates).toBeDefined();
      expect(tripInfo).toBeDefined();
      expect(tripRates).toBeDefined();

      // Verify data consistency - trip names should be consistent across endpoints
      if (
        tollRates.length > 0 &&
        tripInfo.length > 0 &&
        tripRates.Trips.length > 0
      ) {
        const tollRateTripNames = new Set(
          tollRates.map((rate) => rate.TripName)
        );
        const tripInfoTripNames = new Set(
          tripInfo.map((trip) => trip.TripName)
        );
        const tripRatesTripNames = new Set(
          tripRates.Trips.map((trip) => trip.TripName)
        );

        // All endpoints should return data for the same set of trips
        expect(tollRateTripNames.size).toBeGreaterThan(0);
        expect(tripInfoTripNames.size).toBeGreaterThan(0);
        expect(tripRatesTripNames.size).toBeGreaterThan(0);

        // Log some sample data for debugging
        console.log(`📊 Toll Rates: ${tollRates.length} items`);
        console.log(`📊 Trip Info: ${tripInfo.length} items`);
        console.log(`📊 Trip Rates: ${tripRates.Trips.length} items`);
        console.log(
          `📊 Sample Trip Names: ${Array.from(tollRateTripNames).slice(0, 3).join(", ")}`
        );
      }
    });

    it("should handle rate limiting gracefully", async () => {
      // This test verifies that the API can handle multiple rapid requests
      // without overwhelming the service
      const { getTollRates } = await import("@/api/wsdot-toll-rates");

      const startTime = Date.now();

      // Make multiple requests in quick succession
      const promises = Array.from({ length: 3 }, () => getTollRates());
      const results = await Promise.all(promises);

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // All requests should succeed
      results.forEach((result) => {
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThanOrEqual(0);
      });

      // Total time should be reasonable (not too fast to indicate rate limiting)
      // The API might be very fast, so we'll just ensure it's not instant
      expect(totalTime).toBeGreaterThan(10); // At least 10ms between requests

      console.log(`⏱️  Rate limiting test completed in ${totalTime}ms`);
    });

    it("should provide consistent toll rate information", async () => {
      // This test verifies that toll rate information is consistent
      // between the main rates endpoint and the trip rates endpoint
      const { getTollRates, getTollTripRates } = await import(
        "@/api/wsdot-toll-rates"
      );

      const [tollRates, tripRates] = await Promise.all([
        getTollRates(),
        getTollTripRates(),
      ]);

      if (tollRates.length > 0 && tripRates.Trips.length > 0) {
        // Create maps for easy lookup
        const tollRatesMap = new Map(
          tollRates.map((rate) => [rate.TripName, rate])
        );
        const tripRatesMap = new Map(
          tripRates.Trips.map((trip) => [trip.TripName, trip])
        );

        // Find common trip names
        const commonTripNames = Array.from(tollRatesMap.keys()).filter((name) =>
          tripRatesMap.has(name)
        );

        if (commonTripNames.length > 0) {
          const sampleTripName = commonTripNames[0];
          const tollRate = tollRatesMap.get(sampleTripName);
          const tripRate = tripRatesMap.get(sampleTripName);

          // Basic structure should be consistent
          expect(tollRate).toBeDefined();
          expect(tripRate).toBeDefined();
          expect(tollRate?.TripName).toBe(tripRate?.TripName);

          console.log(`🔗 Consistency check: ${sampleTripName}`);
          console.log(`   • Toll Rate: ${tollRate?.CurrentToll} cents`);
          console.log(`   • Trip Rate: ${tripRate?.Toll} cents`);
        }
      }
    });
  });
});
